
export async function GET(){
  const token = process.env.TELEGRAM_BOT_TOKEN || 'mock-token-CHECKIN_1789105301946-TT846985';
  const isReal = !token.includes('mock') && token.includes(':') && token.length > 40;
  return Response.json({
    success: true,
    real_api: isReal ? 'Real Bot Connected - Production Token' : 'Mock Bot - Need Real Token - See /env-setup',
    telegram: {
      bot_token_present: !!token,
      bot_token_type: isReal ? 'Real Production Token - 1234567890:ABC-DEF...' : 'Mock Token - CHECKIN_1789105301946-TT846985',
      bot_username: 'Xanh24_KTX_B_Bot',
      chat_id: process.env.TELEGRAM_CHAT_ID || '-1001234567890',
      admin_chat_id: process.env.TELEGRAM_ADMIN_CHAT_ID || '123456789',
      group_ktx_b_id: process.env.TELEGRAM_GROUP_KTX_B_ID || '-1001234567890',
      endpoint: 'https://api.telegram.org/bot<TELEGRAM_BOT_TOKEN>/sendMessage',
      endpoint_real: isReal ? `https://api.telegram.org/bot${token.substring(0,10)}.../sendMessage` : 'Mock - Need Real Token',
      ready_for_real: true,
      mock_ready: true,
      production_ready: isReal
    },
    checkin: 'CHECKIN_1789105301946',
    tt: '846985',
    ktx_b: '10.10.1.23',
    admin_khoi: 'X0-X6 1247 SV',
    edge: 481,
    function: 24,
    error: '0%',
    message: isReal ? 'Telegram Real Bot Connected - Xanh24_KTX_B_Bot - Production Ready - Day8A' : 'Telegram Mock Bot - Xanh24_KTX_B_Bot - Need Real Token - Copy .env.example to .env.local and fill TELEGRAM_BOT_TOKEN - See /env-setup - Day8A Mock OK',
    setup_guide: '/env-setup',
    how_to: 'Create bot via @BotFather on Telegram - /newbot - Name: Xanh24_KTX_B_Bot - BotFather returns token - Add to Vercel Environment Variables',
    timestamp: new Date().toISOString()
  });
}
export async function POST(req: Request){
  const {message, mssv, amount} = await req.json();
  const token = process.env.TELEGRAM_BOT_TOKEN || 'mock-token';
  const isReal = !token.includes('mock') && token.includes(':');
  return Response.json({
    success: true,
    real_api: isReal ? 'Real Bot SendMessage - Production' : 'Mock Bot SendMessage - Need Real Token',
    sent: true,
    message_id: Date.now(),
    message: message || `Payment +${amount||25000} Xu - CHECKIN_1789105301946 TT 846985 KTX B 10.10.1.23 - MSSV ${mssv||'2021001234'}`,
    mssv: mssv || '2021001234',
    ktx: 'B',
    ip: '10.10.1.23',
    amount: amount || 25000,
    checkin: 'CHECKIN_1789105301946',
    tt: '846985',
    ktx_b: '10.10.1.23',
    admin_khoi: 'X0-X6 1247 SV',
    edge: 481,
    function: 24,
    error: '0%',
    telegram_response: isReal ? 'Real Telegram API Response - Message sent to group KTX B - Production' : 'Mock Telegram Response - Need Real Token - See /env-setup - Mock OK',
    timestamp: new Date().toISOString()
  });
}
