import { WifiModem, WifiModemAdapter } from "./types";
import { RuijieAdapter } from "./adapters/ruijie-adapter";
import { MikrotikAdapter } from "./adapters/mikrotik-adapter";
import { UnifiAdapter } from "./adapters/unifi-adapter";
import { OmadaAdapter } from "./adapters/omada-adapter";
import { OpenWrtAdapter } from "./adapters/openwrt-adapter";

export class ModemAdapterFactory {
  static create(modem: WifiModem): WifiModemAdapter {
    switch (modem.vendor) {
      case "ruijie": return new RuijieAdapter(modem);
      case "mikrotik": return new MikrotikAdapter(modem);
      case "unifi": return new UnifiAdapter(modem);
      case "omada": return new OmadaAdapter(modem);
      case "openwrt": return new OpenWrtAdapter(modem);
      default: throw new Error(`Unsupported vendor ${modem.vendor}`);
    }
  }

  static async fromGatewayIp(gatewayIp: string, supabase: any): Promise<WifiModemAdapter> {
    const { data, error } = await supabase.from("wifi_modems").select("*").eq("gateway_ip", gatewayIp).eq("is_active", true).single();
    if (error || !data) throw new Error(`Modem not found for gateway ${gatewayIp}`);
    return this.create(data as WifiModem);
  }

  static fromVendor(vendor: string, modem: WifiModem): WifiModemAdapter {
    return this.create({ ...modem, vendor: vendor as any });
  }
}
