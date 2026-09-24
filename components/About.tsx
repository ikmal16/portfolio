"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ComponentType,
} from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  GraduationCap,
  Briefcase,
  MapPin,
  ArrowUpRight,
  ArrowLeft,
  ArrowRight,
  Code2,
  Layers,
  Sparkles,
  ImageIcon,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────
type AccentKey = "sky" | "violet" | "emerald" | "amber";

type IconComponent = ComponentType<{
  size?: number;
  strokeWidth?: number;
  className?: string;
}>;

type Stat = {
  icon: IconComponent;
  value: number;
  suffix: string;
  label: string;
  sublabel: string;
  accent: AccentKey;
};

type Highlight = {
  icon: IconComponent;
  title: string;
  description: string;
};

type AccentStyles = {
  text: string;
  border: string;
  glow: string;
  iconBg: string;
};

type JourneySlide = {
  id: string;
  title: string;
  description: string;
  image: string;
  alt: string;
};

// ─────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────
const stats: Stat[] = [
  {
    icon: GraduationCap,
    value: 1,
    suffix: "",
    label: "Degree Earned",
    sublabel: "B.Sc. Software Engineering",
    accent: "sky",
  },
  {
    icon: Layers,
    value: 4,
    suffix: "+",
    label: "Projects Built",
    sublabel: "Full-stack & desktop",
    accent: "violet",
  },
  {
    icon: Code2,
    value: 15,
    suffix: "+",
    label: "Technologies Used",
    sublabel: "Across the stack",
    accent: "emerald",
  },
  {
    icon: Briefcase,
    value: 1,
    suffix: " year",
    label: "Internship and IT support",
    sublabel: "provide IT solutions",
    accent: "amber",
  },
];

const highlights: Highlight[] = [
  {
    icon: GraduationCap,
    title: "Education",
    description: "Bachelor of Software Engineering, Universiti Sains Malaysia",
  },
  {
    icon: Briefcase,
    title: "Experience",
    description:
      "6-month IT internship at INTEMATICS SDN BHD and a year of IT support experience",
  },
  {
    icon: MapPin,
    title: "Based in",
    description: "Selangor, Malaysia",
  },
];

// ─── Journey gallery slides ─────────────────────────────────
// Drop your images into /public/journey/ and update the paths below.
const journeySlides: JourneySlide[] = [
  {
    id: "university",
    title: "Software Engineering Journey",
    description:
      "Building my foundation in software engineering through academic projects and real-world problem solving.",
    image: "/dean1.jpg",
    alt: "Universiti Sains Malaysia campus — where I studied Software Engineering",
  },
  {
    id: "com",
    title: "Entrepreneurship Competition",
    description:
      "Grateful for the opportunity to participate in the Social Entrepreneurship Competition and achieve 3rd place.",
    image: "/comse.jpg",
    alt: "Screenshot of the Campus Facilities Management System dashboard",
  },
  {
    id: "internship",
    title: "Internship Experience",
    description:
      "Worked on frontend development, API integration, and software research during my six-month internship at INTEMATICS.",
    image: "/intern1.jpg",
    alt: "My workspace during the internship at INTEMATICS Sdn Bhd",
  },
  {
    id: "development",
    title: "Building & Debugging",
    description:
      "Turning ideas into working applications — from designing UIs to integrating backend services and debugging tricky edge cases.",
    image: "/logo1.png",
    alt: "Development environment with code editor and terminal open",
  },
  {
    id: "fullstack",
    title: "Full-Stack Solutions",
    description:
      "Delivering complete solutions: responsive frontends, secure APIs, and reliable databases — end to end.",
    image: "/diagram2.png",
    alt: "Full-stack application architecture and code on screen",
  },
];

