export default function Logo() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full drop-shadow-md"
    >
      {/* Background Circular Luxury Emblem */}
      <circle cx="50" cy="50" r="48" fill="url(#grad1)" />
      <circle cx="50" cy="50" r="45" fill="none" stroke="#D4AF37" strokeWidth="1" strokeDasharray="4 2" />
      <circle cx="50" cy="50" r="41" fill="none" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="0.5" />

      {/* Crown */}
      <path
        d="M38 25 L41 18 L50 22 L59 18 L62 25 L58 28 L42 28 Z"
        fill="#D4AF37"
      />
      <circle cx="41" cy="17" r="1.5" fill="#fff" />
      <circle cx="50" cy="21" r="1.5" fill="#fff" />
      <circle cx="59" cy="17" r="1.5" fill="#fff" />

      {/* Feminine Silhouette / Face Outline (Profile) */}
      <path
        d="M50 32 C 45 32, 42 37, 42 42 C 42 45, 43 47, 45 49 C 43 51, 41 54, 41 57 C 41 62, 45 66, 50 66"
        fill="none"
        stroke="#ffffff"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      
      {/* Eye/Lash */}
      <path d="M44 41 C 45 40, 47 40, 48 41" fill="none" stroke="#ffffff" strokeWidth="1" />

      {/* Lips */}
      <path d="M43 49 C 44 48, 45 48, 46 49" fill="none" stroke="#F8BBD0" strokeWidth="1.5" />

      {/* Flowing Hair forming 'S' */}
      <path
        d="M50 32 C 60 32, 65 40, 58 48 C 50 56, 62 65, 55 75 C 50 82, 40 80, 35 75"
        fill="none"
        stroke="url(#grad2)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M53 35 C 65 37, 68 45, 60 52 C 55 58, 65 67, 58 73"
        fill="none"
        stroke="url(#grad2)"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.8"
      />

      {/* Scissors integrated elegantly */}
      <g transform="translate(62, 50) rotate(45) scale(0.6)">
        <circle cx="0" cy="0" r="4" fill="none" stroke="#D4AF37" strokeWidth="2" />
        <circle cx="0" cy="12" r="4" fill="none" stroke="#D4AF37" strokeWidth="2" />
        <path d="M 0 4 L 15 25" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" />
        <path d="M 0 8 L 15 -13" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" />
        <circle cx="6" cy="6" r="1" fill="#fff" />
      </g>

      {/* Makeup Brush */}
      <g transform="translate(35, 30) rotate(-30) scale(0.5)">
        <path d="M 0 0 L 0 15 L 8 15 L 8 0 Z" fill="#D4AF37" />
        <path d="M 0 0 C -2 -5, -4 -10, 4 -12 C 12 -10, 10 -5, 8 0 Z" fill="#F8BBD0" />
        <path d="M 2 15 L 2 30 L 6 30 L 6 15 Z" fill="#fff" />
      </g>

      {/* Nail Polish Bottle */}
      <g transform="translate(30, 60) rotate(15) scale(0.5)">
        <rect x="0" y="10" width="12" height="15" rx="3" fill="#B388FF" />
        <rect x="3" y="0" width="6" height="10" fill="#333" />
        <path d="M 6 -5 L 6 0" stroke="#333" strokeWidth="2" />
        {/* Glow on bottle */}
        <path d="M 2 12 L 2 23" stroke="#fff" strokeWidth="1" opacity="0.5" />
      </g>

      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F8BBD0" />
          <stop offset="50%" stopColor="#B388FF" />
          <stop offset="100%" stopColor="#E6D6FF" />
        </linearGradient>
        <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#ffffff" />
        </linearGradient>
      </defs>
    </svg>
  );
}
