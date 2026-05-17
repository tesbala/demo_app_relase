"use client";

import { useEffect, useRef, useState } from "react";

const APK_DOWNLOAD_URL =
  "https://drive.google.com/file/d/1GHYde28aROlW5ImIbVtEaqAQGfQsvpys/view?usp=sharing";

const CASTES = [
  "காவிட் டோல்", "கொரிவோல்", "பசலட்டோல்", "காலோல் (காலி)",
  "தண்ணிரோல்", "சீரலோல்", "பானமோல்", "கோலோல்",
  "பாசிமோல்", "மாட்டுங்கோல்", "பில்லோல்", "இதர பிரவிகள்",
];

const VILLAGES = [
  "நிலக்கோட்டை", "சத்தியமூர்த்தி நகர்", "கடசனேந்தல்", "எண்டப்புளி",
  "சின்னமுப்பன்பட்டி", "சமுத்திரம்", "திருச்சுழி", "வாலிசெட்டிப்பட்டி",
  "பெருமாள்புதூர்", "பார்த்தசாரதிபுரம்", "அரங்கூர்", "ஏரல்",
  "தரவை", "தச்சநல்லுர்", "சென்றாம்பாளையம்", "லட்சுமிபுரம்",
];

const FEATURES = [
  { icon: "💍", title: "Bride & Groom Registration", desc: "Complete profile with photos and personal details for seamless matchmaking." },
  { icon: "🏘️", title: "Community Sub-Division", desc: "Select your exact sub-division for culturally aligned matches." },
  { icon: "📍", title: "Village Details", desc: "Filter profiles by native village to find community-rooted matches." },
  { icon: "📸", title: "Photo Upload", desc: "Upload and showcase profile photos securely within the community." },
  { icon: "🔒", title: "Secure Contact", desc: "Privacy-first messaging keeps your personal info protected at all times." },
  { icon: "✅", title: "Admin Verified", desc: "Every profile is reviewed and verified by trusted community admins." },
];

const STEPS = [
  { step: "01", title: "Download the APK", desc: "Free download for all Android devices. No app store required." },
  { step: "02", title: "Register Profile", desc: "Fill details, choose your community division and native village." },
  { step: "03", title: "Admin Verification", desc: "Trusted admins review and verify your profile for authenticity." },
  { step: "04", title: "Find Your Match", desc: "Browse verified profiles filtered by division and village — safely." },
];

// Fully deterministic — no Math.random
const PARTICLES = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  delay: i * 0.5,
  x: (i * 7.3) % 100,
  size: 5 + (i % 4) * 3,
  duration: 7 + (i % 4) + ((i * 7) % 3),
}));

function Particle({ delay, x, size, duration }: { delay: number; x: number; size: number; duration: number }) {
  return (
    <div
      className="particle-float"
      style={{
        position: "absolute", bottom: 0, borderRadius: "50%",
        left: `${x}%`, width: `${size}px`, height: `${size}px`,
        animationDelay: `${delay}s`, animationDuration: `${duration}s`,
        background: "radial-gradient(circle, rgba(251,191,36,0.7), rgba(217,119,6,0.1))",
      }}
    />
  );
}

