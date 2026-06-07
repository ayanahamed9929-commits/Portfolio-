import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { 
  ArrowUpRight, 
  X, 
  Mail, 
  Send, 
  Sparkles, 
  User, 
  MessageSquare,
  ArrowRight,
  Heart,
  CheckCircle,
  Cpu,
  Radio,
  Zap,
  Layers,
  Globe
} from "lucide-react";

// --- SERVICES DATA ---
const SERVICES_DATA = [
  {
    num: "01",
    name: "Frontend Development",
    desc: "Building responsive, performant web applications using React, Next.js, and modern CSS frameworks with smooth animations."
  },
  {
    num: "02",
    name: "3D Design & Animation",
    desc: "Creating immersive 3D experiences and visual assets using Blender, integrated seamlessly into web interfaces."
  },
  {
    num: "03",
    name: "UI/UX Design",
    desc: "Crafting intuitive user interfaces with attention to detail, accessibility, and conversion-focused layouts."
  },
  {
    num: "04",
    name: "Brand Identity",
    desc: "Developing cohesive brand systems including logos, color palettes, typography, and visual guidelines."
  }
];

// --- GLOBAL STATIC DATA ---
const MARQUEE_IMAGES = [
  "https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif",
  "https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif",
  "https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif",
  "https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif",
  "https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif",
  "https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif",
  "https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif",
  "https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif",
  "https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif",
  "https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif",
  "https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif",
  "https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif",
  "https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif",
  "https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif",
  "https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif",
  "https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif",
  "https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif",
  "https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif",
  "https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif",
  "https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif",
  "https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif"
];

const PROJECTS_DATA = [
  {
    num: "01",
    category: "React & 3D Web",
    name: "Nextlevel Studio",
    images: {
      col1_1: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85",
      col1_2: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85",
      col2: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85"
    }
  },
  {
    num: "02",
    category: "Branding & Motion",
    name: "Aura Brand Identity",
    images: {
      col1_1: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85",
      col1_2: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85",
      col2: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85"
    }
  },
  {
    num: "03",
    category: "NextJS Portfolio",
    name: "Solaris Digital",
    images: {
      col1_1: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85",
      col1_2: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85",
      col2: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85"
    }
  }
];

// --- FONT IMPORT & STYLES ---
if (typeof document !== 'undefined') {
  const fontLink = document.createElement("link");
  fontLink.href = "https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500;700;900&display=swap";
  fontLink.rel = "stylesheet";
  document.head.appendChild(fontLink);

  const styleTag = document.createElement("style");
  styleTag.innerHTML = `
    html, body, #root {
      background-color: #030303;
      font-family: 'Kanit', sans-serif;
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      scroll-behavior: smooth;
      overflow-x: hidden;
      color: #D7E2EA;
    }
    * {
      box-sizing: border-box;
    }
    .hero-heading {
      background: linear-gradient(180deg, #FFFFFF 20%, #A855F7 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .bg-noise {
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
      opacity: 0.015;
    }
    ::-webkit-scrollbar {
      width: 6px;
    }
    ::-webkit-scrollbar-track {
      background: #030303;
    }
    ::-webkit-scrollbar-thumb {
      background: linear-gradient(180deg, #7621B0 0%, #B600A8 100%);
      border-radius: 10px;
    }
    
    @keyframes scan {
      0% { top: 0%; }
      50% { top: 100%; }
      100% { top: 0%; }
    }
    
    .scanner-line {
      animation: scan 4.5s linear infinite;
    }

    @keyframes rotate-slow {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    .animate-rotate-slow {
      animation: rotate-slow 20s linear infinite;
    }
  `;
  document.head.appendChild(styleTag);
}

// --- REUSABLE PREMIUM UI COMPONENTS ---

function ContactButton({ onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: "linear-gradient(135deg, #0F0114 0%, #B600A8 35%, #7621B0 70%, #D946EF 100%)",
        boxShadow: "0px 10px 30px rgba(181, 1, 167, 0.4), inset 0px 4px 14px rgba(255, 255, 255, 0.2)",
        outline: "2px solid rgba(255, 255, 255, 0.9)",
        outlineOffset: "-3px"
      }}
      className={`relative overflow-hidden rounded-full uppercase tracking-widest font-black text-white transition-all duration-300 hover:scale-105 active:scale-95 text-xs sm:text-sm px-8 py-3.5 sm:px-10 sm:py-4 group ${className}`}
    >
      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      <span className="relative z-10 flex items-center gap-2">
        <span>Mek We Tok</span>
        <Sparkles className="w-4 h-4 animate-pulse text-yellow-300" />
      </span>
    </button>
  );
}

