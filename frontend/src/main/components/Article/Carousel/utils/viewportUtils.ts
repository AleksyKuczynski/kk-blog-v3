// src/main/components/Article/Carousel/utils/viewportUtils.ts

import { DeviceType, ViewportBreakpoint, ViewportOrientation } from "@/main/lib/markdown/types";

export function getDeviceType(width: number): DeviceType {
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
}

export function getOrientation(width: number, height: number): ViewportOrientation {
  return width > height ? 'landscape' : 'portrait';
}

export function getViewportBreakpoint(width: number, height: number): ViewportBreakpoint {
  const device = getDeviceType(width);
  const orientation = getOrientation(width, height);
  return `${device}-${orientation}` as ViewportBreakpoint;
}