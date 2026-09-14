'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

export const dynamic = 'force-dynamic';

function CaptiveContent() {
  const searchParams = useSearchParams();
  const gw_id = searchParams.get('gw_id') || searchParams.get('gateway_id') || '10.10.1.23';
  const client_mac = searchParams.get('client_mac') || searchParams.get('mac') || '';
  const client_ip = searchParams.get('client_ip') || searchParams.get('ip') || '';
  const ap_mac = searchParams.get('ap_mac') || '';
  const wlan_id = searchParams.get('wlan_id') || '1';
  const original_url = searchParams.get('url') || 'https://xanh24.com.vn';
  const university_id = searchParams.get('university_id') || 'dongdo';

  const [form, setForm] = useState({ full_name: '', phone: '', email: '', class: 'K31', faculty: 'CNTT', mssv: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [countdown, setCountdown] = useState(600);

  useEffect(() => {
    if (!success) return;
    const timer = setInterval(() => setCountdown(c => c > 0? c - 1 : 0), 1000);
    return () => clearInterval(timer);
  }, [success]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/captive/modem/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({...form, client_mac, client_ip, gw_id, ap_mac, wlan_id, university_id, original_url })
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(true);
        if (data.gatewayAuthUrl) setTimeout(() => { window.location.href = data.gatewayAuthUrl; }, 1500);
      } else alert(data.message || 'Lỗi xác thực');
    } catch { alert('Lỗi kết nối'); }
    finally { setLoading(false); }
  };

  if (success) {
    const mins = Math.floor(countdown / 60); const secs = countdown % 60;
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #102E22 0%, #0F3D2E 50%, #153D2B 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <div style={{ background: 'white', borderRadius: '24px', padding: '32px', maxWidth: '390px', width: '100%', textAlign: 'center' }}>
          <div style={{ fontSize: '48px' }}>✅</div>
          <h2 style={{ color: '#00A651', fontWeight: 'bold', fontSize: '20px', margin: '16px 0' }}>Kết nối thành công!</h2>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#00C853' }}>{String(mins).padStart(2,'0')}:{String(secs).padStart(2,'0')}</div>
          <div style={{ background: '#E8F5E9', borderRadius: '12px', padding: '12px', margin: '16px 0' }}>+5 Xu • GPA 3.6/4.0 • 78/130 • KTX B • CHECKIN_1789105301946</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #102E22 0%, #0F3D2E 50%, #153D2B 100%)', padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: 'white', borderRadius: '24px', padding: '24px', maxWidth: '390px', width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}><div style={{ width: '32px', height: '32px', background: '#00A651', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>X24</div><div><div style={{ fontWeight: 'bold', color: '#00A651', fontSize: '14px' }}>Xanh24 × ĐÔNG ĐÔ</div><div style={{ fontSize: '10px', color: '#666' }}>HIGH-SPEED CAMPUS WIFI</div></div></div>
          <div style={{ background: '#E8F5E9', color: '#00A651', padding: '4px 8px', borderRadius: '12px', fontSize: '10px' }}>● Online</div>
        </div>
        <h1 style={{ fontSize: '18px', fontWeight: 'bold', textAlign: 'center' }}>WiFi KTX B - Miễn phí 10 phút</h1>
        <p style={{ fontSize: '12px', color: '#666', textAlign: 'center', marginBottom: '16px' }}>10.10.1.23 • Ruijie RG-EG210G-E • {client_mac || 'AA:BB:CC:DD:EE:FF'}</p>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <input placeholder="Họ và tên" value={form.full_name} onChange={e=>setForm({...form, full_name:e.target.value})} required style={{ padding: '12px', borderRadius: '12px', border: '1px solid #ddd' }} />
          <input placeholder="SĐT 09xx" value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} required style={{ padding: '12px', borderRadius: '12px', border: '1px solid #ddd' }} />
          <input placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} required style={{ padding: '12px', borderRadius: '12px', border: '1px solid #ddd' }} />
          <div style={{ display: 'flex', gap: '8px' }}><select value={form.class} onChange={e=>setForm({...form, class:e.target.value})} style={{ flex:1, padding: '12px', borderRadius: '12px', border: '1px solid #ddd' }}><option>K31</option><option>K32</option></select><select value={form.faculty} onChange={e=>setForm({...form, faculty:e.target.value})} style={{ flex:1, padding: '12px', borderRadius: '12px', border: '1px solid #ddd' }}><option>CNTT</option><option>Kinh tế</option></select></div>
          <input placeholder="MSSV DD-K31-CNTT-001" value={form.mssv} onChange={e=>setForm({...form, mssv:e.target.value})} required style={{ padding: '12px', borderRadius: '12px', border: '1px solid #ddd' }} />
          <button type="submit" disabled={loading} style={{ background: '#00C853', color: 'white', padding: '14px', borderRadius: '12px', border: 'none', fontWeight: 'bold' }}>{loading? 'Đang kết nối...' : 'NHẬN 10 PHÚT MIỄN PHÍ'}</button>
        </form>
      </div>
    </div>
  );
}

export default function CaptivePage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#102E22', color: 'white' }}>Đang tải WiFi Xanh24...</div>}>
      <CaptiveContent />
    </Suspense>
  );
}
