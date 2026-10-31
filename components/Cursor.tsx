"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Cursor() {
  const star = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = star.current;
    if (!el) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || calm) return;

    document.documentElement.classList.add("has-cursor");
    gsap.set(el, { xPercent: -50, yPercent: -50, autoAlpha: 0 });
    const x = gsap.quickTo(el, "x", { duration: 0.18, ease: "power3" });
    const y = gsap.quickTo(el, "y", { duration: 0.18, ease: "power3" });
    const spin = gsap.to(el.firstElementChild, { rotation: 360, duration: 2.2, ease: "none", repeat: -1 });

    let idle: ReturnType<typeof setTimeout>;
    const onMove = (e: PointerEvent) => {
      gsap.to(el, { autoAlpha: 1, duration: 0.2, overwrite: "auto" });
      x(e.clientX);
      y(e.clientY);
      spin.timeScale(4);
      clearTimeout(idle);
      idle = setTimeout(() => gsap.to(spin, { timeScale: 1, duration: 0.6 }), 90);
      const hot = (e.target as HTMLElement).closest("a, button");
      gsap.to(el, { scale: hot ? 1.7 : 1, duration: 0.25, overwrite: "auto" });
    };

    const onDown = (e: PointerEvent) => {
      const flash = document.createElement("div");
      flash.className = "slash-flash";
      flash.style.left = `${e.clientX}px`;
      flash.style.top = `${e.clientY}px`;
      flash.addEventListener("animationend", () => flash.remove());
      document.body.appendChild(flash);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    return () => {
      clearTimeout(idle);
      spin.kill();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  return (
    <div ref={star} aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[80] opacity-0">
      <div className="star h-7 w-7 text-crimson drop-shadow-[0_0_8px_rgb(230_46_58/0.9)]" />
    </div>
  );
}
