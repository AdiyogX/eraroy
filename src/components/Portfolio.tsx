import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { toast, Toaster } from "sonner";
import $ from "jquery";
import {
  AutomationWizard,
  BackgroundWorld,
  CloudRider,
  CodeNinja,
  CursorTrail,
  CyberRobot,
  FlyingCharacters,
  MagicOrb,
  PeekingCorner,
  PixelMascot,
  SwingingWebHero,
  useLenisScroll,
  useScrollReveals,
} from "./SceneFX";

const CONTACT = {
  email: "eraroy@vk.com",
  whatsapp: "+91 91560 56312",
  whatsappUrl: "https://wa.me/919156056312",
  instagram: "https://www.instagram.com/erarroy/",
};

const NAV = [
  { id: "home", label: "Home" },
  { id: "story", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "services", label: "Services" },
  { id: "journey", label: "Experience" },
  { id: "achievements", label: "Achievements" },
  { id: "testimonials", label: "Testimonials" },
  { id: "contact", label: "Contact" },
];

const EXTRA_SCENES = [
  {
    id: "tech-stack",
    kicker: "Tech Stack",
    title: "Production Control Room",
    text: "TypeScript, React systems, animation architecture, API workflows, CRM logic, ERP dashboards, and AI orchestration.",
    icon: "server",
    color: "var(--paper)",
  },
  {
    id: "ai-automation",
    kicker: "AI Automation",
    title: "Robot Factory",
    text: "Agents, prompt pipelines, retrieval workflows, operations copilots, and automations that save real working hours.",
    icon: "robot",
    color: "var(--bubble)",
  },
  {
    id: "crm-solutions",
    kicker: "CRM Solutions",
    title: "Business Command Center",
    text: "Lead flows, pipelines, automations, reporting, segmentation, and handoff systems for teams that need clarity.",
    icon: "users",
    color: "var(--mint)",
  },
  {
    id: "erp-solutions",
    kicker: "ERP Solutions",
    title: "Enterprise HQ",
    text: "Inventory, approval chains, internal portals, finance views, and operational dashboards that feel simple.",
    icon: "building",
    color: "var(--sun)",
  },
  {
    id: "blog",
    kicker: "Field Notes",
    title: "Studio Blog",
    text: "Short notes on interface motion, AI systems, automation design, and building memorable digital products.",
    icon: "pen",
    color: "var(--sky)",
  },
];

const FAQS = [
  {
    q: "What does Era Roy build?",
    a: "Interactive web experiences, AI automations, CRM/ERP systems, SaaS interfaces, and workflow tools with strong visual identity.",
  },
  {
    q: "Can you handle both design and engineering?",
    a: "Yes. The work combines creative direction, interface systems, frontend implementation, automation logic, and integration thinking.",
  },
  {
    q: "How fast can a project start?",
    a: "Availability depends on scope, but small automation or portfolio-style projects can usually begin after a focused discovery call.",
  },
  {
    q: "Do you work with international clients?",
    a: "Yes. Era Roy is positioned for remote collaboration across websites, automations, CRM, ERP, and AI workflows.",
  },
];

const ROLES = [
  "Full Stack Developer",
  "AI Automation Expert",
  "Workflow Automation Specialist",
  "CRM Solutions Architect",
  "ERP Solutions Builder",
  "Creative Engineer",
];

const SKILLS = [
  { name: "HTML", place: "Construction Site", icon: "code", color: "var(--tomato)" },
  { name: "CSS", place: "Design Studio", icon: "palette", color: "var(--sky)" },
  { name: "JavaScript", place: "Energy Reactor", icon: "bolt", color: "var(--sun)" },
  { name: "React", place: "Innovation Lab", icon: "atom", color: "var(--bubble)" },
  { name: "Next.js", place: "Space Research", icon: "rocket", color: "var(--ink)" },
  { name: "Node.js", place: "Server Factory", icon: "server", color: "var(--mint)" },
  { name: "Python", place: "AI Laboratory", icon: "brain", color: "var(--grape)" },
  { name: "CRM", place: "Command Center", icon: "users", color: "var(--tomato)" },
  { name: "ERP", place: "Enterprise HQ", icon: "building", color: "var(--sun)" },
  { name: "Automation", place: "Robot Factory", icon: "robot", color: "var(--sky)" },
];

const SERVICES = [
  {
    title: "Web Development",
    text: "High-conversion interfaces, fast product pages, and memorable launch websites.",
    icon: "code",
  },
  {
    title: "AI Automation",
    text: "Agentic workflows, AI assistants, and intelligent back-office systems.",
    icon: "robot",
  },
  {
    title: "Workflow Automation",
    text: "No-code, low-code, and custom automations that remove repetitive work.",
    icon: "wand",
  },
  {
    title: "CRM Setup",
    text: "HubSpot, Zoho, Salesforce-style systems shaped around real teams.",
    icon: "users",
  },
  {
    title: "ERP Setup",
    text: "Operations dashboards, inventory flows, approvals, and reporting layers.",
    icon: "building",
  },
  {
    title: "API Integration",
    text: "Reliable connections between tools, apps, databases, and AI services.",
    icon: "plug",
  },
  {
    title: "SaaS Development",
    text: "MVP to polished product with auth, billing-ready flows, and scalable UX.",
    icon: "rocket",
  },
  {
    title: "Cloud Solutions",
    text: "Deployment, monitoring, serverless foundations, and maintainable delivery.",
    icon: "cloud",
  },
];

const PROJECTS = [
  { name: "Nova CRM", type: "Business Command Tower", icon: "users", color: "var(--tomato)" },
  { name: "AutoForge", type: "Robot Factory", icon: "robot", color: "var(--sun)" },
  { name: "CloudOps HQ", type: "Sky Station", icon: "cloud", color: "var(--mint)" },
  { name: "Signal ERP", type: "Enterprise Lab", icon: "building", color: "var(--grape)" },
  { name: "Astra AI", type: "AI Research Dome", icon: "brain", color: "var(--bubble)" },
  { name: "FlowGrid", type: "Automation City", icon: "bolt", color: "var(--sky)" },
];

const JOURNEY = [
  {
    title: "Learning Phase",
    text: "Radhika Gupta began shaping interfaces, systems, and stories from raw curiosity.",
    year: "01",
  },
  {
    title: "Freelance Journey",
    text: "Era Roy became the public creative identity for digital builds with personality.",
    year: "02",
  },
  {
    title: "Professional Growth",
    text: "Projects expanded into web platforms, CRM systems, ERP flows, and APIs.",
    year: "03",
  },
  {
    title: "AI Projects",
    text: "Automation, assistants, and smart workflows became the center of the studio.",
    year: "04",
  },
  {
    title: "Future Vision",
    text: "A living product universe where every business process feels simple and alive.",
    year: "05",
  },
];

const TROPHIES = [
  "50+ Project Scenes",
  "AI Workflow Systems",
  "CRM Launches",
  "ERP Blueprints",
  "Automation Wins",
  "Premium Interfaces",
];

