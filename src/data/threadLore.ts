export type ThreadColor =
  | "white"
  | "grey"
  | "brown"
  | "red"
  | "orange"
  | "yellow"
  | "green"
  | "blue"
  | "purple"
  | "pink"
  | "black";

export interface ThreadLore {
  id: ThreadColor;
  name: string;
  hex: string;
  accentHex: string;
  calling: string;
  colonyRoles: string[];
  antollustNotes: string;
  archetype: string;
  quote: string;
  frequencyNote: string;
}

export const THREAD_LORE: Record<ThreadColor, ThreadLore> = {
  white: {
    id: "white",
    name: "White Thread",
    hex: "#F8FAFC",
    accentHex: "#E2E8F0",
    calling: "Service to Others & Noble Devotion",
    colonyRoles: [
      "Dedicated Healers",
      "Medics",
      "Colony Soldiers",
      "Relief Stewards",
    ],
    antollustNotes:
      "A white thread indicates that one’s life will be dedicated to the service of others. Many of our Colony’s soldiers or dedicated healers and medics find themselves with this thread, and an incredibly noble, and honest soul is expected from them.",
    archetype: "The Selfless Servant",
    quote: "To place another above oneself is the highest honor of the loom.",
    frequencyNote:
      "Honored across every isle; held to high standards of honesty.",
  },
  grey: {
    id: "grey",
    name: "Grey Thread",
    hex: "#94A3B8",
    accentHex: "#64748B",
    calling: "Peaceful Life, Honest Craft & Balance",
    colonyRoles: [
      "Artisan Craftsfolk",
      "Agricultural Workers",
      "Masons",
      "Keepers of Daily Life",
    ],
    antollustNotes:
      "A grey thread indicates that one’s life will be a more general or peaceful life. Not that you won’t ever face hardships, but you’ll never need worry about great tragedy or peril. The Colony’s Agricultural Workers and Artisan Craftsfolk often pray dearly for a Grey thread.",
    archetype: "The Steadfast Artisan",
    quote:
      "There is quiet holiness in an honest day’s toil and an untroubled hearth.",
    frequencyNote:
      "Most prayed-for thread among working citizens and artisans.",
  },
  brown: {
    id: "brown",
    name: "Brown Thread",
    hex: "#B45309",
    accentHex: "#78350F",
    calling: "Protection, Steadfast Defense & Sanctuary",
    colonyRoles: [
      "Colony Sentinels",
      "Island Protectors",
      "Bastion Wardens",
      "Kin-Defenders",
    ],
    antollustNotes:
      "Brown threads indicate your life is likely to be spent protecting. Whether that means the Colony, their home Island, or something more personal, is up to the individual.",
    archetype: "The Unyielding Sentinel",
    quote: "I am the wall against the gale; none shall breach what I shelter.",
    frequencyNote:
      "Rooted and grounded; often found guarding thresholds and borders.",
  },
  red: {
    id: "red",
    name: "Red Thread",
    hex: "#EF4444",
    accentHex: "#B91C1C",
    calling: "Conflict, Strife & Relentless Endeavor",
    colonyRoles: [
      "Frontline Warriors",
      "Quarry Breakers",
      "Vanguard Laborers",
      "Struggle-Hardened Survivors",
    ],
    antollustNotes:
      "A Red thread indicates a life of conflict and strife. As awful as it sounds, it doesn’t always mean a life of war, just of struggle. Many of our warriors and workers end up with primarily red threads, and through those endeavors, usually show great character in spite of it. Red is also the most common color to appear as a secondary. Such is the price of mortal life....",
    archetype: "The Tested Crucible",
    quote:
      "Strife does not break the spirit—it hammers iron into tempered steel.",
    frequencyNote: "The most common secondary thread in mortal existence.",
  },
  orange: {
    id: "orange",
    name: "Orange Thread",
    hex: "#F97316",
    accentHex: "#C2410C",
    calling: "Solitude, Self-Reliance & Hermetic Clarity",
    colonyRoles: [
      "Mound Monks of Droning Isle",
      "Traveling Hermits",
      "Solitary Wayfarers",
      "Outpost Keepers",
    ],
    antollustNotes:
      "An orange thread usually means a life of solitude. Not always an omen of loneliness or isolation, but sometimes just extreme self reliance. While some still have taken as a sign to seek a monastic life atop the Mounds on the Droning Isle or wander the world as a traveling hermit.",
    archetype: "The Independent Ascetic",
    quote: "I walk where voices cannot reach, finding wholeness in silence.",
    frequencyNote: "A testament to extreme independence and inner resilience.",
  },
  yellow: {
    id: "yellow",
    name: "Yellow Thread",
    hex: "#FACC15",
    accentHex: "#CA8A04",
    calling: "Leadership, Vision & Inspiring Guidance",
    colonyRoles: [
      "Hive Rulers",
      "Island Chieftains",
      "Squad Commanders",
      "Community Speakers",
    ],
    antollustNotes:
      "Now if your thread ends up yellow, then you have a destiny to lead. Whether that’s within your own Island, hive, community, or perhaps greater callings in the world. Now this doesn’t disqualify other colors from becoming leaders themselves, afterall true leadership must be earned! More often than not, yellow appears on the threads of those not expecting it.",
    archetype: "The Sovereign Weaver",
    quote: "To command is to bear the hopes and weight of all who follow.",
    frequencyNote:
      "Frequently surprises those who receive it; true leadership must be earned.",
  },
  green: {
    id: "green",
    name: "Green Thread",
    hex: "#22C55E",
    accentHex: "#15803D",
    calling: "Nature’s Communion & Cycle Stewardship",
    colonyRoles: [
      "Landshaper Druids",
      "Southsky Isle Field Tenders",
      "Beast Wardens",
      "Flora Alchemists",
    ],
    antollustNotes:
      "Threads in shades of green are often called to a life dedicated to nature. From the reclusive druids of the Landshapers, to the field tenders on Southsky Isle, a green thread is highly valued and respectable. Green actually tends to be drawn as a secondary more than it is a primary.",
    archetype: "The Living Hand",
    quote:
      "The soil, the sprout, and the decaying root each sing the same sacred rhythm.",
    frequencyNote:
      "Highly respected; frequently weaves into threads as a secondary hue.",
  },
  blue: {
    id: "blue",
    name: "Blue Thread",
    hex: "#3B82F6",
    accentHex: "#1D4ED8",
    calling: "Knowledge, Learning & Lifelong Study",
    colonyRoles: [
      "Scroll-Binders Consortium Scholars",
      "Mages & Chronologers",
      "Archaeological Explorers",
      "Archweavers",
    ],
    antollustNotes:
      "Blue threads, like myself, are called to a life of knowledge and learning. Whatever knowledge they end up seeking becomes the basis of a lifelong study or search. From the mages and scholars at the Scroll-Binders Consortium, to archaeological explorers. Any kind of learning and study is often canopied by the blue thread.",
    archetype: "The Inquiring Scholar",
    quote:
      "Every mystery is an unspooled thread waiting for curious hands to trace.",
    frequencyNote:
      "Antollust’s own calling; the mark of intellectual curiosity.",
  },
  purple: {
    id: "purple",
    name: "Purple Thread",
    hex: "#A855F7",
    accentHex: "#7E22CE",
    calling: "Mystical Power, Destiny & Divine Calling",
    colonyRoles: [
      "Archmages",
      "Deity-Chosen Clerics",
      "Prophetic Oracles",
      "Cosmic Champions",
    ],
    antollustNotes:
      "Purple threads, often paired with blue, are inclined to lead lives of great mystical power or destiny. Powerful Archmages, chosen clerics of the many Gods of this world, and even those with some prophetic calling to defeat great evil tend to draw these violet hues.",
    archetype: "The Conduit of the Arcane",
    quote: "The cosmos whispers its decrees directly into blood and spell.",
    frequencyNote: "Often paired with Blue; carries heavy cosmic import.",
  },
  pink: {
    id: "pink",
    name: "Pink Thread",
    hex: "#EC4899",
    accentHex: "#BE185D",
    calling: "Adventure, Exploration & Glory of the Dreamer",
    colonyRoles: [
      "Frontier Pathfinders",
      "Free Explorers",
      "Renegade Dreamers",
      "Seekers of Grand Vistas",
    ],
    antollustNotes:
      "Both of the remaining colors are often not seen within the Colony, for their own reasons. A pink thread usually means one’s life is called to adventure and exploration. As such, these intrepid souls set out for glory of the Colony, or often just glory of the Self. It’s not uncommon for members of the Colony to disregard pink threaded individuals as disconnected, aloof, or downright naive. While this is mostly unjustified, I rarely see a pink thread take interest in the betterment of the Colony. Every society needs dreamers, I suppose...",
    archetype: "The Intrepid Wanderer",
    quote:
      "Beyond the edge of every chart lies the only horizon worth reaching.",
    frequencyNote:
      "Rare in Colony ranks; admired for daring, yet scrutinized for aloofness.",
  },
  black: {
    id: "black",
    name: "Black Thread",
    hex: "#1E293B",
    accentHex: "#0F172A",
    calling: "Omen of Tragedy, Harm & Ruinous Fate",
    colonyRoles: [
      "The Exiled",
      "Shadow Bearers",
      "Tragic Harbingers",
      "Ruthless Reformers",
    ],
    antollustNotes:
      "Lastly we come to the worst fate imaginable for a Threading Aspirant. A black thread is an omen of tragedy and harm to others. They are often exiled from the Colony before any true harm can be done. While this may be harsh, it rarely goes unfounded. Despite this, having black in your string is not an immediate exile sentence, as morality is a beast all mortals must wrestle with time and again. Instead it is up to the individual communities and islands to decide if the other benefits garnered are worth the risk. While I’ve seen Black threads do great things, equally so have they wrought a destiny of darkness.",
    archetype: "The Shadow Harbinger",
    quote:
      "Destiny may cast a dark weave, but the hand that cuts the knot is still my own.",
    frequencyNote: "Dreaded omen; scrutinized closely by councils and islands.",
  },
};

