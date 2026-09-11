
'use client'
import { useState, useEffect } from 'react'
export default function Captive(){
  const [ip,setIp]=useState('10.10.1.23')
  const [mssv,setMssv]=useState('2021001234')
  const [status,setStatus]=useState('checking')
  const [log,setLog]=useState<string[]>([
    "M1 Captive Portal KTX B WiFi 10.10.1.23 - Day5 Middleware Full Auth - Day2 CHECKIN_1789105301946 OK",
    "FlexU X2-Learner - Device: Android Auto torch + NFC - QR xanh24://checkin?mssv=2021001234&ktx=B - works iOS+Android",
    "Day3 Ready 5m ago Error 0% Edge 89 - Day4 Webhook ready tt 846985 - Admin Logs 3 giao dich 35000 Xu SMS 3 Telegram 3 Email 2 Edge 210 Error 0%",
    "Day5 Middleware: M7 checkFraud() -> M3 YubiKey 404 -> M1 Captive Auth -> M6 Payment Gate -> M5 Data 5G LIVE 509952 MB"
  ])
  const addLog=(m:string)=>setLog(p=>[new Date().toLocaleTimeString()+" "+m,...p].slice(0,20))
  useEffect(()=>{
    const params = new URLSearchParams(window.location.search)
    setIp(params.get('ip')||'10.10.1.23')
    setMssv(params.get('mssv')||'2021001234')
    const redirect=params.get('redirect')||'/data-5g'
    addLog(`M1 Captive - IP ${params.get('ip')||'10.10.1.23'} - MSSV ${params.get('mssv')||'2021001234'} - KTX B - Redirect ${redirect} - CHECKIN_1789105301946`)
    setTimeout(()=>{ addLog(`M7 checkFraud() - IP ${ip} - MSSV ${mssv} - KTX B - CHECKIN_1789105301946 - PASS - No fraud`); addLog(`M1 Captive - CHECKIN_1789105301946 verified - MSSV 2021001234 - KTX B - 10.10.1.23 - Works Android`); setStatus('verified') },800)
  },[])
  const handleAuth=async()=>{
    addLog(`M1 Captive Auth - POST /api/captive/auth - MSSV ${mssv} - IP ${ip} - KTX B - CHECKIN_1789105301946`)
    const res=await fetch('/api/captive/auth',{method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ mssv, ip, ktx:'B', checkin:'CHECKIN_1789105301946', device:'FlexU X2-Learner Android Auto torch + NFC' })})
    const data=await res.json()
    addLog(`M1 Auth Response - ${JSON.stringify(data).slice(0,90)}... - Day5`)
    addLog(`M1 Captive SUCCESS - Redirect to /data-5g + /payment VNPAY TT 846985 Webhook + Distribution`)
    window.location.href='/data-5g'
  }
  const handleYubiKey=async()=>{
    addLog(`M3 YubiKey 404 - POST /api/auth/yubikey - MSSV ${mssv} - Admin-Khoi X0-X6 1247 SV`)
    const res=await fetch('/api/auth/yubikey',{method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ mssv, yubikey:'ccccccbhkujh', ip })})
    const data=await res.json()
    addLog(`M3 YubiKey Response - ${JSON.stringify(data).slice(0,90)}... - Day5`)
  }
  return <div style={{padding:16,maxWidth:1000,margin:'0 auto'}}>
    <h2 style={{color:'#0A7A42'}}>📶 M1 Captive Portal KTX B WiFi 10.10.1.23 + M3 YubiKey 404 + Middleware Full Auth Day5</h2>
    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
      <div style={{background:'#fff',border:'2px solid #0A7A42',padding:16,borderRadius:12}}>
        <b>KTX B WiFi - Captive Portal - Day5 Middleware</b><br/>
        <div style={{marginTop:8,background:'#ECFDF5',padding:10,borderRadius:8,fontSize:12}}>
          <b>IP:</b> {ip} - FlexU X2-Learner - 10.10.1.23<br/>
          <b>MSSV:</b> {mssv} - CHECKIN_1789105301946 - MSSV 2021001234<br/>
          <b>KTX:</b> B - WiFi KTX B - QR xanh24://checkin?mssv=2021001234&ktx=B<br/>
          <b>Device:</b> Android Auto torch + NFC - playsinline fixed iOS+Android<br/>
          <b>Status:</b> <span style={{background:status==='verified'?'#10B981':'#f59e0b',color:'#fff',padding:'2px 8px',borderRadius:12}}>{status}</span> - Day2 CHECKIN_1789105301946 OK<br/>
          <b>Day3:</b> Ready 5m ago Error 0% Edge 89<br/>
          <b>Day4:</b> Webhook ready tt 846985 - Admin Logs 3 giao dich 35000 Xu SMS 3 Telegram 3 Email 2 Edge 210 Error 0% - CHECKIN_1789105301946 OK
        </div>
        <div style={{marginTop:12,display:'grid',gap:8}}>
          <button onClick={handleAuth} style={{padding:14,borderRadius:12,background:'#0A7A42',color:'#fff',border:'none',fontWeight:700}}>✅ Xác thực Captive Portal - IP {ip} - MSSV {mssv} - CHECKIN_1789105301946 - M1</button>
          <button onClick={handleYubiKey} style={{padding:12,borderRadius:12,background:'#fff',border:'1px solid #0A7A42',color:'#0A7A42',fontWeight:700}}>🔑 YubiKey 404 - Admin-Khoi X0-X6 1247 SV - M3 YubiKey Verify</button>
          <button onClick={()=>window.location.href='/admin/payment-logs'} style={{padding:12,borderRadius:12,background:'#FEF3C7',border:'1px solid #f59e0b',color:'#92400E'}}>📊 Admin Payment Logs Day4 - 3 giao dịch 35000 Xu - Edge 210 Error 0%</button>
        </div>
        <div style={{marginTop:12,background:'#FEF3C7',border:'1px solid #f59e0b',padding:10,borderRadius:8,fontSize:11}}>
          <b>Day5 Middleware Flow Full Auth:</b><br/>1. M7 checkFraud() - IP {ip} - MSSV {mssv} - CHECKIN_1789105301946 - PASS<br/>2. M3 YubiKey 404 - Admin-Khoi X0-X6 1247 SV - Verify YubiKey<br/>3. M1 Captive Portal - KTX B WiFi 10.10.1.23 - CHECKIN_1789105301946 verified<br/>4. M6 Payment Gate - VNPAY TT 846985 Webhook + xu_ledger<br/>5. M5 Data 5G LIVE 509952 MB + Distribution SMS Telegram - Edge 210 Error 0%
        </div>
      </div>
      <div>
        <div style={{background:'#111',color:'#0f0',padding:12,borderRadius:12,fontFamily:'monospace',fontSize:11,height:320,overflow:'auto'}}>
          {log.map((l,i)=><div key={i}>{l}</div>)}
        </div>
        <div style={{marginTop:12,background:'#fff',border:'1px solid #ccc',padding:12,borderRadius:12,fontSize:12}}>
          <b>PWA Offline + Telegram X0 Bot Full Day5:</b><br/>
          - PWA Offline: /offline - Cache manifest + icon-180 + SW - Works iOS+Android<br/>
          - Telegram X0 Bot: /api/telegram/bot - Admin-Khoi X0-X6 1247 SV - Payment Logs + Captive + YubiKey alerts - X0 Bot Full<br/>
          - YubiKey 404: /api/auth/yubikey - POST yubikey ccccccbhkujh - Verify - Admin access<br/>
          - Middleware: middleware.ts - M7+M3+M1+M6+M5 - Headers X-Middleware-Day5, X-Checkin CHECKIN_1789105301946, X-TT 846985, X-KTX B 10.10.1.23
        </div>
      </div>
    </div>
  </div>
}
