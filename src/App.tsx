/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { 
  Cloud, 
  Server, 
  Database, 
  ShieldCheck, 
  Terminal, 
  GitBranch, 
  Award, 
  GraduationCap, 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  ChevronDown,
  ExternalLink,
  Cpu,
  Layers,
  Container,
  Workflow,
  Settings,
  Lock,
  BarChart3,
  RefreshCw
} from "lucide-react";
import { useEffect, useState, useRef } from "react";

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.25, 0, 0, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass border-b border-ink/10 py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="text-2xl font-display font-bold tracking-tighter">AS</div>
        <div className="hidden md:flex gap-8">
          {["About", "Experience", "Skills", "Awards", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="relative group text-sm font-medium uppercase tracking-widest overflow-hidden"
            >
              <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">
                {item}
              </span>
              <span className="absolute left-0 top-full inline-block transition-transform duration-300 group-hover:-translate-y-full text-accent">
                {item}
              </span>
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-accent transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>
      </div>
    </motion.nav>
  );
};

const Hero = () => {
  return (
    <section className="relative h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      <div className="noise" />
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <span className="px-4 py-1.5 border border-ink/20 rounded-full text-xs font-medium uppercase tracking-widest text-mid-gray">
          Cloud / DevOps Engineer · 2.9+ Years
        </span>
      </motion.div>

      <motion.h1
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.15 }}
        className="text-6xl md:text-8xl lg:text-9xl font-display font-bold text-center tracking-tighter mb-6 group cursor-default"
      >
        <span className="inline-block transition-all duration-500 group-hover:tracking-normal">
          ABHIJEET SINGH
        </span>
      </motion.h1>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-xl md:text-2xl text-mid-gray font-light text-center max-w-2xl mb-10"
      >
        Designing cloud infrastructure that scales.
      </motion.p>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.45 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <a 
          href="#experience"
          className="px-8 py-4 bg-ink text-white font-medium rounded-sm border border-ink transition-all duration-300 hover:bg-transparent hover:text-ink"
        >
          View My Work
        </a>
        <a 
          href="#contact"
          className="px-8 py-4 bg-transparent text-ink border border-ink font-medium rounded-sm transition-all duration-300 hover:bg-ink hover:text-white"
        >
          Contact Me
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="absolute bottom-12 flex flex-col items-center gap-4"
      >
        <span className="text-xs font-medium text-mid-gray flex items-center gap-2">
          <MapPin size={14} className="text-accent" /> Gurugram, India
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={20} className="text-mid-gray/40" />
        </motion.div>
      </motion.div>
    </section>
  );
};

