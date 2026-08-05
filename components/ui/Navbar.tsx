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
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isHidden ? "-translate-y-full" : "translate-y-0"
      } ${
        isScrolled
          ? "glass py-3 shadow-lg shadow-black/30"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-[72px] flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <Image
            src="/logo.jpeg"
            alt="NextGen Tech Logo"
            width={34}
            height={34}
            className="rounded-lg transition-transform duration-300 group-hover:scale-110"
          />
          <span className="font-heading font-bold text-xl tracking-tight text-foreground transition-transform group-hover:scale-105">
            NextGen Tech
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-9">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-foreground-muted hover:text-foreground transition-colors relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-foreground transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="p-2.5 rounded-full border border-glass-border bg-glass-bg/60 hover:bg-glass-hover text-foreground transition-all duration-300 flex items-center justify-center shadow-sm hover:scale-105"
            title={
              theme === "dark" ? "Switch to White Theme" : "Switch to Dark Theme"
            }
          >
            {theme === "dark" ? (
              <Sun size={18} className="text-amber-400 animate-spin-slow" />
            ) : (
              <Moon size={18} className="text-slate-700" />
            )}
          </button>

          <Link href="/#contact" className="btn-primary text-sm !py-2.5 !px-6">
            Free Consultation
          </Link>
        </div>

        {/* Mobile Toggle & Theme Button */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="p-2 rounded-full border border-glass-border bg-glass-bg/60 text-foreground"
          >
            {theme === "dark" ? (
              <Sun size={18} className="text-amber-400" />
            ) : (
              <Moon size={18} className="text-slate-700" />
            )}
          </button>
          <button
            className="text-foreground p-2"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="Toggle menu"
          >
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass mt-2 mx-4 rounded-2xl overflow-hidden"
          >
            <div className="p-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-foreground-muted hover:text-foreground transition-colors py-2 border-b border-glass-border"
                  onClick={() => setIsMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/#contact"
                className="btn-primary text-center mt-2"
                onClick={() => setIsMobileOpen(false)}
              >
                Free Consultation
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
