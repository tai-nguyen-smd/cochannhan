"use client";

import { useEffect, useState } from "react";

/**
 * Returns true only after the component has mounted (client-side).
 * Use to avoid hydration mismatch when rendering content that depends on
 * client-only state (e.g. localStorage, React Query cache).
 */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}
