"use client";

import { useState, useRef } from "react";
import { motion } from "motion/react";
import { Send, Check, Loader2, AlertCircle } from "lucide-react";
import { services } from "@/lib/services-data";
import emailjs from "@emailjs/browser";

// Strict email validation
function validateEmail(email: string): { valid: boolean; error?: string } {
  if (!email) return { valid: false, error: "Email is required." };

  const basicRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!basicRegex.test(email)) {
    return { valid: false, error: "Please enter a valid email address." };
  }

  const domain = email.split("@")[1]?.toLowerCase();
  const typos: Record<string, string> = {
    "gmial.com": "gmail.com",
    "gmai.com": "gmail.com",
    "gmal.com": "gmail.com",
    "gamil.com": "gmail.com",
    "gnail.com": "gmail.com",
    "gmail.co": "gmail.com",
    "gmail.cm": "gmail.com",
    "gmaill.com": "gmail.com",
    "gmil.com": "gmail.com",
    "yaho.com": "yahoo.com",
    "yahooo.com": "yahoo.com",
    "yahoo.co": "yahoo.com",
    "hotmal.com": "hotmail.com",
    "hotmai.com": "hotmail.com",
    "outloo.com": "outlook.com",
    "outlok.com": "outlook.com",
  };
  if (domain && typos[domain]) {
    return {
      valid: false,
      error: `Did you mean ${email.split("@")[0]}@${typos[domain]}?`,
    };
  }

  const tld = domain?.split(".").pop();
  if (!tld || tld.length < 2) {
    return { valid: false, error: "Email domain appears invalid." };
  }

  return { valid: true };
}

export default function ContactForm() {
  const form = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    serviceInterested: "",
    message: "",
    honeypot: "", // Hidden spam field
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [emailError, setEmailError] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);

  const handleEmailChange = (value: string) => {
    setFormData({ ...formData, email: value });
    if (emailTouched && value) {
      const result = validateEmail(value);
      setEmailError(result.valid ? "" : result.error || "");
    } else if (!value) {
      setEmailError("");
    }
  };

  const handleEmailBlur = () => {
    setEmailTouched(true);
    if (formData.email) {
      const result = validateEmail(formData.email);
      setEmailError(result.valid ? "" : result.error || "");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate email before submission
    const emailResult = validateEmail(formData.email);
    if (!emailResult.valid) {
      setEmailTouched(true);
      setEmailError(emailResult.error || "Invalid email.");
      return;
    }

    if (!form.current) return;

    setStatus("loading");
    setErrorMessage("");

    try {
      // Send via EmailJS (client-side)
      await emailjs.sendForm(
        "service_vpmhzej",
        "template_0mkma5j",
        form.current,
        {
          publicKey: "GSV5tLmd7tYLx80kW",
        }
      );

      // Also send via server API to deliver to company Gmail
      try {
        await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            serviceInterested: formData.serviceInterested,
            message: formData.message,
            honeypot: formData.honeypot,
          }),
        });
      } catch {
        // Server email is best-effort; don't block success
        console.warn("Server-side email notification failed (non-critical).");
      }

      setStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        serviceInterested: "",
        message: "",
        honeypot: "",
      });
      setEmailTouched(false);
      setEmailError("");

      // Reset success state after 5 seconds
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "Something went wrong sending the message. Please try again."
      );
    }
  };

  const inputClasses =
    "w-full bg-white/5 backdrop-blur-xl border border-white/20 border-t-white/35 rounded-2xl px-4 py-3.5 text-foreground placeholder:text-foreground-dim focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-400/30 transition-all shadow-inner";

  const inputErrorClasses =
    "w-full bg-white/5 backdrop-blur-xl border border-red-500/60 rounded-2xl px-4 py-3.5 text-foreground placeholder:text-foreground-dim focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/30 transition-all shadow-inner";

  return (
    <motion.form
      ref={form}
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="space-y-5"
    >
      {/* Honeypot — hidden from users, catches bots */}
      <input
        type="text"
        name="company_url"
        value={formData.honeypot}
        onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="contact-name" className="block text-sm text-foreground-muted mb-2">
            Name *
          </label>
          <input
            id="contact-name"
            name="user_name"
            type="text"
            required
            placeholder="John Doe"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="block text-sm text-foreground-muted mb-2">
            Email *
          </label>
          <input
            id="contact-email"
            name="user_email"
            type="email"
            required
            placeholder="john@company.com"
            value={formData.email}
            onChange={(e) => handleEmailChange(e.target.value)}
            onBlur={handleEmailBlur}
            className={emailTouched && emailError ? inputErrorClasses : inputClasses}
          />
          {emailTouched && emailError && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-1.5 text-xs text-red-400 flex items-center gap-1.5"
            >
              <AlertCircle size={13} />
              {emailError}
            </motion.p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="contact-phone" className="block text-sm text-foreground-muted mb-2">
            Phone *
          </label>
          <input
            id="contact-phone"
            name="user_phone"
            type="tel"
            required
            placeholder="+91 98765 43210"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="contact-service" className="block text-sm text-foreground-muted mb-2">
            Service Interested In
          </label>
          <select
            id="contact-service"
            name="service_interested"
            value={formData.serviceInterested}
            onChange={(e) => setFormData({ ...formData, serviceInterested: e.target.value })}
            className={inputClasses}
          >
            <option value="">Select a service...</option>
            {services.map((s) => (
              <option key={s.slug} value={s.title}>
                {s.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-sm text-foreground-muted mb-2">
          Message *
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          placeholder="Tell us about your project..."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className={`${inputClasses} resize-none`}
        />
      </div>

      {/* Error state */}
      {status === "error" && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {errorMessage}
        </div>
      )}

      {/* Success state */}
      {status === "success" && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm flex items-center gap-2"
        >
          <Check size={18} />
          Thank you! We&apos;ll be in touch within 24 hours.
        </motion.div>
      )}

      <button
        type="submit"
        disabled={status === "loading" || status === "success" || !!(emailTouched && emailError)}
        className="btn-primary w-full flex items-center justify-center gap-2 text-base disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "loading" ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Sending...
          </>
        ) : status === "success" ? (
          <>
            <Check size={18} />
            Sent!
          </>
        ) : (
          <>
            <Send size={18} />
            Send Message
          </>
        )}
      </button>
    </motion.form>
  );
}
