const words = ["React", "Next.js", "TypeScript", "Node.js", "Payments", "Prisma", "AI products", "E-commerce", "GSAP"];

export default function Marquee() {
  const row = [...words, ...words];
  return (
    <div aria-hidden="true" className="relative z-10 -mx-4 my-6 -rotate-2 overflow-hidden bg-crimson py-4 shadow-[0_0_60px_rgb(230_46_58/0.35)]">
      <div className="marquee">
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0 items-center">
            {row.map((w, i) => (
              <span key={`${k}-${i}`} className="display flex items-center gap-6 whitespace-nowrap pr-6 text-2xl text-bone md:text-4xl">
                {w}
                <span className="star text-night" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
