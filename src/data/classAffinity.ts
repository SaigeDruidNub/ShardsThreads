import { ThreadColor } from "./threadLore";

export interface ClassAffinity {
  name: string;
  matchedKeywords: string[];
  colorBonuses: Partial<Record<ThreadColor, number>>;
  antollustComment: string;
}

export const KNOWN_CLASSES: ClassAffinity[] = [
  {
    name: "Paladin",
    matchedKeywords: [
      "paladin",
      "crusader",
      "holy warrior",
      "oath of devotion",
      "oath of redemption",
    ],
    colorBonuses: { brown: 2, red: 2, white: 1, yellow: 1 },
    antollustComment:
      "A martial champion sworn to solemn oaths. Steadfast protection, front-line strife, and noble devotion intertwine upon your strand.",
  },
  {
    name: "Paladin (Vengeance / Conquest / Glory)",
    matchedKeywords: [
      "vengeance",
      "conquest",
      "glory",
      "oathbreaker",
      "crown",
      "watchers",
    ],
    colorBonuses: { red: 3, brown: 2, yellow: 1 },
    antollustComment:
      "An unyielding warrior of the vow. You walk headlong into strife and peril to guard your people and enforce your cause.",
  },
  {
    name: "Fighter",
    matchedKeywords: [
      "fighter",
      "soldier",
      "champion",
      "battlemaster",
      "mercenary",
      "warrior",
      "sentinel",
      "guardian",
    ],
    colorBonuses: { red: 3, brown: 2, grey: 1 },
    antollustComment:
      "A veteran of blade, shield, and relentless strife. Your character has been tempered in the fires of conflict and steadfast defense.",
  },
  {
    name: "Barbarian",
    matchedKeywords: [
      "barbarian",
      "berserker",
      "rage",
      "totem",
      "wild warrior",
      "juggernaut",
    ],
    colorBonuses: { red: 3, orange: 1, brown: 2 },
    antollustComment:
      "Raw survival, primal fury, and unrelenting strife against impossible odds.",
  },
  {
    name: "Cleric",
    matchedKeywords: [
      "cleric",
      "priest",
      "healer",
      "medic",
      "templar",
      "domain",
      "life domain",
    ],
    colorBonuses: { white: 3, purple: 2, grey: 1 },
    antollustComment:
      "A chosen voice of higher powers. Miraculous grace and dedicated service weave into your strand.",
  },
  {
    name: "War Cleric",
    matchedKeywords: [
      "war cleric",
      "war domain",
      "tempest domain",
      "forge cleric",
    ],
    colorBonuses: { red: 2, brown: 2, purple: 2 },
    antollustComment:
      "A battle-priest at the convergence of divine wrath, defensive fortitude, and sacred combat.",
  },
  {
    name: "Wizard",
    matchedKeywords: [
      "wizard",
      "mage",
      "scholar",
      "abjurer",
      "evoker",
      "diviner",
      "chronurgy",
      "scroll",
    ],
    colorBonuses: { blue: 2, purple: 2 },
    antollustComment:
      "A mind dedicated to the archives. The Scroll-Binders Consortium would welcome such thirst for learning.",
  },
  {
    name: "Sorcerer",
    matchedKeywords: [
      "sorcerer",
      "wild magic",
      "draconic",
      "metamagic",
      "innate",
    ],
    colorBonuses: { purple: 2, pink: 1, red: 1 },
    antollustComment:
      "Arcane power woven into your very blood. Grand mystical destiny beckons you.",
  },
  {
    name: "Warlock",
    matchedKeywords: [
      "warlock",
      "pact",
      "patron",
      "eldritch",
      "hexblade",
      "fiend",
    ],
    colorBonuses: { purple: 2, black: 1, orange: 1 },
    antollustComment:
      "A bound soul who touched the unknown. Great power walking alongside dark portents.",
  },
  {
    name: "Druid",
    matchedKeywords: [
      "druid",
      "circle",
      "landshaper",
      "wildshape",
      "flora",
      "fauna",
      "shaman",
    ],
    colorBonuses: { green: 2, orange: 1, grey: 1 },
    antollustComment:
      "A shepherd of nature’s ancient cycles. Southsky Isle and the Landshapers echo in your footsteps.",
  },
  {
    name: "Ranger",
    matchedKeywords: [
      "ranger",
      "hunter",
      "scout",
      "pathfinder",
      "beast master",
      "gloomstalker",
    ],
    colorBonuses: { green: 2, orange: 1, pink: 1 },
    antollustComment:
      "A solitary guide of untamed borders, poised between wild canopy and watchful solitude.",
  },
  {
    name: "Rogue",
    matchedKeywords: [
      "rogue",
      "thief",
      "assassin",
      "shadow",
      "trickster",
      "scoundrel",
      "infiltrator",
    ],
    colorBonuses: { orange: 2, pink: 1, grey: 1 },
    antollustComment:
      "Extreme self-reliance and quiet cunning. You tread lightly where few dare to follow.",
  },
  {
    name: "Monk",
    matchedKeywords: [
      "monk",
      "ascetic",
      "ki",
      "open hand",
      "droning",
      "martial artist",
    ],
    colorBonuses: { orange: 2, grey: 1, white: 1 },
    antollustComment:
      "The discipline of the Droning Isle mounds. Solitude and self-mastery in perfect equilibrium.",
  },
  {
    name: "Bard",
    matchedKeywords: [
      "bard",
      "skald",
      "minstrel",
      "performer",
      "troubadour",
      "college",
    ],
    colorBonuses: { pink: 2, yellow: 1, blue: 1 },
    antollustComment:
      "A dreamer and seeker of glory. You weave joy, stories, and wanderlust into the Colony’s fabric.",
  },
  {
    name: "Artificer",
    matchedKeywords: [
      "artificer",
      "inventor",
      "smith",
      "tinkerer",
      "craftsman",
      "alchemist",
    ],
    colorBonuses: { grey: 2, blue: 2 },
    antollustComment:
      "A master of tools and materials. The artisan’s craft married to meticulous scholarly study.",
  },
];

