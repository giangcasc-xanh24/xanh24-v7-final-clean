import { NextRequest, NextResponse } from 'next/server';
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const mac = (searchParams.get('mac') || '').toUpperCase();
  const token = searchParams.get('token') || '';
  try {
    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
    const { data } = await supabase.from('wifi_sessions').select('*').eq('token', token).eq('client_mac', mac).single();
    if (data && new Date(data.expires_at) > new Date()) return new NextResponse('Auth: 1', { headers: { 'Content-Type': 'text/plain' } });
  } catch {}
  return new NextResponse('Auth: 0', { headers: { 'Content-Type': 'text/plain' } });
}
export async function POST(req: NextRequest) { return GET(req); }