export default function KattunayakanMatrimonyLanding() {
  const [downloading, setDownloading] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [activeFeature, setActiveFeature] = useState<number | null>(null);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const refs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          const id = (e.target as HTMLElement).dataset.sid;
          if (id) setVisibleSections((prev) => new Set([...prev, id]));
        }
      }),
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    Object.values(refs.current).forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const r = (id: string) => (el: HTMLElement | null) => { refs.current[id] = el; };
  const visible = (id: string) => visibleSections.has(id);

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => { window.open(APK_DOWNLOAD_URL, "_blank"); setDownloading(false); }, 1500);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Tamil:wght@400;600;700&family=Cinzel:wght@400;600;700&family=Lato:wght@300;400;700&display=swap');

        *, *::before, *::after {
          margin: 0; padding: 0; box-sizing: border-box;
          -webkit-tap-highlight-color: transparent;
        }
        :root {
          --gold: #f59e0b; --gold-l: #fcd34d; --gold-d: #b45309;
          --deep: #0b0700; --surface: #1a1200; --surface2: #241900;
          --text: #fef3c7; --muted: #b45309;
        }
        html { scroll-behavior: smooth; -webkit-text-size-adjust: 100%; }
        body {
          background: var(--deep); color: var(--text);
          font-family: 'Lato', sans-serif;
          overflow-x: hidden; min-height: 100dvh;
        }

        .fd { font-family: 'Cinzel', serif; }
        .ft { font-family: 'Noto Sans Tamil', sans-serif; }

        /* particles */
        @keyframes pf {
          0%   { transform: translateY(0)      scale(1);   opacity: 0; }
          8%   { opacity: .8; }
          92%  { opacity: .2; }
          100% { transform: translateY(-100vh) scale(.2);  opacity: 0; }
        }
        .particle-float { animation: pf linear infinite; }

        /* shimmer */
        @keyframes sh {
          0%   { background-position: -300% center; }
          100% { background-position:  300% center; }
        }
        .shimmer {
          background: linear-gradient(90deg,#d97706,#fcd34d,#f59e0b,#fbbf24,#d97706);
          background-size: 300% auto;
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text; animation: sh 4s linear infinite;
        }

        /* glow */
        @keyframes glow {
          0%,100% { box-shadow: 0 0 18px rgba(245,158,11,.5), 0 0 44px rgba(245,158,11,.22); }
          50%      { box-shadow: 0 0 36px rgba(245,158,11,.8), 0 0 72px rgba(245,158,11,.38); }
        }
        .glow { animation: glow 2.6s ease-in-out infinite; }

        /* mandala */
        @keyframes mcw  { to { transform: rotate(360deg); } }
        @keyframes mccw { to { transform: rotate(-360deg); } }
        .mcw  { animation: mcw  45s linear infinite; }
        .mccw { animation: mccw 35s linear infinite; }

        /* hero blob */
        @keyframes hb {
          0%,100% { opacity:.6; transform: translateX(-50%) scale(1); }
          50%      { opacity:1;  transform: translateX(-50%) scale(1.1); }
        }
        .hero-blob { animation: hb 7s ease-in-out infinite; }

        /* bounce */
        @keyframes bd { 0%,100% { transform: translateY(0); } 50% { transform: translateY(8px); } }
        .bd { animation: bd 1.5s ease-in-out infinite; }

        /* marquee */
        @keyframes mq { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .mq { animation: mq 18s linear infinite; }

        /* download btn */
        .dlb {
          position: relative; overflow: hidden; cursor: pointer; border: none;
          background: linear-gradient(135deg,#92400e,#b45309,#d97706,#f59e0b);
          color: #fff; transition: transform .18s, box-shadow .18s;
          touch-action: manipulation; -webkit-user-select: none; user-select: none;
        }
        .dlb::after {
          content: ''; position: absolute;
          top: -50%; left: -80%; width: 50%; height: 200%;
          background: rgba(255,255,255,.22); transform: skewX(-20deg);
          transition: left .55s ease;
        }
        .dlb:hover::after, .dlb:focus::after { left: 130%; }
        .dlb:active { transform: scale(.96); }

        /* ornament */
        .orn { display:flex; align-items:center; gap:10px; justify-content:center; }
        .orn::before,.orn::after {
          content:''; flex:1; height:1px; max-width:64px;
          background: linear-gradient(90deg,transparent,var(--gold),transparent);
        }

        /* card */
        .card {
          border: 1px solid rgba(245,158,11,.12);
          background: linear-gradient(145deg,rgba(36,25,0,.96),rgba(18,13,0,.98));
          transition: border-color .3s, transform .2s;
        }
        .card:active { transform: scale(.97); border-color: rgba(245,158,11,.4); }

        /* chip */
        .chip {
          font-family: 'Noto Sans Tamil', sans-serif;
          background: rgba(245,158,11,.08);
          border: 1px solid rgba(245,158,11,.2);
          color: #fcd34d;
          transition: background .2s, transform .15s;
          display: inline-block;
        }
        .chip:active { background: rgba(245,158,11,.2); transform: scale(.94); }

        /* section reveal */
        @keyframes ru { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
        .rv    { opacity: 0; }
        .rv.on { animation: ru .65s cubic-bezier(.22,1,.36,1) forwards; }

        /* spin */
        @keyframes spin { to { transform: rotate(360deg); } }

        /* sticky CTA slide */
        .sticky-cta {
          transform: translateY(100%);
          transition: transform .35s cubic-bezier(.22,1,.36,1);
        }
        .sticky-cta.visible { transform: translateY(0); }

        /* kolam bg */
        .kb {
          background-image:
            radial-gradient(ellipse 80% 55% at 20% 30%, rgba(245,158,11,.03) 0%,transparent 60%),
            radial-gradient(ellipse 60% 75% at 80% 70%, rgba(153,27,27,.04) 0%,transparent 60%);
        }

        /* safe area */
        .pb-safe { padding-bottom: max(16px, env(safe-area-inset-bottom)); }

        /* feature card active */
        .fca { border-color: rgba(245,158,11,.45) !important; }

        /* scrollbar */
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #130e00; }
        ::-webkit-scrollbar-thumb { background: var(--gold-d); border-radius: 2px; }
      `}</style>

      <div style={{ background: "var(--deep)", minHeight: "100dvh", position: "relative" }}>

        {/* ── Particles ── */}
        <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
          {PARTICLES.map((p) => <Particle key={p.id} {...p} />)}
        </div>

        {/* ══════════════ NAVBAR ══════════════ */}
        <nav style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
          background: scrollY > 50 ? "rgba(11,7,0,.97)" : "transparent",
          backdropFilter: scrollY > 50 ? "blur(20px)" : "none",
          borderBottom: scrollY > 50 ? "1px solid rgba(245,158,11,.12)" : "none",
          transition: "all .3s",
        }}>
          <div style={{ maxWidth: 480, margin: "0 auto", padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#92400e,#f59e0b)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>💍</div>
              <div>
                <div className="fd" style={{ fontSize: 11, fontWeight: 700, color: "var(--gold)", letterSpacing: "0.12em", lineHeight: 1.2 }}>KATTUNAYAKAN</div>
                <div style={{ fontSize: 10, color: "var(--muted)" }}>Matrimony App</div>
              </div>
            </div>
            <button onClick={handleDownload} className="dlb fd" style={{ fontSize: 11, fontWeight: 700, padding: "9px 18px", borderRadius: 999, letterSpacing: "0.05em" }}>
              📲 Download
            </button>
          </div>
        </nav>

        {/* ══════════════ HERO ══════════════ */}
        <section className="kb" style={{
          minHeight: "100dvh", display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", textAlign: "center",
          padding: "80px 20px 48px", position: "relative", overflow: "hidden",
        }}>
          {/* Blob */}
          <div className="hero-blob" style={{
            position: "absolute", width: 300, height: 300, borderRadius: "50%",
            top: "12%", left: "50%", pointerEvents: "none",
            background: "radial-gradient(circle,rgba(180,83,9,.22) 0%,transparent 70%)",
          }} />
          {/* Mandalas */}
          <div className="mcw" style={{ position: "absolute", fontSize: 200, right: -70, top: "6%", opacity: .055, lineHeight: 1, pointerEvents: "none", userSelect: "none" }}>✿</div>
          <div className="mccw" style={{ position: "absolute", fontSize: 140, left: -50, bottom: "10%", opacity: .05, lineHeight: 1, pointerEvents: "none", userSelect: "none" }}>❋</div>
          {/* Grid */}
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: .04, pointerEvents: "none" }}>
            <defs><pattern id="g" width="48" height="48" patternUnits="userSpaceOnUse"><path d="M48 0L0 0 0 48" fill="none" stroke="#f59e0b" strokeWidth=".6" /></pattern></defs>
            <rect width="100%" height="100%" fill="url(#g)" />
          </svg>

          <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 380 }}>
            {/* Badge */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 18px", borderRadius: 999, border: "1px solid rgba(245,158,11,.3)", background: "rgba(245,158,11,.07)", marginBottom: 24 }}>
              <span style={{ width: 7, height: 7, background: "var(--gold)", transform: "rotate(45deg)", display: "inline-block", flexShrink: 0 }} />
              <span className="ft" style={{ fontSize: 12, color: "var(--gold-l)" }}>காட்டுநாயக்கன் மக்கள் சமுதாயம்</span>
              <span style={{ width: 7, height: 7, background: "var(--gold)", transform: "rotate(45deg)", display: "inline-block", flexShrink: 0 }} />
            </div>

            {/* Title */}
            <h1 className="fd" style={{ fontWeight: 700, lineHeight: 1.15, marginBottom: 10, fontSize: "clamp(2rem,11vw,3rem)" }}>
              <span className="shimmer">Kattunayakan</span><br />
              <span style={{ color: "#fff" }}>Community</span>
            </h1>
            <div className="fd" style={{ letterSpacing: "0.22em", fontSize: "clamp(.7rem,4vw,.9rem)", color: "var(--muted)", marginBottom: 20 }}>MATRIMONY APP</div>

            {/* Tamil lines */}
            <p className="ft" style={{ fontSize: "clamp(.85rem,4.2vw,1rem)", color: "#fde68a", lineHeight: 1.7, marginBottom: 8 }}>
              திருமணத் தகவல்களை பாதுகாப்பாகவும்<br />எளிதாகவும் பகிர்ந்து கொள்ளுங்கள்
            </p>
            <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.65, marginBottom: 32 }}>
              Find your perfect match — safe, trusted &amp; community-verified.
            </p>

            {/* CTA */}
            <button onClick={handleDownload} className="dlb glow" style={{ width: "100%", fontWeight: 700, borderRadius: 18, padding: "18px 24px", fontSize: 17, display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 16 }}>
              {downloading
                ? <><span style={{ width: 20, height: 20, borderRadius: "50%", border: "2.5px solid #fff", borderTopColor: "transparent", animation: "spin .7s linear infinite", display: "inline-block" }} />Preparing…</>
                : <><span style={{ fontSize: "1.35rem" }}>📲</span>Download Free APK</>}
            </button>

            {/* Trust row */}
            <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", fontSize: 11, color: "rgba(245,158,11,.45)" }}>
              {["🤖 Android", "🆓 Free", "✅ Verified", "🔒 Secure"].map((b) => <span key={b}>{b}</span>)}
            </div>

            {/* Scroll cue */}
            <div className="bd" style={{ marginTop: 40, color: "rgba(245,158,11,.3)", fontSize: 22 }}>⌄</div>
          </div>
        </section>

        {/* ══════════════ MARQUEE ══════════════ */}
        <div style={{ overflow: "hidden", padding: "11px 0", background: "linear-gradient(90deg,#7c2d12,#b45309,#d97706,#b45309,#7c2d12)", borderTop: "1px solid rgba(245,158,11,.45)", borderBottom: "1px solid rgba(245,158,11,.45)" }}>
          <div className="mq" style={{ display: "flex", gap: 40, whiteSpace: "nowrap", width: "200%" }}>
            {[...Array(2)].map((_, i) => (
              <span key={i} style={{ display: "inline-flex", gap: 40, flexShrink: 0 }}>
                {["💍 Register Now","🔒 Admin Verified","🏘️ 16 Villages","👨‍👩‍👧 12 Divisions","📲 Free APK","✅ Trusted"].map((t) => (
                  <span key={t} className="fd" style={{ fontSize: 11, letterSpacing: "0.14em", color: "#fff", opacity: .9 }}>{t}</span>
                ))}
              </span>
            ))}
          </div>
        </div>

        {/* ══════════════ STATS ══════════════ */}
        <div ref={r("stats")} data-sid="stats" className={`rv ${visible("stats") ? "on" : ""}`}
          style={{ padding: "30px 20px", borderBottom: "1px solid rgba(245,158,11,.08)" }}>
          <div style={{ maxWidth: 380, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8, textAlign: "center" }}>
            {[{n:"12+",l:"Divisions"},{n:"16",l:"Villages"},{n:"100%",l:"Verified"},{n:"Free",l:"Forever"}].map((s,i) => (
              <div key={i} style={{ animationDelay: `${i*.1}s` }}>
                <div className="fd shimmer" style={{ fontSize: "clamp(.95rem,5vw,1.35rem)", fontWeight: 700 }}>{s.n}</div>
                <div style={{ fontSize: 9, color: "var(--muted)", marginTop: 3, letterSpacing: ".05em" }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ══════════════ FEATURES ══════════════ */}
        <section ref={r("features")} data-sid="features" className={`kb rv ${visible("features") ? "on" : ""}`}
          style={{ padding: "48px 20px" }}>
          <div style={{ maxWidth: 480, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <div className="orn" style={{ marginBottom: 10 }}>
                <span className="fd" style={{ fontSize: 10, letterSpacing: ".22em", color: "var(--gold)" }}>APP FEATURES</span>
              </div>
              <h2 className="fd" style={{ fontWeight: 700, fontSize: 22, color: "#fff", marginBottom: 6 }}>Everything You Need</h2>
              <p style={{ fontSize: 13, color: "var(--muted)" }}>Built exclusively for the Kattunayakan community.</p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {FEATURES.map((f, i) => (
                <div key={i} className={`card ${activeFeature === i ? "fca" : ""}`}
                  style={{ borderRadius: 18, padding: "18px 16px", animationDelay: `${i*.07}s` }}
                  onTouchStart={() => setActiveFeature(i)}
                  onTouchEnd={() => setTimeout(() => setActiveFeature(null), 500)}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                    <div style={{ flexShrink: 0, width: 48, height: 48, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, background: "rgba(245,158,11,.09)", border: "1px solid rgba(245,158,11,.18)" }}>{f.icon}</div>
                    <div>
                      <div className="fd" style={{ fontSize: 14, fontWeight: 600, color: activeFeature === i ? "var(--gold-l)" : "var(--text)", marginBottom: 4 }}>{f.title}</div>
                      <div style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.65 }}>{f.desc}</div>
                    </div>
                  </div>
                  {activeFeature === i && <div style={{ height: 1, marginTop: 14, background: "linear-gradient(90deg,transparent,var(--gold),transparent)" }} />}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════ CASTES ══════════════ */}
        <section ref={r("castes")} data-sid="castes" className={`rv ${visible("castes") ? "on" : ""}`}
          style={{ padding: "48px 20px" }}>
          <div style={{ maxWidth: 480, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 28 }}>
              <div className="orn" style={{ marginBottom: 10 }}>
                <span className="fd" style={{ fontSize: 10, letterSpacing: ".22em", color: "var(--gold)" }}>SUB-DIVISIONS</span>
              </div>
              <h2 className="fd" style={{ fontWeight: 700, fontSize: 22, color: "#fff", marginBottom: 4 }}>சமூகப் பிரிவுகள்</h2>
              <p style={{ fontSize: 12, color: "var(--muted)" }}>All registered community sub-divisions</p>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10 }}>
              {CASTES.map((c, i) => (
                <span key={i} className="chip ft" style={{ borderRadius: 999, padding: "9px 16px", fontSize: 13 }}>{c}</span>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════ VILLAGES ══════════════ */}
        <section ref={r("villages")} data-sid="villages" className={`kb rv ${visible("villages") ? "on" : ""}`}
          style={{ padding: "48px 20px" }}>
          <div style={{ maxWidth: 480, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 28 }}>
              <div className="orn" style={{ marginBottom: 10 }}>
                <span className="fd" style={{ fontSize: 10, letterSpacing: ".22em", color: "var(--gold)" }}>VILLAGES</span>
              </div>
              <h2 className="fd" style={{ fontWeight: 700, fontSize: 22, color: "#fff", marginBottom: 4 }}>கிராம பட்டியல்</h2>
              <p style={{ fontSize: 12, color: "var(--muted)" }}>Villages covered within the matrimony app</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {VILLAGES.map((v, i) => (
                <div key={i} className="card" style={{ borderRadius: 14, padding: "13px 10px", textAlign: "center" }}>
                  <div className="fd" style={{ fontSize: 10, color: "rgba(245,158,11,.3)", marginBottom: 4 }}>#{String(i+1).padStart(2,"0")}</div>
                  <div className="ft" style={{ fontSize: 13, fontWeight: 600, color: "#fde68a", lineHeight: 1.4 }}>{v}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════ HOW IT WORKS ══════════════ */}
        <section ref={r("steps")} data-sid="steps" className={`rv ${visible("steps") ? "on" : ""}`}
          style={{ padding: "48px 20px" }}>
          <div style={{ maxWidth: 420, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 36 }}>
              <div className="orn" style={{ marginBottom: 10 }}>
                <span className="fd" style={{ fontSize: 10, letterSpacing: ".22em", color: "var(--gold)" }}>HOW IT WORKS</span>
              </div>
              <h2 className="fd" style={{ fontWeight: 700, fontSize: 22, color: "#fff" }}>Simple. Secure. Sacred.</h2>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {STEPS.map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start", position: "relative", paddingBottom: i < STEPS.length - 1 ? 28 : 0 }}>
                  {i < STEPS.length - 1 && (
                    <div style={{ position: "absolute", left: 27, top: 56, width: 2, height: "calc(100% - 28px)", background: "linear-gradient(to bottom,rgba(245,158,11,.35),transparent)" }} />
                  )}
                  <div className="fd" style={{ flexShrink: 0, width: 54, height: 54, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 16, color: "var(--gold)", background: "linear-gradient(135deg,rgba(180,83,9,.28),rgba(245,158,11,.08))", border: "1px solid rgba(245,158,11,.28)" }}>{item.step}</div>
                  <div style={{ paddingTop: 10 }}>
                    <div className="fd" style={{ fontWeight: 600, fontSize: 14, color: "#fff", marginBottom: 4 }}>{item.title}</div>
                    <div style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.65 }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════ CTA ══════════════ */}
        <section ref={r("cta")} data-sid="cta" className={`rv ${visible("cta") ? "on" : ""}`}
          style={{ padding: "60px 20px 52px", textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 90% 80% at 50% 100%,rgba(180,83,9,.26) 0%,transparent 70%)", pointerEvents: "none" }} />
          {[260,180,110].map((s,i) => (
            <div key={i} style={{ position: "absolute", width: s, height: s, borderRadius: "50%", left: "50%", top: "50%", transform: "translate(-50%,-50%)", border: `1px solid rgba(245,158,11,${.06+i*.03})`, pointerEvents: "none" }} />
          ))}
          <div style={{ position: "relative", zIndex: 1, maxWidth: 360, margin: "0 auto" }}>
            <div style={{ fontSize: 52, lineHeight: 1, marginBottom: 16 }}>💍</div>
            <h2 className="fd shimmer" style={{ fontWeight: 700, fontSize: "clamp(1.4rem,8vw,1.9rem)", marginBottom: 12 }}>Begin Your Journey</h2>
            <p className="ft" style={{ fontSize: 15, color: "#fde68a", lineHeight: 1.7, marginBottom: 8 }}>
              உங்கள் வாழ்க்கை துணையை இன்றே கண்டெடுங்கள்
            </p>
            <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.7, marginBottom: 32 }}>
              Join hundreds of families who trust this app for sacred matrimony connections.
            </p>
            <button onClick={handleDownload} className="dlb glow" style={{ width: "100%", fontWeight: 700, borderRadius: 18, padding: "20px 24px", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 14 }}>
              {downloading
                ? <><span style={{ width: 22, height: 22, borderRadius: "50%", border: "2.5px solid #fff", borderTopColor: "transparent", animation: "spin .7s linear infinite", display: "inline-block" }} />Downloading…</>
                : <><span style={{ fontSize: "1.5rem" }}>📲</span>Download Free APK</>}
            </button>
            <p style={{ fontSize: 11, color: "rgba(245,158,11,.3)" }}>Android · No data sold · Community-governed</p>
          </div>
        </section>

        {/* ══════════════ FOOTER ══════════════ */}
        <footer className="pb-safe" style={{ borderTop: "1px solid rgba(245,158,11,.1)", padding: "28px 20px 80px" }}>
          <div style={{ maxWidth: 380, margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", gap: 16, textAlign: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(135deg,#92400e,#f59e0b)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15 }}>💍</div>
              <div>
                <div className="fd" style={{ fontSize: 12, fontWeight: 700, color: "var(--gold)" }}>Kattunayakan Matrimony</div>
                <div className="ft" style={{ fontSize: 11, color: "var(--muted)" }}>காட்டுநாயக்கன் மக்கள் சமுதாயம்</div>
              </div>
            </div>
            <p style={{ fontSize: 11, color: "rgba(245,158,11,.28)", lineHeight: 1.7 }}>
              All data is used solely for matrimony and community welfare purposes.<br />
              © 2025 Kattunayakan Community Matrimony App
            </p>
            <button onClick={handleDownload} className="dlb fd" style={{ fontWeight: 700, borderRadius: 999, padding: "12px 28px", fontSize: 13 }}>
              📲 Download APK
            </button>
          </div>
        </footer>

        {/* ══════════════ STICKY BOTTOM CTA (mobile) ══════════════ */}
        <div className={`sticky-cta ${scrollY > 220 ? "visible" : ""}`}
          style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 60, background: "rgba(11,7,0,.97)", borderTop: "1px solid rgba(245,158,11,.18)", backdropFilter: "blur(20px)", padding: "10px 16px", paddingBottom: "max(10px,env(safe-area-inset-bottom))" }}>
          <button onClick={handleDownload} className="dlb glow" style={{ width: "100%", fontWeight: 700, borderRadius: 14, padding: "15px 20px", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
            {downloading
              ? <><span style={{ width: 18, height: 18, borderRadius: "50%", border: "2px solid #fff", borderTopColor: "transparent", animation: "spin .7s linear infinite", display: "inline-block" }} />Preparing…</>
              : <>📲 Download Free APK</>}
          </button>
        </div>

      </div>
    </>
  );
}