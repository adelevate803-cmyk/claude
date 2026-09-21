"use client";

import { useEffect, useState } from "react";
import { scrollStory, SCENE_COUNT } from "./scrollState";
import { clamp } from "./math";

export function useActiveSceneIndex() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    return scrollStory.subscribe((progress) => {
      const next = Math.round(clamp(progress, 0, SCENE_COUNT - 1));
      setIndex((prev) => (prev === next ? prev : next));
    });
  }, []);

  return index;
}
