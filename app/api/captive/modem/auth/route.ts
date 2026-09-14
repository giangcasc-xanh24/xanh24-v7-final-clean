import { NextRequest, NextResponse } from 'next/server';
import { ModemAdapterFactory } from '@/lib/modem/factory';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { client_mac, client_ip, gw_id, gateway_ip, university_id, full_name, phone, email, class: lop, faculty: khoa, mssv } = body;
    const gateway = gateway_ip || gw_id || '10.10.1.23';
    const mac = client_mac || 'AA:BB:CC:DD:EE:FF';
    const ip = client_ip || '10.10.1.100';
    const adapter = await ModemAdapterFactory.fromGatewayIp(gateway);
    const result = await adapter.authorize(mac, ip, 10, { university_id, full_name, phone, email, class: lop, faculty: khoa, mssv });
    return NextResponse.json({ success: true, ...result, checkin: 'CHECKIN_1789105301946', xu_reward: 5 });
  } catch (e: any) {
    return NextResponse.json({ success: false, message: e.message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get('token') || '';
  const mac = (searchParams.get('mac') || '').toUpperCase();
  if (!mac || !token) return new NextResponse('Auth: 0', { headers: { 'Content-Type': 'text/plain' } });
  try {
    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
    const { data } = await supabase.from('wifi_sessions').select('*').eq('token', token).eq('client_mac', mac).single();
    if (data && new Date(data.expires_at) > new Date()) return new NextResponse('Auth: 1', { headers: { 'Content-Type': 'text/plain' } });
  } catch {}
  return new NextResponse('Auth: 0', { headers: { 'Content-Type': 'text/plain' } });
}
