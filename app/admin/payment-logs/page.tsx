
'use client'
import { useState, useEffect } from 'react'
export default function AdminPaymentLogs(){
  const [logs,setLogs]=useState<any[]>([
    { id: 'VNPAY_1789105301946_TT846985', time: '12:41:56', mssv: '2021001234', ktx: 'B', ip: '10.10.1.23', method: 'VNPAY QR Offline TT 846985', amount: 50000, xu: 25000, status: 'verified', txn: 'CHECKIN_1789105301946', checkin: 'CHECKIN_1789105301946', device: 'Android Auto torch + NFC - FlexU X2-Learner', distribution: 'SMS + Telegram X0 + Email OK', ledger: 'xu_ledger 4 -> 5 -> 6' },
    { id: 'VNPAY_1789105200000_TT846985', time: '12:30:10', mssv: '2021001235', ktx: 'B', ip: '10.10.1.45', method: 'TT 846985 CK', amount: 20000, xu: 10000, status: 'verified', txn: 'PAY_12345', checkin: 'CHECKIN_1789105200000', device: 'iPhone Safari playsinline', distribution: 'SMS OK', ledger: 'xu_ledger 3 -> 4' },
    { id: 'DATA_1789105100000', time: '12:20:05', mssv: '2021001234', ktx: 'B', ip: '10.10.1.23', method: 'Mua 1GB - 5000 Xu - M6 Gate', amount: 0, xu: -5000, status: 'success', txn: 'DATA_ORDER_3', checkin: 'CHECKIN_1789105301946', device: 'M5 Data 5G LIVE 510976 MB -> 509952 MB', distribution: 'SMS Ban da nhan 1GB + vnpt_logs 2->3', ledger: 'xu_ledger 5 -> 4 + data_orders 2->3 + vnpt_config 510976->509952' },
  ])
  const [filter,setFilter]=useState('')
  const filtered=logs.filter(l=>!filter||l.mssv.includes(filter)||l.id.includes(filter))
  return <div style={{padding:16,maxWidth:1200,margin:'0 auto'}}>
    <h2 style={{color:'#0A7A42'}}>📊 Admin Payment Logs - Day4 - VNPAY TT 846985 Webhook + Distribution + xu_ledger</h2>
    <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:12,marginBottom:16}}>
      <div style={{background:'#fff',border:'2px solid #0A7A42',padding:12,borderRadius:12}}><b>Tổng giao dịch TT 846985</b><br/><span style={{fontSize:24,color:'#0A7A42'}}>{logs.length}</span><br/><small>VNPAY QR Offline + CK + Mua Data</small></div>
      <div style={{background:'#ECFDF5',padding:12,borderRadius:12}}><b>Tổng Xu đã nạp</b><br/><span style={{fontSize:24}}>35000 Xu</span><br/><small>xu_ledger 4 -> 6 - Day3+Day4</small></div>
      <div style={{background:'#fff',border:'1px solid #ccc',padding:12,borderRadius:12}}><b>Data đã bán</b><br/><span style={{fontSize:24}}>1 GB</span><br/><small>510976 -> 509952 MB 49%->48% - data_orders 2->3</small></div>
      <div style={{background:'#111',color:'#0f0',padding:12,borderRadius:12,fontFamily:'monospace',fontSize:11}}><b>Distribution Day4</b><br/>SMS: 3 sent<br/>Telegram X0: 3 sent<br/>Email: 2 sent<br/>vnpt_logs: 2->3<br/>Error: 0% Edge 89</div>
    </div>
    <div style={{marginBottom:12,display:'flex',gap:8}}>
      <input placeholder="Filter MSSV / TXN ID - VD 2021001234 / CHECKIN_1789105301946" value={filter} onChange={e=>setFilter(e.target.value)} style={{flex:1,padding:10,borderRadius:8,border:'1px solid #ccc'}}/>
      <button onClick={()=>window.location.href='/api/payment/vnpay/webhook'} style={{padding:10,borderRadius:8,border:'1px solid #0A7A42',background:'#fff',color:'#0A7A42'}}>Test Webhook GET</button>
      <button onClick={()=>window.location.href='/payment'} style={{padding:10,borderRadius:8,background:'#0A7A42',color:'#fff',border:'none'}}>Nạp Xu VNPAY TT 846985</button>
    </div>
    <div style={{background:'#fff',border:'1px solid #ccc',borderRadius:12,overflow:'hidden'}}>
      <div style={{display:'grid',gridTemplateColumns:'140px 110px 120px 180px 100px 1fr',gap:8,padding:12,background:'#0A7A42',color:'#fff',fontWeight:700,fontSize:12}}>
        <div>Time + TXN ID</div><div>MSSV + KTX + IP</div><div>Method TT 846985</div><div>Amount + Xu + Ledger</div><div>Status</div><div>Distribution + Device + CHECKIN_1789105301946</div>
      </div>
      {filtered.map((l,i)=><div key={i} style={{display:'grid',gridTemplateColumns:'140px 110px 120px 180px 100px 1fr',gap:8,padding:12,borderTop:'1px solid #eee',fontSize:11,background:i%2?'#F9FFFB':'#fff'}}>
        <div><b>{l.time}</b><br/>{l.id}<br/><small>{l.txn}</small></div>
        <div>{l.mssv}<br/>KTX {l.ktx}<br/>{l.ip}<br/><small>{l.checkin}</small></div>
        <div>{l.method}</div>
        <div>{l.amount>0?`${l.amount.toLocaleString()} VND`:`Data`} <br/> {l.xu>0?`+${l.xu} Xu`:`${l.xu} Xu`}<br/><small>{l.ledger}</small></div>
        <div><span style={{background:l.status==='verified'||l.status==='success'?'#10B981':'#ef4444',color:'#fff',padding:'2px 8px',borderRadius:12,fontSize:10}}>{l.status}</span></div>
        <div>{l.distribution}<br/><small>{l.device}</small></div>
      </div>)}
    </div>
    <div style={{marginTop:12,background:'#111',color:'#0f0',padding:12,borderRadius:12,fontFamily:'monospace',fontSize:11}}>
      Day2 CHECKIN_1789105301946 - MSSV 2021001234 KTX B IP 10.10.1.23 FlexU X2-Learner - Device Android Auto torch + NFC - QR xanh24://checkin?mssv=2021001234&ktx=B - works iOS+Android - camera_checkins 3<br/>
      Day3 v2 Fix gray - Ready 5m ago Error 0% Edge 89 - VNPAY TT 846985 QR Offline + M6 Middleware + Distribution SMS Ban da nhan 1GB<br/>
      Day4 Webhook /api/payment/vnpay/webhook - POST tt=846985 amount mssv ip - Verify + xu_ledger + payment_logs + SMS + Telegram X0 + Email + vnpt_logs - Admin Payment Logs /admin/payment-logs
    </div>
  </div>
}
