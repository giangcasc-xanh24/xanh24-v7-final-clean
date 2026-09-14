import { WifiModem, WifiModemAdapter, ModemVendor, AuthorizePayload, AuthResult, CaptiveParams } from "./types";
import crypto from "crypto";

export abstract class BaseModemAdapter implements WifiModemAdapter {
  vendor: ModemVendor;
  modem: WifiModem;

  constructor(modem: WifiModem) {
    this.modem = modem;
    this.vendor = modem.vendor;
  }

  abstract authorize(payload: AuthorizePayload): Promise<AuthResult>;
  abstract deauthorize(mac: string): Promise<boolean>;
  abstract checkStatus(mac: string): Promise<{ online: boolean; ip?: string; uptime?: number }>;

  generateToken(): string {
    return crypto.randomBytes(16).toString("hex"); // 32-hex
  }

  normalizeMac(mac: string): string {
    return mac.toLowerCase().replace(/-/g, ":");
  }

  buildSessionId(mac: string, token: string): string {
    return `${this.normalizeMac(mac)}_${token}`;
  }

  getRedirectParams(params: CaptiveParams): Record<string,string> {
    return {
      gw_id: params.gw_id,
      mac: params.client_mac,
      ip: params.client_ip,
      url: params.original_url || "http://www.msftconnecttest.com/redirect"
    };
  }

  log(action: string, data: any) {
    console.log(`[${this.vendor.toUpperCase()}][${this.modem.gateway_ip}] ${action}:`, data);
  }
}
