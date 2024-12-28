// src/main/components/Article/Carousel/utils/breakpointConstraints.ts

import { BreakpointConstraints, ViewportBreakpoint } from "../carouselTypes";

const BASE_VIEWPORT = {
  MOBILE: {
    WIDTH: 375,
    HEIGHT: 667,
  },
  TABLET: {
    WIDTH: 768,
    HEIGHT: 1024,
  },
  DESKTOP: {
    WIDTH: 1200,
    HEIGHT: 900,
  }
};

const CONTAINER_MARGINS = {
  MOBILE: 32,  // 16px * 2
  TABLET: 48,  // 24px * 2
  DESKTOP: 64, // 32px * 2
};

const NAVIGATION_HEIGHT = {
  MOBILE: 48,
  TABLET: 56,
  DESKTOP: 64,
};

export const BREAKPOINT_CONSTRAINTS: Record<ViewportBreakpoint, BreakpointConstraints> = {
  'mobile-portrait': {
    maxRatio: 1,    // Maximum square ratio enforced
    minRatio: 0.75, // Minimum 3:4 ratio
    maxHeight: BASE_VIEWPORT.MOBILE.HEIGHT - CONTAINER_MARGINS.MOBILE - NAVIGATION_HEIGHT.MOBILE,
    preferredRatio: 0.8,  // Slightly vertical default for portrait
    maxWidth: BASE_VIEWPORT.MOBILE.WIDTH - CONTAINER_MARGINS.MOBILE
  },
  'mobile-landscape': {
    maxRatio: 1.5,  // Maximum 3:2 ratio
    minRatio: 1,    // Minimum square ratio enforced
    maxHeight: BASE_VIEWPORT.MOBILE.WIDTH - CONTAINER_MARGINS.MOBILE - NAVIGATION_HEIGHT.MOBILE,
    preferredRatio: 1.33, // 4:3 default for landscape
    maxWidth: BASE_VIEWPORT.MOBILE.HEIGHT - CONTAINER_MARGINS.MOBILE
  },
  'tablet-portrait': {
    maxRatio: 1.5,   // Maximum 3:2 ratio allowed
    minRatio: 0.67,  // Minimum 2:3 ratio
    maxHeight: Math.min(
      800, // Absolute max height
      BASE_VIEWPORT.TABLET.HEIGHT - CONTAINER_MARGINS.TABLET - NAVIGATION_HEIGHT.TABLET
    ),
    preferredRatio: 1,    // Square default
    maxWidth: BASE_VIEWPORT.TABLET.WIDTH - CONTAINER_MARGINS.TABLET
  },
  'tablet-landscape': {
    maxRatio: 1.78,  // Maximum 16:9 ratio
    minRatio: 0.75,  // Minimum 3:4 ratio
    maxHeight: Math.min(
      600, // Absolute max height
      BASE_VIEWPORT.TABLET.WIDTH - CONTAINER_MARGINS.TABLET - NAVIGATION_HEIGHT.TABLET
    ),
    preferredRatio: 1.33, // 4:3 default
    maxWidth: BASE_VIEWPORT.TABLET.HEIGHT - CONTAINER_MARGINS.TABLET
  },
  'desktop-portrait': {
    maxRatio: 2,     // Maximum 2:1 ratio
    minRatio: 0.5,   // Minimum 1:2 ratio
    maxHeight: Math.min(
      900, // Absolute max height
      BASE_VIEWPORT.DESKTOP.HEIGHT - CONTAINER_MARGINS.DESKTOP - NAVIGATION_HEIGHT.DESKTOP
    ),
    preferredRatio: 1,    // Flexible, will adapt to content
    maxWidth: BASE_VIEWPORT.DESKTOP.WIDTH - CONTAINER_MARGINS.DESKTOP
  },
  'desktop-landscape': {
    maxRatio: 2,     // Maximum 2:1 ratio
    minRatio: 0.5,   // Minimum 1:2 ratio
    maxHeight: Math.min(
      800, // Absolute max height
      BASE_VIEWPORT.DESKTOP.WIDTH - CONTAINER_MARGINS.DESKTOP - NAVIGATION_HEIGHT.DESKTOP
    ),
    preferredRatio: 1.5,  // Flexible, will adapt to content
    maxWidth: BASE_VIEWPORT.DESKTOP.HEIGHT - CONTAINER_MARGINS.DESKTOP
  }
};