const ACCENTS: Record<AccentKey, AccentStyles> = {
  sky: {
    text: "text-sky-400",
    border: "hover:border-sky-400/40",
    glow: "from-sky-500/20 via-sky-500/5 to-transparent",
    iconBg: "group-hover:bg-sky-400/10 group-hover:border-sky-400/30",
  },
  violet: {
    text: "text-violet-400",
    border: "hover:border-violet-400/40",
    glow: "from-violet-500/20 via-violet-500/5 to-transparent",
    iconBg: "group-hover:bg-violet-400/10 group-hover:border-violet-400/30",
  },
  emerald: {
    text: "text-emerald-400",
    border: "hover:border-emerald-400/40",
    glow: "from-emerald-500/20 via-emerald-500/5 to-transparent",
    iconBg: "group-hover:bg-emerald-400/10 group-hover:border-emerald-400/30",
  },
  amber: {
    text: "text-amber-400",
    border: "hover:border-amber-400/40",
    glow: "from-amber-500/20 via-amber-500/5 to-transparent",
    iconBg: "group-hover:bg-amber-400/10 group-hover:border-amber-400/30",
  },
};

// ─────────────────────────────────────────────────────────────
// Count-up number
// ─────────────────────────────────────────────────────────────
type CountUpProps = {
  value: number;
  suffix?: string;
  duration?: number;
  reduceMotion: boolean;
};