export function analyzePlayerClass(input: string): ClassAffinity {
  const clean = input.trim().toLowerCase();
  if (!clean) {
    return {
      name: "Undecided Adventurer",
      matchedKeywords: [],
      colorBonuses: {},
      antollustComment:
        "An unwritten page. The loom waits to see what calling you will carve.",
    };
  }

  // Check matching known classes
  for (const c of KNOWN_CLASSES) {
    for (const kw of c.matchedKeywords) {
      if (clean.includes(kw)) {
        return c;
      }
    }
  }

  // Contextual fallback based on descriptive words
  const bonuses: Partial<Record<ThreadColor, number>> = {};
  if (
    clean.includes("protect") ||
    clean.includes("shield") ||
    clean.includes("tank") ||
    clean.includes("guardian") ||
    clean.includes("bastion") ||
    clean.includes("sentinel")
  ) {
    bonuses.brown = (bonuses.brown || 0) + 2;
    bonuses.red = (bonuses.red || 0) + 1;
  }
  if (
    clean.includes("fight") ||
    clean.includes("blood") ||
    clean.includes("blade") ||
    clean.includes("war") ||
    clean.includes("strife") ||
    clean.includes("struggle") ||
    clean.includes("combat")
  ) {
    bonuses.red = (bonuses.red || 0) + 2;
  }
  if (
    clean.includes("heal") ||
    clean.includes("support") ||
    clean.includes("help")
  ) {
    bonuses.white = (bonuses.white || 0) + 2;
  }
  if (
    clean.includes("magic") ||
    clean.includes("spell") ||
    clean.includes("caster")
  ) {
    bonuses.purple = (bonuses.purple || 0) + 2;
  }
  if (
    clean.includes("nature") ||
    clean.includes("plant") ||
    clean.includes("beast")
  ) {
    bonuses.green = (bonuses.green || 0) + 2;
  }
  if (
    clean.includes("book") ||
    clean.includes("study") ||
    clean.includes("sage")
  ) {
    bonuses.blue = (bonuses.blue || 0) + 2;
  }
  if (
    clean.includes("lone") ||
    clean.includes("stealth") ||
    clean.includes("hermit")
  ) {
    bonuses.orange = (bonuses.orange || 0) + 2;
  }
  if (
    clean.includes("lead") ||
    clean.includes("lord") ||
    clean.includes("captain")
  ) {
    bonuses.yellow = (bonuses.yellow || 0) + 2;
  }
  if (
    clean.includes("wander") ||
    clean.includes("explore") ||
    clean.includes("travel")
  ) {
    bonuses.pink = (bonuses.pink || 0) + 2;
  }
  if (
    clean.includes("shadow") ||
    clean.includes("dark") ||
    clean.includes("curse") ||
    clean.includes("death")
  ) {
    bonuses.black = (bonuses.black || 0) + 2;
  }

  return {
    name: input.trim(),
    matchedKeywords: [],
    colorBonuses: Object.keys(bonuses).length > 0 ? bonuses : { grey: 1 },
    antollustComment: `A unique and specialized path: "${input.trim()}". The loom hums with bespoke curiosity.`,
  };
}