const ICON_PATHS: Record<string, string> = {
  code: "M4 12l5-5 1.8 1.8L7.6 12l3.2 3.2L9 17l-5-5zm16 0l-5 5-1.8-1.8 3.2-3.2-3.2-3.2L15 7l5 5zM12.9 4h2.3l-4.1 16H8.8l4.1-16z",
  robot:
    "M12 2a2 2 0 012 2v1h3a3 3 0 013 3v7a5 5 0 01-5 5H9a5 5 0 01-5-5V8a3 3 0 013-3h3V4a2 2 0 012-2zm-5 9a2 2 0 104 0 2 2 0 00-4 0zm8 0a2 2 0 104 0 2 2 0 00-4 0zM9 16h6v-2H9v2z",
  wand: "M18.5 3.5l2 2-11 11-2-2 11-11zM4 19l3-3 2 2-3 3H4v-2zM5 4l1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2zm9 2l.8 1.6 1.7.9-1.7.8L14 10.5l-.8-1.7-1.7-.8 1.7-.9L14 5.5z",
  cloud:
    "M7 18a5 5 0 01-.7-10A6.5 6.5 0 0118.8 10 4 4 0 0118 18H7zm0-2h11a2 2 0 00.3-4A2 2 0 0016 10.6 4.5 4.5 0 007.9 9.2L7.6 10.5H7A2.8 2.8 0 007 16z",
  shield:
    "M12 2l8 3v6c0 5-3.4 9.5-8 11-4.6-1.5-8-6-8-11V5l8-3zm0 3.1L6 7.3V11c0 3.6 2.3 6.9 6 8.6 3.7-1.7 6-5 6-8.6V7.3l-6-2.2z",
  trophy:
    "M7 4h10v2h3v3a5 5 0 01-5 5h-.2A4 4 0 0113 16.5V19h4v2H7v-2h4v-2.5A4 4 0 019.2 14H9a5 5 0 01-5-5V6h3V4zm10 4v3a3 3 0 003-3h-3zM4 8a3 3 0 003 3V8H4z",
  mail: "M3 5h18v14H3V5zm2 3.2V17h14V8.2l-7 5-7-5zm1.2-1.2L12 11.2 17.8 7H6.2z",
  whatsapp:
    "M12 2a9 9 0 00-7.6 13.8L3 22l6.4-1.3A9 9 0 1012 2zm0 2a7 7 0 11-2.1 13.7l-.4-.1-3.8.8.8-3.7-.2-.4A7 7 0 0112 4zm-2.6 4.2c-.2 0-.6.1-.9.5-.3.4-.9 1-.9 2.3s.9 2.6 1.1 2.8c.1.2 1.8 2.9 4.5 3.9 2.2.9 2.7.5 3.2.5.5 0 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2-.1-.1-.3-.2-.7-.4l-1.9-.9c-.3-.1-.5-.1-.7.2l-.7.9c-.2.2-.4.2-.7.1a5.7 5.7 0 01-2.8-2.4c-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.4.1-.6l-.8-2c-.2-.6-.4-.6-.7-.6h-.6z",
  instagram:
    "M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm0 2a3 3 0 00-3 3v10a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H7zm5 4a4 4 0 110 8 4 4 0 010-8zm0 2a2 2 0 100 4 2 2 0 000-4zm5.5-3.2a1 1 0 110 2 1 1 0 010-2z",
  github:
    "M12 2a10 10 0 00-3.2 19.5c.5.1.7-.2.7-.5v-1.7c-2.9.6-3.5-1.2-3.5-1.2-.5-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 0 1.6 1.1 1.6 1.1.9 1.5 2.4 1.1 3 .8.1-.7.4-1.1.7-1.4-2.3-.3-4.7-1.2-4.7-5A3.9 3.9 0 016.7 8.9c-.1-.3-.5-1.3.1-2.7 0 0 .9-.3 2.8 1.1a9.6 9.6 0 015 0c1.9-1.4 2.8-1.1 2.8-1.1.6 1.4.2 2.4.1 2.7a3.9 3.9 0 011.1 2.7c0 3.9-2.4 4.8-4.7 5 .4.3.8 1 .8 2V21c0 .3.2.6.8.5A10 10 0 0012 2z",
  linkedin:
    "M4.5 3.5a2 2 0 110 4 2 2 0 010-4zM3 9h3v12H3V9zm6 0h2.9v1.7A3.8 3.8 0 0115.3 9c3.1 0 4.7 2 4.7 5.5V21h-3v-6c0-1.8-.6-3-2.1-3-1.1 0-1.8.8-2.1 1.5-.1.3-.1.7-.1 1.1V21H9V9z",
  arrow: "M13 5l7 7-7 7-1.4-1.4 4.6-4.6H4v-2h12.2l-4.6-4.6L13 5z",
  palette:
    "M12 3a9 9 0 00-9 9c0 3.9 3.1 7 7 7h1.5a1.5 1.5 0 001.1-2.5c-.4-.4-.1-1.1.5-1.1H15a6 6 0 006-6c0-3.5-3.6-6.4-9-6.4zM7.5 11a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm3-3a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm5 3a1.5 1.5 0 110-3 1.5 1.5 0 010 3z",
  bolt: "M13 2L4 14h7l-1 8 9-12h-7l1-8z",
  atom: "M12 10.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm0-7c2 0 3.6 3.8 3.6 8.5S14 20.5 12 20.5 8.4 16.7 8.4 12 10 3.5 12 3.5zm0 2c-.6 0-1.6 2.3-1.6 6.5s1 6.5 1.6 6.5 1.6-2.3 1.6-6.5S12.6 5.5 12 5.5zM3.8 7.3c1-1.7 5.1-.7 9.1 1.6s6.9 5.4 5.9 7.1-5.1.7-9.1-1.6-6.9-5.4-5.9-7.1zm1.8 1c-.3.5 1.2 2.5 5.1 4.7s6.3 2.6 6.6 2.1-1.2-2.5-5.1-4.7-6.3-2.6-6.6-2.1z",
  rocket: "M12 2c3.5 1 6 3.6 7 7l-4 4 1 5-3 3-2-5-3-3-5-2 3-3 5 1 4-4zM8 15l-2 4-2 1 1-2 4-2-1-1z",
  server: "M4 4h16v6H4V4zm0 10h16v6H4v-6zm3-8v2h2V6H7zm0 10v2h2v-2H7z",
  brain:
    "M9 3a4 4 0 00-4 4v.4A4 4 0 003 11a4 4 0 002 3.5V15a4 4 0 004 4h1V3H9zm6 0h-1v16h1a4 4 0 004-4v-.5A4 4 0 0021 11a4 4 0 00-2-3.6V7a4 4 0 00-4-4z",
  users:
    "M8 11a4 4 0 110-8 4 4 0 010 8zm8.5 1a3.5 3.5 0 110-7 3.5 3.5 0 010 7zM2 21a6 6 0 0112 0H2zm11.5 0a7.5 7.5 0 00-2.1-5.2A5 5 0 0122 21h-8.5z",
  building:
    "M4 21V3h11v4h5v14h-2v-2H6v2H4zm3-4h2v-2H7v2zm0-4h2v-2H7v2zm0-4h2V7H7v2zm4 8h2v-2h-2v2zm0-4h2v-2h-2v2zm0-4h2V7h-2v2zm4 8h2v-2h-2v2zm0-4h2v-2h-2v2z",
  plug: "M7 2h2v5h2V2h2v5h1a4 4 0 010 8h-1v7h-2v-7H9v7H7v-7H6a4 4 0 010-8h1V2z",
  moon: "M21 14.8A8.5 8.5 0 119.2 3a7 7 0 0011.8 11.8z",
  file: "M6 2h8l4 4v16H6V2zm7 1.5V7h3.5L13 3.5zM8 11h8v2H8v-2zm0 4h8v2H8v-2z",
  pen: "M4 17.5V21h3.5L18.1 10.4l-3.5-3.5L4 17.5zM19.4 9.1l1.2-1.2a2 2 0 000-2.8l-1.7-1.7a2 2 0 00-2.8 0l-1.2 1.2 4.5 4.5z",
  question:
    "M11 17h2v2h-2v-2zm1-14a5 5 0 00-5 5h2a3 3 0 116 0c0 2-3 2.2-3 5v1h2v-.7c0-1.8 3-2.2 3-5.3a5 5 0 00-5-5z",
};

