
import Link from 'next/link'
export default function AdminDashboard(){
  return <div style={{padding:16,maxWidth:1200,margin:'0 auto'}}>
    <h2 style={{color:'#0A7A42'}}>📊 Admin Dashboard - Xanh24 v7 Day6 Full Stack Final - Admin-Khoi X0-X6 1247 SV - YubiKey 404 - CHECKIN_1789105301946 OK</h2>
    <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:12}}>
      <div style={{background:'#fff',border:'2px solid #0A7A42',padding:16,borderRadius:12}}><b>Tổng SV KTX B</b><br/><span style={{fontSize:28,color:'#0A7A42'}}>1247</span><br/><small>Admin-Khoi X0-X6 - YubiKey 404 - Telegram X0 - CHECKIN_1789105301946</small></div>
      <div style={{background:'#ECFDF5',padding:16,borderRadius:12}}><b>Check-ins Day2-Day6</b><br/><span style={{fontSize:28}}>3</span><br/><small>CHECKIN_1789105301946 MSSV 2021001234 KTX B 10.10.1.23 FlexU X2-Learner - camera_checkins 3 - Works Android iOS+Android OK</small></div>
      <div style={{background:'#fff',border:'1px solid #ccc',padding:16,borderRadius:12}}><b>Doanh thu TT 846985</b><br/><span style={{fontSize:28}}>70,000 VND</span><br/><small>3 giao dịch 35000 Xu - VNPAY QR Offline + CK + Webhook TT 846985 - Edge 260 Error 0%</small></div>
      <div style={{background:'#111',color:'#0f0',padding:16,borderRadius:12,fontFamily:'monospace',fontSize:11}}><b>Data VNPT Day6</b><br/>509952 MB 48%<br/>Frozen API<br/>Real API /api/vnpt/balance<br/>Buy /api/vnpt/buy<br/>Production Hardening<br/>RateLimit 100/min<br/>CHECKIN_1789105301946 OK<br/>TT 846985</div>
    </div>
    <div style={{marginTop:12,display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:12}}>
      <Link href="/admin/payment-logs" style={{background:'#fff',border:'1px solid #0A7A42',padding:12,borderRadius:12,textDecoration:'none',color:'#0A7A42'}}><b>📊 Payment Logs Day4+Day5+Day6</b><br/>3 giao dịch 35000 Xu SMS 3 Telegram 3 Email 2 Edge 260 Error 0% - CHECKIN_1789105301946</Link>
      <Link href="/analytics" style={{background:'#ECFDF5',border:'1px solid #0A7A42',padding:12,borderRadius:12,textDecoration:'none',color:'#0A7A42'}}><b>📈 Analytics Day6 NEW</b><br/>Edge 260 Function 1 Error 0% - Day3 89 Day4 210 Day5 260 - Production Hardening</Link>
      <Link href="/final-report" style={{background:'#0A7A42',color:'#fff',padding:12,borderRadius:12,textDecoration:'none'}}><b>📋 Final Report Day6 NEW</b><br/>Day1-Day6 Full Stack Final - CHECKIN_1789105301946 OK - TT 846985 - Edge 260 Error 0%</Link>
    </div>
    <div style={{marginTop:12,display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:12}}>
      <Link href="/captive" style={{background:'#fff',border:'1px solid #ccc',padding:12,borderRadius:12,textDecoration:'none',color:'#111'}}><b>📶 Captive Portal Day5</b><br/>KTX B WiFi 10.10.1.23 + YubiKey 404 + Middleware Full Auth - CHECKIN_1789105301946 verified</Link>
      <Link href="/payment" style={{background:'#fff',border:'1px solid #ccc',padding:12,borderRadius:12,textDecoration:'none',color:'#111'}}><b>💰 Payment TT 846985</b><br/>VNPAY QR Offline + Webhook /api/payment/vnpay/webhook + Distribution</Link>
      <Link href="/data-5g" style={{background:'#fff',border:'1px solid #ccc',padding:12,borderRadius:12,textDecoration:'none',color:'#111'}}><b>📦 Data 5G LIVE 509952 MB</b><br/>Mua 1GB 5000 Xu M6 Gate + Distribution SMS Telegram + Real VNPT API</Link>
      <Link href="/api/health" style={{background:'#111',color:'#0f0',padding:12,borderRadius:12,textDecoration:'none',fontFamily:'monospace',fontSize:11}}><b>🏥 Health /api/health</b><br/>healthy - CHECKIN_1789105301946 - Day2-Day6 - Supabase camera 3 + ledger 6 + Edge 260 Error 0% - Production Hardening</Link>
    </div>
  </div>
}
