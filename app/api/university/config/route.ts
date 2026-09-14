// app/api/university/config/route.ts - FIXED
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/client';

export const dynamic = 'force-dynamic';

const DEFAULT_FIELDS = {
  mssv: { label: 'MSSV', required: true, type: 'text' },
  full_name: { label: 'Họ tên', required: true, type: 'text' },
  faculty: { label: 'Khoa', required: false, type: 'select', options: ['CNTT', 'DTVT', 'KT'] },
  dorm: { label: 'Ký túc xá', required: false, type: 'text' },
};

export async function GET(req: NextRequest) {
  try {
    const supabase = createClient();
    const university = req.nextUrl.searchParams.get('university') || req.nextUrl.searchParams.get('code') || 'default';

    const { data, error } = await supabase
      .from('university_configs')
      .select('code, name, fields_config, branding')
      .eq('code', university)
      .maybeSingle();

    if (error) throw error;

    if (!data) {
      return NextResponse.json({
        code: university,
        name: university,
        fields_config: DEFAULT_FIELDS,
        branding: { primary: '#16a34a', logo: '/logo.png' },
        fallback: true,
      });
    }

    return NextResponse.json({
      code: data.code,
      name: data.name,
      fields_config: data.fields_config || DEFAULT_FIELDS,
      branding: data.branding,
    });
  } catch (e: any) {
    console.error('[university/config]', e);
    return NextResponse.json({
      code: 'default',
      fields_config: DEFAULT_FIELDS,
      error: e.message,
      fallback: true,
    });
  }
}
