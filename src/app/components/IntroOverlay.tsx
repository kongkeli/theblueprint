"use client";

import { useState } from "react";

export const IntroOverlay = ({ onComplete }: { onComplete: () => void }) => {
  const [fading, setFading] = useState(false);

  const handleStart = () => {
    setFading(true);
    setTimeout(() => {
      onComplete();
    }, 800);
  };

  const blueprintPatternStyle = {
    backgroundColor: "#001a80",
    backgroundImage: `
        linear-gradient(rgba(255, 255, 255, 0.12) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 255, 255, 0.12) 1px, transparent 1px)
    `,
    backgroundSize: "40px 40px",
  };

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center overflow-hidden transition-opacity duration-1000 ease-in-out ${
        fading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={blueprintPatternStyle}
    >
      <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-blue-100/80 pointer-events-none"></div>

      <div className="absolute left-1/2 top-1/2 h-[580px] w-[580px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-200/10 pointer-events-none"></div>
      <div className="absolute left-1/2 top-1/2 h-full w-[1px] bg-blue-200/20 pointer-events-none"></div>
      <div className="absolute left-1/2 top-1/2 h-[1px] w-full bg-blue-200/20 pointer-events-none"></div>
      <div className="absolute top-10 left-8 md:top-16 md:left-16 pointer-events-none select-none">
        <h1 className="mb-0 text-7xl md:text-8xl font-extrabold tracking-tight text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.8)] leading-none">
          blueprint
        </h1>
        <div className="flex flex-col text-3xl md:text-4xl font-semibold tracking-tight text-blue-100 mt-2 leading-tight">
          <span>Kongkeli's</span>
          <span>New</span>
          <span>Project</span>
        </div>
        <div className="mt-6 border-l-2 border-white/50 pl-4 text-xl md:text-2xl text-blue-200/90 font-light">
          <p>Architect</p>
          <p>Your Vision</p>
          <p>Profitable</p>
          <p>Before Release.</p>
        </div>
      </div>
      <div className="relative z-10 flex flex-col items-center gap-4 mt-32 md:mt-0">
        <button
          onClick={handleStart}
          className="group relative px-10 py-4 overflow-hidden bg-transparent border border-white/80 transition-all hover:bg-white hover:border-transparent focus:outline-none focus:ring-2 focus:ring-white/50 cursor-pointer"
        >
          <span className="relative z-10 text-sm font-bold uppercase tracking-[0.3em] text-white transition-colors group-hover:text-[#001a80]">
            Enter System
          </span>
          <div className="absolute inset-0 -z-10 bg-white opacity-0 transition-opacity group-hover:opacity-100"></div>
        </button>
        <span className="text-[10px] uppercase tracking-[0.2em] text-blue-300/60 animate-pulse">
          Press to initialize
        </span>
      </div>

      <div className="absolute bottom-10 right-10 text-right pointer-events-none">
        <p className="text-[10px] uppercase tracking-widest text-white/40">
          Scale: 1:1
        </p>
        <p className="text-[10px] uppercase tracking-widest text-white/40">
          Ref: 2025-V1
        </p>
      </div>
    </div>
  );
};
