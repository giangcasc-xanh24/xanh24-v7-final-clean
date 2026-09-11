
export async function POST(req: Request){
  const { message, mssv } = await req.json()
  return Response.json({ status: 'sent', channel: 'Telegram X0', message: message||'Payment +25000 Xu - MSSV 2021001234', mssv: mssv||'2021001234', checkin: 'CHECKIN_1789105301946', bot: 'X0 Admin Bot', day4: 'Distribution Telegram X0 OK' })
}
