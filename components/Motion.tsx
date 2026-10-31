"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CUT_FROM = "polygon(0 0, 0 0, -35% 100%, 0 100%)";
const CUT_TO = "polygon(0 0, 135% 0, 100% 100%, -35% 100%)";

export default function Motion() {
  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    const cleanups: Array<() => void> = [];

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.to("[data-progress]", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { start: 0, end: "max", scrub: 0.2 },
      });

      // hero: each letter materialises out of smoke, after the intro slash
      const hero = gsap.timeline({ delay: 1.6 });
      hero
        .from("[data-char]", {
          yPercent: 120,
          rotationX: -110,
          autoAlpha: 0,
          filter: "blur(14px)",
          transformOrigin: "50% 100% -40px",
          duration: 1,
          ease: "expo.out",
          stagger: 0.045,
        })
        .from("[data-hero-fade]", { autoAlpha: 0, y: 22, duration: 0.8, ease: "power3.out", stagger: 0.1 }, "-=0.6");

      // blade-cut reveals
      gsap.utils.toArray<HTMLElement>("[data-slash]").forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: CUT_FROM, x: -24 },
          {
            clipPath: CUT_TO,
            x: 0,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
            onComplete: () => gsap.set(el, { clearProps: "clipPath,x" }),
          },
        );
      });

      gsap.set("[data-reveal]", { autoAlpha: 0, y: 28 });
      ScrollTrigger.batch("[data-reveal]", {
        start: "top 90%",
        once: true,
        onEnter: (b) => gsap.to(b, { autoAlpha: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.08 }),
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        gsap.fromTo(
          el,
          { yPercent: 18 },
          {
            yPercent: -18,
            ease: "none",
            scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });

      gsap.fromTo(
        "[data-blade-line]",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top",
          scrollTrigger: { trigger: "#experience-list", start: "top 65%", end: "bottom 65%", scrub: true },
        },
      );

      // blade lines draw across between sections
      gsap.utils.toArray<HTMLElement>("[data-cut]").forEach((el) => {
        gsap.fromTo(
          el,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.8,
            ease: "power4.out",
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          },
        );
      });

      // project frames swing up out of the depth of the page
      gsap.utils.toArray<HTMLElement>("[data-tilt]").forEach((el) => {
        gsap.fromTo(
          el,
          { rotationX: 38, y: 90, transformPerspective: 1200, transformOrigin: "50% 100%" },
          {
            rotationX: 0,
            y: 0,
            duration: 1.3,
            ease: "expo.out",
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          },
        );
      });

      // 3D tilt on project frames
      gsap.utils.toArray<HTMLElement>("[data-tilt]").forEach((el) => {
        const frame = el.querySelector<HTMLElement>("[data-tilt-frame]") ?? el;
        gsap.set(frame, { transformPerspective: 1100 });
        const rx = gsap.quickTo(frame, "rotationX", { duration: 0.5, ease: "power3" });
        const ry = gsap.quickTo(frame, "rotationY", { duration: 0.5, ease: "power3" });
        const move = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width;
          const py = (e.clientY - r.top) / r.height;
          ry((px - 0.5) * 16);
          rx(-(py - 0.5) * 16);
          el.style.setProperty("--gx", `${px * 100}%`);
          el.style.setProperty("--gy", `${py * 100}%`);
        };
        const leave = () => {
          rx(0);
          ry(0);
        };
        el.addEventListener("pointermove", move);
        el.addEventListener("pointerleave", leave);
        cleanups.push(() => {
          el.removeEventListener("pointermove", move);
          el.removeEventListener("pointerleave", leave);
        });
      });
    });

    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => {
      cleanups.forEach((fn) => fn());
      mm.revert();
    };
  }, []);

  return null;
}
