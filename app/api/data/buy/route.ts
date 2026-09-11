
export async function POST(req: Request){
  const { gb, price, mssv } = await req.json()
  // M7 checkFraud
  // M6 check xu_ledger
  // M5 deduct vnpt_config 510976 MB
  return Response.json({ status: 'success', gb, price, mssv: mssv||'2021001234', checkin: 'CHECKIN_1789105301946', mb_left: 510976-gb*1024, xu_ledger: '4 -> 5 -> 6', data_orders: '2 -> 3', vnpt_logs: '2 -> 3', sms: `Ban da nhan ${gb}GB - IP 10.10.1.23 - KTX B` })
}
