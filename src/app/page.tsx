"use client";

import { useState, useEffect } from "react";
import { PromptForm } from "./components/PromptForm";
import { BlueprintView } from "./components/BlueprintView";
import { PromptSuggestions } from "./components/PromptSuggestions";
import { IntroOverlay } from "./components/IntroOverlay";
import type { Blueprint } from "./types/blueprint";

export default function Home() {
  const [blueprint, setBlueprint] = useState<Blueprint | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [idea, setIdea] = useState("");

  const [showIntro, setShowIntro] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);

  const blueprintBg = {
    backgroundColor: "#001a80",
    backgroundImage: `
        linear-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 255, 255, 0.08) 1px, transparent 1px)
    `,
    backgroundSize: "40px 40px",
  };

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  useEffect(() => {
    if (!showIntro) {
      setTimeout(() => setContentVisible(true), 100);
    }
  }, [showIntro]);

  const handleGenerate = async (ideaText: string) => {
    try {
      setLoading(true);
      setError(null);
      setBlueprint(null);

      const res = await fetch("/api/blueprint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea: ideaText }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Failed to generate blueprint.");
        return;
      }

      const data = await res.json();
      setBlueprint(data.blueprint as Blueprint);
    } catch (err) {
      console.error(err);
      setError("Unexpected error while generating blueprint.");
    } finally {
      setLoading(false);
    }
  };

  const handleTemplateSelect = (type: string) => {
    const templates: Record<string, string> = {
      saas: "A B2B SaaS platform for managing remote teams with real-time collaboration...",
      "e-commerce":
        "A modern headless e-commerce store with AI product recommendations...",
      social:
        "A niche social networking app focused on professional networking for...",
      crypto:
        "A decentralized exchange (DEX) platform for swapping tokens on...",
      marketplace:
        "A two-sided marketplace connecting freelancers with local clients...",
      "ai tool":
        "An AI-powered productivity assistant that summarizes emails and...",
      edtech:
        "An online learning management system (LMS) for interactive courses...",
      crm: "A custom CRM for real estate agents to track leads and properties...",
    };

    if (templates[type]) {
      setIdea(templates[type]);
    }
  };

  const templateCategories = [
    "SaaS",
    "E-commerce",
    "Social",
    "Crypto",
    "Marketplace",
    "AI Tool",
    "EdTech",
    "CRM",
  ];

  return (
    <main
      className="min-h-screen relative overflow-x-hidden text-slate-50 font-mono"
      style={blueprintBg}
    >
      {showIntro && <IntroOverlay onComplete={handleIntroComplete} />}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] rounded-full border border-dashed border-blue-300/20 animate-spin-slow"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full border border-blue-300/10"></div>
        <div className="absolute top-[20%] left-[20%] w-[100px] h-[100px] rounded-full border border-dotted border-blue-300/30"></div>
        <div className="absolute top-10 right-10 text-blue-300/40 text-2xl">
          +
        </div>
        <div className="absolute bottom-20 left-20 text-blue-300/40 text-2xl">
          +
        </div>
      </div>

      <div
        className={`relative z-10 px-4 py-8 transition-opacity duration-1000 ${
          !showIntro ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="mx-auto max-w-6xl">
          <div className="flex justify-between items-center border-b border-blue-300/20 pb-4 mb-8">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs uppercase tracking-widest text-blue-200">
                System Online
              </span>
            </div>
            <div className="text-xs uppercase tracking-widest text-blue-300/60">
              v2.1.1 • Patched
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5 space-y-8">
              <header className="space-y-2">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-blue-300">
                  New Configuration
                </p>
                <h1 className="text-3xl font-bold tracking-tight text-white leading-tight">
                  Define Project <br />
                  <span className="text-blue-300">Parameters</span>
                </h1>
                <p className="text-sm text-blue-100/70">
                  Select a preset archetype or manually input technical
                  requirements.
                </p>
              </header>
              <div className="grid grid-cols-2 gap-2">
                {templateCategories.map((item) => (
                  <button
                    key={item}
                    onClick={() => handleTemplateSelect(item.toLowerCase())}
                    className="border border-blue-300/30 bg-blue-900/20 py-2 px-3 text-[10px] md:text-xs uppercase tracking-wider hover:bg-white hover:text-blue-900 transition-colors text-left truncate"
                  >
                    {item}
                  </button>
                ))}
              </div>
              <div className="bg-black/20 backdrop-blur-sm border border-blue-300/20 p-6 rounded-sm">
                <PromptForm
                  onGenerate={handleGenerate}
                  loading={loading}
                  value={idea}
                  onChange={setIdea}
                />
              </div>
              <div className="space-y-2 pt-4 border-t border-blue-300/10">
                <div className="flex justify-between text-[10px] uppercase text-blue-300/50">
                  <span>API Latency</span>
                  <span>24ms</span>
                </div>
                <div className="w-full h-1 bg-blue-900/50 rounded-full overflow-hidden">
                  <div className="h-full w-[65%] bg-blue-400/50"></div>
                </div>
              </div>

              {error && (
                <div className="border-l-2 border-red-500 bg-red-900/20 p-4 text-xs text-red-200 uppercase tracking-wide">
                  Error: {error}
                </div>
              )}
            </div>
            <div className="lg:col-span-7">
              {blueprint ? (
                <div className="bg-black/40 backdrop-blur-md border border-blue-300/30 min-h-[600px] p-1 shadow-2xl">
                  <div className="bg-blue-900/40 p-2 flex justify-between items-center border-b border-blue-300/30">
                    <span className="text-[10px] uppercase tracking-widest">
                      Blueprint_Render_Output
                    </span>
                    <div className="flex gap-1">
                      <div className="w-2 h-2 rounded-full bg-blue-300/20"></div>
                      <div className="w-2 h-2 rounded-full bg-blue-300/20"></div>
                    </div>
                  </div>
                  <div className="p-4">
                    <BlueprintView blueprint={blueprint} />
                  </div>
                </div>
              ) : (
                <div className="h-full min-h-[500px] border-2 border-dashed border-blue-300/10 flex flex-col items-center justify-center text-blue-300/30">
                  <div className="w-20 h-20 border border-blue-300/20 rounded-full flex items-center justify-center mb-4 animate-pulse">
                    <div className="w-16 h-16 border border-blue-300/20 rounded-full"></div>
                  </div>
                  <p className="uppercase tracking-[0.2em] text-xs">
                    Awaiting Input Data...
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
