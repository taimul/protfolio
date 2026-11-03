import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  description: "This page does not exist.",
};

export default function NotFound() {
  return (
    <main
      id="main"
      className="relative flex min-h-svh items-center justify-center overflow-hidden px-6 py-24"
    >
      <span
        aria-hidden="true"
        lang="ja"
        className="font-jp pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none text-[28rem] leading-none text-crimson/[0.07] md:text-[44rem]"
      >
        消
      </span>

      <div className="relative text-center">
        <p className="mono-label flex items-center justify-center gap-3">
          <span className="star text-crimson" />
          Error 404
        </p>
        <h1 className="display mt-6 text-[clamp(5rem,26vw,16rem)] leading-none">
          4<span className="text-crimson">0</span>4
        </h1>
        <p className="mx-auto mt-6 max-w-[34ch] text-xl leading-snug text-bone/90 md:text-2xl">
          This page vanished into the shadows.
        </p>
        <p className="mt-3 text-steel">The link may be broken, or the page may have moved.</p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="rounded-full bg-crimson px-7 py-3.5 font-medium text-bone shadow-[0_0_40px_rgb(230_46_58/0.45)] transition-transform hover:-translate-y-0.5"
          >
            Back to home
          </Link>
          <Link
            href="/#work"
            className="rounded-full border border-line px-7 py-3.5 text-bone transition-colors hover:border-bone"
          >
            See shipped work
          </Link>
        </div>
      </div>
    </main>
  );
}
