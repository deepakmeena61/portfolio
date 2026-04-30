type WaveformDividerProps = {
  variant?: 1 | 2 | 3 | 4;
  idSuffix?: string;
};

const PATHS = {
  1: "M0,44 C120,16 240,72 360,44 C480,16 600,72 720,44 C840,16 960,72 1080,44 C1200,16 1320,72 1440,44",
  2: "M0,44 C90,80 180,8 270,44 C360,80 450,8 540,44 C630,80 720,8 810,44 C900,80 990,8 1080,44 C1170,80 1260,8 1350,44 C1410,64 1440,44 1440,44",
  3: "M0,44 C140,70 220,20 360,44 C500,68 580,24 720,44 C860,64 940,24 1080,44 C1220,64 1300,24 1440,44",
  4: "M0,44 C100,12 220,78 320,44 C420,10 520,80 620,44 C720,12 820,78 920,44 C1020,8 1120,82 1220,44 C1320,12 1400,70 1440,44"
} as const;

export default function WaveformDivider({ variant = 1, idSuffix = "default" }: WaveformDividerProps) {
  const gradientId = `wave-gradient-${variant}-${idSuffix}`;

  return (
    <div className="section-shell pointer-events-none relative my-14 overflow-hidden">
      <svg
        viewBox="0 0 1440 88"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
        className="h-14 w-full opacity-20"
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00d4ff" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
        </defs>
        <path
          d={PATHS[variant]}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