function FaIcon({ name, className = "" }: { name: string; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d={ICON_PATHS[name] || ICON_PATHS.code} />
    </svg>
  );
}

function useJQueryInteractions() {
  useEffect(() => {
    const $window = $(window);
    const $html = $(document.documentElement);
    const $navLinks = $("[data-nav-link]");
    const $sections = $("main section[id]");
    let lastY = window.scrollY;

    const syncScroll = () => {
      const current = window.scrollY;
      $("[data-site-header]").toggleClass("is-hidden", current > lastY && current > 140);
      lastY = current;

      let active = "home";
      $sections.each((_, section) => {
        if ((section as HTMLElement).getBoundingClientRect().top < window.innerHeight * 0.42) {
          active = section.id;
        }
      });
      $navLinks.removeClass("is-active");
      $navLinks.filter(`[href="#${active}"]`).addClass("is-active");
    };

    $window.on("scroll.era resize.era", syncScroll);
    syncScroll();

    $(document).on("click.eraMenu", "[data-menu-toggle]", () => {
      $html.toggleClass("jq-mobile-open");
    });
    $(document).on("click.eraMenu", "[data-mobile-menu] a", () => {
      $html.removeClass("jq-mobile-open");
    });
    $(document).on("mouseenter.eraMagnet", "[data-magnetic]", function () {
      $(this).addClass("is-magnetic");
    });
    $(document).on("mouseleave.eraMagnet", "[data-magnetic]", function () {
      $(this).removeClass("is-magnetic");
    });
    $(document).on("submit.eraForm", "[data-contact-form]", function () {
      $(this).addClass("is-submitted");
      window.setTimeout(() => $(this).removeClass("is-submitted"), 1200);
    });
    $(document).on("click.eraFaq", "[data-faq-toggle]", function () {
      const $panel = $(this).closest("[data-faq-panel]");
      $panel.toggleClass("is-open").siblings("[data-faq-panel]").removeClass("is-open");
    });

    return () => {
      $window.off(".era");
      $(document).off(".eraMenu .eraMagnet .eraForm .eraFaq");
      $html.removeClass("jq-mobile-open");
    };
  }, []);
}

function ParticleUniverse({ theme = "cosmic" }: { theme?: "cosmic" | "hero" | "footer" }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    let width = (canvas.width = window.innerWidth * window.devicePixelRatio);
    let height = (canvas.height = window.innerHeight * window.devicePixelRatio);
    const density = window.innerWidth < 576 ? 0.22 : window.innerWidth < 992 ? 0.42 : 0.72;
    const count = Math.min(
      theme === "hero" ? 150 : 100,
      Math.floor((window.innerWidth * window.innerHeight * density) / 11000),
    );
    const mouse = { x: width / 2, y: height / 2, active: false };
    const colors =
      theme === "footer"
        ? ["#facc15", "#fb7185", "#a78bfa"]
        : ["#ffffff", "#facc15", "#38bdf8", "#fb7185"];
    const particles = Array.from({ length: count }, (_, index) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * (theme === "hero" ? 0.55 : 0.32) * window.devicePixelRatio,
      vy: (Math.random() - 0.5) * (theme === "hero" ? 0.55 : 0.32) * window.devicePixelRatio,
      r: (Math.random() * 2.4 + (index % 5 === 0 ? 1.6 : 0.7)) * window.devicePixelRatio,
      color: colors[index % colors.length],
    }));

    const resize = () => {
      width = canvas.width = window.innerWidth * window.devicePixelRatio;
      height = canvas.height = window.innerHeight * window.devicePixelRatio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };
    const move = (event: PointerEvent) => {
      mouse.x = event.clientX * window.devicePixelRatio;
      mouse.y = event.clientY * window.devicePixelRatio;
      mouse.active = true;
    };
    const leave = () => {
      mouse.active = false;
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerleave", leave);

    let raf = 0;
    const draw = () => {
      context.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i += 1) {
        const p = particles[i];
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const distance = Math.hypot(dx, dy) || 1;
          if (distance < 150 * window.devicePixelRatio) {
            const force = theme === "hero" ? -0.045 : 0.035;
            p.vx += (dx / distance) * force;
            p.vy += (dy / distance) * force;
          }
        }
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.995;
        p.vy *= 0.995;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        context.beginPath();
        context.shadowBlur = 16 * window.devicePixelRatio;
        context.shadowColor = p.color;
        context.fillStyle = p.color;
        context.globalAlpha = theme === "footer" ? 0.45 : 0.65;
        context.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        context.fill();

        for (let j = i + 1; j < particles.length; j += 1) {
          const q = particles[j];
          const d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < 120 * window.devicePixelRatio) {
            context.globalAlpha = 0.16 * (1 - d / (120 * window.devicePixelRatio));
            context.strokeStyle = p.color;
            context.lineWidth = window.devicePixelRatio;
            context.beginPath();
            context.moveTo(p.x, p.y);
            context.lineTo(q.x, q.y);
            context.stroke();
          }
        }
      }
      context.globalAlpha = 1;
      context.shadowBlur = 0;
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerleave", leave);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none inset-0 z-0 opacity-60 mix-blend-screen ${theme === "footer" ? "absolute" : "fixed"}`}
      aria-hidden="true"
    />
  );
}

