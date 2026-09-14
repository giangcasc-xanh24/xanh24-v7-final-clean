'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

export const dynamic = 'force-dynamic';

// HOMEPAGE CHÍNH XANH24 - https://xanh24.com.vn
const HOMEPAGE = 'https://xanh24.com.vn';

function CaptiveContent() {
  const searchParams = useSearchParams();
  const gw_id = searchParams.get('gw_id') || searchParams.get('gateway_id') || '10.10.1.23';
  const client_mac = searchParams.get('client_mac') || searchParams.get('mac') || '';
  const client_ip = searchParams.get('client_ip') || searchParams.get('ip') || '';
  const ap_mac = searchParams.get('ap_mac') || '';
  const wlan_id = searchParams.get('wlan_id') || '1';
  // url gốc từ Ruijie - nếu không có thì về xanh24.com.vn homepage
  const original_url = searchParams.get('url') || HOMEPAGE;
  const university_id = searchParams.get('university_id') || 'dongdo';

  const [form, setForm] = useState({ 
    full_name: '', 
    phone: '', 
    email: '', 
    class: 'K31', 
    faculty: 'CNTT'
  });
  
  const [upgradeForm, setUpgradeForm] = useState({
    mssv: '',
    package: 'exclusive_100k'
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showUpsell, setShowUpsell] = useState(false);
  const [countdown, setCountdown] = useState(600);
  const [gatewayUrl, setGatewayUrl] = useState('');

  useEffect(() => {
    if (!success || showUpsell) return;
    const timer = setInterval(() => {
      setCountdown(c => {
        if (c <= 1) {
          setShowUpsell(true);
          return 0;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [success, showUpsell]);

  const handleFreeSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/captive/modem/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          full_name: form.full_name,
          phone: form.phone,
          email: form.email,
          class: form.class,
          faculty: form.faculty,
          mssv: '', // FREE KHÔNG CẦN MSSV
          client_mac, 
          client_ip, 
          gw_id, 
          ap_mac, 
          wlan_id, 
          university_id, 
          original_url: HOMEPAGE, // LUÔN VỀ xanh24.com.vn homepage sau khi auth
          tier: 'FREE_10P',
          homepage: HOMEPAGE
        })
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(true);
        setGatewayUrl(data.gatewayAuthUrl || '');
        // Auth Ruijie WISPr - Sau đó về xanh24.com.vn
        if (data.gatewayAuthUrl) {
          setTimeout(() => { 
            window.location.href = data.gatewayAuthUrl;
          }, 1000);
        }
      } else {
        alert(data.message || 'Lỗi xác thực');
      }
    } catch {
      alert('Lỗi kết nối - kiểm tra /api/captive/modem/auth');
    } finally {
      setLoading(false);
    }
  };

  const handleUpgradeSubmit = async (e: any) => {
    e.preventDefault();
    if (!upgradeForm.mssv) {
      alert('Vui lòng nhập MSSV để nâng cấp gói - VD: DD-K31-CNTT-001');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/vnpt/provision-number', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          old_phone: form.phone,
          mssv: upgradeForm.mssv,
          package_id: upgradeForm.package,
          package: upgradeForm.package,
          university_id,
          full_name: form.full_name,
          email: form.email,
          homepage: HOMEPAGE
        })
      });
      const data = await res.json();
      if (data.success) {
        alert(`Nâng cấp ${upgradeForm.package} thành công! MSSV ${upgradeForm.mssv} - SĐT mới ${data.new_phone || data.phone || form.phone} - Về ${HOMEPAGE}`);
        window.location.href = HOMEPAGE;
      } else {
        alert(data.message || 'Lỗi nâng cấp - thử lại');
      }
    } catch {
      alert('Lỗi kết nối provision-number');
    } finally {
      setLoading(false);
    }
  };

  if (showUpsell) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #102E22 0%, #0F3D2E 50%, #153D2B 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <div style={{ background: 'white', borderRadius: '24px', padding: '24px', maxWidth: '390px', width: '100%' }}>
          <div style={{ textAlign: 'center', marginBottom: '16px' }}>
            <div style={{ fontSize: '40px' }}>⏰</div>
            <h2 style={{ color: '#D32F2F', fontWeight: 'bold', fontSize: '18px', margin: '8px 0' }}>Hết 10 phút miễn phí</h2>
            <p style={{ fontSize: '13px', color: '#666' }}>Nhập MSSV để nâng cấp - Tiếp tục lướt {HOMEPAGE}</p>
          </div>
          <div style={{ background: '#FFF3E0', borderRadius: '12px', padding: '12px', marginBottom: '16px', border: '1px solid #FFB74D' }}>
            <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#E65100' }}>🎁 EXCLUSIVE 100k - BEST VALUE K31</div>
            <div style={{ fontSize: '11px', color: '#666', marginTop: '4px' }}>✓ SIM VNPT miễn phí + Data 30GB/ngày + 100 Xu + Freeship {HOMEPAGE}</div>
          </div>
          <form onSubmit={handleUpgradeSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <input placeholder="MSSV bắt buộc - VD: DD-K31-CNTT-001 hoặc SE170123" value={upgradeForm.mssv} onChange={e=>setUpgradeForm({...upgradeForm, mssv:e.target.value})} required style={{ padding: '12px', borderRadius: '12px', border: '2px solid #00A651', fontSize: '14px', fontWeight: 'bold' }} />
            <select value={upgradeForm.package} onChange={e=>setUpgradeForm({...upgradeForm, package:e.target.value})} style={{ padding: '12px', borderRadius: '12px', border: '1px solid #ddd', fontSize: '14px' }}>
              <option value="exclusive_100k">Exclusive 100k - 30 ngày + SIM VNPT 30GB (BEST VALUE) - {HOMEPAGE}</option>
              <option value="standard_50k">Standard 50k - 30 ngày 30GB</option>
              <option value="daily_5k">Daily 5k - 1 ngày 5GB</option>
            </select>
            <div style={{ background: '#E8F5E9', borderRadius: '8px', padding: '8px', fontSize: '11px', color: '#2E7D32' }}>Đã lưu: {form.full_name} - {form.phone} - {form.class} {form.faculty} - {university_id} - Homepage {HOMEPAGE}</div>
            <button type="submit" disabled={loading} style={{ background: 'linear-gradient(90deg, #00A651, #00C853)', color: 'white', padding: '14px', borderRadius: '12px', border: 'none', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer' }}>{loading ? 'Đang xử lý...' : 'NÂNG CẤP NGAY - NHẬN SIM VNPT - VỀ XANH24'}</button>
            <button type="button" onClick={()=>{setShowUpsell(false); window.location.href=HOMEPAGE;}} style={{ background: 'white', color: '#666', padding: '10px', borderRadius: '12px', border: '1px solid #ddd', fontSize: '12px' }}>Quay lại {HOMEPAGE} - Tiếp tục Free 0p</button>
          </form>
          <div style={{ marginTop: '12px', fontSize: '10px', color: '#999', textAlign: 'center' }}>CHECKIN_1789105301946 • {client_mac} • {HOMEPAGE}</div>
        </div>
      </div>
    );
  }

  if (success) {
    const mins = Math.floor(countdown / 60);
    const secs = countdown % 60;
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #102E22 0%, #0F3D2E 50%, #153D2B 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <div style={{ background: 'white', borderRadius: '24px', padding: '32px', maxWidth: '390px', width: '100%', textAlign: 'center' }}>
          <div style={{ fontSize: '48px' }}>✅</div>
          <h2 style={{ color: '#00A651', fontWeight: 'bold', fontSize: '20px', margin: '16px 0' }}>Kết nối thành công!</h2>
          <div style={{ fontSize: '36px', fontWeight: 'bold', color: countdown < 60 ? '#D32F2F' : '#00C853', margin: '16px 0' }}>{String(mins).padStart(2,'0')}:{String(secs).padStart(2,'0')}</div>
          <div style={{ width: '100%', height: '6px', background: '#E0E0E0', borderRadius: '3px', overflow: 'hidden', marginBottom: '16px' }}>
            <div style={{ width: `${(countdown/600)*100}%`, height: '100%', background: countdown < 60 ? '#D32F2F' : '#00C853', transition: 'width 1s linear' }}></div>
          </div>
          <div style={{ background: '#E8F5E9', borderRadius: '12px', padding: '12px', margin: '16px 0', fontSize: '12px' }}>+5 Xu • {form.class} {form.faculty} • KTX B • CHECKIN_1789105301946 • Free no MSSV</div>
          <button onClick={()=>window.location.href=HOMEPAGE} style={{ width: '100%', background: '#00A651', color: 'white', padding: '12px', borderRadius: '12px', border: 'none', fontWeight: 'bold', marginBottom: '12px' }}>Tiếp tục lướt {HOMEPAGE} →</button>
          <div style={{ background: 'linear-gradient(90deg, #00A651, #00C853)', color: 'white', borderRadius: '12px', padding: '12px', fontSize: '12px', cursor: 'pointer' }} onClick={()=>setShowUpsell(true)}>🎁 Hết 10p - Nâng cấp Exclusive 100k SIM VNPT 30GB + 100 Xu - Bấm để nhập MSSV</div>
          <div style={{ marginTop: '12px', fontSize: '10px', color: '#999' }}>{client_mac} • {gw_id} • Free không cần MSSV • {HOMEPAGE}</div>
          {gatewayUrl && <div style={{ marginTop: '8px', fontSize: '9px', color: '#999', wordBreak: 'break-all' }}>GW: {gatewayUrl}</div>}
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #102E22 0%, #0F3D2E 50%, #153D2B 100%)', padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: 'white', borderRadius: '24px', padding: '24px', maxWidth: '390px', width: '100%', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '32px', height: '32px', background: '#00A651', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>X24</div>
            <div><div style={{ fontWeight: 'bold', color: '#00A651', fontSize: '14px' }}>Xanh24 × ĐÔNG ĐÔ</div><div style={{ fontSize: '10px', color: '#666' }}>HIGH-SPEED CAMPUS WIFI</div></div>
          </div>
          <div style={{ background: '#E8F5E9', color: '#00A651', padding: '4px 8px', borderRadius: '12px', fontSize: '10px' }}>● Online</div>
        </div>
        <h1 style={{ fontSize: '18px', fontWeight: 'bold', textAlign: 'center', marginBottom: '4px' }}>WiFi KTX B - Miễn phí 10 phút</h1>
        <p style={{ fontSize: '11px', color: '#00A651', textAlign: 'center', marginBottom: '4px', fontWeight: 'bold' }}>✓ Không cần MSSV - Vào ngay {HOMEPAGE}</p>
        <p style={{ fontSize: '11px', color: '#666', textAlign: 'center', marginBottom: '16px' }}>10.10.1.23 • Ruijie RG-EG210G-E • {client_mac || 'AA:BB:CC:DD:EE:FF'}</p>
        <form onSubmit={handleFreeSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <input placeholder="Họ và tên - VD: Nguyễn Văn A *" value={form.full_name} onChange={e=>setForm({...form, full_name:e.target.value})} required style={{ padding: '12px', borderRadius: '12px', border: '1px solid #ddd', fontSize: '14px' }} />
          <input placeholder="SĐT 09xx xxx xxx *" value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} required style={{ padding: '12px', borderRadius: '12px', border: '1px solid #ddd', fontSize: '14px' }} />
          <input placeholder="Email - VD: a.k31@dongdo.edu.vn *" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} required style={{ padding: '12px', borderRadius: '12px', border: '1px solid #ddd', fontSize: '14px' }} />
          <div style={{ display: 'flex', gap: '8px' }}>
            <select value={form.class} onChange={e=>setForm({...form, class:e.target.value})} style={{ flex: 1, padding: '12px', borderRadius: '12px', border: '1px solid #ddd', fontSize: '13px' }}>
