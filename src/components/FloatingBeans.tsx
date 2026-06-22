import { CoffeeBean } from "./CoffeeBean";

type Bean = { left: string; top: string; size: number; delay: string; duration: string; rotate: number };

const BEANS: Bean[] = Array.from({ length: 14 }).map((_, i) => {
  const seed = i * 9301 + 49297;
  const r = (n: number) => (Math.sin(seed * (n + 1)) + 1) / 2;
  return {
    left: `${r(1) * 100}%`,
    top: `${r(2) * 100}%`,
    size: 22 + r(3) * 46,
    delay: `${r(4) * -8}s`,
    duration: `${6 + r(5) * 6}s`,
    rotate: r(6) * 360,
  };
});

export function FloatingBeans({ density = 1 }: { density?: number }) {
  const beans = BEANS.slice(0, Math.round(BEANS.length * density));
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {beans.map((b, i) => (
        <div
          key={i}
          className="absolute animate-float"
          style={{
            left: b.left,
            top: b.top,
            animationDelay: b.delay,
            animationDuration: b.duration,
            transform: `rotate(${b.rotate}deg)`,
            filter: "drop-shadow(0 12px 16px rgba(0,0,0,0.45))",
          }}
        >
          <CoffeeBean size={b.size} />
        </div>
      ))}
    </div>
  );
}