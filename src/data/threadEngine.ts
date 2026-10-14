import { ThreadColor, THREAD_LORE } from "./threadLore";

export interface CalculationResult {
  primary: ThreadColor;
  secondary: ThreadColor;
  tertiary?: ThreadColor;
  fourth?: ThreadColor;
  scores: Record<ThreadColor, number>;
  totalScore: number;
  hasShadowVein: boolean;
  flavorSummary: string;
}

export interface LoomEvaluation {
  isTieForPrimary: boolean;
  tiedPrimaryColors: ThreadColor[];
  isTieForSecondary: boolean;
  tiedSecondaryColors: ThreadColor[];
  scores: Record<ThreadColor, number>;
  defaultResult: CalculationResult;
}

export interface AdditionalThreadTie {
  candidates: ThreadColor[];
  alreadySelected: ThreadColor[];
  slotsToChoose: number;
}

export function getAdditionalThreadTie(
  primary: ThreadColor,
  secondary: ThreadColor,
  scores: Record<ThreadColor, number>,
): AdditionalThreadTie | null {
  const minimumScore = Math.max(2, Math.ceil(scores[primary] * 0.25));
  const eligible = (Object.keys(scores) as ThreadColor[])
    .filter(
      (color) =>
        color !== primary &&
        color !== secondary &&
        scores[color] >= minimumScore,
    )
    .sort((a, b) => scores[b] - scores[a]);

  if (eligible.length <= 2) return null;

  const cutoffScore = scores[eligible[1]];
  const alreadySelected = eligible.filter(
    (color) => scores[color] > cutoffScore,
  );
  const candidates = eligible.filter((color) => scores[color] === cutoffScore);
  const slotsToChoose = 2 - alreadySelected.length;

  return candidates.length > slotsToChoose
    ? { candidates, alreadySelected, slotsToChoose }
    : null;
}

export function evaluateLoomScores(
  scores: Record<ThreadColor, number>,
  chosenPrimary?: ThreadColor,
  chosenSecondary?: ThreadColor,
): LoomEvaluation {
  const colorKeys = Object.keys(scores) as ThreadColor[];
  const maxScore = Math.max(...colorKeys.map((c) => scores[c] || 0));

  // Find all colors sharing the top score
  const primaryCandidates = colorKeys.filter(
    (c) => scores[c] === maxScore && maxScore > 0,
  );

  let primary: ThreadColor;
  let isTieForPrimary = false;
  let tiedPrimaryColors: ThreadColor[] = [];

  if (chosenPrimary && scores[chosenPrimary] !== undefined) {
    primary = chosenPrimary;
  } else if (primaryCandidates.length > 1) {
    isTieForPrimary = true;
    tiedPrimaryColors = primaryCandidates;
    primary = primaryCandidates[0]; // fallback
  } else {
    primary = primaryCandidates[0] || "grey";
  }

  // Determine secondary candidates
  const remainingColors = colorKeys.filter((c) => c !== primary);
  const maxSecondaryScore = Math.max(
    ...remainingColors.map((c) => scores[c] || 0),
  );
  const secondaryCandidates = remainingColors.filter(
    (c) => scores[c] === maxSecondaryScore && maxSecondaryScore > 0,
  );

  let secondary: ThreadColor;
  let isTieForSecondary = false;
  let tiedSecondaryColors: ThreadColor[] = [];

  if (chosenSecondary && remainingColors.includes(chosenSecondary)) {
    secondary = chosenSecondary;
  } else if (
    !chosenPrimary &&
    primaryCandidates.length > 1 &&
    primaryCandidates.includes(primary)
  ) {
    const otherTied = primaryCandidates.filter((c) => c !== primary);
    secondary = otherTied[0];
  } else if (secondaryCandidates.length > 1) {
    isTieForSecondary = true;
    tiedSecondaryColors = secondaryCandidates;
    secondary = secondaryCandidates[0];
  } else {
    secondary = secondaryCandidates[0] || (primary === "red" ? "grey" : "red");
  }

  const defaultResult = buildCalculationResult(primary, secondary, scores);

  return {
    isTieForPrimary,
    tiedPrimaryColors,
    isTieForSecondary,
    tiedSecondaryColors,
    scores,
    defaultResult,
  };
}

