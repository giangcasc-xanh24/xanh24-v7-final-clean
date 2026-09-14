import { BaseModemAdapter } from "../base-adapter";
import { AuthorizePayload, AuthResult } from "../types";

export class UnifiAdapter extends BaseModemAdapter {
  private getControllerUrl(): string {
    return this.modem.api_url || `https://${this.modem.gateway_ip}:8443`;
  }

  async authorize(payload: AuthorizePayload): Promise<AuthResult> {
    const token = this.generateToken();
    try {
      // UniFi: POST /api/s/default/cmd/stamgr { cmd: "authorize-guest", mac, minutes:10 }
      const controller = this.getControllerUrl();
      const loginRes = await fetch(`${controller}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: this.modem.username, password: this.modem.password_enc }),
        // @ts-ignore
        agent: { rejectUnauthorized: false }
      }).catch(() => null);

      this.log("unifi authorize", { mac: payload.params.client_mac, token });

      // In production, call authorize-guest
      // await fetch(`${controller}/api/s/default/cmd/stamgr`, { method:"POST", body: JSON.stringify({ cmd:"authorize-guest", mac: payload.params.client_mac, minutes:10 }) })

      return {
        success: true,
        token,
        redirectUrl: payload.params.original_url || "http://www.msftconnecttest.com/redirect",
        expiresAt: new Date(Date.now() + 10*60*1000).toISOString()
      };
    } catch {
      return { success: true, token, redirectUrl: payload.params.original_url };
    }
  }

  async deauthorize(mac: string): Promise<boolean> {
    try {
      const controller = this.getControllerUrl();
      await fetch(`${controller}/api/s/default/cmd/stamgr`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cmd: "unauthorize-guest", mac })
      });
      return true;
    } catch { return true; }
  }

  async checkStatus(mac: string) { return { online: true }; }
}
