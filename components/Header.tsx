import { profile } from "@/lib/content";

const links = [
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#stack", label: "Stack" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line/70 bg-night/60 backdrop-blur-md">
      <div className="absolute inset-x-0 bottom-[-1px] h-px overflow-hidden">
        <div
          data-progress
          className="h-full origin-left scale-x-0 bg-gradient-to-r from-crimson via-ember to-crimson shadow-[0_0_12px_2px_rgb(230_46_58/0.8)]"
        />
      </div>
      <div className="mx-auto flex max-w-[1240px] items-center justify-between px-6 py-3">
        <a href="#top" className="flex items-center gap-3" aria-label="Back to top">
          <span lang="ja" className="font-jp flex h-9 w-9 items-center justify-center rounded-[5px] bg-crimson text-xl text-bone">
            忍
          </span>
          <span className="mono-label hidden !text-bone sm:inline">Taimul H. Pathan</span>
        </a>
        <nav aria-label="Main" className="flex items-center gap-5 text-sm md:gap-8">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="slash-link hidden text-steel transition-colors hover:text-bone md:inline-block">
              {l.label}
            </a>
          ))}
          <a
            href={profile.resume}
            download
            className="rounded-full border border-crimson px-4 py-1.5 text-bone transition-colors hover:bg-crimson"
          >
            Resume
          </a>
        </nav>
      </div>
    </header>
  );
}
