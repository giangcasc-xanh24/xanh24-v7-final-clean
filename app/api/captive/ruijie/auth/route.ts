import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token") || req.nextUrl.searchParams.get("tok") || "";
  const mac = req.nextUrl.searchParams.get("mac") || req.nextUrl.searchParams.get("client_mac") || "";
  const ip = req.nextUrl.searchParams.get("ip") || req.nextUrl.searchParams.get("client_ip") || "";
  const stage = req.nextUrl.searchParams.get("stage") || "login";

  if (!token) {
    return new NextResponse("Auth: 0", { status: 200, headers: { "Content-Type": "text/plain" } });
  }

  const { data: session } = await supabase.from("wifi_sessions").select("*").eq("token", token).eq("status", "active").single();

  if (!session) {
    return new NextResponse("Auth: 0", { status: 200, headers: { "Content-Type": "text/plain" } });
  }

  if (stage === "counters") {
    // Keep alive
    await supabase.from("wifi_sessions").update({ last_seen: new Date().toISOString() }).eq("token", token);
  }

  const wispr = `<?xml version="1.0" encoding="UTF-8"?>
<WISPAccessGatewayParam xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="http://www.acmewisp.com/WISPAccessGatewayParam.xsd">
  <AuthenticationReply>
    <MessageType>120</MessageType>
    <ResponseCode>50</ResponseCode>
    <ReplyMessage>Auth: 1</ReplyMessage>
  </AuthenticationReply>
</WISPAccessGatewayParam>`;

  // Ruijie also accepts plain Auth: 1
  const accept = req.headers.get("accept") || "";
  if (accept.includes("xml") || stage !== "login") {
    return new NextResponse(wispr, { status: 200, headers: { "Content-Type": "application/xml" } });
  }

  return new NextResponse("Auth: 1", { status: 200, headers: { "Content-Type": "text/plain" } });
}
