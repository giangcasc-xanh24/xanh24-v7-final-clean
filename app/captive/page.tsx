'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
export const dynamic = 'force-dynamic';
const HOMEPAGE = 'https://xanh24.com.vn';

function CaptiveContent() {
  const sp = useSearchParams();
  const gw_id = sp.get('gw_id') || '10.10.1.23';
  const client_mac = sp.get('client_mac') || '';
  const client_ip = sp.get('client_ip') || '';
  const ap_mac = sp.get('ap_mac') || '';
  const wlan_id = sp.get('wlan_id') || '1';
  const university_id = sp.get('university_id') || 'dongdo';
  const [form, setForm] = useState({ full_name: '', phone: '', email: '', class: 'K31', faculty: 'CNTT' });
  const [upForm, setUpForm] = useState({ mssv: '', pkg: 'exclusive_100k' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showUpsell, setShowUpsell] = useState(false);
  const [countdown, setCountdown] = useState(600);

  useEffect(() => {
    if (!success || showUpsell) return;
    const t = setInterval(() => {
      setCountdown(c => { if (c <= 1) { setShowUpsell(true); return 0; } return c - 1; });
    }, 1000);
    return () => clearInterval(t);
  }, [success, showUpsell]);

  const onFree = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const r = await fetch('/api/captive/modem/auth', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, mssv: '', client_mac, client_ip, gw_id, ap_mac, wlan_id, university_id, original_url: HOMEPAGE, tier: 'FREE_10P' })
      });
      const d = await r.json();
      if (d.success) { setSuccess(true); if (d.gatewayAuthUrl) setTimeout(() => location.href = d.gatewayAuthUrl, 800); }
      else alert(d.message);
    } catch { alert('Loi ket noi'); } finally { setLoading(false); }
  };

  const onUp = async (e: any) => {
    e.preventDefault();
    if (!upForm.mssv) { alert('Nhap MSSV DD-K31-CNTT-001'); return; }
    setLoading(true);
    try {
      const r = await fetch('/api/vnpt/provision-number', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ old_phone: form.phone, mssv: upForm.mssv, package_id: upForm.pkg, university_id, full_name: form.full_name })
      });
      const d = await r.json();
      if (d.success) { alert('Nang cap ' + upForm.pkg + ' OK - MSSV ' + upForm.mssv); location.href = HOMEPAGE; }
      else alert(d.message);
    } catch { alert('Loi'); } finally { setLoading(false); }
  };

  if (showUpsell) {
    return (
      <div style={{ minHeight: '100vh', background: '#102E22', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <div style={{ background: 'white', borderRadius: '24px', padding: '24px', maxWidth: '390px', width: '100%' }}>
          <div style={{ textAlign: 'center' }}><div style={{ fontSize: '40px' }}>⏰</div><h2 style={{ color: '#D32F2F' }}>Het 10 phut mien phi</h2><p style={{ fontSize: '12px' }}>Nhap MSSV de tiep tuc {HOMEPAGE}</p></div>
          <div style={{ background: '#FFF3E0', padding: '12px', borderRadius: '12px', margin: '12px 0', fontSize: '12px' }}><b>🎁 EXCLUSIVE 100k BEST VALUE K31</b><div>SIM VNPT 30GB/ngay + 100 Xu + Freeship</div></div>
          <form onSubmit={onUp} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <input placeholder="MSSV DD-K31-CNTT-001 bat buoc" value={upForm.mssv} onChange={e => setUpForm({ ...upForm, mssv: e.target.value })} required style={{ padding: '12px', borderRadius: '12px', border: '2px solid #00A651' }} />
            <select value={upForm.pkg} onChange={e => setUpForm({ ...upForm, pkg: e.target.value })} style={{ padding: '12px', borderRadius: '12px', border: '1px solid #ddd' }}>
              <option value="exclusive_100k">Exclusive 100k 30 ngay SIM 30GB</option><option value="standard_50k">Standard 50k</option><option value="daily_5k">Daily 5k</option>
            </select>
            <button type="submit" disabled={loading} style={{ background: '#00A651', color: 'white', padding: '14px', borderRadius: '12px', border: 'none', fontWeight: 'bold' }}>{loading ? 'Dang xu ly...' : 'NANG CAP NGAY'}</button>
            <button type="button" onClick={() => location.href = HOMEPAGE} style={{ padding: '10px', borderRadius: '12px', border: '1px solid #ddd' }}>Quay lai {HOMEPAGE}</button>
          </form>
        </div>
      </div>
    );
  }

  if (success) {
    const m = Math.floor(countdown / 60); const s = countdown % 60;
    return (
      <div style={{ minHeight: '100vh', background: '#102E22', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <div style={{ background: 'white', borderRadius: '24px', padding: '32px', maxWidth: '390px', width: '100%', textAlign: 'center' }}>
          <div style={{ fontSize: '48px' }}>✅</div><h2 style={{ color: '#00A651' }}>Ket noi thanh cong!</h2>
          <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#00C853' }}>{String(m).padStart(2, '0')}:{String(s).padStart(2, '0')}</div>
          <button onClick={() => location.href = HOMEPAGE} style={{ width: '100%', background: '#00A651', color: 'white', padding: '12px', borderRadius: '12px', border: 'none', marginTop: '12px' }}>Tiep tuc {HOMEPAGE}</button>
          <div onClick={() => setShowUpsell(true)} style={{ marginTop: '12px', background: '#00C853', color: 'white', padding: '12px', borderRadius: '12px', cursor: 'pointer' }}>Het 10p - Bam de nhap MSSV nang cap 100k</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg,#102E22 0%,#0F3D2E 50%,#153D2B 100%)', padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: 'white', borderRadius: '24px', padding: '24px', maxWidth: '390px', width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ width: '32px', height: '32px', background: '#00A651', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>X24</div><div><div style={{ fontWeight: 'bold', color: '#00A651', fontSize: '14px' }}>Xanh24 x DONG DO</div><div style={{ fontSize: '10px', color: '#666' }}>HIGH-SPEED CAMPUS WIFI</div></div></div><div style={{ background: '#E8F5E9', color: '#00A651', padding: '4px 8px', borderRadius: '12px', fontSize: '10px' }}>Online</div>
        </div>
        <h1 style={{ textAlign: 'center', fontSize: '18px', fontWeight: 'bold' }}>WiFi KTX B - Mien phi 10 phut</h1>
        <p style={{ textAlign: 'center', color: '#00A651', fontSize: '11px', fontWeight: 'bold' }}>Khong can MSSV - Vao ngay {HOMEPAGE}</p>
        <p style={{ textAlign: 'center', color: '#666', fontSize: '11px', marginBottom: '16px' }}>10.10.1.23 • Ruijie • {client_mac || 'AA:BB:CC:DD:EE:FF'}</p>
        <form onSubmit={onFree} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <input placeholder="Ho va ten *" value={form.full_name} onChange={e => setForm({ ...form, full_name: e.target.value })} required style={{ padding: '12px', borderRadius: '12px', border: '1px solid #ddd' }} />
          <input placeholder="SDT 09xx *" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} required style={{ padding: '12px', borderRadius: '12px', border: '1px solid #ddd' }} />
          <input placeholder="Email *" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required style={{ padding: '12px', borderRadius: '12px', border: '1px solid #ddd' }} />
          <div style={{ display: 'flex', gap: '8px' }}><select value={form.class} onChange={e => setForm({ ...form, class: e.target.value })} style={{ flex: 1, padding: '12px', borderRadius: '12px', border: '1px solid #ddd' }}><option>K31</option><option>K32</option><option>Khach</option></select><select value={form.faculty} onChange={e => setForm({ ...form, faculty: e.target.value })} style={{ flex: 1, padding: '12px', borderRadius: '12px', border: '1px solid #ddd' }}><option>CNTT</option><option>Kinh te</option><option>Khac</option></select></div>
          <div style={{ background: '#E3F2FD', borderRadius: '8px', padding: '8px', fontSize: '11px', color: '#1565C0', textAlign: 'center' }}>Free 10p: Khong can MSSV - Vao luon {HOMEPAGE}</div>
          <button type="submit" disabled={loading} style={{ background: '#00C853', color: 'white', padding: '14px', borderRadius: '12px', border: 'none', fontWeight: 'bold' }}>{loading ? 'Dang ket noi...' : 'NHAN 10 PHUT MIEN PHI - VAO XANH24.COM.VN'}</button>
        </form>
        <div style={{ marginTop: '8px', fontSize: '9px', color: '#999', textAlign: 'center' }}>{HOMEPAGE} - CHECKIN_1789105301946 - Free no MSSV</div>
      </div>
    </div>
  );
}
export default function CaptivePage() {
  return (<Suspense fallback={<div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#102E22', color: 'white' }}>Dang tai {HOMEPAGE}...</div>}><CaptiveContent /></Suspense>);
}
