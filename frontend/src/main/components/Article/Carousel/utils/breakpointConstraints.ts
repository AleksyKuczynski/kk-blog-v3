// src/main/components/Article/Carousel/utils/breakpointConstraints.ts

import { BreakpointConstraints, ViewportBreakpoint } from "@/main/lib/markdown/types";

export const BREAKPOINT_CONSTRAINTS: Record<ViewportBreakpoint, BreakpointConstraints> = {
  'mobile-portrait': {
    maxRatio: 1,      // max square
    minRatio: 0.75,   // min 3:4
    maxHeight: 532,
    preferredRatio: 0.8
  },
  'mobile-landscape': {
    maxRatio: 1.78,   // max 16:9
    minRatio: 1,      // min square
    maxHeight: 450,
    preferredRatio: 1.33
  },
  'tablet-portrait': {
    maxRatio: 1.33,   // max 4:3
    minRatio: 0.75,   // min 3:4
    maxHeight: 800,
    preferredRatio: 1
  },
  'tablet-landscape': {
    maxRatio: 1.78,   // max 16:9
    minRatio: 0.85,   // min ~5:6
    maxHeight: 600,
    preferredRatio: 1.33
  },
  'desktop-portrait': {
    maxRatio: 1.5,    // max 3:2
    minRatio: 0.67,   // min 2:3
    maxHeight: 900,
    preferredRatio: 1.25
  },
  'desktop-landscape': {
    maxRatio: 2,      // max 2:1
    minRatio: 0.75,   // min 3:4
    maxHeight: 800,
    preferredRatio: 1.5
  }
};