import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

// ── DATA ──────────────────────────────────────────────────────────────────────

const navItems = [
  { id: "hero",       label: "Главная" },
  { id: "why",        label: "Защита" },
  { id: "models",     label: "Модели" },
  { id: "specs",      label: "Характеристики" },
  { id: "calculator", label: "Калькулятор" },
  { id: "contacts",   label: "Контакты" },
];

const shelters = [
  {
    code: "SHELTER-F",
    name: "Семейный",
    persons: "2–8 чел.",
    area: "12–40 м²",
    depth: "3–6 м",
    duration: "до 30 суток",
    price: "от 2.4 млн ₽",
    features: ["Воздушная фильтрация ФВУА", "Аварийный выход", "Автономное питание 72 ч", "Санузел, кухня"],
    color: "rgba(120,140,60,0.15)",
    border: "rgba(120,140,60,0.35)",
    accent: "hsl(72,35%,52%)",
    tag: "СЕМЬЯ",
  },
  {
    code: "SHELTER-C",
    name: "Корпоративный",
    persons: "20–200 чел.",
    area: "80–800 м²",
    depth: "5–12 м",
    duration: "до 90 суток",
    price: "от 18 млн ₽",
    features: ["Двойная гермодверь", "Дизельная генерация", "Запасы воды 30 суток", "Медпункт, связь"],
    color: "rgba(220,80,30,0.08)",
    border: "rgba(220,80,30,0.35)",
    accent: "hsl(15,85%,55%)",
    tag: "ХИТ",
  },
  {
    code: "SHELTER-M",
    name: "Муниципальный",
    persons: "500–5000 чел.",
    area: "500–5000 м²",
    depth: "8–20 м",
    duration: "до 180 суток",
    price: "Индивидуально",
    features: ["НАТО-класс А", "NBC-защита", "Автономный водозабор", "Командный пункт"],
    color: "rgba(60,80,120,0.12)",
    border: "rgba(80,110,160,0.3)",
    accent: "hsl(220,40%,60%)",
    tag: "ПРОЕКТ",
  },
];

const threatLevels = [
  { label: "Ударная волна", level: 95, unit: "0.5–2 кг/см²" },
  { label: "Световое излучение", level: 100, unit: "100% защита" },
  { label: "Радиоактивное заражение", level: 98, unit: "Кз = 1000+" },
  { label: "Химическое заражение", level: 96, unit: "ФВУА-200" },
  { label: "Биологическое заражение", level: 94, unit: "Фильтрация Н14" },
];

// ── BLAST DOOR VISUAL ─────────────────────────────────────────────────────────

