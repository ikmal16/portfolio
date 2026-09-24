"use client";

import {
  useState,
  useRef,
  useCallback,
  useMemo,
  type ReactNode,
  type MouseEvent,
  type KeyboardEvent,
} from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import {
  ExternalLink,
  ImageIcon,
  ChevronLeft,
  ChevronRight,
  X,
  ArrowRight,
  ArrowUpRight,
  ArrowDown,
  Sparkles,
  Layers,
  Target,
  Zap,
  TrendingUp,
  CheckCircle2,
  GitBranch,
} from "lucide-react";

import GithubIcon from "./icon/GithubIcon";

// ─────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────
type AccentKey =
  | "sky"
  | "violet"
  | "emerald"
  | "amber"
  | "rose"
  | "cyan"
  | "orange";

type AccentStyles = {
  text: string;
  border: string;
  glow: string;
  badge: string;
  ring: string;
  dot: string;
};

type FilterId = "all" | "fullstack" | "web" | "iot";

type Project = {
  id: string;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  problem: string;
  solution: string;
  features: string[];
  results: string[];
  technologies: string[];
  category: string;
  filter: Exclude<FilterId, "all">;
  github: string;
  live: string;
  featured: boolean;
  dominant?: boolean;
  images: string[];
  accent: AccentKey;
};

// ─────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────
const projects: Project[] = [
  {
    id: "cfac",
    title: "Campus Facilities Management System",
    shortTitle: "CFac",
    tagline: "Full-Stack · Flagship Project",
    description:
      "A centralized web application designed to streamline campus facility booking, approval workflows, payments, booking history, and notifications.",
    problem:
      "Campus facility bookings were managed manually through emails and spreadsheets, causing scheduling conflicts, lost requests, and no visibility into approval status.",
    solution:
      "Built a centralized web platform with role-based access, automated approval workflows, integrated payment tracking, and real-time notification updates.",
    features: [
      "Role-based dashboards (Student, Staff, Admin)",
      "Multi-step booking & approval workflow",
      "Payment tracking with status history",
      "Real-time notification system",
      "Booking analytics & history",
    ],
    results: [
      "Reduced booking approval time from days to hours",
      "Eliminated scheduling conflicts via live availability",
      "Centralized all campus facility data in one place",
    ],
    technologies: [
      "React.js",
      "FastAPI",
      "Supabase",
      "Git",
      "GitHub",
      "Render",
      "Vercel",
    ],
    category: "Full-Stack Web Application",
    filter: "fullstack",
    github: "#",
    live: "https://campusfacilitymanagementsystem.vercel.app/",
    featured: true,
    dominant: true,
    images: [
      "/cfac1.png",
      "/cfac2.png",
      "/cfac3.png",
      "/cfac4.png",
      "/cfac5.png",
    ],
    accent: "sky",
  },
  {
    id: "hostel",
    title: "Hostel Complaint Management System",
    shortTitle: "Hostel CMS",
    tagline: "Full-Stack · Analytics",
    description:
      "A web platform that lets hostel residents submit, track, and resolve complaints with an admin analytics dashboard.",
    problem:
      "Hostel complaints were tracked informally, leading to slow resolutions and no visibility into recurring issues.",
    solution:
      "Designed a complaint tracking system with status workflows and a Chart.js-powered admin dashboard for trend analysis.",
    features: [
      "Complaint submission with image uploads",
      "Status tracking (Pending / In Progress / Resolved)",
      "Admin dashboard with analytics charts",
      "Category-based filtering",
    ],
    results: [
      "Faster complaint resolution cycle",
      "Data-driven maintenance decisions",
    ],
    technologies: ["React.js", "Supabase", "Vercel", "Chart.js"],
    category: "Full-Stack Web Application",
    filter: "fullstack",
    github: "#",
    live: "#",
    featured: true,
    dominant: false,
    images: ["/complaint (1).png", "/complaint (2).png", "/complaint (3).png"],
    accent: "violet",
  },
  {
    id: "va",
    title: "Virtual Assistant",
    shortTitle: "Virtual Assistant",
    tagline: "Internship Project",
    description:
      "A web-based virtual assistant project developed during my internship, focusing on frontend development and API integration.",
    problem:
      "Internal teams needed a simple interface to interact with backend AI services without technical overhead.",
    solution:
      "Built a clean React frontend that consumes FastAPI REST endpoints, delivering a smooth conversational experience.",
    features: [
      "Conversational UI with streaming responses",
      "REST API integration",
      "Responsive design",
    ],
    results: ["Delivered working prototype during internship"],
    technologies: ["React.js", "FastAPI", "REST API"],
    category: "Web Application",
    filter: "web",
    github: "#",
    live: "#",
    featured: false,
    images: ["/Va.jpg"],
    accent: "emerald",
  },
  {
    id: "fan",
    title: "Automatic Laptop Fan Control",
    shortTitle: "Fan Control",
    tagline: "IoT · Hardware",
    description:
      "An IoT-based system that monitors temperature and automatically controls laptop cooling based on temperature conditions.",
    problem:
      "Laptops overheat under load because built-in fan curves are conservative.",
    solution:
      "Built an Arduino-based controller that reads temperature sensors and drives an external fan proportionally.",
    features: [
      "Temperature sensing",
      "Automatic fan control",
      "LCD status display",
    ],
    results: ["Measurable temperature reduction under load"],
    technologies: ["Arduino", "IoT", "C++", "Temperature Sensor"],
    category: "IoT",
    filter: "iot",
    github: "#",
    live: "#",
    featured: false,
    images: [
      "circuitdiagram.jpg",
      "/autofanprototype.jpg",
      "/actualdiagram.jpg",
    ],
    accent: "orange",
  },
];

