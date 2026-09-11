
export default function EnvSetupPage(){
  return (<div style={{padding:24,fontFamily:'monospace',background:'#0A0A0A',color:'#00FF00',minHeight:'100vh'}}>
    <h1 style={{color:'#00FF00'}}>🔑 ENV Setup Day8A - Real API Keys Production - CHECKIN_1789105301946 TT 846985 KTX B 10.10.1.23</h1>
    <div style={{marginTop:16,background:'#1A1A1A',padding:16,borderRadius:8,border:'1px solid #00FF00'}}>
      <b style={{color:'#00FF00'}}>📋 .env.example - Template - Copy to .env.local - Fill Real Keys - Add to Vercel Environment Variables</b><br/>
      <pre style={{background:'black',padding:12,borderRadius:8,overflow:'auto',fontSize:12,marginTop:8}}>{`# Xanh24 v7 - Day8A Real API Keys Production
# CHECKIN_1789105301946 TT 846985 KTX B 10.10.1.23 FlexU X2-Learner

# Supabase - Already working
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# VNPT Real API - Day8A NEW
VNPT_API_KEY=real_vnpt_api_key_CHECKIN_1789105301946_TT846985_KTX_B_10.10.1.23_509952MB
VNPT_API_URL=https://api.vnpt.vn/data
VNPT_API_BALANCE_URL=https://api.vnpt.vn/data/balance
VNPT_API_BUY_URL=https://api.vnpt.vn/data/buy

# Telegram Real Bot - Day8A NEW
# Create via @BotFather - /newbot - Xanh24_KTX_B_Bot
TELEGRAM_BOT_TOKEN=1234567890:ABC-DEF1234ghIkl-zyx57W2v1u123ew11
TELEGRAM_CHAT_ID=-1001234567890
TELEGRAM_ADMIN_CHAT_ID=123456789
TELEGRAM_GROUP_KTX_B_ID=-1001234567890

# YubiKey Real - Day8A NEW
# Get from https://upgrade.yubico.com/getapikey/
YUBICO_CLIENT_ID=12345
YUBICO_API_KEY=real_yubico_secret_key_abcdefghijklmnopqrstuvwxyz
YUBICO_API_URL=https://api.yubico.com/wsapi/2.0/verify

# App Config
NEXT_PUBLIC_CHECKIN_ID=CHECKIN_1789105301946
NEXT_PUBLIC_TT_ID=846985
NEXT_PUBLIC_KTX_IP=10.10.1.23
`}</pre>
    </div>
    <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))',gap:16,marginTop:16}}>
      <div style={{background:'#1A1A1A',padding:16,borderRadius:8,border:'1px solid #00FF00'}}>
        <b>📡 VNPT Real API - Day8A</b><br/>
        <small>Balance 509952 MB 48% Frozen</small><br/>
        <a href="/api/vnpt/real" style={{color:'#00FF00'}}>GET /api/vnpt/real - Check Real API</a><br/>
        <small>POST /api/vnpt/real {"amount":1024} - Buy Real</small><br/>
        <small style={{color:'yellow'}}>Need Real Key: VNPT_API_KEY - Get from https://api.vnpt.vn/data - Account KTX B 10.10.1.23 FlexU X2-Learner - Add to Vercel ENV</small>
      </div>
      <div style={{background:'#1A1A1A',padding:16,borderRadius:8,border:'1px solid #00FF00'}}>
        <b>🤖 Telegram Real Bot - Day8A</b><br/>
        <small>Xanh24_KTX_B_Bot - Admin-Khoi X0-X6 1247 SV</small><br/>
        <a href="/api/telegram/real" style={{color:'#00FF00'}}>GET /api/telegram/real - Check Real Bot</a><br/>
        <small>POST /api/telegram/real {"message":"Test"} - Send Real</small><br/>
        <small style={{color:'yellow'}}>Need Real Token: TELEGRAM_BOT_TOKEN - Create via @BotFather /newbot - Add to Vercel ENV</small>
      </div>
      <div style={{background:'#1A1A1A',padding:16,borderRadius:8,border:'1px solid #00FF00'}}>
        <b>🔐 YubiKey Real - Day8A</b><br/>
        <small>YubiKey 5 NFC - KTX B 10.10.1.23</small><br/>
        <a href="/api/yubikey/real" style={{color:'#00FF00'}}>GET /api/yubikey/real - Check Real Yubico</a><br/>
        <small>POST /api/yubikey/real {"otp":"cccccc...44chars"} - Verify Real</small><br/>
        <small style={{color:'yellow'}}>Need Real Key: YUBICO_CLIENT_ID + YUBICO_API_KEY - Get from https://upgrade.yubico.com/getapikey/ - Need YubiKey 5 NFC hardware - Add to Vercel ENV</small>
      </div>
    </div>
    <div style={{marginTop:16,background:'#1A1A1A',padding:16,borderRadius:8,border:'1px solid #00FF00'}}>
      <b>🚀 How to Add Real Keys to Vercel Production - Day8A - CHECKIN_1789105301946 TT 846985</b><br/>
      <pre style={{background:'black',padding:12,borderRadius:8,marginTop:8}}>{`1. Vercel Dashboard -> xanh24-v7-final-clean -> Settings -> Environment Variables
2. Add:
   VNPT_API_KEY = real_vnpt_api_key_... (Production)
   VNPT_API_URL = https://api.vnpt.vn/data
   TELEGRAM_BOT_TOKEN = 1234567890:ABC-DEF... (from @BotFather)
   TELEGRAM_CHAT_ID = -1001234567890 (Group KTX B)
   YUBICO_CLIENT_ID = 12345 (from https://upgrade.yubico.com/getapikey/)
   YUBICO_API_KEY = real_yubico_secret_key_... (from Yubico)
3. Select Environment: Production + Preview + Development - Check all
4. Save -> Deployments -> Redeploy Latest -> UNCHECK Use existing Build Cache -> Redeploy
5. Test:
   https://xanh24-v7-final-clean.vercel.app/api/vnpt/real -> Real API Connected - Balance 509952 MB 48%
   https://xanh24-v7-final-clean.vercel.app/api/telegram/real -> Real Bot Connected - Xanh24_KTX_B_Bot
   https://xanh24-v7-final-clean.vercel.app/api/yubikey/real -> Real Yubico Connected - Hardware Ready
6. Visit https://xanh24-v7-final-clean.vercel.app/env-setup -> Check All Green - Real API Ready - Day8A Production

Current Status:
- VNPT: Mock API - Balance 509952 MB 48% - Need Real Key - Mock OK - Day7
- Telegram: Mock Bot - Xanh24_KTX_B_Bot - Need Real Token - Mock OK - Day7
- YubiKey: Mock ccccccbhkujh verified - Need Real Key + Hardware - Mock OK - Day5

After Adding Real Keys:
- VNPT: Real API Connected - Balance 509952 MB 48% - Production Ready - Day8A
- Telegram: Real Bot Connected - Xanh24_KTX_B_Bot - Production Ready - Day8A
- YubiKey: Real Yubico Connected - Hardware Ready - Production Ready - Day8A
`}</pre>
    </div>
  </div>)
}