function BlastDoor({ size = 200 }: { size?: number }) {
  return (
    <div
      className="relative animate-float"
      style={{ width: size, height: size * 1.25 }}
    >
      {/* Door frame */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(160deg, #2a3015 0%, #1a1e0c 60%, #0e1008 100%)",
          border: "3px solid rgba(120,140,60,0.5)",
          boxShadow: "inset 0 0 40px rgba(0,0,0,0.6), 0 0 30px rgba(120,140,60,0.15)",
        }}
      >
        {/* Inner frame 1 */}
        <div
          className="absolute"
          style={{
            inset: 12,
            border: "2px solid rgba(120,140,60,0.25)",
          }}
        />
        {/* Inner frame 2 */}
        <div
          className="absolute"
          style={{
            inset: 22,
            border: "1px solid rgba(120,140,60,0.12)",
          }}
        />

        {/* Hinge left */}
        {[0.2, 0.5, 0.8].map((y, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: -8,
              top: `${y * 100}%`,
              transform: "translateY(-50%)",
              width: 16,
              height: 32,
              background: "linear-gradient(90deg, #3a4020, #2a2e15)",
              border: "1px solid rgba(120,140,60,0.5)",
            }}
          />
        ))}

        {/* Bolts */}
        {[
          [0.12, 0.1], [0.88, 0.1], [0.12, 0.9], [0.88, 0.9],
          [0.12, 0.5], [0.88, 0.5],
        ].map(([x, y], i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${x * 100}%`,
              top: `${y * 100}%`,
              transform: "translate(-50%,-50%)",
              width: 12,
              height: 12,
              background: "radial-gradient(circle at 35% 35%, #5a6030, #2a2e15)",
              border: "1px solid rgba(120,140,60,0.6)",
              boxShadow: "0 2px 4px rgba(0,0,0,0.5)",
            }}
          />
        ))}

        {/* Handle wheel */}
        <div
          className="absolute animate-rotate-slow"
          style={{
            right: 20,
            top: "50%",
            transform: "translateY(-50%)",
            width: 48,
            height: 48,
          }}
        >
          <div
            className="absolute inset-0 rounded-full"
            style={{
              border: "3px solid rgba(120,140,60,0.6)",
              background: "radial-gradient(circle at 40% 35%, #3a4020, #1a1e0c)",
            }}
          />
          {/* Spokes */}
          {[0, 60, 120].map((angle, i) => (
            <div
              key={i}
              className="absolute inset-0 flex items-center justify-center"
              style={{ transform: `rotate(${angle}deg)` }}
            >
              <div
                style={{
                  width: "100%",
                  height: 2,
                  background: "rgba(120,140,60,0.5)",
                }}
              />
            </div>
          ))}
          <div
            className="absolute inset-0 m-auto rounded-full"
            style={{
              width: 10,
              height: 10,
              background: "hsl(72,35%,40%)",
              boxShadow: "0 0 8px rgba(120,140,60,0.6)",
            }}
          />
        </div>

        {/* Warning stripes bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 warning-stripe"
          style={{ height: 20 }}
        />

        {/* Code label */}
        <div
          className="absolute top-1/3 left-6"
          style={{
            fontFamily: "IBM Plex Mono",
            fontSize: 9,
            color: "rgba(120,140,60,0.6)",
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          ГЕРМОДВЕРЬ
          <br />
          <span style={{ color: "rgba(220,80,30,0.7)" }}>ГД-2/4</span>
        </div>
      </div>

      {/* Ambient glow */}
      <div
        className="absolute -bottom-4 left-1/2 -translate-x-1/2"
        style={{
          width: "80%",
          height: 8,
          background: "radial-gradient(ellipse, rgba(120,140,60,0.3) 0%, transparent 70%)",
          filter: "blur(6px)",
        }}
      />
    </div>
  );
}

// ── RADIATION SYMBOL ──────────────────────────────────────────────────────────

function RadiationSymbol({ size = 80, pulse = false }: { size?: number; pulse?: boolean }) {
  const r = size / 2;
  const innerR = r * 0.15;
  const outerR = r * 0.45;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={pulse ? "animate-pulse-red" : ""}
      style={{ filter: "drop-shadow(0 0 8px rgba(220,80,30,0.4))" }}
    >
      <circle cx={r} cy={r} r={r - 2} fill="none" stroke="rgba(220,80,30,0.4)" strokeWidth="1" />
      {/* Three blades */}
      {[0, 120, 240].map((angle, i) => {
        const rad = (angle - 90) * (Math.PI / 180);
        const rad2 = (angle - 90 + 60) * (Math.PI / 180);
        const x1 = r + Math.cos(rad) * innerR;
        const y1 = r + Math.sin(rad) * innerR;
        const x2 = r + Math.cos(rad) * outerR;
        const y2 = r + Math.sin(rad) * outerR;
        const x3 = r + Math.cos(rad2) * outerR;
        const y3 = r + Math.sin(rad2) * outerR;
        const x4 = r + Math.cos(rad2) * innerR;
        const y4 = r + Math.sin(rad2) * innerR;
        return (
          <path
            key={i}
            d={`M ${x1} ${y1} L ${x2} ${y2} A ${outerR} ${outerR} 0 0 1 ${x3} ${y3} L ${x4} ${y4} A ${innerR} ${innerR} 0 0 0 ${x1} ${y1}`}
            fill="rgba(220,80,30,0.7)"
          />
        );
      })}
      <circle cx={r} cy={r} r={innerR * 0.7} fill="rgba(220,80,30,0.8)" />
    </svg>
  );
}

// ── CALCULATOR ────────────────────────────────────────────────────────────────

function ShelterCalculator() {
  const [persons, setPersons] = useState(6);
  const [days, setDays] = useState(14);
  const [level, setLevel] = useState<"base" | "full" | "premium">("full");

  const levelMult = { base: 1, full: 1.4, premium: 2.1 };
  const levelLabel = { base: "Базовая", full: "Полная", premium: "Премиум" };

  const areaNeed = Math.max(12, persons * 2.5);
  const waterM3 = (persons * days * 3) / 1000;
  const foodKg = persons * days * 0.6;
  const oxygenM3 = persons * days * 24 * 0.5;
  const baseCost = areaNeed * 120000 * levelMult[level];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
      {/* Controls */}
      <div className="space-y-7">
        <div>
          <div className="flex justify-between mb-3">
            <span className="tag-mil">Количество человек</span>
            <span className="font-mono text-base" style={{ color: "hsl(15,85%,58%)" }}>
              {persons} чел.
            </span>
          </div>
          <input
            type="range" min={1} max={50} step={1} value={persons}
            onChange={e => setPersons(Number(e.target.value))}
            className="w-full h-1 rounded-full"
            style={{ accentColor: "hsl(15,85%,55%)" }}
          />
        </div>

        <div>
          <div className="flex justify-between mb-3">
            <span className="tag-mil">Автономность</span>
            <span className="font-mono text-base" style={{ color: "hsl(15,85%,58%)" }}>
              {days} суток
            </span>
          </div>
          <input
            type="range" min={3} max={180} step={1} value={days}
            onChange={e => setDays(Number(e.target.value))}
            className="w-full h-1 rounded-full"
            style={{ accentColor: "hsl(15,85%,55%)" }}
          />
        </div>

        <div>
          <div className="mb-3">
            <span className="tag-mil">Уровень защиты</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {(["base", "full", "premium"] as const).map(l => (
              <button
                key={l}
                onClick={() => setLevel(l)}
                className="py-2 text-xs font-mono uppercase tracking-wider transition-all duration-150"
                style={{
                  border: `1px solid ${level === l ? "rgba(220,80,30,0.6)" : "rgba(120,140,60,0.2)"}`,
                  background: level === l ? "rgba(220,80,30,0.1)" : "rgba(255,255,255,0.02)",
                  color: level === l ? "hsl(15,85%,60%)" : "hsl(75,10%,50%)",
                }}
              >
                {levelLabel[l]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      <div>
        <div className="text-xs font-mono uppercase tracking-widest mb-5" style={{ color: "hsl(15,85%,55%)" }}>
          // Расчёт ресурсов
        </div>
        <div className="space-y-1 mb-6">
          {[
            { label: "Площадь убежища", val: `${areaNeed.toFixed(0)} м²` },
            { label: "Запас воды", val: `${waterM3.toFixed(1)} м³` },
            { label: "Запас продовольствия", val: `${foodKg.toFixed(0)} кг` },
            { label: "Кислород (расчётный)", val: `${oxygenM3.toFixed(0)} м³` },
          ].map((row, i) => (
            <div key={i} className="spec-row">
              <span style={{ color: "hsl(75,10%,52%)" }}>{row.label}</span>
              <span style={{ color: "hsl(75,15%,80%)" }}>{row.val}</span>
            </div>
          ))}
        </div>

        <div
          className="p-5 mb-5"
          style={{ border: "1px solid rgba(220,80,30,0.3)", background: "rgba(220,80,30,0.04)" }}
        >
          <div className="text-xs font-mono uppercase tracking-widest mb-2" style={{ color: "hsl(75,10%,45%)" }}>
            Ориентировочная стоимость
          </div>
          <div
            className="text-3xl font-bold"
            style={{ fontFamily: "'Oswald', sans-serif", color: "hsl(15,85%,55%)" }}
          >
            {(baseCost / 1000000).toFixed(1)} млн ₽
          </div>
          <div className="text-xs mt-1 font-mono" style={{ color: "hsl(75,10%,40%)" }}>
            уровень «{levelLabel[level]}» · {persons} чел. · {days} сут.
          </div>
        </div>

        <button
          className="w-full py-3.5 font-bold uppercase tracking-widest transition-all hover:opacity-90 active:scale-95 glow-danger"
          style={{
            background: "hsl(15,85%,48%)",
            color: "hsl(80,8%,6%)",
            fontFamily: "'Oswald', sans-serif",
            letterSpacing: "0.15em",
          }}
        >
          Получить точный расчёт
        </button>
      </div>
    </div>
  );
}

// ── MAIN ──────────────────────────────────────────────────────────────────────

export default function Index() {
  const [active, setActive] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeShelter, setActiveShelter] = useState(1);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }),
      { threshold: 0.3 }
    );
    navItems.forEach(n => { const el = document.getElementById(n.id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  // Alert ticker
  const alerts = [
    "УРОВЕНЬ УГРОЗЫ: ПОВЫШЕННЫЙ",
    "NBC-ЗАЩИТА КЛАСС А",
    "ПОСТАВКА 30–90 ДНЕЙ",
    "ГАРАНТИЯ 25 ЛЕТ",
    "ЛИЦЕНЗИЯ МЧС РФ",
    "МОНТАЖ ПО ВСЕЙ СТРАНЕ",
  ];
  const [tickerIdx, setTickerIdx] = useState(0);
  const tickerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(() => {
    tickerRef.current = setInterval(() => setTickerIdx(i => (i + 1) % alerts.length), 2800);
    return () => { if (tickerRef.current) clearInterval(tickerRef.current); };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* ── ALERT TICKER ── */}
      <div
        className="fixed top-0 left-0 right-0 z-[60] py-1.5 flex items-center justify-center gap-3"
        style={{ background: "hsl(15,85%,48%)", color: "hsl(80,8%,6%)" }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-current animate-blink" />
        <span className="text-xs font-mono uppercase tracking-widest font-bold">
          {alerts[tickerIdx]}
        </span>
        <div className="w-1.5 h-1.5 rounded-full bg-current animate-blink" />
      </div>

      {/* ── NAVBAR ── */}
      <nav
        className="fixed top-7 left-0 right-0 z-50 border-b"
        style={{
          background: "rgba(10,12,7,0.94)",
          backdropFilter: "blur(14px)",
          borderColor: "rgba(180,190,150,0.07)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-3.5 flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => scrollTo("hero")} className="flex items-center gap-3">
            <div
              className="w-9 h-9 flex items-center justify-center"
              style={{
                border: "1px solid rgba(220,80,30,0.5)",
                background: "rgba(220,80,30,0.08)",
              }}
            >
              <RadiationSymbol size={22} />
            </div>
            <div>
              <div
                className="font-bold text-sm tracking-widest uppercase"
                style={{ fontFamily: "'Oswald', sans-serif", color: "hsl(15,85%,55%)" }}
              >
                БункерПро
              </div>
              <div className="font-mono uppercase" style={{ fontSize: "0.58rem", letterSpacing: "0.14em", color: "hsl(75,10%,40%)" }}>
                Защита под ключ
              </div>
            </div>
          </button>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-7">
            {navItems.map(n => (
              <button
                key={n.id}
                onClick={() => scrollTo(n.id)}
                className={`shelter-nav-link ${active === n.id ? "active" : ""}`}
              >
                {n.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <a
              href="tel:+78001234567"
              className="hidden md:flex items-center gap-2 text-sm font-mono"
              style={{ color: "hsl(15,85%,55%)" }}
            >
              <Icon name="Phone" size={13} />
              8-800-123-45-67
            </a>
            <button className="lg:hidden" onClick={() => setMenuOpen(!menuOpen)}>
              <Icon name={menuOpen ? "X" : "Menu"} size={22} style={{ color: "hsl(15,85%,55%)" }} />
            </button>
          </div>
        </div>

        {menuOpen && (
          <div
            className="lg:hidden border-t px-6 py-5 space-y-4"
            style={{ background: "rgba(10,12,7,0.98)", borderColor: "rgba(180,190,150,0.07)" }}
          >
            {navItems.map(n => (
              <button key={n.id} onClick={() => scrollTo(n.id)} className="block shelter-nav-link py-2 text-left w-full">
                {n.label}
              </button>
            ))}
            <a href="tel:+78001234567" className="flex items-center gap-2 text-sm font-mono pt-2" style={{ color: "hsl(15,85%,55%)" }}>
              <Icon name="Phone" size={14} />
              8-800-123-45-67 (бесплатно)
            </a>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center bg-concrete"
        style={{ paddingTop: 108 }}
      >
        <div className="scanline-overlay" />

        {/* Left danger stripe */}
        <div
          className="absolute left-0 top-0 bottom-0 w-2 warning-stripe"
          style={{ borderRight: "1px solid rgba(220,80,30,0.2)" }}
        />
        {/* Right danger stripe */}
        <div
          className="absolute right-0 top-0 bottom-0 w-2 warning-stripe"
          style={{ borderLeft: "1px solid rgba(220,80,30,0.2)" }}
        />

        {/* Background radial */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 70% 50%, rgba(120,140,60,0.06) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-8 w-full py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left text */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="badge-alert animate-pulse-red">
                  <div className="w-1.5 h-1.5 rounded-full bg-current animate-blink" />
                  Угроза реальна
                </div>
                <span className="tag-mil">МЧС · ГОСТ Р 22.3.001</span>
              </div>

              <h1
                className="font-bold uppercase mb-6"
                style={{
                  fontFamily: "'Oswald', sans-serif",
                  fontSize: "clamp(2.8rem, 6vw, 5rem)",
                  lineHeight: 0.92,
                }}
              >
                Бомбо
                <br />
                <span className="text-glow-danger" style={{ color: "hsl(15,85%,52%)" }}>
                  убежища
                </span>
                <br />
                под ключ
              </h1>

              <p className="text-base leading-relaxed mb-3" style={{ color: "hsl(75,10%,58%)", maxWidth: 460 }}>
                Проектируем и строим индивидуальные и корпоративные убежища с защитой от ударной волны,
                радиации, химического и биологического заражения.
              </p>
              <p className="text-sm font-mono mb-8" style={{ color: "hsl(75,10%,42%)" }}>
                Срок строительства: 30–120 дней · Гарантия 25 лет · Лицензия МЧС
              </p>

              <div className="flex flex-wrap gap-4 mb-12">
                <button
                  onClick={() => scrollTo("calculator")}
                  className="px-8 py-3.5 font-bold uppercase tracking-widest text-sm glow-danger transition-all hover:opacity-90"
                  style={{
                    background: "hsl(15,85%,48%)",
                    color: "hsl(80,8%,6%)",
                    fontFamily: "'Oswald', sans-serif",
                  }}
                >
                  Рассчитать стоимость
                </button>
                <button
                  onClick={() => scrollTo("models")}
                  className="px-8 py-3.5 font-bold uppercase tracking-widest text-sm transition-all hover:border-opacity-60"
                  style={{
                    border: "1px solid rgba(120,140,60,0.35)",
                    color: "hsl(75,15%,75%)",
                    fontFamily: "'Oswald', sans-serif",
                    background: "transparent",
                  }}
                >
                  Смотреть модели
                </button>
              </div>

              {/* Stats grid */}
              <div
                className="grid grid-cols-4 gap-4 pt-8 border-t"
                style={{ borderColor: "rgba(180,190,150,0.08)" }}
              >
                {[
                  { val: "340+", label: "Объектов" },
                  { val: "17 лет", label: "На рынке" },
                  { val: "NBC-A", label: "Класс защиты" },
                  { val: "30 суток", label: "Автономность" },
                ].map((s, i) => (
                  <div key={i}>
                    <div
                      className="text-xl font-bold"
                      style={{ fontFamily: "'Oswald', sans-serif", color: "hsl(15,85%,55%)" }}
                    >
                      {s.val}
                    </div>
                    <div className="text-xs font-mono uppercase tracking-widest mt-1" style={{ color: "hsl(75,10%,42%)" }}>
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: blast door */}
            <div className="flex flex-col items-center gap-8">
              <BlastDoor size={220} />

              {/* Threat indicator */}
              <div
                className="w-full max-w-xs p-5"
                style={{ border: "1px solid rgba(120,140,60,0.2)", background: "rgba(10,12,7,0.6)" }}
              >
                <div className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: "hsl(75,10%,45%)" }}>
                  Статус защиты
                </div>
                {["Ударная волна", "Радиация", "Химзаражение"].map((t, i) => (
                  <div key={i} className="flex items-center gap-3 mb-3">
                    <div className="w-2 h-2 rounded-full animate-pulse-red" style={{ background: "hsl(15,85%,55%)", flexShrink: 0 }} />
                    <div className="flex-1 text-xs font-mono" style={{ color: "hsl(75,10%,55%)" }}>{t}</div>
                    <div className="text-xs font-mono" style={{ color: "hsl(72,35%,52%)" }}>ЗАЩИЩЕНО</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <div className="w-px h-10" style={{ background: "linear-gradient(180deg, rgba(220,80,30,0.5), transparent)" }} />
        </div>
      </section>

      {/* ── ПОЧЕМУ УБЕЖИЩЕ ── */}
      <section id="why" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <div className="tag-mil mb-5">Почему это важно</div>
            <h2
              className="text-4xl md:text-5xl uppercase font-bold"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              Угрозы,
              <br />
              <span style={{ color: "hsl(15,85%,52%)" }}>от которых мы</span>
              <br />
              защищаем
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Threat bars */}
            <div className="space-y-5">
              {threatLevels.map((t, i) => (
                <div key={i}>
                  <div className="flex justify-between mb-2 text-xs font-mono">
                    <span style={{ color: "hsl(75,10%,60%)" }}>{t.label}</span>
                    <span style={{ color: "hsl(72,35%,52%)" }}>{t.unit}</span>
                  </div>
                  <div className="h-2 rounded-sm overflow-hidden" style={{ background: "rgba(180,190,150,0.08)" }}>
                    <div
                      className="h-full"
                      style={{
                        width: `${t.level}%`,
                        background: `linear-gradient(90deg, hsl(72,35%,30%), hsl(72,35%,52%))`,
                        boxShadow: "0 0 8px rgba(120,140,60,0.3)",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Feature list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: "Shield", title: "NBC-защита класс А", desc: "Ядерное, биологическое, химическое оружие" },
                { icon: "Wind", title: "Система вентиляции", desc: "ФВУА-200, фильтрация Н14, избыточное давление" },
                { icon: "Zap", title: "Автономное питание", desc: "Дизель-генератор + АКБ резерв 72 часа" },
                { icon: "Droplets", title: "Водоснабжение", desc: "Встроенная цистерна и системы очистки" },
                { icon: "Radio", title: "Связь и наблюдение", desc: "Укреплённая антенна, CCTV, интерком" },
                { icon: "HeartPulse", title: "Медицинский блок", desc: "Кислородный концентратор, аптечка НАЗ" },
              ].map((f, i) => (
                <div
                  key={i}
                  className="p-4 border shelter-card"
                  style={{ borderColor: "rgba(120,140,60,0.15)", background: "rgba(255,255,255,0.02)" }}
                >
                  <Icon name={f.icon} fallback="Shield" size={20} style={{ color: "hsl(72,35%,50%)", marginBottom: 8 }} />
                  <div className="text-sm font-semibold mb-1" style={{ fontFamily: "'Oswald', sans-serif", letterSpacing: "0.04em" }}>
                    {f.title}
                  </div>
                  <div className="text-xs leading-relaxed" style={{ color: "hsl(75,10%,48%)" }}>
                    {f.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="divider-mil mt-24" />
      </section>

      {/* ── МОДЕЛИ ── */}
      <section id="models" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <div className="tag-mil mb-5">Линейка продуктов</div>
            <h2
              className="text-4xl md:text-5xl uppercase font-bold"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              Готовые решения
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {shelters.map((s, i) => (
              <div
                key={i}
                className="shelter-card border p-6 cursor-pointer relative"
                style={{
                  background: activeShelter === i ? s.color : "rgba(255,255,255,0.02)",
                  borderColor: activeShelter === i ? s.border : "rgba(120,140,60,0.12)",
                }}
                onClick={() => setActiveShelter(i)}
              >
                {/* Tag */}
                <div
                  className="absolute top-4 right-4 text-xs font-mono uppercase tracking-widest px-2 py-0.5"
                  style={{ border: `1px solid ${s.accent}`, color: s.accent, fontSize: "0.6rem" }}
                >
                  {s.tag}
                </div>

                <div className="font-mono text-xs mb-2" style={{ color: s.accent }}>
                  {s.code}
                </div>
                <h3
                  className="text-2xl font-bold uppercase mb-1"
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                >
                  {s.name}
                </h3>
                <div className="text-2xl font-bold mb-4" style={{ color: s.accent, fontFamily: "'Oswald', sans-serif" }}>
                  {s.price}
                </div>

                <div className="space-y-1 mb-5">
                  {[
                    { k: "Вместимость", v: s.persons },
                    { k: "Площадь", v: s.area },
                    { k: "Глубина", v: s.depth },
                    { k: "Автономность", v: s.duration },
                  ].map((row, j) => (
                    <div key={j} className="spec-row" style={{ fontSize: "0.75rem", paddingTop: 5, paddingBottom: 5 }}>
                      <span style={{ color: "hsl(75,10%,46%)" }}>{row.k}</span>
                      <span style={{ color: "hsl(75,15%,78%)" }}>{row.v}</span>
                    </div>
                  ))}
                </div>

                <ul className="space-y-1.5">
                  {s.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2 text-xs" style={{ color: "hsl(75,10%,52%)" }}>
                      <span style={{ color: s.accent, flexShrink: 0 }}>▸</span>
                      {f}
                    </li>
                  ))}
                </ul>

                {activeShelter === i && (
                  <div className="mt-5 pt-4 border-t text-xs font-mono" style={{ borderColor: s.border, color: s.accent }}>
                    ▶ Подробнее в характеристиках ↓
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="divider-mil mt-24" />
      </section>

      {/* ── ХАРАКТЕРИСТИКИ ── */}
      <section id="specs" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <div className="tag-mil mb-5">Технические характеристики</div>
            <h2
              className="text-4xl md:text-5xl uppercase font-bold"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              {shelters[activeShelter].code} ·{" "}
              <span style={{ color: shelters[activeShelter].accent }}>
                {shelters[activeShelter].name}
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest mb-5" style={{ color: "hsl(15,85%,55%)" }}>
                // Конструктив
              </div>
              {[
                { label: "Несущие стены", value: "Ж/б 40–60 см, Ст3 5–20 мм" },
                { label: "Перекрытие", value: "Монолит 50–80 см" },
                { label: "Гермодверь", value: "ГД-2/4, сталь 20 мм, 2 шт." },
                { label: "Авар. выход", value: "Ø 80 см, ниже уровня 2 м" },
                { label: "Защита от EMP", value: "Клетка Фарадея, опция" },
                { label: "Уровень защиты", value: "ГОСТ Р 22.3.001 · NBC-A" },
              ].map((row, i) => (
                <div key={i} className="spec-row">
                  <span style={{ color: "hsl(75,10%,48%)" }}>{row.label}</span>
                  <span className="font-mono text-right" style={{ color: "hsl(75,15%,82%)", maxWidth: "55%" }}>
                    {row.value}
                  </span>
                </div>
              ))}
            </div>

            <div>
              <div className="text-xs font-mono uppercase tracking-widest mb-5" style={{ color: "hsl(15,85%,55%)" }}>
                // Жизнеобеспечение
              </div>
              {[
                { label: "Вентиляция", value: "ФВУА-200, избыт. давл." },
                { label: "Электроснабжение", value: "Дизель + АКБ 72 ч" },
                { label: "Водоснабжение", value: "Цистерна + фильтрация" },
                { label: "Канализация", value: "Автономная септик" },
                { label: "Отопление", value: "Электрокотёл + резерв" },
                { label: "Связь", value: "УКВ, проводная, интернет" },
              ].map((row, i) => (
                <div key={i} className="spec-row">
                  <span style={{ color: "hsl(75,10%,48%)" }}>{row.label}</span>
                  <span className="font-mono text-right" style={{ color: "hsl(75,15%,82%)", maxWidth: "55%" }}>
                    {row.value}
                  </span>
                </div>
              ))}

              <div
                className="mt-7 p-5"
                style={{ border: "1px solid rgba(120,140,60,0.25)", background: "rgba(120,140,60,0.04)" }}
              >
                <div className="text-xs font-mono uppercase tracking-widest mb-2" style={{ color: "hsl(72,35%,48%)" }}>
                  Срок строительства
                </div>
                <div className="text-2xl font-bold" style={{ fontFamily: "'Oswald', sans-serif" }}>
                  30–120 рабочих дней
                </div>
                <div className="text-xs font-mono mt-1" style={{ color: "hsl(75,10%,42%)" }}>
                  от проекта до сдачи с документами МЧС
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="divider-mil mt-24" />
      </section>

      {/* ── КАЛЬКУЛЯТОР ── */}
      <section id="calculator" className="py-24 bg-concrete">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <div className="tag-mil mb-5">Калькулятор</div>
            <h2
              className="text-4xl md:text-5xl uppercase font-bold"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              Рассчитайте
              <br />
              <span style={{ color: "hsl(15,85%,52%)" }}>своё убежище</span>
            </h2>
          </div>
          <div
            className="border p-8"
            style={{ borderColor: "rgba(120,140,60,0.15)", background: "rgba(8,10,6,0.5)" }}
          >
            <ShelterCalculator />
          </div>
        </div>
        <div className="divider-mil mt-24" />
      </section>

      {/* ── КОНТАКТЫ ── */}
      <section id="contacts" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <div className="tag-mil mb-5">Контакты</div>
            <h2
              className="text-4xl md:text-5xl uppercase font-bold"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              Обсудим
              <br />
              <span style={{ color: "hsl(15,85%,52%)" }}>вашу защиту</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Info */}
            <div className="space-y-4">
              {[
                { icon: "Phone", label: "Телефон (бесплатно)", value: "8-800-123-45-67", sub: "Пн–Пт 9:00–19:00 МСК" },
                { icon: "Mail", label: "Email", value: "info@bunkerpro.ru", sub: "Ответим в течение часа" },
                { icon: "MapPin", label: "Офис", value: "Москва, ул. Защитников, 1", sub: "По предварительной записи" },
                { icon: "FileText", label: "Лицензия МЧС", value: "№ МЧС-2456-П от 2019", sub: "Проектирование и монтаж убежищ" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 p-4 border"
                  style={{ borderColor: "rgba(120,140,60,0.12)", background: "rgba(255,255,255,0.015)" }}
                >
                  <div
                    className="flex-shrink-0 w-10 h-10 flex items-center justify-center border"
                    style={{ borderColor: "rgba(120,140,60,0.35)", background: "rgba(120,140,60,0.06)" }}
                  >
                    <Icon name={item.icon} fallback="Phone" size={17} style={{ color: "hsl(72,35%,52%)" }} />
                  </div>
                  <div>
                    <div className="text-xs font-mono uppercase tracking-widest mb-1" style={{ color: "hsl(75,10%,42%)" }}>
                      {item.label}
                    </div>
                    <div className="font-semibold" style={{ fontFamily: "'Oswald', sans-serif" }}>
                      {item.value}
                    </div>
                    <div className="text-xs mt-0.5 font-mono" style={{ color: "hsl(75,10%,42%)" }}>
                      {item.sub}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Form */}
            <div
              className="border p-8"
              style={{ borderColor: "rgba(120,140,60,0.15)", background: "rgba(8,10,6,0.5)" }}
            >
              <div className="text-xs font-mono uppercase tracking-widest mb-6" style={{ color: "hsl(15,85%,55%)" }}>
                // Оставить заявку
              </div>
              <div className="space-y-4">
                {[
                  { label: "Имя", placeholder: "Иван Петров" },
                  { label: "Телефон", placeholder: "+7 (___) ___-__-__" },
                  { label: "Email", placeholder: "ivan@company.ru" },
                ].map((f, i) => (
                  <div key={i}>
                    <label className="text-xs font-mono uppercase tracking-widest block mb-2" style={{ color: "hsl(75,10%,42%)" }}>
                      {f.label}
                    </label>
                    <input type="text" placeholder={f.placeholder} className="mil-input" />
                  </div>
                ))}
                <div>
                  <label className="text-xs font-mono uppercase tracking-widest block mb-2" style={{ color: "hsl(75,10%,42%)" }}>
                    Задача
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Опишите задачу: тип объекта, количество человек, регион..."
                    className="mil-input resize-none"
                    style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "0.875rem" }}
                  />
                </div>
                <button
                  className="w-full py-4 font-bold uppercase tracking-widest transition-all hover:opacity-90 glow-danger"
                  style={{
                    background: "hsl(15,85%,48%)",
                    color: "hsl(80,8%,6%)",
                    fontFamily: "'Oswald', sans-serif",
                    letterSpacing: "0.15em",
                  }}
                >
                  Отправить заявку
                </button>
                <p className="text-xs text-center font-mono" style={{ color: "hsl(75,10%,35%)" }}>
                  Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        className="border-t py-8"
        style={{ borderColor: "rgba(180,190,150,0.06)", background: "rgba(6,8,4,0.9)" }}
      >
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <RadiationSymbol size={20} />
            <span
              className="font-bold text-sm tracking-widest uppercase"
              style={{ fontFamily: "'Oswald', sans-serif", color: "hsl(15,85%,52%)" }}
            >
              БункерПро
            </span>
          </div>
          <div className="text-xs font-mono" style={{ color: "hsl(75,10%,32%)" }}>
            © 2024 ООО «БункерПро» · Лицензия МЧС РФ · Все права защищены
          </div>
          <div className="text-xs font-mono" style={{ color: "hsl(75,10%,32%)" }}>
            ГОСТ Р 22.3.001 · NBC-A
          </div>
        </div>
      </footer>
    </div>
  );
}
