"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { buildNinja } from "@/lib/ninja";

function starGeometry() {
  const R = 1;
  const shape = new THREE.Shape();
  for (let i = 0; i < 4; i++) {
    const a = (i * Math.PI) / 2;
    const b = a + Math.PI / 2;
    const m = a + Math.PI / 4;
    if (i === 0) shape.moveTo(Math.cos(a) * R, Math.sin(a) * R);
    shape.quadraticCurveTo(Math.cos(m) * 0.24, Math.sin(m) * 0.24, Math.cos(b) * R, Math.sin(b) * R);
  }
  const hole = new THREE.Path();
  hole.absarc(0, 0, 0.17, 0, Math.PI * 2, true);
  shape.holes.push(hole);
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: 0.05,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.03,
    bevelSegments: 3,
    curveSegments: 32,
  });
  geo.translate(0, 0, -0.025);
  return geo;
}

type Thrown = {
  mesh: THREE.Mesh;
  age: number;
  from: THREE.Vector3;
  to: THREE.Vector3;
  tilt: number;
};

type Arc = { mesh: THREE.Mesh; age: number };

const SLASH_SECONDS = 1.35;

export default function Scene3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    } catch {
      return;
    }

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 60);
    camera.position.set(0, 0, 7);

    const pmrem = new THREE.PMREMGenerator(renderer);
    const envRT = pmrem.fromScene(new RoomEnvironment(), 0.04);
    scene.environment = envRT.texture;
    scene.environmentIntensity = 0.7;

    const key = new THREE.DirectionalLight(0xffffff, 2.2);
    key.position.set(3, 4, 5);
    const rim = new THREE.PointLight(0xe62e3a, 40, 18);
    rim.position.set(-3, -1.5, 2.5);
    const cool = new THREE.PointLight(0x5b6cff, 22, 18);
    cool.position.set(3.5, 2.5, -1);
    scene.add(key, rim, cool, new THREE.AmbientLight(0x20243a, 1.2));

    const geo = starGeometry();
    const ringGeo = new THREE.TorusGeometry(0.245, 0.02, 16, 56);
    const steel = new THREE.MeshStandardMaterial({ color: 0x9aa3b5, metalness: 1, roughness: 0.22 });
    const glow = new THREE.MeshStandardMaterial({
      color: 0xe62e3a,
      emissive: 0xe62e3a,
      emissiveIntensity: 1.6,
      metalness: 0.3,
      roughness: 0.4,
    });

    const makeStar = () => {
      const root = new THREE.Group();
      const spin = new THREE.Group();
      spin.add(new THREE.Mesh(geo, steel));
      const ringTop = new THREE.Mesh(ringGeo, glow);
      ringTop.position.z = 0.058;
      const ringBack = ringTop.clone();
      ringBack.position.z = -0.058;
      spin.add(ringTop, ringBack);
      root.add(spin);
      return { root, spin };
    };

    // the ninja, his dojo ring, and the moon behind everything
    const ninja = buildNinja(steel);
    scene.add(ninja.root);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xe62e3a,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
    const ringA = new THREE.Mesh(new THREE.RingGeometry(0.85, 0.9, 72), ringMat);
    const ringB = new THREE.Mesh(new THREE.RingGeometry(1.15, 1.17, 72), ringMat);
    ringA.rotation.x = ringB.rotation.x = -Math.PI / 2;
    ringA.position.y = ringB.position.y = 0.01;
    ninja.root.add(ringA, ringB);

    const moonMat = new THREE.MeshBasicMaterial({ color: 0xece3d4, transparent: true });
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0xe62e3a,
      transparent: true,
      opacity: 0.14,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const moon = new THREE.Mesh(new THREE.SphereGeometry(1, 48, 32), moonMat);
    const halo = new THREE.Mesh(new THREE.SphereGeometry(1.4, 32, 24), haloMat);
    moon.add(halo);
    scene.add(moon);

    // hero shuriken
    const hero = makeStar();
    scene.add(hero.root);

    // little ones orbiting it
    const orbitRoot = new THREE.Group();
    scene.add(orbitRoot);
    const orbiters = [0, 1, 2, 3].map((i) => {
      const pivot = new THREE.Group();
      pivot.rotation.x = 0.6 + i * 0.45;
      pivot.rotation.y = i * 1.1;
      const s = makeStar();
      s.root.scale.setScalar(0.2 + (i % 2) * 0.08);
      s.root.position.x = 2.1 + i * 0.35;
      pivot.add(s.root);
      orbitRoot.add(pivot);
      return { pivot, star: s, speed: 0.5 + i * 0.18 };
    });

    // embers and petals
    const COUNT = 650;
    const pos = new Float32Array(COUNT * 3);
    const col = new Float32Array(COUNT * 3);
    const speed = new Float32Array(COUNT);
    const palette = [new THREE.Color(0xe62e3a), new THREE.Color(0xff7a45), new THREE.Color(0xefeae0)];
    for (let i = 0; i < COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 18;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = -7 + Math.random() * 11;
      const c = palette[Math.floor(Math.random() * palette.length)];
      col.set([c.r, c.g, c.b], i * 3);
      speed[i] = 0.12 + Math.random() * 0.4;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    pGeo.setAttribute("color", new THREE.BufferAttribute(col, 3));
    const pMat = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    scene.add(new THREE.Points(pGeo, pMat));

    // smoke bursts for take-off, landing and every cut
    const puffCanvas = document.createElement("canvas");
    puffCanvas.width = puffCanvas.height = 64;
    const pctx = puffCanvas.getContext("2d");
    if (pctx) {
      const g = pctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      g.addColorStop(0, "rgba(255,255,255,1)");
      g.addColorStop(1, "rgba(255,255,255,0)");
      pctx.fillStyle = g;
      pctx.fillRect(0, 0, 64, 64);
    }
    const puffTex = new THREE.CanvasTexture(puffCanvas);
    const SMOKE = 120;
    const sPos = new Float32Array(SMOKE * 3).fill(-99);
    const sCol = new Float32Array(SMOKE * 3);
    const sVel = new Float32Array(SMOKE * 3);
    const sLife = new Float32Array(SMOKE);
    const smokeGeo = new THREE.BufferGeometry();
    smokeGeo.setAttribute("position", new THREE.BufferAttribute(sPos, 3));
    smokeGeo.setAttribute("color", new THREE.BufferAttribute(sCol, 3));
    const smokeMat = new THREE.PointsMaterial({
      size: 0.7,
      map: puffTex,
      vertexColors: true,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const smoke = new THREE.Points(smokeGeo, smokeMat);
    smoke.frustumCulled = false;
    scene.add(smoke);
    let smokeCursor = 0;
    const puff = (origin: THREE.Vector3, n: number, power: number) => {
      for (let k = 0; k < n; k++) {
        const i = smokeCursor++ % SMOKE;
        const a = Math.random() * Math.PI * 2;
        sPos.set([origin.x + (Math.random() - 0.5) * 0.4, origin.y, origin.z + (Math.random() - 0.5) * 0.4], i * 3);
        sVel.set([Math.cos(a) * power * Math.random(), 0.3 + Math.random() * 0.6, Math.sin(a) * power * Math.random()], i * 3);
        sLife[i] = 0.7 + Math.random() * 0.5;
      }
    };

    // pointer state
    const mouse = { x: 0, y: 0, sx: 0, sy: 0 };
    const onMove = (e: PointerEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    // click throws a shuriken at the cursor
    const thrown: Thrown[] = [];
    const ray = new THREE.Raycaster();
    const onDown = (e: PointerEvent) => {
      if (reduce || thrown.length > 8) return;
      const ndc = new THREE.Vector2(
        (e.clientX / window.innerWidth) * 2 - 1,
        -((e.clientY / window.innerHeight) * 2 - 1),
      );
      ray.setFromCamera(ndc, camera);
      const to = new THREE.Vector3();
      ray.ray.intersectPlane(new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), to);
      const mesh = new THREE.Mesh(geo, steel);
      mesh.scale.setScalar(0.3);
      const from = new THREE.Vector3(to.x * 0.4 + 3, to.y - 3.2, 3);
      mesh.position.copy(from);
      scene.add(mesh);
      thrown.push({ mesh, age: 0, from, to, tilt: (Math.random() - 0.5) * 1.2 });
    };
    window.addEventListener("pointerdown", onDown);

    // the ninja leaps and cuts whenever a new section crosses the middle of the screen
    const arcs: Arc[] = [];
    const arcGeo = new THREE.TorusGeometry(1.15, 0.035, 8, 64, Math.PI * 1.1);
    let slash = -1;
    let slashStage = 0;
    let lastSlashAt = -10;
    const startSlash = () => {
      const now = performance.now() / 1000;
      if (reduce || slash >= 0 || now - lastSlashAt < 2.2) return;
      lastSlashAt = now;
      slash = 0;
      slashStage = 0;
    };
    const kickoff = window.setTimeout(startSlash, 2400);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting && e.target.id !== "top") startSlash();
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    document.querySelectorAll("section[id]").forEach((s) => io.observe(s));

    const size = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    size();
    const ro = new ResizeObserver(() => {
      size();
      if (reduce) renderer.render(scene, camera);
    });
    ro.observe(canvas);

    const cur = new THREE.Vector3(2, 0, -0.5);
    let curScale = 1.5;
    const nCur = new THREE.Vector3(2, -2, 1);
    let nScale = 1.2;
    let nFace = -0.5;
    let run = 0;
    let lastScroll = window.scrollY;
    let vel = 0;
    let t = 0;
    let raf = 0;
    let last = performance.now();
    const tmp = new THREE.Vector3();

    const frame = () => {
      const now = performance.now();
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      t += dt;

      const vh = window.innerHeight;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - vh);
      const scrollY = window.scrollY;
      const p = scrollY / maxScroll;
      vel += ((Math.abs(scrollY - lastScroll) / Math.max(dt, 0.001)) * 0.0006 - vel) * Math.min(1, dt * 6);
      lastScroll = scrollY;

      const halfH = Math.tan((camera.fov * Math.PI) / 360) * camera.position.z;
      const halfW = halfH * camera.aspect;
      const narrow = camera.aspect < 0.85;
      const h = Math.max(0, 1 - scrollY / (vh * 0.85));

      canvas.style.opacity = String(0.5 + (narrow ? 0.3 : 0.5) * h);

      // shuriken: hovers up-right of the ninja in the hero, then wanders
      const heroPos = narrow
        ? new THREE.Vector3(halfW * 0.4, halfH * 0.05, -1.5)
        : new THREE.Vector3(halfW * 0.62, halfH * 0.28, -1.2);
      const wander = new THREE.Vector3(
        Math.sin(p * Math.PI * 5) * halfW * (narrow ? 0.7 : 0.8),
        Math.cos(p * Math.PI * 3.3) * halfH * 0.5,
        -2.6,
      );
      const target = wander.lerp(heroPos, h);
      const targetScale = (narrow ? 0.6 : 1.1) * h + 0.7 * (1 - h);

      const k = 1 - Math.exp(-3.5 * dt);
      cur.lerp(target, k);
      curScale += (targetScale - curScale) * k;

      mouse.sx += (mouse.x - mouse.sx) * Math.min(1, dt * 4);
      mouse.sy += (mouse.y - mouse.sy) * Math.min(1, dt * 4);

      hero.root.position.copy(cur);
      hero.root.scale.setScalar(curScale);
      hero.root.rotation.x = 0.85 - mouse.sy * 0.45 + Math.sin(t * 0.6) * 0.15;
      hero.root.rotation.y = mouse.sx * 0.6 + Math.sin(t * 0.4) * 0.3;
      hero.spin.rotation.z += dt * (1.3 + vel * 5);

      orbitRoot.position.copy(cur);
      orbitRoot.scale.setScalar(curScale * 0.62);
      for (const o of orbiters) {
        o.pivot.rotation.z += dt * o.speed;
        o.star.spin.rotation.z += dt * 6;
      }

      // ninja: stands in the hero, then follows the page along the edge, running while you scroll
      const nHero = narrow
        ? { x: halfW * 0.5, y: -halfH * 0.78, s: 0.8 }
        : { x: halfW * 0.5, y: -halfH * 0.7, s: 1.35 };
      const nLater = narrow
        ? { x: halfW * 0.7, y: -halfH * 0.9, s: 0.55 }
        : { x: halfW * 0.88, y: -halfH * 0.82, s: 0.9 };
      const nTarget = tmp.set(
        nLater.x + (nHero.x - nLater.x) * h,
        nLater.y + (nHero.y - nLater.y) * h,
        1,
      );
      nCur.lerp(nTarget, k);
      nScale += (nLater.s + (nHero.s - nLater.s) * h - nScale) * k;
      nFace += (-0.5 - (1 - h) * 0.35 + mouse.sx * 0.2 - nFace) * k;
      ninja.root.position.copy(nCur);
      ninja.root.scale.setScalar(nScale);
      ninja.root.rotation.y = nFace;
      ringA.rotation.z += dt * 0.6;
      ringB.rotation.z -= dt * 0.4;
      ringMat.opacity = 0.7 * Math.min(1, h * 2);

      const runTarget = slash >= 0 ? 0 : Math.min(1, vel * 2.5);
      run += (runTarget - run) * Math.min(1, dt * 8);

      if (slash >= 0) {
        slash += dt / SLASH_SECONDS;
        const feet = nCur.clone();
        if (slashStage === 0 && slash > 0.22) {
          slashStage = 1;
          puff(feet, 14, 1.4);
        }
        if (slashStage === 1 && slash > 0.5) {
          slashStage = 2;
          const arc = new THREE.Mesh(
            arcGeo,
            new THREE.MeshBasicMaterial({
              color: 0xffd9d0,
              transparent: true,
              blending: THREE.AdditiveBlending,
              depthWrite: false,
            }),
          );
          arc.position.set(nCur.x - 0.2, nCur.y + 1.9 * nScale, nCur.z + 0.6);
          arc.rotation.z = 2.2;
          arc.scale.setScalar(0.5 * nScale + 0.35);
          scene.add(arc);
          arcs.push({ mesh: arc, age: 0 });
          const v = arc.position.clone().project(camera);
          const flash = document.createElement("div");
          flash.className = "slash-flash";
          flash.style.cssText = `left:${(v.x * 0.5 + 0.5) * window.innerWidth}px;top:${(-v.y * 0.5 + 0.5) * window.innerHeight}px;width:520px;margin-left:-260px;height:4px`;
          flash.addEventListener("animationend", () => flash.remove());
          document.body.appendChild(flash);
        }
        if (slashStage === 2 && slash > 0.9) {
          slashStage = 3;
          puff(feet, 18, 1.8);
        }
        if (slash >= 1) slash = -1;
      }
      ninja.update(t, dt, run, slash, mouse.sx, mouse.sy);

      for (let i = arcs.length - 1; i >= 0; i--) {
        const a = arcs[i];
        a.age += dt;
        const f = a.age / 0.4;
        a.mesh.scale.multiplyScalar(1 + dt * 1.6);
        (a.mesh.material as THREE.MeshBasicMaterial).opacity = Math.max(0, 1 - f);
        if (f >= 1) {
          scene.remove(a.mesh);
          (a.mesh.material as THREE.Material).dispose();
          arcs.splice(i, 1);
        }
      }

      // smoke
      for (let i = 0; i < SMOKE; i++) {
        if (sLife[i] <= 0) continue;
        sLife[i] -= dt;
        sPos[i * 3] += sVel[i * 3] * dt;
        sPos[i * 3 + 1] += sVel[i * 3 + 1] * dt;
        sPos[i * 3 + 2] += sVel[i * 3 + 2] * dt;
        sVel[i * 3] *= 0.96;
        sVel[i * 3 + 2] *= 0.96;
        const f = Math.max(0, sLife[i]) * 0.45;
        sCol[i * 3] = 0.6 * f;
        sCol[i * 3 + 1] = 0.64 * f;
        sCol[i * 3 + 2] = 0.8 * f;
        if (sLife[i] <= 0) sPos[i * 3 + 1] = -99;
      }
      smokeGeo.attributes.position.needsUpdate = true;
      smokeGeo.attributes.color.needsUpdate = true;

      // moon fades as you leave the hero
      moon.visible = h > 0.01;
      moon.position.set(halfW * (narrow ? 0.45 : 0.55), halfH * 0.32 + scrollY * 0.0016, -8);
      moon.scale.setScalar(narrow ? 1.1 : 1.8);
      moonMat.opacity = 0.92 * h;
      haloMat.opacity = 0.14 * h;

      camera.position.x += (mouse.sx * 0.35 - camera.position.x) * Math.min(1, dt * 3);
      camera.position.y += (mouse.sy * 0.22 - camera.position.y) * Math.min(1, dt * 3);
      camera.lookAt(0, 0, 0);

      rim.intensity = 36 + Math.sin(t * 2.2) * 8;

      const arr = pGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < COUNT; i++) {
        arr[i * 3 + 1] += dt * speed[i] * (1 + vel * 4);
        arr[i * 3] += Math.sin(t * 0.7 + i) * dt * 0.1;
        if (arr[i * 3 + 1] > 5.5) arr[i * 3 + 1] = -5.5;
      }
      pGeo.attributes.position.needsUpdate = true;

      for (let i = thrown.length - 1; i >= 0; i--) {
        const s = thrown[i];
        s.age += dt;
        const f = Math.min(1, s.age / 0.35);
        if (f < 1) {
          const e = 1 - Math.pow(1 - f, 3);
          s.mesh.position.lerpVectors(s.from, s.to, e);
          s.mesh.rotation.z += dt * 40;
          s.mesh.rotation.x = 0.4 * e;
        } else {
          s.mesh.rotation.x = 0.9;
          s.mesh.rotation.y = s.tilt;
        }
        if (s.age > 1.8) {
          const out = Math.max(0, 1 - (s.age - 1.8) / 0.4);
          s.mesh.scale.setScalar(0.3 * out);
          if (out === 0) {
            scene.remove(s.mesh);
            thrown.splice(i, 1);
          }
        }
      }

      renderer.render(scene, camera);
      if (!reduce) raf = requestAnimationFrame(frame);
    };
    frame();

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(kickoff);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      ninja.dispose();
      geo.dispose();
      ringGeo.dispose();
      arcGeo.dispose();
      steel.dispose();
      glow.dispose();
      ringMat.dispose();
      moonMat.dispose();
      haloMat.dispose();
      pGeo.dispose();
      pMat.dispose();
      smokeGeo.dispose();
      smokeMat.dispose();
      puffTex.dispose();
      envRT.dispose();
      pmrem.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
    />
  );
}