const FILTERS: { id: FilterId; label: string }[] = [
  { id: "all", label: "All" },
  { id: "fullstack", label: "Full-Stack" },
  { id: "web", label: "Web Application" },
  { id: "iot", label: "IoT" },
];

// ─────────────────────────────────────────────────────────────
// Accent map
// ─────────────────────────────────────────────────────────────
const ACCENTS: Record<AccentKey, AccentStyles> = {
  sky: {
    text: "text-sky-400",
    border: "hover:border-sky-400/40",
    glow: "from-sky-500/30 via-sky-500/10 to-transparent",
    badge: "border-sky-400/30 bg-sky-400/10 text-sky-300",
    ring: "ring-sky-400/40",
    dot: "bg-sky-400",
  },
  violet: {
    text: "text-violet-400",
    border: "hover:border-violet-400/40",
    glow: "from-violet-500/30 via-violet-500/10 to-transparent",
    badge: "border-violet-400/30 bg-violet-400/10 text-violet-300",
    ring: "ring-violet-400/40",
    dot: "bg-violet-400",
  },
  emerald: {
    text: "text-emerald-400",
    border: "hover:border-emerald-400/40",
    glow: "from-emerald-500/30 via-emerald-500/10 to-transparent",
    badge: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
    ring: "ring-emerald-400/40",
    dot: "bg-emerald-400",
  },
  amber: {
    text: "text-amber-400",
    border: "hover:border-amber-400/40",
    glow: "from-amber-500/30 via-amber-500/10 to-transparent",
    badge: "border-amber-400/30 bg-amber-400/10 text-amber-300",
    ring: "ring-amber-400/40",
    dot: "bg-amber-400",
  },
  rose: {
    text: "text-rose-400",
    border: "hover:border-rose-400/40",
    glow: "from-rose-500/30 via-rose-500/10 to-transparent",
    badge: "border-rose-400/30 bg-rose-400/10 text-rose-300",
    ring: "ring-rose-400/40",
    dot: "bg-rose-400",
  },
  cyan: {
    text: "text-cyan-400",
    border: "hover:border-cyan-400/40",
    glow: "from-cyan-500/30 via-cyan-500/10 to-transparent",
    badge: "border-cyan-400/30 bg-cyan-400/10 text-cyan-300",
    ring: "ring-cyan-400/40",
    dot: "bg-cyan-400",
  },
  orange: {
    text: "text-orange-400",
    border: "hover:border-orange-400/40",
    glow: "from-orange-500/30 via-orange-500/10 to-transparent",
    badge: "border-orange-400/30 bg-orange-400/10 text-orange-300",
    ring: "ring-orange-400/40",
    dot: "bg-orange-400",
  },
};

// ─────────────────────────────────────────────────────────────
// Tilt wrapper
// ─────────────────────────────────────────────────────────────
type TiltCardProps = {
  children: ReactNode;
  className?: string;
  reduceMotion: boolean;
  intensity?: number;
};

