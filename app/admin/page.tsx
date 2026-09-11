
export default function M3Admin(){
  const blocks=[
    {mssv:'2021001234',name:'Nguyen Van A',block:'X2-Learner',status:'PENDING',xu:5000},
    {mssv:'2021001235',name:'Tran Thi B',block:'X0-Guest',status:'PENDING',xu:0},
    {mssv:'2021001236',name:'Le Van C',block:'X3-Creator',status:'APPROVED',xu:10000},
  ]
  return <div style={{padding:16,fontFamily:'sans-serif'}}><h1 style={{color:'#0A7A42'}}>🛡️ M3 Admin-Khoi X0-X6 - Team Admin - PWA iOS+Android</h1><p>admin_blocks 10 - iOS cards + PC table - YubiKey 404 + Telegram X0 alert - Balance M5 510976 MB 49%</p>
  <div style={{overflowX:'auto'}}><table style={{width:'100%',borderCollapse:'collapse',background:'#fff'}}><thead><tr style={{background:'#F0FDF4'}}><th style={{padding:8,textAlign:'left'}}>MSSV</th><th>Name</th><th>Block</th><th>Status</th><th>Xu</th><th>Action</th></tr></thead><tbody>
  {blocks.map(b=><tr key={b.mssv} style={{borderBottom:'1px solid #eee'}}><td style={{padding:8}}>{b.mssv}</td><td>{b.name}</td><td><span style={{background:'#0A7A42',color:'#fff',padding:'2px 6px',borderRadius:4,fontSize:11}}>{b.block}</span></td><td>{b.status}</td><td>{b.xu}</td><td><button style={{background:'#0A7A42',color:'#fff',border:'none',padding:'4px 8px',borderRadius:4}}>Approve</button></td></tr>)}
  </tbody></table></div>
  <div style={{marginTop:16,background:'#FFF1F2',padding:12,borderRadius:8}}>YubiKey 404: Plug YubiKey for X5-X6 - Works iOS+Android - Simulation</div>
  <div style={{marginTop:12,background:'#F0FDF4',padding:12,borderRadius:8}}>Telegram X0 Alert: Balance 510976 MB 49% - Safe - Alert if &lt;100GB - Works iOS+Android</div>
  </div>
}

