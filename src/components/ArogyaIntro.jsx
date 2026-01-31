import React, { useEffect, useState } from "react";
// --- Sub-component: Procedural Neural Graph ---
import { NeuralNetworkBackground } from "./NeuralNetworkBackground";
import { motion } from "framer-motion";

// Note: headingsData array removed in favor of hard-coding

const TextReveal = ({ text, isHero }) => {
  // Split text into words for staggered animation
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      style={{
        overflow: "hidden",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {words.map((word, index) => (
        <motion.span
          variants={child}
          style={{ marginRight: "0.25em" }}
          key={index}
          className={`${isHero ? "text-7xl md:text-9xl font-bold tracking-tighter" : "text-4xl md:text-6xl font-semibold tracking-tight"} text-slate-900`}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

const Subheading = ({ text }) => (
  <motion.p
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
    viewport={{ once: true }}
    className="mt-4 text-lg md:text-xl text-slate-500 font-light tracking-wide uppercase text-center w-full"
  >
    {text}
  </motion.p>
);

// Ensure this component accepts 'children'
// Ensure this component accepts 'children'
const Section = ({ label, sub, isHero = false, children, id }) => {
  return (
    <div
    id={id}
      className={`flex flex-col items-center justify-center p-8 ${isHero ? "bg-slate-50" : "bg-white"}`}
    >
      <div className="max-w-5xl w-full">
        {!isHero && (
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "60px" }}
            transition={{ duration: 0.3, delay: 0 }}
            className="h-1 bg-black mb-8 mx-auto"
          />
        )}

        <TextReveal text={label} isHero={isHero} />

        {sub && <Subheading text={sub} />}

        {/* INCREASED GAP HERE: changed mt-12 to mt-20 */}
        {children && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-20"
          >
            {children}
          </motion.div>
        )}

        {/* Interactive Hover Area */}
        <motion.div
          className="mt-24 w-12 h-12 rounded-full border border-slate-200 mx-auto flex items-center justify-center cursor-pointer"
          whileHover={{ scale: 1.2, borderColor: "#2563eb" }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <div className="w-1 h-1 bg-slate-900 rounded-full" />
        </motion.div>
      </div>
    </div>
  );
};

export function ArogyaIntro() {
  const [showContent, setShowContent] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);

  useEffect(() => {
    const letters = document.querySelectorAll(".letter");
    const curtain = document.getElementById("curtain");
    const logoContainer = document.getElementById("logo");

    // 1. Start Reveal
    const revealTimeout = setTimeout(() => {
      letters.forEach((letter) => letter.classList.add("animate-reveal"));
    }, 100);

    // 2. Trigger Wipe
    const wipeTimeout = setTimeout(() => {
      if (curtain) curtain.classList.add("expand-curtain");
      if (logoContainer) logoContainer.classList.add("trigger-exit");
      letters.forEach((l) => {
        l.style.color = "#000";
      });
    }, 1200);

    // 3. Switch to content
    const contentTimeout = setTimeout(() => {
      setIntroComplete(true);
      setShowContent(true);
      document.body.style.backgroundColor = "#ffffff";
    }, 1900);

    return () => {
      clearTimeout(revealTimeout);
      clearTimeout(wipeTimeout);
      clearTimeout(contentTimeout);
    };
  }, []);

  const renderLetters = () => {
    const text = "Arogya AI";
    return text.split("").map((char, index) => (
      <span
        key={index}
        className="letter inline-block opacity-0 transition-colors duration-1000"
        style={{
          animationDelay: `${index * 0.03}s`,
          filter: "blur(20px)",
          transform: "scale(1.5)",
        }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  return (
    <>
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Syne:wght@700&display=swap");
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap");

        body,
        html {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
          background-color: #000000;
          overflow-x: hidden;
        }

        /* --- Intro Animations --- */
        .expand-curtain {
          animation: curtainReveal 0.8s cubic-bezier(0.83, 0, 0.17, 1) forwards;
        }
        @keyframes curtainReveal {
          to {
            transform: scaleX(1);
          }
        }
        @keyframes revealLetter {
          0% {
            opacity: 0;
            filter: blur(30px);
            transform: scale(1.6);
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 1;
            filter: blur(0px);
            transform: scale(1);
          }
        }
        .animate-reveal {
          animation: revealLetter 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes textExit {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
            filter: blur(10px);
          }
        }
        .trigger-exit {
          animation: textExit 0.6s cubic-bezier(0.5, 0, 0.75, 0) forwards;
        }

        /* --- Neural Graph Styles --- */
        @keyframes rotateGraph {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .neural-spinner-container {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 120vmax;
          height: 120vmax;
          z-index: 0;
          pointer-events: none;
          opacity: 0.05;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
        }

        .neural-svg {
          width: 100%;
          height: 100%;
          animation: rotateGraph 120s linear infinite;
        }
      `}</style>

      {/* Intro Overlay */}
      {!introComplete && (
        <div
          id="intro-overlay"
          className="fixed top-0 left-0 w-full h-full bg-transparent flex justify-center items-center z-9999 overflow-hidden pointer-events-none"
          style={{ perspective: "1000px" }}
        >
          <div
            id="curtain"
            className="white-curtain absolute top-0 left-0 w-full h-full bg-white -z-10"
            style={{
              transform: "scaleX(0)",
              transformOrigin: "center",
              willChange: "transform",
            }}
          ></div>
          <div
            id="logo"
            className="text-white text-6xl font-bold whitespace-nowrap"
            style={{
              fontFamily: "'Syne', sans-serif",
              letterSpacing: "-2px",
              transformStyle: "preserve-3d",
            }}
          >
            {renderLetters()}
          </div>
        </div>
      )}

      {/* Main Content */}
      <main
        id="main-content"
        className={`w-full min-h-screen text-black relative ${
          showContent ? "block opacity-100" : "hidden opacity-0"
        }`}
      >
        {/* 1. Background fixed to the viewport and sent to the back */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <NeuralNetworkBackground />
        </div>

        {/* 2. Content Layer */}
        <div className="relative z-10">
          <nav className="flex justify-between items-center px-16 py-8 text-black">
            <div
              className="text-2xl font-bold"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Arogya AI
            </div>
            <div
              className="flex gap-8 text-sm"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <a
                href="#Context"
                className="text-gray-600 hover:text-black no-underline"
              >
              Context
              </a>
              <a
                href="#Product"
                className="text-gray-600 hover:text-black no-underline"
              >
               Product
              </a>
              <a
                href="#Impact"
                className="text-gray-600 hover:text-black no-underline"
              >
                Impact
              </a>
              <a
                href="#Collaborate"
                className="text-gray-600 hover:text-black no-underline"
              >
                Collaborate
              </a>
            </div>
          </nav>

          <div
            className="hero flex justify-center items-center h-[87vh] text-black"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <h1 className="text-5xl font-light">
              Democratizing Clinical Excellence
            </h1>
          </div>

          <div className="font-sans selection:bg-blue-100 selection:text-blue-900">
            {/* --- Hard Coded Sections --- */}

            {/* SECTION 2: Updated with new content */}
            <Section label="Why This Matters" id="Context">
              {/* Main Container - constrained height to fit screen */}
              <div className="w-full max-w-5xl flex flex-col md:h-auto gap-6 md:gap-8">
                {/* 1. The Core Thesis */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-center md:text-left"
                >
                  <p className="text-2xl md:text-4xl font-light leading-tight text-black">
                    The gap isn't knowledge.
                  </p>
                  <p className="text-2xl md:text-4xl font-bold text-black">
                    It's the uneven distribution of clinical intelligence
                  </p>
                </motion.div>

                {/* 2. The Contrast - Split Layout (Compact) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="border-l-2 border-black pl-4 py-1"
                  >
                    <span className="block text-xs font-bold uppercase tracking-widest mb-1 opacity-50">
                      Current Reality
                    </span>
                    <p className="text-base md:text-lg text-neutral-800 font-light leading-snug">
                      In large hospitals, teams support the doctor.
                      <p>
                        {" "}
                        In rural clinics,
                        <span className="font-medium">
                          {" "}
                          one doctor manages everything
                        </span>
                        .
                      </p>
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="border-l-2 border-neutral-200 pl-4 py-1"
                  >
                    <span className="block text-xs font-bold uppercase tracking-widest mb-1 opacity-50">
                      The Shift
                    </span>
                    <p className="text-base md:text-lg text-neutral-600 font-light leading-snug">
                      One doctor + ArogyaAI
                      <strong className="font-medium text-black">
                        {" "}
                        The reasoning capacity of an entrie specialist setup.
                      </strong>
                      .
                    </p>
                  </motion.div>
                </div>

                {/* 3. The Ecosystem - Very Subtle */}
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="text-xs md:text-sm text-neutral-400 font-mono"
                >
                  // ABDM Interoperable & Structured Data Ready
                </motion.p>

                {/* 4. The Philosophy - Compact High Impact Box */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, type: "spring" }}
                  className="bg-black text-white p-6 rounded-lg shadow-xl"
                >
                  <p className="text-lg md:text-xl font-light">
                    The goal is not to replace doctors.
                  </p>
                  <p className="text-lg md:text-xl font-bold">
                    It is to amplify the ones already on the ground.
                  </p>
                </motion.div>
              </div>
            </Section>

            <Section label="Clinical Intelligence in Action" id="Product">
              <div className="relative w-full max-w-4xl mx-auto aspect-video rounded-3xl items-center flex justify-center  overflow-hidden shadow-2xl border border-slate-200 ">

                {/* Optional: Subtle blue tint overlay (remove if you want original colors)
                 */}
                 <span>Promo video will be uploaded soon.</span>
                <div className="absolute inset-0 bg-blue-900/10 pointer-events-none" />
              </div>
            </Section>

            <Section label="Impact" sub="Welfare for all. Happiness for all." id="Impact">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full max-w-5xl">
                
                {/* Card 1: The Shift (Large) */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="md:col-span-7 bg-neutral-50 p-8 rounded-2xl border border-neutral-100 flex flex-col justify-center"
                >
                  <p className="text-2xl md:text-3xl font-light text-neutral-800 leading-tight mb-4">
                    With Arogya AI, early diagnosis becomes the <span className="font-bold text-black">default</span>, not a privilege.
                  </p>
                  <div className="h-1 w-12 bg-black opacity-10 rounded-full" />
                </motion.div>

                {/* Card 2: Prevention (Dark) */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                  viewport={{ once: true }}
                  className="md:col-span-5 bg-black text-white p-8 rounded-2xl flex items-center"
                >
                  <p className="text-lg font-medium leading-relaxed opacity-90">
                    Preventable conditions are identified earlier.
                    <span className="block mt-2 text-sm text-neutral-400 font-mono">// Reduced Mortality</span>
                  </p>
                </motion.div>

                {/* Card 3: The Detailed Impact (List style) */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  viewport={{ once: true }}
                  className="md:col-span-12 p-8 border-l-4 border-black bg-white"
                >
                  <p className="text-xl text-neutral-600 leading-relaxed font-light">
                    Treatable cases are no longer missed due to time, overload, or lack of specialist access. 
                    <span className="text-black font-medium"> Every doctor is supported </span> 
                    with structured clinical intelligence that strengthens reasoning at the point of care.
                  </p>
                </motion.div>

                {/* Card 4: The Closing Statement (Centered & Bold) */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  viewport={{ once: true }}
                  className="md:col-span-12 text-center mt-8"
                >
                  <p className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
                    We scale specialist-level clinical intelligence.
                  </p>
                  <p className="text-xl md:text-2xl text-black mt-2 font-light italic">
                    Not by replacing doctors, but by standing with them.
                  </p>
                </motion.div>

              </div>
            </Section>

            {/* NEW: Collaborate Section - Minimalist Business Card */}
            <Section label="Collaborate" sub="Real-World Healthcare Impact" id="Collaborate">
              <div className="w-full max-w-3xl mx-auto text-center relative">
                
                {/* Decorative Background Blur */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-100 rounded-full blur-3xl -z-10 opacity-50" />

                <motion.p 
                  initial={{ opacity: 0 }} 
                  whileInView={{ opacity: 1 }} 
                  className="text-lg text-neutral-600 mb-12 leading-relaxed"
                >
                  We are exploring pilots, collaborations, and research partnerships focused on 
                  deploying intelligent support where it is needed most. 
                  <br className="hidden md:block"/> 
                  If you represent a clinic, hospital, or public health program, we’d be happy to hear from you.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 100 }}
                  className="relative group inline-block"
                >
                  <a 
                    href="mailto:arogyaai.team@gmail.com"
                    className="relative z-10 block px-10 py-5 bg-black text-white text-xl md:text-2xl font-light rounded-full overflow-hidden transition-transform duration-300 group-hover:-translate-y-1"
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      arogyaai.team@gmail.com
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                    </span>
                    {/* Hover Fill Effect */}
                    <div className="absolute inset-0 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  </a>
                  
                  {/* Shadow */}
                  <div className="absolute inset-0 bg-blue-600 blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 rounded-full top-4" />
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mt-12 flex items-center justify-center gap-2 text-xs font-bold tracking-[0.2em] text-neutral-400 uppercase"
                >
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  Based in India
                </motion.div>

              </div>
            </Section>
          </div>
        </div>

        {/* Footer Progress */}
      </main>
    </>
  );
}

export default ArogyaIntro;
