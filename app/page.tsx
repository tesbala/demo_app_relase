import { useState, useEffect, useRef } from "react";

const GOLD = "#D4AF37";
const DEEP_GREEN = "#0a1f0e";
const MID_GREEN = "#122918";
const LIGHT_GOLD = "#F5D97A";
const PALE_GOLD = "#fff8e1";

/* ── tiny helpers ── */
const useInView = (threshold = 0.15) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
};

/* ── countdown ── */
const useCountdown = (target) => {
  const calc = () => {
    const diff = new Date(target) - new Date();
    if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0 };
    return {
      d: Math.floor(diff / 86400000),
      h: Math.floor((diff % 86400000) / 3600000),
      m: Math.floor((diff % 3600000) / 60000),
      s: Math.floor((diff % 60000) / 1000),
    };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const t = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(t);
  }, []);
  return time;
};

/* ── floating particles ── */
const Particles = () => {
  const particles = Array.from({ length: 28 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    dur: Math.random() * 12 + 8,
    del: Math.random() * 6,
  }));
  return (
    <div className="particles-layer">
      {particles.map((p) => (
        <span
          key={p.id}
          className="particle"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            animationDuration: `${p.dur}s`,
            animationDelay: `${p.del}s`,
          }}
        />
      ))}
    </div>
  );
};

