"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  Globe,
  Server,
  Database,
  Wrench,
  Sparkles,
  ChevronRight,
} from "lucide-react";

const skillCategories = [
  {
    id: "frontend",
    icon: Globe,
    title: "Frontend",
    skills: ["React.js", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS"],
    color: "from-sky-500/20 to-sky-500/5",
    border: "hover:border-sky-500/40",
    text: "text-sky-400",
  },
  {
    id: "backend",
    icon: Server,
    title: "Backend",
    skills: ["FastAPI", "REST API", "Python"],
    color: "from-emerald-500/20 to-emerald-500/5",
    border: "hover:border-emerald-500/40",
    text: "text-emerald-400",
  },
  {
    id: "database",
    icon: Database,
    title: "Database",
    skills: ["Supabase", "PostgreSQL", "MongoDB"],
    color: "from-violet-500/20 to-violet-500/5",
    border: "hover:border-violet-500/40",
    text: "text-violet-400",
  },
  {
    id: "tools",
    icon: Wrench,
    title: "Tools",
    skills: ["Git", "GitHub", "Vercel", "Figma"],
    color: "from-amber-500/20 to-amber-500/5",
    border: "hover:border-amber-500/40",
    text: "text-amber-400",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      duration: 0.6,
    },
  },
};

const skillVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 200, damping: 15 },
  },
};

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState("frontend");
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const activeSkills = skillCategories.find((c) => c.id === activeCategory);

  return (
    <section
      id="skills"
      className="relative overflow-hidden bg-black py-24 sm:py-32"
    >
      {/* Subtle background glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-sky-500/5 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-14 max-w-2xl sm:mb-16"
        >
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Technologies I work with.
          </h2>
          <p className="mt-5 leading-7 text-gray-400">
            A collection of technologies and tools I&apos;ve used throughout my
            academic projects, internship, and personal development.
          </p>
        </motion.div>

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8 flex flex-wrap gap-2"
        >
          {skillCategories.map((category) => {
            const Icon = category.icon;
            const isActive = activeCategory === category.id;

            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`group relative flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? `border-white/20 bg-white/[0.06] ${category.text}`
                    : "border-white/10 text-gray-400 hover:border-white/20 hover:text-gray-200"
                }`}
              >
                <Icon
                  size={16}
                  strokeWidth={1.75}
                  className={`transition-transform duration-300 ${
                    isActive
                      ? "scale-110"
                      : "group-hover:scale-110 group-hover:rotate-6"
                  }`}
                />
                {category.title}

                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 -z-10 rounded-full border border-white/20 bg-white/[0.04]"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </motion.div>

        {/* Skills display */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid gap-4 lg:grid-cols-3"
        >
          {/* Main skill card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
              className={`relative overflow-hidden rounded-2xl border border-white/10 p-6 sm:p-8 lg:col-span-2 ${activeSkills.border} transition-colors duration-500`}
            >
              {/* Gradient background */}
              <div
                className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${activeSkills.color} opacity-50`}
              />

              <div className="relative">
                {/* Header */}
                <div className="mb-8 flex items-center gap-3">
                  <motion.div
                    key={activeSkills.id}
                    initial={{ rotate: -20, scale: 0.8 }}
                    animate={{ rotate: 0, scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  >
                    <activeSkills.icon
                      size={24}
                      strokeWidth={1.75}
                      className={activeSkills.text}
                    />
                  </motion.div>
                  <h3 className="text-xl font-semibold text-white">
                    {activeSkills.title}
                  </h3>
                  <span className="ml-auto rounded-full border border-white/10 px-3 py-1 text-xs text-gray-400">
                    {activeSkills.skills.length} skills
                  </span>
                </div>

                {/* Skills list */}
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="flex flex-wrap gap-3"
                >
                  {activeSkills.skills.map((skill, index) => (
                    <motion.span
                      key={skill}
                      variants={skillVariants}
                      custom={index}
                      onMouseEnter={() => setHoveredSkill(skill)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      whileHover={{
                        scale: 1.05,
                        y: -2,
                        transition: {
                          type: "spring",
                          stiffness: 400,
                          damping: 15,
                        },
                      }}
                      className={`relative cursor-default rounded-xl border px-4 py-2.5 text-sm font-medium transition-all duration-300 ${
                        hoveredSkill === skill
                          ? `border-white/30 bg-white/[0.08] text-white`
                          : "border-white/10 bg-white/[0.03] text-gray-300"
                      }`}
                    >
                      {skill}
                      {/* Hover glow */}
                      {hoveredSkill === skill && (
                        <motion.div
                          layoutId="skillGlow"
                          className={`absolute inset-0 -z-10 rounded-xl bg-gradient-to-r ${activeSkills.color} blur-md`}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                          }}
                        />
                      )}
                    </motion.span>
                  ))}
                </motion.div>

                {/* Progress indicator - decorative, not fake percentage */}
                <div className="mt-8 flex items-center gap-2 text-xs text-gray-500">
                  <ChevronRight size={14} className={activeSkills.text} />
                  <span>Continuously deepening expertise</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Side panel: always learning */}
          <motion.div variants={cardVariants} className="flex flex-col gap-4">
            {/* Bonus panel: always learning */}
            <div className="group relative overflow-hidden rounded-2xl border border-dashed border-white/15 p-6 transition-all duration-500 hover:border-white/25 hover:bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Sparkles
                    size={19}
                    strokeWidth={1.75}
                    className="text-gray-500 transition-colors duration-300 group-hover:text-amber-400"
                  />
                </motion.div>
                <h3 className="font-medium text-white">Always learning</h3>
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-400">
                This list keeps growing — I&apos;m currently spending time
                deepening my backend and cloud fundamentals alongside my
                day-to-day stack.
              </p>
            </div>

            {/* Quick stats / decorative panel */}
            <div className="rounded-2xl border border-white/10 p-6">
              <h4 className="mb-4 text-xs font-medium uppercase tracking-wider text-gray-500">
                Currently exploring
              </h4>
              <div className="space-y-3">
                {[
                  { label: "Cloud Fundamentals", icon: Server },
                  { label: "System Design", icon: Code2 },
                  { label: "Advanced TypeScript", icon: Globe },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="flex items-center gap-3 text-sm text-gray-400 transition-colors duration-300 hover:text-gray-200"
                  >
                    <item.icon
                      size={15}
                      strokeWidth={1.75}
                      className="text-gray-500"
                    />
                    {item.label}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
