
export async function POST(req: Request){
  const { phone, message, mssv } = await req.json()
  return Response.json({ status: 'sent', channel: 'SMS', phone: phone||'0987654321', message: message||'Ban da nhan 1GB - KTX B', mssv: mssv||'2021001234', checkin: 'CHECKIN_1789105301946', ip: '10.10.1.23', provider: 'VNPT', day4: 'Distribution SMS OK' })
}