const About = () => {
  const [count, setCount] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const end = 2.9;
          const duration = 1500;
          const increment = end / (duration / 16);
          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(start);
            }
          }, 16);
        }
      },
      { threshold: 0.5 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="py-24 bg-off-white overflow-hidden" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-10 gap-16 items-center">
        <motion.div
          initial={{ x: -40, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="md:col-span-4 relative"
        >
          <div className="absolute -top-12 -left-8 text-[12rem] font-display font-bold text-ink/5 leading-none select-none">
            2.7+
          </div>
          <div className="relative">
            <h2 className="text-7xl md:text-8xl font-display font-bold text-ink leading-none">
              {count.toFixed(1)}+
            </h2>
            <p className="text-lg font-medium uppercase tracking-widest text-accent mt-2">
              Years of Experience
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ x: 40, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="md:col-span-6"
        >
          <p className="text-xl md:text-2xl text-mid-gray leading-relaxed mb-8">
            Cloud / DevOps Engineer with 2.7+ years of experience in designing, deploying, and managing scalable cloud infrastructure. Expert in AWS services, CI/CD automation, and containerization. Proven track record in optimizing cloud costs and enhancing system reliability through robust DevOps practices.
          </p>
          <div className="flex flex-wrap gap-3">
            {["AWS Expert", "CI/CD Builder", "Cost Optimizer"].map((badge) => (
              <span key={badge} className="px-4 py-2 bg-white border border-light-border rounded-full text-sm font-medium text-ink shadow-sm">
                {badge}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Experience = () => {
  const experiences = [
    {
      role: "Cloud / DevOps Engineer",
      company: "Benepik Technology Pvt. Ltd., Gurugram",
      period: "June 2023 – Present",
      isPresent: true,
      bullets: [
        "Deployed Angular frontend + PHP/Java/Python on AWS.",
        "Containerized apps with Docker, deployed on ECS.",
        "Configured Spot EC2 + Auto Scaling Groups.",
        "Built CI/CD pipelines: Jenkins, GitLab, Maven.",
        "Managed EC2, RDS, S3, IAM, ELB, Route53, CloudWatch.",
        "Security: IAM policies, KMS, Secrets Manager, SSM.",
        "AWS cost optimization: rightsizing + cleanup.",
        "Backup & disaster recovery with snapshots."
      ]
    }
  ];

  return (
    <section id="experience" className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="text-4xl font-display font-bold mb-16 text-center"
        >
          Professional Experience
        </motion.h2>

        <div className="relative pl-8">
          <motion.div 
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="timeline-line" 
          />
          
          {experiences.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative mb-12"
            >
              <div className="timeline-dot" />
              <div className="p-8 border border-light-border rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-2xl font-display font-bold text-ink flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                      {exp.role}
                    </h3>
                    <p className="text-mid-gray font-medium">{exp.company}</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-sm font-medium text-mid-gray">{exp.period}</span>
                    {exp.isPresent && (
                      <span className="mt-1 px-2 py-0.5 bg-accent text-white text-[10px] font-bold uppercase tracking-tighter rounded">
                        Present
                      </span>
                    )}
                  </div>
                </div>
                <div className="h-[1px] bg-light-border w-full mb-6" />
                <ul className="space-y-3">
                  {exp.bullets.map((bullet, bIdx) => (
                    <motion.li
                      key={bIdx}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 + bIdx * 0.05 }}
                      className="flex items-start gap-3 text-mid-gray"
                    >
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent/30 flex-shrink-0" />
                      <span className="text-sm leading-relaxed">{bullet}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Skills = () => {
  const awsSkills = [
    { name: "EC2", icon: <Server size={14} /> },
    { name: "Auto Scaling", icon: <RefreshCw size={14} /> },
    { name: "ECS", icon: <Container size={14} /> },
    { name: "ECR", icon: <Layers size={14} /> },
    { name: "RDS", icon: <Database size={14} /> },
    { name: "S3", icon: <Cloud size={14} /> },
    { name: "IAM", icon: <ShieldCheck size={14} /> },
    { name: "ELB", icon: <Workflow size={14} /> },
    { name: "Lambda", icon: <Cpu size={14} /> },
    { name: "EventBridge", icon: <RefreshCw size={14} /> },
    { name: "SES", icon: <Mail size={14} /> },
    { name: "SNS", icon: <RefreshCw size={14} /> },
    { name: "Route 53", icon: <Workflow size={14} /> },
    { name: "CloudWatch", icon: <BarChart3 size={14} /> },
    { name: "WAF", icon: <ShieldCheck size={14} /> },
    { name: "KMS", icon: <Lock size={14} /> },
    { name: "Secrets Manager", icon: <Lock size={14} /> },
    { name: "ElastiCache", icon: <Database size={14} /> }
  ];

  const devOpsTools = [
    { name: "Docker", icon: <Container size={14} /> },
    { name: "Jenkins", icon: <Settings size={14} /> },
    { name: "Git", icon: <GitBranch size={14} /> },
    { name: "GitLab", icon: <GitBranch size={14} /> },
    { name: "Shell Scripting", icon: <Terminal size={14} /> },
    { name: "Groovy", icon: <Terminal size={14} /> },
    { name: "NGINX", icon: <Server size={14} /> },
    { name: "Ubuntu", icon: <Server size={14} /> },
    { name: "Amazon Linux", icon: <Server size={14} /> },
    { name: "Maven", icon: <Settings size={14} /> }
  ];

  return (
    <section id="skills" className="py-24 bg-warm-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="text-4xl font-display font-bold mb-16 text-center"
        >
          Technical Arsenal
        </motion.h2>

        <div className="space-y-16">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-mid-gray mb-8 text-center">AWS Ecosystem</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {awsSkills.map((skill, idx) => (
                <motion.div
                  key={skill.name}
                  initial={{ scale: 0.85, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.04 }}
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-light-border rounded-lg text-sm font-medium text-ink transition-all duration-300 hover:border-accent hover:text-accent cursor-default shadow-sm"
                >
                  <span className="text-accent/60">{skill.icon}</span>
                  {skill.name}
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-mid-gray mb-8 text-center">DevOps & Tools</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {devOpsTools.map((tool, idx) => (
                <motion.div
                  key={tool.name}
                  initial={{ scale: 0.85, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.04 }}
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-light-border rounded-lg text-sm font-medium text-ink transition-all duration-300 hover:border-accent hover:text-accent cursor-default shadow-sm"
                >
                  <span className="text-accent/60">{tool.icon}</span>
                  {tool.name}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Awards = () => {
  const awards = [
    { title: "Best Debut Award", year: "2023" },
    { title: "Reliable Award", year: "2024" },
    { title: "Cost Optimization Recognition", year: "2024" },
    { title: "Finisher Award", year: "2025" }
  ];

  return (
    <section id="awards" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="text-4xl font-display font-bold mb-16 text-center"
        >
          Recognition
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {awards.map((award, idx) => (
            <motion.div
              key={award.title}
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -4 }}
              className="p-8 border border-light-border rounded-xl bg-white text-center shadow-sm transition-all duration-300 hover:shadow-lg"
            >
              <motion.div
                initial={{ scale: 0.8 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                className="text-4xl mb-4"
              >
                🏆
              </motion.div>
              <h3 className="text-lg font-display font-bold text-ink mb-2">{award.title}</h3>
              <p className="text-accent font-bold text-sm tracking-widest">{award.year}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Education = () => {
  const education = [
    { degree: "B.Sc. Computer Science", year: "2021", institution: "Shri Girraj Maharaj College, Mathura" },
    { degree: "Class XII – CBSE", year: "2018", institution: "M.G.M. Sr. Sec. School, Firozabad" },
    { degree: "Class X – CBSE", year: "2016", institution: "M.G.M. Sr. Sec. School, Firozabad" }
  ];

  return (
    <section id="education" className="py-24 bg-off-white">
      <div className="max-w-2xl mx-auto px-6">
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="text-4xl font-display font-bold mb-16 text-center"
        >
          Education
        </motion.h2>

        <div className="space-y-12">
          {education.map((edu, idx) => (
            <motion.div
              key={idx}
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="flex justify-between items-end mb-2">
                <h3 className="text-xl font-display font-bold text-ink">{edu.degree}</h3>
                <span className="text-accent font-bold text-sm">{edu.year}</span>
              </div>
              <p className="text-mid-gray mb-4">{edu.institution}</p>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="h-[1px] bg-light-border group-hover:bg-accent transition-colors duration-300"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Training = () => {
  return (
    <section id="training" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="text-4xl font-display font-bold mb-16 text-center"
        >
          Specialized Training
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          {[
            { title: "Cloud & DevOps Training", desc: "5 months hands-on AWS training" },
            { title: "Amazon EC2 Fundamentals", desc: "Core compute concepts" }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className="p-8 border border-light-border border-t-4 border-t-ink rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-300"
            >
              <h3 className="text-xl font-display font-bold text-ink mb-2">{item.title}</h3>
              <p className="text-mid-gray">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  const [text, setText] = useState("");
  const fullText = "Let's Build Something Great.";
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let i = 0;
          const interval = setInterval(() => {
            setText(fullText.slice(0, i + 1));
            i++;
            if (i === fullText.length) clearInterval(interval);
          }, 60);
        }
      },
      { threshold: 0.5 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <footer id="contact" className="bg-ink text-white py-24" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-5xl md:text-7xl font-display font-bold mb-6 min-h-[1.2em]">
          {text}
          <span className="animate-pulse">|</span>
        </h2>
        <p className="text-mid-gray text-lg md:text-xl mb-12 max-w-xl mx-auto">
          Open to new opportunities and collaborations.
        </p>

        <div className="flex flex-wrap justify-center gap-8 md:gap-12 mb-16">
          {[
            { icon: <Mail size={18} />, text: "asingh74175@gmail.com", href: "mailto:asingh74175@gmail.com" },
            { icon: <Phone size={18} />, text: "+91-6392779856", href: "tel:+916392779856" },
            { icon: <MapPin size={18} />, text: "Gurugram, India", href: "#" },
            { icon: <Linkedin size={18} />, text: "LinkedIn", href: "https://linkedin.com/in/abhijeet-singh-3506aa201" }
          ].map((item, idx) => (
            <motion.a
              key={idx}
              href={item.href}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className="flex items-center gap-3 text-mid-gray hover:text-white transition-colors duration-300"
            >
              <span className="text-accent">{item.icon}</span>
              <span className="text-sm font-medium">{item.text}</span>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <a
            href="https://linkedin.com/in/abhijeet-singh-3506aa201"
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex items-center gap-2 px-10 py-5 border border-white/20 rounded-sm overflow-hidden group"
          >
            <span className="absolute inset-0 bg-accent translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-out" />
            <span className="relative z-10 font-medium uppercase tracking-widest flex items-center gap-2">
              Connect on LinkedIn <ExternalLink size={16} />
            </span>
          </a>
        </motion.div>

        <div className="pt-12 border-t border-white/10 text-white/40 text-xs tracking-widest uppercase">
          © 2025 Abhijeet Singh · Designed with purpose.
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

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
