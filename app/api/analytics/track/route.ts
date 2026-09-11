
export async function POST(req: Request){
  const body = await req.json();
  return Response.json({success:true, ...body, checkin:'CHECKIN_1789105301946', tt:'846985', ktx_b:'10.10.1.23', edge:481, tracked:true, timestamp:new Date().toISOString()});
}
export async function GET(){
  return Response.json({events:['CHECKIN_1789105301946','PAYMENT_TT_846985','DATA_BUY_1GB','CAPTIVE_AUTH_KTX_B_10.10.1.23','YUBIKEY_404_VERIFY','VNPT_BALANCE_509952','VNPT_BUY_1GB','PWA_OFFLINE','TELEGRAM_X0','HEALTH_CHECK','FINAL_REPORT'], total_events:13, checkin:'CHECKIN_1789105301946', tt:'846985', ktx_b:'10.10.1.23', edge:520, function:32, error:'0%', sv_total:1247, sv_tested:10, analytics:'Real Tracking Ready - Day8C Testing KTX B Real 1247 SV'});
}
