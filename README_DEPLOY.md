# Xanh24 Captive Portal Full Package - Deploy Guide
# 16 Files - Ready for GitHub giangcasc-xanh24/xanh24-v7-final-clean

## 📦 Package Contents (18 files incl README + 2 SQL)
- app/captive/page.tsx - Captive Portal UI Xanh24 #00A651 #00C853 gradient #102E22
- lib/modem/types.ts - Types WifiModemAdapter
- lib/modem/base-adapter.ts - Base token 32-hex
- lib/modem/factory.ts - Factory fromGatewayIp
- lib/modem/adapters/ruijie-adapter.ts - Ruijie RG-EG210G-E WISPr Wifidog 2060/wifidog/auth?token=... Auth:1 XML
- lib/modem/adapters/mikrotik-adapter.ts - MikroTik REST
- lib/modem/adapters/unifi-adapter.ts - UniFi 8443 authorize-guest
- lib/modem/adapters/omada-adapter.ts - Omada 8043
- lib/modem/adapters/openwrt-adapter.ts - OpenWRT ndsctl
- app/api/captive/modem/auth/route.ts - Generic auth wifi_sessions xu_ledger student_progress phone key
- app/api/captive/ruijie/auth/route.ts - WISPr XML Auth:1
- app/api/captive/ruijie/login/route.ts - token 32-hex
- app/api/university/config/route.ts - fields_config JSON dynamic Lop Khoa MSSV
- app/api/vnpt/provision-number/route.ts - vnpt_phone_pool
- app/api/vnpt/confirm-number/route.ts - OTP
- supabase/migrations/001_wifi_modems.sql - 5 modems ruijie mikrotik unifi omada openwrt
- supabase/migrations/002_vnpt_phone_pool.sql - 5 rows 0968...
- README_DEPLOY.md - This file

## 🚀 Cách Upload lên GitHub

### Option 1: Drag & Drop (Dễ nhất)
1. Download file xanh24-captive-portal-full-package.zip từ generator
2. Giải nén ra thư mục
3. Vào https://github.com/giangcasc-xanh24/xanh24-v7-final-clean
4. Bấm "Add file" > "Upload files"
5. Kéo toàn bộ folder app/, lib/, supabase/ vào
6. Commit message: "feat: add captive portal full package 16 files Ruijie adapter"
7. Bấm Commit

### Option 2: Git CLI
```bash
git clone https://github.com/giangcasc-xanh24/xanh24-v7-final-clean.git
cd xanh24-v7-final-clean
unzip ~/Downloads/xanh24-captive-portal-full-package.zip -d .
git add .
git commit -m "feat: captive portal 16 files"
git push origin main
```

## ⚙️ Setup Env
```env
NEXT_PUBLIC_SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...
```

## 🧪 Test Ruijie Flow
1. Connect to SSID XANH24-WIFI (RG-EG210G-E)
2. Browser auto redirect to: /captive?gw_id=10.0.0.1&mac=AA:BB:CC:DD:EE:FF&ip=10.0.0.100&ap_mac=...&wlan_id=1&url=http://...
3. Form auto loads university config
4. Submit -> POST /api/captive/modem/auth -> creates token 32-hex -> wifi_sessions
5. Redirect to http://10.0.0.1:2060/wifidog/auth?token=xxx
6. Ruijie calls GET /api/captive/ruijie/auth?token=xxx -> returns Auth:1 XML
7. User online 10:00, +5 Xu, GPA 3.6

## 📝 Notes
- Ruijie adapter production-ready, others skeleton functional
- Factory auto-detect by gateway_ip from wifi_modems table
- All adapters implement authorize/deauthorize/checkStatus
- VNPT pool: provision-number reserves, confirm-number verifies OTP
