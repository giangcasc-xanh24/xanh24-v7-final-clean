"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

type UniversityField = { key: string; label: string; placeholder: string; options?: string[]; required?: boolean };
type UniversityConfig = { id: string; name: string; fields_config: UniversityField[] };

export default function CaptivePortalPage() {
  const searchParams = useSearchParams();
  const [config, setConfig] = useState<UniversityConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ fullName: "", phone: "", email: "", Lop: "", Khoa: "", MSSV: "", Dong: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [countdown, setCountdown] = useState(600);

  const gw_id = searchParams.get("gw_id") || "";
  const client_mac = searchParams.get("mac") || searchParams.get("client_mac") || "";
  const client_ip = searchParams.get("client_ip") || searchParams.get("ip") || "";
  const ap_mac = searchParams.get("ap_mac") || "";
  const wlan_id = searchParams.get("wlan_id") || "1";
  const original_url = searchParams.get("url") || searchParams.get("original_url") || "http://www.msftconnecttest.com/redirect";
  const university_id = searchParams.get("university_id") || searchParams.get("uid") || "default";

  useEffect(() => {
    fetch(`/api/university/config?university_id=${university_id}`)
      .then(r => r.json()).then(d => { setConfig(d.config || d); setLoading(false); })
      .catch(() => setLoading(false));
  }, [university_id]);

  useEffect(() => {
    if (!success) return;
    const t = setInterval(() => setCountdown(c => c > 0 ? c - 1 : 0), 1000);
    return () => clearInterval(t);
  }, [success]);

  const validatePhone = (p: string) => /^(0|\+84)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-6|8|9]|9[0-4|6-9])[0-9]{7}$/.test(p);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePhone(form.phone)) { setError("Số điện thoại không hợp lệ (VN)"); return; }
    if (!form.fullName.trim()) { setError("Vui lòng nhập họ tên"); return; }
    setError("");
    const res = await fetch("/api/captive/modem/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phone: form.phone, fullName: form.fullName, email: form.email,
        extraFields: { Lop: form.Lop, Khoa: form.Khoa, MSSV: form.MSSV, Dong: form.Dong },
        params: { gw_id, client_mac, client_ip, ap_mac, wlan_id, original_url, university_id },
        university_id
      })
    });
    const data = await res.json();
    if (data.success) {
      setSuccess(true);
      if (data.redirectUrl) { setTimeout(() => window.location.href = data.redirectUrl, 1500); }
    } else { setError(data.message || "Xác thực thất bại"); }
  };

  const fields = config?.fields_config || [
    { key: "Lop", label: "Lớp", placeholder: "DD-K31-CNTT-001", required: true },
    { key: "Khoa", label: "Khoa", placeholder: "CNTT", options: ["CNTT","K31","QTKD"], required: true },
    { key: "MSSV", label: "MSSV", placeholder: "SE170123", required: true },
    { key: "Dong", label: "Đợt", placeholder: "K31", required: false }
  ];

  if (loading) return <div className="min-h-screen bg-[#102E22] flex items-center justify-center text-white">Đang tải Xanh24...</div>;

  if (success) {
    const m = Math.floor(countdown/60).toString().padStart(2,'0');
    const s = (countdown%60).toString().padStart(2,'0');
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#102E22] via-[#0F3D2E] to-[#153D2B] flex items-center justify-center p-4">
        <div className="bg-white rounded-[24px] p-8 max-w-md w-full text-center shadow-2xl">
          <div className="w-16 h-16 bg-gradient-to-br from-[#00A651] to-[#00C853] rounded-full flex items-center justify-center mx-auto mb-4">✓</div>
          <h1 className="text-2xl font-bold text-[#102E22]">Kết nối thành công!</h1>
          <div className="mt-4 text-5xl font-black text-[#00A651]">{m}:{s}</div>
          <div className="mt-2 text-sm text-gray-600">Miễn phí 10 phút - Tặng 5 Xu • GPA 3.6/4.0</div>
          <div className="mt-6 p-3 bg-[#F0FDF4] border border-[#00A651]/20 rounded-xl text-left text-sm">
            <div className="font-bold text-[#00A651]">🚀 Nâng cấp VNPT 5G?</div>
            <div className="text-gray-600 mt-1">Nhận số 0968xxxx - Tốc độ cao, không giới hạn. <a href="/vnpt" className="text-[#00A651] underline">Đăng ký ngay</a></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#102E22] via-[#0F3D2E] to-[#153D2B] flex items-center justify-center p-4">
      <div className="w-full max-w-[440px]">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur rounded-full text-white text-xs border border-white/10">
            <span className="w-2 h-2 bg-[#00C853] rounded-full animate-pulse"></span> Ruijie RG-EG210G-E • {gw_id || "GW-01"}
          </div>
          <h1 className="mt-4 text-3xl font-black text-white tracking-tight">XANH24</h1>
          <p className="text-white/60 text-sm">Captive Portal • WiFi Marketing • Edu</p>
        </div>

        <div className="bg-white rounded-[24px] shadow-[0_20px_60px_rgba(0,0,0,0.4)] overflow-hidden">
          <div className="h-1.5 w-full bg-gradient-to-r from-[#00A651] to-[#00C853]" />
          <div className="p-7">
            <h2 className="font-bold text-[#102E22]">Đăng nhập WiFi miễn phí</h2>
            <p className="text-xs text-gray-500 mt-1">MAC: {client_mac || "—"} • IP: {client_ip || "—"} • Trường: {config?.name || university_id}</p>

            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              <div>
                <label className="text-xs font-semibold text-[#0F3D2E]">Họ và tên *</label>
                <input value={form.fullName} onChange={e=>setForm({...form, fullName:e.target.value})} className="mt-1 w-full h-11 px-4 rounded-xl border border-gray-200 focus:border-[#00A651] focus:ring-2 focus:ring-[#00A651]/20 outline-none text-sm" placeholder="Nguyễn Văn A" />
              </div>
              <div>
                <label className="text-xs font-semibold text-[#0F3D2E]">Số điện thoại *</label>
                <input value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} className="mt-1 w-full h-11 px-4 rounded-xl border border-gray-200 focus:border-[#00A651] focus:ring-2 focus:ring-[#00A651]/20 outline-none text-sm" placeholder="0968123456" />
              </div>
              <div>
                <label className="text-xs font-semibold text-[#0F3D2E]">Email</label>
                <input value={form.email} onChange={e=>setForm({...form, email:e.target.value})} className="mt-1 w-full h-11 px-4 rounded-xl border border-gray-200 focus:border-[#00A651] focus:ring-2 focus:ring-[#00A651]/20 outline-none text-sm" placeholder="sv@fpt.edu.vn" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                {fields.map(f => (
                  <div key={f.key} className={f.key==="Lop"||f.key==="MSSV"?"col-span-2 sm:col-span-1":""}>
                    <label className="text-xs font-semibold text-[#0F3D2E]">{f.label} {f.required?"*":""}</label>
                    {f.options ? (
                      <select value={(form as any)[f.key]||""} onChange={e=>setForm({...form, [f.key]:e.target.value})} className="mt-1 w-full h-11 px-3 rounded-xl border border-gray-200 bg-white text-sm">
                        <option value="">Chọn {f.label}</option>
                        {f.options.map(o=><option key={o} value={o}>{o}</option>)}
                      </select>
                    ) : (
                      <input value={(form as any)[f.key]||""} onChange={e=>setForm({...form, [f.key]:e.target.value})} className="mt-1 w-full h-11 px-4 rounded-xl border border-gray-200 focus:border-[#00A651] outline-none text-sm" placeholder={f.placeholder} />
                    )}
                  </div>
                ))}
              </div>

              {error && <div className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-xl p-3">{error}</div>}

              <button type="submit" className="w-full h-12 rounded-xl bg-gradient-to-r from-[#00A651] to-[#00C853] text-white font-bold text-sm shadow-lg shadow-[#00A651]/20 hover:opacity-90 transition">Kết nối WiFi - Nhận 5 Xu</button>

              <div className="flex items-center justify-center gap-3 text-[10px] text-gray-400">
                <span className="flex items-center gap-1"><Shield size={12}/> Bảo mật</span>
                <span>•</span>
                <span className="flex items-center gap-1"><Clock size={12}/> 10 phút free</span>
                <span>•</span>
                <span>GPA 3.6/4.0</span>
              </div>
            </form>

            <div className="mt-6 rounded-xl bg-gradient-to-r from-[#0F3D2E] to-[#153D2B] p-4 text-white flex gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#00A651] flex items-center justify-center font-black">5G</div>
              <div className="flex-1">
                <div className="text-xs font-bold">VNPT 5G - Số đẹp 0968xxxx</div>
                <div className="text-[11px] text-white/70">Đăng ký sim số đẹp, nhận data 120GB/tháng. Xác thực OTP.</div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-4 text-[10px] text-white/40">Xanh24 • Ruijie WISPr • Wifidog • Powered by Supabase</div>
      </div>
    </div>
  );
}
