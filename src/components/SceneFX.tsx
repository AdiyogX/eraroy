import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ============================================================
   LENIS SMOOTH SCROLL
   ============================================================ */
export function useLenisScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    let raf = 0;
    const tick = (time: number) => {
      lenis.raf(time);
      ScrollTrigger.update();
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // hash anchor smooth scroll
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest("a[href^='#']") as HTMLAnchorElement | null;
      if (!a) return;
      const id = a.getAttribute("href")!.slice(1);
      const el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el, { offset: -80, duration: 1.4 });
    };
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);
}

/* ============================================================
   GSAP SCROLL REVEALS - sections fade/scale up
   ============================================================ */
export function useScrollReveals() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          y: 60,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });
      // parallax bg layers
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const speed = parseFloat(el.dataset.parallax || "0.3");
        gsap.to(el, {
          yPercent: -50 * speed,
          ease: "none",
          scrollTrigger: {
            trigger: el.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    });
    return () => ctx.revert();
  }, []);
}

/* ============================================================
   CURSOR TRAIL — sparks following the cursor
   ============================================================ */
export function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (window.matchMedia("(max-width: 767px), (prefers-reduced-motion: reduce)").matches) return;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    const parts: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      hue: number;
      size: number;
    }[] = [];
    const COLORS = [25, 50, 200, 320, 165];
    const onMove = (e: PointerEvent) => {
      for (let i = 0; i < 2; i++) {
        parts.push({
          x: e.clientX,
          y: e.clientY,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2 - 0.6,
          life: 1,
          hue: COLORS[Math.floor(Math.random() * COLORS.length)],
          size: Math.random() * 4 + 2,
        });
      }
      if (parts.length > 120) parts.splice(0, parts.length - 120);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("resize", onResize);
    let raf = 0;
    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.03;
        p.life -= 0.025;
        if (p.life <= 0) {
          parts.splice(i, 1);
          continue;
        }
        ctx.beginPath();
        ctx.fillStyle = `hsla(${p.hue}, 95%, 60%, ${p.life})`;
        ctx.strokeStyle = `hsla(0, 0%, 8%, ${p.life})`;
        ctx.lineWidth = 1.5;
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      }
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", onResize);
    };
  }, []);
  return (
    <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-[90] hidden md:block" />
  );
}

/* ============================================================
   ORIGINAL CHARACTERS — SVGs (no IP, original)
   ============================================================ */

