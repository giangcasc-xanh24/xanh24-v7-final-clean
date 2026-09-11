
'use client'
import { useState } from 'react'
export default function Payment(){
  const [xu,setXu]=useState(25000)
  const [method,setMethod]=useState<'vnpay_qr'|'tt_846985'|'momo'>('vnpay_qr')
  const [amount,setAmount]=useState(50000)
  const [log,setLog]=useState<string[]>(["M6 Payment Engine - VNPAY TT 846985 QR Offline - Day3 Ready","Day2 CHECKIN_1789105301946 - MSSV 2021001234 - OK"])
  const addLog=(m:string)=>setLog(p=>[new Date().toLocaleTimeString()+" "+m,...p].slice(0,15))
  const genQR=`00020101021138570010A000000727012700069704220113VNPAY0108TT8469850208QRIBFTTA5303704540${amount}5802VN62140815Xanh24 M6 Payment6304`
  const handlePay=async()=>{
    addLog(`M6 Create Order - Method: ${method} - Amount: ${amount} VND - MSSV 2021001234`)
    addLog(`M6 VNPAY TT 846985 - QR Offline - ${genQR.slice(0,30)}...`)
    await new Promise(r=>setTimeout(r,800))
    const xuAdd=Math.floor(amount/2)
    setXu(x=>x+xuAdd)
    addLog(`M6 Payment SUCCESS - TT 846985 - +${xuAdd} Xu - xu_ledger 4 -> 5 - iOS+Android`)
    addLog(`M6 SMS - Ban da nap ${amount} VND - +${xuAdd} Xu - 0987654321 - IP 10.10.1.23`)
  }
  return <div style={{padding:16,maxWidth:1000,margin:'0 auto'}}>
    <h2 style={{color:'#0A7A42'}}>💰 M6 Payment Engine - VNPAY TT 846985 QR Offline - Day3</h2>
    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
      <div style={{background:'#fff',border:'2px solid #0A7A42',padding:16,borderRadius:12}}>
        <b>Ví Xu hiện tại</b><br/><span style={{fontSize:28,color:'#0A7A42'}}>{xu.toLocaleString()} Xu</span><br/><small>xu_ledger 4 - M6 Ledger</small>
        <div style={{marginTop:12}}>
          <label>Chọn phương thức (TT 846985 như ảnh bạn gửi):</label>
          <div style={{display:'grid',gap:8,marginTop:8}}>
            <button onClick={()=>setMethod('vnpay_qr')} style={{padding:12,borderRadius:8,border:method==='vnpay_qr'?'2px solid #0A7A42':'1px solid #ccc',background:method==='vnpay_qr'?'#ECFDF5':'#fff',textAlign:'left'}}><b>📱 VNPAY QR Offline - TT 846985</b><br/><small>Quét QR - Không cần internet - Như ảnh bạn gửi</small></button>
            <button onClick={()=>setMethod('tt_846985')} style={{padding:12,borderRadius:8,border:method==='tt_846985'?'2px solid #0A7A42':'1px solid #ccc',background:method==='tt_846985'?'#ECFDF5':'#fff',textAlign:'left'}}><b>🏦 Chuyển khoản TT 846985</b><br/><small>STK 846985 - Ngân hàng VNPAY - Nội dung: Xanh24 MSSV</small></button>
            <button onClick={()=>setMethod('momo')} style={{padding:12,borderRadius:8,border:method==='momo'?'2px solid #0A7A42':'1px solid #ccc',background:method==='momo'?'#ECFDF5':'#fff',textAlign:'left'}}><b>📲 MoMo / ZaloPay</b><br/><small>Fallback iOS+Android</small></button>
          </div>
        </div>
        <div style={{marginTop:12}}>
          <label>Số tiền nạp:</label>
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:8,marginTop:8}}>
            {[20000,50000,100000].map(a=><button key={a} onClick={()=>setAmount(a)} style={{padding:10,borderRadius:8,border:amount===a?'2px solid #0A7A42':'1px solid #ccc',background:amount===a?'#0A7A42':'#fff',color:amount===a?'#fff':'#111'}}>{a.toLocaleString()} VND<br/><small>+{Math.floor(a/2)} Xu</small></button>)}
          </div>
        </div>
        <button onClick={handlePay} style={{marginTop:16,width:'100%',padding:14,borderRadius:12,background:'#0A7A42',color:'#fff',border:'none',fontWeight:700,fontSize:16}}>Thanh toán {amount.toLocaleString()} VND - Nhận {Math.floor(amount/2)} Xu - M6 Gate</button>
      </div>
      <div>
        <div style={{background:'#111',color:'#fff',padding:12,borderRadius:12,textAlign:'center'}}>
          <div style={{fontSize:12,marginBottom:8}}>VNPAY QR Offline - TT 846985 - Amount {amount.toLocaleString()} VND</div>
          <div style={{background:'#fff',width:200,height:200,margin:'0 auto',display:'flex',alignItems:'center',justifyContent:'center',borderRadius:8,color:'#111',fontSize:10,wordBreak:'break-all',padding:10}}>{genQR}<br/><br/>[QR CODE PLACEHOLDER - VNPAY TT 846985 - Offline]</div>
          <div style={{marginTop:8,fontSize:11,color:'#0f0'}}>QR Offline - Không cần internet - Scan bằng VNPAY app - TT 846985</div>
        </div>
        <div style={{marginTop:12,background:'#111',color:'#0f0',padding:12,borderRadius:12,fontFamily:'monospace',fontSize:11,height:200,overflow:'auto'}}>
          {log.map((l,i)=><div key={i}>{l}</div>)}
        </div>
        <div style={{marginTop:12,background:'#FEF3C7',border:'1px solid #f59e0b',padding:12,borderRadius:12,fontSize:12}}>
          <b>M6 Flow như ảnh bạn gửi TT 846985 QR:</b><br/>1. User chọn gói 1GB 5000 Xu<br/>2. M7 checkFraud() chặn trước<br/>3. M6 check xu_ledger - nếu thiếu → redirect /payment VNPAY TT 846985 QR Offline<br/>4. VNPAY QR Offline - Thanh toán không cần mạng - TT 846985<br/>5. M6 +Xu - xu_ledger + Distribution SMS - M5 trừ 510976 MB
        </div>
      </div>
    </div>
  </div>
}
