"use client";

import { useState, useRef, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ExternalLink,
  ImageIcon,
  ChevronLeft,
  ChevronRight,
  X,
  ArrowRight,
  Sparkles,
  Layers,
  Target,
  Zap,
  TrendingUp,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────
// Project data — enriched with case-study fields
// ─────────────────────────────────────────────────────────────
const projects = [
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
    github: "#",
    live: "#",
    featured: true,
    dominant: false,
    images: [],
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
    github: "#",
    live: "#",
    featured: false,
    images: [],
    accent: "emerald",
  },
  {
    id: "foodbank",
    title: "Food Bank Management System",
    shortTitle: "Food Bank MS",
    tagline: "Desktop Application",
    description:
      "A desktop management system designed to support food bank operations while addressing social issues related to food access and poverty.",
    problem:
      "Food banks lacked organized tools to track inventory, donations, and distribution to families in need.",
    solution:
      "Built a JavaFX desktop application with a relational database backend for inventory and distribution tracking.",
    features: [
      "Inventory management",
      "Donation & distribution tracking",
      "Beneficiary records",
    ],
    results: ["Social-impact focused academic project"],
    technologies: ["Java", "JavaFX", "Database"],
    category: "Desktop Application",
    github: "#",
    live: "#",
    featured: false,
    images: [],
    accent: "amber",
  },
  {
    id: "gym",
    title: "Gym Management System",
    shortTitle: "Gym MS",
    tagline: "Database Application",
    description:
      "A database-driven system developed to manage gym-related information and operations using Oracle APEX.",
    problem:
      "Gyms needed a low-code way to manage memberships, trainers, and schedules without custom infrastructure.",
    solution:
      "Built a full APEX application backed by Oracle SQL with forms, reports, and dashboards.",
    features: [
      "Membership management",
      "Trainer & class scheduling",
      "Reports & dashboards",
    ],
    results: ["Demonstrated rapid low-code development"],
    technologies: ["Oracle APEX", "Oracle SQL"],
    category: "Database Application",
    github: "#",
    live: "#",
    featured: false,
    images: [],
    accent: "rose",
  },
  {
    id: "watch",
    title: "Watch Store Website",
    shortTitle: "Watch Store",
    tagline: "Frontend",
    description:
      "A responsive e-commerce style website built to showcase watches and provide a user-friendly browsing experience.",
    problem:
      "Needed a polished, responsive storefront to showcase products without a full commerce backend.",
    solution:
      "Designed and built a responsive React frontend with modern CSS and smooth browsing UX.",
    features: [
      "Product grid & detail views",
      "Responsive layout",
      "Smooth transitions",
    ],
    results: ["Strengthened frontend design skills"],
    technologies: ["React.js", "JavaScript", "CSS"],
    category: "Frontend Web Application",
    github: "#",
    live: "#",
    featured: false,
    images: [],
    accent: "cyan",
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
    technologies: ["Arduino", "C++", "Temperature Sensor"],
    category: "IoT",
    github: "#",
    live: "#",
    featured: false,
    images: [],
    accent: "orange",
  },
];

// Accent color map — keeps Tailwind classes static so JIT picks them up
const ACCENTS = {
  sky: {
    text: "text-sky-400",
    border: "hover:border-sky-400/40",
    glow: "from-sky-500/30 via-sky-500/10 to-transparent",
    badge: "border-sky-400/30 bg-sky-400/10 text-sky-300",
    ring: "ring-sky-400/40",
  },
  violet: {
    text: "text-violet-400",
    border: "hover:border-violet-400/40",
    glow: "from-violet-500/30 via-violet-500/10 to-transparent",
    badge: "border-violet-400/30 bg-violet-400/10 text-violet-300",
    ring: "ring-violet-400/40",
  },
  emerald: {
    text: "text-emerald-400",
    border: "hover:border-emerald-400/40",
    glow: "from-emerald-500/30 via-emerald-500/10 to-transparent",
    badge: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
    ring: "ring-emerald-400/40",
  },
  amber: {
    text: "text-amber-400",
    border: "hover:border-amber-400/40",
    glow: "from-amber-500/30 via-amber-500/10 to-transparent",
    badge: "border-amber-400/30 bg-amber-400/10 text-amber-300",
    ring: "ring-amber-400/40",
  },
  rose: {
    text: "text-rose-400",
    border: "hover:border-rose-400/40",
    glow: "from-rose-500/30 via-rose-500/10 to-transparent",
    badge: "border-rose-400/30 bg-rose-400/10 text-rose-300",
    ring: "ring-rose-400/40",
  },
  cyan: {
    text: "text-cyan-400",
    border: "hover:border-cyan-400/40",
    glow: "from-cyan-500/30 via-cyan-500/10 to-transparent",
    badge: "border-cyan-400/30 bg-cyan-400/10 text-cyan-300",
    ring: "ring-cyan-400/40",
  },
  orange: {
    text: "text-orange-400",
    border: "hover:border-orange-400/40",
    glow: "from-orange-500/30 via-orange-500/10 to-transparent",
    badge: "border-orange-400/30 bg-orange-400/10 text-orange-300",
    ring: "ring-orange-400/40",
  },
};

