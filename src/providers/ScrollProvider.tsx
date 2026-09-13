"use client";

import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import Lenis from "lenis";

interface ScrollContextType {
  lenis: Lenis | null;
  scrollY: number;
  isScrolled: boolean;
  scrollTo: (target: string | HTMLElement, options?: { offset?: number; duration?: number }) => void;
}

const ScrollContext = createContext<ScrollContextType>({
  lenis: null,
  scrollY: 0,
  isScrolled: false,
  scrollTo: () => {},
});

export const useScroll = () => useContext(ScrollContext);

export default function ScrollProvider({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const reqIdRef = useRef<number | null>(null);

  useEffect(() => {
    // 1. Initialize Lenis instance
    const instance = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Clean exponential ease-out
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.6,
    });

    setLenis(instance);

    // 2. Centralized tick handler for performance (replaces individual window scroll listeners)
    const onScroll = ({ scroll }: { scroll: number }) => {
      setScrollY(scroll);
      setIsScrolled(scroll > 20);
    };

    instance.on("scroll", onScroll);

    // 3. RAF loop
    const raf = (time: number) => {
      instance.raf(time);
      reqIdRef.current = requestAnimationFrame(raf);
    };

    reqIdRef.current = requestAnimationFrame(raf);

    return () => {
      if (reqIdRef.current) cancelAnimationFrame(reqIdRef.current);
      instance.destroy();
    };
  }, []);

  const scrollTo = (target: string | HTMLElement, options?: { offset?: number; duration?: number }) => {
    if (!lenis) return;
    lenis.scrollTo(target, {
      offset: options?.offset ?? 0,
      duration: options?.duration ?? 1.2,
    });
  };

  return (
    <ScrollContext.Provider value={{ lenis, scrollY, isScrolled, scrollTo }}>
      {children}
    </ScrollContext.Provider>
  );
}