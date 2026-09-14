import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { phone, fullName, mac, ip, gw_id, university_id, extraFields } = body;

    if (!phone || !mac) return NextResponse.json({ success: false, message: "Missing phone/mac" }, { status: 400 });

    const token = crypto.randomBytes(16).toString("hex"); // 32-hex

    await supabase.from("wifi_clients").upsert({
      mac: mac.toLowerCase(),
      phone,
      full_name: fullName,
      university_id,
      extra_fields: extraFields,
      last_seen: new Date().toISOString()
    }, { onConflict: "mac" });

    await supabase.from("wifi_sessions").insert({
      mac: mac.toLowerCase(),
      ip: ip || null,
      token,
      vendor: "ruijie",
      gateway_ip: gw_id || "10.0.0.1",
      university_id,
      expires_at: new Date(Date.now()+10*60*1000).toISOString(),
      status: "active"
    });

    await supabase.from("xu_ledger").insert({
      phone,
      amount: 5,
      type: "wifi_auth",
      description: `Ruijie RG-EG210G-E ${fullName || phone}`,
      metadata: { mac, token }
    });

    const redirectUrl = `http://${gw_id || "10.0.0.1"}:2060/wifidog/auth?token=${token}`;

    return NextResponse.json({ success: true, token, redirectUrl });
  } catch (e: any) {
    return NextResponse.json({ success: false, message: e.message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token") || "";
  if (!token) return NextResponse.json({ success: false }, { status: 400 });
  const { data } = await supabase.from("wifi_sessions").select("*").eq("token", token).single();
  if (!data) return NextResponse.json({ success: false, message: "Token invalid" }, { status: 404 });
  return NextResponse.json({ success: true, session: data });
}
