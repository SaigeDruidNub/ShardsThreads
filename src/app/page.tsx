"use client";

import React, { useState } from "react";
import { ThreadQuestionnaire } from "@/components/ThreadQuestionnaire";
import { AntollustAlmanac } from "@/components/AntollustAlmanac";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"questionnaire" | "almanac">(
    "questionnaire",
  );

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 selection:bg-amber-500 selection:text-black">
      {/* Mystical woven background grid and atmospheric light */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Header Hero */}
        <header className="mb-10 text-center space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-950/40 px-3.5 py-1 text-xs font-semibold text-amber-300">
            <span>✨</span>
            <span>Colony Loom of Fate • Rite of the Threading Aspirant</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-black tracking-tight text-white">
            The Weave of Destiny
          </h1>
          <p className="mx-auto max-w-2xl text-sm sm:text-base text-slate-400 leading-relaxed">
            &ldquo;Each person&apos;s thread can have a multitude of colors, but
            always one color will be dominant. That color will be a pointer to
            your destiny or general life&apos;s purpose.&rdquo;
          </p>
          <div className="text-xs italic text-blue-400">
            — Archweaver Antollust, Address to Fledglings &amp; Aspirants
          </div>

          {/* Navigation Tabs */}
          <div className="mt-8 flex justify-center">
            <div className="inline-flex rounded-xl border border-slate-800 bg-slate-900/80 p-1 shadow-lg">
              <button
                onClick={() => setActiveTab("questionnaire")}
                className={`rounded-lg px-5 py-2 text-xs font-semibold transition-all ${
                  activeTab === "questionnaire"
                    ? "bg-amber-500 text-slate-950 shadow-md font-bold"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Determine Your Thread (Questionnaire)
              </button>
              <button
                onClick={() => setActiveTab("almanac")}
                className={`rounded-lg px-5 py-2 text-xs font-semibold transition-all ${
                  activeTab === "almanac"
                    ? "bg-amber-500 text-slate-950 shadow-md font-bold"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Antollust&apos;s Thread Almanac (Lorebook)
              </button>
            </div>
          </div>
        </header>

        {/* Dynamic Content Views */}
        <section className="transition-all duration-300">
          {activeTab === "questionnaire" ? (
            <ThreadQuestionnaire />
          ) : (
            <div className="mx-auto max-w-4xl">
              <AntollustAlmanac />
            </div>
          )}
        </section>

        {/* Footer */}
        <footer className="mt-16 border-t border-slate-900 pt-6 text-center text-xs text-slate-500">
          <p>
            Shards &amp; Threads D&amp;D Campaign • Archweaver Antollust&apos;s
            Chromatic Mechanics
          </p>
        </footer>
      </div>
    </main>
  );
}
