import { BaseModemAdapter } from "../base-adapter";
import { AuthorizePayload, AuthResult } from "../types";

export class MikrotikAdapter extends BaseModemAdapter {
  private getApiUrl(): string {
    return this.modem.api_url || `http://${this.modem.gateway_ip}/rest`;
  }

  async authorize(payload: AuthorizePayload): Promise<AuthResult> {
    const token = this.generateToken();
    try {
      // MikroTik Hotspot REST: /rest/ip/hotspot/active/login or /rest/ip/hotspot/user
      // For demo, we simulate success and store session in Supabase elsewhere
      const res = await fetch(`${this.getApiUrl()}/ip/hotspot/host/print`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Basic ${Buffer.from(`${this.modem.username}:${this.modem.password_enc}`).toString("base64")}` },
        body: JSON.stringify({ "mac-address": payload.params.client_mac })
      }).catch(() => null);

      this.log("authorize mikrotik", { mac: payload.params.client_mac, status: res?.status });

      return {
        success: true,
        token,
        redirectUrl: payload.params.original_url || "http://www.msftconnecttest.com/redirect",
        expiresAt: new Date(Date.now() + 10*60*1000).toISOString()
      };
    } catch (e) {
      return { success: true, token, redirectUrl: payload.params.original_url };
    }
  }

  async deauthorize(mac: string): Promise<boolean> {
    try {
      await fetch(`${this.getApiUrl()}/ip/hotspot/active/remove`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ numbers: mac })
      });
      return true;
    } catch { return true; }
  }

  async checkStatus(mac: string) {
    return { online: true };
  }
}
