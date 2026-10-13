"use client";

import React, { useState } from "react";
import { THREAD_LORE, ThreadColor } from "../data/threadLore";

export const AntollustAlmanac: React.FC = () => {
  const [selectedColor, setSelectedColor] = useState<ThreadColor>("blue");
  const colors = Object.keys(THREAD_LORE) as ThreadColor[];
  const activeLore = THREAD_LORE[selectedColor];

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 text-slate-100 shadow-xl backdrop-blur-md">
      <div className="mb-6 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-950 text-blue-300 ring-1 ring-blue-500/30 font-serif text-lg font-bold">
            A
          </div>
          <div>
            <h2 className="font-serif text-xl font-bold tracking-wide text-white">
              Archweaver Antollust’s Thread Almanac
            </h2>
            <p className="text-xs text-slate-400">
              Lecture Notes on Chromatic Destinies of the Colony
            </p>
          </div>
        </div>
      </div>

      {/* Color selector pill badges */}
      <div className="mb-6 flex flex-wrap gap-2">
        {colors.map((colorKey) => {
          const item = THREAD_LORE[colorKey];
          const isSelected = selectedColor === colorKey;
          return (
            <button
              key={colorKey}
              onClick={() => setSelectedColor(colorKey)}
              className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                isSelected
                  ? "bg-slate-800 text-white shadow-md ring-2 ring-blue-500/80 scale-105"
                  : "bg-slate-950/60 text-slate-400 hover:bg-slate-800/80 hover:text-slate-200"
              }`}
            >
              <span
                className="h-3 w-3 rounded-full border border-black/40"
                style={{ backgroundColor: item.hex }}
              />
              {item.name.replace(" Thread", "")}
            </button>
          );
        })}
      </div>

      {/* Selected Color Details */}
      <div className="rounded-xl border border-slate-800/90 bg-slate-950/70 p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-3">
            <span
              className="h-6 w-6 rounded-full ring-2 ring-white/20 shadow-md"
              style={{ backgroundColor: activeLore.hex }}
            />
            <div>
              <h3 className="font-serif text-lg font-bold text-white">
                {activeLore.name}
              </h3>
              <p className="text-xs font-medium text-amber-400/90">
                {activeLore.calling}
              </p>
            </div>
          </div>
          <span className="self-start sm:self-center rounded-full bg-slate-800/80 px-3 py-1 text-xs text-slate-300">
            {activeLore.archetype}
          </span>
        </div>

        {/* Antollust Direct Quote / Lecture excerpt */}
        <div className="rounded-lg border-l-4 border-blue-500 bg-blue-950/30 p-3 text-sm italic text-slate-300">
          &ldquo;{activeLore.antollustNotes}&rdquo;
          <div className="mt-1 text-right text-xs not-italic text-blue-400">
            — Archweaver Antollust
          </div>
        </div>

        {/* Roles & Frequency */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="rounded-lg bg-slate-900/60 p-3 border border-slate-800/80">
            <span className="block font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Typical Colony Roles
            </span>
            <ul className="space-y-1">
              {activeLore.colonyRoles.map((role) => (
                <li
                  key={role}
                  className="flex items-center gap-2 text-slate-200"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-500" />
                  {role}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg bg-slate-900/60 p-3 border border-slate-800/80 flex flex-col justify-between">
            <div>
              <span className="block font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Weave Tendency
              </span>
              <p className="text-slate-300 leading-relaxed">
                {activeLore.frequencyNote}
              </p>
            </div>
            <div className="mt-3 text-amber-300/80 italic font-serif">
              &ldquo;{activeLore.quote}&rdquo;
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
