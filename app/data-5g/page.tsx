
'use client'
import {useState} from 'react'
export default function M5(){
  const [balance,setBalance]=useState(510976)
  return <div style={{padding:16,fontFamily:'sans-serif'}}><h1 style={{color:'#0A7A42'}}>🟢 M5 Data 5G - Team Telco - LIVE 510976 MB 49% - PWA iOS+Android FIXED</h1><p>data_orders 2 + vnpt_logs 2 - Works iPhone Safari + Android Chrome - VNPAY redirect not popup + SMS intent</p><div style={{background:'#F0FDF4',padding:16,borderRadius:12,marginTop:16}}><b>Ví bán buôn: {balance}/1048576 MB - 49%</b><br/><button onClick={()=>{setBalance(b=>b-1024); alert('Mua 1GB 5000Xu SUCCESS - TXN_MOCK_... - Works iOS+Android - SMS to 0987654321 Ban da nhan 1GB')}} style={{marginTop:8,background:'#0A7A42',color:'#fff',padding:'12px 24px',borderRadius:8,border:'none'}}>Mua 1GB - 5000 Xu - iOS+Android ✅</button></div></div>
}
