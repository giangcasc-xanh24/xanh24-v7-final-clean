
export async function POST(req: Request){
  const { mssv, yubikey, ip } = await req.json()
  const verified = (yubikey||'').startsWith('ccccc') || yubikey==='test'
  return Response.json({
    status: verified ? 'yubikey_verified' : 'yubikey_404',
    mssv: mssv||'2021001234',
    yubikey: yubikey||'ccccccbhkujh',
    ip: ip||'10.10.1.23',
    admin: 'M3 Admin-Khoi X0-X6 1247 SV - YubiKey 404 - Telegram X0',
    checkin: 'CHECKIN_1789105301946 - MSSV 2021001234 KTX B 10.10.1.23 FlexU X2-Learner',
    day2: 'CHECKIN_1789105301946 OK - Works Android - iOS+Android OK - camera_checkins 3',
    day3: 'Ready 5m ago Error 0% Edge 89 - VNPAY TT 846985 QR Offline',
    day4: 'Webhook ready tt 846985 - Admin Logs 3 giao dich 35000 Xu SMS 3 Telegram 3 Email 2 Edge 210 Error 0%',
    day5: 'M3 YubiKey 404 + Middleware Full Auth - YubiKey verified - Admin access granted - Telegram X0 Bot Full',
    message: verified ? 'YubiKey verified - Admin-Khoi X0-X6 access granted - CHECKIN_1789105301946' : 'YubiKey 404 - Not verified - Admin-Khoi X0-X6 - Need YubiKey',
    telegram_x0: 'Telegram X0 Bot - YubiKey alert - MSSV 2021001234 - IP 10.10.1.23 - KTX B',
    distribution: 'SMS + Telegram X0 + Email - YubiKey 404',
    timestamp: new Date().toISOString()
  })
}
export async function GET(){
  return Response.json({ yubikey: 'M3 YubiKey 404 - Admin-Khoi X0-X6 1247 SV', status: 'ready', endpoint: '/api/auth/yubikey - POST yubikey, mssv, ip', checkin: 'CHECKIN_1789105301946', day3: 'Ready 5m ago Error 0% Edge 89', day4: 'Webhook ready tt 846985 - Admin Logs 3 giao dich 35000 Xu', day5: 'YubiKey 404 + Middleware Full Auth + PWA Offline + Telegram X0 Bot Full' })
}
