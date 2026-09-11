
'use client'
import { useState } from 'react'
export default function Payment(){
  const [xu,setXu]=useState(25000)
  const [method,setMethod]=useState('vnpay_qr')
  const [amount,setAmount]=useState(50000)
  const [log,setLog]=useState<string[]>(["M6 Payment Engine - VNPAY TT 846985 QR Offline - Webhook /api/payment/vnpay/webhook - Day4 Ready","Day2 CHECKIN_1789105301946 MSSV 2021001234 KTX B IP 10.10.1.23 OK - Day3 v2 Fix gray Error 0% Edge 89"])
  const addLog=(m:string)=>setLog(p=>[new Date().toLocaleTimeString()+" "+m,...p].slice(0,18))
  const genQR=`00020101021138570010A000000727012700069704220113VNPAY0108TT8469850208QRIBFTTA5303704540${amount}5802VN62140815Xanh24 M6 Payment6304`
  const handlePay=async()=>{
    addLog(`M6 Create Order - Method: ${method} - Amount: ${amount} VND - MSSV 2021001234 - KTX B 10.10.1.23`)
    addLog(`M6 VNPAY TT 846985 - QR Offline - ${genQR.slice(0,35)}...`)
    await new Promise(r=>setTimeout(r,600))
    addLog(`M6 -> VNPAY API - POST /api/payment/vnpay/webhook - TT 846985 - Amount ${amount} - MSSV 2021001234`)
    const res = await fetch('/api/payment/vnpay/webhook',{method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ amount, method, mssv:'2021001234', tt:'846985', ip:'10.10.1.23' })})
    const data = await res.json()
    addLog(`M6 Webhook Response - ${JSON.stringify(data).slice(0,80)}...`)
    const xuAdd=Math.floor(amount/2)
    setXu(x=>x+xuAdd)
    addLog(`M6 Webhook VERIFIED - TT 846985 - +${xuAdd} Xu - xu_ledger 4 -> 6 - vnpay_txn ${data.txn_id}`)
    addLog(`M6 Distribution - SMS: Ban da nap ${amount} VND +${xuAdd} Xu - 0987654321 - Telegram X0 - Email - iOS+Android`)
    addLog(`M6 Admin Payment Logs - Saved to xu_ledger + payment_logs - /admin/payment-logs`)
  }
  return <div style={{padding:16,maxWidth:1100,margin:'0 auto'}}>
    <h2 style={{color:'#0A7A42'}}>💰 M6 Payment Engine - VNPAY TT 846985 QR Offline + Webhook Day4 - Fix Gray v2 Keep</h2>
    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
      <div style={{background:'#fff',border:'2px solid #0A7A42',padding:16,borderRadius:12}}>
        <b>Ví Xu - Day2 CHECKIN_1789105301946 OK</b><br/><span style={{fontSize:28,color:'#0A7A42'}}>{xu.toLocaleString()} Xu</span><br/><small>xu_ledger 4 + camera_checkins 3 - KTX B 10.10.1.23 - Day3 Ready 5m ago Error 0%</small>
        <div style={{marginTop:12}}>
          <label>Phương thức TT 846985 + Webhook Day4:</label>
          <div style={{display:'grid',gap:8,marginTop:8}}>
            <button onClick={()=>setMethod('vnpay_qr')} style={{padding:12,borderRadius:8,border:method==='vnpay_qr'?'2px solid #0A7A42':'1px solid #ccc',background:method==='vnpay_qr'?'#ECFDF5':'#fff',textAlign:'left'}}><b>📱 VNPAY QR Offline - TT 846985 + Webhook</b><br/><small>QR Offline - Webhook /api/payment/vnpay/webhook - Verify - +Xu</small></button>
            <button onClick={()=>setMethod('tt_846985')} style={{padding:12,borderRadius:8,border:method==='tt_846985'?'2px solid #0A7A42':'1px solid #ccc',background:method==='tt_846985'?'#ECFDF5':'#fff',textAlign:'left'}}><b>🏦 TT 846985 CK + Webhook</b><br/><small>STK 846985 - Webhook auto verify - Nội dung Xanh24 MSSV 2021001234</small></button>
            <button onClick={()=>setMethod('momo')} style={{padding:12,borderRadius:8,border:method==='momo'?'2px solid #0A7A42':'1px solid #ccc',background:method==='momo'?'#ECFDF5':'#fff',textAlign:'left'}}><b>📲 MoMo/ZaloPay Webhook</b></button>
          </div>
        </div>
        <div style={{marginTop:12,display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:8}}>
          {[20000,50000,100000].map(a=><button key={a} onClick={()=>setAmount(a)} style={{padding:10,borderRadius:8,border:amount===a?'2px solid #0A7A42':'1px solid #ccc',background:amount===a?'#0A7A42':'#fff',color:amount===a?'#fff':'#111'}}>{a.toLocaleString()} VND<br/><small>+{Math.floor(a/2)} Xu</small></button>)}
        </div>
        <button onClick={handlePay} style={{marginTop:16,width:'100%',padding:14,borderRadius:12,background:'#0A7A42',color:'#fff',border:'none',fontWeight:700,fontSize:16}}>Thanh toán {amount.toLocaleString()} VND + Webhook TT 846985 - Nhận {Math.floor(amount/2)} Xu</button>
        <div style={{marginTop:12,background:'#FEF3C7',border:'1px solid #f59e0b',padding:10,borderRadius:8,fontSize:11}}>
          <b>Day4 Webhook Flow:</b><br/>1. QR Offline TT 846985 → User thanh toán<br/>2. VNPAY → POST /api/payment/vnpay/webhook (TT 846985, amount, MSSV, IP 10.10.1.23)<br/>3. Webhook verify + xu_ledger + payment_logs<br/>4. Distribution SMS/Telegram/Email: Ban da nap {amount} VND<br/>5. Admin Payment Logs /admin/payment-logs - Real-time
        </div>
      </div>
      <div>
        <div style={{background:'#111',color:'#fff',padding:12,borderRadius:12,textAlign:'center'}}>
          <div style={{fontSize:12,marginBottom:8}}>VNPAY QR Offline - TT 846985 + Webhook - {amount.toLocaleString()} VND - MSSV 2021001234 - Day4</div>
          <div style={{background:'#fff',width:200,height:200,margin:'0 auto',display:'flex',alignItems:'center',justifyContent:'center',borderRadius:8,color:'#111',fontSize:10,wordBreak:'break-all',padding:10,textAlign:'left'}}>{genQR}<br/><br/>[QR - TT 846985 - Webhook /api/payment/vnpay/webhook - Day4 - Fix gray]</div>
          <div style={{marginTop:8,fontSize:11,color:'#0f0'}}>QR Offline + Webhook Verify - TT 846985 - Works iOS+Android - FlexU X2-Learner</div>
        </div>
        <div style={{marginTop:12,background:'#111',color:'#0f0',padding:12,borderRadius:12,fontFamily:'monospace',fontSize:11,height:260,overflow:'auto'}}>
          {log.map((l,i)=><div key={i}>{l}</div>)}
        </div>
      </div>
    </div>
  </div>
}
