"use client";

import { useEffect, useRef } from "react";
import styles from "./Backdrop.module.scss";

/*
  The light behind every page: a soft glow, and in it a manga screentone, dots that
  swell toward the light and thin out away from it. On a desktop the light trails the
  pointer; on a touch screen it rests at the top of the page. Only two custom
  properties change, so nothing re-renders, and the trailing stops once it catches up.
*/
export function Backdrop() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const backdrop = ref.current;
    if (!backdrop || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const still = window.matchMedia("(prefers-reduced-motion: reduce)");
    const target = { x: 50, y: 0 };
    const light = { x: 50, y: 0 };
    let frame = 0;

    const paint = () => {
      backdrop.style.setProperty("--light-x", `${light.x}%`);
      backdrop.style.setProperty("--light-y", `${light.y}%`);
    };

    const trail = () => {
      light.x += (target.x - light.x) * 0.08;
      light.y += (target.y - light.y) * 0.08;
      paint();
      const settled = Math.abs(target.x - light.x) + Math.abs(target.y - light.y) < 0.05;
      frame = settled ? 0 : requestAnimationFrame(trail);
    };

    const follow = (event: PointerEvent) => {
      target.x = (event.clientX / window.innerWidth) * 100;
      target.y = (event.clientY / window.innerHeight) * 100;
      if (still.matches) {
        light.x = target.x;
        light.y = target.y;
        paint();
      } else if (!frame) {
        frame = requestAnimationFrame(trail);
      }
    };

    window.addEventListener("pointermove", follow, { passive: true });
    return () => {
      window.removeEventListener("pointermove", follow);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={ref} className={styles.backdrop} aria-hidden="true">
      <div className={styles.glow} />
      <div className={`${styles.tone} ${styles.fine}`} />
      <div className={`${styles.tone} ${styles.medium}`} />
      <div className={`${styles.tone} ${styles.coarse}`} />
    </div>
  );
}
