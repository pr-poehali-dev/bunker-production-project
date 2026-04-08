import { useState, useRef, useEffect } from "react";
import Icon from "@/components/ui/icon";

// ─── NAV ────────────────────────────────────────────────────────────────────
const sections = [
  { id: "hero", label: "Главная" },
  { id: "production", label: "О производстве" },
  { id: "products", label: "Продукция" },
  { id: "specs", label: "Спецификации" },
  { id: "calculator", label: "Калькулятор" },
  { id: "contacts", label: "Контакты" },
];

// ─── BUNKER SVG 3D (interactive) ─────────────────────────────────────────────
function BunkerModel() {
  const [rotX, setRotX] = useState(15);
  const [rotY, setRotY] = useState(-25);
  const [isDragging, setIsDragging] = useState(false);
  const [scale, setScale] = useState(1);
  const lastPos = useRef({ x: 0, y: 0 });

  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    lastPos.current = { x: e.clientX, y: e.clientY };
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - lastPos.current.x;
    const dy = e.clientY - lastPos.current.y;
    setRotY((y) => y + dx * 0.5);
    setRotX((x) => Math.max(-45, Math.min(45, x - dy * 0.3)));
    lastPos.current = { x: e.clientX, y: e.clientY };
  };

  const onMouseUp = () => setIsDragging(false);

  const onWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    setScale((s) => Math.max(0.5, Math.min(2, s - e.deltaY * 0.001)));
  };

  const lastTouch = useRef({ x: 0, y: 0 });
  const onTouchStart = (e: React.TouchEvent) => {
    lastTouch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };
  const onTouchMove = (e: React.TouchEvent) => {
    const dx = e.touches[0].clientX - lastTouch.current.x;
    const dy = e.touches[0].clientY - lastTouch.current.y;
    setRotY((y) => y + dx * 0.5);
    setRotX((x) => Math.max(-45, Math.min(45, x - dy * 0.3)));
    lastTouch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className="relative select-none"
        style={{ cursor: isDragging ? "grabbing" : "grab", width: 300, height: 380 }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onWheel={onWheel}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
      >
        <div style={{ width: "100%", height: "100%", perspective: 900 }}>
          <div
            style={{
              width: "100%",
              height: "100%",
              transformStyle: "preserve-3d",
              transform: `scale(${scale}) rotateX(${rotX}deg) rotateY(${rotY}deg)`,
              transition: isDragging ? "none" : "transform 0.1s ease",
              position: "relative",
            }}
          >
            <BunkerSVG3D />
          </div>
        </div>
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-4 rounded-full"
          style={{
            background: "radial-gradient(ellipse, rgba(245,158,11,0.2) 0%, transparent 70%)",
            filter: "blur(8px)",
          }}
        />
      </div>
      <div className="flex items-center gap-3 text-xs font-mono" style={{ color: "hsl(210,10%,50%)" }}>
        <Icon name="RotateCcw" size={12} />
        <span>Перетащите для поворота · Колесо для масштаба</span>
      </div>
    </div>
  );
}

