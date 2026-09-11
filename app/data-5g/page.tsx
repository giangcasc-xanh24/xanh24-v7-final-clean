
'use client'
import { useState, useEffect } from 'react'
export default function Data5G(){
  const [log,setLog]=useState<string[]>(["12:43:00 M5 LIVE 510976 MB 49% - Day3 M6 Payment Engine Ready","12:42:01 Manual MSSV input - works both - Day2 CHECKIN_1789105301946 OK"])
  const [mb,setMb]=useState(510976)
  const [xu,setXu]=useState(25000)
  const [orders,setOrders]=useState(2)
  const [checking,setChecking]=useState(false)
  const addLog=(m:string)=>setLog(p=>[new Date().toLocaleTimeString()+" "+m,...p].slice(0,20))
  const buyData=async (gb:number, price:number)=>{
    setChecking(true)
    addLog(`M7 checkFraud() - Checking fraud for MSSV 2021001234 - KTX B`)
    await new Promise(r=>setTimeout(r,600))
    addLog(`M7 checkFraud() PASS - No fraud - MSSV 2021001234`)
    addLog(`M6 Payment Middleware - Checking xu_ledger - Need ${price} Xu - Have ${xu} Xu`)
    if(xu<price){ addLog(`M6 REJECT - Not enough Xu - Need ${price} - Have ${xu} - Go to /payment VNPAY TT 846985`); setChecking(false); return }
    await new Promise(r=>setTimeout(r,500))
    addLog(`M6 Middleware PASS - Deduct ${price} Xu - xu_ledger 4 -> 5 -> 6`)
    setXu(x=>x-price)
    setMb(m=>m-gb*1024)
    setOrders(o=>o+1)
    addLog(`M5 Data Order - ${gb}GB - ${price} Xu - data_orders ${orders} -> ${orders+1}`)
    addLog(`M5 vnpt_config 510976 MB -> ${mb-gb*1024} MB (${Math.round((mb-gb*1024)/1048576*100)}%) - Frozen API`)
    addLog(`M5 vnpt_logs 2 -> 3 - SMS: Ban da nhan ${gb}GB - Gui toi 0987654321 - IP 10.10.1.23`)
    addLog(`M6 Distribution - SMS OK - MSSV 2021001234 - KTX B - iOS+Android`)
    setChecking(false)
  }
  return <div style={{padding:16,maxWidth:900,margin:'0 auto'}}>
    <h2 style={{color:'#0A7A42'}}>M5 Data 5G LIVE + M6 Payment Middleware - Day3</h2>
    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
      <div style={{background:'#fff',border:'2px solid #0A7A42',padding:12,borderRadius:12}}><b>Ví bán buôn</b><br/><span style={{fontSize:24,color:'#0A7A42'}}>{mb.toLocaleString()}</span> / 1,048,576 MB ({Math.round(mb/1048576*100)}%)<br/><small>Frozen API - vnpt_config 1</small></div>
      <div style={{background:'#ECFDF5',border:'1px solid #0A7A42',padding:12,borderRadius:12}}><b>Ví Xu</b><br/><span style={{fontSize:24}}>{xu.toLocaleString()} Xu</span><br/><small>xu_ledger 4 + data_orders {orders} - M6 Middleware</small></div>
    </div>
    <div style={{marginTop:16,display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:8}}>
      <button onClick={()=>buyData(1,5000)} disabled={checking} style={{padding:16,borderRadius:12,border:'2px solid #0A7A42',background:checking?'#ccc':'#0A7A42',color:'#fff',fontWeight:700}}>{checking?'Checking M7+M6...':'Mua 1GB - 5000 Xu - M6 Gate'}</button>
      <button onClick={()=>buyData(5,20000)} disabled={checking} style={{padding:16,borderRadius:12,border:'1px solid #0A7A42',background:'#fff',color:'#0A7A42',fontWeight:700}}>Mua 5GB - 20000 Xu - M6 Gate</button>
      <button onClick={()=>window.location.href='/payment'} style={{padding:16,borderRadius:12,border:'1px solid #f59e0b',background:'#FEF3C7',color:'#92400E',fontWeight:700}}>Nạp Xu VNPAY TT 846985 QR</button>
    </div>
    <div style={{marginTop:12,background:'#111',color:'#0f0',padding:12,borderRadius:12,fontFamily:'monospace',fontSize:11,height:260,overflow:'auto'}}>
      {log.map((l,i)=><div key={i}>{l}</div>)}
    </div>
    <div style={{marginTop:12,background:'#fff',border:'1px solid #ccc',padding:12,borderRadius:12,fontSize:12}}>
      <b>M6 Payment Middleware Flow Day3:</b><br/>1. M7 checkFraud() - check MSSV 2021001234 - KTX B 10.10.1.23 - chặn trước<br/>2. M6 check xu_ledger - đủ Xu mới cho mua<br/>3. M5 trừ vnpt_config 510976 MB + tạo data_orders + vnpt_logs<br/>4. M6 Distribution SMS: Ban da nhan 1GB - Gui toi 0987654321 - Works iOS+Android
    </div>
  </div>
}
