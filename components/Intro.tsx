"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const HALF_A = "polygon(0 0, 100% 0, 0 100%)";
const HALF_B = "polygon(100% 0, 100% 100%, 0 100%)";

export default function Intro() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const hide = () => {
      el.style.display = "none";
      document.documentElement.style.overflow = "";
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      hide();
      return;
    }

    document.documentElement.style.overflow = "hidden";
    gsap.ticker.lagSmoothing(0);
    const bail = window.setTimeout(hide, 4500);
    const q = gsap.utils.selector(el);
    const tl = gsap.timeline({ onComplete: hide });
    tl.from(q("[data-seal]"), { scale: 0.6, autoAlpha: 0, duration: 0.5, ease: "back.out(2)" })
      .from(q("[data-name]"), { autoAlpha: 0, y: 10, duration: 0.4 }, "<0.15")
      .fromTo(
        q("[data-blade]"),
        { attr: { x2: 105, y2: -5 }, autoAlpha: 1 },
        { attr: { x2: -5, y2: 105 }, duration: 0.28, ease: "power4.in" },
        "+=0.15",
      )
      .to(q("[data-flash]"), { autoAlpha: 1, duration: 0.05 })
      .to(q("[data-flash]"), { autoAlpha: 0, duration: 0.3 })
      .to(q("[data-half-a]"), { xPercent: -8, yPercent: -8, autoAlpha: 0, duration: 0.8, ease: "power4.in" }, "<")
      .to(q("[data-half-b]"), { xPercent: 8, yPercent: 8, autoAlpha: 0, duration: 0.8, ease: "power4.in" }, "<")
      .to(q("[data-seal], [data-name], [data-blade]"), { autoAlpha: 0, duration: 0.2 }, "<");

    return () => {
      window.clearTimeout(bail);
      tl.kill();
      document.documentElement.style.overflow = "";
    };
  }, []);

  return (
    <div ref={root} className="intro fixed inset-0 z-[100]" aria-hidden="true">
      <div data-half-a className="absolute inset-0 bg-[#050509]" style={{ clipPath: HALF_A }} />
      <div data-half-b className="absolute inset-0 bg-[#050509]" style={{ clipPath: HALF_B }} />
      <div data-flash className="absolute inset-0 bg-bone opacity-0" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
        <div
          data-seal
          className="font-jp flex h-24 w-24 items-center justify-center rounded-md bg-crimson text-6xl text-bone shadow-[0_0_60px_rgb(230_46_58/0.55)]"
        >
          忍
        </div>
        <p data-name className="mono-label !text-bone">
          Taimul Haque Pathan
        </p>
      </div>
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <line
          data-blade
          x1="105"
          y1="-5"
          x2="105"
          y2="-5"
          stroke="#fff"
          strokeWidth="0.6"
          vectorEffect="non-scaling-stroke"
          style={{ filter: "drop-shadow(0 0 6px #e62e3a)" }}
        />
      </svg>
    </div>
  );
}
