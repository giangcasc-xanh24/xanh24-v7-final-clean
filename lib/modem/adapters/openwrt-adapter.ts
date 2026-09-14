import { BaseModemAdapter } from "../base-adapter";
import { AuthorizePayload, AuthResult } from "../types";

export class OpenWrtAdapter extends BaseModemAdapter {
  private getApiUrl() { return this.modem.api_url || `http://${this.modem.gateway_ip}`; }

  async authorize(payload: AuthorizePayload): Promise<AuthResult> {
    const token = this.generateToken();
    this.log("openwrt authorize", { mac: payload.params.client_mac });
    // OpenWRT + nodogsplash / opennds: ndsctl auth mac
    // Via API: POST /opennds/auth { token, mac, ip }
    try {
      await fetch(`${this.getApiUrl()}/opennds/auth`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mac: payload.params.client_mac, token, duration: 600 })
      }).catch(()=>null);
      // Fallback SSH: ndsctl auth <mac>
    } catch {}
    return {
      success: true,
      token,
      redirectUrl: payload.params.original_url || "http://www.msftconnecttest.com/redirect",
      expiresAt: new Date(Date.now()+10*60*1000).toISOString()
    };
  }

  async deauthorize(mac: string): Promise<boolean> {
    try {
      await fetch(`${this.getApiUrl()}/opennds/deauth`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mac })
      });
    } catch {}
    return true;
  }

  async checkStatus(mac: string) { return { online: true }; }
}
