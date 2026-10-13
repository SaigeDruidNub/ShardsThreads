"use client";

import React from "react";
import { ThreadColor, THREAD_LORE } from "../data/threadLore";

interface ThreadVisualizationProps {
  primary: ThreadColor;
  secondary: ThreadColor;
  tertiary?: ThreadColor;
  hasShadowVein?: boolean;
}

export const ThreadVisualization: React.FC<ThreadVisualizationProps> = ({
  primary,
  secondary,
  tertiary,
  hasShadowVein,
}) => {
  const pLore = THREAD_LORE[primary];
  const sLore = THREAD_LORE[secondary];
  const tLore = tertiary ? THREAD_LORE[tertiary] : undefined;

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/80 p-6 shadow-2xl backdrop-blur-md">
      {/* Background ambient glow */}
      <div
        className="pointer-events-none absolute -inset-1 opacity-25 blur-3xl transition-all duration-1000"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${pLore.hex}, ${sLore.hex}, ${tLore ? tLore.hex : "transparent"}, transparent 70%)`,
        }}
      />

      <div className="relative z-10 flex flex-col items-center">
        <span className="text-xs font-semibold tracking-widest uppercase text-slate-400">
          The Woven Loom of Fate
        </span>

        {/* Dynamic SVG Loom animation */}
        <div className="relative my-4 h-48 w-full max-w-lg">
          <svg
            className="h-full w-full overflow-visible"
            viewBox="0 0 600 160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient
                id="loomGradPrimary"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop
                  offset="0%"
                  stopColor={pLore.accentHex}
                  stopOpacity="0.3"
                />
                <stop offset="50%" stopColor={pLore.hex} stopOpacity="0.95" />
                <stop
                  offset="100%"
                  stopColor={pLore.accentHex}
                  stopOpacity="0.3"
                />
              </linearGradient>

              <linearGradient
                id="loomGradSecondary"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop
                  offset="0%"
                  stopColor={sLore.accentHex}
                  stopOpacity="0.2"
                />
                <stop offset="50%" stopColor={sLore.hex} stopOpacity="0.85" />
                <stop
                  offset="100%"
                  stopColor={sLore.accentHex}
                  stopOpacity="0.2"
                />
              </linearGradient>

              {tLore && (
                <linearGradient
                  id="loomGradTertiary"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop
                    offset="0%"
                    stopColor={tLore.accentHex}
                    stopOpacity="0.2"
                  />
                  <stop offset="50%" stopColor={tLore.hex} stopOpacity="0.75" />
                  <stop
                    offset="100%"
                    stopColor={tLore.accentHex}
                    stopOpacity="0.2"
                  />
                </linearGradient>
              )}

              <filter
                id="glowEffect"
                x="-20%"
                y="-20%"
                width="140%"
                height="140%"
              >
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Subtle background guiding filaments */}
            <path
              d="M 10 80 Q 150 20, 300 80 T 590 80"
              stroke="#334155"
              strokeWidth="1.5"
              strokeDasharray="4 6"
              opacity="0.4"
            />
            <path
              d="M 10 80 Q 150 140, 300 80 T 590 80"
              stroke="#334155"
              strokeWidth="1.5"
              strokeDasharray="4 6"
              opacity="0.4"
            />

            {/* Tertiary Strand if present - delicate braided underfilament */}
            {tLore && (
              <path
                d="M 10 80 C 80 40, 240 130, 340 70 C 440 20, 520 120, 590 80"
                stroke="url(#loomGradTertiary)"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeDasharray="16 4"
                filter="url(#glowEffect)"
                opacity="0.85"
              />
            )}

            {/* Secondary Strand - woven underneath */}
            <path
              d="M 10 80 C 120 150, 220 20, 320 80 C 420 140, 500 30, 590 80"
              stroke="url(#loomGradSecondary)"
              strokeWidth="5.5"
              strokeLinecap="round"
              filter="url(#glowEffect)"
              className="animate-pulse"
              style={{ animationDuration: "4s" }}
            />

            {/* Primary Strand - thick dominant weave */}
            <path
              d="M 10 80 C 140 10, 200 150, 300 80 C 400 10, 480 140, 590 80"
              stroke="url(#loomGradPrimary)"
              strokeWidth="9"
              strokeLinecap="round"
              filter="url(#glowEffect)"
            />

            {/* Optional shadow vein filament if dark score is detected */}
            {hasShadowVein && (
              <path
                d="M 10 80 Q 250 110, 300 80 T 590 80"
                stroke="#090d16"
                strokeWidth="3"
                strokeDasharray="10 8"
                opacity="0.9"
              />
            )}

            {/* Loom Spindle Nodes */}
            <circle cx="10" cy="80" r="5" fill="#64748B" />
            <circle
              cx="300"
              cy="80"
              r="7"
              fill={pLore.hex}
              filter="url(#glowEffect)"
            />
            <circle cx="590" cy="80" r="5" fill="#64748B" />
          </svg>
        </div>

        {/* Legend / Key */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <span
              className="h-3.5 w-3.5 rounded-full ring-2 ring-white/30"
              style={{ backgroundColor: pLore.hex }}
            />
            <span className="font-medium text-slate-200">
              Primary: <strong className="text-white">{pLore.name}</strong>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span
              className="h-3.5 w-3.5 rounded-full ring-2 ring-white/20"
              style={{ backgroundColor: sLore.hex }}
            />
            <span className="font-medium text-slate-300">
              Secondary:{" "}
              <strong className="text-slate-100">{sLore.name}</strong>
            </span>
          </div>

          {tLore && (
            <div className="flex items-center gap-2">
              <span
                className="h-3 w-3 rounded-full ring-1 ring-white/20"
                style={{ backgroundColor: tLore.hex }}
              />
              <span className="font-medium text-slate-400">
                Tertiary:{" "}
                <strong className="text-slate-300">{tLore.name}</strong>
              </span>
            </div>
          )}

          {hasShadowVein && (
            <div className="flex items-center gap-2 rounded-full border border-red-500/30 bg-red-950/40 px-3 py-0.5 text-xs text-red-300">
              <span className="h-2 w-2 rounded-full bg-slate-900 ring-1 ring-red-400" />
              <span>Ominous Shadow Vein Detected</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