function TiltCard({
  children,
  className = "",
  reduceMotion,
  intensity = 4,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(
    useTransform(y, [-0.5, 0.5], [intensity, -intensity]),
    { stiffness: 200, damping: 20 },
  );
  const rotateY = useSpring(
    useTransform(x, [-0.5, 0.5], [-intensity, intensity]),
    { stiffness: 200, damping: 20 },
  );

  const handleMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (reduceMotion) return;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      x.set((e.clientX - rect.left) / rect.width - 0.5);
      y.set((e.clientY - rect.top) / rect.height - 0.5);
      el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      el.style.setProperty("--my", `${e.clientY - rect.top}px`);
    },
    [x, y, reduceMotion],
  );

  const handleLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={
        reduceMotion
          ? undefined
          : { rotateX, rotateY, transformPerspective: 1000 }
      }
      className={`group/card relative ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 rounded-2xl opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
        style={{
          background:
            "radial-gradient(500px circle at var(--mx, 50%) var(--my, 50%), rgba(56,189,248,0.10), transparent 40%)",
        }}
      />
      {children}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────
// Project gallery
// ─────────────────────────────────────────────────────────────
type ProjectGalleryProps = {
  title: string;
  images: string[];
  accent: AccentKey;
  reduceMotion: boolean;
  variant?: "featured" | "card";
};

function ProjectGallery({
  title,
  images,
  accent,
  reduceMotion,
  variant = "card",
}: ProjectGalleryProps) {
  const [index, setIndex] = useState(0);
  const accentStyles = ACCENTS[accent] ?? ACCENTS.sky;
  const slides: (string | null)[] = images.length > 0 ? images : [null];
  const total = slides.length;

  const prev = useCallback(
    (e?: MouseEvent<HTMLButtonElement>) => {
      e?.preventDefault();
      e?.stopPropagation();
      setIndex((i) => (i === 0 ? total - 1 : i - 1));
    },
    [total],
  );

  const next = useCallback(
    (e?: MouseEvent<HTMLButtonElement>) => {
      e?.preventDefault();
      e?.stopPropagation();
      setIndex((i) => (i === total - 1 ? 0 : i + 1));
    },
    [total],
  );

  const handleKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    }
  };

  const isFeatured = variant === "featured";

  return (
    <div className="flex flex-col gap-3">
      <div
        role="region"
        aria-roledescription="carousel"
        aria-label={`${title} screenshots`}
        tabIndex={0}
        onKeyDown={handleKey}
        className={`group/gallery relative w-full overflow-hidden rounded-xl border border-white/10 bg-white/3 outline-none focus-visible:border-sky-400/40 focus-visible:ring-2 focus-visible:ring-sky-400/20 ${
          isFeatured ? "aspect-16/10" : "aspect-video"
        }`}
      >
        <div
          className={`pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-linear-to-r from-transparent via-current to-transparent opacity-0 transition-opacity duration-500 group-hover/gallery:opacity-60 ${accentStyles.text}`}
        />

        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: reduceMotion ? 1 : 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: reduceMotion ? 1 : 0.99 }}
            transition={{
              duration: reduceMotion ? 0.15 : 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute inset-0"
          >
            {slides[index] ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={slides[index] as string}
                alt={`${title} — screenshot ${index + 1}`}
                loading={index === 0 ? "eager" : "lazy"}
                decoding="async"
                draggable={false}
                className="h-full w-full select-none object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-linear-to-br from-white/4 to-transparent text-gray-600">
                <ImageIcon size={26} strokeWidth={1.5} />
                <span className="text-xs">Screenshot coming soon</span>
              </div>
            )}
            <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center bg-gray-950">
              <ImageIcon size={40} className="text-white/5" />
            </div>
          </motion.div>
        </AnimatePresence>

        {total > 1 && (
          <div className="pointer-events-none absolute left-3 top-3 z-20 rounded-full border border-white/15 bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
            <span className={accentStyles.text}>
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="mx-1.5 text-gray-600">/</span>
            <span className="text-gray-400">
              {String(total).padStart(2, "0")}
            </span>
          </div>
        )}

        {total > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Previous screenshot"
              className="absolute left-3 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white opacity-0 backdrop-blur-sm transition-all duration-300 hover:border-white/30 hover:bg-black/80 focus-visible:opacity-100 group-hover/gallery:opacity-100"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next screenshot"
              className="absolute right-3 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white opacity-0 backdrop-blur-sm transition-all duration-300 hover:border-white/30 hover:bg-black/80 focus-visible:opacity-100 group-hover/gallery:opacity-100"
            >
              <ChevronRight size={16} />
            </button>
          </>
        )}
      </div>

      {total > 1 && (
        <div
          role="tablist"
          aria-label={`${title} thumbnails`}
          className="flex gap-2 overflow-x-auto pb-1"
        >
          {slides.map((src, i) => {
            const isActive = i === index;
            return (
              <button
                key={i}
                role="tab"
                aria-selected={isActive}
                onClick={() => setIndex(i)}
                aria-label={`Go to screenshot ${i + 1}`}
                className={`relative h-12 w-20 shrink-0 overflow-hidden rounded-lg border transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400 ${
                  isActive
                    ? "border-white/40 ring-1 ring-white/20"
                    : "border-white/10 opacity-60 hover:opacity-100"
                }`}
              >
                {src ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={src}
                    alt=""
                    aria-hidden
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-white/5 text-gray-600">
                    <ImageIcon size={12} />
                  </div>
                )}
                {isActive && (
                  <span
                    className={`absolute inset-x-0 bottom-0 h-0.5 ${accentStyles.dot}`}
                  />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Tech badge
// ─────────────────────────────────────────────────────────────
type TechBadgeProps = {
  label: string;
  accent: AccentKey;
  index?: number;
  highlighted?: boolean;
  onClick?: (label: string) => void;
};

function TechBadge({
  label,
  accent,
  index = 0,
  highlighted = false,
  onClick,
}: TechBadgeProps) {
  const accentStyles = ACCENTS[accent] ?? ACCENTS.sky;

  const base =
    "rounded-full border px-3 py-1.5 text-xs font-medium transition-all duration-300";
  const state = highlighted
    ? `${accentStyles.badge} scale-105 shadow-lg`
    : accentStyles.badge;

  return (
    <motion.button
      type="button"
      onClick={() => onClick?.(label)}
      initial={{ opacity: 0, y: 6 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.15 + index * 0.03, duration: 0.3 }}
      whileHover={{ y: -2, scale: 1.04 }}
      aria-pressed={highlighted}
      className={`${base} ${state} focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40`}
    >
      {label}
    </motion.button>
  );
}

// ─────────────────────────────────────────────────────────────
// What I Built
// ─────────────────────────────────────────────────────────────
type WhatIBuiltProps = {
  items: string[];
  accent: AccentKey;
  max?: number;
};

function WhatIBuilt({ items, accent, max = 5 }: WhatIBuiltProps) {
  const accentStyles = ACCENTS[accent] ?? ACCENTS.sky;
  const visible = items.slice(0, max);

  return (
    <ul className="space-y-2">
      {visible.map((item, i) => (
        <motion.li
          key={item}
          initial={{ opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{
            delay: 0.1 + i * 0.08,
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="flex items-start gap-2.5 text-sm leading-6 text-gray-300"
        >
          <CheckCircle2
            size={15}
            strokeWidth={2}
            className={`mt-0.5 shrink-0 ${accentStyles.text}`}
          />
          <span>{item}</span>
        </motion.li>
      ))}
    </ul>
  );
}

// ─────────────────────────────────────────────────────────────
// Featured project
// ─────────────────────────────────────────────────────────────
type FeaturedProjectProps = {
  project: Project;
  onOpen: (p: Project) => void;
  reduceMotion: boolean;
  highlightedTechs: Set<string>;
  onTechClick: (label: string) => void;
};

function FeaturedProject({
  project,
  onOpen,
  reduceMotion,
  highlightedTechs,
  onTechClick,
}: FeaturedProjectProps) {
  const accent = ACCENTS[project.accent] ?? ACCENTS.sky;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <TiltCard
        reduceMotion={reduceMotion}
        intensity={2}
        className={`overflow-hidden rounded-3xl border border-white/10 bg-gray-950/40 backdrop-blur-sm ${accent.border}`}
      >
        <div className="grid gap-0 lg:grid-cols-[1.3fr_1fr]">
          <div className="p-4 sm:p-6 lg:p-8">
            <ProjectGallery
              title={project.title}
              images={project.images}
              accent={project.accent}
              reduceMotion={reduceMotion}
              variant="featured"
            />
          </div>

          <div className="flex flex-col justify-between border-t border-white/10 p-6 sm:p-8 lg:border-l lg:border-t-0">
            <div>
              <div className="mb-5 flex flex-wrap items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${accent.badge}`}
                >
                  <Sparkles size={12} />
                  {project.tagline}
                </span>
                <span className="text-xs text-gray-500">
                  {project.category}
                </span>
              </div>

              <h3 className="text-2xl font-bold leading-tight text-white sm:text-3xl">
                {project.title}
              </h3>

              <p className="mt-4 leading-7 text-gray-400">
                {project.description}
              </p>

              <div className="mt-7">
                <h4 className="mb-3 text-xs font-medium uppercase tracking-wider text-gray-500">
                  What I Built
                </h4>
                <WhatIBuilt
                  items={project.features}
                  accent={project.accent}
                  max={5}
                />
              </div>

              <div className="mt-7">
                <h4 className="mb-3 text-xs font-medium uppercase tracking-wider text-gray-500">
                  Technologies
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, i) => (
                    <TechBadge
                      key={tech}
                      label={tech}
                      accent={project.accent}
                      index={i}
                      highlighted={highlightedTechs.has(tech)}
                      onClick={onTechClick}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-white/10 pt-6">
              <button
                onClick={() => onOpen(project)}
                className="group/btn inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_40px_-8px_rgba(255,255,255,0.5)] active:scale-[0.98]"
              >
                View Case Study
                <ArrowRight
                  size={15}
                  className="transition-transform duration-300 group-hover/btn:translate-x-0.5"
                />
              </button>

              {project.github && project.github !== "#" && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm text-gray-300 transition-all duration-300 hover:border-white/30 hover:text-white"
                >
                  <GithubIcon />
                  GitHub
                </a>
              )}

              {project.live && project.live !== "#" && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm transition-all duration-300 ${accent.badge} hover:brightness-125`}
                >
                  <ExternalLink size={15} />
                  Live Demo
                </a>
              )}
            </div>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────
// Secondary project card
// ─────────────────────────────────────────────────────────────
type ProjectCardProps = {
  project: Project;
  index: number;
  onOpen: (p: Project) => void;
  reduceMotion: boolean;
  highlightedTechs: Set<string>;
  onTechClick: (label: string) => void;
};

function ProjectCard({
  project,
  index,
  onOpen,
  reduceMotion,
  highlightedTechs,
  onTechClick,
}: ProjectCardProps) {
  const accent = ACCENTS[project.accent] ?? ACCENTS.sky;
  const direction = index % 2 === 0 ? -1 : 1;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 40 * direction, y: 30 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.6,
        delay: (index % 2) * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <TiltCard
        reduceMotion={reduceMotion}
        intensity={3}
        className={`h-full overflow-hidden rounded-2xl border border-white/10 bg-gray-950/40 ${accent.border}`}
      >
        <article className="flex h-full flex-col p-4 sm:p-5">
          <ProjectGallery
            title={project.title}
            images={project.images}
            accent={project.accent}
            reduceMotion={reduceMotion}
            variant="card"
          />

          <div className="flex flex-1 flex-col px-1 pt-5">
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs font-medium text-gray-500">
                {project.category}
              </span>
              {project.featured && (
                <span
                  className={`rounded-full border px-2.5 py-0.5 text-xs ${accent.badge}`}
                >
                  {project.tagline}
                </span>
              )}
            </div>

            <h3 className="mt-3 text-xl font-semibold text-white">
              {project.title}
            </h3>

            <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-400">
              {project.description}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {project.technologies.slice(0, 5).map((tech, i) => (
                <TechBadge
                  key={tech}
                  label={tech}
                  accent={project.accent}
                  index={i}
                  highlighted={highlightedTechs.has(tech)}
                  onClick={onTechClick}
                />
              ))}
            </div>

            <div className="mt-auto flex flex-wrap items-center gap-3 pt-6">
              {project.github && project.github !== "#" && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3.5 py-1.5 text-sm text-gray-300 transition hover:border-white/25 hover:text-white"
                >
                  <GithubIcon />
                  GitHub
                </a>
              )}

              {project.live && project.live !== "#" && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm transition ${accent.badge} hover:brightness-125`}
                >
                  <ExternalLink size={14} />
                  Demo
                </a>
              )}

              <button
                onClick={() => onOpen(project)}
                className="group/btn ml-auto inline-flex items-center gap-2 text-sm font-medium text-white transition"
              >
                Details
                <ArrowRight
                  size={15}
                  className="transition-transform duration-300 group-hover/btn:translate-x-0.5"
                />
              </button>
            </div>
          </div>
        </article>
      </TiltCard>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────
