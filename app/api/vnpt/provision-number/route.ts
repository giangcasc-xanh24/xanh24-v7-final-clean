import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/client';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const supabase = createClient();
    const { phone, user_id, package_id } = await req.json();

    if (!phone) {
      return NextResponse.json({ ok: false, error: 'phone required' }, { status: 400 });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString();

    const { error } = await supabase.from('vnpt_provisions').insert({
      phone,
      user_id: user_id || null,
      package_id: package_id || null,
      otp,
      status: 'pending',
      expires_at: expiresAt,
      created_at: new Date().toISOString(),
    });

    if (error) throw error;

    // TODO: integrate real VNPT API here
    // await vnptSendOTP(phone, otp);

    return NextResponse.json({
      ok: true,
      phone,
      otp_sent: true,
      // DO NOT return otp in production, only for dev
      dev_otp: process.env.NODE_ENV === 'development' ? otp : undefined,
      expires_at: expiresAt,
    });
  } catch (e: any) {
    console.error('[vnpt/provision-number]', e);
    return NextResponse.json({ ok: false, error: e.message }, { status: 500 });
  }
}
