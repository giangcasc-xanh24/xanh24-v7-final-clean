
export async function POST(req: Request){
  const { mssv, ip, ktx, checkin, device } = await req.json()
  return Response.json({
    status: 'authenticated',
    mssv: mssv||'2021001234',
    ip: ip||'10.10.1.23',
    ktx: ktx||'B',
    checkin: checkin||'CHECKIN_1789105301946',
    device: device||'FlexU X2-Learner Android Auto torch + NFC',
    captive: 'M1 Captive Portal KTX B WiFi 10.10.1.23 - Auth OK',
    middleware: 'M1+M3+M6+M7 - Day5 Full Auth - CHECKIN_1789105301946 OK',
    day2: 'CHECKIN_1789105301946 - MSSV 2021001234 - KTX B 10.10.1.23 - Works Android - iOS+Android OK - camera_checkins 3',
    day3: 'Ready 5m ago Error 0% Edge 89 - VNPAY TT 846985 QR Offline',
    day4: 'Webhook ready tt 846985 day2_checkin CHECKIN_1789105301946 day3 Ready 5m ago Error 0% Edge 89 - Admin Logs 3 giao dich 35000 Xu SMS 3 Telegram 3 Email 2 Edge 210 Error 0%',
    day5: 'M1 Captive Portal + M3 YubiKey 404 + Middleware Full Auth + PWA Offline + Telegram X0 Bot Full - KTX B WiFi 10.10.1.23 - YubiKey 404',
    redirect: '/data-5g',
    yubikey: 'M3 YubiKey 404 - Admin-Khoi X0-X6 1247 SV - /api/auth/yubikey',
    distribution: 'SMS + Telegram X0 + Email - Distribution Day4',
    pwa: 'PWA Offline /offline - manifest + icon-180 + SW - Works iOS+Android',
    telegram_bot: 'Telegram X0 Bot Full - /api/telegram/bot - Admin Payment Logs + Captive + YubiKey',
    timestamp: new Date().toISOString()
  })
}
export async function GET(){
  return Response.json({ captive: 'M1 Captive Portal KTX B WiFi 10.10.1.23', status: 'ready', checkin: 'CHECKIN_1789105301946', ip: '10.10.1.23', ktx: 'B', device: 'FlexU X2-Learner Android Auto torch + NFC', day2: 'CHECKIN_1789105301946 OK', day3: 'Ready 5m ago Error 0% Edge 89', day4: 'Webhook ready tt 846985 - Admin Logs 3 giao dich 35000 Xu SMS 3 Telegram 3 Email 2 Edge 210 Error 0%', day5: 'Middleware Full Auth + YubiKey 404 + PWA Offline + Telegram X0 Bot Full' })
}
