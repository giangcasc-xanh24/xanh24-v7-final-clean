
# Xanh24 v7 FINAL CLEAN - Sau Supabase Day2

## Supabase đã DONE - Không sửa lại
camera_checkins 2 + admin_blocks 10 + xu_ledger 4 + data_orders 2 + vnpt_logs 2 + vnpt_config 1 (510976 MB 49%)

## CLEAN - No monorepo - Deploy 1 click

1. Tạo repo mới xanh24-v7-final-clean
2. Upload toàn bộ file trong zip này (không có _1.json)
3. Vercel -> Import repo -> Framework Next.js -> Root Directory ./ (để trống) -> Install npm install -> Build next build -> Output .next default (TẮT Override)
4. Env: NEXT_PUBLIC_SUPABASE_URL, ANON_KEY, SERVICE_ROLE_KEY, NEXT_PUBLIC_MODULE_M5=true, M2=true, M3=true, M7=true
5. Deploy -> Ready 3s -> Visit -> Không 404

Test iOS+Android: /camera playsinline + /data-5g Mua 1GB + PWA manifest