// ─────────────────────────────────────────────────────────────
// Cursor-tracking wrapper — tilt + glow follows the pointer
// ─────────────────────────────────────────────────────────────
function TiltCard({ children, className = "", glowClass = "" }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [4, -4]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-4, 4]), {
    stiffness: 200,
    damping: 20,
  });

  const handleMove = useCallback(
    (e) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      x.set((e.clientX - rect.left) / rect.width - 0.5);
      y.set((e.clientY - rect.top) / rect.height - 0.5);

      // Also feed CSS variables for the glow position
      el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      el.style.setProperty("--my", `${e.clientY - rect.top}px`);
    },
    [x, y],
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
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className={`group/card relative ${className}`}
    >
      {/* Cursor-following glow */}
      <div
        className={`pointer-events-none absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover/card:opacity-100 ${glowClass}`}
        style={{
          background: `radial-gradient(500px circle at var(--mx, 50%) var(--my, 50%), rgba(56,189,248,0.10), transparent 40%)`,
        }}
      />
      {children}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────
// Image carousel with hover parallax + zoom
// ─────────────────────────────────────────────────────────────
function ProjectCarousel({ title, images, accent = "sky" }) {
  const [index, setIndex] = useState(0);
  const slides = images.length > 0 ? images : [null, null, null];
  const accentClasses = ACCENTS[accent] || ACCENTS.sky;

  const prev = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIndex((i) => (i === 0 ? slides.length - 1 : i - 1));
  };

  const next = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIndex((i) => (i === slides.length - 1 ? 0 : i + 1));
  };

  return (
    <div className="group/carousel relative aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]">
      <div
        className="flex h-full transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {slides.map((src, i) =>
          src ? (
            <div
              key={i}
              className="relative h-full w-full shrink-0 overflow-hidden"
            >
              <img
                src={src}
                alt={`${title} screenshot ${i + 1}`}
                className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover/card:scale-105"
              />
            </div>
          ) : (
            <div
              key={i}
              className="flex h-full w-full shrink-0 flex-col items-center justify-center gap-2 bg-gradient-to-br from-white/[0.04] to-transparent text-gray-600"
            >
              <ImageIcon size={22} strokeWidth={1.5} />
              <span className="text-xs">Screenshot coming soon</span>
            </div>
          ),
        )}
      </div>

      {/* Corner accent line on hover */}
      <div
        className={`pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-current to-transparent opacity-0 transition-opacity duration-500 group-hover/card:opacity-60 ${accentClasses.text}`}
      />

      {slides.length > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white opacity-0 backdrop-blur transition-all duration-200 group-hover/carousel:opacity-100 hover:bg-black/80 focus-visible:opacity-100"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={next}
            aria-label="Next image"
            className="absolute right-3 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white opacity-0 backdrop-blur transition-all duration-200 group-hover/carousel:opacity-100 hover:bg-black/80 focus-visible:opacity-100"
          >
            <ChevronRight size={16} />
          </button>

          <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIndex(i);
                }}
                aria-label={`Go to image ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index
                    ? "w-4 bg-white"
                    : "w-1.5 bg-white/40 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Technology badge with stagger animation
// ─────────────────────────────────────────────────────────────
function TechBadge({ label, accent = "sky", index = 0 }) {
  const accentClasses = ACCENTS[accent] || ACCENTS.sky;
  return (
    <motion.span
      initial={{ opacity: 0, y: 6 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3 + index * 0.04, duration: 0.3 }}
      whileHover={{ y: -2, scale: 1.04 }}
      className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors duration-300 ${accentClasses.badge}`}
    >
      {label}
    </motion.span>
  );
}