export function WebHero({ size = 90 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 120">
      {/* energy rope above */}
      <line
        x1="50"
        y1="-200"
        x2="50"
        y2="10"
        stroke="var(--ink)"
        strokeWidth="2.5"
        strokeDasharray="6 4"
      />
      {/* body */}
      <ellipse
        cx="50"
        cy="60"
        rx="22"
        ry="28"
        fill="var(--tomato)"
        stroke="var(--ink)"
        strokeWidth="3.5"
      />
      {/* mask */}
      <circle cx="50" cy="38" r="20" fill="var(--tomato)" stroke="var(--ink)" strokeWidth="3.5" />
      <ellipse cx="42" cy="38" rx="7" ry="5" fill="white" stroke="var(--ink)" strokeWidth="2" />
      <ellipse cx="58" cy="38" rx="7" ry="5" fill="white" stroke="var(--ink)" strokeWidth="2" />
      <path d="M30 32 Q50 22 70 32" stroke="var(--ink)" strokeWidth="1.5" fill="none" />
      {/* web pattern */}
      <path
        d="M50 18 V58 M30 38 H70 M36 24 L64 52 M64 24 L36 52"
        stroke="var(--ink)"
        strokeWidth="1"
        opacity="0.4"
        fill="none"
      />
      {/* arms */}
      <path
        d="M28 55 Q10 30 14 8"
        stroke="var(--ink)"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M72 55 Q90 75 78 95"
        stroke="var(--tomato)"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
      />
      {/* legs */}
      <path d="M40 85 L34 110" stroke="var(--tomato)" strokeWidth="7" strokeLinecap="round" />
      <path
        d="M60 85 Q72 95 70 110"
        stroke="var(--tomato)"
        strokeWidth="7"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function CodeNinja({ size = 80 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="38" fill="var(--ink)" stroke="var(--ink)" strokeWidth="3" />
      <rect
        x="14"
        y="42"
        width="72"
        height="14"
        fill="var(--mint)"
        stroke="var(--ink)"
        strokeWidth="3"
      />
      <circle cx="40" cy="49" r="3" fill="var(--ink)" />
      <circle cx="60" cy="49" r="3" fill="var(--ink)" />
      <path
        d="M30 30 L20 22 M70 30 L80 22"
        stroke="var(--ink)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <text
        x="50"
        y="78"
        textAnchor="middle"
        fontFamily="var(--font-comic)"
        fontSize="11"
        fill="var(--sun)"
      >
        {"{ }"}
      </text>
    </svg>
  );
}

export function AutomationWizard({ size = 90 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 120">
      {/* hat */}
      <path d="M30 35 L50 0 L70 35 Z" fill="var(--grape)" stroke="var(--ink)" strokeWidth="3" />
      <circle cx="50" cy="10" r="3" fill="var(--sun)" />
      <rect x="28" y="32" width="44" height="8" rx="2" fill="var(--ink)" />
      {/* face */}
      <circle cx="50" cy="55" r="20" fill="var(--sun)" stroke="var(--ink)" strokeWidth="3" />
      <circle cx="42" cy="55" r="3" fill="var(--ink)" />
      <circle cx="58" cy="55" r="3" fill="var(--ink)" />
      <path d="M44 62 Q50 67 56 62" stroke="var(--ink)" strokeWidth="2" fill="none" />
      {/* beard */}
      <path
        d="M35 65 Q50 95 65 65 Q60 80 50 82 Q40 80 35 65"
        fill="white"
        stroke="var(--ink)"
        strokeWidth="2.5"
      />
      {/* wand */}
      <line
        x1="78"
        y1="80"
        x2="98"
        y2="55"
        stroke="var(--ink)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M98 50 L100 58 L96 56 L98 64 L92 58 L94 52 Z"
        fill="var(--sun)"
        stroke="var(--ink)"
        strokeWidth="2"
      />
    </svg>
  );
}

export function CyberRobot({ size = 80 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 110">
      <rect
        x="18"
        y="20"
        width="64"
        height="60"
        rx="12"
        fill="var(--sky)"
        stroke="var(--ink)"
        strokeWidth="3.5"
      />
      <line x1="50" y1="0" x2="50" y2="20" stroke="var(--ink)" strokeWidth="3" />
      <circle cx="50" cy="6" r="5" fill="var(--tomato)" stroke="var(--ink)" strokeWidth="2" />
      <rect x="28" y="38" width="44" height="20" rx="6" fill="var(--ink)" />
      <circle cx="40" cy="48" r="4" fill="var(--mint)" />
      <circle cx="60" cy="48" r="4" fill="var(--mint)" />
      <rect x="38" y="64" width="24" height="5" rx="2" fill="var(--ink)" />
      {/* antennae arms */}
      <rect
        x="6"
        y="40"
        width="12"
        height="8"
        rx="2"
        fill="var(--tomato)"
        stroke="var(--ink)"
        strokeWidth="2"
      />
      <rect
        x="82"
        y="40"
        width="12"
        height="8"
        rx="2"
        fill="var(--tomato)"
        stroke="var(--ink)"
        strokeWidth="2"
      />
      <rect x="28" y="82" width="14" height="22" rx="3" fill="var(--ink)" />
      <rect x="58" y="82" width="14" height="22" rx="3" fill="var(--ink)" />
    </svg>
  );
}

export function CloudRider({ size = 120 }: { size?: number }) {
  return (
    <svg width={size} height={size * 0.7} viewBox="0 0 160 110">
      {/* cloud */}
      <path
        d="M28 80 Q10 80 10 65 Q10 48 28 48 Q34 28 56 32 Q70 18 90 28 Q112 22 120 42 Q142 42 144 60 Q156 64 150 80 Z"
        fill="white"
        stroke="var(--ink)"
        strokeWidth="3.5"
      />
      {/* rider on top */}
      <g transform="translate(70 18)">
        <circle cx="0" cy="0" r="10" fill="var(--bubble)" stroke="var(--ink)" strokeWidth="2.5" />
        <circle cx="-3" cy="-2" r="1.5" fill="var(--ink)" />
        <circle cx="3" cy="-2" r="1.5" fill="var(--ink)" />
        <path d="M-4 4 Q0 7 4 4" stroke="var(--ink)" strokeWidth="1.5" fill="none" />
        <rect
          x="-7"
          y="9"
          width="14"
          height="14"
          rx="3"
          fill="var(--mint)"
          stroke="var(--ink)"
          strokeWidth="2"
        />
        {/* cape */}
        <path d="M-7 9 Q-20 18 -22 30" stroke="var(--ink)" strokeWidth="2.5" fill="var(--tomato)" />
      </g>
    </svg>
  );
}

export function PixelMascot({ size = 60 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect
        x="10"
        y="10"
        width="40"
        height="40"
        fill="var(--sun)"
        stroke="var(--ink)"
        strokeWidth="3"
      />
      <rect x="18" y="22" width="6" height="6" fill="var(--ink)" />
      <rect x="36" y="22" width="6" height="6" fill="var(--ink)" />
      <rect x="20" y="36" width="20" height="4" fill="var(--ink)" />
      <rect
        x="6"
        y="6"
        width="6"
        height="6"
        fill="var(--tomato)"
        stroke="var(--ink)"
        strokeWidth="2"
      />
      <rect
        x="48"
        y="6"
        width="6"
        height="6"
        fill="var(--mint)"
        stroke="var(--ink)"
        strokeWidth="2"
      />
    </svg>
  );
}

export function Drone({ size = 70 }: { size?: number }) {
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 100 60">
      <ellipse cx="20" cy="20" rx="14" ry="3" fill="var(--ink)" opacity="0.5" />
      <ellipse cx="80" cy="20" rx="14" ry="3" fill="var(--ink)" opacity="0.5" />
      <rect
        x="35"
        y="22"
        width="30"
        height="18"
        rx="6"
        fill="var(--tomato)"
        stroke="var(--ink)"
        strokeWidth="2.5"
      />
      <line x1="20" y1="22" x2="40" y2="30" stroke="var(--ink)" strokeWidth="2.5" />
      <line x1="80" y1="22" x2="60" y2="30" stroke="var(--ink)" strokeWidth="2.5" />
      <circle cx="50" cy="32" r="3" fill="var(--mint)" />
      <circle cx="50" cy="50" r="3" fill="var(--sun)" stroke="var(--ink)" strokeWidth="1.5" />
    </svg>
  );
}

export function Airship({ size = 200 }: { size?: number }) {
  return (
    <svg width={size} height={size * 0.5} viewBox="0 0 200 100">
      <ellipse
        cx="100"
        cy="40"
        rx="90"
        ry="28"
        fill="var(--bubble)"
        stroke="var(--ink)"
        strokeWidth="3"
      />
      <ellipse cx="100" cy="40" rx="90" ry="6" fill="var(--ink)" opacity="0.15" />
      <path
        d="M180 40 L200 30 L200 50 Z"
        fill="var(--tomato)"
        stroke="var(--ink)"
        strokeWidth="2.5"
      />
      <rect
        x="75"
        y="68"
        width="50"
        height="18"
        rx="6"
        fill="var(--sun)"
        stroke="var(--ink)"
        strokeWidth="2.5"
      />
      <line x1="80" y1="64" x2="80" y2="68" stroke="var(--ink)" strokeWidth="2" />
      <line x1="120" y1="64" x2="120" y2="68" stroke="var(--ink)" strokeWidth="2" />
      <circle cx="86" cy="77" r="2" fill="var(--ink)" />
      <circle cx="100" cy="77" r="2" fill="var(--ink)" />
      <circle cx="114" cy="77" r="2" fill="var(--ink)" />
    </svg>
  );
}

export function FloatingIsland({ size = 240 }: { size?: number }) {
  return (
    <svg width={size} height={size * 0.7} viewBox="0 0 240 170">
      <path
        d="M20 70 Q20 30 120 28 Q220 30 220 70 L200 110 Q180 130 120 130 Q60 130 40 110 Z"
        fill="var(--mint)"
        stroke="var(--ink)"
        strokeWidth="4"
      />
      <path
        d="M40 100 L70 150 L100 110 L130 160 L160 105 L195 140 L200 110"
        fill="var(--ink)"
        opacity="0.85"
      />
      <ellipse
        cx="90"
        cy="32"
        rx="22"
        ry="8"
        fill="var(--tomato)"
        stroke="var(--ink)"
        strokeWidth="3"
      />
      <ellipse
        cx="150"
        cy="30"
        rx="16"
        ry="6"
        fill="var(--sun)"
        stroke="var(--ink)"
        strokeWidth="3"
      />
    </svg>
  );
}

/* ============================================================
   BACKGROUND WORLD — parallax floating elements across the page
   ============================================================ */
export function BackgroundWorld() {
  const [enabled, setEnabled] = useState(false);
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -600]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const rot = useTransform(scrollYProgress, [0, 1], [0, 360]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px) and (prefers-reduced-motion: no-preference)");
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 -z-[1] overflow-hidden">
      {/* far layer */}
      <motion.div style={{ y: y2 }} className="absolute inset-0">
        <div className="absolute top-[120vh] left-[6%] opacity-80">
          <FloatingIsland size={260} />
        </div>
        <div className="absolute top-[210vh] right-[4%] opacity-80">
          <FloatingIsland size={200} />
        </div>
        <div className="absolute top-[330vh] left-[10%] opacity-80">
          <FloatingIsland size={220} />
        </div>
        <div className="absolute top-[460vh] right-[8%] opacity-80">
          <FloatingIsland size={180} />
        </div>
      </motion.div>

      {/* mid layer airships */}
      <motion.div style={{ y: y1 }} className="absolute inset-0">
        <div
          className="absolute top-[80vh] left-[60%] animate-drift-x"
          style={{ animationDuration: "55s" }}
        >
          <Airship size={180} />
        </div>
        <div
          className="absolute top-[260vh] left-[5%] animate-drift-x"
          style={{ animationDuration: "70s", animationDelay: "-20s" }}
        >
          <Airship size={140} />
        </div>
        <div
          className="absolute top-[420vh] left-[40%] animate-drift-x"
          style={{ animationDuration: "60s" }}
        >
          <Airship size={160} />
        </div>
      </motion.div>

      {/* near drones */}
      <motion.div style={{ y: y3 }} className="absolute inset-0">
        {[
          { top: "55vh", left: "8%", d: 4 },
          { top: "150vh", left: "82%", d: 5 },
          { top: "240vh", left: "20%", d: 3.5 },
          { top: "380vh", left: "70%", d: 4.5 },
          { top: "510vh", left: "12%", d: 3.8 },
        ].map((p, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ top: p.top, left: p.left }}
            animate={{ y: [0, -18, 0], x: [0, 12, 0] }}
            transition={{ duration: p.d, repeat: Infinity, ease: "easeInOut" }}
          >
            <Drone size={60} />
          </motion.div>
        ))}
      </motion.div>

      {/* slow rotating star */}
      <motion.div style={{ rotate: rot }} className="absolute top-[40vh] right-[8%] opacity-50">
        <svg width="120" height="120" viewBox="0 0 80 80">
          <path
            d="M40 4 L48 30 L74 32 L52 48 L60 74 L40 58 L20 74 L28 48 L6 32 L32 30 Z"
            fill="var(--sun)"
            stroke="var(--ink)"
            strokeWidth="3"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
    </div>
  );
}

