"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  // Refs for measuring the active indicator
  const navRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [indicator, setIndicator] = useState({
    left: 0,
    width: 0,
    ready: false,
  });

  // ─── Scroll progress bar ─────────────────────────────────
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  // ─── Solidify navbar on scroll ───────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ─── Scroll-spy ──────────────────────────────────────────
  useEffect(() => {
    const sections = navItems
      .map((item) => document.querySelector(item.href))
      .filter((section): section is Element => section !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // ─── Move the active indicator to match the active link ──
  const updateIndicator = useCallback(() => {
    const el = navRefs.current[active];
    if (!el) return;
    const parent = el.parentElement;
    if (!parent) return;
    const elRect = el.getBoundingClientRect();
    const parentRect = parent.getBoundingClientRect();
    setIndicator({
      left: elRect.left - parentRect.left,
      width: elRect.width,
      ready: true,
    });
  }, [active]);

  useEffect(() => {
    updateIndicator();
    // Re-measure on resize and after fonts load
    window.addEventListener("resize", updateIndicator);
    if (document.fonts?.ready) {
      document.fonts.ready.then(updateIndicator);
    }
    return () => window.removeEventListener("resize", updateIndicator);
  }, [updateIndicator]);

  // ─── Mobile menu: lock body, ESC to close, focus return ──
  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-sky-400 via-violet-400 to-emerald-400"
      />

      <nav
        className={`fixed top-0 z-50 w-full border-b transition-all duration-500 ${
          scrolled
            ? "border-white/10 bg-black/70 backdrop-blur-xl supports-[backdrop-filter]:bg-black/50"
            : "border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          {/* Logo */}
          <a
            href="#home"
            className="group relative text-xl font-bold tracking-tight text-white rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/60"
          >
            <motion.span
              initial={false}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="inline-block"
            >
              Ikmal
              <span className="text-sky-400 transition-colors duration-300 group-hover:text-sky-300">
                .
              </span>
            </motion.span>
          </a>

          {/* Desktop nav */}
          <div className="relative hidden items-center gap-8 md:flex">
            {navItems.map((item) => {
              const isActive = active === item.href.slice(1);
              return (
                <a
                  key={item.name}
                  ref={(el) => {
                    navRefs.current[item.href.slice(1)] = el;
                  }}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`group relative py-1 text-sm transition-colors duration-300 focus-visible:outline-none ${
                    isActive ? "text-white" : "text-gray-400 hover:text-white"
                  }`}
                >
                  <span className="relative inline-block">
                    {item.name}
                    {/* Hover underline — expands from center */}
                    <span className="absolute -bottom-0.5 left-1/2 h-px w-0 -translate-x-1/2 bg-white/40 transition-all duration-300 group-hover:w-full" />
                  </span>
                </a>
              );
            })}

            {/* Animated active indicator */}
            {indicator.ready && (
              <motion.span
                aria-hidden
                initial={false}
                animate={{
                  left: indicator.left,
                  width: indicator.width,
                  opacity: 1,
                }}
                transition={{
                  type: "spring",
                  stiffness: 350,
                  damping: 30,
                }}
                className="pointer-events-none absolute -bottom-0.5 h-px bg-white"
              />
            )}
          </div>

          {/* Mobile menu button */}
          <button
            ref={buttonRef}
            onClick={() => setIsOpen((v) => !v)}
            className="relative rounded-sm text-gray-400 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/60 md:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              {isOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="block"
                >
                  <X size={24} />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="block"
                >
                  <Menu size={24} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              id="mobile-menu"
              key="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden border-t border-white/10 bg-black/95 backdrop-blur-xl md:hidden"
            >
              <div className="flex flex-col gap-1 px-6 py-4">
                {navItems.map((item, i) => {
                  const isActive = active === item.href.slice(1);
                  return (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      aria-current={isActive ? "page" : undefined}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.05 + i * 0.05,
                        duration: 0.3,
                      }}
                      className={`group flex items-center justify-between rounded-lg px-3 py-3 text-sm transition-colors ${
                        isActive
                          ? "bg-white/[0.04] text-white"
                          : "text-gray-400 hover:bg-white/[0.03] hover:text-white"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        {isActive && (
                          <motion.span
                            layoutId="mobileDot"
                            className="h-1.5 w-1.5 rounded-full bg-sky-400"
                          />
                        )}
                        {!isActive && (
                          <span className="h-1.5 w-1.5 rounded-full bg-transparent" />
                        )}
                        {item.name}
                      </span>
                      <span className="text-xs text-gray-600 group-hover:text-gray-400">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
