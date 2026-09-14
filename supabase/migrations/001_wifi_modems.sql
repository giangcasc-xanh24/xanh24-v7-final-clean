-- Xanh24 Captive Portal - WiFi Modems & Sessions
-- 001_wifi_modems.sql

create table if not exists wifi_modems (
  id uuid primary key default gen_random_uuid(),
  vendor text not null check (vendor in ('ruijie','mikrotik','unifi','omada','openwrt')),
  name text not null,
  gateway_ip text not null unique,
  api_url text,
  username text,
  password_enc text,
  location text,
  university_id text,
  is_active boolean default true,
  created_at timestamptz default now()
);

create table if not exists wifi_clients (
  mac text primary key,
  phone text not null,
  full_name text,
  email text,
  extra_fields jsonb default '{}'::jsonb,
  university_id text,
  last_seen timestamptz default now(),
  created_at timestamptz default now()
);

create table if not exists wifi_sessions (
  id uuid primary key default gen_random_uuid(),
  mac text references wifi_clients(mac),
  ip text,
  token text unique not null,
  vendor text not null,
  gateway_ip text not null,
  university_id text,
  status text default 'active' check (status in ('active','expired','revoked')),
  expires_at timestamptz not null,
  last_seen timestamptz default now(),
  created_at timestamptz default now()
);

create table if not exists xu_ledger (
  id uuid primary key default gen_random_uuid(),
  phone text not null,
  amount int not null,
  type text not null,
  description text,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

create table if not exists student_progress (
  phone text primary key,
  gpa numeric default 3.6,
  xu int default 0,
  university_id text,
  last_wifi timestamptz,
  updated_at timestamptz default now()
);

-- Seed 5 modems
insert into wifi_modems (vendor, name, gateway_ip, api_url, location, university_id) values
('ruijie','Ruijie RG-EG210G-E - FPT Poly','10.0.0.1','http://10.0.0.1:2060','Tòa F - FPT Polytechnic','default'),
('mikrotik','MikroTik hAP ac² - HUTECH','10.0.0.2','http://10.0.0.2/rest','Khu A - HUTECH','hutech'),
('unifi','UniFi U6-Lite - FPT University','10.0.0.3','https://10.0.0.3:8443','Library - FPTU','fpt'),
('omada','TP-Link Omada EAP245 - VLU','10.0.0.4','http://10.0.0.4:8043','CS1 - Van Lang','vlu'),
('openwrt','OpenWRT AX3000 - Community','10.0.0.5','http://10.0.0.5','Xanh24 Hub','default')
on conflict (gateway_ip) do nothing;

create index if not exists idx_wifi_sessions_token on wifi_sessions(token);
create index if not exists idx_wifi_sessions_mac on wifi_sessions(mac);
create index if not exists idx_xu_phone on xu_ledger(phone);