// ─────────────────────────────────────────────────────────────
// Main project card
// ─────────────────────────────────────────────────────────────
function ProjectCard({ project, index, onOpen }) {
  const accent = ACCENTS[project.accent] || ACCENTS.sky;
  // Alternate slide direction based on index
  const direction = index % 2 === 0 ? -1 : 1;

  return (
    <motion.div
      initial={{ opacity: 0, x: 60 * direction, y: 40 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.7,
        delay: (index % 2) * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={project.dominant ? "md:col-span-2" : ""}
    >
      <TiltCard
        className={`h-full rounded-2xl border border-white/10 bg-black p-5 transition-colors duration-300 ${accent.border}`}
      >
        <article className="flex h-full flex-col">
          <ProjectCarousel
            title={project.title}
            images={project.images}
            accent={project.accent}
          />

          <div className="flex flex-1 flex-col px-1 pt-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-gray-500">
                {project.category}
              </span>
              {project.featured && (
                <span
                  className={`rounded-full border px-3 py-1 text-xs ${accent.badge}`}
                >
                  {project.tagline}
                </span>
              )}
            </div>

            <h3 className="mt-4 text-2xl font-semibold text-white">
              {project.title}
            </h3>

            <p className="mt-3 max-w-3xl leading-7 text-gray-400">
              {project.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {project.technologies.map((tech, i) => (
                <TechBadge
                  key={tech}
                  label={tech}
                  accent={project.accent}
                  index={i}
                />
              ))}
            </div>

            {/* Actions */}
            <div className="mt-6 flex flex-wrap items-center gap-3 pt-2">
              {project.github && project.github !== "#" && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-gray-300 transition hover:border-white/25 hover:text-white"
                >
                  <Github size={16} />
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
                  <ExternalLink size={16} />
                  Live Demo
                </a>
              )}

              <button
                onClick={() => onOpen(project)}
                className="group/btn ml-auto inline-flex items-center gap-2 text-sm font-medium text-white transition"
              >
                View Details
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover/btn:translate-x-1"
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
// Detail modal — Problem → Solution → Features → Tech → Results
// ─────────────────────────────────────────────────────────────
function ProjectModal({ project, onClose }) {
  if (!project) return null;
  const accent = ACCENTS[project.accent] || ACCENTS.sky;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", stiffness: 220, damping: 24 }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-white/10 bg-gray-950 p-6 sm:p-8"
        >
          {/* Close */}
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-gray-400 transition hover:border-white/25 hover:text-white"
          >
            <X size={16} />
          </button>

          <div className="mb-6 flex flex-wrap items-center gap-3">
            <span
              className={`rounded-full border px-3 py-1 text-xs ${accent.badge}`}
            >
              {project.category}
            </span>
            {project.featured && (
              <span className="rounded-full border border-white/15 px-3 py-1 text-xs text-gray-400">
                {project.tagline}
              </span>
            )}
          </div>

          <h3 className="text-3xl font-bold text-white sm:text-4xl">
            {project.title}
          </h3>
          <p className="mt-4 leading-7 text-gray-400">{project.description}</p>

          {/* Case study grid */}
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
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

          {project.features?.length > 0 && (
            <div className="mt-8">
              <h4 className="mb-3 flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-gray-500">
                <Layers size={14} /> Key Features
              </h4>
              <ul className="grid gap-2 sm:grid-cols-2">
                {project.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2 text-sm text-gray-300"
                  >
                    <span
                      className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${accent.text} bg-current`}
                    />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {project.results?.length > 0 && (
            <div className="mt-8">
              <h4 className="mb-3 flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-gray-500">
                <TrendingUp size={14} /> Results
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

          <div className="mt-8">
            <h4 className="mb-3 text-sm font-medium uppercase tracking-wider text-gray-500">
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

          <div className="mt-8 flex flex-wrap gap-3 border-t border-white/10 pt-6">
            {project.github && project.github !== "#" && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-gray-300 transition hover:border-white/25 hover:text-white"
              >
                <Github size={16} />
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
                <ExternalLink size={16} />
                Visit Live Site
              </a>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function ModalBlock({ icon, title, text, accent }) {
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
  const [openProject, setOpenProject] = useState(null);

  return (
    <section id="projects" className="relative bg-gray-950 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-14 max-w-2xl sm:mb-16"
        >
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Things I&apos;ve built.
          </h2>
          <p className="mt-5 leading-7 text-gray-400">
            A selection of academic, internship, and personal projects that
            showcase my experience in software development.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onOpen={setOpenProject}
            />
          ))}
        </div>
      </div>

      <ProjectModal
        project={openProject}
        onClose={() => setOpenProject(null)}
      />
    </section>
  );
}