function Loader({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const timer = window.setTimeout(onDone, 1300);
    return () => window.clearTimeout(timer);
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[250] grid place-items-center bg-ink text-white"
      exit={{ y: "-100%" }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      <ParticleUniverse theme="footer" />
      <div className="relative z-10 w-[min(86vw,520px)] text-center">
        <motion.div
          className="mx-auto mb-6 grid h-24 w-24 place-items-center rounded-[2rem] bg-sun text-ink ink-border-thick ink-shadow"
          animate={{ rotate: [0, -8, 8, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <FaIcon name="bolt" className="h-12 w-12" />
        </motion.div>
        <div
          className="font-comic section-title text-outline-white"
          style={{ color: "var(--sun)" }}
        >
          Era Roy
        </div>
        <div className="mt-4 h-4 rounded-full bg-white p-1 ink-border-thick">
          <motion.div
            className="h-full rounded-full bg-tomato"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.1, ease: "easeInOut" }}
          />
        </div>
        <p className="mt-4 font-black body-fluid">Loading animated universe</p>
      </div>
    </motion.div>
  );
}

function ComicCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(max-width: 767px), (prefers-reduced-motion: reduce)").matches) return;
    const move = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };
    const over = (event: Event) => {
      const target = event.target as HTMLElement;
      setHover(!!target.closest("a,button,[data-magnetic],input,textarea,label"));
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerover", over);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
    };
  }, [x, y]);

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden md:block"
      style={{ x: sx, y: sy }}
    >
      <motion.div
        className="-translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-ink bg-sun/80 p-2 mix-blend-multiply"
        animate={{ scale: hover ? 1.7 : 1, rotate: hover ? 25 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 18 }}
      >
        <FaIcon name="arrow" className="h-5 w-5 text-ink" />
      </motion.div>
    </motion.div>
  );
}

function EraCharacter({ mode = "idle" }: { mode?: "idle" | "wave" | "typing" | "celebrate" }) {
  return (
    <motion.svg
      viewBox="0 0 220 260"
      className="h-auto w-full drop-shadow-[8px_8px_0_var(--ink)]"
      aria-label="Original Era Roy cartoon character"
      animate={mode === "celebrate" ? { y: [0, -14, 0], rotate: [-2, 2, -2] } : { y: [0, -8, 0] }}
      transition={{ duration: mode === "celebrate" ? 1.6 : 4, repeat: Infinity, ease: "easeInOut" }}
    >
      <rect x="28" y="180" width="164" height="54" rx="10" fill="var(--ink)" />
      <rect
        x="42"
        y="154"
        width="136"
        height="62"
        rx="8"
        fill="var(--sky)"
        stroke="var(--ink)"
        strokeWidth="5"
      />
      <path d="M66 164h88v42H66z" fill="white" opacity="0.35" />
      <path
        d="M76 192l18-18 6 6-12 12 12 12-6 6-18-18zm68 0l-18 18-6-6 12-12-12-12 6-6 18 18z"
        fill="var(--ink)"
      />
      <path
        d="M58 153c4-42 28-66 54-66s49 24 53 66H58z"
        fill="var(--tomato)"
        stroke="var(--ink)"
        strokeWidth="5"
      />
      <circle cx="111" cy="78" r="54" fill="var(--sun)" stroke="var(--ink)" strokeWidth="5" />
      <path d="M64 70c6-36 32-58 68-50 20 5 31 20 37 38-33-15-63-13-105 12z" fill="var(--ink)" />
      <motion.g
        animate={{ x: mode === "typing" ? [0, 3, 0] : [0, 1.5, 0] }}
        transition={{ duration: 2.4, repeat: Infinity }}
      >
        <circle cx="91" cy="84" r="13" fill="white" stroke="var(--ink)" strokeWidth="4" />
        <circle cx="132" cy="84" r="13" fill="white" stroke="var(--ink)" strokeWidth="4" />
        <circle cx="94" cy="84" r="5" fill="var(--ink)" />
        <circle cx="135" cy="84" r="5" fill="var(--ink)" />
      </motion.g>
      <path
        d="M91 112c14 12 30 12 44 0"
        stroke="var(--ink)"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
      />
      <motion.path
        d="M58 150c-24 10-35 28-33 52"
        stroke="var(--ink)"
        strokeWidth="10"
        fill="none"
        strokeLinecap="round"
        animate={mode === "wave" ? { rotate: [-10, 20, -10] } : { rotate: [-4, 4, -4] }}
        style={{ transformOrigin: "58px 150px" }}
        transition={{ duration: mode === "wave" ? 0.9 : 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <path
        d="M163 150c24 10 35 28 33 52"
        stroke="var(--ink)"
        strokeWidth="10"
        fill="none"
        strokeLinecap="round"
      />
      <path d="M82 234v18M140 234v18" stroke="var(--ink)" strokeWidth="10" strokeLinecap="round" />
      <circle cx="25" cy="204" r="10" fill="var(--bubble)" stroke="var(--ink)" strokeWidth="4" />
    </motion.svg>
  );
}

function SpeechBubble({
  children,
  color = "white",
}: {
  children: React.ReactNode;
  color?: string;
}) {
  return (
    <div className="relative inline-block">
      <div
        className="ink-border-thick ink-shadow rounded-[1.5rem] px-5 py-3 font-black body-fluid"
        style={{ background: color }}
      >
        {children}
      </div>
      <svg className="absolute -bottom-5 left-8 h-7 w-10" viewBox="0 0 40 30" aria-hidden="true">
        <path
          d="M3 0h34L16 28z"
          fill={color}
          stroke="var(--ink)"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <path d="M4 0l12 28" stroke={color} strokeWidth="5" />
      </svg>
    </div>
  );
}

function Typewriter() {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = ROLES[index];
    const timer = setTimeout(
      () => {
        if (!deleting && text.length < current.length) setText(current.slice(0, text.length + 1));
        else if (!deleting) setDeleting(true);
        else if (text.length > 0) setText(current.slice(0, text.length - 1));
        else {
          setDeleting(false);
          setIndex((value) => (value + 1) % ROLES.length);
        }
      },
      deleting ? 35 : 70,
    );
    return () => clearTimeout(timer);
  }, [deleting, index, text]);

  return (
    <span className="text-tomato">
      {text}
      <span className="ml-1 inline-block h-7 w-2 animate-pulse bg-ink align-middle md:h-9" />
    </span>
  );
}

function SectionTitle({ kicker, title, note }: { kicker: string; title: string; note?: string }) {
  return (
    <div className="mx-auto max-w-4xl text-center" data-reveal>
      <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 font-comic button-fluid tracking-widest text-white ink-border-thick">
        <FaIcon name="bolt" className="h-4 w-4 text-sun" />
        {kicker}
      </div>
      <h2
        className="font-comic section-title leading-none text-outline-white"
        style={{ color: "white" }}
      >
        {title}
      </h2>
      {note && <p className="mx-auto mt-4 max-w-2xl body-fluid font-black opacity-85">{note}</p>}
    </div>
  );
}