/* ── section reveal wrapper ── */
const Reveal = ({ children, delay = 0, className = "" }) => {
  const [ref, vis] = useInView();
  return (
    <div
      ref={ref}
      className={`reveal ${vis ? "revealed" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

/* ── gold divider ── */
const GoldDivider = () => (
  <div className="gold-divider">
    <span />
    <span className="diamond">◆</span>
    <span />
  </div>
);

/* ── profile card ── */
const ProfileCard = ({ name, age, place, profession, faith, img, verified, delay }) => {
  const [ref, vis] = useInView();
  return (
    <div
      ref={ref}
      className={`profile-card ${vis ? "card-in" : ""}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="card-glow" />
      <div className="card-top">
        <div className="avatar-wrap">
          <div className="avatar-ring" />
          <div className="avatar" style={{ background: img }}>
            {name[0]}
          </div>
          {verified && <span className="verified">✓</span>}
        </div>
        <div className="card-badge">DEMO</div>
      </div>
      <h3 className="card-name">{name}</h3>
      <p className="card-meta">{age} yrs · {profession}</p>
      <p className="card-meta">{place}</p>
      <p className="card-faith">{faith}</p>
      <div className="card-divider" />
      <button className="wa-btn">
        <span>💬</span> WhatsApp Connect
      </button>
      <button className="view-btn">View Profile →</button>
    </div>
  );
};

/* ── feature card ── */
const FeatureCard = ({ icon, title, desc, delay }) => {
  const [ref, vis] = useInView();
  return (
    <div
      ref={ref}
      className={`feature-card ${vis ? "card-in" : ""}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="feature-icon">{icon}</div>
      <h4 className="feature-title">{title}</h4>
      <p className="feature-desc">{desc}</p>
    </div>
  );
};

/* ── testimonial ── */
const TestiCard = ({ name, text, stars, delay }) => {
  const [ref, vis] = useInView();
  return (
    <div
      ref={ref}
      className={`testi-card ${vis ? "card-in" : ""}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="stars">{"★".repeat(stars)}</div>
      <p className="testi-text">"{text}"</p>
      <p className="testi-name">— {name}</p>
    </div>
  );
};

/* ══════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════ */
export default function App() {
  const countdown = useCountdown("2025-06-29T00:00:00");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const profiles = [
    {
      name: "Kavitha R.",
      age: 24,
      place: "Madurai",
      profession: "Teacher",
      faith: "Kattunayakan · Hindu",
      img: "linear-gradient(135deg,#a8936a,#5c3d1e)",
      verified: true,
    },
    {
      name: "Murugan S.",
      age: 27,
      place: "Coimbatore",
      profession: "Engineer",
      faith: "Kattunayakan · Hindu",
      img: "linear-gradient(135deg,#5c3d1e,#2d6a4f)",
      verified: true,
    },
    {
      name: "Selvi P.",
      age: 23,
      place: "Salem",
      profession: "Nurse",
      faith: "Kattunayakan · Hindu",
      img: "linear-gradient(135deg,#c9956c,#8B4513)",
      verified: false,
    },
  ];

  const features = [
    { icon: "🌿", title: "Community Match", desc: "Exclusively for Kattunayakan families — curated profiles from trusted villages." },
    { icon: "🛡️", title: "Verified Profiles", desc: "Every profile is manually verified for authenticity and community trust." },
    { icon: "📍", title: "Village Connect", desc: "Filter by village, taluk, and district to find the perfect match nearby." },
    { icon: "💬", title: "WhatsApp Direct", desc: "Connect instantly via WhatsApp — no middlemen, just family conversations." },
    { icon: "🌐", title: "Tamil & English", desc: "Full bilingual support — your language, your comfort, your culture." },
    { icon: "🔒", title: "Privacy First", desc: "Your data is yours. Control who sees your profile at every step." },
  ];

  const testimonials = [
    { name: "Ravi & Meena, Dharmapuri", text: "We found our soulmate through this platform. Our families are so happy!", stars: 5 },
    { name: "Anbu, Namakkal", text: "Best app for Kattunayakan community. Simple, honest and really works.", stars: 5 },
    { name: "Lakshmi, Tirupur", text: "As a girl's family we felt safe and respected. Highly recommend!", stars: 5 },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;900&family=Cinzel:wght@400;600;700&family=Lato:wght@300;400;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --gold: #D4AF37;
          --light-gold: #F5D97A;
          --pale-gold: #fff8e1;
          --green-deep: #071510;
          --green-mid: #0d2218;
          --green-bright: #1a4230;
          --green-accent: #2d6a4f;
          --text: #f0e8d0;
          --text-dim: #9aab94;
        }

        html { scroll-behavior: smooth; }

        body {
          font-family: 'Lato', sans-serif;
          background: var(--green-deep);
          color: var(--text);
          overflow-x: hidden;
        }

        /* ─── scrollbar ─── */
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: var(--green-deep); }
        ::-webkit-scrollbar-thumb { background: var(--gold); border-radius: 2px; }

        /* ─── particles ─── */
        .particles-layer {
          position: absolute; inset: 0; pointer-events: none; overflow: hidden; z-index: 1;
        }
        .particle {
          position: absolute;
          background: var(--gold);
          border-radius: 50%;
          opacity: 0;
          animation: floatUp linear infinite;
        }
        @keyframes floatUp {
          0%   { transform: translateY(0) scale(1); opacity: 0; }
          20%  { opacity: .55; }
          80%  { opacity: .35; }
          100% { transform: translateY(-120vh) scale(.4); opacity: 0; }
        }

        /* ─── navbar ─── */
        .navbar {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          padding: 14px 20px;
          display: flex; align-items: center; justify-content: space-between;
          transition: background .4s, box-shadow .4s;
        }
        .navbar.scrolled {
          background: rgba(7,21,16,.92);
          backdrop-filter: blur(20px);
          box-shadow: 0 2px 30px rgba(212,175,55,.15);
          border-bottom: 1px solid rgba(212,175,55,.18);
        }
        .nav-logo {
          font-family: 'Cinzel', serif;
          color: var(--gold);
          font-size: 15px;
          font-weight: 700;
          letter-spacing: 1px;
          line-height: 1.2;
        }
        .nav-logo small { display: block; font-size: 9px; color: var(--text-dim); letter-spacing: 2px; font-family: 'Lato', sans-serif; }
        .nav-demo-badge {
          background: linear-gradient(90deg, var(--gold), #b8860b);
          color: #000;
          font-size: 9px;
          font-weight: 800;
          padding: 3px 10px;
          border-radius: 20px;
          letter-spacing: 1.5px;
          animation: pulse-badge 2s infinite;
        }
        @keyframes pulse-badge {
          0%,100% { box-shadow: 0 0 0 0 rgba(212,175,55,.6); }
          50%      { box-shadow: 0 0 0 8px rgba(212,175,55,0); }
        }

        /* ─── hero ─── */
        .hero {
          min-height: 100svh;
          position: relative;
          display: flex; flex-direction: column; align-items: center;
          justify-content: center;
          padding: 100px 20px 60px;
          overflow: hidden;
          text-align: center;
        }
        .hero-bg {
          position: absolute; inset: 0;
          background:
            radial-gradient(ellipse at 50% 0%, rgba(45,106,79,.55) 0%, transparent 60%),
            radial-gradient(ellipse at 80% 80%, rgba(212,175,55,.12) 0%, transparent 50%),
            linear-gradient(180deg, #071510 0%, #0a1e12 60%, #071510 100%);
        }
        .hero-bg::before {
          content: '';
          position: absolute; inset: 0;
          background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }

        .hero-badge {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(212,175,55,.12);
          border: 1px solid rgba(212,175,55,.45);
          border-radius: 50px;
          padding: 6px 16px;
          font-size: 11px;
          letter-spacing: 2px;
          color: var(--light-gold);
          margin-bottom: 22px;
          animation: glow-badge 3s ease-in-out infinite;
          position: relative; z-index: 2;
        }
        .badge-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: #00ff88;
          animation: blink 1.2s ease-in-out infinite;
        }
        @keyframes blink { 0%,100% { opacity:1; } 50% { opacity:.2; } }
        @keyframes glow-badge {
          0%,100% { box-shadow: 0 0 10px rgba(212,175,55,.3); }
          50%      { box-shadow: 0 0 25px rgba(212,175,55,.6); }
        }

        .hero-title {
          font-family: 'Cinzel', serif;
          font-size: clamp(26px, 7vw, 52px);
          font-weight: 700;
          line-height: 1.15;
          background: linear-gradient(135deg, var(--light-gold) 0%, var(--gold) 40%, #a0742a 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 10px;
          position: relative; z-index: 2;
          animation: heroEntry .9s cubic-bezier(.2,1,.3,1) both;
        }
        .hero-tamil {
          font-size: clamp(13px, 3.5vw, 20px);
          color: rgba(245,217,122,.65);
          font-family: 'Lato', sans-serif;
          margin-bottom: 14px;
          position: relative; z-index: 2;
          animation: heroEntry 1s .15s cubic-bezier(.2,1,.3,1) both;
        }
        .hero-sub {
          font-size: clamp(14px, 3.5vw, 18px);
          color: var(--text-dim);
          max-width: 360px;
          margin: 0 auto 30px;
          line-height: 1.6;
          position: relative; z-index: 2;
          animation: heroEntry 1s .25s cubic-bezier(.2,1,.3,1) both;
        }
        @keyframes heroEntry {
          from { opacity:0; transform: translateY(30px); }
          to   { opacity:1; transform: translateY(0); }
        }

        /* phone mockup */
        .phone-wrap {
          position: relative; z-index: 2;
          margin: 0 auto 32px;
          animation: float 4s ease-in-out infinite, heroEntry 1.1s .1s both;
          width: 200px;
        }
        @keyframes float {
          0%,100% { transform: translateY(0px) rotate(-1deg); }
          50%      { transform: translateY(-14px) rotate(1deg); }
        }
        .phone-frame {
          width: 200px; height: 370px;
          border-radius: 36px;
          border: 3px solid rgba(212,175,55,.65);
          background: linear-gradient(160deg, #122918 0%, #071510 100%);
          box-shadow:
            0 0 0 1px rgba(212,175,55,.15),
            0 25px 60px rgba(0,0,0,.7),
            0 0 40px rgba(212,175,55,.25),
            inset 0 1px 0 rgba(212,175,55,.3);
          overflow: hidden;
          position: relative;
          display: flex; flex-direction: column; align-items: center;
          padding: 14px 10px 10px;
        }
        .phone-notch {
          width: 70px; height: 10px; border-radius: 6px;
          background: rgba(212,175,55,.2);
          margin-bottom: 10px;
        }
        .phone-screen-title {
          font-family: 'Cinzel', serif;
          font-size: 9px;
          color: var(--gold);
          letter-spacing: 1px;
          margin-bottom: 8px;
        }
        .phone-avatar-row {
          display: flex; gap: 8px; margin-bottom: 10px;
        }
        .mini-card {
          width: 75px; border-radius: 14px;
          background: rgba(212,175,55,.08);
          border: 1px solid rgba(212,175,55,.25);
          padding: 8px 6px;
          text-align: center;
        }
        .mini-avatar {
          width: 36px; height: 36px; border-radius: 50%;
          margin: 0 auto 4px;
          border: 2px solid var(--gold);
          display: flex; align-items: center; justify-content: center;
          font-size: 16px;
        }
        .mini-name { font-size: 7px; color: var(--light-gold); }
        .mini-loc  { font-size: 6px; color: var(--text-dim); }
        .phone-match-btn {
          width: 100%;
          background: linear-gradient(90deg, var(--gold), #b8860b);
          color: #000;
          border: none;
          border-radius: 10px;
          padding: 7px;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: .8px;
          margin-top: 6px;
          cursor: pointer;
        }
        .phone-stats {
          display: flex; justify-content: space-around; width: 100%;
          margin-top: 10px; padding-top: 8px;
          border-top: 1px solid rgba(212,175,55,.15);
        }
        .pstat { text-align: center; }
        .pstat-n { font-size: 11px; color: var(--gold); font-weight: 700; }
        .pstat-l { font-size: 6px; color: var(--text-dim); }

        /* hero buttons */
        .hero-btns {
          display: flex; flex-direction: column; gap: 12px;
          align-items: center;
          position: relative; z-index: 2;
          animation: heroEntry 1s .4s both;
          margin-bottom: 28px;
        }
        .btn-primary {
          display: flex; align-items: center; gap: 10px;
          background: linear-gradient(135deg, var(--gold) 0%, #b8860b 100%);
          color: #0a1f0e;
          font-family: 'Cinzel', serif;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 1px;
          padding: 14px 32px;
          border-radius: 50px;
          border: none;
          cursor: pointer;
          box-shadow: 0 8px 30px rgba(212,175,55,.4);
          transition: transform .2s, box-shadow .2s;
          width: 260px; justify-content: center;
        }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 14px 40px rgba(212,175,55,.55); }
        .btn-secondary {
          display: flex; align-items: center; gap: 10px;
          background: transparent;
          color: var(--light-gold);
          font-family: 'Cinzel', serif;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 1px;
          padding: 13px 32px;
          border-radius: 50px;
          border: 1.5px solid rgba(212,175,55,.5);
          cursor: pointer;
          transition: all .2s;
          width: 260px; justify-content: center;
        }
        .btn-secondary:hover {
          background: rgba(212,175,55,.1);
          border-color: var(--gold);
          box-shadow: 0 0 20px rgba(212,175,55,.2);
        }

        /* launch strip */
        .launch-strip {
          position: relative; z-index: 2;
          display: flex; gap: 16px; flex-wrap: wrap; justify-content: center;
          animation: heroEntry 1s .5s both;
        }
        .strip-pill {
          background: rgba(212,175,55,.08);
          border: 1px solid rgba(212,175,55,.25);
          border-radius: 20px;
          padding: 5px 14px;
          font-size: 11px;
          color: var(--text-dim);
        }
        .strip-pill span { color: var(--light-gold); font-weight: 700; }

        /* ─── section base ─── */
        section { padding: 72px 20px; position: relative; }
        .section-label {
          font-size: 10px;
          letter-spacing: 3px;
          color: var(--gold);
          text-transform: uppercase;
          text-align: center;
          margin-bottom: 10px;
        }
        .section-title {
          font-family: 'Cinzel', serif;
          font-size: clamp(22px, 6vw, 36px);
          font-weight: 700;
          text-align: center;
          background: linear-gradient(135deg, var(--light-gold), var(--gold));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 8px;
        }
        .section-sub {
          text-align: center;
          color: var(--text-dim);
          font-size: 14px;
          max-width: 340px;
          margin: 0 auto 42px;
          line-height: 1.6;
        }

        /* ─── reveal animation ─── */
        .reveal { opacity:0; transform: translateY(36px); transition: opacity .7s ease, transform .7s ease; }
        .revealed { opacity:1; transform: translateY(0); }

        /* ─── APK section ─── */
        .apk-section { background: linear-gradient(180deg, var(--green-deep) 0%, var(--green-mid) 100%); }
        .apk-card {
          max-width: 400px; margin: 0 auto;
          background: rgba(212,175,55,.06);
          border: 1.5px solid rgba(212,175,55,.35);
          border-radius: 28px;
          padding: 36px 28px;
          text-align: center;
          position: relative;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0,0,0,.5), 0 0 40px rgba(212,175,55,.1);
        }
        .apk-card::before {
          content:'';
          position:absolute; inset:0;
          background: radial-gradient(ellipse at 50% 0%, rgba(212,175,55,.1), transparent 70%);
          pointer-events:none;
        }
        .apk-icon {
          width: 80px; height: 80px; margin: 0 auto 20px;
          background: linear-gradient(135deg, var(--gold), #b8860b);
          border-radius: 24px;
          display: flex; align-items: center; justify-content: center;
          font-size: 38px;
          box-shadow: 0 8px 30px rgba(212,175,55,.4);
        }
        .apk-title {
          font-family: 'Cinzel', serif;
          font-size: 20px; color: var(--light-gold);
          margin-bottom: 6px;
        }
        .apk-version { font-size: 12px; color: var(--text-dim); margin-bottom: 20px; }
        .apk-tags {
          display: flex; flex-wrap: wrap; gap: 8px;
          justify-content: center; margin-bottom: 28px;
        }
        .apk-tag {
          background: rgba(212,175,55,.1);
          border: 1px solid rgba(212,175,55,.3);
          border-radius: 20px;
          padding: 4px 12px;
          font-size: 11px;
          color: var(--light-gold);
        }
        .apk-download-btn {
          width: 100%;
          background: linear-gradient(135deg, var(--gold), #b8860b);
          color: #071510;
          font-family: 'Cinzel', serif;
          font-size: 15px;
          font-weight: 700;
          padding: 16px;
          border-radius: 16px;
          border: none;
          cursor: pointer;
          box-shadow: 0 8px 30px rgba(212,175,55,.4);
          letter-spacing: .5px;
          transition: transform .2s, box-shadow .2s;
        }
        .apk-download-btn:hover { transform: scale(1.02); box-shadow: 0 12px 40px rgba(212,175,55,.55); }
        .apk-secure { margin-top: 14px; font-size: 11px; color: var(--text-dim); }

        /* ─── features ─── */
        .features-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
          max-width: 480px;
          margin: 0 auto;
        }
        .feature-card {
          background: rgba(212,175,55,.05);
          border: 1px solid rgba(212,175,55,.2);
          border-radius: 20px;
          padding: 22px 16px;
          text-align: center;
          transition: transform .3s, box-shadow .3s, border-color .3s;
          opacity: 0; transform: translateY(30px);
        }
        .feature-card.card-in { opacity:1; transform: translateY(0); transition: opacity .6s ease, transform .6s ease, box-shadow .3s; }
        .feature-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 16px 40px rgba(0,0,0,.4), 0 0 20px rgba(212,175,55,.15);
          border-color: rgba(212,175,55,.5);
        }
        .feature-icon { font-size: 28px; margin-bottom: 10px; }
        .feature-title { font-family: 'Cinzel', serif; font-size: 13px; color: var(--light-gold); margin-bottom: 6px; }
        .feature-desc { font-size: 11px; color: var(--text-dim); line-height: 1.55; }

        /* ─── village map ─── */
        .map-section { background: var(--green-mid); }
        .village-grid {
          display: grid; grid-template-columns: repeat(2,1fr);
          gap: 10px; max-width: 420px; margin: 0 auto;
        }
        .village-pill {
          background: rgba(212,175,55,.07);
          border: 1px solid rgba(212,175,55,.22);
          border-radius: 14px;
          padding: 14px;
          display: flex; align-items: center; gap: 10px;
          transition: all .25s;
        }
        .village-pill:hover { background: rgba(212,175,55,.14); border-color: rgba(212,175,55,.5); }
        .village-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--gold); flex-shrink: 0; }
        .village-name { font-size: 13px; color: var(--text); font-weight: 600; }
        .village-count { font-size: 10px; color: var(--text-dim); }

        /* ─── profiles ─── */
        .profiles-scroll {
          display: flex; gap: 16px;
          overflow-x: auto;
          padding: 4px 0 16px;
          -ms-overflow-style: none; scrollbar-width: none;
        }
        .profiles-scroll::-webkit-scrollbar { display: none; }
        .profile-card {
          min-width: 220px; max-width: 220px;
          background: rgba(212,175,55,.06);
          border: 1.5px solid rgba(212,175,55,.25);
          border-radius: 28px;
          padding: 24px 18px;
          position: relative;
          overflow: hidden;
          flex-shrink: 0;
          opacity: 0; transform: translateY(30px);
          transition: opacity .6s ease, transform .6s ease;
        }
        .profile-card.card-in { opacity:1; transform: translateY(0); }
        .profile-card:hover { border-color: rgba(212,175,55,.55); box-shadow: 0 12px 40px rgba(0,0,0,.4), 0 0 20px rgba(212,175,55,.12); }
        .card-glow {
          position:absolute; top:-40px; left:50%; transform: translateX(-50%);
          width:120px; height:120px; border-radius:50%;
          background: radial-gradient(circle, rgba(212,175,55,.18), transparent 70%);
          pointer-events:none;
        }
        .card-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 14px; }
        .avatar-wrap { position: relative; }
        .avatar-ring {
          position:absolute; inset:-3px;
          border-radius: 50%;
          background: conic-gradient(var(--gold), transparent 40%, var(--gold));
          animation: spin 6s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .avatar {
          width: 58px; height: 58px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 22px; font-weight: 700; color: var(--pale-gold);
          font-family: 'Cinzel', serif;
          position: relative; z-index: 1;
        }
        .verified {
          position:absolute; bottom:-2px; right:-2px;
          width:18px; height:18px; border-radius:50%;
          background: var(--gold);
          color: #000; font-size: 9px;
          display:flex; align-items:center; justify-content:center;
          font-weight:900; z-index:2;
        }
        .card-badge {
          background: rgba(212,175,55,.15);
          border: 1px solid rgba(212,175,55,.4);
          border-radius: 8px;
          padding: 3px 8px;
          font-size: 9px; color: var(--gold);
          letter-spacing: 1px;
        }
        .card-name { font-family: 'Cinzel', serif; font-size: 15px; color: var(--light-gold); margin-bottom: 4px; }
        .card-meta { font-size: 11px; color: var(--text-dim); margin-bottom: 2px; }
        .card-faith { font-size: 11px; color: rgba(212,175,55,.7); margin-top: 4px; }
        .card-divider { height:1px; background: rgba(212,175,55,.15); margin: 14px 0; }
        .wa-btn {
          width: 100%; display: flex; align-items: center; justify-content: center; gap: 6px;
          background: #25D366;
          color: #fff;
          font-size: 12px; font-weight: 700;
          border: none; border-radius: 12px;
          padding: 10px;
          cursor: pointer;
          margin-bottom: 8px;
          transition: opacity .2s;
        }
        .wa-btn:hover { opacity: .85; }
        .view-btn {
          width: 100%;
          background: transparent;
          color: var(--gold);
          font-size: 12px;
          border: 1px solid rgba(212,175,55,.35);
          border-radius: 12px;
          padding: 9px;
          cursor: pointer;
          transition: all .2s;
        }
        .view-btn:hover { background: rgba(212,175,55,.1); }

        /* ─── trust ─── */
        .trust-section { background: var(--green-deep); }
        .stats-grid {
          display: grid; grid-template-columns: repeat(2,1fr);
          gap: 14px; max-width: 400px; margin: 0 auto 42px;
        }
        .stat-box {
          background: rgba(212,175,55,.06);
          border: 1px solid rgba(212,175,55,.22);
          border-radius: 20px;
          padding: 22px 14px;
          text-align: center;
        }
        .stat-number { font-family: 'Cinzel', serif; font-size: 28px; color: var(--gold); font-weight: 700; }
        .stat-label { font-size: 11px; color: var(--text-dim); margin-top: 4px; }

        /* ─── lang section ─── */
        .lang-section { background: var(--green-mid); }
        .lang-cards {
          display: flex; gap: 14px; justify-content: center; flex-wrap: wrap;
        }
        .lang-card {
          background: rgba(212,175,55,.07);
          border: 1px solid rgba(212,175,55,.25);
          border-radius: 22px;
          padding: 28px 24px;
          text-align: center;
          min-width: 140px;
        }
        .lang-flag { font-size: 36px; margin-bottom: 10px; }
        .lang-name { font-family: 'Cinzel', serif; font-size: 14px; color: var(--light-gold); margin-bottom: 4px; }
        .lang-desc { font-size: 11px; color: var(--text-dim); }

        /* ─── WhatsApp ─── */
        .wa-section {
          background: linear-gradient(135deg, #071510, #0d2218);
          text-align: center;
        }
        .wa-big-btn {
          display: inline-flex; align-items: center; gap: 12px;
          background: #25D366;
          color: #fff;
          font-family: 'Cinzel', serif;
          font-size: 15px;
          font-weight: 700;
          padding: 18px 36px;
          border-radius: 50px;
          border: none;
          cursor: pointer;
          box-shadow: 0 8px 30px rgba(37,211,102,.4);
          transition: transform .2s, box-shadow .2s;
          margin-top: 28px;
          letter-spacing: .5px;
        }
        .wa-big-btn:hover { transform: translateY(-3px); box-shadow: 0 14px 40px rgba(37,211,102,.55); }
        .wa-sub { font-size: 12px; color: var(--text-dim); margin-top: 14px; }

        /* ─── testimonials ─── */
        .testi-scroll {
          display: flex; gap: 16px;
          overflow-x: auto;
          padding: 4px 0 16px;
          -ms-overflow-style: none; scrollbar-width: none;
        }
        .testi-scroll::-webkit-scrollbar { display: none; }
        .testi-card {
          min-width: 270px; max-width: 270px;
          background: rgba(212,175,55,.05);
          border: 1px solid rgba(212,175,55,.22);
          border-radius: 22px;
          padding: 24px 20px;
          flex-shrink: 0;
          opacity: 0; transform: translateY(30px);
          transition: opacity .6s ease, transform .6s ease;
        }
        .testi-card.card-in { opacity:1; transform: translateY(0); }
        .stars { font-size: 16px; color: var(--gold); margin-bottom: 10px; }
        .testi-text { font-size: 13px; color: var(--text); line-height: 1.65; margin-bottom: 14px; font-style: italic; }
        .testi-name { font-size: 11px; color: var(--text-dim); font-weight: 700; }

        /* ─── countdown ─── */
        .countdown-section {
          background: linear-gradient(135deg, var(--green-deep), var(--green-mid));
          text-align: center;
        }
        .countdown-grid {
          display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;
          margin: 36px 0;
        }
        .time-box {
          background: rgba(212,175,55,.08);
          border: 1.5px solid rgba(212,175,55,.35);
          border-radius: 20px;
          padding: 20px 16px;
          min-width: 75px;
          position: relative;
          overflow: hidden;
        }
        .time-box::before {
          content:'';
          position:absolute; top:0; left:0; right:0; height:2px;
          background: linear-gradient(90deg, transparent, var(--gold), transparent);
          animation: scan 3s ease-in-out infinite;
        }
        @keyframes scan {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .time-number {
          font-family: 'Cinzel', serif;
          font-size: 36px;
          color: var(--gold);
          font-weight: 700;
          display: block;
          line-height: 1;
        }
        .time-label { font-size: 10px; color: var(--text-dim); letter-spacing: 2px; margin-top: 4px; }
        .launch-date-badge {
          display: inline-flex; align-items: center; gap: 8px;
          background: linear-gradient(90deg, rgba(212,175,55,.15), rgba(212,175,55,.05));
          border: 1px solid rgba(212,175,55,.4);
          border-radius: 50px;
          padding: 10px 24px;
          font-family: 'Cinzel', serif;
          font-size: 14px;
          color: var(--light-gold);
          margin-bottom: 32px;
        }

        /* ─── gold divider ─── */
        .gold-divider {
          display: flex; align-items: center; gap: 12px;
          max-width: 300px; margin: 0 auto 40px;
        }
        .gold-divider span:first-child,
        .gold-divider span:last-child {
          flex: 1; height: 1px; background: linear-gradient(90deg, transparent, var(--gold), transparent);
        }
        .gold-divider .diamond { color: var(--gold); font-size: 10px; }

        /* ─── footer ─── */
        .footer {
          background: #040e08;
          padding: 40px 20px;
          text-align: center;
          border-top: 1px solid rgba(212,175,55,.15);
        }
        .footer-logo {
          font-family: 'Cinzel', serif;
          font-size: 18px;
          color: var(--gold);
          margin-bottom: 6px;
        }
        .footer-tagline { font-size: 12px; color: var(--text-dim); margin-bottom: 22px; }
        .footer-links { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; margin-bottom: 22px; }
        .footer-link { font-size: 12px; color: var(--text-dim); cursor: pointer; text-decoration: none; }
        .footer-link:hover { color: var(--gold); }
        .footer-copy { font-size: 10px; color: rgba(154,171,148,.4); }
        .footer-demo-note {
          display: inline-block;
          background: rgba(212,175,55,.08);
          border: 1px solid rgba(212,175,55,.2);
          border-radius: 12px;
          padding: 6px 16px;
          font-size: 10px; color: var(--text-dim);
          margin-bottom: 16px;
          letter-spacing: 1px;
        }

        /* ─── scroll hint ─── */
        .scroll-hint {
          position: relative; z-index: 2;
          display: flex; flex-direction: column; align-items: center;
          gap: 6px; margin-top: 20px;
          animation: heroEntry 1s .8s both;
          opacity: .5;
        }
        .scroll-line {
          width: 1px; height: 40px;
          background: linear-gradient(180deg, var(--gold), transparent);
          animation: scrollLine 2s ease-in-out infinite;
        }
        @keyframes scrollLine {
          0%,100% { scaleY: .5; opacity: .4; }
          50%      { scaleY: 1; opacity: 1; }
        }
        .scroll-text { font-size: 9px; letter-spacing: 3px; color: var(--text-dim); }
      `}</style>

      {/* ── NAVBAR ── */}
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-logo">
          Kattunayakan<br />
          <small>MATRIMONY</small>
        </div>
        <div className="nav-demo-badge">FREE DEMO</div>
      </nav>

      {/* ══ HERO ══ */}
      <section className="hero">
        <div className="hero-bg" />
        <Particles />

        <div className="hero-badge">
          <span className="badge-dot" />
          FREE DEMO AVAILABLE · LAUNCHING JUNE 29
        </div>

        {/* phone mockup */}
        <div className="phone-wrap">
          <div className="phone-frame">
            <div className="phone-notch" />
            <p className="phone-screen-title">KATTUNAYAKAN MATRIMONY</p>
            <div className="phone-avatar-row">
              <div className="mini-card">
                <div className="mini-avatar">👩</div>
                <div className="mini-name">Kavitha</div>
                <div className="mini-loc">Madurai</div>
              </div>
              <div className="mini-card">
                <div className="mini-avatar">👨</div>
                <div className="mini-name">Murugan</div>
                <div className="mini-loc">Coimbatore</div>
              </div>
            </div>
            <button className="phone-match-btn">✨ FIND YOUR MATCH</button>
            <div className="phone-stats">
              <div className="pstat"><div className="pstat-n">2.4K</div><div className="pstat-l">Profiles</div></div>
              <div className="pstat"><div className="pstat-n">180+</div><div className="pstat-l">Villages</div></div>
              <div className="pstat"><div className="pstat-n">96%</div><div className="pstat-l">Verified</div></div>
            </div>
          </div>
        </div>

        <h1 className="hero-title">Kattunayakan<br />Matrimony</h1>
        <p className="hero-tamil">கட்டுநாயக்கன் மேட்ரிமோனி</p>
        <p className="hero-sub">Trusted Community Matrimony Platform for Kattunayakan families across Tamil Nadu</p>

        <div className="hero-btns">
          <button className="btn-primary">
            <span>📲</span> Download APK — Free
          </button>
          <button className="btn-secondary">
            <span>▶</span> Try Demo App
          </button>
        </div>

        <div className="launch-strip">
          <div className="strip-pill">🗓 Launches <span>June 29</span></div>
          <div className="strip-pill">📦 <span>APK Ready</span></div>
          <div className="strip-pill">🆓 <span>Free Trial</span></div>
        </div>

        <div className="scroll-hint">
          <div className="scroll-line" />
          <span className="scroll-text">SCROLL</span>
        </div>
      </section>

      {/* ══ APK DOWNLOAD ══ */}
      <section className="apk-section">
        <Reveal>
          <p className="section-label">Available Now</p>
          <h2 className="section-title">Download the App</h2>
          <p className="section-sub">Get early access with our free demo APK and experience premium matrimony.</p>
        </Reveal>
        <Reveal delay={150}>
          <div className="apk-card">
            <div className="apk-icon">🤖</div>
            <h3 className="apk-title">Android APK</h3>
            <p className="apk-version">Demo v1.0 · Free Trial · 18 MB</p>
            <div className="apk-tags">
              <span className="apk-tag">✅ Free Trial</span>
              <span className="apk-tag">🔒 Safe & Secure</span>
              <span className="apk-tag">🎯 Demo Access</span>
              <span className="apk-tag">⚡ Instant Install</span>
            </div>
            <button className="apk-download-btn">📲 Tap to Download APK</button>
            <p className="apk-secure">🛡 Virus-free · No personal data required for demo</p>
          </div>
        </Reveal>
      </section>

      {/* ══ FEATURES ══ */}
      <section style={{ background: "var(--green-deep)", padding: "72px 20px" }}>
        <Reveal>
          <p className="section-label">Why Choose Us</p>
          <h2 className="section-title">Premium Features</h2>
          <p className="section-sub">Built exclusively for the Kattunayakan community with love and respect.</p>
        </Reveal>
        <div className="features-grid">
          {features.map((f, i) => (
            <FeatureCard key={i} {...f} delay={i * 80} />
          ))}
        </div>
      </section>

      <GoldDivider />

      {/* ══ VILLAGE MAP ══ */}
      <section className="map-section">
        <Reveal>
          <p className="section-label">Community Reach</p>
          <h2 className="section-title">Village Connection</h2>
          <p className="section-sub">Connecting families from 180+ villages across Tamil Nadu.</p>
        </Reveal>
        <Reveal delay={100}>
          <div className="village-grid">
            {[
              ["Madurai", "342 profiles"],
              ["Dharmapuri", "218 profiles"],
              ["Salem", "189 profiles"],
              ["Namakkal", "156 profiles"],
              ["Tirupur", "134 profiles"],
              ["Coimbatore", "127 profiles"],
              ["Krishnagiri", "98 profiles"],
              ["Villupuram", "76 profiles"],
            ].map(([name, count], i) => (
              <div key={i} className="village-pill">
                <div className="village-dot" />
                <div>
                  <div className="village-name">{name}</div>
                  <div className="village-count">{count}</div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ══ PROFILES ══ */}
      <section style={{ background: "var(--green-deep)", padding: "72px 0 72px 20px" }}>
        <Reveal>
          <p className="section-label">Sample Profiles</p>
          <h2 className="section-title">Meet the Community</h2>
          <p className="section-sub" style={{ paddingRight: 20 }}>Demo profiles from our verified community members.</p>
        </Reveal>
        <div className="profiles-scroll" style={{ paddingRight: 20 }}>
          {profiles.map((p, i) => (
            <ProfileCard key={i} {...p} delay={i * 100} />
          ))}
          {/* extra CTA card */}
          <div style={{
            minWidth: 220, maxWidth: 220,
            background: "rgba(212,175,55,.04)",
            border: "1.5px dashed rgba(212,175,55,.3)",
            borderRadius: 28,
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            padding: "24px 18px", flexShrink: 0, textAlign: "center",
          }}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>✨</div>
            <p style={{ color: "var(--light-gold)", fontFamily: "'Cinzel',serif", fontSize: 13, marginBottom: 8 }}>200+ More Profiles</p>
            <p style={{ color: "var(--text-dim)", fontSize: 11, marginBottom: 16 }}>Download the app to see all community profiles</p>
            <button className="btn-primary" style={{ width: "100%", fontSize: 11, padding: "10px 16px" }}>Download APK</button>
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* ══ TRUST STATS ══ */}
      <section className="trust-section">
        <Reveal>
          <p className="section-label">Community Trust</p>
          <h2 className="section-title">Built on Trust</h2>
          <p className="section-sub">Thousands of families already trust Kattunayakan Matrimony.</p>
        </Reveal>
        <Reveal delay={100}>
          <div className="stats-grid">
            {[
              ["2,400+", "Registered Profiles"],
              ["180+", "Villages Connected"],
              ["96%", "Verified Profiles"],
              ["320+", "Happy Marriages"],
            ].map(([num, label], i) => (
              <div key={i} className="stat-box">
                <div className="stat-number">{num}</div>
                <div className="stat-label">{label}</div>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={200}>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", maxWidth: 420, margin: "0 auto" }}>
            {["Community Verified", "Privacy Protected", "100% Free Demo", "Family Approved"].map((t, i) => (
              <div key={i} style={{
                background: "rgba(212,175,55,.08)",
                border: "1px solid rgba(212,175,55,.2)",
                borderRadius: 50, padding: "6px 16px",
                fontSize: 11, color: "var(--text-dim)"
              }}>✓ {t}</div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ══ LANGUAGE ══ */}
      <section className="lang-section">
        <Reveal>
          <p className="section-label">Bilingual Support</p>
          <h2 className="section-title">Tamil & English</h2>
          <p className="section-sub">Experience the app in your preferred language.</p>
        </Reveal>
        <Reveal delay={100}>
          <div className="lang-cards">
            <div className="lang-card">
              <div className="lang-flag">🇮🇳</div>
              <div className="lang-name">தமிழ்</div>
              <div className="lang-desc">Full Tamil<br />language support</div>
            </div>
            <div className="lang-card">
              <div className="lang-flag">🌐</div>
              <div className="lang-name">English</div>
              <div className="lang-desc">Complete English<br />interface</div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ══ WHATSAPP ══ */}
      <section className="wa-section">
        <Reveal>
          <p className="section-label">Instant Connect</p>
          <h2 className="section-title">WhatsApp Support</h2>
          <p className="section-sub">Reach us directly on WhatsApp for help, demo access, or to register your family.</p>
          <button className="wa-big-btn">
            <span style={{ fontSize: 20 }}>💬</span>
            Chat on WhatsApp
          </button>
          <p className="wa-sub">Response within 30 minutes · Available 8AM–10PM IST</p>
        </Reveal>
      </section>

      {/* ══ TESTIMONIALS ══ */}
      <section style={{ background: "var(--green-deep)", padding: "72px 0 72px 20px" }}>
        <Reveal>
          <p className="section-label">Success Stories</p>
          <h2 className="section-title">What Families Say</h2>
          <p className="section-sub" style={{ paddingRight: 20 }}>Real stories from our trusted community.</p>
        </Reveal>
        <div className="testi-scroll" style={{ paddingRight: 20 }}>
          {testimonials.map((t, i) => (
            <TestiCard key={i} {...t} delay={i * 100} />
          ))}
        </div>
      </section>

      {/* ══ COUNTDOWN ══ */}
      <section className="countdown-section">
        <Reveal>
          <p className="section-label">Official Launch</p>
          <h2 className="section-title">Launching Soon</h2>
        </Reveal>
        <Reveal delay={100}>
          <div className="launch-date-badge">
            🗓 &nbsp;June 29, 2025 · Official App Launch
          </div>
          <div className="countdown-grid">
            {[
              [String(countdown.d).padStart(2, "0"), "DAYS"],
              [String(countdown.h).padStart(2, "0"), "HOURS"],
              [String(countdown.m).padStart(2, "0"), "MINS"],
              [String(countdown.s).padStart(2, "0"), "SECS"],
            ].map(([n, l], i) => (
              <div key={i} className="time-box">
                <span className="time-number">{n}</span>
                <div className="time-label">{l}</div>
              </div>
            ))}
          </div>
          <p style={{ color: "var(--text-dim)", fontSize: 13, marginBottom: 24 }}>
            Register now for <span style={{ color: "var(--gold)", fontWeight: 700 }}>early access & free premium features</span>
          </p>
          <button className="btn-primary" style={{ margin: "0 auto", display: "flex" }}>
            🔔 Notify Me on Launch
          </button>
        </Reveal>
      </section>

      {/* ══ FOOTER ══ */}
      <footer className="footer">
        <div className="footer-logo">Kattunayakan Matrimony</div>
        <p className="footer-tagline">கட்டுநாயக்கன் மேட்ரிமோனி · Trusted Community Platform</p>
        <div className="footer-demo-note">⚠ DEMO VERSION · Official Launch: June 29, 2025</div>
        <div className="footer-links">
          <a className="footer-link">Privacy Policy</a>
          <a className="footer-link">Terms of Use</a>
          <a className="footer-link">Contact Us</a>
          <a className="footer-link">WhatsApp</a>
        </div>
        <p className="footer-copy">© 2025 Kattunayakan Matrimony · All rights reserved · Made with ❤ for the community</p>
      </footer>
    </>
  );
}