function CountUp({
  value,
  suffix = "",
  duration = 1.4,
  reduceMotion,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [display, setDisplay] = useState<number>(reduceMotion ? value : 0);

  useEffect(() => {
    if (reduceMotion || !inView) return;

    const start = 0;
    const startTime = performance.now();

    const step = (now: number) => {
      const progress = Math.min((now - startTime) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(start + (value - start) * eased));
      if (progress < 1) requestAnimationFrame(step);
    };

    const raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration, reduceMotion]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────
// Stat card (unchanged)
// ─────────────────────────────────────────────────────────────
type StatCardProps = {
  stat: Stat;
  index: number;
  reduceMotion: boolean;
};

function StatCard({ stat, index, reduceMotion }: StatCardProps) {
  const accent = ACCENTS[stat.accent] ?? ACCENTS.sky;
  const Icon = stat.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        delay: index * 0.1,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={reduceMotion ? {} : { y: -4 }}
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 p-5 backdrop-blur-sm transition-all duration-500 ${accent.border}`}
    >
      <div
        className={`pointer-events-none absolute inset-0 bg-linear-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${accent.glow}`}
      />
      <div className="relative">
        <div className="flex items-start justify-between">
          <div
            className={`rounded-xl border border-white/10 bg-white/3 p-2.5 transition-all duration-500 ${accent.iconBg}`}
          >
            <Icon
              size={17}
              strokeWidth={1.75}
              className={`text-gray-500 transition-all duration-500 group-hover:scale-110 ${accent.text}`}
            />
          </div>
        </div>
        <div className="mt-5">
          <div className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            <CountUp
              value={stat.value}
              suffix={stat.suffix}
              reduceMotion={reduceMotion}
            />
          </div>
          <div className="mt-1.5 text-sm font-medium text-gray-300">
            {stat.label}
          </div>
          <div className="mt-0.5 text-xs text-gray-500">{stat.sublabel}</div>
        </div>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────
// Highlight row (unchanged)
// ─────────────────────────────────────────────────────────────
type HighlightRowProps = {
  item: Highlight;
  index: number;
};

function HighlightRow({ item, index }: HighlightRowProps) {
  const Icon = item.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        delay: 0.35 + index * 0.1,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group flex items-start gap-5 border-b border-white/10 py-6 last:border-b-0"
    >
      <div className="mt-0.5 rounded-lg border border-white/10 bg-white/3 p-2 transition-colors duration-300 group-hover:border-sky-400/30 group-hover:bg-sky-400/6">
        <Icon
          size={16}
          strokeWidth={1.75}
          className="text-gray-500 transition-colors duration-300 group-hover:text-sky-400"
        />
      </div>
      <div>
        <h3 className="font-medium text-white">{item.title}</h3>
        <p className="mt-1 text-sm leading-6 text-gray-400">
          {item.description}
        </p>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────
// Journey Gallery — layered image stack with drag / swipe
// ─────────────────────────────────────────────────────────────
type JourneyGalleryProps = {
  slides: JourneySlide[];
  reduceMotion: boolean;
};

const SWIPE_THRESHOLD = 60; // px

function JourneyGallery({ slides, reduceMotion }: JourneyGalleryProps) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Cursor-following glow + subtle parallax
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const glowX = useSpring(pointerX, { stiffness: 150, damping: 20 });
  const glowY = useSpring(pointerY, { stiffness: 150, damping: 20 });

  const imageX = useSpring(useTransform(pointerX, [-0.5, 0.5], [-6, 6]), {
    stiffness: 120,
    damping: 20,
  });
  const imageY = useSpring(useTransform(pointerY, [-0.5, 0.5], [-6, 6]), {
    stiffness: 120,
    damping: 20,
  });

  const handlePointerMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (reduceMotion) return;
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      pointerX.set(nx);
      pointerY.set(ny);
      el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      el.style.setProperty("--my", `${e.clientY - rect.top}px`);
    },
    [pointerX, pointerY, reduceMotion],
  );

  const handlePointerLeave = useCallback(() => {
    pointerX.set(0);
    pointerY.set(0);
  }, [pointerX, pointerY]);

  const goTo = useCallback(
    (next: number, dir: 1 | -1) => {
      setDirection(dir);
      setIndex(((next % slides.length) + slides.length) % slides.length);
    },
    [slides.length],
  );

  const prev = useCallback(() => {
    goTo(index - 1, -1);
  }, [goTo, index]);

  const next = useCallback(() => {
    goTo(index + 1, 1);
  }, [goTo, index]);

  // Keyboard navigation on the container
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
      }
    },
    [next, prev],
  );

  const current = slides[index];

  // Preload neighbor images
  useEffect(() => {
    const neighbors = [
      slides[(index + 1) % slides.length],
      slides[(index - 1 + slides.length) % slides.length],
    ];
    neighbors.forEach((s) => {
      const img = new window.Image();
      img.src = s.image;
    });
  }, [index, slides]);

  return (
    <div className="flex flex-col gap-6">
      {/* ─── Featured stack ─────────────────────────────── */}
      <div
        ref={containerRef}
        onMouseMove={handlePointerMove}
        onMouseLeave={handlePointerLeave}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
        aria-label="Journey through my software engineering experience"
        className="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 bg-black/40 outline-none transition-colors duration-500 focus-visible:border-sky-400/40 focus-visible:ring-2 focus-visible:ring-sky-400/30 sm:aspect-[5/4] lg:aspect-[4/5]"
      >
        {/* Cursor-following glow */}
        <div
          className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(500px circle at var(--mx, 50%) var(--my, 50%), rgba(56,189,248,0.10), transparent 45%)",
          }}
        />

        {/* Layered stack — 2 backgrounds peeking behind */}
        {!reduceMotion &&
          [2, 1].map((offset) => {
            const peek = slides[(index + offset) % slides.length];
            const depth = offset;
            return (
              <motion.div
                key={`peek-${peek.id}`}
                aria-hidden
                initial={false}
                animate={{
                  opacity: 1,
                  scale: 1 - depth * 0.05,
                  y: -depth * 14,
                  zIndex: 10 - depth,
                }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                className="pointer-events-none absolute inset-x-6 top-4 h-full rounded-2xl border border-white/10 bg-gray-950"
                style={{ transformOrigin: "top center" }}
              />
            );
          })}

        {/* Slides */}
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={current.id}
            custom={direction}
            initial={{
              x: reduceMotion ? 0 : direction * 40,
              opacity: 0,
              scale: 0.98,
            }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            exit={{
              x: reduceMotion ? 0 : -direction * 40,
              opacity: 0,
              scale: 0.98,
            }}
            transition={{
              duration: reduceMotion ? 0.2 : 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
            drag={reduceMotion ? false : "x"}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={(_, info) => {
              if (info.offset.x < -SWIPE_THRESHOLD) next();
              else if (info.offset.x > SWIPE_THRESHOLD) prev();
            }}
            className="absolute inset-0 z-20 cursor-grab overflow-hidden rounded-2xl active:cursor-grabbing"
          >
            <motion.div
              style={reduceMotion ? undefined : { x: imageX, y: imageY }}
              className="relative h-full w-full"
            >
              <img
                src={current.image}
                alt={current.alt}
                draggable={false}
                loading={index === 0 ? "eager" : "lazy"}
                decoding="async"
                className="h-full w-full select-none object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />
              {/* Fallback icon shown behind broken images */}
              <div className="pointer-events-none absolute inset-0 -z-10 flex flex-col items-center justify-center gap-2 text-gray-700">
                <ImageIcon size={28} strokeWidth={1.5} />
                <span className="text-xs">{current.title}</span>
              </div>

              {/* Bottom gradient for caption contrast */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-black/80 to-transparent" />
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Counter badge */}
        <div className="pointer-events-none absolute left-4 top-4 z-30 rounded-full border border-white/15 bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
          <span className="text-sky-400">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="mx-1.5 text-gray-600">/</span>
          <span className="text-gray-400">
            {String(slides.length).padStart(2, "0")}
          </span>
        </div>

        {/* Prev / Next controls */}
        <div className="absolute bottom-4 right-4 z-30 flex items-center gap-2">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous image"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/60 text-gray-300 backdrop-blur-sm transition-all duration-300 hover:border-white/30 hover:bg-black/80 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
          >
            <ArrowLeft size={15} />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next image"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/60 text-gray-300 backdrop-blur-sm transition-all duration-300 hover:border-white/30 hover:bg-black/80 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
          >
            <ArrowRight size={15} />
          </button>
        </div>
      </div>

      {/* ─── Caption ─────────────────────────────────────── */}
      <div className="min-h-[92px] px-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-baseline gap-3">
              <span className="text-xs font-semibold tracking-wider text-sky-400">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h4 className="text-base font-semibold text-white sm:text-lg">
                {current.title}
              </h4>
            </div>
            <p className="mt-1.5 text-sm leading-6 text-gray-400">
              {current.description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ─── Progress timeline + thumbnails ──────────────── */}
      <div className="flex flex-col gap-4">
        {/* Progress timeline */}
        <div className="flex items-center gap-3">
          {slides.map((slide, i) => {
            const isActive = i === index;
            const isPast = i < index;
            return (
              <button
                key={slide.id}
                type="button"
                onClick={() => goTo(i, i > index ? 1 : -1)}
                aria-label={`Go to slide ${i + 1}: ${slide.title}`}
                aria-current={isActive ? "true" : undefined}
                className="group/step flex flex-1 items-center gap-2 focus-visible:outline-none"
              >
                <span
                  className={`text-[10px] font-medium tabular-nums transition-colors duration-300 ${
                    isActive
                      ? "text-sky-400"
                      : isPast
                        ? "text-gray-500"
                        : "text-gray-700"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="relative h-px flex-1 overflow-hidden rounded-full bg-white/10">
                  <motion.span
                    initial={false}
                    animate={{
                      scaleX: isActive ? 1 : isPast ? 1 : 0,
                    }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    style={{ originX: 0 }}
                    className={`absolute inset-0 ${
                      isActive
                        ? "bg-linear-to-r from-sky-400 to-sky-400/30"
                        : "bg-white/25"
                    }`}
                  />
                </span>
              </button>
            );
          })}
        </div>

        {/* Thumbnails */}
        <div
          className="flex gap-2 overflow-x-auto pb-1"
          role="tablist"
          aria-label="Journey thumbnails"
        >
          {slides.map((slide, i) => {
            const isActive = i === index;
            return (
              <button
                key={slide.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => goTo(i, i > index ? 1 : -1)}
                className={`group/thumb relative h-14 w-20 shrink-0 overflow-hidden rounded-lg border transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400 sm:h-16 sm:w-24 ${
                  isActive
                    ? "border-sky-400/60 ring-1 ring-sky-400/30"
                    : "border-white/10 opacity-60 hover:opacity-100"
                }`}
              >
                <img
                  src={slide.image}
                  alt=""
                  aria-hidden
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover/thumb:scale-110"
                />
                <span
                  className={`absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/80 to-transparent transition-opacity duration-300 ${
                    isActive ? "opacity-100" : "opacity-70"
                  }`}
                />
                <span className="absolute bottom-1 left-2 text-[10px] font-medium text-white/90">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Section
// ─────────────────────────────────────────────────────────────
export default function About() {
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-gray-950 py-24 sm:py-32"
    >
      {/* Soft background glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-1/3 h-100 w-100 rounded-full bg-sky-500/5 blur-[120px]" />
        <div className="absolute -right-40 bottom-1/4 h-100 w-100 rounded-full bg-violet-500/5 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-14 max-w-xl sm:mb-20"
        >
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            A little about me.
          </h2>
          <div className="mt-5 h-px w-16 bg-linear-to-r from-sky-400/80 to-transparent" />
        </motion.div>

        {/* Split: copy (left) + journey gallery (right) */}
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-16">
          {/* ─── Left: copy + CTA ─────────────────────────── */}
          <div className="flex flex-col">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg leading-8 text-gray-200"
            >
              I&apos;m a Software Engineering graduate from Universiti Sains
              Malaysia with a passion for transforming real-world challenges
              into practical digital solutions.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 leading-7 text-gray-400"
            >
              I enjoy understanding how people, processes, and technology
              interact, then turning complex problems into intuitive and
              functional applications. From designing user-focused interfaces to
              developing backend services and integrating APIs, I&apos;m driven
              by the process of turning ideas into solutions that create real
              value.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-6 leading-7 text-gray-400"
            >
              Through my academic projects and six-month internship, I gained
              hands-on experience in full-stack web development, API
              integration, databases, debugging, and software research. These
              experiences strengthened my ability to learn quickly, solve
              problems systematically, and adapt to new technologies.
            </motion.p>

            {/* Highlights */}
            <div className="mt-10 border-t border-white/10">
              {highlights.map((item, i) => (
                <HighlightRow key={item.title} item={item} index={i} />
              ))}
            </div>

            {/* CTA row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <a
                href="#projects"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-all duration-300 hover:bg-gray-100 hover:shadow-[0_0_40px_-8px_rgba(255,255,255,0.4)]"
              >
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-black/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <Layers size={15} />
                View My Work
                <ArrowRight
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                />
              </a>

              <a
                href="/Muhammad_Ikmal_Daniel_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:border-white/40 hover:bg-white/5"
              >
                <Sparkles size={15} className="text-sky-400" />
                View My Resume
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            </motion.div>
          </div>

          {/* ─── Right: Journey gallery ───────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <JourneyGallery
              slides={journeySlides}
              reduceMotion={reduceMotion}
            />
          </motion.div>
        </div>

        {/* ─── Stats strip (unchanged) ─────────────────────── */}
        <div className="mt-20 sm:mt-24">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-8 flex items-center gap-3"
          >
            <div className="h-px flex-1 bg-linear-to-r from-white/10 via-white/5 to-transparent" />
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-gray-500">
              By the numbers
            </span>
            <div className="h-px flex-1 bg-linear-to-l from-white/10 via-white/5 to-transparent" />
          </motion.div>

          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <StatCard
                key={stat.label}
                stat={stat}
                index={i}
                reduceMotion={reduceMotion}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