/* ============================================================
   SWINGING WEB HERO — locks onto top corner, swings on scroll
   ============================================================ */
export function SwingingWebHero() {
  const [enabled, setEnabled] = useState(false);
  const { scrollY } = useScroll();
  const rotate = useTransform(scrollY, (v) => Math.sin(v / 200) * 22);
  const top = useTransform(scrollY, [0, 4000], [120, 600]);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px) and (prefers-reduced-motion: no-preference)");
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  if (!enabled) return null;

  return (
    <motion.div
      className="pointer-events-none fixed left-8 z-40 hidden md:block origin-top"
      style={{ top, rotate }}
    >
      <WebHero size={110} />
    </motion.div>
  );
}

/* ============================================================
   FLYING CHARACTERS — cross the screen as you scroll
   ============================================================ */
export function FlyingCharacters() {
  const [enabled, setEnabled] = useState(false);
  const { scrollYProgress } = useScroll();
  const x1 = useTransform(scrollYProgress, [0.1, 0.35], ["-20%", "120%"]);
  const x2 = useTransform(scrollYProgress, [0.35, 0.6], ["120%", "-20%"]);
  const x3 = useTransform(scrollYProgress, [0.6, 0.9], ["-20%", "120%"]);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px) and (prefers-reduced-motion: no-preference)");
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[5] hidden md:block">
      <motion.div style={{ x: x1, top: "18vh" }} className="absolute">
        <div className="animate-bob">
          <CloudRider size={150} />
        </div>
      </motion.div>
      <motion.div style={{ x: x2, top: "32vh" }} className="absolute">
        <div className="animate-bob">
          <Drone size={90} />
        </div>
      </motion.div>
      <motion.div style={{ x: x3, top: "22vh" }} className="absolute">
        <div className="animate-bob">
          <Airship size={180} />
        </div>
      </motion.div>
    </div>
  );
}

