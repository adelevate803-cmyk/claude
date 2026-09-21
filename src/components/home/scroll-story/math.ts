export function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function smoothstep(t: number) {
  const c = clamp(t, 0, 1);
  return c * c * (3 - 2 * c);
}

/** Local 0..1 eased progress within scene `index`, from global 0..SCENE_COUNT progress. */
export function sceneT(progress: number, index: number) {
  return smoothstep(clamp(progress - index, 0, 1));
}

/** Raw (un-eased) local 0..1 progress, for cases needing linear blending. */
export function sceneTLinear(progress: number, index: number) {
  return clamp(progress - index, 0, 1);
}
