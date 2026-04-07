export function BlastDoor({ size = 200 }: { size?: number }) {
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

export function RadiationSymbol({ size = 80, pulse = false }: { size?: number; pulse?: boolean }) {
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