export interface QuestionOption {
  label: string;
  subtext: string;
  scores: Partial<Record<ThreadColor, number>>;
}

export interface Question {
  id: number;
  stage: string;
  prompt: string;
  contextNarrative?: string;
  options: QuestionOption[];
}

export const QUESTIONS: Question[] = [
  {
    id: 1,
    stage: "The Awakening at the Loom",
    prompt:
      "When you picture the ultimate fulfillment of your days in the Colony, what picture forms in your mind?",
    contextNarrative:
      "Antollust watches closely from behind his lectern as the spindle hums softly.",
    options: [
      {
        label:
          "A tranquil home on the isle, tending crops or crafting honest goods free of grand calamity.",
        subtext:
          "Simple joy, routine stability, craftsmanship without needless heroics.",
        scores: { grey: 3, green: 1 },
      },
      {
        label:
          "Standing vigilant between peril and my people, absorbing the blows and holding the line so they never must.",
        subtext:
          "A bulwark of protection and frontline fortitude for those who cannot defend themselves.",
        scores: { brown: 3, red: 2 },
      },
      {
        label:
          "Dedicating my hands and heart to the healing of the wounded and uplifting the downtrodden.",
        subtext:
          "Selfless charity, tending the sick, and easing suffering without seeking reward.",
        scores: { white: 3, grey: 1 },
      },
      {
        label:
          "A life on the battlelines or rugged frontier, where trials test my spirit and strength is earned through struggle.",
        subtext:
          "Endurance and perseverance; forging character through relentless adversity.",
        scores: { red: 3, brown: 2 },
      },
      {
        label:
          "Unraveling the deepest arcane secrets and forgotten histories in the Scroll-Binders Consortium.",
        subtext:
          "Endless archives, celestial charts, and the thrill of revelation.",
        scores: { blue: 3, purple: 1 },
      },
      {
        label:
          "Standing atop an untamed peak beyond the Colony’s charts, chasing the thrill of discovery.",
        subtext:
          "No borders, no obligations—only boundless horizon and renown.",
        scores: { pink: 3, orange: 1 },
      },
    ],
  },
  {
    id: 2,
    stage: "The Alarm of the Hive",
    prompt:
      "The emergency horns wail across the island reefs. Hostile sky-beasts have descended. Where do your instincts immediately pull you?",
    contextNarrative:
      "Every aspirant feels their heart leap at the mention of the warning bell.",
    options: [
      {
        label:
          "Forming an impenetrable shield wall in the breach, absorbing ferocious assaults so kin behind me survive.",
        subtext:
          "Guarding the threshold with stalwart armor, unbroken grit, and combat resolve.",
        scores: { brown: 3, red: 3, white: 1 },
      },
      {
        label:
          "Straight into the fray with weapon or claw, welcoming the bloody test of survival.",
        subtext:
          "Let the fury test my mettle; life is carved through relentless strife.",
        scores: { red: 3, brown: 2 },
      },
      {
        label:
          "Directly into the triage tent, stitching wounds and pulling the injured from rubble.",
        subtext:
          "I care nothing for glory; preserving innocent lives is all that matters.",
        scores: { white: 3, grey: 1 },
      },
      {
        label:
          "To the front gate, rallying confused survivors and shouting tactical commands to form a defense line.",
        subtext:
          "Chaos requires a clear voice and someone decisive enough to lead.",
        scores: { yellow: 3, brown: 1 },
      },
      {
        label:
          "Unleashing raw magical destruction or seeking the beast’s occult core to obliterate it.",
        subtext: "Channeling esoteric forces that few others dare manipulate.",
        scores: { purple: 3, blue: 1 },
      },
    ],
  },
  {
    id: 3,
    stage: "The Burden of Fellowship",
    prompt:
      "How do you truly feel about living in the communal collective of the Colony?",
    contextNarrative:
      "The Colony prizes unity, yet each soul wefts its own rhythm into the cloth.",
    options: [
      {
        label:
          "I find true fellowship in shared sweat, labor, and the ramparts—standing shoulder-to-shoulder with comrades through every trial.",
        subtext:
          "Bonds forged in collective toil, defense, and facing hardship together.",
        scores: { brown: 2, red: 3 },
      },
      {
        label:
          "I prefer the wind-scoured mounds and open sky alone. Solitude is where I find true strength.",
        subtext:
          "Crowds drain the spirit; self-reliance is the only unshakeable truth.",
        scores: { orange: 3, pink: 1 },
      },
      {
        label:
          "I thrive in the soil and living canopy; nature’s rhythm is far truer than any social mandate.",
        subtext: "The roots and seasons speak with honest, quiet wisdom.",
        scores: { green: 3, grey: 1 },
      },
      {
        label:
          "I will gladly serve the community, asking nothing in return so long as the fragile are tended.",
        subtext: "A life lived for oneself is a life wasted.",
        scores: { white: 3, yellow: 1 },
      },
      {
        label:
          "The Colony’s rules and domestic squabbles stifle my spirit—I was born for open frontiers.",
        subtext: "Call me aloof if you will; I dream beyond their walls.",
        scores: { pink: 3, orange: 1 },
      },
    ],
  },
  {
    id: 4,
    stage: "The Trial of Ambition & Shadow",
    prompt:
      "You discover a dark relic of forbidden potency that could grant you immense power, but might endanger those around you.",
    contextNarrative:
      "Antollust leans forward, his spectacles glinting with solemn gravity.",
    options: [
      {
        label:
          "I bring down my hammer and smash it to pieces, enduring the violent recoil and burning shock so it harms no one.",
        subtext:
          "Pure physical grit, protective sacrifice, and destroying peril with my own hands.",
        scores: { red: 3, brown: 2 },
      },
      {
        label:
          "I seal it behind heavy iron vaults and stone barriers, maintaining eternal watch so it never escapes.",
        subtext:
          "Steadfast containment and defensive vigilance over dangerous secrets.",
        scores: { brown: 3, grey: 2 },
      },
      {
        label:
          "I study its inscriptions in absolute secrecy. Power is knowledge, and understanding it is paramount.",
        subtext: "Ignorance is worse than danger; true scholars master fear.",
        scores: { blue: 3, purple: 1 },
      },
      {
        label:
          "I seize the relic. Great destiny requires terrible sacrifices, and I will bear the cost.",
        subtext: "History belongs to those willing to touch the dark.",
        scores: { black: 3, purple: 2 },
      },
      {
        label:
          "I use it as an advantage against our enemies in battle, even if the weapon burns my own hands.",
        subtext: "Struggle requires desperate grit; let the fire temper me.",
        scores: { red: 2, black: 2 },
      },
    ],
  },
  {
    id: 5,
    stage: "The Voice of Authority",
    prompt:
      "A dispute breaks out that threatens to tear your home hive apart. How do you intervene?",
    contextNarrative:
      "Words weave factions together or shred them into bitter rivalries.",
    options: [
      {
        label:
          "Step directly between hot-headed brawlers, putting my own body on the line to break the violence.",
        subtext:
          "I will take the blows if necessary to protect the hive from tearing itself apart.",
        scores: { red: 3, brown: 2 },
      },
      {
        label:
          "Shield the vulnerable families caught in the middle from harassment or retaliatory violence.",
        subtext: "Let the elders argue; my duty is guarding the helpless.",
        scores: { brown: 3, white: 1 },
      },
      {
        label:
          "Step up to the platform, calm the tensions, and outline a fair plan everyone must follow.",
        subtext: "Someone has to steer the ship when the water churns.",
        scores: { yellow: 3, white: 1 },
      },
      {
        label:
          "Listen quietly, research the ancient colony treaties, and point out the lawful precedent.",
        subtext: "Facts and recorded truth cut through emotional hysteria.",
        scores: { blue: 3, grey: 1 },
      },
      {
        label:
          "Walk away into the quiet wild. Petty political squabbles are not worth my peace.",
        subtext: "Let mortals squabble; the mountain remains indifferent.",
        scores: { orange: 3, green: 1 },
      },
    ],
  },
  {
    id: 6,
    stage: "The Crucible of Loss",
    prompt:
      "When tragedy strikes and you suffer a bitter, unfair defeat, what rises inside you?",
    contextNarrative:
      "The thread is spun under immense tension; adversity reveals its grain.",
    options: [
      {
        label:
          "Grim determination to endure, grit my teeth, and fight through whatever pain follows.",
        subtext: "Life is war and hardship; I will outlast the misery.",
        scores: { red: 3, brown: 2 },
      },
      {
        label:
          "I double down on protecting whatever remains of my people, using scars as reminders of vigilance.",
        subtext:
          "Loss strengthens my shield; I will never allow my kin to suffer again.",
        scores: { brown: 3, red: 2 },
      },
      {
        label:
          "A cold, vengeful reckoning—those who brought this ruin will face an equal catastrophe.",
        subtext: "The wound festers until balance is paid in full ruin.",
        scores: { black: 3, red: 1 },
      },
      {
        label:
          "Patience. Like a winter tree, I will hold quiet and wait for new shoots to emerge.",
        subtext: "Destruction is part of the great cycle of life and renewal.",
        scores: { green: 3, grey: 2 },
      },
      {
        label:
          "A burning desire to pack my belongings and see what lies over the sea’s edge.",
        subtext: "New lands offer new beginnings and unbroken skies.",
        scores: { pink: 3, orange: 1 },
      },
    ],
  },
  {
    id: 7,
    stage: "The Highest Calling",
    prompt:
      "If the Archweaver handed you the golden shears and allowed you to snip one thread of your own destiny, which would you safeguard at all costs?",
    contextNarrative:
      "The lecture hall falls dead silent. The threads of fate listen.",
    options: [
      {
        label:
          "The thread of the Bastion Guard—to have sheltered the weak, endured brutal trials, and held the gate.",
        subtext:
          "A life spent taking the hard blows so the hearth fires of others never went out.",
        scores: { brown: 3, red: 3, white: 1 },
      },
      {
        label:
          "The thread of Compassionate Duty—to have comforted the broken and fed the hungry.",
        subtext: "The warmth of grateful eyes and a gentle passing.",
        scores: { white: 3, green: 1 },
      },
      {
        label:
          "The thread of Sacred Mystery—to be chosen by gods or shape the cosmic tapestry.",
        subtext: "Touching the divine and commanding miraculous destiny.",
        scores: { purple: 3, blue: 1 },
      },
      {
        label:
          "The thread of Unshakable Crown—to have built a flourishing society under my stewardship.",
        subtext: "Guiding an entire people toward greatness and safety.",
        scores: { yellow: 3, brown: 1 },
      },
      {
        label:
          "The thread of Tranquil Hearth—to have lived without terrifying portents, creating beauty in quiet.",
        subtext:
          "No statues, no songs of doom—just honest living and honest rest.",
        scores: { grey: 3, green: 1 },
      },
    ],
  },
  {
    id: 8,
    stage: "The Edge of the Crucible",
    prompt:
      "Archweaver Antollust pauses and looks directly at your hands. 'Tell me, Aspirant: what mark do your trials leave upon your soul?'",
    contextNarrative:
      "The shuttle glides slowly, waiting for your final honest reflection.",
    options: [
      {
        label:
          "Deep calluses, bruises, and hard-earned scars. I do not shy away from strife; struggle has forged my resilience.",
        subtext:
          "Life is combat, labor, and perseverance. Red wefts deeply into my cloth.",
        scores: { red: 3, brown: 2 },
      },
      {
        label:
          "A heavy shield arm and watchful eyes. My life exists solely to keep others safe from the storm, bearing the impact.",
        subtext:
          "Sanctuary and defense; enduring the tempest for those in my care.",
        scores: { brown: 3, red: 2, white: 1 },
      },
      {
        label:
          "Gentle hands dedicated to binding wounds and easing the burdens of the suffering.",
        subtext: "A pure heart given freely in selfless service to the Colony.",
        scores: { white: 3, grey: 1 },
      },
      {
        label:
          "Stained with ink and starlight. My trials are intellectual puzzles waiting to be unraveled.",
        subtext: "Curiosity and truth outshine physical tribulation.",
        scores: { blue: 3, purple: 1 },
      },
    ],
  },
];
