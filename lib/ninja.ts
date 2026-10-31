import * as THREE from "three";

type Key = [number, number];

const ease = (x: number) => x * x * (3 - 2 * x);
const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Eased interpolation through [progress, value] keyframes. */
function kf(p: number, keys: Key[]) {
  if (p <= keys[0][0]) return keys[0][1];
  for (let i = 1; i < keys.length; i++) {
    if (p <= keys[i][0]) {
      const [p0, v0] = keys[i - 1];
      const [p1, v1] = keys[i];
      return lerp(v0, v1, ease((p - p0) / (p1 - p0)));
    }
  }
  return keys[keys.length - 1][1];
}

export function buildNinja(steel: THREE.Material) {
  const mats = {
    suit: new THREE.MeshStandardMaterial({ color: 0x1b1f2e, roughness: 0.55, metalness: 0.15 }),
    dark: new THREE.MeshStandardMaterial({ color: 0x0c0e16, roughness: 0.7 }),
    red: new THREE.MeshStandardMaterial({
      color: 0xe62e3a,
      emissive: 0xe62e3a,
      emissiveIntensity: 0.45,
      roughness: 0.5,
    }),
    skin: new THREE.MeshStandardMaterial({ color: 0xd2b095, roughness: 0.8 }),
    eye: new THREE.MeshBasicMaterial({ color: 0x0a0a0f }),
  };
  const geos: THREE.BufferGeometry[] = [];
  const mesh = (
    g: THREE.BufferGeometry,
    m: THREE.Material,
    parent: THREE.Object3D,
    x = 0,
    y = 0,
    z = 0,
  ) => {
    geos.push(g);
    const o = new THREE.Mesh(g, m);
    o.position.set(x, y, z);
    parent.add(o);
    return o;
  };
  const group = (parent: THREE.Object3D, x = 0, y = 0, z = 0) => {
    const g = new THREE.Group();
    g.position.set(x, y, z);
    parent.add(g);
    return g;
  };

  const root = new THREE.Group();
  const hips = group(root, 0, 0.91, 0);
  mesh(new THREE.CylinderGeometry(0.16, 0.18, 0.18, 16), mats.suit, hips, 0, 0.02, 0);

  const torso = group(hips, 0, 0.06, 0);
  mesh(new THREE.CapsuleGeometry(0.175, 0.34, 6, 16), mats.suit, torso, 0, 0.3, 0);
  const belt = mesh(new THREE.TorusGeometry(0.18, 0.032, 10, 32), mats.red, torso, 0, 0.04, 0);
  belt.rotation.x = Math.PI / 2;

  // head, mask, headband and its trailing tails
  const head = group(torso, 0, 0.8, 0);
  mesh(new THREE.SphereGeometry(0.19, 24, 20), mats.suit, head);
  mesh(new THREE.BoxGeometry(0.27, 0.08, 0.06), mats.skin, head, 0, 0.015, 0.15);
  mesh(new THREE.SphereGeometry(0.02, 10, 8), mats.eye, head, -0.06, 0.02, 0.185);
  mesh(new THREE.SphereGeometry(0.02, 10, 8), mats.eye, head, 0.06, 0.02, 0.185);
  const band = mesh(new THREE.TorusGeometry(0.195, 0.028, 10, 36), mats.red, head, 0, 0.09, 0);
  band.rotation.x = Math.PI / 2;

  const tails: THREE.Group[] = [];
  let parent: THREE.Object3D = group(head, 0, 0.09, -0.19);
  const tailRoot = parent as THREE.Group;
  for (let i = 0; i < 6; i++) {
    mesh(new THREE.BoxGeometry(0.075, 0.03, 0.17), mats.red, parent, 0, 0, -0.085);
    const next = group(parent, 0, 0, -0.17);
    tails.push(next);
    parent = next;
  }

  // arms
  const makeArm = (side: number) => {
    const shoulder = group(torso, side * 0.25, 0.52, 0);
    mesh(new THREE.CapsuleGeometry(0.06, 0.26, 4, 10), mats.suit, shoulder, 0, -0.19, 0);
    const elbow = group(shoulder, 0, -0.37, 0);
    mesh(new THREE.CapsuleGeometry(0.052, 0.24, 4, 10), mats.suit, elbow, 0, -0.17, 0);
    const hand = group(elbow, 0, -0.34, 0);
    mesh(new THREE.SphereGeometry(0.058, 12, 10), mats.dark, hand);
    return { shoulder, elbow, hand };
  };
  const armL = makeArm(-1);
  const armR = makeArm(1);

  // katana: blade runs out of the fist along the hand's -y, then tipped forward
  const katana = group(armR.hand);
  katana.rotation.x = -Math.PI / 2;
  mesh(new THREE.BoxGeometry(0.038, 0.24, 0.038), mats.dark, katana, 0, 0.04, 0);
  mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.014, 20), steel, katana, 0, -0.09, 0);
  mesh(new THREE.BoxGeometry(0.012, 0.82, 0.05), steel, katana, 0, -0.52, 0);

  // legs
  const makeLeg = (side: number) => {
    const hip = group(hips, side * 0.1, -0.02, 0);
    mesh(new THREE.CapsuleGeometry(0.085, 0.34, 4, 10), mats.suit, hip, 0, -0.22, 0);
    const knee = group(hip, 0, -0.44, 0);
    mesh(new THREE.CapsuleGeometry(0.07, 0.34, 4, 10), mats.suit, knee, 0, -0.2, 0);
    mesh(new THREE.BoxGeometry(0.1, 0.07, 0.23), mats.dark, knee, 0, -0.42, 0.05);
    return { hip, knee };
  };
  const legL = makeLeg(-1);
  const legR = makeLeg(1);

  let phase = 0;

  /**
   * run: 0..1 how hard it is running. slash: -1 when idle, else 0..1 progress of the leap-and-cut.
   */
  function update(t: number, dt: number, run: number, slash: number, mx: number, my: number) {
    phase += dt * 9 * run;
    const s = Math.sin(phase);
    const c = Math.cos(phase);
    const breathe = Math.sin(t * 1.8);

    // idle blended into run
    hips.position.y = 0.91 + breathe * 0.012 * (1 - run) - Math.abs(s) * 0.06 * run;
    hips.rotation.set(0, 0, 0);
    torso.rotation.set(breathe * 0.02 + 0.3 * run, s * 0.18 * run, 0);
    legL.hip.rotation.x = lerp(-0.1, s * 0.9, run);
    legR.hip.rotation.x = lerp(0.1, -s * 0.9, run);
    legL.knee.rotation.x = lerp(0.1, Math.max(0, -c) * 1.2, run);
    legR.knee.rotation.x = lerp(0.1, Math.max(0, c) * 1.2, run);
    armL.shoulder.rotation.set(lerp(0.1, -s * 0.8, run), 0, 0.1);
    armL.elbow.rotation.x = lerp(-0.3, -1.1, run);
    armR.shoulder.rotation.set(lerp(-0.35, s * 0.4 - 0.5, run), 0, -0.1);
    armR.elbow.rotation.x = lerp(-0.9, -1.2, run);

    head.rotation.set(-my * 0.25, mx * 0.5, 0);

    if (slash >= 0) {
      const crouch =
        slash < 0.22
          ? ease(slash / 0.22)
          : slash < 0.3
            ? 1 - ease((slash - 0.22) / 0.08)
            : slash > 0.86
              ? Math.sin(((slash - 0.86) / 0.14) * Math.PI) * 0.8
              : 0;
      const q = clamp01((slash - 0.25) / 0.65);
      hips.position.y = 0.91 - crouch * 0.3 + Math.sin(q * Math.PI) * 1.05;
      hips.rotation.y = ease(q) * Math.PI * 2;
      torso.rotation.x = crouch * 0.4 - Math.sin(q * Math.PI) * 0.15;
      armR.shoulder.rotation.x = kf(slash, [[0, -0.35], [0.3, -2.7], [0.4, -2.7], [0.62, -0.2], [0.9, -0.2], [1, -0.35]]);
      armR.elbow.rotation.x = kf(slash, [[0, -0.9], [0.3, -0.3], [0.62, -0.1], [0.9, -0.1], [1, -0.9]]);
      armL.shoulder.rotation.x = kf(slash, [[0, 0.1], [0.3, -1.0], [0.9, -0.8], [1, 0.1]]);
      const tuckHip = kf(slash, [[0.25, 0], [0.4, -1.0], [0.8, -0.6], [0.92, 0]]);
      const tuckKnee = kf(slash, [[0.25, 0.1], [0.4, 1.3], [0.8, 0.8], [0.92, 0.1]]);
      legL.hip.rotation.x = tuckHip;
      legR.hip.rotation.x = tuckHip * 0.6;
      legL.knee.rotation.x = tuckKnee;
      legR.knee.rotation.x = tuckKnee;
    }

    // headband tails stream behind
    tailRoot.rotation.x = lerp(-0.1, -0.5, run) - (slash >= 0 ? 0.3 : 0);
    tails.forEach((seg, i) => {
      seg.rotation.y = Math.sin(t * 5 - i * 0.7) * (0.15 + 0.3 * run);
      seg.rotation.x = Math.sin(t * 3.4 - i * 0.6) * 0.12 + 0.05;
    });
  }

  function dispose() {
    geos.forEach((g) => g.dispose());
    Object.values(mats).forEach((m) => m.dispose());
  }

  return { root, update, dispose };
}
