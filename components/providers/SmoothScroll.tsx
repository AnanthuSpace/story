"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

const SmoothScrollContext = createContext<Lenis | null>(null);

export function useSmoothScroll() {
  return useContext(SmoothScrollContext);
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const pathname = usePathname();
  const previousPathname = useRef(pathname);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const desktop = window.matchMedia("(min-width: 1024px)");
    let disposed = false;
    let generation = 0;
    let destroyCurrent: () => void = () => {};

    const syncScroll = async () => {
      const currentGeneration = ++generation;
      destroyCurrent();
      destroyCurrent = () => {};
      setLenis(null);

      if (reducedMotion.matches || !finePointer.matches || !desktop.matches) return;

      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      if (disposed || currentGeneration !== generation) return;

      gsap.registerPlugin(ScrollTrigger);
      gsap.ticker.lagSmoothing(0);

      const instance = new Lenis({
        autoRaf: false,
        duration: 1.15,
        smoothWheel: true,
        syncTouch: false,
        wheelMultiplier: 0.9,
      });
      const updateScrollTrigger = () => ScrollTrigger.update();
      const tick = (time: number) => instance.raf(time * 1000);

      instance.on("scroll", updateScrollTrigger);
      gsap.ticker.add(tick);
      setLenis(instance);

      destroyCurrent = () => {
        gsap.ticker.remove(tick);
        instance.off("scroll", updateScrollTrigger);
        instance.destroy();
      };
    };

    void syncScroll();
    finePointer.addEventListener("change", syncScroll);
    desktop.addEventListener("change", syncScroll);
    reducedMotion.addEventListener("change", syncScroll);

    return () => {
      disposed = true;
      generation += 1;
      finePointer.removeEventListener("change", syncScroll);
      desktop.removeEventListener("change", syncScroll);
      reducedMotion.removeEventListener("change", syncScroll);
      destroyCurrent();
    };
  }, []);

  useEffect(() => {
    if (previousPathname.current === pathname) return;
    previousPathname.current = pathname;

    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [lenis, pathname]);

  return (
    <SmoothScrollContext.Provider value={lenis}>
      {children}
    </SmoothScrollContext.Provider>
  );
}
