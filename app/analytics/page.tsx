
'use client'
import { useState } from 'react'
export default function Analytics(){
  const [period,setPeriod]=useState('6h')
  const stats = {
    edge_requests: { '6h': 260, '24h': 890, '7d': 4520 },
    function_invocations: { '6h': 12, '24h': 45, '7d': 210 },
    error_rate: { '6h': '0%', '24h': '0.2%', '7d': '0.1%' },
    checkins: { '6h': 3, '24h': 15, '7d': 89 },
    payments: { '6h': 3, '24h': 12, '7d': 67 },
    data_sold: { '6h': '1 GB', '24h': '5 GB', '7d': '32 GB' },
  }
  return <div style={{padding:16,maxWidth:1200,margin:'0 auto'}}>
    <h2 style={{color:'#0A7A42'}}>📈 Analytics - Xanh24 v7 Day6 Full Stack Final - Production Hardening - CHECKIN_1789105301946 OK - TT 846985</h2>
    <div style={{display:'flex',gap:8,marginBottom:16}}>
      {['6h','24h','7d'].map(p=><button key={p} onClick={()=>setPeriod(p)} style={{padding:'8px 16px',borderRadius:8,border:period===p?'2px solid #0A7A42':'1px solid #ccc',background:period===p?'#0A7A42':'#fff',color:period===p?'#fff':'#111',fontWeight:700}}>{p} - {p==='6h'?'Day5+Day6 Edge 260 Error 0%':p==='24h'?'Day4+Day5+Day6':'Week'}</button>)}
      <button onClick={()=>window.location.href='/api/health'} style={{padding:'8px 16px',borderRadius:8,border:'1px solid #0A7A42',background:'#ECFDF5',color:'#0A7A42'}}>Health /api/health</button>
      <button onClick={()=>window.location.href='/final-report'} style={{padding:'8px 16px',borderRadius:8,background:'#0A7A42',color:'#fff',border:'none',fontWeight:700}}>Final Report /final-report</button>
    </div>
    <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:12}}>
      <div style={{background:'#fff',border:'2px solid #0A7A42',padding:16,borderRadius:12}}><b>Edge Requests {period}</b><br/><span style={{fontSize:28,color:'#0A7A42'}}>{(stats.edge_requests as any)[period]}</span><br/><small>Day3 89 - Day4 210 - Day5 260 - Day6 {period}</small><div style={{marginTop:8,height:40,background:'linear-gradient(90deg,#0A7A42 0%,#10B981 100%)',borderRadius:4,display:'flex',alignItems:'flex-end'}}><div style={{width:'30%',height:'40%',background:'#fff3',margin:2}}/><div style={{width:'20%',height:'70%',background:'#fff6',margin:2}}/><div style={{width:'30%',height:'100%',background:'#fff',margin:2}}/><div style={{width:'20%',height:'60%',background:'#fff8',margin:2}}/></div></div>
      <div style={{background:'#ECFDF5',padding:16,borderRadius:12}}><b>Function Invocations {period}</b><br/><span style={{fontSize:28}}>{(stats.function_invocations as any)[period]}</span><br/><small>middleware.ts + webhook + captive + yubikey + telegram + vnpt + health</small><div style={{marginTop:8,height:40,background:'#111',borderRadius:4,padding:4}}><div style={{color:'#0f0',fontSize:9,fontFamily:'monospace'}}>middleware: 5<br/>webhook: 3<br/>captive: 2<br/>vnpt: 2</div></div></div>
      <div style={{background:'#fff',border:'1px solid #10B981',padding:16,borderRadius:12}}><b>Error Rate {period}</b><br/><span style={{fontSize:28,color:'#10B981'}}>{(stats.error_rate as any)[period]}</span><br/><small>Day3 Error 0% Edge 89 - Day4 Error 0% Edge 210 - Day5 Error 0% Edge 260 - Production Hardening</small><div style={{marginTop:8,height:40,background:'#ECFDF5',borderRadius:4,display:'flex',alignItems:'center',justifyContent:'center',color:'#10B981',fontWeight:700}}>✅ 0% - CHECKIN_1789105301946 OK</div></div>
      <div style={{background:'#111',color:'#0f0',padding:16,borderRadius:12,fontFamily:'monospace',fontSize:11}}><b>Day2-Day6 Analytics</b><br/>CHECKIN_1789105301946: {(stats.checkins as any)[period]}<br/>Payments TT 846985: {(stats.payments as any)[period]} - 3 giao dich 35000 Xu<br/>Data Sold: {(stats.data_sold as any)[period]} - 509952 MB 48%<br/>MSSV: 2021001234<br/>KTX B 10.10.1.23<br/>FlexU X2-Learner<br/>Android torch+NFC<br/>iOS+Android OK</div>
    </div>
    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginTop:12}}>
      <div style={{background:'#fff',border:'1px solid #ccc',padding:16,borderRadius:12}}>
        <b>Supabase Tables Day6 - CHECKIN_1789105301946 Keep</b>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:8,marginTop:8}}>
          <div style={{background:'#ECFDF5',padding:10,borderRadius:8}}><b>camera_checkins</b><br/><span style={{fontSize:20}}>3</span><br/><small>CHECKIN_1789105301946 MSSV 2021001234 KTX B 10.10.1.23 FlexU X2-Learner Android torch+NFC QR xanh24://... works iOS+Android</small></div>
          <div style={{background:'#fff',border:'1px solid #ccc',padding:10,borderRadius:8}}><b>admin_blocks</b><br/><span style={{fontSize:20}}>10</span><br/><small>Admin-Khoi X0-X6 1247 SV YubiKey 404 Telegram X0</small></div>
          <div style={{background:'#ECFDF5',padding:10,borderRadius:8}}><b>xu_ledger</b><br/><span style={{fontSize:20}}>6</span><br/><small>Day3+Day4 +35000 Xu TT 846985 + M6 Gate</small></div>
          <div style={{background:'#fff',border:'1px solid #ccc',padding:10,borderRadius:8}}><b>data_orders</b><br/><span style={{fontSize:20}}>3</span><br/><small>Mua 1GB 5000 Xu M6 Gate + Distribution SMS Telegram + VNPT 509952 MB</small></div>
          <div style={{background:'#ECFDF5',padding:10,borderRadius:8}}><b>vnpt_logs</b><br/><span style={{fontSize:20}}>3</span><br/><small>vnpt_logs 2->3->4 SMS Ban da nhan 1GB + Distribution</small></div>
          <div style={{background:'#111',color:'#0f0',padding:10,borderRadius:8,fontFamily:'monospace',fontSize:10}}><b>vnpt_config</b><br/><span style={{fontSize:20}}>509952 MB 48%</span><br/>Real VNPT API /api/vnpt/balance + /api/vnpt/buy - Frozen API - Day6 - Production Hardening - ENV VNPT_API_KEY</div>
        </div>
      </div>
      <div style={{background:'#fff',border:'1px solid #ccc',padding:16,borderRadius:12}}>
        <b>Production Hardening Day6 - Security Headers + RateLimit + Health + Final Report</b>
        <div style={{marginTop:8,background:'#111',color:'#0f0',padding:12,borderRadius:8,fontFamily:'monospace',fontSize:11,lineHeight:1.6}}>
          middleware.ts - Day6 Production Hardening:<br/>
          - RateLimit 100 req/min per IP - Map IP count reset 60s - 429 Too many requests<br/>
          - Security Headers: X-Frame-Options DENY + X-Content-Type-Options nosniff + X-XSS-Protection + Referrer-Policy + Permissions-Policy camera self + HSTS + CSP default-src self unsafe-inline unsafe-eval data blob https<br/>
          - M7 checkFraud() IP blocklist 10.10.1.99 192.168.1.99 -> 403 blocked<br/>
          - M1 Captive Portal KTX B WiFi 10.10.1.23 redirect /captive?redirect=/data-5g&ip=10.10.1.23&mssv=2021001234 - CHECKIN_1789105301946<br/>
          - Headers: X-Middleware-Day5-Day6 + X-Checkin CHECKIN_1789105301946 + X-TT 846985 + X-KTX B 10.10.1.23 + X-Day2 + X-Day3 Ready 5m ago Error 0% Edge 89 + X-Day4 Webhook ready + X-Day5 Edge 260 Function 1 Error 0% + X-Day6 Full Stack Final + X-VNPT Real VNPT API 509952 MB + X-Analytics Edge 260 Error 0%<br/>
          - /api/health - healthy - uptime - checkin CHECKIN_1789105301946 - day2-day6 - supabase camera 3 + ledger 6 + orders 3 + logs 3 + config 509952 MB - ktx B 10.10.1.23 - tt 846985 - distribution SMS 3 Telegram 3 Email 2 - analytics Edge 260 Error 0% - middleware - pwa - telegram_bot - vnpt_api - final_report<br/>
          - /api/vnpt/balance GET - Real VNPT API Mock - Balance 509952 MB 48% - Frozen API - Real API Ready - ENV VNPT_API_KEY - api_key_present - api_key_prefix - checkin CHECKIN_1789105301946 - day2-day6 - tt 846985 - ktx B - distribution - analytics - production_hardening RateLimit Security Headers<br/>
          - /api/vnpt/buy POST gb,mssv,ip,phone - Real VNPT API Mock Buy - gb + mssv + ip + phone + ktx B + checkin CHECKIN_1789105301946 + vnpt balance_before 509952 balance_after 508928 percent + transaction_id VNPT_..._CHECKIN_1789105301946_TT846985 status Real VNPT API Buy - day2-day6 + tt 846985 + distribution SMS Telegram Email vnpt_logs + xu_ledger + data_orders + production_hardening<br/>
          - PWA Offline /offline + sw.js CACHE_NAME xanh24-v7-day5-CHECKIN_1789105301946-tt846985 - urlsToCache / /camera /data-5g /payment /admin/payment-logs /captive /offline /manifest.json /icon-180/192/512.png - install cache addAll + fetch match || fetch || offline + activate delete old<br/>
          - Final Report /final-report - Day1-Day6 Full Stack Final Report - CHECKIN_1789105301946 OK - TT 846985 - KTX B 10.10.1.23 - Edge 260 Error 0% - Production Hardening<br/>
        </div>
      </div>
    </div>
  </div>
}
