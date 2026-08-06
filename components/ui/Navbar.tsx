"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const navLinks = [
  { href: "/#services", label: "Services" },
  { href: "/#process", label: "Process" },
  { href: "/#work", label: "Work" },
  { href: "/#team", label: "Team" },
  { href: "/#contact", label: "Contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    // Scroll behavior
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);

      // Hide navbar when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
      lastScrollY = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll);

    // Initialize Theme
    const savedTheme = localStorage.getItem("theme") as "dark" | "light" | null;
    if (savedTheme === "light") {
      setTheme("light");
      document.documentElement.classList.add("light-theme");
      document.body.classList.add("light-theme");
    } else {
      setTheme("dark");
      document.documentElement.classList.remove("light-theme");
      document.body.classList.remove("light-theme");
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    if (newTheme === "light") {
      document.documentElement.classList.add("light-theme");
      document.body.classList.add("light-theme");
    } else {
      document.documentElement.classList.remove("light-theme");
      document.body.classList.remove("light-theme");
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-3 px-4 md:px-8 ${
        isHidden ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"
      }`}
    >
      <nav
        className={`max-w-[1280px] mx-auto transition-all duration-300 rounded-full px-6 py-2.5 glass ${
          isScrolled
            ? "shadow-2xl backdrop-blur-2xl"
            : "shadow-lg backdrop-blur-lg"
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative overflow-hidden rounded-xl p-0.5 border border-glass-border bg-glass-bg shadow-inner group-hover:scale-105 transition-transform duration-300">
              <Image
                src="/logo.jpeg"
                alt="NextGen Tech Logo"
                width={32}
                height={32}
                className="rounded-lg object-cover"
              />
            </div>
            <span className="font-heading font-bold text-lg tracking-tight text-foreground group-hover:text-cyan transition-colors">
              NextGen Tech
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs tracking-wider uppercase font-semibold text-foreground-muted hover:text-foreground transition-colors relative group py-1"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-sky-400 to-indigo-400 rounded-full transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}

            {/* iOS Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="p-2 rounded-full border border-glass-border bg-glass-bg hover:bg-glass-hover text-foreground transition-all duration-300 flex items-center justify-center shadow-inner hover:scale-110 active:scale-95"
              title={
                theme === "dark" ? "Switch to White Theme" : "Switch to Dark Theme"
              }
            >
              {theme === "dark" ? (
                <Sun size={16} className="text-amber-400 animate-spin-slow" />
              ) : (
                <Moon size={16} className="text-sky-600" />
              )}
            </button>

            <Link href="/#contact" className="btn-primary text-xs !py-2 !px-5 font-semibold tracking-wide uppercase">
              Free Consultation
            </Link>
          </div>

          {/* Mobile Toggle & Theme Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="p-2 rounded-full border border-white/20 bg-white/10 text-foreground"
            >
              {theme === "dark" ? (
                <Sun size={16} className="text-amber-300" />
              ) : (
                <Moon size={16} className="text-slate-800" />
              )}
            </button>
            <button
              className="text-foreground p-2 rounded-full bg-white/10 border border-white/20"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-label="Toggle menu"
            >
              {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="md:hidden glass mt-3 mx-2 rounded-3xl overflow-hidden border-t-white/40 shadow-2xl p-6"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-foreground-muted hover:text-foreground font-medium transition-colors py-2.5 border-b border-white/10 flex items-center justify-between"
                  onClick={() => setIsMobileOpen(false)}
                >
                  <span>{link.label}</span>
                  <span className="text-xs opacity-40">→</span>
                </Link>
              ))}
              <Link
                href="/#contact"
                className="btn-primary text-center mt-3"
                onClick={() => setIsMobileOpen(false)}
              >
                Free Consultation
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
