
import Link from 'next/link'
export default function Home(){
  return <div style={{padding:24,maxWidth:1250,margin:'0 auto'}}>
    <h1 style={{color:'#0A7A42'}}>🟢 Xanh24 v7 Day4 FINAL - VNPAY TT 846985 Webhook + Distribution + Admin Payment Logs - Day2 CHECKIN_1789105301946 OK</h1>
    <p style={{background:'#ECFDF5',padding:12,borderRadius:8,lineHeight:1.6}}>
      Supabase: camera_checkins 3 (CHECKIN_1789105301946 MSSV 2021001234 KTX B 10.10.1.23 FlexU X2-Learner) + admin_blocks 10 + xu_ledger 6 (Day3 +25000 Xu) + data_orders 3 (Mua 1GB 5000 Xu M6 Gate) + vnpt_logs 3 + vnpt_config 1 (509952 MB 48%) - PWA iOS+Android FIXED - Day3 v2 Fix gray Ready 5m ago Error 0% Edge 89 - Day4 VNPAY Webhook + Distribution SMS/Telegram + Admin Payment Logs
    </p>
    <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))',gap:12,marginTop:24}}>
      <Link href='/admin/payment-logs' style={{border:'3px solid #0A7A42',padding:16,borderRadius:12,background:'#ECFDF5',textDecoration:'none',color:'#0A7A42'}}><b>📊 Admin Payment Logs NEW Day4</b><br/>VNPAY TT 846985 Webhook + xu_ledger + data_orders + vnpt_logs + SMS + Telegram<br/><span style={{background:'#0A7A42',color:'#fff',padding:'2px 8px',borderRadius:12,fontSize:11}}>NEW Day4</span></Link>
      <Link href='/payment' style={{border:'2px solid #0A7A42',padding:16,borderRadius:12,background:'#fff',textDecoration:'none',color:'#0A7A42'}}><b>💰 M6 Payment Engine Day3 + Webhook Day4</b><br/>VNPAY QR Offline TT 846985 + Webhook /api/payment/vnpay/webhook + Xu Ledger</Link>
      <Link href='/data-5g' style={{border:'2px solid #0A7A42',padding:16,borderRadius:12,background:'#fff',textDecoration:'none',color:'#0A7A42'}}><b>M5 Data 5G LIVE 509952 MB + M6 + Distribution</b><br/>Mua 1GB 5000 Xu M6 Gate + Distribution SMS/Telegram + VNPT API 48%</Link>
      <Link href='/camera' style={{border:'1px solid #0A7A42',padding:16,borderRadius:12,background:'#F0FDF4',textDecoration:'none',color:'#0A7A42'}}><b>M2 Camera-QR FIXED Day2 OK</b><br/>CHECKIN_1789105301946 MSSV 2021001234 10.10.1.23 - playsinline + torch + NFC</Link>
      <Link href='/admin' style={{border:'1px solid #ccc',padding:16,borderRadius:12,background:'#fff',textDecoration:'none',color:'#111'}}><b>M3 Admin-Khoi X0-X6</b><br/>1247 SV - YubiKey 404 - Telegram X0 + Payment Logs</Link>
      <Link href='/anti-fraud' style={{border:'1px solid #ef4444',padding:16,borderRadius:12,background:'#FFF1F2',textDecoration:'none',color:'#991B1B'}}><b>M7 Anti Fraud CORE + M6 Gate</b><br/>checkFraud() + Webhook verify + Distribution gate</Link>
    </div>
    <div style={{marginTop:24,background:'#111',color:'#0f0',padding:16,borderRadius:12,fontFamily:'monospace',fontSize:11,lineHeight:1.6}}>
      ✅ Day2 DONE: CHECKIN_1789105301946 - MSSV 2021001234 KTX B IP 10.10.1.23 FlexU X2-Learner - camera_checkins (3) - Works Android - iOS+Android OK - Fix gray v2<br/>
      ✅ Day3 DONE: M6 Payment Engine VNPAY TT 846985 QR Offline - Middleware bán Data - xu_ledger 4->6 - data_orders 2->3 - vnpt_config 510976->509952 MB - Distribution SMS Ban da nhan 1GB - Ready 5m ago Error 0% Edge 89<br/>
      ✅ Day4 NEW: VNPAY TT 846985 Webhook /api/payment/vnpay/webhook - Verify + xu_ledger + Distribution SMS/Telegram + Admin Payment Logs - Admin Payment Logs /admin/payment-logs - Middleware Full<br/>
      ✅ CLEAN BUILD - Root ./ - Ready 3s - No 404 - PWA iOS+Android - playsinline webkit-playsinline muted + manifest + icon-180
    </div>
  </div>
}
