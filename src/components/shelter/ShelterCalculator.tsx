import { useState } from "react";

export default function ShelterCalculator() {
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
