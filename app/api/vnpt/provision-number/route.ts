import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { phone, fullName, cccd, university_id } = await req.json();
    if (!phone) return NextResponse.json({ success: false, message: "Thiếu SĐT" }, { status: 400 });

    // Pick available number from pool
    const { data: pool, error } = await supabase.from("vnpt_phone_pool").select("*").eq("status", "available").limit(1).single();
    
    let assignedNumber = "0968123456";
    if (pool) {
      assignedNumber = pool.phone_number;
      await supabase.from("vnpt_phone_pool").update({ status: "reserved", reserved_by: phone, reserved_at: new Date().toISOString() }).eq("id", pool.id);
    }

    const { data: provision, error: insErr } = await supabase.from("vnpt_provisions").insert({
      phone,
      full_name: fullName,
      cccd,
      university_id,
      assigned_number: assignedNumber,
      status: "pending_otp",
      otp_code: Math.floor(100000 + Math.random()*900000).toString(),
      created_at: new Date().toISOString()
    }).select().single();

    if (insErr) throw insErr;

    // In production, call VNPT API here
    // await fetch("https://api.vnpt.vn/provision", { method:"POST", body: JSON.stringify({...}) })

    return NextResponse.json({
      success: true,
      provision_id: provision.id,
      assigned_number: assignedNumber,
      message: `Đã giữ số ${assignedNumber}, OTP đã gửi về ${phone}`
    });

  } catch (e: any) {
    console.error("vnpt provision error", e);
    return NextResponse.json({ success: false, message: e.message }, { status: 500 });
  }
}