// Architecture diagram
// ─────────────────────────────────────────────────────────────
type ArchitectureProps = {
  technologies: string[];
  accent: AccentKey;
  reduceMotion: boolean;
};

function Architecture({
  technologies,
  accent,
  reduceMotion,
}: ArchitectureProps) {
  const accentStyles = ACCENTS[accent] ?? ACCENTS.sky;

  const findTech = (names: string[]) =>
    technologies.filter((t) => names.includes(t));

  const frontend = findTech([
    "React.js",
    "Next.js",
    "JavaScript",
    "TypeScript",
    "Tailwind CSS",
  ]);
  const backend = findTech(["FastAPI", "REST API", "Python", "Arduino", "C++"]);
  const data = findTech([
    "Supabase",
    "PostgreSQL",
    "MongoDB",
    "Chart.js",
    "IoT",
    "Temperature Sensor",
  ]);
  const infra = findTech(["Vercel", "Render", "Git", "GitHub"]);

  const layers: { label: string; items: string[] }[] = [];
  if (frontend.length) layers.push({ label: "Frontend", items: frontend });
  if (backend.length) layers.push({ label: "Backend / API", items: backend });
  if (data.length) layers.push({ label: "Data", items: data });
  if (infra.length) layers.push({ label: "Deploy & Tools", items: infra });

  if (layers.length < 2) return null;

  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
      <h4 className="mb-5 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-gray-500">
        <GitBranch size={13} className={accentStyles.text} />
        Architecture
      </h4>

      <div className="flex flex-col items-stretch gap-3">
        {layers.map((layer, i) => (
          <div key={layer.label} className="flex flex-col items-stretch gap-3">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.05 + i * 0.08,
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="rounded-lg border border-white/10 bg-white/[0.02] p-3"
            >
              <div className="mb-2 text-[10px] font-medium uppercase tracking-wider text-gray-500">
                {layer.label}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {layer.items.map((item) => (
                  <span
                    key={item}
                    className={`rounded-md border px-2 py-1 text-xs ${accentStyles.badge}`}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>

            {i < layers.length - 1 && (
              <motion.div
                initial={{ opacity: 0, scaleY: 0 }}
                whileInView={{ opacity: 1, scaleY: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.15 + i * 0.08,
                  duration: 0.35,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{ transformOrigin: "top" }}
                className="flex justify-center"
              >
                <div
                  className={`h-6 w-px bg-linear-to-b from-current to-transparent ${accentStyles.text}`}
                />
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Case-study modal
// ─────────────────────────────────────────────────────────────
type ProjectModalProps = {
  project: Project | null;
  onClose: () => void;
  reduceMotion: boolean;
};

function ProjectModal({ project, onClose, reduceMotion }: ProjectModalProps) {
  const handleKey = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0.15 : 0.25 }}
          onClick={onClose}
          onKeyDown={handleKey}
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} case study`}
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-sm sm:items-center"
        >
          <motion.div
            initial={{
              opacity: 0,
              scale: reduceMotion ? 1 : 0.95,
              y: reduceMotion ? 0 : 20,
            }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{
              opacity: 0,
              scale: reduceMotion ? 1 : 0.95,
              y: reduceMotion ? 0 : 20,
            }}
            transition={{ type: "spring", stiffness: 220, damping: 24 }}
            onClick={(e) => e.stopPropagation()}
            className="relative my-8 w-full max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-gray-950 shadow-2xl shadow-black/60"
          >
            <ModalContent
              project={project}
              onClose={onClose}
              reduceMotion={reduceMotion}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

type ModalContentProps = {
  project: Project;
  onClose: () => void;
  reduceMotion: boolean;
};

function ModalContent({ project, onClose, reduceMotion }: ModalContentProps) {
  const accent = ACCENTS[project.accent] ?? ACCENTS.sky;
  const [showArchitecture, setShowArchitecture] = useState(false);

  return (
    <div className="max-h-[90vh] overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-white/10 bg-gray-950/95 px-6 py-4 backdrop-blur-sm sm:px-8">
        <div className="min-w-0">
          <div className="mb-1.5 flex flex-wrap items-center gap-2">
            <span
              className={`rounded-full border px-2.5 py-0.5 text-xs ${accent.badge}`}
            >
              {project.category}
            </span>
            {project.featured && (
              <span className="rounded-full border border-white/15 px-2.5 py-0.5 text-xs text-gray-400">
                {project.tagline}
              </span>
            )}
          </div>
          <h3 className="truncate text-xl font-bold text-white sm:text-2xl">
            {project.title}
          </h3>
        </div>

        <button
          onClick={onClose}
          aria-label="Close case study"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 text-gray-400 transition hover:border-white/25 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40"
        >
          <X size={16} />
        </button>
      </div>

      {/* Body */}
      <div className="space-y-8 px-6 py-6 sm:px-8 sm:py-8">
        {/* Overview / description */}
        <p className="leading-7 text-gray-300">{project.description}</p>

        {/* Problem / Solution */}
        <div className="grid gap-4 sm:grid-cols-2">
          <ModalBlock
            icon={<Target size={16} />}
            title="Problem"
            text={project.problem}
            accent={accent}
          />
          <ModalBlock
            icon={<Zap size={16} />}
            title="Solution"
            text={project.solution}
            accent={accent}
          />
        </div>

        {/* Features */}
        {project.features.length > 0 && (
          <div>
            <h4 className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-gray-500">
              <Layers size={13} className={accent.text} />
              Key Features
            </h4>
            <ul className="grid gap-2 sm:grid-cols-2">
              {project.features.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-2 text-sm text-gray-300"
                >
                  <span
                    className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${accent.dot}`}
                  />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Architecture — revealed on demand */}
        <div>
          {!showArchitecture ? (
            <button
              onClick={() => setShowArchitecture(true)}
              className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.02] px-4 py-2 text-sm text-gray-300 transition hover:border-white/30 hover:text-white"
            >
              <GitBranch size={14} />
              Explore Architecture
              <ArrowDown
                size={13}
                className="transition-transform duration-300 group-hover:translate-y-0.5"
              />
            </button>
          ) : (
            <Architecture
              technologies={project.technologies}
              accent={project.accent}
              reduceMotion={reduceMotion}
            />
          )}
        </div>

        {/* Results */}
        {project.results.length > 0 && (
          <div>
            <h4 className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-gray-500">
              <TrendingUp size={13} className={accent.text} />
              Results
            </h4>
            <ul className="space-y-2">
              {project.results.map((r) => (
                <li
                  key={r}
                  className="flex items-start gap-2 text-sm text-gray-300"
                >
                  <Sparkles
                    size={14}
                    className={`mt-0.5 shrink-0 ${accent.text}`}
                  />
                  {r}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Technologies */}
        <div>
          <h4 className="mb-3 text-xs font-medium uppercase tracking-wider text-gray-500">
            Technologies
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((t) => (
              <span
                key={t}
                className={`rounded-full border px-3 py-1.5 text-xs ${accent.badge}`}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="sticky bottom-0 flex flex-wrap gap-3 border-t border-white/10 bg-gray-950/95 px-6 py-4 backdrop-blur-sm sm:px-8">
        {project.github && project.github !== "#" && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-gray-300 transition hover:border-white/25 hover:text-white"
          >
            <GithubIcon />
            GitHub
          </a>
        )}
        {project.live && project.live !== "#" && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition ${accent.badge} hover:brightness-125`}
          >
            <ExternalLink size={15} />
            Visit Live Site
          </a>
        )}
        <button
          onClick={onClose}
          className="ml-auto inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-gray-400 transition hover:border-white/25 hover:text-white"
        >
          Close
        </button>
      </div>
    </div>
  );
}

type ModalBlockProps = {
  icon: ReactNode;
  title: string;
  text: string;
  accent: AccentStyles;
};

function ModalBlock({ icon, title, text, accent }: ModalBlockProps) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
      <div
        className={`mb-2 flex items-center gap-2 text-sm font-medium ${accent.text}`}
      >
        {icon}
        {title}
      </div>
      <p className="text-sm leading-6 text-gray-400">{text}</p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Section
// ─────────────────────────────────────────────────────────────
export default function Projects() {
  const reduceMotion = useReducedMotion() ?? false;
  const [openProject, setOpenProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState<FilterId>("all");
  const [selectedTech, setSelectedTech] = useState<string | null>(null);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") return projects;
    return projects.filter((p) => p.filter === activeFilter);
  }, [activeFilter]);

  const highlightedTechs = useMemo(() => {
    if (!selectedTech) return new Set<string>();
    const set = new Set<string>();
    projects.forEach((p) => {
      if (p.technologies.includes(selectedTech)) {
        p.technologies.forEach((t) => set.add(t));
      }
    });
    return set;
  }, [selectedTech]);

  const handleTechClick = useCallback((label: string) => {
    setSelectedTech((prev) => (prev === label ? null : label));
  }, []);

  // Separate featured (dominant) from the rest
  const dominant = filteredProjects.find((p) => p.dominant);
  const others = filteredProjects.filter((p) => !p.dominant);

  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-gray-950 py-24 sm:py-32"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/4 h-125 w-125 rounded-full bg-sky-500/5 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 h-100 w-100 rounded-full bg-violet-500/5 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 max-w-2xl sm:mb-16"
        >
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-sky-400">
            Projects
          </p>
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Things I&apos;ve built.
          </h2>
          <p className="mt-5 leading-7 text-gray-400">
            A selection of academic, internship, and personal projects that
            demonstrate frontend development, backend API integration,
            databases, and deployment.
          </p>
        </motion.div>

        {/* Filters + tech selector */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-10 flex flex-wrap items-center gap-2"
          role="tablist"
          aria-label="Project categories"
        >
          {FILTERS.map((f) => {
            const isActive = activeFilter === f.id;
            return (
              <button
                key={f.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveFilter(f.id)}
                className={`group relative rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40 ${
                  isActive
                    ? "border-white/25 bg-white/[0.06] text-white"
                    : "border-white/10 text-gray-400 hover:border-white/20 hover:text-gray-200"
                }`}
              >
                {f.label}
                {isActive && (
                  <motion.div
                    layoutId="activeProjectFilter"
                    className="absolute inset-0 -z-10 rounded-full border border-white/20 bg-white/[0.04]"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            );
          })}

          {selectedTech && (
            <button
              onClick={() => setSelectedTech(null)}
              className="ml-auto inline-flex items-center gap-2 rounded-full border border-sky-400/40 bg-sky-400/10 px-3 py-1.5 text-xs font-medium text-sky-300 transition hover:bg-sky-400/15"
            >
              Highlighting: {selectedTech}
              <X size={12} />
            </button>
          )}
        </motion.div>

        {/* Featured dominant project */}
        {dominant && (
          <div className="mb-6">
            <FeaturedProject
              project={dominant}
              onOpen={setOpenProject}
              reduceMotion={reduceMotion}
              highlightedTechs={highlightedTechs}
              onTechClick={handleTechClick}
            />
          </div>
        )}

        {/* Other projects */}
        {others.length > 0 && (
          <motion.div layout className="grid gap-6 md:grid-cols-2">
            <AnimatePresence mode="popLayout">
              {others.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  onOpen={setOpenProject}
                  reduceMotion={reduceMotion}
                  highlightedTechs={highlightedTechs}
                  onTechClick={handleTechClick}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <div className="rounded-2xl border border-dashed border-white/10 p-12 text-center">
            <p className="text-sm text-gray-500">
              No projects match this filter.
            </p>
          </div>
        )}

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-20 rounded-3xl border border-white/10 bg-linear-to-br from-white/[0.03] to-transparent p-8 text-center sm:mt-24 sm:p-12"
        >
          <h3 className="text-2xl font-bold text-white sm:text-3xl">
            Have a problem that needs a digital solution?
          </h3>
          <p className="mx-auto mt-4 max-w-xl text-gray-400">
            Let&apos;s talk about how I can help bring your idea to life.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://github.com/ikmal16"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.02] px-6 py-3 text-sm font-medium text-gray-200 transition hover:border-white/30 hover:bg-white/[0.06] hover:text-white"
            >
              <GithubIcon />
              View GitHub
            </a>
            <a
              href="#contact"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_40px_-8px_rgba(255,255,255,0.5)] active:scale-[0.98]"
            >
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-black/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <span className="relative z-10">Contact Me</span>
              <ArrowUpRight
                size={15}
                className="relative z-10 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Modal */}
      <ProjectModal
        project={openProject}
        onClose={() => setOpenProject(null)}
        reduceMotion={reduceMotion}
      />
    </section>
  );
}