/* ============================================================
   PEEKING CHARACTERS — peek from screen corners on viewport
   ============================================================ */
export function PeekingCorner() {
  const [show, setShow] = useState(true);
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px) and (prefers-reduced-motion: no-preference)");
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  if (!enabled) return null;

  return (
    <motion.div
      className="pointer-events-none fixed bottom-0 right-4 z-30 hidden md:block"
      initial={{ y: 200 }}
      animate={{ y: show ? 0 : 200 }}
      transition={{ type: "spring", stiffness: 90, damping: 12 }}
      onAnimationComplete={() => setTimeout(() => setShow(false), 9000)}
    >
      <div className="origin-bottom">
        <CodeNinja size={120} />
      </div>
    </motion.div>
  );
}

/* ============================================================
   HEADING DECORATOR — character hangs from the heading
   ============================================================ */
export function HangingCharacter({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative inline-block">
      {children}
      <motion.div
        className="absolute -top-16 right-2 origin-top"
        animate={{ rotate: [-10, 10, -10] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="h-12 w-[2px] mx-auto bg-[color:var(--ink)]" />
        <PixelMascot size={56} />
      </motion.div>
    </div>
  );
}

/* ============================================================
   CHARACTER GALLERY — used on the Origin section
   ============================================================ */
export function CharacterGallery() {
  const items = [
    { c: <WebHero />, name: "Web Hero", role: "Web Slinger" },
    { c: <CodeNinja />, name: "Code Ninja", role: "Refactor Master" },
    { c: <AutomationWizard />, name: "Automation Wizard", role: "Workflow Alchemy" },
    { c: <CyberRobot />, name: "Cyber Robot", role: "DevOps Pal" },
    { c: <CloudRider />, name: "Cloud Rider", role: "Sky Networker" },
    { c: <PixelMascot />, name: "Pixel Buddy", role: "UI Sidekick" },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 card-gap mt-12">
      {items.map((it, i) => (
        <motion.div
          key={it.name}
          data-reveal
          whileHover={{ y: -10, rotate: i % 2 ? -4 : 4 }}
          className="panel p-4 flex h-full flex-col items-center text-center bg-white"
          style={{
            background: [
              "var(--sun)",
              "var(--mint)",
              "var(--bubble)",
              "var(--sky)",
              "var(--tomato)",
              "var(--accent)",
            ][i % 6],
          }}
        >
          <div className="h-24 flex items-end justify-center">{it.c}</div>
          <div className="font-comic button-fluid mt-2">{it.name}</div>
          <div className="font-bold text-xs uppercase tracking-wider opacity-80">{it.role}</div>
        </motion.div>
      ))}
    </div>
  );
}

/* ============================================================
   CURSOR FOLLOWER ORB — magic orb at custom cursor
   ============================================================ */
export function MagicOrb() {
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 120, damping: 18, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 120, damping: 18, mass: 0.5 });
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px) and (prefers-reduced-motion: no-preference)");
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    if (!enabled) return;
    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [enabled, x, y]);
  if (!enabled) return null;
  return (
    <motion.div
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed left-0 top-0 z-[80] hidden md:block -translate-x-1/2 -translate-y-1/2"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      >
        <div
          className="w-16 h-16 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 35% 30%, var(--sun), var(--tomato) 55%, transparent 70%)",
            opacity: 0.45,
            filter: "blur(2px)",
          }}
        />
      </motion.div>
    </motion.div>
  );
}
