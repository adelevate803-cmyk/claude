// Lightweight mutable store bridging GSAP ScrollTrigger (imperative) with
// the R3F render loop (read every frame, no React re-render needed) and a
// small set of React subscribers (for discrete scene-index text changes).
export const SCENE_COUNT = 9;

type Listener = (progress: number) => void;

class ScrollStoryStore {
  progress = 0; // continuous 0..SCENE_COUNT
  private listeners = new Set<Listener>();

  set(progress: number) {
    this.progress = progress;
    this.listeners.forEach((listener) => listener(progress));
  }

  subscribe(listener: Listener) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }
}

export const scrollStory = new ScrollStoryStore();
