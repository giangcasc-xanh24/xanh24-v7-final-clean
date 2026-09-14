import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { provision_id, otp, phone } = await req.json();
    if (!provision_id || !otp) return NextResponse.json({ success: false, message: "Thiếu OTP" }, { status: 400 });

    const { data: prov, error } = await supabase.from("vnpt_provisions").select("*").eq("id", provision_id).single();
    if (error || !prov) return NextResponse.json({ success: false, message: "Không tìm thấy yêu cầu" }, { status: 404 });

    if (prov.otp_code !== otp) {
      return NextResponse.json({ success: false, message: "OTP không đúng" }, { status: 400 });
    }

    await supabase.from("vnpt_provisions").update({ status: "confirmed", confirmed_at: new Date().toISOString() }).eq("id", provision_id);
    await supabase.from("vnpt_phone_pool").update({ status: "sold" }).eq("phone_number", prov.assigned_number);

    // Reward Xu
    await supabase.from("xu_ledger").insert({
      phone: prov.phone,
      amount: 50,
      type: "vnpt_provision",
      description: `Đăng ký VNPT số ${prov.assigned_number}`
    });

    return NextResponse.json({ success: true, message: `Chúc mừng! Số ${prov.assigned_number} đã thuộc về bạn`, assigned_number: prov.assigned_number });

  } catch (e: any) {
    return NextResponse.json({ success: false, message: e.message }, { status: 500 });
  }
}
