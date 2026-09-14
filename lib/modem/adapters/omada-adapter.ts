import { BaseModemAdapter } from "../base-adapter";
import { AuthorizePayload, AuthResult } from "../types";

export class OmadaAdapter extends BaseModemAdapter {
  private getApiUrl() { return this.modem.api_url || `http://${this.modem.gateway_ip}:8043`; }

  async authorize(payload: AuthorizePayload): Promise<AuthResult> {
    const token = this.generateToken();
    this.log("omada authorize", { mac: payload.params.client_mac });
    // Omada Controller API: POST /api/v2/hotspot/extPortal/auth
    // { clientMac, apMac, ssid, radioId, site, time: 600 }
    try {
      await fetch(`${this.getApiUrl()}/api/v2/hotspot/extPortal/auth`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientMac: payload.params.client_mac,
          apMac: payload.params.ap_mac,
          ssid: "XANH24",
          time: 600,
          token
        })
      }).catch(()=>null);
    } catch {}
    return {
      success: true,
      token,
      redirectUrl: payload.params.original_url || "http://www.msftconnecttest.com/redirect",
      expiresAt: new Date(Date.now()+10*60*1000).toISOString()
    };
  }

  async deauthorize(mac: string): Promise<boolean> { return true; }
  async checkStatus(mac: string) { return { online: true }; }
}
