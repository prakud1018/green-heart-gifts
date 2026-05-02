import { useMemo } from "react";

interface Props {
  count?: number;
}

export function HeartsBackground({ count = 35 }: Props) {
  const hearts = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 15,
        duration: 8 + Math.random() * 12,
        size: 0.8 + Math.random() * 2,
        opacity: 0.4 + Math.random() * 0.6,
      })),
    [count],
  );

  return (
    <>
      <div className="forest-bg" aria-hidden />
      <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
        {hearts.map((h) => (
          <span
            key={h.id}
            className="heart"
            style={{
              left: `${h.left}%`,
              animationDelay: `${h.delay}s`,
              animationDuration: `${h.duration}s`,
              fontSize: `${h.size}rem`,
              opacity: h.opacity,
            }}
          >
            💚
          </span>
        ))}
      </div>
    </>
  );
}
