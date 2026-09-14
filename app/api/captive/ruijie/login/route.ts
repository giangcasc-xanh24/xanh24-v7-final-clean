import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { phone, fullName, mac, ip, gw_id, university_id, extraFields } = body;
    if (!phone || !mac) return NextResponse.json({ success: false, message: "Missing phone/mac" }, { status: 400 });
    const token = crypto.randomBytes(16).toString("hex");
    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
    await supabase.from("wifi_clients").upsert({ mac: mac.toLowerCase(), phone, full_name: fullName, university_id, last_seen: new Date().toISOString() }, { onConflict: "mac" });
    await supabase.from("wifi_sessions").insert({ mac: mac.toLowerCase(), ip: ip || null, token, vendor: "ruijie", gateway_ip: gw_id || "10.10.0.1", university_id, expires_at: new Date(Date.now()+10*60*1000).toISOString(), status: "active" });
    return NextResponse.json({ success: true, token, gatewayAuthUrl: `http://${gw_id || '10.10.1.23'}:2060/wifidog/auth?token=${token}` });
  } catch (e:any) { return NextResponse.json({ success: false, message: e.message }, { status: 500 }); }
}
