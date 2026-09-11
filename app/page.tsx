
import Link from 'next/link'
export default function Home(){
  return <div style={{padding:24,maxWidth:1200,margin:'0 auto'}}>
    <h1 style={{color:'#0A7A42'}}>🟢 Xanh24 v7 FINAL CLEAN - Day2 DONE - Supabase giữ nguyên</h1>
    <p style={{background:'#ECFDF5',padding:12,borderRadius:8}}>camera_checkins 2 + admin_blocks 10 + xu_ledger 4 + data_orders 2 + vnpt_logs 2 + vnpt_config 1 (510976 MB 49%) - PWA iOS+Android FIXED - No monorepo - Deploy 1 click Ready</p>
    <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:12,marginTop:24}}>
      <Link href='/data-5g' style={{border:'2px solid #0A7A42',padding:16,borderRadius:12,background:'#fff',textDecoration:'none',color:'#0A7A42'}}><b>M5 Data 5G LIVE 510976 MB</b><br/>Team Telco - Frozen API - iOS+Android ✅</Link>
      <Link href='/camera' style={{border:'1px solid #0A7A42',padding:16,borderRadius:12,background:'#F0FDF4',textDecoration:'none',color:'#0A7A42'}}><b>M2 Camera-QR FIXED</b><br/>playsinline + user gesture + NFC fallback</Link>
      <Link href='/admin' style={{border:'1px solid #ccc',padding:16,borderRadius:12,background:'#fff',textDecoration:'none',color:'#111'}}><b>M3 Admin-Khoi X0-X6</b><br/>1247 SV - YubiKey 404 - Telegram X0</Link>
      <Link href='/anti-fraud' style={{border:'1px solid #ef4444',padding:16,borderRadius:12,background:'#FFF1F2',textDecoration:'none',color:'#991B1B'}}><b>M7 Anti Fraud CORE</b><br/>checkFraud() chặn trước M5</Link>
      <Link href='/captive' style={{border:'1px solid #ccc',padding:16,borderRadius:12,background:'#fff',textDecoration:'none'}}><b>M1 Captive Portal</b><br/>KTX B WiFi</Link>
    </div>
    <div style={{marginTop:24,background:'#111',color:'#0f0',padding:16,borderRadius:12,fontFamily:'monospace',fontSize:11}}>
      ✅ CLEAN BUILD - No workspaces - No vercel.json double path - Root Directory = ./ - Ready 3s - No 404<br/>
      ✅ iOS+Android: playsinline webkit-playsinline muted + manifest + icon-180<br/>
      ✅ Supabase: Keep camera 2 + admin 10 + ledger 4 + orders 2 + logs 2 + config 1 - No need to re-run SQL
    </div>
  </div>
}
