import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export async function GET(req: NextRequest) {
  const university_id = req.nextUrl.searchParams.get("university_id") || "default";

  // Try Supabase
  const { data, error } = await supabase.from("universities").select("*").eq("id", university_id).single();

  if (data) {
    return NextResponse.json({ success: true, config: data });
  }

  // Fallback mock configs for demo
  const mockConfigs: Record<string, any> = {
    "default": {
      id: "default",
      name: "FPT Polytechnic",
      fields_config: [
        { key: "Lop", label: "Lớp", placeholder: "DD-K31-CNTT-001", required: true },
        { key: "Khoa", label: "Khoa", placeholder: "CNTT", options: ["CNTT","K31","QTKD","Marketing"], required: true },
        { key: "MSSV", label: "MSSV", placeholder: "SE170123", required: true },
        { key: "Dong", label: "Đợt", placeholder: "K31", required: false }
      ]
    },
    "fpt": {
      id: "fpt",
      name: "FPT University",
      fields_config: [
        { key: "Lop", label: "Lớp", placeholder: "SE1701", required: true },
        { key: "Khoa", label: "Chuyên ngành", placeholder: "SE", options: ["SE","AI","IoT","GD"], required: true },
        { key: "MSSV", label: "MSSV", placeholder: "SE170123", required: true },
        { key: "Dong", label: "Khóa", placeholder: "K17", required: true }
      ]
    },
    "hutech": {
      id: "hutech",
      name: "HUTECH",
      fields_config: [
        { key: "Lop", label: "Lớp", placeholder: "20DTHA1", required: true },
        { key: "Khoa", label: "Khoa", placeholder: "CNTT", options: ["CNTT","QTKD","NNA"], required: true },
        { key: "MSSV", label: "MSSV", placeholder: "2080601234", required: true }
      ]
    }
  };

  const cfg = mockConfigs[university_id] || mockConfigs["default"];
  return NextResponse.json({ success: true, config: cfg });
}
