// app/api/vnpt/confirm-number/route.ts - FIXED
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/client';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const supabase = createClient();
    const { phone, otp, token } = await req.json();
    const code = otp || token;

    if (!phone || !code) {
      return NextResponse.json({ ok: false, error: 'phone and otp required' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('vnpt_provisions')
      .select('*')
      .eq('phone', phone)
      .eq('status', 'pending')
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) throw error;
    if (!data) {
      return NextResponse.json({ ok: false, error: 'No pending provision' }, { status: 404 });
    }

    if (new Date(data.expires_at) < new Date()) {
      await supabase.from('vnpt_provisions').update({ status: 'expired' }).eq('id', data.id);
      return NextResponse.json({ ok: false, error: 'OTP expired' }, { status: 410 });
    }

    if (data.otp !== code) {
      return NextResponse.json({ ok: false, error: 'Invalid OTP' }, { status: 401 });
    }

    await supabase.from('vnpt_provisions').update({ 
      status: 'confirmed',
      confirmed_at: new Date().toISOString()
    }).eq('id', data.id);

    return NextResponse.json({
      ok: true,
      phone,
      confirmed: true,
      provision_id: data.id,
    });
  } catch (e: any) {
    console.error('[vnpt/confirm-number]', e);
    return NextResponse.json({ ok: false, error: e.message }, { status: 500 });
  }
}
