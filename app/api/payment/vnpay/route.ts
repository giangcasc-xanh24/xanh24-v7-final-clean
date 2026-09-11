
export async function POST(req: Request){
  const { amount, method, mssv } = await req.json()
  return Response.json({ status: 'success', tt: '846985', method, amount, xu: Math.floor(amount/2), mssv: mssv||'2021001234', qr: `VNPAY TT 846985 QR Offline ${amount}`, message: 'Ban da nap '+amount+' VND - +'+Math.floor(amount/2)+' Xu - Works iOS+Android' })
}
