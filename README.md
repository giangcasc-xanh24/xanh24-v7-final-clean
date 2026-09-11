
# Xanh24 v7 Day3 FINAL CLEAN - M6 Payment Engine + VNPAY TT 846985 QR Offline

Day2 DONE: CHECKIN_1789105301946 - MSSV 2021001234 - KTX B IP 10.10.1.23 - camera_checkins (3) - Android Auto torch + NFC + playsinline fixed - iOS+Android OK

Day3 NEW:
- M6 Payment Engine: VNPAY QR Offline TT 846985 - MoMo fallback - xu_ledger
- M6 Middleware: checkFraud() M7 trước khi bán Data - check xu_ledger - redirect /payment nếu thiếu Xu
- M5 Data 5G LIVE 510976 MB + M6 Gate: Mua 1GB 5000 Xu - trừ vnpt_config - data_orders 2->3 - vnpt_logs 2->3 - SMS Ban da nhan 1GB
- Supabase keep: camera 2 + admin 10 + ledger 4 + orders 2 + logs 2 + config 1 510976 MB - No re-run SQL

Deploy: Root ./ - Framework Next.js - No Override - Ready 3s - No 404 - PWA iOS+Android
Test: /payment VNPAY TT 846985 QR Offline + /data-5g M6 Gate + /camera CHECKIN_1789105301946
