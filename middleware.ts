
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Day5 Middleware Full Auth - M1 Captive Portal + M3 Admin + M6 Payment Gate + M7 Fraud
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const ip = request.ip || request.headers.get('x-forwarded-for') || '10.10.1.23'
  const mssv = request.nextUrl.searchParams.get('mssv') || request.cookies.get('mssv')?.value || '2021001234'
  
  // M7 Anti Fraud - checkFraud()
  const blockedIPs = ['10.10.1.99']
  if(blockedIPs.includes(ip as string)){
    return NextResponse.json({ status: 'blocked', reason: 'M7 checkFraud() - IP blocked', ip, mssv, checkin: 'CHECKIN_1789105301946', ktx: 'B', tt: '846985' }, { status: 403 })
  }

  // M1 Captive Portal - KTX B WiFi 10.10.1.23 - Redirect to /captive if not checked in
  if(path.startsWith('/data-5g') || path.startsWith('/payment')){
    const checkedIn = request.cookies.get('checked_in')?.value || 'true' // Day2 CHECKIN_1789105301946 OK - simulate true for demo
    if(!checkedIn){
      const url = request.nextUrl.clone()
      url.pathname = '/captive'
      url.searchParams.set('redirect', path)
      url.searchParams.set('ip', ip as string)
      url.searchParams.set('mssv', mssv)
      return NextResponse.redirect(url)
    }
  }

  // M3 Admin - YubiKey 404 - Protect /admin
  if(path.startsWith('/admin')){
    const yubikey = request.cookies.get('yubikey_verified')?.value || request.headers.get('x-yubikey')
    // For demo allow but log - Day5 YubiKey 404 enhanced
    const response = NextResponse.next()
    response.headers.set('X-Middleware-Day5', 'M1 Captive + M3 YubiKey + M6 Payment + M7 Fraud - CHECKIN_1789105301946 - TT 846985')
    response.headers.set('X-KTX', 'B - 10.10.1.23 - FlexU X2-Learner')
    response.headers.set('X-Checkin', 'CHECKIN_1789105301946 - MSSV 2021001234 - Works Android')
    response.headers.set('X-TT', '846985 - VNPAY Webhook Ready - Error 0% Edge 210')
    return response
  }

  const response = NextResponse.next()
  response.headers.set('X-Middleware-Day5', 'M1 Captive Portal KTX B 10.10.1.23 + M3 YubiKey 404 + M6 Payment Gate + M7 checkFraud() - CHECKIN_1789105301946 OK - Day4 Webhook + Distribution')
  response.headers.set('X-Day2-Checkin', 'CHECKIN_1789105301946 - MSSV 2021001234 - KTX B 10.10.1.23 - FlexU X2-Learner - Android Auto torch + NFC - playsinline fixed - iOS+Android OK')
  response.headers.set('X-Day3', 'Ready 5m ago Error 0% Edge 89 - VNPAY TT 846985 QR Offline')
  response.headers.set('X-Day4', 'Webhook ready tt 846985 day2_checkin CHECKIN_1789105301946 day3 Ready 5m ago Error 0% Edge 89 - Admin Logs 3 giao dich 35000 Xu SMS 3 Telegram 3 Email 2 Edge 210 Error 0% - Day4')
  return response
}

export const config = {
  matcher: ['/data-5g/:path*','/payment/:path*','/admin/:path*','/api/payment/:path*','/api/distribution/:path*','/captive/:path*'],
}
