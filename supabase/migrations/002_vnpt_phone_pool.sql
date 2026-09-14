-- VNPT Phone Pool & Provisions
-- 002_vnpt_phone_pool.sql

create table if not exists vnpt_phone_pool (
  id uuid primary key default gen_random_uuid(),
  phone_number text unique not null,
  status text default 'available' check (status in ('available','reserved','sold')),
  price int default 0,
  type text default 'regular',
  reserved_by text,
  reserved_at timestamptz,
  created_at timestamptz default now()
);

create table if not exists vnpt_provisions (
  id uuid primary key default gen_random_uuid(),
  phone text not null,
  full_name text,
  cccd text,
  university_id text,
  assigned_number text not null,
  status text default 'pending_otp' check (status in ('pending_otp','confirmed','cancelled')),
  otp_code text,
  created_at timestamptz default now(),
  confirmed_at timestamptz
);

-- Seed 5 numbers
insert into vnpt_phone_pool (phone_number, status, price, type) values
('0968123456','available',199000,'vip'),
('0968123457','available',99000,'regular'),
('0968123458','available',99000,'regular'),
('0968123468','available',149000,'beautiful'),
('0968999999','available',499000,'vip')
on conflict (phone_number) do nothing;

create index if not exists idx_vnpt_pool_status on vnpt_phone_pool(status);
create index if not exists idx_vnpt_prov_phone on vnpt_provisions(phone);
