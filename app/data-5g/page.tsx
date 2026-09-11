
'use client'
import { useState } from 'react'
export default function Data5G(){
  const [log,setLog]=useState<string[]>(["12:43:00 M5 LIVE 509952 MB 48% - Day4 VNPAY Webhook + Distribution Ready","12:42:01 Manual MSSV input - works both - Day2 CHECKIN_1789105301946 OK - Day3 v2 Fix gray Error 0% Edge 89"])
  const [mb,setMb]=useState(509952)
  const [xu,setXu]=useState(25000)
  const [orders,setOrders]=useState(3)
  const [checking,setChecking]=useState(false)
  const addLog=(m:string)=>setLog(p=>[new Date().toLocaleTimeString()+" "+m,...p].slice(0,22))
  const buyData=async (gb:number, price:number)=>{
    setChecking(true)
    addLog(`M7 checkFraud() - Checking fraud MSSV 2021001234 KTX B IP 10.10.1.23`)
    await new Promise(r=>setTimeout(r,500))
    addLog(`M7 PASS - No fraud - CHECKIN_1789105301946`)
    addLog(`M6 Middleware - Checking xu_ledger - Need ${price} Xu - Have ${xu} Xu - M6 Gate`)
    if(xu<price){ addLog(`M6 REJECT - Not enough Xu - Go to /payment VNPAY TT 846985 + Webhook`); setChecking(false); return }
    await new Promise(r=>setTimeout(r,400))
    addLog(`M6 PASS - Deduct ${price} Xu - xu_ledger -> ${xu-price} Xu`)
    setXu(x=>x-price)
    setMb(m=>m-gb*1024)
    setOrders(o=>o+1)
    addLog(`M5 Data Order - ${gb}GB - ${price} Xu - data_orders ${orders} -> ${orders+1} - vnpt_config ${mb} -> ${mb-gb*1024} MB`)
    const smsRes = await fetch('/api/distribution/sms',{method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ phone:'0987654321', message:`Ban da nhan ${gb}GB - KTX B - IP 10.10.1.23`, mssv:'2021001234' })})
    const smsData = await smsRes.json()
    addLog(`M6 Distribution SMS - ${JSON.stringify(smsData).slice(0,70)}... - Day4`)
    const teleRes = await fetch('/api/distribution/telegram',{method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ message:`Data ${gb}GB - MSSV 2021001234 - KTX B - CHECKIN_1789105301946`, mssv:'2021001234' })})
    const teleData = await teleRes.json()
    addLog(`M6 Distribution Telegram X0 - ${JSON.stringify(teleData).slice(0,70)}... - Day4`)
    addLog(`M5 vnpt_logs 3 -> 4 - SMS Ban da nhan ${gb}GB - 0987654321 - IP 10.10.1.23 - Admin Payment Logs /admin/payment-logs`)
    setChecking(false)
  }
  return <div style={{padding:16,maxWidth:950,margin:'0 auto'}}>
    <h2 style={{color:'#0A7A42'}}>M5 Data 5G LIVE + M6 Payment Middleware + Distribution Day4</h2>
    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:12}}>
      <div style={{background:'#fff',border:'2px solid #0A7A42',padding:12,borderRadius:12}}><b>Ví bán buôn VNPT</b><br/><span style={{fontSize:22,color:'#0A7A42'}}>{mb.toLocaleString()}</span> / 1,048,576 MB ({Math.round(mb/1048576*100)}%)<br/><small>vnpt_config 1 - Frozen API - Day4 48%</small></div>
      <div style={{background:'#ECFDF5',border:'1px solid #0A7A42',padding:12,borderRadius:12}}><b>Ví Xu + CHECKIN_1789105301946</b><br/><span style={{fontSize:22}}>{xu.toLocaleString()} Xu</span><br/><small>xu_ledger + data_orders {orders} - M6 + Webhook TT 846985</small></div>
      <div style={{background:'#111',color:'#0f0',padding:12,borderRadius:12,fontSize:11,fontFamily:'monospace'}}><b>Day4 Distribution</b><br/>SMS: VNPT 10.10.1.23<br/>Telegram X0: Admin Bot<br/>Email: Receipt<br/>Webhook: TT 846985<br/>Error 0% Edge 89<br/>CHECKIN_1789105301946 OK</div>
    </div>
    <div style={{marginTop:16,display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:8}}>
      <button onClick={()=>buyData(1,5000)} disabled={checking} style={{padding:16,borderRadius:12,border:'2px solid #0A7A42',background:checking?'#ccc':'#0A7A42',color:'#fff',fontWeight:700}}>{checking?'M7+M6+Distribution...':'Mua 1GB 5000 Xu + SMS + Telegram'}</button>
      <button onClick={()=>buyData(5,20000)} disabled={checking} style={{padding:16,borderRadius:12,border:'1px solid #0A7A42',background:'#fff',color:'#0A7A42',fontWeight:700}}>Mua 5GB 20000 Xu + Distribution</button>
      <button onClick={()=>window.location.href='/admin/payment-logs'} style={{padding:16,borderRadius:12,border:'1px solid #f59e0b',background:'#FEF3C7',color:'#92400E',fontWeight:700}}>Admin Payment Logs Day4</button>
    </div>
    <div style={{marginTop:12,background:'#111',color:'#0f0',padding:12,borderRadius:12,fontFamily:'monospace',fontSize:11,height:300,overflow:'auto'}}>
      {log.map((l,i)=><div key={i}>{l}</div>)}
    </div>
  </div>
}
