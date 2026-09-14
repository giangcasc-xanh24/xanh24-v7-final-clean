export type ModemVendor = 'ruijie' | 'mikrotik' | 'unifi' | 'omada' | 'openwrt';

export interface CaptiveParams {
  gw_id: string;
  client_mac: string;
  client_ip: string;
  ap_mac?: string;
  wlan_id?: string;
  original_url?: string;
  university_id?: string;
}

export interface AuthorizePayload {
  phone: string;
  fullName?: string;
  email?: string;
  extraFields?: Record<string,string>;
  params: CaptiveParams;
  university_id?: string;
}

export interface AuthResult {
  success: boolean;
  token?: string;
  redirectUrl?: string;
  expiresAt?: string;
  message?: string;
  vendorResponse?: any;
}

export interface WifiModem {
  id: string;
  vendor: ModemVendor;
  name: string;
  gateway_ip: string;
  api_url?: string;
  username?: string;
  password_enc?: string;
  location?: string;
  university_id?: string;
  is_active: boolean;
}

export interface WifiModemAdapter {
  vendor: ModemVendor;
  modem: WifiModem;
  authorize(payload: AuthorizePayload): Promise<AuthResult>;
  deauthorize(mac: string): Promise<boolean>;
  checkStatus(mac: string): Promise<{ online: boolean; ip?: string; uptime?: number }>;
  getRedirectParams?(params: CaptiveParams): Record<string,string>;
  buildAuthUrl?(token: string): string;
}
