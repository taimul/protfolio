import { profile } from "@/lib/content";

export default function Contact() {
  const links = [
    { label: "GitHub", href: profile.github },
    { label: "LinkedIn", href: profile.linkedin },
    { label: "Download CV", href: profile.cv, download: true },
    { label: "Download resume", href: profile.resume, download: true },
  ];

  return (
    <section id="contact" className="relative scroll-mt-16 overflow-hidden py-24 md:py-40">
      <span
        aria-hidden="true"
        data-parallax
        className="font-jp pointer-events-none absolute right-0 top-0 select-none text-[22rem] leading-none text-crimson/[0.07]"
      >
        忍
      </span>
      <div className="relative mx-auto max-w-[1240px] px-6">
        <p className="mono-label flex items-center gap-3">
          <span className="star text-crimson" />
          Contact
        </p>
        <h2 data-slash className="display mt-5 text-[clamp(1.9rem,8.5vw,6rem)]">
          Have a product
          <br />
          to build?
        </h2>
        <a
          href={`mailto:${profile.email}`}
          data-reveal
          className="slash-link mt-10 inline-block break-all font-display text-[clamp(0.95rem,4.6vw,3rem)] text-bone transition-colors hover:text-ember"
        >
          {profile.email}
        </a>

        <ul data-reveal className="mt-14 flex flex-wrap gap-3">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                download={l.download}
                {...(l.download ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                className="inline-block rounded-full border border-line px-6 py-3 text-bone transition-all hover:-translate-y-0.5 hover:border-crimson hover:bg-crimson"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <p className="mono-label mt-24">
          © {new Date().getFullYear()} {profile.name}. Based in {profile.location}.
        </p>
      </div>
    </section>
  );
}
