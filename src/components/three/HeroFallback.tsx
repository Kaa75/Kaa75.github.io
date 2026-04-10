/** Static SVG fallback when WebGL is not available */
export function HeroFallback() {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 400 400"
        className="w-[min(80vw,400px)] h-auto opacity-30"
        fill="none"
      >
        {/* Subtle geometric shape matching the 3D scene's vibe */}
        <polygon
          points="200,40 360,160 320,340 80,340 40,160"
          stroke="hsl(160, 84%, 39%)"
          strokeWidth="1"
          opacity="0.6"
        />
        <polygon
          points="200,80 320,170 290,310 110,310 80,170"
          stroke="hsl(160, 84%, 39%)"
          strokeWidth="0.5"
          opacity="0.4"
        />
        <circle
          cx="200"
          cy="200"
          r="120"
          stroke="hsl(160, 84%, 39%)"
          strokeWidth="0.5"
          opacity="0.3"
        />
        {/* Dots */}
        {Array.from({ length: 30 }).map((_, i) => {
          const angle = (i / 30) * Math.PI * 2;
          const r = 140 + (i % 3) * 20;
          return (
            <circle
              key={i}
              cx={200 + Math.cos(angle) * r}
              cy={200 + Math.sin(angle) * r}
              r="1.5"
              fill="hsl(160, 84%, 39%)"
              opacity={0.2 + (i % 3) * 0.15}
            />
          );
        })}
      </svg>
    </div>
  );
}
