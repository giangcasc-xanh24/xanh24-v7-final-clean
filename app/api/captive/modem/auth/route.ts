import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { ModemAdapterFactory } from "@/lib/modem/factory";
import crypto from "crypto";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { phone, fullName, email, extraFields, params, university_id } = body;
    if (!phone || !params?.client_mac) return NextResponse.json({ success: false, message: "Thiếu thông tin" }, { status: 400 });

    const gw_id = params.gw_id || params.gateway_ip || "default";
    let modem;
    const { data: modemByGw } = await supabase.from("wifi_modems").select("*").eq("gateway_ip", params.gw_id).eq("is_active", true).single();
    if (modemByGw) modem = modemByGw;
    else {
      const { data: defaultModem } = await supabase.from("wifi_modems").select("*").eq("vendor", "ruijie").eq("is_active", true).limit(1).single();
      modem = defaultModem;
    }
    if (!modem) return NextResponse.json({ success: false, message: "Không tìm thấy modem" }, { status: 404 });

    const adapter = ModemAdapterFactory.create(modem);
    const authResult = await adapter.authorize({ phone, fullName, email, extraFields, params, university_id });

    const token = authResult.token || crypto.randomBytes(16).toString("hex");
    const clientMac = params.client_mac.toLowerCase();

    // Upsert wifi_clients by phone as key for student_progress
    await supabase.from("wifi_clients").upsert({
      mac: clientMac,
      phone,
      full_name: fullName,
      email,
      extra_fields: extraFields,
      university_id,
      last_seen: new Date().toISOString()
    }, { onConflict: "mac" });

    // Create session
    await supabase.from("wifi_sessions").insert({
      mac: clientMac,
      ip: params.client_ip,
      token,
      vendor: modem.vendor,
      gateway_ip: modem.gateway_ip,
      university_id,
      expires_at: authResult.expiresAt || new Date(Date.now()+10*60*1000).toISOString(),
      status: "active"
    });

    // Xu reward +5
    await supabase.from("xu_ledger").insert({
      phone,
      amount: 5,
      type: "wifi_auth",
      description: `WiFi ${modem.vendor} - ${fullName || phone}`,
      metadata: { mac: clientMac, token, university_id, extraFields }
    });

    // Student progress phone key
    await supabase.from("student_progress").upsert({
      phone,
      gpa: 3.6,
      xu: 5,
      last_wifi: new Date().toISOString(),
      university_id
    }, { onConflict: "phone" });

    return NextResponse.json({
      success: true,
      token,
      redirectUrl: authResult.redirectUrl,
      expiresAt: authResult.expiresAt,
      message: "Authorized"
    });

  } catch (e: any) {
    console.error("modem auth error", e);
    return NextResponse.json({ success: false, message: e.message }, { status: 500 });
  }
}
