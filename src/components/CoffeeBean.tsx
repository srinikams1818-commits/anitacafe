type Props = { className?: string; size?: number };

export function CoffeeBean({ className, size = 40 }: Props) {
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={className}
      aria-hidden
    >
      <defs>
        <radialGradient id="bean-g" cx="35%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#7a4a25" />
          <stop offset="55%" stopColor="#4a2613" />
          <stop offset="100%" stopColor="#22100a" />
        </radialGradient>
      </defs>
      <ellipse cx="32" cy="32" rx="22" ry="28" fill="url(#bean-g)" transform="rotate(20 32 32)" />
      <path
        d="M20 14 C 34 24, 30 40, 44 50"
        stroke="#1a0a06"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        transform="rotate(20 32 32)"
        opacity="0.9"
      />
      <ellipse cx="24" cy="22" rx="3" ry="6" fill="#ffffff" opacity="0.12" transform="rotate(20 32 32)" />
    </svg>
  );
}