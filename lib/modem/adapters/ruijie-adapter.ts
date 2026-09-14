import { BaseModemAdapter } from "../base-adapter";
import { AuthorizePayload, AuthResult } from "../types";

export class RuijieAdapter extends BaseModemAdapter {
  // Ruijie RG-EG210G-E uses WISPr / Wifidog protocol
  // Auth flow: portal -> /api/captive/ruijie/auth returns WISPr XML Auth:1
  // Login: /api/captive/ruijie/login?token=32hex validates wifi_sessions

  async authorize(payload: AuthorizePayload): Promise<AuthResult> {
    const token = this.generateToken();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString(); // 10 min
    const authUrl = this.buildAuthUrl(token);
    
    this.log("authorize", { mac: payload.params.client_mac, token, authUrl });

    return {
      success: true,
      token,
      redirectUrl: authUrl,
      expiresAt,
      message: "Ruijie authorized - WISPr Auth:1"
    };
  }

  buildAuthUrl(token: string): string {
    // Ruijie expects redirect to gateway auth endpoint
    // Standard Wifidog: http://gw_ip:2060/wifidog/auth?token=xxx
    const gwIp = this.modem.gateway_ip || "10.0.0.1";
    const base = this.modem.api_url || `http://${gwIp}:2060`;
    return `${base}/wifidog/auth?token=${token}`;
  }

  // Called by Ruijie gateway: GET /api/captive/ruijie/auth?token=xxx&mac=xxx&ip=xxx
  async handleWisprAuth(token: string, mac: string, ip: string, stage: string = "login"): Promise<string> {
    // WISPr XML response - Auth:1 means allowed
    if (stage === "login" || stage === "counters") {
      return `<?xml version="1.0" encoding="UTF-8"?>
<WISPAccessGatewayParam xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="http://www.acmewisp.com/WISPAccessGatewayParam.xsd">
  <AuthenticationReply>
    <MessageType>120</MessageType>
    <ResponseCode>50</ResponseCode>
    <ReplyMessage>Auth: 1</ReplyMessage>
  </AuthenticationReply>
</WISPAccessGatewayParam>`;
    }
    return `Auth: 1`;
  }

  async deauthorize(mac: string): Promise<boolean> {
    this.log("deauthorize", { mac });
    return true;
  }

  async checkStatus(mac: string): Promise<{ online: boolean; ip?: string }> {
    return { online: true };
  }

  getRedirectParams(params: any) {
    return {
      gw_id: params.gw_id,
      mac: params.client_mac,
      ip: params.client_ip,
      ap_mac: params.ap_mac || "",
      wlan_id: params.wlan_id || "1",
      url: params.original_url || "",
      ssid: params.ssid || "XANH24-WIFI"
    };
  }
}
