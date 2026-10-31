import Image from "next/image";
import { earlier, live, otherWork, profile } from "@/lib/content";
import SectionTitle from "./SectionTitle";

export default function Work() {
  return (
    <section id="work" className="relative scroll-mt-16 py-20 md:py-32">
      <div className="mx-auto max-w-[1240px] px-6">
        <SectionTitle kanji="刃" label="Shipped and live" title="Shipped work" />
        <p className="mt-6 max-w-[48ch] text-lg text-steel">
          Six products running in production. Click a frame to open the live site.
        </p>

        <ul className="mt-16 space-y-24 md:space-y-36">
          {live.map((p, i) => (
            <li key={p.name} className="grid items-center gap-8 md:grid-cols-12 md:gap-12">
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                data-tilt
                tabIndex={-1}
                aria-hidden="true"
                className={`group relative block min-w-0 md:col-span-7 ${i % 2 ? "md:order-2" : ""}`}
              >
                <div
                  data-slash
                  data-tilt-frame
                  className="relative overflow-hidden rounded-xl border border-line bg-panel shadow-[0_30px_90px_-20px_rgb(0_0_0/0.9),0_0_0_1px_rgb(255_255_255/0.03)]"
                >
                  <div className="flex items-center gap-2 border-b border-line bg-panel-2 px-4 py-2.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-crimson" />
                    <span className="h-2.5 w-2.5 rounded-full bg-ember/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-steel/40" />
                    <span className="mono-label ml-3 !normal-case !tracking-normal">{p.host}</span>
                  </div>
                  {p.shot ? (
                    <div className="relative aspect-[16/10] overflow-hidden bg-panel-2">
                      <Image
                        src={p.shot}
                        alt=""
                        fill
                        sizes="10vw"
                        aria-hidden="true"
                        className="scale-125 object-cover opacity-70 blur-2xl"
                      />
                      <Image
                        src={p.shot}
                        alt={`${p.name} home page`}
                        fill
                        sizes="(min-width: 768px) 58vw, 100vw"
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <div className="flex aspect-[16/10] items-center justify-center bg-[radial-gradient(circle_at_30%_20%,rgb(230_46_58/0.35),transparent_60%),linear-gradient(135deg,#141722,#0a0b11)]">
                      <span className="display px-4 text-center text-[clamp(1.2rem,5vw,3rem)] text-bone">{p.host}</span>
                    </div>
                  )}
                  <div className="frame-glare pointer-events-none absolute inset-0" />
                </div>
              </a>

              <div className="min-w-0 md:col-span-5">
                <p data-reveal className="mono-label flex flex-wrap items-center gap-x-2.5 gap-y-1">
                  <span className="live-dot" />
                  Live
                  <span aria-hidden="true">/</span>
                  {p.host}
                </p>
                <h3 data-reveal className="display mt-4 break-words text-[clamp(1.9rem,8vw,3rem)] md:text-[clamp(1.8rem,3.4vw,3rem)]">
                  {p.name}
                </h3>
                <p data-reveal className="mt-4 text-xl text-bone/90">
                  {p.kind}
                </p>
                <p data-reveal className="mt-2 text-steel">
                  {p.scope}
                </p>
                <ul data-reveal className="mt-5 flex flex-wrap gap-2">
                  {p.stack.split(", ").map((s) => (
                    <li key={s} className="rounded-full border border-line px-3 py-1 font-mono text-xs text-steel">
                      {s}
                    </li>
                  ))}
                </ul>
                <a
                  data-reveal
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="slash-link mt-8 inline-flex items-center gap-2 font-medium text-bone"
                >
                  Open live site <span aria-hidden="true">↗</span>
                  <span className="sr-only"> for {p.name} (opens in a new tab)</span>
                </a>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-28 grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <h3 data-slash className="display text-3xl md:text-5xl">
              Earlier work
            </h3>
          </div>
          <ul className="md:col-span-7">
            {earlier.map((e) => (
              <li key={e.name} data-reveal className="grid gap-1 border-t border-line py-5 sm:grid-cols-[1fr_auto]">
                <div>
                  <p className="display text-xl">{e.name}</p>
                  <p className="mt-1 text-steel">{e.kind}</p>
                  <p className="mt-1 font-mono text-xs text-steel/80">{e.stack}</p>
                </div>
                <p className="mono-label sm:text-right">{e.period}</p>
              </li>
            ))}
            <li className="border-t border-line" />
          </ul>
        </div>

      </div>

      <div className="mt-28">
        <div className="mx-auto max-w-[1240px] px-6">
          <h3 data-slash className="display text-3xl md:text-5xl">
            Also built
          </h3>
          <p data-reveal className="mt-4 max-w-[52ch] text-steel">
            {profile.projectCount} projects in total. These are some of the client and product builds
            that are not in the list above, with plenty more behind them.
          </p>
        </div>

        <div className="marquee-fade mt-10 space-y-3 overflow-hidden md:space-y-5" data-reveal>
          {[otherWork, [...otherWork].reverse()].map((names, row) => (
            <div key={row} className="marquee-wrap">
              <div className={`marquee ${row ? "reverse" : ""}`}>
                {[0, 1].map((copy) => (
                  <ul
                    key={copy}
                    aria-hidden={copy === 1 || row === 1}
                    className={`flex shrink-0 items-center ${copy === 1 ? "dup" : ""}`}
                  >
                    {names.map((w) => (
                      <li key={w} className="flex items-center gap-5 pr-5 md:gap-8 md:pr-8">
                        <span className="outline-text display whitespace-nowrap text-[clamp(1.6rem,5.5vw,3.75rem)]">
                          {w}
                        </span>
                        <span className="star text-crimson" />
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
