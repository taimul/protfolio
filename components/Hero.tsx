import { live, profile } from "@/lib/content";

const lines = ["Taimul", "Haque", "Pathan"];

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-svh items-center overflow-hidden pt-24 pb-16">
      <div
        aria-hidden="true"
        data-parallax
        className="font-jp pointer-events-none absolute -right-6 top-1/2 -translate-y-1/2 select-none text-[34rem] leading-none text-bone/[0.03] max-md:hidden"
      >
        忍者
      </div>

      <div className="relative mx-auto w-full max-w-[1240px] px-6">
        <p data-hero-fade className="mono-label flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="star text-crimson" />
          {profile.role}
          <span aria-hidden="true">/</span>
          {profile.location}
        </p>

        <h1 className="display mt-6 text-[clamp(2.3rem,12.5vw,8.6rem)] [perspective:900px]">
          <span className="sr-only">{profile.name}</span>
          {lines.map((line, li) => (
            <span key={line} aria-hidden="true" className="block overflow-hidden pb-[0.08em]">
              {Array.from(line).map((ch, i) => (
                <span
                  key={i}
                  data-char
                  className={`inline-block will-change-transform ${li === 2 && i === line.length - 1 ? "text-crimson" : ""}`}
                >
                  {ch}
                </span>
              ))}
              {li === 2 ? <span data-char className="inline-block text-crimson">.</span> : null}
            </span>
          ))}
        </h1>

        <p data-hero-fade className="mt-8 max-w-[34ch] text-xl leading-snug text-bone/90 md:text-2xl">
          I build the websites and dashboards behind payments, online stores and AI products.
        </p>
        <p data-hero-fade className="mt-3 text-steel">
          Currently shipping at {profile.employer}.
        </p>

        <div data-hero-fade className="mt-9 flex flex-wrap items-center gap-4">
          <a
            href="#work"
            className="rounded-full bg-crimson px-7 py-3.5 font-medium text-bone shadow-[0_0_40px_rgb(230_46_58/0.45)] transition-transform hover:-translate-y-0.5"
          >
            See shipped work
          </a>
          <a
            href={profile.cv}
            download
            className="rounded-full border border-line px-7 py-3.5 text-bone transition-colors hover:border-bone"
          >
            Download CV
          </a>
        </div>

        <dl data-hero-fade className="mt-14 flex flex-wrap gap-x-12 gap-y-4">
          {[
            [String(live.length), "products live"],
            [profile.projectCount, "projects built"],
            [profile.since, "started professionally"],
          ].map(([n, l]) => (
            <div key={l}>
              <dt className="display text-3xl text-bone md:text-4xl">{n}</dt>
              <dd className="mono-label mt-1">{l}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