function LiveProjectButton({ onClick, className = "", label = "Luk di wok live" }) {
  return (
    <button
      onClick={onClick}
      className={`relative overflow-hidden rounded-full border border-purple-500/30 bg-purple-950/20 text-[#D7E2EA] font-semibold uppercase tracking-widest text-[10px] sm:text-xs px-6 py-3 hover:bg-purple-900/30 hover:border-purple-400 transition-all duration-300 flex items-center gap-2 group ${className}`}
    >
      <span className="absolute inset-0 w-full h-full bg-gradient-to-tr from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <span className="relative z-10 flex items-center gap-1.5">
        <span>{label}</span>
        <ArrowUpRight className="w-4 h-4 text-[#E879F9] group-hover:rotate-45 transition-transform duration-300" />
      </span>
    </button>
  );
}

function FadeIn({ children, delay = 0, duration = 0.8, x = 0, y = 40, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay, duration, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Magnet({ children, padding = 140, strength = 3.5, activeTransition = "transform 0.2s ease-out", inactiveTransition = "transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)" }) {
  const ref = useRef(null);
  const [transform, setTransform] = useState("translate3d(0px, 0px, 0px)");
  const [transition, setTransition] = useState(inactiveTransition);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

      if (distance < padding + Math.max(rect.width, rect.height) / 2) {
        setTransition(activeTransition);
        const tx = distanceX / strength;
        const ty = distanceY / strength;
        setTransform(`translate3d(${tx}px, ${ty}px, 0px)`);
      } else {
        handleMouseLeave();
      }
    };

    const handleMouseLeave = () => {
      setTransition(inactiveTransition);
      setTransform("translate3d(0px, 0px, 0px)");
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [padding, strength, activeTransition, inactiveTransition]);

  return (
    <div ref={ref} style={{ transform, transition, willChange: 'transform' }} className="inline-block">
      {children}
    </div>
  );
}

function AnimatedText({ text }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "end 0.4"]
  });

  const words = text.split(" ");
  
  return (
    <div ref={containerRef} className="flex flex-wrap justify-center text-center gap-x-3 gap-y-2 max-w-[800px] mx-auto px-4">
      {words.map((word, wordIdx) => {
        const start = wordIdx / words.length;
        const end = (wordIdx + 1) / words.length;
        return (
          <AnimatedWord key={wordIdx} progress={scrollYProgress} start={start} end={end} word={word} />
        );
      })}
    </div>
  );
}

function AnimatedWord({ progress, start, end, word }) {
  const opacity = useTransform(progress, [start, end], [0.12, 1]);
  const scale = useTransform(progress, [start, end], [0.95, 1]);
  const textShadow = useTransform(
    progress, 
    [start, end], 
    ["0px 0px 0px rgba(182,0,168,0)", "0px 0px 15px rgba(182,0,168,0.4)"]
  );

  return (
    <motion.span 
      style={{ opacity, scale, textShadow }} 
      className="inline-block text-base sm:text-lg md:text-xl lg:text-2xl font-normal tracking-wide uppercase leading-relaxed text-[#D7E2EA]"
    >
      {word}
    </motion.span>
  );
}

// --- CORE APP SECTIONS ---

function ContactModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", message: "" });
      onClose();
    }, 2200);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/95 backdrop-blur-xl"
          />
          <motion.div 
            initial={{ scale: 0.93, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.93, opacity: 0, y: 40 }}
            transition={{ type: "spring", damping: 32, stiffness: 380 }}
            className="relative w-full max-w-lg overflow-hidden rounded-[40px] border border-white/10 bg-[#070709]/90 p-6 sm:p-8 md:p-10 text-[#D7E2EA] shadow-[0_0_100px_rgba(182,0,168,0.3)]"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#B600A8] via-[#A855F7] to-[#D946EF]" />
            
            <button 
              onClick={onClose}
              className="absolute right-6 top-6 rounded-full bg-white/5 p-2 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
              type="button"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-purple-500/10 text-[#E879F9] shadow-[0_0_20px_rgba(182,0,168,0.3)]">
                  <CheckCircle className="h-10 w-10 animate-pulse" />
                </div>
                <h3 className="text-3xl font-black uppercase tracking-wider text-white">Mesej Don Go!</h3>
                <p className="mt-2 text-sm text-[#D7E2EA]/70">
                  Tenki for talk to mi! Ayan go reply you sharp-sharp.
                </p>
              </div>
            ) : (
              <div>
                <h3 className="mb-1 text-2xl sm:text-3xl font-black uppercase tracking-tight hero-heading">
                  Kam Mek We Tok
                </h3>
                <p className="mb-6 text-xs text-[#E879F9] uppercase tracking-widest font-black">
                  Mek we build something premium together
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="name" className="block text-[10px] uppercase tracking-widest text-white/50 mb-1.5 font-bold">Your Name</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D7E2EA]/30">
                        <User className="w-4 h-4" />
                      </span>
                      <input 
                        required
                        type="text" 
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="E.g., Ayan" 
                        className="w-full rounded-2xl border border-white/10 bg-white/5 py-3.5 pl-12 pr-4 text-sm text-white placeholder-white/20 outline-none transition-all focus:border-purple-500 focus:bg-white/10"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-[10px] uppercase tracking-widest text-white/50 mb-1.5 font-bold">Your Email</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D7E2EA]/30">
                        <Mail className="w-4 h-4" />
                      </span>
                      <input 
                        required
                        type="email" 
                        id="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="E.g., ayan@site.com" 
                        className="w-full rounded-2xl border border-white/10 bg-white/5 py-3.5 pl-12 pr-4 text-sm text-white placeholder-white/20 outline-none transition-all focus:border-purple-500 focus:bg-white/10"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-[10px] uppercase tracking-widest text-white/50 mb-1.5 font-bold">Message Details</label>
                    <div className="relative">
                      <span className="absolute left-4 top-4 text-[#D7E2EA]/30">
                        <MessageSquare className="w-4 h-4" />
                      </span>
                      <textarea 
                        required
                        rows="4"
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Describe your design or web project..." 
                        className="w-full rounded-2xl border border-white/10 bg-white/5 py-3.5 pl-12 pr-4 text-sm text-white placeholder-white/20 outline-none transition-all focus:border-purple-500 focus:bg-white/10 resize-none"
                      />
                    </div>
                  </div>

                  <button 
                    type="submit"
                    style={{
                      background: "linear-gradient(135deg, #000 0%, #B600A8 50%, #7621B0 100%)"
                    }}
                    className="w-full rounded-full py-4 uppercase tracking-widest text-white font-black flex items-center justify-center gap-2 hover:brightness-110 transition-all active:scale-95 text-xs mt-3 shadow-lg"
                  >
                    <span>Send Am Now</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function HeroSection({ onContactClick }) {
  const [spotlightPos, setSpotlightPos] = useState({ x: "50%", y: "50%" });

  const handleMouseMove = (e) => {
    const xPct = (e.clientX / window.innerWidth) * 100;
    const yPct = (e.clientY / window.innerHeight) * 100;
    setSpotlightPos({ x: `${xPct}%`, y: `${yPct}%` });
  };

  return (
    <section 
      id="hero" 
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-[#030305] select-none"
    >
      <div 
        style={{
          background: `radial-gradient(circle 350px at ${spotlightPos.x} ${spotlightPos.y}, rgba(168, 85, 247, 0.08), transparent)`,
          transition: 'background 0.2s ease-out'
        }}
        className="absolute inset-0 pointer-events-none"
      />
      <div className="absolute inset-0 bg-noise pointer-events-none" />

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[1px] bg-gradient-to-r from-transparent via-[#A855F7]/30 to-transparent" />

      <FadeIn delay={0} y={-20} className="w-full z-20">
        <nav className="flex justify-between items-center px-6 md:px-10 pt-6 md:pt-8 max-w-7xl mx-auto">
          <a href="#hero" className="group flex items-center gap-2 text-xl sm:text-2xl font-black uppercase tracking-widest text-[#D7E2EA] hover:opacity-90 transition-opacity">
            <span className="bg-purple-900/30 border border-purple-500/30 px-2 py-0.5 rounded-lg text-xs text-purple-400">AY</span>
            <span>AYAN<span className="text-[#E879F9]">.</span></span>
          </a>
          
          <div className="flex items-center gap-4 sm:gap-8">
            {[
              { label: "Baut Mi", link: "#about" },
              { label: "Wetin Mi De Do", link: "#services" },
              { label: "Mi Project", link: "#projects" }
            ].map((item) => (
              <a 
                key={item.label}
                href={item.link}
                className="text-[10px] sm:text-xs md:text-sm text-[#D7E2EA]/80 font-semibold uppercase tracking-wider hover:text-[#E879F9] transition-all duration-300 relative py-1 group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#E879F9] group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>
        </nav>
      </FadeIn>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <div className="pointer-events-auto mt-12 sm:mt-0">
          <FadeIn delay={0.4} y={30}>
            <Magnet padding={180} strength={3.5}>
              
              {/* BRAND NEW: Dynamic & Premium HUD UI Concept using your custom photo */}
              <div className="relative group w-[240px] sm:w-[310px] md:w-[360px] lg:w-[410px] aspect-[4/5] overflow-hidden rounded-[40px] border border-purple-500/30 shadow-[0_0_80px_rgba(118,33,176,0.35)] transition-all duration-500 hover:shadow-[0_0_120px_rgba(168,85,247,0.6)] hover:border-purple-400/50 bg-[#070709] flex flex-col justify-between p-5">
                
                {/* HUD Corner Tech Overlay Lines */}
                <div className="absolute top-4 left-4 w-5 h-5 border-t-2 border-l-2 border-purple-400/70 pointer-events-none group-hover:scale-110 transition-transform" />
                <div className="absolute top-4 right-4 w-5 h-5 border-t-2 border-r-2 border-purple-400/70 pointer-events-none group-hover:scale-110 transition-transform" />
                <div className="absolute bottom-4 left-4 w-5 h-5 border-b-2 border-l-2 border-purple-400/70 pointer-events-none group-hover:scale-110 transition-transform" />
                <div className="absolute bottom-4 right-4 w-5 h-5 border-b-2 border-r-2 border-purple-400/70 pointer-events-none group-hover:scale-110 transition-transform" />

                {/* Laser Scanning Holographic Line */}
                <div className="absolute left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-fuchsia-400 to-transparent opacity-85 scanner-line z-30 pointer-events-none" />

                {/* Main Visual Display Screen */}
                <div className="relative flex-grow flex items-center justify-center overflow-hidden rounded-[28px] bg-[#09080e] border border-white/5">
                  <div className="absolute inset-0 bg-noise opacity-30 z-20 pointer-events-none" />
                  
                  {/* Rotating Tech Ring behind the picture */}
                  <div className="absolute w-[200px] h-[200px] sm:w-[260px] sm:h-[260px] rounded-full border border-dashed border-[#E879F9]/20 animate-rotate-slow pointer-events-none flex items-center justify-center z-0">
                    <div className="w-[88%] h-[88%] rounded-full border border-double border-purple-500/10" />
                  </div>

                  {/* Glassmorphic Cyber Glow */}
                  <div className="absolute w-44 h-44 rounded-full bg-gradient-to-tr from-[#B600A8]/20 to-[#7621B0]/30 blur-[40px] animate-pulse pointer-events-none" />

                  {/* THE REQUESTED PICTURE: Properly styled and blended inside the cyberpunk interface */}
                  <div className="z-10 relative w-full h-full flex flex-col justify-center items-center">
                    <img 
                      src="https://i.ibb.co/Vpgj1x0h/Picsart-26-06-07-13-24-46-726.png" 
                      alt="Ayan Custom Portrait" 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600";
                      }}
                    />

                    {/* Futuristic Vignette / Inner Tech Mask */}
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-950/40 via-transparent to-black/30 pointer-events-none" />

                    {/* HUD Scan text readout */}
                    <div className="absolute bottom-3 left-4 right-4 flex justify-between items-center text-[8px] font-mono text-[#E879F9] tracking-widest uppercase bg-black/60 backdrop-blur-md py-1.5 px-3 rounded-lg border border-white/5">
                      <div className="flex items-center gap-1.5">
                        <Cpu className="w-3 h-3 animate-spin text-[#E879F9]" />
                        <span>SYS_SECURE</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Radio className="w-3 h-3 animate-pulse text-green-400" />
                        <span>LINK_ESTABLISHED</span>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Lower Status Console */}
                <div className="mt-4 bg-[#09090d]/90 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex items-center justify-between z-10">
                  <div>
                    <h4 className="text-xs sm:text-sm font-black uppercase text-white tracking-widest">AYAN PORTRAIT</h4>
                    <p className="text-[9px] text-[#E879F9] uppercase tracking-widest font-bold">16 Yr Old Frontend Architect</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-green-400 animate-ping" />
                    <span className="text-[8px] uppercase tracking-wider text-white/50 font-bold font-mono">STATUS: OK</span>
                  </div>
                </div>

              </div>
            </Magnet>
          </FadeIn>
        </div>
      </div>

      <div className="flex-grow flex items-center justify-center z-0 px-4 mt-8 sm:mt-0">
        <div className="w-full text-center overflow-hidden">
          <FadeIn delay={0.12} y={50}>
            <h1 className="hero-heading font-black uppercase tracking-tight leading-[0.8] whitespace-nowrap w-full select-none text-[12.5vw] sm:text-[13.5vw] md:text-[14.5vw] lg:text-[15.5vw] mt-6 sm:mt-4">
              Hi, i&apos;m ayan
            </h1>
          </FadeIn>
        </div>
      </div>

      <div className="w-full z-20 px-6 sm:px-10 pb-7 sm:pb-8 md:pb-10 flex flex-col sm:flex-row justify-between items-center sm:items-end gap-6 sm:gap-0 max-w-7xl mx-auto">
        <FadeIn delay={0.25} y={20} className="w-full sm:w-auto">
          <div className="text-center sm:text-left mx-auto sm:mx-0 max-w-[240px] sm:max-w-[280px] md:max-w-[320px]">
            <p 
              style={{ fontSize: "clamp(0.8rem, 1.3vw, 1.3rem)" }} 
              className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug"
            >
              junior frontend dev & 3D artist wey de make computer screen sweet with fine code
            </p>
            <div className="mt-2.5 h-[1.5px] w-12 bg-gradient-to-r from-purple-500 to-transparent hidden sm:block" />
          </div>
        </FadeIn>

        <FadeIn delay={0.35} y={20}>
          <div className="flex flex-col items-center sm:items-end gap-1.5">
            <ContactButton onClick={onContactClick} />
            <span className="text-[9px] uppercase tracking-widest text-white/40 font-bold">100% SECURE CONTACT</span>
          </div>
        </FadeIn>
      </div>

    </section>
  );
}

function MarqueeSection() {
  const sectionRef = useRef(null);
  const [scrollOffset, setScrollOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = rect.top + window.scrollY;
      
      const offset = (window.scrollY - sectionTop + window.innerHeight) * 0.35;
      setScrollOffset(offset);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const row1Images = MARQUEE_IMAGES.slice(0, 11);
  const row2Images = MARQUEE_IMAGES.slice(11);

  const row1Tripled = [...row1Images, ...row1Images, ...row1Images];
  const row2Tripled = [...row2Images, ...row2Images, ...row2Images];

  return (
    <section 
      ref={sectionRef} 
      className="relative bg-[#030305] pt-24 sm:pt-32 pb-10 overflow-hidden select-none"
    >
      <div className="flex flex-col gap-6 sm:gap-8">
        
        <div className="w-full overflow-hidden whitespace-nowrap">
          <div 
            style={{ 
              transform: `translateX(${scrollOffset - 350}px)`,
              willChange: 'transform',
              transition: 'transform 0.1s linear'
            }} 
            className="flex gap-4"
          >
            {row1Tripled.map((img, idx) => (
              <div 
                key={`r1-${idx}`} 
                className="w-[280px] sm:w-[350px] md:w-[400px] h-[180px] sm:h-[220px] md:h-[250px] flex-shrink-0 rounded-[28px] overflow-hidden border border-white/5 shadow-xl bg-[#0F0F12]"
              >
                <img 
                  loading="lazy"
                  src={img} 
                  alt="3D Project" 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=400";
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="w-full overflow-hidden whitespace-nowrap">
          <div 
            style={{ 
              transform: `translateX(${-(scrollOffset - 350)}px)`,
              willChange: 'transform',
              transition: 'transform 0.1s linear'
            }} 
            className="flex gap-4"
          >
            {row2Tripled.map((img, idx) => (
              <div 
                key={`r2-${idx}`} 
                className="w-[280px] sm:w-[350px] md:w-[400px] h-[180px] sm:h-[220px] md:h-[250px] flex-shrink-0 rounded-[28px] overflow-hidden border border-white/5 shadow-xl bg-[#0F0F12]"
              >
                <img 
                  loading="lazy"
                  src={img} 
                  alt="3D Space Scene" 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&q=80&w=400";
                  }}
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

function AboutSection({ onContactClick }) {
  const statement = "Mi na 16 years old junior frontend devloper and 3D designer wey lek for write clean code and build high quality visual style. Mi de put eye na detail, branding, and clean user interfaces. A de design websites for stand out and satisfy clients dèm around di world. Mek we build di next big tin together!";

  const techStack = [
    { name: "React", level: "Expert" },
    { name: "TypeScript", level: "Pro" },
    { name: "Tailwind CSS", level: "Fluent" },
    { name: "Framer Motion", level: "Smooth" },
    { name: "3D Blender", level: "Creative" },
    { name: "Next.js", level: "Clean" },
    { name: "Git / Github", level: "Solid" }
  ];

  return (
    <section id="about" className="relative min-h-screen flex items-center justify-center bg-[#030305] px-5 sm:px-8 md:px-10 py-24 overflow-hidden select-none">
      
      <div className="absolute top-[8%] left-[2%] sm:left-[4%] md:left-[8%] z-10 pointer-events-none opacity-80">
        <FadeIn delay={0.15} x={-50} y={0} duration={1}>
          <img 
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png" 
            alt="3D Moon Orbit"
            className="w-[90px] sm:w-[120px] md:w-[150px] lg:w-[180px] object-contain animate-bounce"
            style={{ animationDuration: "5.5s" }}
          />
        </FadeIn>
      </div>

      <div className="absolute bottom-[12%] left-[4%] sm:left-[6%] md:left-[10%] z-10 pointer-events-none opacity-60">
        <FadeIn delay={0.25} x={-50} y={0} duration={1}>
          <img 
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png" 
            alt="Abstract Sphere"
            className="w-[80px] sm:w-[100px] md:w-[130px] lg:w-[150px] object-contain"
          />
        </FadeIn>
      </div>

      <div className="absolute top-[8%] right-[2%] sm:right-[4%] md:right-[8%] z-10 pointer-events-none opacity-80">
        <FadeIn delay={0.2} x={50} y={0} duration={1}>
          <img 
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png" 
            alt="3D Lego Block"
            className="w-[90px] sm:w-[120px] md:w-[150px] lg:w-[180px] object-contain animate-bounce"
            style={{ animationDuration: "4.5s" }}
          />
        </FadeIn>
      </div>

      <div className="absolute bottom-[12%] right-[4%] sm:right-[6%] md:right-[10%] z-10 pointer-events-none opacity-60">
        <FadeIn delay={0.3} x={50} y={0} duration={1}>
          <img 
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png" 
            alt="Floating 3D Cylinder"
            className="w-[100px] sm:w-[130px] md:w-[150px] lg:w-[180px] object-contain"
          />
        </FadeIn>
      </div>

      <div className="w-full max-w-4xl flex flex-col items-center text-center z-20">
        
        <div className="mb-10 sm:mb-14 md:mb-16">
          <FadeIn delay={0} y={40}>
            <h2 
              style={{ fontSize: "clamp(2.5rem, 9.5vw, 135px)" }}
              className="hero-heading font-black uppercase leading-none tracking-tight"
            >
              Baut mi sef
            </h2>
          </FadeIn>
        </div>

        <div className="mb-12 sm:mb-16 w-full">
          <AnimatedText text={statement} />
        </div>

        <FadeIn delay={0.15} y={30} className="w-full max-w-2xl mb-16 px-4">
          <h4 className="text-[10px] uppercase tracking-widest text-[#E879F9] font-black mb-5">
            Di tools wey mi de use construct premium web layout
          </h4>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {techStack.map((tech) => (
              <div 
                key={tech.name}
                className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-[#0F0F13] border border-white/10 flex items-center gap-2 shadow-sm hover:border-[#E879F9]/50 hover:bg-purple-950/20 transition-all duration-300"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                <span className="text-xs sm:text-sm font-semibold text-white/90">{tech.name}</span>
                <span className="text-[8px] bg-purple-900/40 text-purple-300 font-bold px-1.5 py-0.5 rounded uppercase">{tech.level}</span>
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <ContactButton onClick={onContactClick} />
        </FadeIn>

      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section id="services" className="relative bg-[#FFFFFF] rounded-t-[50px] sm:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-24 select-none text-[#050507] z-20 shadow-[0_-30px_60px_rgba(0,0,0,0.85)]">
      <div className="max-w-5xl mx-auto">
        
        <div className="mb-16 sm:mb-20 md:mb-24 text-center">
          <FadeIn delay={0} y={40}>
            <h2 
              style={{ fontSize: "clamp(2.8rem, 10.5vw, 135px)" }}
              className="font-black uppercase leading-none tracking-tight text-[#050507]"
            >
              Wetin Mi De Do
            </h2>
          </FadeIn>
        </div>

        <div className="flex flex-col border-t border-[#050507]/15">
          {SERVICES_DATA.map((service, index) => (
            <div key={service.num} className="group overflow-hidden">
              <FadeIn delay={index * 0.08} y={30}>
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between py-8 sm:py-10 border-b border-[#050507]/10 transition-all duration-400 hover:bg-[#050507]/5 px-4 sm:px-6 rounded-3xl">
                  
                  <div 
                    style={{ fontSize: "clamp(2.5rem, 7.5vw, 95px)" }}
                    className="font-black leading-none text-[#050507] opacity-20 group-hover:opacity-100 group-hover:text-purple-700 transition-all duration-500 mr-8"
                  >
                    {service.num}
                  </div>

                  <div className="flex-grow mt-3 md:mt-0 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="max-w-2xl">
                      <h3 
                        style={{ fontSize: "clamp(1.1rem, 2.3vw, 1.8rem)" }}
                        className="font-bold uppercase tracking-tight mb-2 transition-transform duration-300 group-hover:translate-x-2"
                      >
                        {service.name}
                      </h3>
                      <p 
                        style={{ fontSize: "clamp(0.85rem, 1.5vw, 1.1rem)" }}
                        className="font-light leading-relaxed text-[#050507]/70 group-hover:text-[#050507] transition-colors"
                      >
                        {service.desc}
                      </p>
                    </div>

                    <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-3 group-hover:translate-x-0 bg-[#050507] text-white rounded-full p-3 hidden md:block">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>

                </div>
              </FadeIn>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

function ProjectCard({ project, index, total, globalProgress, onLiveClick }) {
  const cardRef = useRef(null);
  const targetScale = 1 - (total - 1 - index) * 0.045;
  const scale = useTransform(globalProgress, [index / total, (index + 1) / total], [1, targetScale]);

  return (
    <div 
      ref={cardRef} 
      className="sticky w-full"
      style={{
        top: `${100 + index * 16}px`,
        zIndex: index + 10
      }}
    >
      <motion.div
        style={{ scale }}
        className="rounded-[40px] md:rounded-[50px] border border-white/10 bg-[#07070A]/95 backdrop-blur-md p-5 sm:p-6 md:p-8 w-full shadow-[0_-15px_45px_rgba(0,0,0,0.85)] flex flex-col gap-6 md:gap-8 hover:border-[#E879F9]/30 transition-colors duration-500"
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10 pb-5">
          <div className="flex items-center gap-4 sm:gap-6">
            <span 
              style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
              className="font-black leading-none text-white/15 select-none"
            >
              {project.num}
            </span>
            <div>
              <p className="text-[9px] uppercase tracking-widest text-[#E879F9] font-black">
                {project.category}
              </p>
              <h3 
                style={{ fontSize: "clamp(1.15rem, 3vw, 2.1rem)" }}
                className="font-black uppercase tracking-tight text-[#D7E2EA]"
              >
                {project.name}
              </h3>
            </div>
          </div>
          
          <LiveProjectButton onClick={onLiveClick} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-10 gap-5">
          
          <div className="md:col-span-4 flex flex-col gap-5">
            <div className="overflow-hidden rounded-[26px] border border-white/5 aspect-[4/3] bg-zinc-950">
              <img 
                src={project.images.col1_1} 
                alt="Interface Component" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600";
                }}
              />
            </div>
            <div className="overflow-hidden rounded-[26px] border border-white/5 aspect-[4/3] bg-zinc-950">
              <img 
                src={project.images.col1_2} 
                alt="Detail Model Render" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&q=80&w=600";
                }}
              />
            </div>
          </div>

          <div className="md:col-span-6 overflow-hidden rounded-[26px] border border-white/5 aspect-[4/5] md:aspect-auto md:h-full bg-zinc-950">
            <img 
              src={project.images.col2} 
              alt="Premium Landscape Concept" 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 min-h-[280px] md:min-h-[440px]"
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800";
              }}
            />
          </div>

        </div>

      </motion.div>
    </div>
  );
}

function ProjectsSection({ onProjectOpen }) {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div ref={containerRef} className="relative z-30">
      <section 
        id="projects" 
        className="relative bg-[#030305] rounded-t-[50px] sm:rounded-t-[60px] -mt-12 pt-24 pb-32 px-4 sm:px-6 md:px-10 overflow-hidden"
      >
        <div className="absolute top-[25%] left-1/2 -translate-x-1/2 w-[75vw] h-[75vw] rounded-full bg-purple-900/5 blur-[160px] pointer-events-none" />

        <div className="mb-20 sm:mb-24 text-center">
          <FadeIn delay={0} y={40}>
            <h2 
              style={{ fontSize: "clamp(2.8rem, 10.5vw, 135px)" }}
              className="hero-heading font-black uppercase leading-none tracking-tight"
            >
              Mi Wok dèm
            </h2>
          </FadeIn>
        </div>

        <div className="space-y-[10vh] max-w-6xl mx-auto">
          {PROJECTS_DATA.map((project, idx) => (
            <ProjectCard 
              key={project.num}
              project={project}
              index={idx}
              total={PROJECTS_DATA.length}
              globalProgress={scrollYProgress}
              onLiveClick={() => onProjectOpen(project)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

function ProjectDetailModal({ project, isOpen, onClose }) {
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/95 backdrop-blur-md"
          />
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative w-full max-w-4xl max-h-[85vh] overflow-y-auto rounded-[40px] border border-white/10 bg-[#070709] p-6 sm:p-8 text-[#D7E2EA] z-10"
          >
            <button 
              onClick={onClose}
              className="absolute right-6 top-6 rounded-full bg-white/5 p-2 text-white/60 transition-colors hover:bg-white/10"
              type="button"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-xs uppercase tracking-widest text-[#E879F9] font-black">{project.category}</span>
            <h3 className="text-3xl sm:text-4xl font-black uppercase mb-6 hero-heading">{project.name}</h3>

            <div className="space-y-6">
              <div className="rounded-[30px] overflow-hidden border border-white/5">
                <img src={project.images.col2} alt="Full screen preview" className="w-full h-auto object-cover max-h-[450px]" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <img src={project.images.col1_1} alt="asset col 1" className="rounded-2xl w-full border border-white/5" />
                <img src={project.images.col1_2} alt="asset col 2" className="rounded-2xl w-full border border-white/5" />
              </div>
              <p className="text-sm sm:text-base text-[#D7E2EA]/85 font-light leading-relaxed uppercase tracking-wide">
                Dis project na fine combination of interactive front-end codes mixed with advanced 3D assets to build high density premium experience dèm wey de capture focus wan time.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(null);

  return (
    <div className="bg-[#030305] min-h-screen text-[#D7E2EA] overflow-x-hidden relative">
      
      <div className="absolute top-[12%] left-[-15%] w-[45vw] h-[45vw] rounded-full bg-purple-900/10 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-15%] w-[50vw] h-[50vw] rounded-full bg-[#E879F9]/5 blur-[160px] pointer-events-none" />

      <HeroSection onContactClick={() => setIsContactOpen(true)} />
      
      <MarqueeSection />
      
      <AboutSection onContactClick={() => setIsContactOpen(true)} />
      
      <ServicesSection />
      
      <ProjectsSection onProjectOpen={(project) => setActiveProject(project)} />

      <footer className="bg-[#030305] py-16 px-6 border-t border-white/5 text-center select-none z-40 relative">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6 sm:gap-0">
          <div className="text-xs text-[#D7E2EA]/50 uppercase tracking-widest flex flex-wrap items-center justify-center gap-2">
            <span>© 2026 Ayan. All rights dèm reserve. Built with</span>
            <Heart className="w-3.5 h-3.5 text-[#E879F9] fill-[#E879F9]" />
            <span>naw 16 years old junior dev</span>
          </div>
          <div className="flex gap-6">
            {["Artstation", "Github", "Twitter", "Linkedin"].map((social) => (
              <a 
                key={social} 
                href={`#${social}`} 
                onClick={(e) => {
                  e.preventDefault();
                  setIsContactOpen(true);
                }} 
                className="text-xs text-[#D7E2EA]/60 hover:text-white uppercase tracking-widest transition-colors font-semibold"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </footer>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      <ProjectDetailModal 
        project={activeProject} 
        isOpen={activeProject !== null} 
        onClose={() => setActiveProject(null)} 
      />

    </div>
  );
}

```
