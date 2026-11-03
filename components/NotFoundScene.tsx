"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const TOP = "polygon(0 0, 100% 0, 100% 31%, 0 71%)";
const BOTTOM = "polygon(0 70%, 100% 30%, 100% 100%, 0 100%)";

function Digits({ layer }: { layer: "top" | "bottom" }) {
  return (
    <div
      aria-hidden="true"
      data-layer={layer}
      className="display col-start-1 row-start-1 flex select-none justify-center text-[clamp(5rem,26vw,16rem)] leading-none"
      style={{ clipPath: layer === "top" ? TOP : BOTTOM }}
    >
      {["4", "0", "4"].map((c, i) => (
        <span key={i} data-ch className={`inline-block will-change-transform ${i === 1 ? "text-crimson" : ""}`}>
          {c}
        </span>
      ))}
    </div>
  );
}

/** Animated 404: the digits drop in, a shuriken slices through them, they split apart and heal, again and again. */
export default function NotFoundScene() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const q = gsap.utils.selector(el);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const star = q("[data-star]");
    const cut = q("[data-cut]");
    const flash = q("[data-flash]");
    const chars = q("[data-ch]");
    const top = q("[data-layer=top]");
    const bottom = q("[data-layer=bottom]");
    const embers = q("[data-ember]");
    const kanji = q("[data-kanji]");
    const copy = q("[data-copy]");

    if (reduce) {
      gsap.set(cut, { opacity: 0 });
      gsap.set(star, { opacity: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(cut, { strokeDasharray: 1, strokeDashoffset: 1, opacity: 0 });
      gsap.set(star, { opacity: 0 });
      gsap.set(flash, { opacity: 0 });

      // entrance
      const intro = gsap.timeline();
      intro
        .from(chars, { y: -140, opacity: 0, rotationX: -80, duration: 0.8, stagger: 0.12, ease: "bounce.out", transformPerspective: 600 })
        .from(copy, { y: 24, opacity: 0, duration: 0.7, stagger: 0.12, ease: "power3.out" }, "-=0.3");

      // the cut, on repeat
      const slice = () => {
        const tl = gsap.timeline({ delay: 0 });
        tl.set(star, { opacity: 1, left: "-12%", top: "76%", rotation: 0 })
          .to(star, { left: "112%", top: "24%", rotation: 1080, duration: 0.9, ease: "power2.in" })
          .to(cut, { strokeDashoffset: 0, opacity: 1, duration: 0.9, ease: "power2.in" }, 0)
          .to(flash, { opacity: 1, duration: 0.05 }, 0.72)
          .to(flash, { opacity: 0, duration: 0.5 }, 0.77)
          .to(top, { x: 26, y: -16, rotation: 1.5, duration: 0.14, ease: "power4.out" }, 0.45)
          .to(bottom, { x: -26, y: 16, rotation: -1.5, duration: 0.14, ease: "power4.out" }, 0.45)
          .to(star, { opacity: 0, duration: 0.15 }, 0.9)
          .to(cut, { opacity: 0, duration: 0.6, ease: "power1.out" }, 1.0)
          .to([top, bottom], { x: 0, y: 0, rotation: 0, duration: 1.1, ease: "elastic.out(1, 0.45)" }, 1.3)
          .set(cut, { strokeDashoffset: 1 });
        return tl;
      };
      const loop = gsap.timeline({ repeat: -1, repeatDelay: 2.6, delay: 1.9, repeatRefresh: false });
      loop.add(slice());

      // ambient: embers drift up, the kanji breathes
      embers.forEach((e, i) => {
        gsap.set(e, { x: gsap.utils.random(-45, 45) + "vw", y: gsap.utils.random(0, 40) + "vh", scale: gsap.utils.random(0.5, 1.6) });
        gsap.to(e, {
          y: "-=60vh",
          x: "+=" + gsap.utils.random(-8, 8) + "vw",
          opacity: 0,
          duration: gsap.utils.random(5, 10),
          repeat: -1,
          delay: i * 0.3,
          ease: "none",
        });
      });
      gsap.to(kanji, { scale: 1.06, rotation: 2, duration: 4, yoyo: true, repeat: -1, ease: "sine.inOut" });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="relative w-full text-center">
      <span
        aria-hidden="true"
        lang="ja"
        data-kanji
        className="font-jp pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none text-[28rem] leading-none text-crimson/[0.07] md:text-[44rem]"
      >
        消
      </span>

      {/* embers */}
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 h-0 w-0">
        {Array.from({ length: 22 }, (_, i) => (
          <span
            key={i}
            data-ember
            className={`absolute h-1.5 w-1.5 rounded-full ${i % 3 === 0 ? "bg-bone" : "bg-crimson"} shadow-[0_0_8px_2px_rgb(230_46_58/0.6)]`}
          />
        ))}
      </div>

      <p data-copy className="mono-label flex items-center justify-center gap-3">
        <span className="star text-crimson" />
        Error 404
      </p>

      <h1 className="relative mt-6" aria-label="404">
        <div className="relative grid">
          <Digits layer="top" />
          <Digits layer="bottom" />
          {/* the cut line and the star that makes it */}
          <svg
            aria-hidden="true"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
          >
            <line
              data-cut
              x1="0"
              y1="70"
              x2="100"
              y2="30"
              pathLength={1}
              stroke="#ff8d95"
              strokeWidth="3"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              style={{ filter: "drop-shadow(0 0 8px #e62e3a)" }}
            />
          </svg>
          <div
            data-flash
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 h-40 w-[120%] -translate-x-1/2 -translate-y-1/2 -rotate-[12deg] bg-[radial-gradient(closest-side,rgb(255_160_165/0.5),transparent)]"
          />
          <svg
            data-star
            aria-hidden="true"
            viewBox="-12 -12 24 24"
            className="pointer-events-none absolute h-14 w-14 -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_0_10px_rgb(230_46_58/0.8)] md:h-20 md:w-20"
          >
            <path
              d="M0 -11 Q1.6 -1.6 11 0 Q1.6 1.6 0 11 Q-1.6 1.6 -11 0 Q-1.6 -1.6 0 -11 Z M0 -2 a2 2 0 1 0 0.01 0 Z"
              fillRule="evenodd"
              fill="#aab3c7"
              stroke="#e62e3a"
              strokeWidth="0.8"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </h1>

      <p data-copy className="mx-auto mt-6 max-w-[34ch] text-xl leading-snug text-bone/90 md:text-2xl">
        This page vanished into the shadows.
      </p>
      <p data-copy className="mt-3 text-steel">
        The link may be broken, or the page may have moved.
      </p>

      <div data-copy className="mt-10 flex flex-wrap items-center justify-center gap-4">
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
  );
}