function BunkerSVG3D() {
  const W = 120;
  const H = 200;
  const D = 80;

  const faceStyle = (bg: string, transform: string, w: number, h: number): React.CSSProperties => ({
    position: "absolute",
    width: w,
    height: h,
    background: bg,
    border: "1px solid rgba(245,158,11,0.25)",
    backfaceVisibility: "hidden",
    transform,
  });

  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transformStyle: "preserve-3d",
        transform: "translate(-50%, -50%)",
      }}
    >
      {/* Front face */}
      <div
        style={faceStyle(
          "linear-gradient(180deg, #3a3f4a 0%, #2a2e38 40%, #1e2128 100%)",
          `translateZ(${D / 2}px) translateY(-${H / 2 - 20}px)`,
          W,
          H
        )}
      >
        {[0.15, 0.3, 0.45, 0.6, 0.75, 0.9].map((p, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: `${p * 100}%`,
              left: 0,
              right: 0,
              height: 5,
              background:
                "linear-gradient(180deg, rgba(245,158,11,0.3) 0%, rgba(100,120,140,0.4) 50%, rgba(245,158,11,0.1) 100%)",
              borderTop: "1px solid rgba(245,158,11,0.2)",
            }}
          />
        ))}
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: "50%",
            width: 2,
            background: "rgba(245,158,11,0.15)",
          }}
        />
        <div style={{ position: "absolute", top: 20, right: 15, bottom: 40, width: 12 }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                height: 2,
                top: `${(i / 7) * 80}%`,
                background: "rgba(245,158,11,0.4)",
              }}
            />
          ))}
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 2,
              width: 2,
              background: "rgba(245,158,11,0.3)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              right: 2,
              width: 2,
              background: "rgba(245,158,11,0.3)",
            }}
          />
        </div>
        <div
          style={{
            position: "absolute",
            top: "40%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            fontFamily: "IBM Plex Mono",
            fontSize: 9,
            color: "rgba(245,158,11,0.6)",
            letterSpacing: 2,
            textTransform: "uppercase",
            whiteSpace: "nowrap",
          }}
        >
          СтальПром
        </div>
      </div>

      {/* Back face */}
      <div
        style={faceStyle(
          "linear-gradient(180deg, #252830 0%, #1a1d24 100%)",
          `translateZ(-${D / 2}px) rotateY(180deg) translateY(-${H / 2 - 20}px)`,
          W,
          H
        )}
      >
        {[0.15, 0.3, 0.45, 0.6, 0.75, 0.9].map((p, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: `${p * 100}%`,
              left: 0,
              right: 0,
              height: 4,
              background: "rgba(100,120,140,0.3)",
            }}
          />
        ))}
      </div>

      {/* Left face */}
      <div
        style={faceStyle(
          "linear-gradient(90deg, #1e2128 0%, #2d3140 100%)",
          `translateX(-${W / 2}px) rotateY(-90deg) translateY(-${H / 2 - 20}px)`,
          D,
          H
        )}
      >
        {[0.15, 0.3, 0.45, 0.6, 0.75, 0.9].map((p, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: `${p * 100}%`,
              left: 0,
              right: 0,
              height: 3,
              background: "rgba(100,120,140,0.25)",
            }}
          />
        ))}
      </div>

      {/* Right face */}
      <div
        style={faceStyle(
          "linear-gradient(90deg, #2d3140 0%, #1e2128 100%)",
          `translateX(${W / 2}px) rotateY(90deg) translateY(-${H / 2 - 20}px)`,
          D,
          H
        )}
      >
        {[0.15, 0.3, 0.45, 0.6, 0.75, 0.9].map((p, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: `${p * 100}%`,
              left: 0,
              right: 0,
              height: 3,
              background: "rgba(100,120,140,0.25)",
            }}
          />
        ))}
      </div>

      {/* Top cap */}
      <div
        style={{
          ...faceStyle(
            "linear-gradient(135deg, #4a5060 0%, #35394a 50%, #2a2d38 100%)",
            `translateY(-${H / 2 + 19}px) rotateX(90deg)`,
            W,
            D
          ),
          borderRadius: "2px",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "30%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            width: 30,
            height: 30,
            borderRadius: "50%",
            border: "2px solid rgba(245,158,11,0.5)",
            background: "rgba(245,158,11,0.05)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "70%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            width: 40,
            height: 8,
            background: "rgba(100,120,140,0.3)",
            border: "1px solid rgba(245,158,11,0.2)",
          }}
        />
      </div>

      {/* Cone bottom */}
      <>
        <div
          style={{
            position: "absolute",
            width: 0,
            height: 0,
            borderLeft: `${W / 2}px solid transparent`,
            borderRight: `${W / 2}px solid transparent`,
            borderTop: `60px solid rgba(42,46,56,0.95)`,
            transform: `translateZ(${D / 2}px) translateY(${H / 2 - 20}px)`,
            filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.5))",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 20,
            height: 30,
            background: "linear-gradient(90deg, #2a2d38, #3a3f4a)",
            border: "1px solid rgba(245,158,11,0.3)",
            transform: `translateY(${H / 2 + 40}px) translateX(-10px)`,
          }}
        />
      </>

      {/* Legs */}
      {[
        { x: -W / 2 + 15, z: D / 2 - 5 },
        { x: W / 2 - 15, z: D / 2 - 5 },
        { x: -W / 2 + 15, z: -D / 2 + 5 },
        { x: W / 2 - 15, z: -D / 2 + 5 },
      ].map((pos, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: 8,
            height: 60,
            background: "linear-gradient(90deg, #3a3f4a, #2a2d38)",
            border: "1px solid rgba(245,158,11,0.2)",
            transform: `translate3d(${pos.x}px, ${H / 2 + 40}px, ${pos.z}px)`,
          }}
        />
      ))}
    </div>
  );
}

