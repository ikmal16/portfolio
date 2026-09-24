"use client";

import { useState, useMemo, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useInView,
  type Variants,
} from "framer-motion";
import {
  Globe,
  Server,
  Database,
  Wrench,
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  X,
  Layers,
  Palette,
  Rocket,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────
type CategoryId = "frontend" | "backend" | "database" | "tools";

type ProjectId =
  | "cfac"
  | "va"
  | "hostel"
  | "foodbank"
  | "gym"
  | "watch"
  | "fan";

type Tech = {
  id: string;
  name: string;
  category: CategoryId;
  role: string;
  description: string;
  usedIn: ProjectId[];
  related: string[];
};

type Category = {
  id: CategoryId | "all";
  label: string;
  icon: typeof Globe;
  color: string;
  text: string;
  border: string;
};

// ─────────────────────────────────────────────────────────────
// Project reference
// ─────────────────────────────────────────────────────────────
const projectLabels: Record<ProjectId, string> = {
  cfac: "Campus Facilities Management System",
  va: "Virtual Assistant",
  hostel: "Hostel Complaint Management System",
  foodbank: "Food Bank Management System",
  gym: "Gym Management System",
  watch: "Watch Store Website",
  fan: "Automatic Laptop Fan Control",
};

// ─────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────
const techs: Tech[] = [
  // Frontend
  {
    id: "react",
    name: "React.js",
    category: "frontend",
    role: "Frontend Development",
    description:
      "Component-based UIs and interactive dashboards for full-stack applications.",
    usedIn: ["cfac", "va", "hostel", "watch"],
    related: ["typescript", "tailwind", "nextjs", "fastapi"],
  },
  {
    id: "nextjs",
    name: "Next.js",
    category: "frontend",
    role: "Full-Stack React Framework",
    description:
      "App Router, server components, and optimized production builds.",
    usedIn: ["cfac", "hostel"],
    related: ["react", "typescript", "tailwind", "vercel"],
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "frontend",
    role: "Typed JavaScript",
    description:
      "Type-safe application code across frontends and shared utilities.",
    usedIn: ["cfac", "hostel", "va"],
    related: ["react", "nextjs", "fastapi"],
  },
  {
    id: "javascript",
    name: "JavaScript",
    category: "frontend",
    role: "Web Programming Language",
    description: "Core language used across every frontend project I've built.",
    usedIn: ["cfac", "va", "hostel", "watch"],
    related: ["react", "nextjs"],
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    category: "frontend",
    role: "Utility-First Styling",
    description:
      "Design-system-driven interfaces with utility classes and responsive layouts.",
    usedIn: ["cfac", "hostel"],
    related: ["react", "nextjs", "typescript"],
  },
  // Backend
  {
    id: "fastapi",
    name: "FastAPI",
    category: "backend",
    role: "Python Web Framework",
    description:
      "REST APIs with typed request/response models and async endpoints.",
    usedIn: ["cfac", "va"],
    related: ["python", "restapi", "supabase"],
  },
  {
    id: "python",
    name: "Python",
    category: "backend",
    role: "Backend Language",
    description: "Backend logic, data processing, and API development.",
    usedIn: ["va"],
    related: ["fastapi", "restapi"],
  },
  {
    id: "restapi",
    name: "REST API",
    category: "backend",
    role: "API Design",
    description:
      "Designing, consuming, and documenting REST endpoints for web apps.",
    usedIn: ["cfac", "va"],
    related: ["fastapi", "python", "react"],
  },
  // Database
  {
    id: "supabase",
    name: "Supabase",
    category: "database",
    role: "Backend-as-a-Service",
    description:
      "Postgres-backed backend with auth, storage, and realtime subscriptions.",
    usedIn: ["cfac", "hostel"],
    related: ["postgres", "nextjs", "react"],
  },
  {
    id: "postgres",
    name: "PostgreSQL",
    category: "database",
    role: "Relational Database",
    description: "Relational schema design, queries, and data integrity.",
    usedIn: ["cfac", "hostel"],
    related: ["supabase", "fastapi"],
  },
  {
    id: "mongodb",
    name: "MongoDB",
    category: "database",
    role: "Document Database",
    description:
      "Document-oriented data modeling for flexible application data.",
    usedIn: ["va"],
    related: ["python", "fastapi"],
  },
  {
    id: "Microsoft SQL Server",
    name: "Microsoft SQL Server",
    category: "database",
    role: "Relational Database",
    description: "Relational schema design, queries, and data integrity.",
    usedIn: ["va"],
    related: ["python", "fastapi"],
  },
  // Tools
  {
    id: "git",
    name: "Git",
    category: "tools",
    role: "Version Control",
    description:
      "Local version control, branching, and collaboration workflows.",
    usedIn: ["cfac", "va", "hostel", "foodbank", "gym", "watch", "fan"],
    related: ["github", "vercel"],
  },
  {
    id: "github",
    name: "GitHub",
    category: "tools",
    role: "Collaboration Platform",
    description:
      "Remote repositories, PRs, code review, and CI-friendly workflows.",
    usedIn: ["cfac", "va", "hostel", "foodbank", "gym", "watch", "fan"],
    related: ["git", "vercel"],
  },
  {
    id: "vercel",
    name: "Vercel",
    category: "tools",
    role: "Deployment Platform",
    description: "Zero-config deployments for React and Next.js applications.",
    usedIn: ["cfac", "hostel"],
    related: ["nextjs", "github"],
  },
  {
    id: "figma",
    name: "Figma",
    category: "tools",
    role: "Design & Prototyping",
    description: "UI design, wireframes, and design handoff for web projects.",
    usedIn: ["cfac", "watch"],
    related: ["tailwind", "react"],
  },
];

const categories: Category[] = [
  {
    id: "all",
    label: "All",
    icon: Layers,
    color: "from-white/10 to-white/5",
    text: "text-white",
    border: "border-white/20",
  },
  {
    id: "frontend",
    label: "Frontend",
    icon: Globe,
    color: "from-sky-500/20 to-sky-500/5",
    text: "text-sky-400",
    border: "border-sky-400/30",
  },
  {
    id: "backend",
    label: "Backend",
    icon: Server,
    color: "from-emerald-500/20 to-emerald-500/5",
    text: "text-emerald-400",
    border: "border-emerald-400/30",
  },
  {
    id: "database",
    label: "Database",
    icon: Database,
    color: "from-violet-500/20 to-violet-500/5",
    text: "text-violet-400",
    border: "border-violet-400/30",
  },
  {
    id: "tools",
    label: "Tools",
    icon: Wrench,
    color: "from-amber-500/20 to-amber-500/5",
    text: "text-amber-400",
    border: "border-amber-400/30",
  },
];

const CATEGORY_ACCENTS: Record<
  CategoryId,
  { text: string; border: string; bg: string }
> = {
  frontend: {
    text: "text-sky-400",
    border: "border-sky-400/30",
    bg: "bg-sky-400/10",
  },
  backend: {
    text: "text-emerald-400",
    border: "border-emerald-400/30",
    bg: "bg-emerald-400/10",
  },
  database: {
    text: "text-violet-400",
    border: "border-violet-400/30",
    bg: "bg-violet-400/10",
  },
  tools: {
    text: "text-amber-400",
    border: "border-amber-400/30",
    bg: "bg-amber-400/10",
  },
};

const process = [
  {
    step: "01",
    title: "Design",
    tools: "Figma",
    description: "Wireframes, UI design, and handoff before writing code.",
    icon: Palette,
  },
  {
    step: "02",
    title: "Frontend",
    tools: "React · TypeScript · Tailwind",
    description: "Component-driven UIs with typed props and clean styling.",
    icon: Globe,
  },
  {
    step: "03",
    title: "Backend",
    tools: "FastAPI · REST API",
    description:
      "Typed endpoints, request validation, and clean response models.",
    icon: Server,
  },
  {
    step: "04",
    title: "Database",
    tools: "Supabase · PostgreSQL · MongoDB",
    description: "Relational or document models chosen per project.",
    icon: Database,
  },
  {
    step: "05",
    title: "Deploy",
    tools: "Git · GitHub · Vercel",
    description: "Version-controlled and shipped with zero-config deployment.",
    icon: Rocket,
  },
];

// ─────────────────────────────────────────────────────────────
// Tech pill
// ─────────────────────────────────────────────────────────────
type TechPillProps = {
  tech: Tech;
  isActive: boolean;
  isRelated: boolean;
  isDimmed: boolean;
  onSelect: (id: string) => void;
  onHover: (id: string | null) => void;
  reduceMotion: boolean;
  index: number;
};

function TechPill({
  tech,
  isActive,
  isRelated,
  isDimmed,
  onSelect,
  onHover,
  reduceMotion,
  index,
}: TechPillProps) {
  const accent = CATEGORY_ACCENTS[tech.category];

  return (
    <motion.button
      layout="position"
      initial={{ opacity: 0, y: 8, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 220,
        damping: 24,
        delay: reduceMotion ? 0 : index * 0.02,
      }}
      onMouseEnter={() => onHover(tech.id)}
      onMouseLeave={() => onHover(null)}
      onFocus={() => onHover(tech.id)}
      onBlur={() => onHover(null)}
      onClick={() => onSelect(tech.id)}
      whileHover={reduceMotion ? undefined : { y: -3, scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      aria-label={`${tech.name} — ${tech.role}`}
      aria-pressed={isActive}
      className={`group relative flex items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-medium transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40 ${
        isActive
          ? `${accent.border} ${accent.bg} text-white shadow-lg`
          : isRelated
            ? "border-white/25 bg-white/[0.06] text-white"
            : isDimmed
              ? "border-white/5 bg-white/[0.02] text-gray-600"
              : "border-white/10 bg-white/[0.03] text-gray-300 hover:border-white/20 hover:text-white"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 shrink-0 rounded-full transition-colors duration-300 ${
          isActive || isRelated ? `bg-current ${accent.text}` : "bg-gray-600"
        }`}
      />
      {tech.name}
    </motion.button>
  );
}

// ─────────────────────────────────────────────────────────────
// Detail panel
// ─────────────────────────────────────────────────────────────
type DetailPanelProps = {
  tech: Tech;
  onClose: () => void;
};

function DetailPanel({ tech, onClose }: DetailPanelProps) {
  const accent = CATEGORY_ACCENTS[tech.category];

  return (
    <motion.div
      key={tech.id}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={`relative overflow-hidden rounded-2xl border border-white/10 bg-black/50 p-6 backdrop-blur-sm sm:p-8 ${accent.border}`}
    >
      <div
        className={`pointer-events-none absolute inset-0 bg-linear-to-br opacity-40 ${
          tech.category === "frontend"
            ? "from-sky-500/20 to-sky-500/5"
            : tech.category === "backend"
              ? "from-emerald-500/20 to-emerald-500/5"
              : tech.category === "database"
                ? "from-violet-500/20 to-violet-500/5"
                : "from-amber-500/20 to-amber-500/5"
        }`}
      />

      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div
              className={`mb-2 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium ${accent.border} ${accent.bg} ${accent.text}`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-current" />
              {tech.category.charAt(0).toUpperCase() + tech.category.slice(1)}
            </div>
            <h3 className="text-2xl font-bold text-white sm:text-3xl">
              {tech.name}
            </h3>
            <p className={`mt-1 text-sm font-medium ${accent.text}`}>
              {tech.role}
            </p>
          </div>

          <button
            onClick={onClose}
            aria-label="Close details"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 text-gray-400 transition hover:border-white/25 hover:text-white"
          >
            <X size={15} />
          </button>
        </div>

        <p className="mt-5 max-w-2xl leading-7 text-gray-400">
          {tech.description}
        </p>

        <div className="mt-7">
          <h4 className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-gray-500">
            <Layers size={13} className={accent.text} />
            Used in
          </h4>
          <ul className="grid gap-2 sm:grid-cols-2">
            {tech.usedIn.map((pid) => (
              <li key={pid}>
                <a
                  href="#projects"
                  className="group flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-gray-300 transition-all duration-300 hover:border-white/25 hover:bg-white/[0.05] hover:text-white"
                >
                  <span>{projectLabels[pid]}</span>
                  <ArrowUpRight
                    size={14}
                    className="shrink-0 text-gray-500 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {tech.related.length > 0 && (
          <div className="mt-7">
            <h4 className="mb-3 text-xs font-medium uppercase tracking-wider text-gray-500">
              Commonly paired with
            </h4>
            <div className="flex flex-wrap gap-2">
              {tech.related
                .map((rid) => techs.find((t) => t.id === rid))
                .filter((t): t is Tech => Boolean(t))
                .map((rel) => (
                  <span
                    key={rel.id}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-gray-300"
                  >
                    {rel.name}
                  </span>
                ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────
// Process strip
// ─────────────────────────────────────────────────────────────
function ProcessStrip() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="mt-20 sm:mt-24">
      <div className="mb-10 flex items-center gap-3">
        <div className="h-px flex-1 bg-linear-to-r from-white/10 via-white/5 to-transparent" />
        <span className="text-xs font-medium uppercase tracking-[0.3em] text-gray-500">
          How I build
        </span>
        <div className="h-px flex-1 bg-linear-to-l from-white/10 via-white/5 to-transparent" />
      </div>

      <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {process.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.li
              key={item.step}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{
                delay: 0.1 + i * 0.1,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 p-5 transition-colors duration-500 hover:border-white/20"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium tabular-nums text-gray-500">
                  {item.step}
                </span>
                <div className="rounded-lg border border-white/10 bg-white/[0.03] p-2 transition-colors duration-500 group-hover:border-sky-400/30 group-hover:bg-sky-400/[0.06]">
                  <Icon
                    size={14}
                    strokeWidth={1.75}
                    className="text-gray-500 transition-colors duration-500 group-hover:text-sky-400"
                  />
                </div>
              </div>

              <h4 className="mt-4 text-base font-semibold text-white">
                {item.title}
              </h4>
              <p className="mt-1 text-xs font-medium text-sky-400/80">
                {item.tools}
              </p>
              <p className="mt-3 text-xs leading-5 text-gray-500">
                {item.description}
              </p>
            </motion.li>
          );
        })}
      </ol>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Section
// ─────────────────────────────────────────────────────────────
export default function Skills() {
  const reduceMotion = useReducedMotion() ?? false;
  const [category, setCategory] = useState<CategoryId | "all">("all");
  const [activeTechId, setActiveTechId] = useState<string | null>("react");
  const [hoveredTechId, setHoveredTechId] = useState<string | null>(null);

  const focusTechId = hoveredTechId ?? activeTechId;
  const focusTech = useMemo(
    () => techs.find((t) => t.id === focusTechId) ?? null,
    [focusTechId],
  );

  const visibleTechs = useMemo(
    () =>
      category === "all" ? techs : techs.filter((t) => t.category === category),
    [category],
  );

  const getTechState = (tech: Tech) => {
    if (!focusTech)
      return { isActive: false, isRelated: false, isDimmed: false };
    const isActive = tech.id === focusTech.id;
    const isRelated = focusTech.related.includes(tech.id);
    const isDimmed = !isActive && !isRelated;
    return { isActive, isRelated, isDimmed };
  };

  const activeDetail = activeTechId
    ? (techs.find((t) => t.id === activeTechId) ?? null)
    : null;

  return (
    <section
      id="skills"
      className="relative overflow-hidden bg-black py-24 sm:py-32"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-125 w-125 -translate-x-1/2 rounded-full bg-sky-500/5 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-100 w-100 rounded-full bg-violet-500/5 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-14 max-w-2xl sm:mb-16"
        >
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            What I use to turn ideas into software.
          </h2>
          <p className="mt-5 leading-7 text-gray-400">
            Hover or tap any technology to see how it connects to my projects —
            and which tools I pair it with in real applications.
          </p>
        </motion.div>

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-10 flex flex-wrap gap-2"
          role="tablist"
          aria-label="Technology categories"
        >
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = category === cat.id;
            return (
              <button
                key={cat.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setCategory(cat.id)}
                className={`group relative flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40 ${
                  isActive
                    ? `border-white/20 bg-white/[0.06] ${cat.text}`
                    : "border-white/10 text-gray-400 hover:border-white/20 hover:text-gray-200"
                }`}
              >
                <Icon
                  size={15}
                  strokeWidth={1.75}
                  className={`transition-transform duration-300 ${
                    isActive ? "scale-110" : "group-hover:scale-110"
                  }`}
                />
                {cat.label}
                {isActive && (
                  <motion.div
                    layoutId="activeCategory"
                    className="absolute inset-0 -z-10 rounded-full border border-white/20 bg-white/[0.04]"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </motion.div>

        {/* Two-column layout: pills grid + detail panel */}
        <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr] lg:gap-8">
          {/* Left: technologies grid */}
          <div>
            <motion.div
              layout
              key={category}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap content-start gap-2.5"
            >
              {visibleTechs.map((tech, i) => {
                const state = getTechState(tech);
                return (
                  <TechPill
                    key={tech.id}
                    tech={tech}
                    isActive={state.isActive}
                    isRelated={state.isRelated}
                    isDimmed={state.isDimmed}
                    onSelect={setActiveTechId}
                    onHover={setHoveredTechId}
                    reduceMotion={reduceMotion}
                    index={i}
                  />
                );
              })}
            </motion.div>

            {/* Small helper text below the pills */}
            <p className="mt-6 text-xs text-gray-500">
              {focusTech
                ? `Highlighted: ${focusTech.name} — related technologies are shown brighter.`
                : "Hover or tap a technology to explore."}
            </p>
          </div>

          {/* Right: detail panel */}
          <div className="min-h-[320px]">
            <AnimatePresence mode="wait">
              {activeDetail ? (
                <DetailPanel
                  key={activeDetail.id}
                  tech={activeDetail}
                  onClose={() => setActiveTechId(null)}
                />
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex h-full min-h-[320px] items-center justify-center rounded-2xl border border-dashed border-white/10 bg-black/30 p-8 text-center"
                >
                  <div>
                    <Sparkles
                      size={22}
                      className="mx-auto text-gray-600"
                      strokeWidth={1.5}
                    />
                    <p className="mt-3 text-sm text-gray-500">
                      Select a technology to see where I&apos;ve used it.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* CTA to projects */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 flex flex-wrap items-center gap-3"
        >
          <a
            href="#projects"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_40px_-8px_rgba(255,255,255,0.4)] active:scale-[0.98]"
          >
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-black/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            <span className="relative z-10">Explore My Projects</span>
            <ArrowRight
              size={16}
              className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </a>

          {activeDetail && (
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.02] px-5 py-3 text-sm font-medium text-gray-300 transition-all duration-300 hover:border-white/30 hover:text-white"
            >
              View {activeDetail.name} projects
              <ArrowUpRight size={15} />
            </a>
          )}
        </motion.div>

        {/* Process strip */}
        <ProcessStrip />
      </div>
    </section>
  );
}
