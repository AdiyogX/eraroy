import { useEffect, useRef } from "react";

export function CyberCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let x = 0,
      y = 0,
      rx = 0,
      ry = 0;
    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (dot.current) dot.current.style.transform = `translate(${x - 4}px, ${y - 4}px)`;
    };
    const tick = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      if (ring.current) ring.current.style.transform = `translate(${rx - 18}px, ${ry - 18}px)`;
      raf = requestAnimationFrame(tick);
    };
    let raf = requestAnimationFrame(tick);
    window.addEventListener("mousemove", onMove);

    const hovers = document.querySelectorAll("a, button, [data-cursor]");
    const enter = () => ring.current?.classList.add("scale-150", "bg-[oklch(0.85_0.25_180/15%)]");
    const leave = () =>
      ring.current?.classList.remove("scale-150", "bg-[oklch(0.85_0.25_180/15%)]");
    hovers.forEach((h) => {
      h.addEventListener("mouseenter", enter);
      h.addEventListener("mouseleave", leave);
    });

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      hovers.forEach((h) => {
        h.removeEventListener("mouseenter", enter);
        h.removeEventListener("mouseleave", leave);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={ring}
        className="pointer-events-none fixed left-0 top-0 z-[100] h-9 w-9 rounded-full border border-[oklch(0.85_0.25_180/70%)] transition-[transform,background-color] duration-150 will-change-transform hidden md:block"
      />
      <div
        ref={dot}
        className="pointer-events-none fixed left-0 top-0 z-[100] h-2 w-2 rounded-full bg-[oklch(0.85_0.25_180)] shadow-[0_0_12px_oklch(0.85_0.25_180)] will-change-transform hidden md:block"
      />
    </>
  );
}