function Hero() {
  return (
    <section
      id="home"
      className="world-section graph-hero relative min-h-[100svh] overflow-hidden bg-sky pt-28"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-[8%] top-[18%] h-28 w-28 rounded-full bg-sun opacity-60 blur-2xl" />
        <div className="absolute bottom-[12%] right-[8%] h-40 w-40 rounded-full bg-bubble opacity-60 blur-3xl" />
        <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(var(--ink)_1px,transparent_1px),linear-gradient(90deg,var(--ink)_1px,transparent_1px)] [background-size:48px_48px]" />
      </div>

      <div className="site-container relative z-10 grid gap-10 pb-20 md:grid-cols-[minmax(0,1fr)_minmax(280px,0.85fr)] md:items-center lg:gap-16">
        <div data-reveal>
          <SpeechBubble color="var(--bubble)">
            Public identity: Era Roy. Cinematic systems, web products, AI automation.
          </SpeechBubble>
          <motion.h1
            className="mt-10 font-comic hero-title leading-[0.9] text-outline-white"
            style={{ color: "white" }}
            initial={{ scale: 0.85, rotate: -2, opacity: 0 }}
            animate={{ scale: 1, rotate: -1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 160, damping: 16 }}
          >
            ERA
            <br />
            <span className="inline-block rotate-1 bg-sun px-3 text-ink ink-border-thick">ROY</span>
          </motion.h1>
          <p className="mt-6 font-black subtitle">
            <Typewriter />
          </p>
          <div className="mt-8 flex flex-wrap gap-3 sm:gap-4">
            <a
              href="#projects"
              className="group inline-flex min-h-11 items-center gap-2 rounded-full bg-tomato px-5 py-3 font-comic button-fluid tracking-wider text-white transition-transform hover:-translate-y-1 ink-border-thick ink-shadow"
            >
              Explore project city{" "}
              <FaIcon
                name="arrow"
                className="h-5 w-5 transition-transform group-hover:translate-x-1"
              />
            </a>
            <a
              href={`mailto:${CONTACT.email}`}
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-5 py-3 font-comic button-fluid tracking-wider transition-transform hover:-translate-y-1 ink-border-thick ink-shadow"
            >
              Contact Era <FaIcon name="mail" className="h-5 w-5" />
            </a>
          </div>
          <div className="mt-8 grid grid-cols-3 gap-3 sm:max-w-xl">
            {["Available", "AI Ready", "Remote"].map((item) => (
              <div
                key={item}
                className="rounded-2xl bg-white/85 p-3 text-center font-comic button-fluid ink-border"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="relative mx-auto w-[min(100%,390px)]" data-reveal>
          <EraCharacter mode="wave" />
          <motion.div
            className="absolute -right-2 top-4 w-24 rounded-2xl bg-white p-3 ink-border-thick ink-shadow md:-right-8"
            animate={{ y: [0, -10, 0], rotate: [2, -2, 2] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <FaIcon name="robot" className="mx-auto h-10 w-10 text-grape" />
            <div className="mt-1 text-center font-comic text-sm">AI Buddy</div>
          </motion.div>
        </div>
      </div>
      <div className="notebook-callout right-[8%] top-[18%] lg:block">Blueprint: hero scene</div>
      <div className="blueprint-mark bottom-[16%] left-[5%] lg:block" />
    </section>
  );
}

function Story() {
  return (
    <section id="story" className="world-section graph-about section-pad relative bg-paper">
      <div className="site-container">
        <SectionTitle
          kicker="Origin Story"
          title="A Living Digital Cartoon"
          note="Behind Era Roy is Radhika Gupta, transforming ideas into interactive digital experiences."
        />
        <div className="mt-14 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="panel bg-white p-6" data-reveal>
            <div className="font-comic card-title">Era Roy Studio System</div>
            <p className="mt-3 body-fluid font-black leading-relaxed">
              The portfolio is designed as a playable brand universe: bold typography, original
              vector characters, interactive story beats, silky scroll movement, and practical
              engineering behind every animated layer.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {["Web", "AI", "CRM", "ERP"].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl bg-sun p-4 text-center font-comic button-fluid ink-border"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="comic-grid-3">
            {[
              { name: "AI Robot Assistant", icon: <CyberRobot />, color: "var(--sky)" },
              { name: "Code Ninja", icon: <CodeNinja />, color: "var(--mint)" },
              { name: "Automation Wizard", icon: <AutomationWizard />, color: "var(--bubble)" },
              { name: "Cloud Rider", icon: <CloudRider />, color: "var(--sun)" },
              { name: "Pixel Mascot", icon: <PixelMascot />, color: "var(--tomato)" },
              {
                name: "Data Guardian",
                icon: <FaIcon name="shield" className="h-20 w-20" />,
                color: "var(--grape)",
              },
            ].map((item, index) => (
              <motion.div
                key={item.name}
                className="panel flex h-full flex-col items-center justify-center p-4 text-center"
                style={{
                  background: item.color,
                  color: item.color === "var(--grape)" ? "white" : "var(--ink)",
                }}
                whileHover={{ y: -8, rotate: index % 2 ? -2 : 2 }}
                data-magnetic
              >
                <div className="flex h-24 items-end justify-center">{item.icon}</div>
                <div className="mt-3 font-comic button-fluid">{item.name}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <div className="notebook-callout left-[4%] top-[18%] xl:block">Origin sketch</div>
    </section>
  );
}

function Skills() {
  return (
    <section
      id="skills"
      className="world-section graph-skills section-pad relative overflow-hidden bg-sun"
    >
      <div className="site-container relative z-10">
        <SectionTitle
          kicker="Skill Worlds"
          title="Cartoon Tech Map"
          note="Every skill becomes a small animated place in Era Roy's production universe."
        />
        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {SKILLS.map((skill, index) => (
            <motion.button
              key={skill.name}
              className="group panel min-h-[190px] p-4 text-left"
              style={{
                background: skill.color,
                color:
                  skill.color === "var(--ink)" || skill.color === "var(--grape)"
                    ? "white"
                    : "var(--ink)",
              }}
              whileHover={{ y: -10, rotate: index % 2 ? -2 : 2 }}
              whileTap={{ scale: 0.97 }}
              data-magnetic
            >
              <div className="flex items-start justify-between gap-3">
                <FaIcon name={skill.icon} className="h-9 w-9" />
                <span className="rounded-full bg-white px-2 py-1 font-comic text-xs text-ink ink-border">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="mt-8 font-comic card-title">{skill.name}</div>
              <div className="mt-1 body-fluid font-black opacity-85">{skill.place}</div>
              <div className="mt-5 h-2 rounded-full bg-white/70 ink-border" />
            </motion.button>
          ))}
        </div>
      </div>
      <div className="blueprint-mark right-[6%] top-[12%] lg:block" />
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="world-section graph-services section-pad bg-paper">
      <div className="site-container">
        <SectionTitle
          kicker="Service Deck"
          title="What Era Builds"
          note="Strategy, design, engineering, automation, and operational systems with a premium interaction layer."
        />
        <div className="comic-grid-4 mt-14">
          {SERVICES.map((service, index) => (
            <motion.article
              key={service.title}
              className="panel h-full bg-white p-5"
              whileHover={{ y: -8, rotate: index % 2 ? 1.5 : -1.5 }}
              data-magnetic
            >
              <div className="flex items-center justify-between">
                <FaIcon name={service.icon} className="h-10 w-10 text-tomato" />
                <div className="h-8 w-8 rounded-full bg-sun ink-border" />
              </div>
              <h3 className="mt-6 font-comic card-title">{service.title}</h3>
              <p className="mt-3 body-fluid font-black leading-snug">{service.text}</p>
            </motion.article>
          ))}
        </div>
      </div>
      <div className="blueprint-mark left-[7%] top-[14%] lg:block" />
    </section>
  );
}

function SceneFeatureSections() {
  return (
    <>
      {EXTRA_SCENES.map((scene, index) => (
        <section
          key={scene.id}
          id={scene.id}
          className="world-section graph-services section-pad relative overflow-hidden"
          style={{ background: scene.color }}
        >
          <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(var(--ink)_1px,transparent_1px)] [background-size:22px_22px]" />
          <div className="site-container relative z-10 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <motion.div
              className="panel bg-white p-6"
              whileHover={{ rotate: index % 2 ? 1.5 : -1.5, y: -8 }}
              data-magnetic
            >
              <div className="mb-4 inline-flex rounded-full bg-ink px-4 py-2 font-comic button-fluid text-white ink-border-thick">
                {scene.kicker}
              </div>
              <h2
                className="font-comic section-title leading-none text-outline-white"
                style={{ color: "var(--sun)" }}
              >
                {scene.title}
              </h2>
              <p className="mt-5 body-fluid font-black leading-relaxed">{scene.text}</p>
            </motion.div>
            <div className="grid gap-4 sm:grid-cols-3">
              {[0, 1, 2].map((item) => (
                <motion.div
                  key={item}
                  className="panel grid min-h-[190px] place-items-center bg-white/85 p-5 text-center"
                  animate={{ y: [0, item % 2 ? -10 : 10, 0] }}
                  transition={{ duration: 4 + item, repeat: Infinity, ease: "easeInOut" }}
                >
                  <FaIcon name={scene.icon} className="h-16 w-16 text-tomato" />
                  <div className="font-comic button-fluid">Layer {item + 1}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      ))}
    </>
  );
}

function FeaturedProjects() {
  return (
    <section
      id="projects"
      className="world-section graph-projects section-pad relative overflow-hidden bg-paper"
    >
      <div className="site-container">
        <SectionTitle
          kicker="Featured Projects"
          title="Interactive Case Portals"
          note="Premium project cards with motion depth, glowing borders, and smooth opening signals."
        />
        <div className="comic-grid-3 mt-14">
          {PROJECTS.slice(0, 3).map((project, index) => (
            <motion.button
              key={project.name}
              className="panel relative min-h-[310px] overflow-hidden bg-white p-5 text-left"
              whileHover={{ y: -12, rotateX: 4, rotateY: index % 2 ? -4 : 4 }}
              onClick={() =>
                toast(project.name, { description: "GSAP-style project portal opening soon." })
              }
              data-magnetic
            >
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  background: `radial-gradient(circle at 30% 20%, ${project.color}, transparent 45%)`,
                }}
              />
              <div className="relative z-10 flex h-full flex-col justify-between">
                <div className="flex items-center justify-between">
                  <FaIcon name={project.icon} className="h-12 w-12 text-tomato" />
                  <span className="rounded-full bg-sun px-3 py-1 font-comic text-sm ink-border">
                    0{index + 1}
                  </span>
                </div>
                <div>
                  <h3 className="font-comic section-title leading-none">{project.name}</h3>
                  <p className="mt-3 body-fluid font-black">{project.type}</p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCity() {
  return (
    <section
      id="project-city"
      className="world-section graph-projects section-pad relative overflow-hidden bg-sky"
    >
      <div className="site-container relative z-10">
        <SectionTitle
          kicker="Project City"
          title="Living Build District"
          note="Projects are presented as laboratories, towers, factories, and orbit stations inside a scrollable cartoon city."
        />
        <div className="mt-16 grid grid-cols-1 items-end gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project, index) => {
            const maxH = 230 + ((index * 43) % 130);
            const height = `clamp(190px, ${22 + index * 2}vw, ${maxH}px)`;
            return (
              <motion.button
                key={project.name}
                className="group relative flex flex-col items-stretch text-left"
                whileHover={{ y: -14 }}
                onClick={() =>
                  toast(project.name, {
                    description: `${project.type} case study is being animated.`,
                  })
                }
                data-magnetic
              >
                <div
                  className="flex flex-col rounded-t-3xl ink-border-thick ink-shadow"
                  style={{ background: project.color, height }}
                >
                  <div className="flex items-center justify-between gap-3 p-4">
                    <div>
                      <div className="font-comic card-title text-white text-outline-white">
                        {project.name}
                      </div>
                      <div className="font-black body-fluid opacity-85">{project.type}</div>
                    </div>
                    <FaIcon name={project.icon} className="h-10 w-10 shrink-0" />
                  </div>
                  <div className="grid flex-1 grid-cols-4 gap-2 px-4 pb-4">
                    {Array.from({ length: Math.floor(maxH / 34) * 4 }).map((_, item) => (
                      <div key={item} className="rounded-md bg-white/90 ink-border" />
                    ))}
                  </div>
                </div>
                <div className="rounded-b-xl bg-ink px-4 py-3 text-center font-comic button-fluid tracking-wider text-white ink-border-thick">
                  Open Scene
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
      <div className="notebook-callout bottom-[12%] right-[4%] xl:block">City wireframe</div>
    </section>
  );
}

function Journey() {
  return (
    <section
      id="journey"
      className="world-section graph-projects section-pad overflow-hidden bg-bubble"
    >
      <div className="site-container">
        <SectionTitle
          kicker="Horizontal Story"
          title="The Era Walk Cycle"
          note="A timeline shaped like a storyboard, from learning to future AI-native systems."
        />
      </div>
      <div
        className="site-container mt-14 overflow-x-auto pb-8 snap-x snap-mandatory"
        data-lenis-prevent
      >
        <div className="flex min-w-max gap-6 pr-4">
          {JOURNEY.map((step, index) => (
            <motion.article
              key={step.title}
              className="panel w-[min(80vw,310px)] snap-center bg-white p-5"
              whileHover={{ y: -8 }}
            >
              <div className="flex items-center justify-between">
                <div className="font-comic section-title text-tomato">{step.year}</div>
                <div className="rounded-full bg-sun p-3 ink-border">
                  <FaIcon name={index % 2 ? "rocket" : "shield"} className="h-6 w-6" />
                </div>
              </div>
              <h3 className="mt-5 font-comic card-title">{step.title}</h3>
              <p className="mt-3 body-fluid font-black leading-snug">{step.text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function AchievementsTestimonials() {
  return (
    <section
      id="achievements"
      className="world-section graph-services section-pad bg-ink text-white"
    >
      <div className="site-container">
        <SectionTitle
          kicker="Trophy Room"
          title="Signals Of Trust"
          note="Animated badges, launch markers, and client-style speech panels without template cards."
        />
        <div className="comic-grid-3 mt-14">
          {TROPHIES.map((item, index) => (
            <motion.div
              key={item}
              className="panel bg-sun p-5 text-center text-ink"
              whileHover={{ rotate: index % 2 ? 2 : -2, y: -8 }}
            >
              <FaIcon name="trophy" className="mx-auto h-12 w-12 text-tomato" />
              <div className="mt-4 font-comic card-title">{item}</div>
            </motion.div>
          ))}
        </div>
        <div id="testimonials" className="mt-16 grid gap-6 md:grid-cols-2">
          {[
            "Era Roy turns technical complexity into experiences people remember.",
            "The work feels like a premium animated product launch, not a standard portfolio.",
          ].map((quote) => (
            <div
              key={quote}
              className="rounded-[2rem] bg-white p-6 text-ink ink-border-thick ink-shadow"
            >
              <div className="font-comic card-title">Client Signal</div>
              <p className="mt-3 body-fluid font-black leading-relaxed">{quote}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  return (
    <section
      id="faq"
      className="world-section graph-about section-pad relative overflow-hidden bg-paper"
    >
      <div className="site-container">
        <SectionTitle
          kicker="FAQ"
          title="Comic Help Desk"
          note="Fast answers in an animated accordion layout with premium shadows and strong tap targets."
        />
        <div className="mx-auto mt-14 grid max-w-4xl gap-4">
          {FAQS.map((item, index) => (
            <div
              key={item.q}
              data-faq-panel
              className={`panel overflow-hidden bg-white ${index === 0 ? "is-open" : ""}`}
            >
              <button
                data-faq-toggle
                className="flex min-h-16 w-full items-center justify-between gap-4 p-5 text-left font-comic card-title"
                type="button"
              >
                <span>{item.q}</span>
                <span
                  data-faq-icon
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-sun ink-border"
                >
                  <FaIcon name="question" className="h-5 w-5" />
                </span>
              </button>
              <div data-faq-content>
                <div data-faq-inner>
                  <p className="px-5 pb-5 body-fluid font-black leading-relaxed">{item.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section
      id="cta"
      className="world-section graph-projects section-pad relative overflow-hidden bg-tomato text-white"
    >
      <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(135deg,var(--ink)_25%,transparent_25%),linear-gradient(225deg,var(--ink)_25%,transparent_25%)] [background-size:28px_28px]" />
      <div className="site-container relative z-10 text-center">
        <div className="mx-auto max-w-4xl">
          <h2
            className="font-comic hero-title leading-none text-outline-white"
            style={{ color: "white" }}
          >
            Build A Scene Visitors Remember
          </h2>
          <p className="mx-auto mt-6 max-w-2xl subtitle font-black">
            Bring Era Roy into your web, AI automation, CRM, ERP, or SaaS project and turn it into a
            premium digital experience.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="#contact"
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-sun px-6 py-3 font-comic button-fluid text-ink ink-border-thick ink-shadow"
            >
              Start a project <FaIcon name="arrow" className="h-5 w-5" />
            </a>
            <a
              href={CONTACT.whatsappUrl}
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-6 py-3 font-comic button-fluid text-ink ink-border-thick ink-shadow"
            >
              WhatsApp Era <FaIcon name="whatsapp" className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [typing, setTyping] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    toast.success("Message launched", {
      description: `Thanks ${form.get("name") || "friend"}. Era Roy will reply soon.`,
    });
    event.currentTarget.reset();
  }

  return (
    <section
      id="contact"
      className="world-section graph-contact section-pad relative overflow-hidden bg-mint"
    >
      <div className="site-container">
        <SectionTitle
          kicker="Era Roy HQ"
          title="Launch A Signal"
          note="Email, WhatsApp, Instagram, and an interactive form connected to the robot assistant scene."
        />
        <div className="mt-14 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="relative mx-auto w-[min(100%,420px)]">
            <EraCharacter mode={typing ? "typing" : "idle"} />
            <div className="absolute right-0 top-2 scale-90 sm:scale-100">
              <SpeechBubble color="white">
                {typing ? "Robot assistant is listening." : "Ready for a new mission."}
              </SpeechBubble>
            </div>
          </div>
          <div className="grid gap-5">
            <div className="panel bg-white p-5">
              <div className="grid gap-3 sm:grid-cols-3">
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-paper p-3 font-comic button-fluid ink-border"
                >
                  <FaIcon name="mail" className="h-5 w-5" /> Email
                </a>
                <a
                  href={CONTACT.whatsappUrl}
                  className="flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-paper p-3 font-comic button-fluid ink-border"
                >
                  <FaIcon name="whatsapp" className="h-5 w-5" /> WhatsApp
                </a>
                <a
                  href={CONTACT.instagram}
                  className="flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-paper p-3 font-comic button-fluid ink-border"
                >
                  <FaIcon name="instagram" className="h-5 w-5" /> Instagram
                </a>
              </div>
              <div className="mt-4 grid gap-2 body-fluid font-black">
                <div>Email: {CONTACT.email}</div>
                <div>WhatsApp: {CONTACT.whatsapp}</div>
                <div>Instagram: {CONTACT.instagram}</div>
              </div>
            </div>
            <form
              data-contact-form
              onSubmit={onSubmit}
              className="panel space-y-4 bg-white p-5 sm:p-7"
            >
              <div className="font-comic card-title">Send A Project Brief</div>
              <label className="block font-comic text-sm tracking-widest">
                Name
                <input
                  name="name"
                  required
                  onFocus={() => setTyping(true)}
                  onBlur={() => setTyping(false)}
                  className="mt-1 w-full rounded-xl bg-paper px-4 py-3 font-bold body-fluid ink-border-thick focus:bg-sun focus:outline-none"
                />
              </label>
              <label className="block font-comic text-sm tracking-widest">
                Email
                <input
                  name="email"
                  type="email"
                  required
                  onFocus={() => setTyping(true)}
                  onBlur={() => setTyping(false)}
                  className="mt-1 w-full rounded-xl bg-paper px-4 py-3 font-bold body-fluid ink-border-thick focus:bg-sun focus:outline-none"
                />
              </label>
              <label className="block font-comic text-sm tracking-widest">
                Message
                <textarea
                  name="message"
                  required
                  rows={4}
                  onFocus={() => setTyping(true)}
                  onBlur={() => setTyping(false)}
                  className="mt-1 min-h-28 w-full resize-y rounded-xl bg-paper px-4 py-3 font-bold body-fluid ink-border-thick focus:bg-mint focus:outline-none"
                />
              </label>
              <button
                type="submit"
                data-magnetic
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-tomato px-6 py-3 font-comic button-fluid tracking-wider text-white ink-border-thick ink-shadow"
              >
                Launch message <FaIcon name="arrow" className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id)),
      { rootMargin: "-40% 0px -55% 0px" },
    );
    NAV.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY;
      setHidden(current > lastY.current && current > 140 && !open);
      lastY.current = current;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  return (
    <motion.header
      data-site-header
      className="fixed left-1/2 top-3 z-50 w-[min(calc(100%_-_24px),1180px)] -translate-x-1/2 sm:top-4 sm:w-[min(calc(100%_-_32px),1180px)]"
      animate={{ y: hidden ? -120 : 0, opacity: hidden ? 0 : 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex min-h-16 items-center justify-between gap-3 rounded-[1.6rem] border-4 border-ink bg-white/70 px-4 py-2 shadow-[8px_8px_0_var(--ink)] backdrop-blur-xl supports-[backdrop-filter]:bg-white/55 lg:min-h-20 lg:px-5">
        <a
          href="#home"
          className="flex items-center gap-2 font-comic text-xl sm:text-2xl"
          aria-label="Era Roy home"
        >
          <span className="grid h-9 w-9 place-items-center rounded-full bg-tomato text-white ink-border-thick">
            <FaIcon name="bolt" className="h-5 w-5" />
          </span>
          Era Roy
        </a>
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
          {NAV.map((item) => (
            <a
              key={item.id}
              data-nav-link
              href={`#${item.id}`}
              className={`relative rounded-full px-3 py-2 font-comic text-sm tracking-wider transition-all after:absolute after:bottom-1 after:left-3 after:h-1 after:rounded-full after:bg-tomato after:transition-all ${active === item.id ? "bg-ink text-white after:w-[calc(100%-24px)]" : "hover:bg-sun after:w-0 hover:after:w-[calc(100%-24px)]"}`}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-2 lg:flex">
          <button
            className="grid min-h-11 min-w-11 place-items-center rounded-full bg-paper ink-border-thick"
            aria-label="Toggle theme preview"
          >
            <FaIcon name="moon" className="h-5 w-5" />
          </button>
          <a
            href={`mailto:${CONTACT.email}?subject=Resume request`}
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-sun px-4 py-2 font-comic text-sm tracking-wider ink-border-thick"
          >
            <FaIcon name="file" className="h-4 w-4" /> Resume
          </a>
          <a
            href="#contact"
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-tomato px-4 py-2 font-comic text-sm tracking-wider text-white ink-border-thick ink-shadow"
          >
            Hire Me
          </a>
        </div>
        <button
          data-menu-toggle
          className="min-h-11 min-w-11 rounded-full bg-sun px-3 py-1 font-comic lg:hidden ink-border-thick"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            data-mobile-menu
            className="fixed inset-0 top-[-12px] z-[-1] grid min-h-screen content-center gap-3 bg-ink/95 p-6 pt-28 backdrop-blur-xl lg:hidden"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
          >
            {NAV.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setOpen(false)}
                className="min-h-14 rounded-2xl bg-paper px-4 py-3 text-center font-comic card-title text-ink hover:bg-sun ink-border-thick"
              >
                {item.label}
              </a>
            ))}
            <div className="mt-4 grid grid-cols-2 gap-3">
              <a
                href={`mailto:${CONTACT.email}?subject=Resume request`}
                className="rounded-full bg-sun px-4 py-3 text-center font-comic text-ink ink-border-thick"
              >
                Resume
              </a>
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="rounded-full bg-tomato px-4 py-3 text-center font-comic text-white ink-border-thick"
              >
                Hire Me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function Footer() {
  const links = [
    { label: "Instagram", icon: "instagram", href: CONTACT.instagram },
    { label: "Email", icon: "mail", href: `mailto:${CONTACT.email}` },
    { label: "WhatsApp", icon: "whatsapp", href: CONTACT.whatsappUrl },
    { label: "GitHub", icon: "github", href: "#home" },
    { label: "LinkedIn", icon: "linkedin", href: "#home" },
  ];

  return (
    <footer className="relative overflow-hidden bg-ink py-16 text-white">
      <ParticleUniverse theme="footer" />
      <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(var(--sun)_1px,transparent_1px),linear-gradient(90deg,var(--sun)_1px,transparent_1px)] [background-size:60px_60px]" />
      <div className="site-container relative z-10">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr_1fr_1fr]">
          <div className="panel bg-white p-6 text-ink">
            <div className="font-comic section-title leading-none">Era Roy</div>
            <p className="mt-4 body-fluid font-black leading-relaxed">
              A premium animated developer universe by Radhika Gupta, built for memorable web, AI
              automation, CRM, ERP, and SaaS launches.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  aria-label={link.label}
                  className="grid min-h-11 min-w-11 place-items-center rounded-full bg-sun text-ink transition-transform hover:-translate-y-1 ink-border-thick"
                >
                  <FaIcon name={link.icon} className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <div className="font-comic card-title text-sun">Quick Links</div>
            <div className="mt-4 grid gap-2">
              {NAV.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="font-black body-fluid opacity-80 transition-colors hover:text-sun"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
          <div>
            <div className="font-comic card-title text-sun">Services</div>
            <div className="mt-4 grid gap-2">
              {SERVICES.slice(0, 6).map((item) => (
                <a
                  key={item.title}
                  href="#services"
                  className="font-black body-fluid opacity-80 transition-colors hover:text-sun"
                >
                  {item.title}
                </a>
              ))}
            </div>
          </div>
          <div>
            <div className="font-comic card-title text-sun">Contact</div>
            <div className="mt-4 grid gap-3 body-fluid font-black opacity-90">
              <a href={`mailto:${CONTACT.email}`} className="hover:text-sun">
                {CONTACT.email}
              </a>
              <a href={CONTACT.whatsappUrl} className="hover:text-sun">
                {CONTACT.whatsapp}
              </a>
              <a href={CONTACT.instagram} className="hover:text-sun">
                Instagram
              </a>
            </div>
          </div>
        </div>
        <motion.div
          className="mt-12 rounded-full bg-white/10 px-5 py-4 text-center font-comic button-fluid ink-border"
          animate={{ opacity: [0.75, 1, 0.75] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          © 2026 Era Roy. Built with Next.js + GSAP + Love.
        </motion.div>
      </div>
    </footer>
  );
}

export default function Portfolio() {
  const [loading, setLoading] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const barX = useTransform(scrollYProgress, [0, 1], ["-100%", "0%"]);

  useLenisScroll();
  useScrollReveals();
  useJQueryInteractions();

  return (
    <div ref={ref} className="relative overflow-x-clip">
      <AnimatePresence>{loading && <Loader onDone={() => setLoading(false)} />}</AnimatePresence>
      <ParticleUniverse theme="hero" />
      <ComicCursor />
      <MagicOrb />
      <CursorTrail />
      <BackgroundWorld />
      <SwingingWebHero />
      <FlyingCharacters />
      <PeekingCorner />
      <motion.div
        className="fixed left-0 right-0 top-0 z-[60] h-2 origin-left bg-tomato"
        style={{ x: barX }}
      />
      <Nav />
      <main>
        <Hero />
        <Story />
        <Journey />
        <Skills />
        <SceneFeatureSections />
        <Services />
        <FeaturedProjects />
        <ProjectCity />
        <AchievementsTestimonials />
        <FAQ />
        <Contact />
        <CTA />
      </main>
      <Footer />
      <Toaster
        position="bottom-center"
        toastOptions={{ style: { fontFamily: "var(--font-body)", fontWeight: 800 } }}
      />
    </div>
  );
}
