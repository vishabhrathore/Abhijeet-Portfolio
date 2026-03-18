/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "motion/react";
import {
  Cloud, Server, Database, ShieldCheck, Terminal, GitBranch,
  Mail, Phone, MapPin, Linkedin, ChevronDown, ExternalLink,
  Cpu, Layers, Container, Workflow, Settings, Lock, BarChart3,
  RefreshCw, Send, Loader2, Menu, X, Zap, TrendingDown, Activity,
  DollarSign, Shield, GitMerge, Boxes, ServerCrash,
} from "lucide-react";
import React, { useEffect, useState, useRef } from "react";
import emailjs from "@emailjs/browser";

// ─── Detect touch/mobile to skip heavy parallax ──────────────────────────────
const isTouchDevice = () =>
  typeof window !== "undefined" &&
  ("ontouchstart" in window || navigator.maxTouchPoints > 0);

// ─── Parallax Hero Background (desktop only) ─────────────────────────────────
const ParallaxHero = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springCfg = { stiffness: 55, damping: 20, mass: 1 };
  const smX = useSpring(mouseX, springCfg);
  const smY = useSpring(mouseY, springCfg);

  const l1x = useTransform(smX, [-0.5, 0.5], [-18, 18]);
  const l1y = useTransform(smY, [-0.5, 0.5], [-12, 12]);
  const l2x = useTransform(smX, [-0.5, 0.5], [-34, 34]);
  const l2y = useTransform(smY, [-0.5, 0.5], [-22, 22]);
  const l3x = useTransform(smX, [-0.5, 0.5], [12, -12]);
  const l3y = useTransform(smY, [-0.5, 0.5], [8, -8]);
  const gx = useTransform(smX, [-0.5, 0.5], [-6, 6]);
  const gy = useTransform(smY, [-0.5, 0.5], [-4, 4]);

  useEffect(() => {
    if (isTouchDevice()) return;
    const onMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth) - 0.5);
      mouseY.set((e.clientY / window.innerHeight) - 0.5);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Grid */}
      <motion.div style={{ x: gx, y: gy }} className="absolute inset-0">
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </motion.div>

      {/* Orbs */}
      <motion.div style={{ x: l2x, y: l2y }} className="absolute inset-0">
        <div className="absolute top-[18%] right-[16%] w-48 h-48 md:w-72 md:h-72 rounded-full bg-accent/6 blur-3xl" />
        <div className="absolute bottom-[12%] left-[18%] w-64 h-64 md:w-96 md:h-96 rounded-full bg-accent/4 blur-3xl" />
      </motion.div>

      {/* Icon nodes — hidden on small screens, shown md+ */}
      <motion.div style={{ x: l1x, y: l1y }} className="absolute inset-0 hidden md:block">
        <div className="absolute top-[14%] left-[10%] w-14 h-14 rounded-full border border-accent/20 bg-white/60 backdrop-blur-sm flex items-center justify-center shadow-sm">
          <Cloud size={18} className="text-accent/50" />
        </div>
        <div className="absolute bottom-[24%] right-[12%] w-12 h-12 rounded-full border border-accent/15 bg-white/60 backdrop-blur-sm flex items-center justify-center shadow-sm">
          <Server size={16} className="text-accent/40" />
        </div>
        <div className="absolute top-[58%] left-[5%] w-11 h-11 rounded-full border border-ink/10 bg-white/50 backdrop-blur-sm flex items-center justify-center">
          <Database size={14} className="text-ink/25" />
        </div>
        <div className="absolute top-[32%] right-[5%] w-11 h-11 rounded-full border border-accent/15 bg-white/50 backdrop-blur-sm flex items-center justify-center">
          <Shield size={14} className="text-accent/30" />
        </div>
      </motion.div>

      {/* Tech badges — only on large screens */}
      <motion.div style={{ x: l3x, y: l3y }} className="absolute inset-0 hidden lg:block">
        {[
          { text: "AWS ECS", top: "27%", right: "7%" },
          { text: "CI/CD", bottom: "32%", left: "7%" },
          { text: "Docker", top: "68%", right: "10%" },
          { text: "IAM + KMS", top: "44%", left: "3%" },
          { text: "CloudWatch", top: "10%", right: "28%" },
        ].map((b) => (
          <div key={b.text}
            style={{ top: b.top, bottom: b.bottom, right: b.right, left: b.left }}
            className="absolute px-3 py-1.5 bg-white/75 backdrop-blur-sm border border-ink/10 rounded-full text-[11px] font-medium text-ink/45 shadow-sm">
            {b.text}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

// ─── Navbar ───────────────────────────────────────────────────────────────────
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navItems = ["About", "Experience", "Skills", "Awards", "Contact"];

  useEffect(() => {
    const h = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0, 0, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "glass border-b border-ink/10 py-3 md:py-4" : "bg-transparent py-5 md:py-6"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
          <div className="text-xl md:text-2xl font-display font-bold tracking-tight">AS</div>
          <div className="hidden md:flex gap-8">
            {navItems.map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`}
                className="relative group text-sm font-medium uppercase tracking-widest overflow-hidden">
                <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">{item}</span>
                <span className="absolute left-0 top-full inline-block transition-transform duration-300 group-hover:-translate-y-full text-accent">{item}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-accent transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>
          <button
            className="md:hidden p-2 rounded-sm border border-ink/10 hover:border-accent transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile full-screen drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }} animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }} transition={{ duration: 0.32, ease: [0.25, 0, 0, 1] }}
            className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center gap-8"
          >
            {navItems.map((item, i) => (
              <motion.a key={item} href={`#${item.toLowerCase()}`}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }} onClick={() => setMobileOpen(false)}
                className="text-3xl sm:text-4xl font-display font-bold text-ink hover:text-accent transition-colors uppercase tracking-widest">
                {item}
              </motion.a>
            ))}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
              className="mt-4 flex flex-col items-center gap-2"
            >
              <span className="text-xs text-mid-gray flex items-center gap-1.5">
                <MapPin size={12} className="text-accent" /> Gurugram, India
              </span>
              <a href="mailto:asingh74175@gmail.com" className="text-xs text-accent font-medium">
                asingh74175@gmail.com
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// ─── Hero ─────────────────────────────────────────────────────────────────────
const Hero = () => (
  <section className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 overflow-hidden py-24 md:py-0">
    <div className="noise" />
    <ParallaxHero />

    {/* Badge */}
    <motion.div
      initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }}
      className="mb-5 sm:mb-8 z-10 text-center"
    >
      <span className="inline-block px-3 py-1.5 sm:px-4 border border-ink/20 rounded-full text-[10px] sm:text-xs font-medium uppercase tracking-widest text-mid-gray">
        Cloud / DevOps Engineer · 2.9+ Years
      </span>
    </motion.div>

    {/* Name — scales gracefully across all screens */}
    <motion.h1
      initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.15 }}
      className="text-[2.8rem] xs:text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-display font-bold text-center tracking-tight leading-[1.05] mb-4 sm:mb-6 group cursor-default z-10 px-2"
    >
      <span className="inline-block transition-all duration-500 group-hover:tracking-normal">
        ABHIJEET
      </span>
      {/* Break name on very small screens for better fit */}
      <br className="sm:hidden" />
      <span className="inline-block transition-all duration-500 group-hover:tracking-normal sm:ml-4">
        SINGH
      </span>
    </motion.h1>

    {/* Tagline */}
    <motion.p
      initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="text-base sm:text-xl md:text-2xl text-mid-gray font-light text-center max-w-xs sm:max-w-xl md:max-w-2xl mb-6 sm:mb-10 z-10 px-2"
    >
      Designing cloud infrastructure that scales, secures, and saves.
    </motion.p>

    {/* Skill pills — 2×2 grid on mobile, single row on md+ */}
    <motion.div
      initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.38 }}
      className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center gap-2 sm:gap-3 mb-6 sm:mb-10 z-10 w-full max-w-xs sm:max-w-none"
    >
      {[
        { icon: <TrendingDown size={12} />, label: "Cost Optimizer" },
        { icon: <Zap size={12} />, label: "CI/CD Builder" },
        { icon: <ShieldCheck size={12} />, label: "AWS Security" },
        { icon: <Activity size={12} />, label: "High Availability" },
      ].map((s) => (
        <span key={s.label}
          className="flex items-center justify-center gap-1.5 px-3 py-2 bg-white/80 border border-ink/10 rounded-full text-[11px] sm:text-xs font-medium text-ink shadow-sm backdrop-blur-sm">
          <span className="text-accent">{s.icon}</span>{s.label}
        </span>
      ))}
    </motion.div>

    {/* CTA buttons — stack on mobile, side by side on sm+ */}
    <motion.div
      initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.45 }}
      className="flex flex-col sm:flex-row gap-3 sm:gap-4 z-10 w-full max-w-xs sm:max-w-none sm:w-auto"
    >
      <a href="#experience"
        className="text-center px-6 sm:px-8 py-3.5 sm:py-4 bg-ink text-white font-medium rounded-sm border border-ink transition-all duration-300 hover:bg-transparent hover:text-ink text-sm sm:text-base">
        View My Work
      </a>
      <a href="#contact"
        className="text-center px-6 sm:px-8 py-3.5 sm:py-4 bg-transparent text-ink border border-ink font-medium rounded-sm transition-all duration-300 hover:bg-ink hover:text-white text-sm sm:text-base">
        Contact Me
      </a>
    </motion.div>

    {/* Location + scroll indicator */}
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.6 }}
      className="absolute bottom-6 sm:bottom-12 flex flex-col items-center gap-3 z-10"
    >
      <span className="text-xs font-medium text-mid-gray flex items-center gap-1.5">
        <MapPin size={12} className="text-accent" /> Gurugram, India
      </span>
      <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
        <ChevronDown size={18} className="text-mid-gray/40" />
      </motion.div>
    </motion.div>
  </section>
);

