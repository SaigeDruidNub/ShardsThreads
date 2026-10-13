"use client";

import React, { useState } from "react";
import { QUESTIONS, ThreadColor, THREAD_LORE } from "../data/threadLore";
import {
  evaluateLoomScores,
  buildCalculationResult,
  CalculationResult,
} from "../data/threadEngine";
import { analyzePlayerClass, KNOWN_CLASSES } from "../data/classAffinity";
import { ThreadVisualization } from "./ThreadVisualization";

const baseScores: Record<ThreadColor, number> = {
  white: 0,
  grey: 0,
  brown: 0,
  red: 0,
  orange: 0,
  yellow: 0,
  green: 0,
  blue: 0,
  purple: 0,
  pink: 0,
  black: 0,
};

type QuestionnairePhase = "class-input" | "questions" | "tiebreaker" | "result";

interface TieState {
  type: "primary" | "secondary";
  candidates: ThreadColor[];
  resolvedPrimary?: ThreadColor;
}

export const ThreadQuestionnaire: React.FC = () => {
  const [phase, setPhase] = useState<QuestionnairePhase>("class-input");
  const [playerClassInput, setPlayerClassInput] = useState<string>("");
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
  const [scores, setScores] = useState<Record<ThreadColor, number>>(baseScores);
  const [tieState, setTieState] = useState<TieState | null>(null);
  const [result, setResult] = useState<CalculationResult | null>(null);

  const detectedClass = analyzePlayerClass(playerClassInput);

  const handleStartQuestionnaire = () => {
    const startingScores = { ...baseScores };
    // Apply initial class bonuses to starting scores
    Object.entries(detectedClass.colorBonuses).forEach(([color, bonus]) => {
      startingScores[color as ThreadColor] =
        (startingScores[color as ThreadColor] || 0) + (bonus || 0);
    });

    setScores(startingScores);
    setCurrentQuestionIdx(0);
    setPhase("questions");
  };

  const handleSelectOption = (optionIndex: number) => {
    const currentQ = QUESTIONS[currentQuestionIdx];
    const selectedOption = currentQ.options[optionIndex];
    const newScores = { ...scores };

    // Add scores from selected option
    Object.entries(selectedOption.scores).forEach(([color, val]) => {
      newScores[color as ThreadColor] =
        (newScores[color as ThreadColor] || 0) + (val || 0);
    });

    setScores(newScores);

    if (currentQuestionIdx + 1 < QUESTIONS.length) {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
    } else {
      // Completed all questions, check for ties
      const loomEval = evaluateLoomScores(newScores);

      if (loomEval.isTieForPrimary && loomEval.tiedPrimaryColors.length > 1) {
        setTieState({
          type: "primary",
          candidates: loomEval.tiedPrimaryColors,
        });
        setPhase("tiebreaker");
      } else if (
        loomEval.isTieForSecondary &&
        loomEval.tiedSecondaryColors.length > 1
      ) {
        setTieState({
          type: "secondary",
          candidates: loomEval.tiedSecondaryColors,
          resolvedPrimary: loomEval.defaultResult.primary,
        });
        setPhase("tiebreaker");
      } else {
        setResult(loomEval.defaultResult);
        setPhase("result");
      }
    }
  };

  const handleResolveTie = (chosenColor: ThreadColor) => {
    if (!tieState) return;

    if (tieState.type === "primary") {
      // Chosen color is primary, determine secondary from remaining candidates or loom
      const remainingCandidates = tieState.candidates.filter(
        (c) => c !== chosenColor,
      );

      let chosenSecondary: ThreadColor;
      if (remainingCandidates.length === 1) {
        chosenSecondary = remainingCandidates[0];
        const finalResult = buildCalculationResult(
          chosenColor,
          chosenSecondary,
          scores,
        );
        setResult(finalResult);
        setPhase("result");
      } else if (remainingCandidates.length > 1) {
        // If 3-way tie, let them choose secondary next
        setTieState({
          type: "secondary",
          candidates: remainingCandidates,
          resolvedPrimary: chosenColor,
        });
      } else {
        const finalResult = evaluateLoomScores(
          scores,
          chosenColor,
        ).defaultResult;
        setResult(finalResult);
        setPhase("result");
      }
    } else {
      // Secondary tie resolved
      const finalResult = buildCalculationResult(
        tieState.resolvedPrimary || "grey",
        chosenColor,
        scores,
      );
      setResult(finalResult);
      setPhase("result");
    }
  };

  const handleReset = () => {
    setPlayerClassInput("");
    setCurrentQuestionIdx(0);
    setScores(baseScores);
    setTieState(null);
    setResult(null);
    setPhase("class-input");
  };

  // Render Phase 1: Class and Calling Input
  if (phase === "class-input") {
    return (
      <div className="mx-auto w-full max-w-4xl space-y-6 animate-fadeIn">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-8 shadow-2xl backdrop-blur-md">
          {/* Header */}
          <div className="mb-6 border-b border-slate-800 pb-5">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
              The Aspirant&apos;s Calling • Initial Attunement
            </span>
            <h2 className="mt-1 font-serif text-3xl font-extrabold text-white">
              What is your Discipline or Class?
            </h2>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed">
              &ldquo;Before the spindle turns, tell me: what vocation or craft
              have you devoted yourself to? Whether you are a knight sworn to
              sacred oaths, a solitary hunter of the high mounds, or a cunning
              scoundrel, your training primes the initial grain of the
              weave.&rdquo;
            </p>
            <div className="mt-1 text-right text-xs italic text-blue-400">
              — Archweaver Antollust
            </div>
          </div>

          {/* Input field */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Character Class, Subclass, or Calling
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={playerClassInput}
                  onChange={(e) => setPlayerClassInput(e.target.value)}
                  placeholder="e.g. Oath of Devotion Paladin, Evocation Wizard, Gloomstalker Ranger..."
                  className="w-full rounded-xl border border-slate-700 bg-slate-950/80 px-4 py-3.5 text-base text-white placeholder-slate-500 shadow-inner focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                />
                {playerClassInput && (
                  <button
                    onClick={() => setPlayerClassInput("")}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Quick D&D 5e Class Chips */}
            <div>
              <span className="block text-xs font-medium text-slate-400 mb-2">
                Quick Selection (or click to seed your discipline):
              </span>
              <div className="flex flex-wrap gap-2">
                {KNOWN_CLASSES.map((cls) => {
                  const isMatch = playerClassInput
                    .toLowerCase()
                    .includes(cls.name.toLowerCase());
                  return (
                    <button
                      key={cls.name}
                      type="button"
                      onClick={() => setPlayerClassInput(cls.name)}
                      className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                        isMatch
                          ? "bg-amber-500 text-slate-950 font-bold shadow-md scale-105"
                          : "bg-slate-950/60 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800"
                      }`}
                    >
                      {cls.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Live Attunement Feedback Box */}
            <div className="rounded-xl border border-slate-800/90 bg-slate-950/70 p-4 space-y-2">
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-blue-400 animate-ping" />
                <span className="text-xs font-semibold text-blue-300 uppercase tracking-wider">
                  Archweaver&apos;s Appraisal:
                </span>
              </div>
              <p className="text-xs italic text-slate-300">
                &ldquo;{detectedClass.antollustComment}&rdquo;
              </p>

              {Object.keys(detectedClass.colorBonuses).length > 0 && (
                <div className="mt-3 pt-2 border-t border-slate-800/80 flex flex-wrap items-center gap-2">
                  <span className="text-[11px] uppercase tracking-wider text-slate-400">
                    Initial Thread Affinities:
                  </span>
                  {Object.entries(detectedClass.colorBonuses).map(
                    ([col, bonus]) => {
                      const colorInfo = THREAD_LORE[col as ThreadColor];
                      return (
                        <span
                          key={col}
                          className="inline-flex items-center gap-1.5 rounded-md bg-slate-900 border border-slate-700/80 px-2.5 py-0.5 text-xs text-slate-200"
                        >
                          <span
                            className="h-2.5 w-2.5 rounded-full"
                            style={{ backgroundColor: colorInfo.hex }}
                          />
                          {colorInfo.name.replace(" Thread", "")}: +{bonus}
                        </span>
                      );
                    },
                  )}
                </div>
              )}
            </div>

            {/* Submit / Proceed */}
            <div className="pt-2">
              <button
                onClick={handleStartQuestionnaire}
                className="w-full rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-3.5 text-sm font-bold text-slate-950 shadow-lg shadow-amber-500/20 transition hover:from-amber-400 hover:to-amber-500 hover:shadow-amber-500/30"
              >
                Spin the Loom of Fate →
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render Phase 2: Crossroads Tie-Breaker
  if (phase === "tiebreaker" && tieState) {
    const isPrimaryTie = tieState.type === "primary";

    return (
      <div className="mx-auto w-full max-w-4xl space-y-6 animate-fadeIn">
        <div className="rounded-2xl border border-amber-500/50 bg-slate-900/90 p-8 shadow-2xl backdrop-blur-md">
          {/* Header */}
          <div className="mb-6 border-b border-slate-800 pb-5 text-center">
            <span className="inline-block rounded-full bg-amber-500/20 px-3 py-1 text-xs font-bold uppercase tracking-widest text-amber-300 ring-1 ring-amber-500/40">
              The Loom at the Crossroads
            </span>
            <h2 className="mt-2 font-serif text-3xl font-extrabold text-white">
              {isPrimaryTie
                ? "Equal Strands in the Loom"
                : "A Tie in the Secondary Weave"}
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-sm text-slate-300 leading-relaxed">
              &ldquo;Halt the shuttle! Remarkable, Aspirant—the loom does not
              pick blindly. Your deeds and spirit have drawn{" "}
              <strong className="text-white">equal resonance</strong> between
              these paths. Destiny offers the thread, but your conscious soul
              must seize the shuttle.&rdquo;
            </p>
            <p className="mt-2 text-xs font-semibold text-amber-400">
              {isPrimaryTie
                ? "Select which calling stands as your Dominant (Primary) Destiny:"
                : "Select which calling weaves in as your Secondary Nuance:"}
            </p>
          </div>

          {/* Cards for tied candidates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tieState.candidates.map((colKey) => {
              const lore = THREAD_LORE[colKey];
              return (
                <button
                  key={colKey}
                  onClick={(e) => {
                    e.currentTarget.blur();
                    handleResolveTie(colKey);
                  }}
                  className="group relative rounded-xl border border-slate-700 bg-slate-950/70 p-5 text-left transition-all hover:scale-[1.02] hover:border-amber-400 hover:bg-slate-800/80 hover:shadow-xl active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className="h-6 w-6 rounded-full ring-2 ring-white/30 shadow-md group-hover:scale-110 transition-transform"
                      style={{ backgroundColor: lore.hex }}
                    />
                    <div>
                      <h3 className="font-serif text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                        {lore.name}
                      </h3>
                      <span className="text-xs text-slate-400">
                        {lore.archetype}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs font-medium text-amber-300/90 mb-2">
                    {lore.calling}
                  </p>

                  <p className="text-xs text-slate-300 italic leading-relaxed mb-3">
                    &ldquo;{lore.quote}&rdquo;
                  </p>

                  <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400">
                    <span className="font-semibold text-slate-300">
                      Aligned Roles:
                    </span>{" "}
                    {lore.colonyRoles.slice(0, 3).join(", ")}
                  </div>

                  <div className="mt-4 flex items-center justify-end text-xs font-semibold text-amber-400 group-hover:translate-x-1 transition-transform">
                    Claim this Thread →
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-6 text-center text-xs text-slate-500 italic">
            &ldquo;When mortals choose with intention, the cloth never
            frays.&rdquo; — Archweaver Antollust
          </div>
        </div>
      </div>
    );
  }

  // Render Phase 3: Final Destiny Reading
  if (phase === "result" && result) {
    return (
      <div className="mx-auto w-full max-w-4xl space-y-6 animate-fadeIn">
        {/* Dynamic visual Loom animation */}
        <ThreadVisualization
          primary={result.primary}
          secondary={result.secondary}
          tertiary={result.tertiary}
          hasShadowVein={result.hasShadowVein}
        />

        {/* Reading Card */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-8 shadow-2xl backdrop-blur-md">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                  Archweaver Antollust’s Reading
                </span>
                {playerClassInput && (
                  <span className="rounded-full bg-slate-800 px-3 py-0.5 text-xs text-slate-300 border border-slate-700">
                    Discipline:{" "}
                    <strong className="text-white">{playerClassInput}</strong>
                  </span>
                )}
              </div>
              <h1 className="font-serif text-3xl font-extrabold text-white mt-1">
                Your Thread:{" "}
                <span style={{ color: THREAD_LORE[result.primary].hex }}>
                  {THREAD_LORE[result.primary].name}
                </span>
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-slate-300 mt-1">
                <span>
                  Secondary Weave:{" "}
                  <span
                    className="font-semibold"
                    style={{ color: THREAD_LORE[result.secondary].hex }}
                  >
                    {THREAD_LORE[result.secondary].name}
                  </span>
                </span>
                {result.tertiary && (
                  <>
                    <span className="text-slate-600">•</span>
                    <span>
                      Tertiary Whisper:{" "}
                      <span
                        className="font-semibold"
                        style={{ color: THREAD_LORE[result.tertiary].hex }}
                      >
                        {THREAD_LORE[result.tertiary].name}
                      </span>
                    </span>
                  </>
                )}
              </div>
            </div>

            <button
              onClick={handleReset}
              className="self-start rounded-xl bg-slate-800 px-5 py-2.5 text-xs font-semibold text-slate-200 transition hover:bg-slate-700 hover:text-white border border-slate-700"
            >
              Spin the Loom Again
            </button>
          </div>

          {/* In-lore synthesis */}
          <div className="mb-6 rounded-xl border border-slate-800 bg-slate-950/60 p-5 text-slate-200 leading-relaxed text-sm">
            <h3 className="font-serif text-base font-semibold text-amber-300 mb-2">
              The Pattern of Your Destiny
            </h3>
            <p>{result.flavorSummary}</p>
          </div>

          {/* Deep dive into callings */}
          <div
            className={`grid grid-cols-1 ${result.tertiary ? "md:grid-cols-3" : "md:grid-cols-2"} gap-4`}
          >
            {/* Primary */}
            <div className="rounded-xl border border-slate-800/80 bg-slate-950/40 p-5 space-y-3">
              <div className="flex items-center gap-2">
                <span
                  className="h-4 w-4 rounded-full ring-2 ring-white/20"
                  style={{ backgroundColor: THREAD_LORE[result.primary].hex }}
                />
                <h4 className="font-serif text-base font-bold text-white">
                  Primary: {THREAD_LORE[result.primary].calling}
                </h4>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {THREAD_LORE[result.primary].antollustNotes}
              </p>
              <div className="pt-2">
                <span className="text-xs font-semibold uppercase text-slate-400 block mb-1">
                  Aligned Colony Roles:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {THREAD_LORE[result.primary].colonyRoles.map((role) => (
                    <span
                      key={role}
                      className="rounded-md bg-slate-800/80 px-2.5 py-1 text-xs text-slate-300"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Secondary Calling */}
            <div className="rounded-xl border border-slate-800/80 bg-slate-950/40 p-5 space-y-3">
              <div className="flex items-center gap-2">
                <span
                  className="h-4 w-4 rounded-full ring-2 ring-white/20"
                  style={{
                    backgroundColor: THREAD_LORE[result.secondary].hex,
                  }}
                />
                <h4 className="font-serif text-base font-bold text-white">
                  Secondary: {THREAD_LORE[result.secondary].calling}
                </h4>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {THREAD_LORE[result.secondary].antollustNotes}
              </p>
              <div className="pt-2">
                <span className="text-xs font-semibold uppercase text-slate-400 block mb-1">
                  Complementary Roles:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {THREAD_LORE[result.secondary].colonyRoles.map((role) => (
                    <span
                      key={role}
                      className="rounded-md bg-slate-800/80 px-2.5 py-1 text-xs text-slate-300"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Tertiary Calling if present */}
            {result.tertiary && (
              <div className="rounded-xl border border-slate-800/80 bg-slate-950/40 p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <span
                    className="h-4 w-4 rounded-full ring-2 ring-white/20"
                    style={{
                      backgroundColor: THREAD_LORE[result.tertiary].hex,
                    }}
                  />
                  <h4 className="font-serif text-base font-bold text-white">
                    Tertiary: {THREAD_LORE[result.tertiary].calling}
                  </h4>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {THREAD_LORE[result.tertiary].antollustNotes}
                </p>
                <div className="pt-2">
                  <span className="text-xs font-semibold uppercase text-slate-400 block mb-1">
                    Underlying Roles:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {THREAD_LORE[result.tertiary].colonyRoles.map((role) => (
                      <span
                        key={role}
                        className="rounded-md bg-slate-800/80 px-2.5 py-1 text-xs text-slate-300"
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Shadow Vein Callout if present */}
          {result.hasShadowVein && (
            <div className="mt-6 rounded-xl border border-red-500/40 bg-red-950/30 p-4 text-xs text-red-200">
              <strong className="block text-red-400 font-semibold mb-1">
                ⚠️ The Whisper of Shadow
              </strong>
              A thread of dark ambition or tragic potential weaves quietly along
              your strand. While not dominant enough to mandate exile by the
              Colony’s elders, your path requires vigilance: great ambition and
              great catastrophe often share the same shears.
            </div>
          )}

          {/* Color Affinity Breakdown Table / Bars */}
          <div className="mt-8 border-t border-slate-800 pt-6">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">
              Full Loom Affinity Distribution
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {(Object.keys(THREAD_LORE) as ThreadColor[]).map((cKey) => {
                const score = result.scores[cKey] || 0;
                const item = THREAD_LORE[cKey];
                const maxScore = Math.max(...Object.values(result.scores), 1);
                const barWidth = Math.round((score / maxScore) * 100);
                return (
                  <div
                    key={cKey}
                    className="flex items-center gap-3 bg-slate-950/40 p-2 rounded-lg"
                  >
                    <span
                      className="h-3 w-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: item.hex }}
                    />
                    <span className="w-20 truncate text-slate-300 font-medium">
                      {item.name.replace(" Thread", "")}
                    </span>
                    <div className="relative h-2 flex-grow rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${barWidth}%`,
                          backgroundColor: item.hex,
                        }}
                      />
                    </div>
                    <span className="w-5 text-right font-mono text-slate-400">
                      {score}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render Phase 4: Active Questions
  const currentQ = QUESTIONS[currentQuestionIdx];
  const progressPercent = Math.round(
    ((currentQuestionIdx + 1) / (QUESTIONS.length + 1)) * 100,
  );

  return (
    <div className="mx-auto w-full max-w-4xl space-y-6">
      <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-8 shadow-2xl backdrop-blur-md">
        {/* Header & Progress */}
        <div className="mb-6 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
            <span className="uppercase tracking-widest text-amber-400">
              Aspirant’s Trial — Stage {currentQuestionIdx + 1} of{" "}
              {QUESTIONS.length}
            </span>
            <span>{progressPercent}% woven</span>
          </div>
          {/* Progress bar */}
          <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 via-blue-500 to-purple-500 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Question title & context */}
        <div className="mb-6">
          <span className="text-xs font-medium text-slate-500 italic block mb-1">
            {currentQ.stage}
          </span>
          <h2 className="font-serif text-2xl font-bold text-white mb-2 leading-snug">
            {currentQ.prompt}
          </h2>
          {currentQ.contextNarrative && (
            <p className="text-xs italic text-slate-400">
              {currentQ.contextNarrative}
            </p>
          )}
        </div>

        {/* Options list */}
        <div key={currentQ.id} className="space-y-3">
          {currentQ.options.map((option, idx) => (
            <button
              key={`${currentQ.id}-${idx}`}
              onClick={(e) => {
                e.currentTarget.blur();
                handleSelectOption(idx);
              }}
              className="group w-full rounded-xl border border-slate-800 bg-slate-950/60 p-4 text-left transition-all hover:border-slate-600 hover:bg-slate-800/60 hover:shadow-lg active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/70 focus-visible:border-amber-500"
            >
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-slate-800 text-xs font-semibold text-slate-300 group-hover:bg-amber-500 group-hover:text-black transition-colors">
                  {String.fromCharCode(65 + idx)}
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-200 group-hover:text-white">
                    {option.label}
                  </p>
                  <p className="mt-1 text-xs text-slate-400 group-hover:text-slate-300">
                    {option.subtext}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Footnote */}
        <div className="mt-8 border-t border-slate-800/80 pt-4 text-center">
          <p className="text-xs italic text-slate-500">
            &ldquo;Answer true to your instincts, Aspirant. The loom listens not
            to pretense, but to the pulse of your soul.&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
};