// ─── CALCULATOR ──────────────────────────────────────────────────────────────
function Calculator() {
  const [diameter, setDiameter] = useState(3);
  const [height, setHeight] = useState(8);
  const [coneAngle, setConeAngle] = useState(60);

  const coneH = (diameter / 2) / Math.tan((coneAngle * Math.PI) / 180);
  const cylinderVol = Math.PI * (diameter / 2) ** 2 * height;
  const coneVol = (1 / 3) * Math.PI * (diameter / 2) ** 2 * coneH;
  const totalVol = cylinderVol + coneVol;
  const totalH = height + coneH;
  const weight = totalVol * 0.3;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        {[
          { label: "Диаметр, м", min: 1, max: 12, step: 0.5, val: diameter, set: setDiameter },
          { label: "Высота цилиндра, м", min: 2, max: 30, step: 0.5, val: height, set: setHeight },
          { label: "Угол конуса, °", min: 30, max: 75, step: 5, val: coneAngle, set: setConeAngle },
        ].map((f, i) => (
          <div key={i}>
            <div className="flex justify-between mb-2">
              <label className="text-xs font-mono uppercase tracking-widest" style={{ color: "hsl(210,10%,55%)" }}>
                {f.label}
              </label>
              <span className="font-mono text-sm" style={{ color: "hsl(35,90%,55%)" }}>
                {f.val.toFixed(f.step < 1 ? 1 : 0)}{i === 2 ? "°" : " м"}
              </span>
            </div>
            <input
              type="range"
              min={f.min}
              max={f.max}
              step={f.step}
              value={f.val}
              onChange={(e) => f.set(Number(e.target.value))}
              className="w-full accent-amber-500 h-1 rounded-full"
            />
          </div>
        ))}
      </div>

      <div className="space-y-3">
        {[
          { label: "Объём цилиндра", value: `${cylinderVol.toFixed(1)} м³` },
          { label: "Объём конуса", value: `${coneVol.toFixed(1)} м³` },
          { label: "Полная высота", value: `${totalH.toFixed(1)} м` },
          { label: "Масса конструкции (ор.)", value: `~${weight.toFixed(1)} т` },
        ].map((row, i) => (
          <div key={i} className="spec-row">
            <span style={{ color: "hsl(210,10%,55%)" }}>{row.label}</span>
            <span style={{ color: "hsl(35,90%,55%)" }}>{row.value}</span>
          </div>
        ))}

        <div
          className="spec-row"
          style={{ borderBottom: "1px solid rgba(245,158,11,0.4)", paddingBottom: 12 }}
        >
          <span className="font-semibold" style={{ color: "hsl(210,20%,85%)" }}>
            Общий объём
          </span>
          <span
            className="text-xl font-bold"
            style={{ color: "hsl(35,90%,55%)", fontFamily: "'Oswald', sans-serif" }}
          >
            {totalVol.toFixed(1)} м³
          </span>
        </div>

        <button
          className="w-full py-3 mt-2 font-bold uppercase tracking-widest transition-all duration-200 hover:opacity-90 active:scale-95"
          style={{
            background: "hsl(35,90%,55%)",
            color: "hsl(220,15%,7%)",
            fontFamily: "'Oswald', sans-serif",
            letterSpacing: "0.12em",
          }}
        >
          Запросить расчёт стоимости
        </button>
      </div>
    </div>
  );
}

