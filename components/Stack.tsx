import { stack } from "@/lib/content";
import SectionTitle from "./SectionTitle";

export default function Stack() {
  return (
    <section id="stack" className="relative scroll-mt-16 py-20 md:py-32">
      <div className="mx-auto max-w-[1240px] px-6">
        <SectionTitle kanji="術" label="Tools I reach for" title="Stack" />
        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {stack.map((g) => (
            <div
              key={g.label}
              data-reveal
              className="rounded-xl border border-line bg-panel/80 p-6 backdrop-blur-sm transition-colors hover:border-crimson/60 md:p-8"
            >
              <h3 className="display text-2xl">{g.label}</h3>
              <ul className="mt-5 flex flex-wrap gap-2">
                {g.items.map((i) => (
                  <li
                    key={i}
                    className="rounded-full border border-line px-3 py-1 font-mono text-xs text-bone/85 transition-all hover:-translate-y-0.5 hover:border-crimson hover:text-bone"
                  >
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
