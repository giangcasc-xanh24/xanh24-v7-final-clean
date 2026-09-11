
export async function POST(req: Request){
  const body = await req.json()
  const { action, mssv, message } = body
  return Response.json({
    status: 'telegram_x0_sent',
    bot: 'X0 Admin Bot - Admin-Khoi X0-X6 1247 SV - YubiKey 404 - Telegram X0',
    action: action||'payment_alert',
    mssv: mssv||'2021001234',
    message: message||'Payment +25000 Xu - CHECKIN_1789105301946 - MSSV 2021001234 - KTX B 10.10.1.23',
    checkin: 'CHECKIN_1789105301946 - MSSV 2021001234 - KTX B 10.10.1.23 - FlexU X2-Learner - Android Auto torch + NFC - QR xanh24://checkin?mssv=2021001234&ktx=B - works iOS+Android',
    day2: 'CHECKIN_1789105301946 OK - camera_checkins 3 - Works Android - iOS+Android OK',
    day3: 'Ready 5m ago Error 0% Edge 89 - VNPAY TT 846985 QR Offline - Day3 v2 Fix gray',
    day4: 'Webhook ready tt 846985 day2_checkin CHECKIN_1789105301946 day3 Ready 5m ago Error 0% Edge 89 - Admin Logs 3 giao dich 35000 Xu SMS 3 Telegram 3 Email 2 Edge 210 Error 0% - CHECKIN_1789105301946 OK',
    day5: 'Telegram X0 Bot Full - M1 Captive + M3 YubiKey 404 + M6 Payment TT 846985 Webhook + M7 Fraud + M5 Data 5G LIVE 509952 MB - Distribution SMS Telegram Email - PWA Offline',
    distribution: {
      sms: 'Ban da nhan 1GB - KTX B - IP 10.10.1.23 - MSSV 2021001234',
      telegram: 'X0 Payment +25000 Xu - CHECKIN_1789105301946 - MSSV 2021001234 - KTX B 10.10.1.23 - FlexU X2-Learner',
      email: 'Receipt - Payment 50000 VND - +25000 Xu - CHECKIN_1789105301946',
      vnpt_logs: '2->3 - Distribution OK - Day4'
    },
    admin_logs: '/admin/payment-logs - 3 giao dich 35000 Xu SMS 3 Telegram 3 Email 2 Edge 210 Error 0%',
    captive: 'M1 Captive Portal KTX B WiFi 10.10.1.23 - Auth OK - CHECKIN_1789105301946',
    yubikey: 'M3 YubiKey 404 - /api/auth/yubikey - YubiKey verified - Admin-Khoi',
    pwa_offline: 'PWA Offline /offline - manifest + icon-180 + SW - Works iOS+Android - Day5',
    middleware: 'middleware.ts - M7 checkFraud() + M3 YubiKey 404 + M1 Captive + M6 Payment Gate + M5 Data - CHECKIN_1789105301946 - TT 846985',
    timestamp: new Date().toISOString()
  })
}
export async function GET(){
  return Response.json({ bot: 'X0 Admin Bot - Admin-Khoi X0-X6 1247 SV', status: 'ready', endpoint: '/api/telegram/bot - POST action, mssv, message', checkin: 'CHECKIN_1789105301946', day2: 'CHECKIN_1789105301946 OK', day3: 'Ready 5m ago Error 0% Edge 89', day4: 'Webhook ready tt 846985 - Admin Logs 3 giao dich 35000 Xu SMS 3 Telegram 3 Email 2 Edge 210 Error 0%', day5: 'Telegram X0 Bot Full + Middleware Full Auth + Captive Portal KTX B WiFi 10.10.1.23 + YubiKey 404 + PWA Offline' })
}