// ─── About ────────────────────────────────────────────────────────────────────
const About = () => {
  const [count, setCount] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let start = 0;
        const end = 2.9, duration = 1500;
        const increment = end / (duration / 16);
        const timer = setInterval(() => {
          start += increment;
          if (start >= end) { setCount(end); clearInterval(timer); }
          else setCount(start);
        }, 16);
      }
    }, { threshold: 0.3 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="py-16 sm:py-24 bg-off-white overflow-hidden" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-10 gap-10 md:gap-16 items-center">

        {/* Left: counter + stat cards */}
        <motion.div initial={{ x: -40, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }} className="md:col-span-4 relative">
          <div className="absolute -top-8 -left-4 text-[8rem] sm:text-[12rem] font-display font-bold text-ink/5 leading-tight select-none">2.9+</div>
          <div className="relative">
            <h2 className="text-6xl sm:text-7xl md:text-8xl font-display font-bold text-ink leading-tight">
              {count.toFixed(1)}+
            </h2>
            <p className="text-base sm:text-lg font-medium uppercase tracking-widest text-accent mt-2">
              Years of Experience
            </p>
            <div className="mt-6 sm:mt-8 grid grid-cols-2 gap-3 sm:gap-4">
              {[
                { value: "4", label: "Awards Won" },
                { value: "18+", label: "AWS Services" },
                { value: "10+", label: "Tools & Tech" },
                { value: "∞", label: "Uptime Goal" },
              ].map((s) => (
                <div key={s.label} className="p-3 sm:p-4 bg-white rounded-lg border border-light-border shadow-sm">
                  <div className="text-xl sm:text-2xl font-display font-bold text-ink">{s.value}</div>
                  <div className="text-[10px] sm:text-xs text-mid-gray mt-1 uppercase tracking-wide">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right: bio */}
        <motion.div initial={{ x: 40, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }} className="md:col-span-6">
          <p className="text-lg sm:text-xl md:text-2xl text-mid-gray leading-relaxed mb-5 sm:mb-6">
            I started my cloud journey curious about how the internet actually runs — the invisible machinery behind every app, every click, every deployment. That curiosity turned into a career.
          </p>
          <p className="text-base sm:text-lg text-mid-gray leading-relaxed mb-6 sm:mb-8">
            Today, I design and manage AWS-based production systems at Benepik Technology — containerizing workloads, automating pipelines, hardening security, and making sure the infrastructure bill doesn't surprise anyone. I believe good DevOps is invisible: when it's done right, nobody notices.
          </p>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {["AWS Expert", "CI/CD Builder", "Cost Optimizer", "Security-First", "Container Native"].map((badge) => (
              <span key={badge} className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white border border-light-border rounded-full text-xs sm:text-sm font-medium text-ink shadow-sm">
                {badge}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ─── Experience bullet with meaningful icon dot ───────────────────────────────
const bulletMeta = [
  { icon: <Cloud size={11} />, color: "bg-blue-50 text-blue-600 border-blue-200", tip: "Multi-stack deployment" },
  { icon: <Container size={11} />, color: "bg-purple-50 text-purple-600 border-purple-200", tip: "Containerization" },
  { icon: <DollarSign size={11} />, color: "bg-green-50 text-green-600 border-green-200", tip: "Cost optimization" },
  { icon: <GitMerge size={11} />, color: "bg-orange-50 text-orange-600 border-orange-200", tip: "CI/CD pipelines" },
  { icon: <Boxes size={11} />, color: "bg-sky-50 text-sky-600 border-sky-200", tip: "AWS services" },
  { icon: <Shield size={11} />, color: "bg-red-50 text-red-600 border-red-200", tip: "Cloud security" },
  { icon: <TrendingDown size={11} />, color: "bg-emerald-50 text-emerald-600 border-emerald-200", tip: "Cost reduction" },
  { icon: <ServerCrash size={11} />, color: "bg-amber-50 text-amber-600 border-amber-200", tip: "Disaster recovery" },
];

const ExperienceBullet = ({ bullet, idx }: { bullet: string; idx: number }) => {
  const [hovered, setHovered] = useState(false);
  const meta = bulletMeta[idx] ?? bulletMeta[0];

  return (
    <motion.li
      initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }} transition={{ delay: 0.1 + idx * 0.04 }}
      className="flex items-start gap-3 text-mid-gray"
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
    >
      <div className="relative flex-shrink-0 mt-0.5">
        <motion.div animate={{ scale: hovered ? 1.2 : 1 }} transition={{ duration: 0.2 }}
          className={`w-6 h-6 rounded-full border flex items-center justify-center cursor-default ${meta.color}`}>
          {meta.icon}
        </motion.div>
        {/* Tooltip — only render on non-touch */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 4, scale: 0.92 }} animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.92 }} transition={{ duration: 0.15 }}
              className="hidden sm:block absolute left-8 top-0 z-20 px-2.5 py-1 bg-ink text-white text-[10px] font-medium rounded-md whitespace-nowrap shadow-lg pointer-events-none"
            >
              {meta.tip}
              <div className="absolute left-[-4px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-r-[4px] border-r-ink" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <span className={`text-sm leading-relaxed transition-colors duration-200 ${hovered ? "text-ink" : ""}`}>
        {bullet}
      </span>
    </motion.li>
  );
};

// ─── Experience ───────────────────────────────────────────────────────────────
const Experience = () => {
  const exp = {
    role: "Cloud / DevOps Engineer",
    company: "Benepik Technology Pvt. Ltd.",
    location: "Gurugram",
    period: "June 2023 – Present",
    bullets: [
      "Deployed and managed Angular frontend with PHP, Java, and Python backend applications on AWS, supporting production workloads serving thousands of users.",
      "Containerized applications using Docker and deployed scalable microservices on AWS ECS — reducing environment inconsistencies and cutting deployment time significantly.",
      "Designed and configured Spot EC2 instances integrated with Auto Scaling Groups, implementing cost-effective scaling strategies that maintained high availability while reducing compute costs.",
      "Built and maintained CI/CD pipelines using Jenkins, GitLab CI, Maven, and Groovy — automating the full build-test-deploy lifecycle and reducing manual release effort.",
      "Managed a broad AWS stack: EC2, RDS, S3, IAM, ELB, Route 53, CloudWatch, WAF, ECS, ECR, ElastiCache (Redis), Lambda, EventBridge, SES, and SNS.",
      "Implemented cloud security best practices: fine-grained IAM policies, KMS encryption, Secrets Manager for credential management, and SSM Session Manager for secure shell access (no bastion host needed).",
      "Drove AWS cost optimization through rightsizing, idle resource identification, and cleanup — resulting in measurable monthly savings recognized with a company-wide Cost Optimization Award.",
      "Implemented backup and disaster recovery strategies using EBS/RDS snapshots and restore planning, ensuring business continuity and meeting RPO/RTO targets.",
    ],
  };

  return (
    <section id="experience" className="py-16 sm:py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-center mb-12 sm:mb-20">
          <motion.h2 initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }} className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4 text-center">
            Professional Experience
          </motion.h2>
          <motion.div initial={{ width: 0 }} whileInView={{ width: 60 }} viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }} className="h-1 bg-accent rounded-full" />
        </div>

        <div className="relative pl-6 sm:pl-8">
          <motion.div initial={{ height: 0 }} whileInView={{ height: "100%" }} viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut" }} className="timeline-line" />

          <motion.div initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative mb-12">
            <div className="timeline-dot top-[38px] sm:top-[42px]" />
            <motion.div whileHover={{ x: 2 }}
              className="p-5 sm:p-8 border border-light-border rounded-xl bg-white shadow-sm hover:shadow-lg transition-all duration-300">

              {/* Role header — stacks on mobile */}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between mb-5 sm:mb-6">
                <div>
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-ink py-1 leading-tight">{exp.role}</h3>
                  <p className="text-sm sm:text-base text-mid-gray font-medium mt-0.5">
                    {exp.company}
                    <span className="text-light-border mx-2 hidden sm:inline">·</span>
                    <span className="block sm:inline text-xs sm:text-sm text-mid-gray/70">{exp.location}</span>
                  </p>
                </div>
                <div className="flex items-center gap-2 sm:flex-col sm:items-end sm:gap-1">
                  <span className="text-xs sm:text-sm font-medium text-mid-gray">{exp.period}</span>
                  <span className="px-2 py-0.5 bg-accent text-white text-[10px] font-bold uppercase tracking-tight rounded">Present</span>
                </div>
              </div>

              <div className="h-[1px] bg-light-border w-full mb-4 sm:mb-5" />

              {/* Legend — wraps naturally, scrolls if needed on very small screens */}
              <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-5 sm:mb-6">
                {bulletMeta.map((m) => (
                  <span key={m.tip} className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-medium border ${m.color}`}>
                    {m.icon}<span>{m.tip}</span>
                  </span>
                ))}
              </div>

              <ul className="space-y-3 sm:space-y-4">
                {exp.bullets.map((bullet, bIdx) => (
                  <ExperienceBullet key={bIdx} bullet={bullet} idx={bIdx} />
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ─── Skills ───────────────────────────────────────────────────────────────────
const Skills = () => {
  const awsSkills = [
    { name: "EC2", icon: <Server size={13} /> },
    { name: "Auto Scaling", icon: <RefreshCw size={13} /> },
    { name: "ECS", icon: <Container size={13} /> },
    { name: "ECR", icon: <Layers size={13} /> },
    { name: "RDS", icon: <Database size={13} /> },
    { name: "S3", icon: <Cloud size={13} /> },
    { name: "IAM", icon: <ShieldCheck size={13} /> },
    { name: "ELB", icon: <Workflow size={13} /> },
    { name: "Lambda", icon: <Cpu size={13} /> },
    { name: "EventBridge", icon: <RefreshCw size={13} /> },
    { name: "SES", icon: <Mail size={13} /> },
    { name: "SNS", icon: <RefreshCw size={13} /> },
    { name: "Route 53", icon: <Workflow size={13} /> },
    { name: "CloudWatch", icon: <BarChart3 size={13} /> },
    { name: "WAF", icon: <ShieldCheck size={13} /> },
    { name: "KMS", icon: <Lock size={13} /> },
    { name: "Secrets Manager", icon: <Lock size={13} /> },
    { name: "ElastiCache", icon: <Database size={13} /> },
  ];
  const devOpsTools = [
    { name: "Docker", icon: <Container size={13} /> },
    { name: "Jenkins", icon: <Settings size={13} /> },
    { name: "Git", icon: <GitBranch size={13} /> },
    { name: "GitLab CI", icon: <GitBranch size={13} /> },
    { name: "Shell Scripting", icon: <Terminal size={13} /> },
    { name: "Apache Groovy", icon: <Terminal size={13} /> },
    { name: "NGINX", icon: <Server size={13} /> },
    { name: "Ubuntu", icon: <Server size={13} /> },
    { name: "Amazon Linux", icon: <Server size={13} /> },
    { name: "Maven", icon: <Settings size={13} /> },
  ];

  return (
    <section id="skills" className="py-16 sm:py-24 bg-warm-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.h2 initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }} className="text-3xl sm:text-4xl font-display font-bold mb-10 sm:mb-16 text-center py-1">
          Technical Arsenal
        </motion.h2>
        <div className="space-y-10 sm:space-y-16">
          {[{ title: "AWS Ecosystem", skills: awsSkills }, { title: "DevOps & Tools", skills: devOpsTools }].map(({ title, skills }) => (
            <div key={title}>
              <h3 className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-mid-gray mb-5 sm:mb-8 text-center">{title}</h3>
              <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
                {skills.map((skill, idx) => (
                  <motion.div key={skill.name}
                    initial={{ scale: 0.85, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }} transition={{ delay: idx * 0.03 }}
                    className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white border border-light-border rounded-lg text-xs sm:text-sm font-medium text-ink transition-all duration-300 hover:border-accent hover:text-accent cursor-default shadow-sm">
                    <span className="text-accent/60">{skill.icon}</span>{skill.name}
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Awards ───────────────────────────────────────────────────────────────────
const Awards = () => {
  const awards = [
    { title: "Best Debut Award", year: "2023", desc: "Top newcomer recognition in the first year" },
    { title: "Reliable Award", year: "2024", desc: "Consistent delivery and dependability" },
    { title: "Cost Optimization", year: "2024", desc: "Significant AWS infrastructure savings" },
    { title: "Finisher Award", year: "2025", desc: "Outstanding project completion & follow-through" },
  ];

  return (
    <section id="awards" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.h2 initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }} className="text-3xl sm:text-4xl font-display font-bold mb-3 sm:mb-4 text-center">
          Recognition
        </motion.h2>
        <motion.p initial={{ y: 10, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }} transition={{ delay: 0.15 }}
          className="text-sm sm:text-base text-mid-gray text-center mb-10 sm:mb-16 max-w-xs sm:max-w-lg mx-auto">
          Company awards across 3 consecutive years — from debut to delivery.
        </motion.p>
        {/* 2-col on mobile, 4-col on lg */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {awards.map((award, idx) => (
            <motion.div key={award.title}
              initial={{ y: 40, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }} transition={{ delay: idx * 0.1 }} whileHover={{ y: -4 }}
              className="p-5 sm:p-8 border border-light-border rounded-xl bg-white text-center shadow-sm transition-all duration-300 hover:shadow-lg hover:border-accent/30">
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🏆</div>
              <h3 className="text-sm sm:text-lg font-display font-bold text-ink mb-1 sm:mb-2 py-1 leading-tight">{award.title}</h3>
              <p className="text-accent font-bold text-xs sm:text-sm tracking-widest mb-2 sm:mb-3">{award.year}</p>
              <p className="text-[10px] sm:text-xs text-mid-gray leading-relaxed">{award.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Education ────────────────────────────────────────────────────────────────
const Education = () => {
  const education = [
    { degree: "B.Sc. Computer Science", year: "2021", institution: "Shri Girraj Maharaj College, Mathura" },
    { degree: "Class XII – CBSE", year: "2018", institution: "M.G.M. Sr. Sec. School, Firozabad" },
    { degree: "Class X – CBSE", year: "2016", institution: "M.G.M. Sr. Sec. School, Firozabad" },
  ];

  return (
    <section id="education" className="py-16 sm:py-24 bg-off-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <motion.h2 initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }} className="text-3xl sm:text-4xl font-display font-bold mb-10 sm:mb-16 text-center">
          Education
        </motion.h2>
        <div className="space-y-8 sm:space-y-12">
          {education.map((edu, idx) => (
            <motion.div key={idx} initial={{ x: -20, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }} className="group">
              <div className="flex justify-between items-start sm:items-end mb-1.5 sm:mb-2 gap-2">
                <h3 className="text-lg sm:text-xl font-display font-bold text-ink py-1 leading-tight">{edu.degree}</h3>
                <span className="text-accent font-bold text-sm flex-shrink-0">{edu.year}</span>
              </div>
              <p className="text-sm sm:text-base text-mid-gray mb-3 sm:mb-4">{edu.institution}</p>
              <motion.div initial={{ width: 0 }} whileInView={{ width: "100%" }} viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="h-[1px] bg-light-border group-hover:bg-accent transition-colors duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Training ─────────────────────────────────────────────────────────────────
const Training = () => {
  const trainings = [
    {
      title: "Cloud & DevOps Engineering",
      provider: "Professional Training Program",
      duration: "5 months",
      desc: "Intensive hands-on training covering AWS architecture, Docker containerization, CI/CD pipeline design, Linux administration, and DevOps best practices in production scenarios.",
      icon: <Cloud size={20} className="text-accent" />,
    },
    {
      title: "Amazon EC2 Fundamentals",
      provider: "AWS Skill Builder",
      duration: "Self-paced",
      desc: "Core compute concepts including instance types, purchasing models (On-Demand, Reserved, Spot), Auto Scaling architecture, load balancing, and cost optimization strategies.",
      icon: <Server size={20} className="text-accent" />,
    },
  ];

  return (
    <section id="training" className="py-16 sm:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.h2 initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }} className="text-3xl sm:text-4xl font-display font-bold mb-10 sm:mb-16 text-center py-2">
          Specialized Training
        </motion.h2>
        <div className="grid sm:grid-cols-2 gap-5 sm:gap-8">
          {trainings.map((item, idx) => (
            <motion.div key={idx} initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }} transition={{ delay: idx * 0.15 }}
              className="p-5 sm:p-8 border border-light-border border-t-4 border-t-accent rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-300">
              <div className="mb-3 sm:mb-4">{item.icon}</div>
              <h3 className="text-lg sm:text-xl font-display font-bold text-ink mb-1 py-1 leading-tight">{item.title}</h3>
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 flex-wrap">
                <span className="text-[10px] sm:text-xs font-medium text-accent uppercase tracking-wider">{item.provider}</span>
                <span className="text-light-border hidden sm:inline">·</span>
                <span className="text-[10px] sm:text-xs text-mid-gray">{item.duration}</span>
              </div>
              <p className="text-mid-gray text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Contact Form ─────────────────────────────────────────────────────────────
const ContactForm = () => {
  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState<"success" | "error" | "loading" | "">("");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", contact: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.contact.length !== 10) {
      setStatusType("error");
      setStatus("Contact number must be exactly 10 digits.");
      return;
    }
    setIsLoading(true);
    setStatusType("loading");
    setStatus("Sending your message…");
    emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
      name: formData.name, email: formData.email,
      contact: formData.contact, message: formData.message,
    }, "YOUR_PUBLIC_KEY")
      .then(() => {
        setStatusType("success");
        setStatus("Message sent! I'll be in touch soon.");
        setFormData({ name: "", email: "", contact: "", message: "" });
        setIsLoading(false);
        setTimeout(() => { setStatus(""); setStatusType(""); }, 6000);
      })
      .catch(() => {
        setStatusType("error");
        setStatus("Failed to send. Email: asingh74175@gmail.com");
        setIsLoading(false);
      });
  };

  const statusClass = statusType === "success" ? "text-emerald-400" : statusType === "error" ? "text-red-400" : "text-white/60";

  return (
    <motion.div initial={{ y: 40, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }}
      className="max-w-2xl mx-auto mb-12 sm:mb-20 p-5 sm:p-8 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm">
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 text-left">

        {/* Name + Phone — stack on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div className="space-y-2">
            <label className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-white/60 ml-1">Name</label>
            <input required type="text" placeholder="Your Name" value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 sm:px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-accent transition-colors text-white placeholder:text-white/20 text-sm" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-white/60 ml-1">Contact Number</label>
            <input required type="tel" inputMode="numeric" placeholder="10-digit number" maxLength={10} value={formData.contact}
              onChange={(e) => setFormData({ ...formData, contact: e.target.value.replace(/[^0-9]/g, "") })}
              className="w-full px-3 sm:px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-accent transition-colors text-white placeholder:text-white/20 text-sm" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-white/60 ml-1">Email Address</label>
          <input required type="email" placeholder="your@email.com" value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-3 sm:px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-accent transition-colors text-white placeholder:text-white/20 text-sm" />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-white/60 ml-1">How can I help?</label>
          <textarea required rows={4} placeholder="Describe your requirements, project, or opportunity…" value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full px-3 sm:px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-accent transition-colors text-white placeholder:text-white/20 resize-none text-sm" />
        </div>

        <button disabled={isLoading} type="submit"
          className="w-full py-3.5 sm:py-4 bg-accent hover:bg-accent/90 disabled:bg-accent/50 text-white font-bold uppercase tracking-widest rounded-lg transition-all flex items-center justify-center gap-2 group text-sm sm:text-base">
          {isLoading ? <Loader2 className="animate-spin" size={18} /> : (
            <>Send Message <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></>
          )}
        </button>

        {status && (
          <p className={`text-xs sm:text-sm text-center font-medium ${statusClass}`}>
            {statusType === "success" ? "✅ " : statusType === "error" ? "❌ " : ""}{status}
          </p>
        )}
      </form>
    </motion.div>
  );
};

// ─── Footer ───────────────────────────────────────────────────────────────────
const Footer = () => {
  const [text, setText] = useState("");
  const fullText = "Let's Build Something Great.";
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let i = 0;
        const interval = setInterval(() => {
          setText(fullText.slice(0, i + 1));
          i++;
          if (i === fullText.length) clearInterval(interval);
        }, 60);
      }
    }, { threshold: 0.3 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <footer id="contact" className="bg-ink text-white py-16 sm:py-24" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
        {/* Typewriter headline — smaller on mobile */}
        <h2 className="text-3xl sm:text-5xl md:text-7xl font-display font-bold mb-4 sm:mb-6 min-h-[1.2em] py-1 leading-tight">
          {text}<span className="animate-pulse">|</span>
        </h2>
        <p className="text-mid-gray text-sm sm:text-lg md:text-xl mb-8 sm:mb-12 max-w-xs sm:max-w-xl mx-auto">
          Open to new opportunities, full-time roles, and cloud consulting engagements.
        </p>

        <ContactForm />

        {/* Contact links — 2-col grid on mobile */}
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center gap-5 sm:gap-8 md:gap-12 mb-10 sm:mb-16 max-w-sm sm:max-w-none mx-auto">
          {[
            { icon: <Mail size={16} />, text: "asingh74175@gmail.com", href: "mailto:asingh74175@gmail.com" },
            { icon: <Phone size={16} />, text: "+91-6392779856", href: "tel:+916392779856" },
            { icon: <MapPin size={16} />, text: "Gurugram, India", href: "#" },
            { icon: <Linkedin size={16} />, text: "LinkedIn Profile", href: "https://linkedin.com/in/abhijeet-singh-3506aa201" },
          ].map((item, idx) => (
            <motion.a key={idx} href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
              initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }} transition={{ delay: idx * 0.08 }}
              className="flex items-center gap-2 text-mid-gray hover:text-white transition-colors duration-300 justify-center sm:justify-start">
              <span className="text-accent flex-shrink-0">{item.icon}</span>
              <span className="text-xs sm:text-sm font-medium truncate">{item.text}</span>
            </motion.a>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-10 sm:mb-16">
          <a href="https://linkedin.com/in/abhijeet-singh-3506aa201" target="_blank" rel="noopener noreferrer"
            className="relative inline-flex items-center gap-2 px-7 sm:px-10 py-4 sm:py-5 border border-white/20 rounded-sm overflow-hidden group text-sm sm:text-base">
            <span className="absolute inset-0 bg-accent translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-out" />
            <span className="relative z-10 font-medium uppercase tracking-widest flex items-center gap-2">
              Connect on LinkedIn <ExternalLink size={14} />
            </span>
          </a>
        </motion.div>

        <div className="pt-8 sm:pt-12 border-t border-white/10 text-white/40 text-[10px] sm:text-xs tracking-widest uppercase">
          © {new Date().getFullYear()} Abhijeet Singh · Designed with purpose.
        </div>
      </div>
    </footer>
  );
};

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="min-h-screen selection:bg-accent selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Awards />
        <Education />
        <Training />
      </main>
      <Footer />
    </div>
  );
}