// ─── PRODUCTS DATA ────────────────────────────────────────────────────────────
const products = [
  {
    code: "BNK-V",
    name: "Вертикальный силос",
    volume: "50–5000 м³",
    material: "Ст3, 09Г2С, нерж.",
    pressure: "До 0.07 МПа",
    temp: "-60°C / +120°C",
    desc: "Для хранения зерна, цемента, химических материалов, сыпучих продуктов",
  },
  {
    code: "BNK-H",
    name: "Горизонтальный бункер",
    volume: "5–500 м³",
    material: "Ст3, нерж. 304/316",
    pressure: "До 0.15 МПа",
    temp: "-40°C / +200°C",
    desc: "Технологические накопители, промежуточные ёмкости производственных линий",
  },
  {
    code: "BNK-S",
    name: "Специализированный",
    volume: "По заданию",
    material: "Любой сплав",
    pressure: "До 1.6 МПа",
    temp: "-196°C / +450°C",
    desc: "Нестандартные решения: взрывозащита, теплоизоляция, обогрев, вибраторы",
  },
];

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function Index() {
  const [activeSection, setActiveSection] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState(0);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { threshold: 0.3 }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ── NAVBAR ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 border-b"
        style={{
          background: "rgba(14,16,20,0.92)",
          backdropFilter: "blur(12px)",
          borderColor: "rgba(255,255,255,0.06)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 flex items-center justify-center border"
              style={{ borderColor: "hsl(35,90%,55%)", background: "rgba(245,158,11,0.1)" }}
            >
              <Icon name="Box" size={16} style={{ color: "hsl(35,90%,55%)" }} />
            </div>
            <div>
              <div
                className="font-bold text-sm tracking-widest uppercase"
                style={{ fontFamily: "'Oswald', sans-serif", color: "hsl(35,90%,55%)" }}
              >
                СтальПром
              </div>
              <div
                className="tracking-widest uppercase"
                style={{ color: "hsl(210,10%,45%)", fontSize: "0.6rem" }}
              >
                Промышленные бункеры
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className={`nav-link ${activeSection === s.id ? "text-amber-500" : ""}`}
              >
                {s.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <a
              href="tel:+74951234567"
              className="hidden md:flex items-center gap-2 text-sm font-mono"
              style={{ color: "hsl(35,90%,55%)" }}
            >
              <Icon name="Phone" size={14} />
              +7 (495) 123-45-67
            </a>
            <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
              <Icon name={menuOpen ? "X" : "Menu"} size={22} style={{ color: "hsl(35,90%,55%)" }} />
            </button>
          </div>
        </div>

        {menuOpen && (
          <div
            className="md:hidden border-t px-6 py-4 space-y-4"
            style={{ background: "rgba(14,16,20,0.98)", borderColor: "rgba(255,255,255,0.06)" }}
          >
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className="block nav-link py-2 text-left w-full"
              >
                {s.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center bg-grid scanlines"
        style={{ paddingTop: 80 }}
      >
        <div className="absolute inset-0 z-0">
          <img
            src="https://cdn.poehali.dev/projects/c2d525ca-8f5d-49ba-aa94-024ab23330c0/files/06fb7d6c-1eda-4e14-8fe7-02080af92685.jpg"
            alt="Промышленные бункеры"
            className="w-full h-full object-cover"
            style={{ opacity: 0.12 }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(14,16,20,0.98) 0%, rgba(14,16,20,0.7) 50%, rgba(14,16,20,0.85) 100%)",
            }}
          />
        </div>

        <div
          className="absolute left-0 top-0 bottom-0 w-1"
          style={{
            background: "linear-gradient(180deg, transparent, hsl(35,90%,55%), transparent)",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in-left">
              <div className="tag-industrial mb-6">
                Производство с 1998 года · ГОСТ Р 52630-2012
              </div>
              <h1
                className="text-5xl md:text-7xl font-bold uppercase mb-6"
                style={{ fontFamily: "'Oswald', sans-serif", lineHeight: 0.95 }}
              >
                Промышленные
                <br />
                <span className="text-glow-amber" style={{ color: "hsl(35,90%,55%)" }}>
                  бункеры
                </span>
                <br />
                и силосы
              </h1>
              <p
                className="text-base md:text-lg mb-8 leading-relaxed"
                style={{ color: "hsl(210,12%,65%)", maxWidth: 480 }}
              >
                Проектирование и производство металлоконструкций для промышленного хранения.
                Объём от 5 до 5000 м³. Срок изготовления от 14 рабочих дней.
              </p>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => scrollTo("calculator")}
                  className="px-8 py-3 font-semibold uppercase tracking-widest text-sm transition-all duration-200 hover:opacity-90 glow-amber"
                  style={{
                    background: "hsl(35,90%,55%)",
                    color: "hsl(220,15%,7%)",
                    fontFamily: "'Oswald', sans-serif",
                  }}
                >
                  Рассчитать объём
                </button>
                <button
                  onClick={() => scrollTo("products")}
                  className="px-8 py-3 font-semibold uppercase tracking-widest text-sm transition-all duration-200 border hover:border-amber-500"
                  style={{
                    fontFamily: "'Oswald', sans-serif",
                    color: "hsl(210,20%,92%)",
                    borderColor: "rgba(255,255,255,0.2)",
                    background: "transparent",
                  }}
                >
                  Каталог продукции
                </button>
              </div>

              <div
                className="grid grid-cols-3 gap-6 mt-12 pt-10 border-t"
                style={{ borderColor: "rgba(255,255,255,0.07)" }}
              >
                {[
                  { val: "1200+", label: "Объектов сдано" },
                  { val: "26 лет", label: "На рынке" },
                  { val: "5000 м³", label: "Макс. объём" },
                ].map((s, i) => (
                  <div key={i}>
                    <div
                      className="text-2xl font-bold"
                      style={{ fontFamily: "'Oswald', sans-serif", color: "hsl(35,90%,55%)" }}
                    >
                      {s.val}
                    </div>
                    <div
                      className="text-xs uppercase tracking-widest mt-1"
                      style={{ color: "hsl(210,10%,50%)" }}
                    >
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center animate-slide-in-right animate-float">
              <BunkerModel />
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <div
            className="text-xs font-mono uppercase tracking-widest animate-pulse-amber"
            style={{ color: "hsl(210,10%,40%)" }}
          >
            Прокрутите
          </div>
          <div
            className="w-px h-12 animate-pulse-amber"
            style={{ background: "linear-gradient(180deg, rgba(245,158,11,0.5), transparent)" }}
          />
        </div>
      </section>

      {/* ── О ПРОИЗВОДСТВЕ ── */}
      <section id="production" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="tag-industrial mb-6">О производстве</div>
              <h2
                className="text-4xl md:text-5xl uppercase font-bold mb-6"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                Инженерное
                <br />
                <span style={{ color: "hsl(35,90%,55%)" }}>мастерство</span>
              </h2>
              <p className="mb-6 leading-relaxed" style={{ color: "hsl(210,12%,65%)" }}>
                Наш завод оснащён современным оборудованием для плазменной, лазерной резки и
                роботизированной сварки. Контроль качества на каждом этапе — от подбора металла
                до выходного контроля.
              </p>
              <p className="mb-8 leading-relaxed" style={{ color: "hsl(210,12%,65%)" }}>
                Собственное КБ разрабатывает документацию под ГОСТ, Росстандарт и международные
                стандарты. Продукция сертифицирована и поставляется с полным пакетом документации.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: "Shield", label: "ГОСТ Р 52630-2012" },
                  { icon: "Award", label: "ISO 9001:2015" },
                  { icon: "Zap", label: "Роботизированная сварка" },
                  { icon: "Layers", label: "Плазменная резка" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3 border"
                    style={{
                      borderColor: "rgba(255,255,255,0.08)",
                      background: "rgba(255,255,255,0.02)",
                    }}
                  >
                    <Icon name={item.icon} fallback="Box" size={18} style={{ color: "hsl(35,90%,55%)" }} />
                    <span className="text-sm font-mono" style={{ color: "hsl(210,12%,70%)" }}>
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <img
                src="https://cdn.poehali.dev/projects/c2d525ca-8f5d-49ba-aa94-024ab23330c0/files/b59b1ca9-fd9a-41ed-bd2a-c8855665661d.jpg"
                alt="Производство"
                className="w-full h-80 object-cover"
                style={{ filter: "grayscale(30%) contrast(1.1)" }}
              />
              <div
                className="absolute -top-3 -left-3 w-16 h-16 border-t-2 border-l-2"
                style={{ borderColor: "hsl(35,90%,55%)" }}
              />
              <div
                className="absolute -bottom-3 -right-3 w-16 h-16 border-b-2 border-r-2"
                style={{ borderColor: "hsl(35,90%,55%)" }}
              />
              <div className="absolute bottom-4 left-4 tag-industrial">
                Производственный цех · г. Москва
              </div>
            </div>
          </div>
        </div>
        <div className="divider-industrial mt-24" />
      </section>

      {/* ── ПРОДУКЦИЯ ── */}
      <section id="products" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <div className="tag-industrial mb-6">Продукция</div>
            <h2
              className="text-4xl md:text-5xl uppercase font-bold"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              Линейка изделий
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.map((p, i) => (
              <div
                key={i}
                className="product-card border p-6"
                style={{
                  background: activeProduct === i ? "rgba(245,158,11,0.05)" : "rgba(255,255,255,0.02)",
                  borderColor:
                    activeProduct === i ? "hsl(35,90%,55%)" : "rgba(255,255,255,0.08)",
                }}
                onClick={() => setActiveProduct(i)}
              >
                <div className="font-mono text-xs mb-3" style={{ color: "hsl(35,90%,55%)" }}>
                  {p.code}
                </div>
                <h3
                  className="text-xl font-bold uppercase mb-3"
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                >
                  {p.name}
                </h3>
                <p className="text-sm mb-4" style={{ color: "hsl(210,12%,60%)" }}>
                  {p.desc}
                </p>
                <div className="space-y-2">
                  <div className="spec-row" style={{ fontSize: "0.75rem", paddingTop: 4, paddingBottom: 4 }}>
                    <span style={{ color: "hsl(210,10%,50%)" }}>Объём</span>
                    <span style={{ color: "hsl(35,90%,55%)" }}>{p.volume}</span>
                  </div>
                  <div className="spec-row" style={{ fontSize: "0.75rem", paddingTop: 4, paddingBottom: 4 }}>
                    <span style={{ color: "hsl(210,10%,50%)" }}>Материал</span>
                    <span style={{ color: "hsl(35,90%,55%)" }}>{p.material}</span>
                  </div>
                </div>
                {activeProduct === i && (
                  <div className="mt-4 text-xs font-mono" style={{ color: "hsl(35,90%,55%)" }}>
                    ▶ Подробнее в спецификациях ↓
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="divider-industrial mt-24" />
      </section>

      {/* ── ТЕХНИЧЕСКИЕ СПЕЦИФИКАЦИИ ── */}
      <section id="specs" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <div className="tag-industrial mb-6">Технические характеристики</div>
            <h2
              className="text-4xl md:text-5xl uppercase font-bold"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              {products[activeProduct].code} ·{" "}
              <span style={{ color: "hsl(35,90%,55%)" }}>{products[activeProduct].name}</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <div
                className="text-xs font-mono uppercase tracking-widest mb-6"
                style={{ color: "hsl(35,90%,55%)" }}
              >
                // Основные параметры
              </div>
              {[
                { label: "Объём", value: products[activeProduct].volume },
                { label: "Материал корпуса", value: products[activeProduct].material },
                { label: "Рабочее давление", value: products[activeProduct].pressure },
                { label: "Рабочая температура", value: products[activeProduct].temp },
                { label: "Исполнение", value: "Напольное, на опорах, встраиваемое" },
                { label: "Монтаж", value: "Секционный или цельносварной" },
              ].map((row, i) => (
                <div key={i} className="spec-row">
                  <span style={{ color: "hsl(210,10%,55%)" }}>{row.label}</span>
                  <span
                    className="font-mono text-right"
                    style={{ color: "hsl(210,20%,88%)", maxWidth: "55%" }}
                  >
                    {row.value}
                  </span>
                </div>
              ))}
            </div>

            <div>
              <div
                className="text-xs font-mono uppercase tracking-widest mb-6"
                style={{ color: "hsl(35,90%,55%)" }}
              >
                // Опции и комплектация
              </div>
              {[
                { label: "Люк-лаз", value: "Ø400, Ø500, Ø600" },
                { label: "Предохранительный клапан", value: "По заявке" },
                { label: "Уровнемер", value: "Ультразвуковой / реечный" },
                { label: "Теплоизоляция", value: "100–200 мм минвата" },
                { label: "Покрытие внутреннее", value: "Эпоксид, нерж. футеровка" },
                { label: "Поверхностная обработка", value: "Дробеструйная Sa2.5" },
              ].map((row, i) => (
                <div key={i} className="spec-row">
                  <span style={{ color: "hsl(210,10%,55%)" }}>{row.label}</span>
                  <span
                    className="font-mono text-right"
                    style={{ color: "hsl(210,20%,88%)", maxWidth: "55%" }}
                  >
                    {row.value}
                  </span>
                </div>
              ))}

              <div
                className="mt-8 p-4 border"
                style={{
                  borderColor: "rgba(245,158,11,0.3)",
                  background: "rgba(245,158,11,0.04)",
                }}
              >
                <div
                  className="text-xs font-mono uppercase tracking-widest mb-2"
                  style={{ color: "hsl(35,90%,55%)" }}
                >
                  Срок изготовления
                </div>
                <div
                  className="text-2xl font-bold"
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                >
                  14–60 рабочих дней
                </div>
                <div className="text-sm mt-1" style={{ color: "hsl(210,12%,55%)" }}>
                  в зависимости от объёма и комплектации
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="divider-industrial mt-24" />
      </section>

      {/* ── КАЛЬКУЛЯТОР ── */}
      <section id="calculator" className="py-24 relative bg-grid">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <div className="tag-industrial mb-6">Калькулятор</div>
            <h2
              className="text-4xl md:text-5xl uppercase font-bold"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              Расчёт объёма
              <br />
              <span style={{ color: "hsl(35,90%,55%)" }}>бункера</span>
            </h2>
          </div>
          <div
            className="border p-8"
            style={{
              borderColor: "rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.02)",
            }}
          >
            <Calculator />
          </div>
        </div>
        <div className="divider-industrial mt-24" />
      </section>

      {/* ── КОНТАКТЫ ── */}
      <section id="contacts" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <div className="tag-industrial mb-6">Контакты</div>
            <h2
              className="text-4xl md:text-5xl uppercase font-bold"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              Обсудим
              <br />
              <span style={{ color: "hsl(35,90%,55%)" }}>ваш проект</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-4">
              {[
                {
                  icon: "Phone",
                  label: "Телефон",
                  value: "+7 (495) 123-45-67",
                  sub: "Пн–Пт, 8:00–18:00 МСК",
                },
                {
                  icon: "Mail",
                  label: "Email",
                  value: "info@stalprom.ru",
                  sub: "Ответим в течение 2 часов",
                },
                {
                  icon: "MapPin",
                  label: "Адрес завода",
                  value: "Московская обл., г. Люберцы",
                  sub: "ул. Промышленная, 14",
                },
                {
                  icon: "Clock",
                  label: "Режим работы",
                  value: "Пн–Пт: 8:00–18:00",
                  sub: "Суббота по предварительной записи",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 p-4 border"
                  style={{
                    borderColor: "rgba(255,255,255,0.07)",
                    background: "rgba(255,255,255,0.02)",
                  }}
                >
                  <div
                    className="flex-shrink-0 w-10 h-10 flex items-center justify-center border"
                    style={{
                      borderColor: "hsl(35,90%,55%)",
                      background: "rgba(245,158,11,0.08)",
                    }}
                  >
                    <Icon name={item.icon} fallback="Box" size={18} style={{ color: "hsl(35,90%,55%)" }} />
                  </div>
                  <div>
                    <div
                      className="text-xs font-mono uppercase tracking-widest mb-1"
                      style={{ color: "hsl(210,10%,50%)" }}
                    >
                      {item.label}
                    </div>
                    <div
                      className="font-semibold"
                      style={{ fontFamily: "'Oswald', sans-serif" }}
                    >
                      {item.value}
                    </div>
                    <div className="text-xs mt-1" style={{ color: "hsl(210,12%,55%)" }}>
                      {item.sub}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div
              className="border p-8"
              style={{
                borderColor: "rgba(255,255,255,0.08)",
                background: "rgba(255,255,255,0.02)",
              }}
            >
              <div
                className="text-xs font-mono uppercase tracking-widest mb-6"
                style={{ color: "hsl(35,90%,55%)" }}
              >
                // Оставить заявку
              </div>
              <div className="space-y-4">
                {[
                  { label: "Имя и организация", placeholder: "ООО «Агропром», Иван Петров" },
                  { label: "Телефон", placeholder: "+7 (___) ___-__-__" },
                  { label: "Email", placeholder: "ivan@company.ru" },
                ].map((field, i) => (
                  <div key={i}>
                    <label
                      className="text-xs font-mono uppercase tracking-widest block mb-2"
                      style={{ color: "hsl(210,10%,50%)" }}
                    >
                      {field.label}
                    </label>
                    <input type="text" placeholder={field.placeholder} className="calc-input" />
                  </div>
                ))}
                <div>
                  <label
                    className="text-xs font-mono uppercase tracking-widest block mb-2"
                    style={{ color: "hsl(210,10%,50%)" }}
                  >
                    Описание задачи
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Опишите требуемый объём, материал, условия эксплуатации..."
                    className="calc-input resize-none"
                    style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "0.875rem" }}
                  />
                </div>
                <button
                  className="w-full py-4 font-bold uppercase tracking-widest transition-all duration-200 hover:opacity-90 glow-amber"
                  style={{
                    background: "hsl(35,90%,55%)",
                    color: "hsl(220,15%,7%)",
                    fontFamily: "'Oswald', sans-serif",
                    letterSpacing: "0.15em",
                  }}
                >
                  Отправить заявку
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        className="border-t py-8"
        style={{ borderColor: "rgba(255,255,255,0.06)", background: "rgba(10,12,16,0.8)" }}
      >
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className="w-6 h-6 flex items-center justify-center border"
              style={{ borderColor: "hsl(35,90%,55%)", background: "rgba(245,158,11,0.1)" }}
            >
              <Icon name="Box" size={12} style={{ color: "hsl(35,90%,55%)" }} />
            </div>
            <span
              className="font-bold text-sm tracking-widest uppercase"
              style={{ fontFamily: "'Oswald', sans-serif", color: "hsl(35,90%,55%)" }}
            >
              СтальПром
            </span>
          </div>
          <div className="text-xs font-mono" style={{ color: "hsl(210,10%,40%)" }}>
            © 2024 ООО «СтальПром» · ОГРН 1027700000000 · Все права защищены
          </div>
          <div className="text-xs font-mono" style={{ color: "hsl(210,10%,40%)" }}>
            Лицензия на производство сосудов давления
          </div>
        </div>
      </footer>
    </div>
  );
}