export function buildCalculationResult(
  primary: ThreadColor,
  secondary: ThreadColor,
  scores: Record<ThreadColor, number>,
  selectedAdditional?: ThreadColor[],
): CalculationResult {
  const totalScore = Object.values(scores).reduce((sum, val) => sum + val, 0);
  const hasShadowVein = (scores.black || 0) >= 3 && primary !== "black";

  const minimumAdditionalScore = Math.max(2, Math.ceil(scores[primary] * 0.25));
  const eligibleAdditional = (Object.keys(scores) as ThreadColor[])
    .filter(
      (color) =>
        color !== primary &&
        color !== secondary &&
        scores[color] >= minimumAdditionalScore,
    )
    .sort((a, b) => scores[b] - scores[a]);
  const additional = (selectedAdditional ?? eligibleAdditional)
    .filter((color) => eligibleAdditional.includes(color))
    .slice(0, 2);
  const [tertiary, fourth] = additional;

  let flavorSummary = "";

  if (primary === "brown" && secondary === "red" && tertiary === "white") {
    flavorSummary =
      "A formidable and deeply resonant weave! The stalwart shield of the Brown thread stands as your dominant purpose, forged in the fires of Red strife and perseverance, and sanctified by a noble Tertiary White thread of selfless service and compassion.";
  } else if (primary === "brown" && secondary === "red") {
    flavorSummary =
      "A battle-hardened protector. Your primary drive is to shelter borders, kin, and home (Brown), but your path is steeped in the hard-won resilience and grit of Red conflict.";
  } else if (primary === "blue" && secondary === "purple") {
    flavorSummary =
      "A classic and revered weave: the scholarly depth of the Blue thread married to the grand arcane power of the Purple thread. You stand primed for the high ranks of archmages and cosmological masters.";
  } else if (primary === "white" && secondary === "brown") {
    flavorSummary =
      "A steadfast harmony of noble service and protective sanctuary. You not only heal and support the Colony, but stand as an unyielding bulwark between the innocent and all harm.";
  } else if (primary === "brown" && secondary === "white") {
    flavorSummary =
      "A mighty guardian soul. Your instinct to protect borders, hives, and loved ones is exalted by a deep spirit of selfless devotion and care.";
  } else if (secondary === "red") {
    flavorSummary =
      "As Archweaver Antollust noted, Red is the most common thread to weave into secondary strands—a reflection of mortal endurance, grit, and the hard-won character forged through strife.";
  } else if (secondary === "green") {
    flavorSummary =
      "A gentle yet resilient secondary weave: the nurturing harmony of the Green thread grounds your dominant path in the living cycles of Southsky Isle and the Landshapers.";
  } else if (primary === "pink") {
    flavorSummary =
      "A rare sight in the settled Colony: your spirit pulls toward the vast uncharted horizon. The elders may call you aloof, but the world requires dreamers willing to sail beyond the edge.";
  } else if (primary === "yellow") {
    flavorSummary =
      "The vibrant amber hue of command has manifested on your strand. True leadership is never merely given—it must be earned through trial and trust.";
  } else if (primary === "black") {
    flavorSummary =
      "A chilling hush falls across the Loom. The dominant black hue portends catastrophe, peril, or ruthless ambition. Yet remember Antollust’s lesson: morality is a choice, and the final weave is yours to master.";
  } else {
    flavorSummary = `Your primary strand shines with the essence of ${THREAD_LORE[primary].name}, reinforced and given nuance by the subtle weave of ${THREAD_LORE[secondary].name}${
      tertiary
        ? `, with a quiet whisper of ${THREAD_LORE[tertiary].name} underneath`
        : ""
    }.`;
  }

  return {
    primary,
    secondary,
    tertiary,
    fourth,
    scores,
    totalScore,
    hasShadowVein,
    flavorSummary,
  };
}

export function calculateThreadFate(
  scores: Record<ThreadColor, number>,
  chosenPrimary?: ThreadColor,
  chosenSecondary?: ThreadColor,
): CalculationResult {
  const evalResult = evaluateLoomScores(scores, chosenPrimary, chosenSecondary);
  return evalResult.defaultResult;
}
