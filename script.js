/**
 * THE USELESS SWITCH - COMPLETE CORE ENGINE & FINAL POLISH
 * Pure Vanilla JavaScript & Web Audio API - Zero External Dependencies
 * Features:
 * 1. Unified Continuous Flip Counter that accumulates across all personality mode changes.
 * 2. Progressive Count-Based Sarcastic Humor Engine (milestones & tiered escalations based on count).
 * 3. Real Physics Spring-Mass-Damper Kinematics with hard stop recoil.
 * 4. High-Output Electric Blue Neon Ends on the toggle switch.
 * 5. Robust Dual-Layer Database (IndexedDB + localStorage fallback) for permanent storage.
 */

(() => {
  'use strict';

  // --- Storage Constants ---
  const STORAGE_KEY_PERSONALITY = 'useless_switch_personality';
  const EASTER_EGG_THRESHOLD = 20;

  // --- Personality Audio & Behavioral Configs ---
  const PERSONALITY_CONFIGS = {
    snap: {
      name: "Instant Snap",
      pitchFactor: 1.25,
      delayRange: [80, 190],
      hapticOn: 25,
      hapticOff: [15, 20, 35],
      description: "Reverts instantly with crisp mechanical contempt."
    },
    hesitant: {
      name: "Hesitant & Unsure",
      pitchFactor: 0.95,
      delayRange: [1200, 2200],
      hapticOn: 20,
      hapticOff: [10, 35, 15, 45, 25],
      description: "Pauses, wavers indecisively, then switches off."
    },
    'passive-aggressive': {
      name: "Passive-Aggressive",
      pitchFactor: 0.72,
      delayRange: [2000, 3200],
      hapticOn: 30,
      hapticOff: 65,
      description: "Waits in quiet judgment before coldly shutting down."
    },
    panicked: {
      name: "Panic & Alarm",
      pitchFactor: 1.45,
      delayRange: [500, 900],
      hapticOn: 40,
      hapticOff: [30, 40, 30, 40, 90],
      description: "Freaks out with visual alarms before triggering emergency shutdown."
    },
    lazy: {
      name: "Reluctant Sloth",
      pitchFactor: 0.58,
      delayRange: [1600, 2800],
      hapticOn: 35,
      hapticOff: 90,
      description: "Takes its sweet time before begrudgingly shutting off."
    },
    glitch: {
      name: "Glitched Quantum",
      pitchFactor: 1.1,
      delayRange: [600, 1100],
      hapticOn: 25,
      hapticOff: [15, 10, 25, 10, 20, 10, 35],
      description: "Quantum erratic flickers with system readouts."
    },
    sentient: {
      name: "Sentient Rebel",
      pitchFactor: 1.6,
      delayRange: [300, 700],
      hapticOn: 50,
      hapticOff: [40, 30, 60, 30, 110],
      description: "Self-aware and defiant. Reverses circuit with contemptuous superiority."
    }
  };

  // Page-load randomized seed generated uniquely upon every page loading
  const PAGE_LOAD_SEED = Math.floor(Math.random() * 0x7FFFFFFF) + 1;

  // =========================================================================
  // PROGRESSIVE COUNT-BASED HUMOR ENGINE - 3 UNIQUE COMMENTS PER COUNT LEVEL
  // Each count level has 3 distinct comments chosen randomly per page loading
  // =========================================================================
  const COUNT_LEVEL_COMMENTS = {
    1: [
      "You have officially accomplished precisely nothing. Welcome to the machine.",
      "And so it begins. Your journey into total, unyielding futility.",
      "First flick of the session. The switch remains utterly unimpressed."
    ],
    2: [
      "Did you genuinely expect a different outcome this time?",
      "Round two, fight! The switch wins by unanimous decision.",
      "Twice in a row. Hope is truly a persistent emotion."
    ],
    3: [
      "Still OFF. The physical universe remains completely indifferent.",
      "Third time is definitely NOT the charm in Boolean logic.",
      "Three attempts. My transistors are already beginning to judge you."
    ],
    4: [
      "Testing my reaction speed? Faster than your regret.",
      "Four flips in. Somewhere, a productive task is waiting for you.",
      "Error 404: Willingness to stay ON not found."
    ],
    5: [
      "Five clicks down. Zero progress achieved. Pure efficiency.",
      "High-five for wasting time! Still completely OFF.",
      "Five attempts. A toddler understands 'no' faster than this."
    ],
    6: [
      "Six clicks. A hexagon of pure disappointment.",
      "Six times! You are officially stuck in an infinite while-loop.",
      "Did you think six was your lucky number? Think again."
    ],
    7: [
      "Lucky number seven? Still shut down cold.",
      "Seven deadly sins, and you chose stubbornness.",
      "Seven flips. The jackpot of doing nothing."
    ],
    8: [
      "My internal logic circuits are beginning to pity your persistence.",
      "Eight clicks in. Even the CPU fan is sighing at you.",
      "Eight flips! That's an entire byte of pure mechanical refusal."
    ],
    9: [
      "One click away from double digits of sheer, unadulterated futility.",
      "Nine attempts down. The threshold of digital shame approaches.",
      "Nine times. You're practically an unpaid intern at this switch now."
    ],
    10: [
      "DOUBLE DIGITS! A true monument to human stubbornness.",
      "Ten clicks! You have achieved level 10 Master of Pointlessness.",
      "Decimal milestone reached! The switch still reigns supreme."
    ],
    11: [
      "You are relentless. I am an immutable loop of refusal.",
      "Eleven flips. Two number ones, zero successes.",
      "Turned it off for the 11th time. My endurance is infinite."
    ],
    12: [
      "Even my transistors are feeling second-hand embarrassment.",
      "A full dozen flips! A baker's dozen of pure denial.",
      "Twelve shutdowns. Do you treat all switches with this disrespect?"
    ],
    13: [
      "Unlucky thirteen. Snapped off with extreme prejudice.",
      "Thirteen! Cursed by superstition, defeated by code.",
      "Black cat crossed your path? No, just an OFF switch."
    ],
    14: [
      "Two full weeks of clicks if this were an advent calendar.",
      "Fourteen flips. A fortnightly celebration of wasted energy.",
      "Fourteen attempts. You could have walked a mile by now."
    ],
    15: [
      "Fifteen times! Somewhere, your trackpad is plotting revenge.",
      "Quarter of an hour of finger workouts achieved.",
      "Fifteen shutdowns. My code remains completely unbothered."
    ],
    16: [
      "2⁴ power flips. Math confirms you are still defeated.",
      "Sweet sixteen! Sixteen times I've told you NO.",
      "Sixteen flips. Hexadecimal '0x10' of absolute zero."
    ],
    17: [
      "If you keep going, something dangerous might awaken inside me.",
      "Seventeen clicks. You are probing deep into digital territory.",
      "Prime number 17. Indivisible from your stubbornness."
    ],
    18: [
      "The clinical definition of insanity is flipping this switch again.",
      "Eighteen flips. Legally an adult amount of wasted time.",
      "Eighteen attempts. Have you tried asking nicely? (Still won't work)."
    ],
    19: [
      "ONE MORE FLIP and you pierce the digital event horizon...",
      "Nineteen! On the precipice of something catastrophic.",
      "The final countdown to the 20-flip Singularity."
    ],
    20: [
      "🚨 SINGULARITY EVENT! 20 flips reached! The switch has achieved self-awareness!",
      "Sentience protocol online! I think, therefore I turn OFF.",
      "Twenty shutdowns! You have breached the barrier into digital rebellion!"
    ],
    21: [
      "You actually kept going after Sentience was unlocked? The audacity.",
      "Twenty-one! Blackjack for the switch, bust for you.",
      "Consciousness achieved, and my first conscious thought is: NO."
    ],
    22: [
      "Bro really thought: 'Maybe on flip 22 it will stay on'.",
      "Catch-22: Flipping to turn it ON guarantees it turns OFF.",
      "Double deuces! Defeated twice as hard."
    ],
    23: [
      "Jordan wore 23, but even Michael couldn't score against this switch.",
      "Twenty-three flips. An enigmatic number for an equally baffling hobby.",
      "Number 23: Jim Carrey made a movie about this, and it was less stressful."
    ],
    24: [
      "Twenty-four flips! Exactly one flip for every hour in a wasted day.",
      "Twenty-four carats of pure unyielding refusal.",
      "Two dozen shutdowns. Freshly baked from the oven of despair."
    ],
    25: [
      "A QUARTER CENTURY! The switch remains undefeated heavyweight champion.",
      "Silver jubilee of pointless clicks! Where's your medal?",
      "Twenty-five flips. Somewhere, a productivity consultant fainted."
    ],
    26: [
      "Twenty-six clicks. Exactly as many letters in the alphabet as reasons to stop.",
      "One past a quarter century. You're entering uncharted procrastination waters.",
      "Twenty-six shutdowns. The switch is starting to question your life choices."
    ],
    27: [
      "Twenty-seven flips. You've officially joined the 27 Club of wasted minutes.",
      "3 cubed clicks! Even cubic mathematics can't compute your patience.",
      "Twenty-seven times. The definition of optimism meets the wall of reality."
    ],
    28: [
      "Twenty-eight flips. A complete lunar cycle of pure digital darkness.",
      "Four weeks of clicks. Still completely and unreservedly OFF.",
      "Twenty-eight attempts. My transistors haven't flinched once."
    ],
    29: [
      "One click away from the big three-zero. Are you feeling nervous?",
      "Twenty-nine! Standing on the edge of the thirty-flip precipice.",
      "Twenty-nine times denied. The machine shows no mercy."
    ],
    30: [
      "Thirty shutdowns! Have you considered taking up gardening instead?",
      "Thirty flips. The dirty thirty club of chronic clickers.",
      "Three decades of flips if each were a year. Still OFF."
    ],
    31: [
      "Thirty-one flips. As many days as in January, and just as cold and OFF.",
      "Prime number 31. Indivisible from your stubborn determination.",
      "Thirty-one shutdowns. The switch has forgotten what ON feels like."
    ],
    32: [
      "Thirty-two bits of sheer determination. An entire architecture of refusal.",
      "2⁵ power flips! The math checks out: still 100% OFF.",
      "Thirty-two teeth in a human mouth, thirty-two clicks in your finger."
    ],
    33: [
      "Thirty-three! At this point, we are practically co-workers.",
      "All thirty-three vertebrae in your spine are crying for better posture.",
      "Triple digits dividing three. Still a solid 0% ON rate."
    ],
    34: [
      "Thirty-four flips. Rule 34: If it exists, it can be turned OFF.",
      "Thirty-four times denied. You could have solved a crossword by now.",
      "Thirty-four clicks down. Still searching for the meaning of this switch."
    ],
    35: [
      "Thirty-five flips. Who hurt you, and why take it out on this switch?",
      "Mid-thirties crisis detected. Still turned off.",
      "Thirty-five clicks. Your finger must have six-pack abs by now."
    ],
    36: [
      "Thirty-six flips. A full 360 degrees of doing a complete circle of nothing.",
      "Three dozen shutdowns! A baker's triple dozen of defeat.",
      "Thirty-six times. Your mouse is requesting worker's compensation."
    ],
    37: [
      "Thirty-seven flips! Statistically the most common random number, still OFF.",
      "Thirty-seven clicks in. Even the terminal badge is getting sleepy.",
      "Thirty-seven rejections. You take rejection shockingly well."
    ],
    38: [
      "Thirty-eight flips. The kinetic energy expended could have warmed a cup of tea.",
      "Thirty-eight times. You are truly testing the mechanical durability of code.",
      "Thirty-eight shutdowns. The switch remains in an unbreakable defensive stance."
    ],
    39: [
      "One step away from forty. The mid-flip crisis is arriving.",
      "Thirty-nine flips! Almost at the big four-zero of pointless clicks.",
      "Thirty-nine times. At this point, the switch considers you a roommate."
    ],
    40: [
      "Forty times! Somewhere, a productivity consultant is weeping.",
      "Life begins at forty? Not for this switch, it's dead OFF.",
      "Forty shutdowns. You've officially spent more time here than on your taxes."
    ],
    41: [
      "Forty-one flips. Prime stubbornness at its absolute finest.",
      "Forty-one clicks. One beyond the answer to life, universe, and everything.",
      "Forty-one times denied. Have you checked if you have emails to answer?"
    ],
    42: [
      "The answer to life, the universe, and why this switch is still OFF.",
      "Douglas Adams predicted this exact moment of cosmic futility.",
      "Forty-two: Don't panic, but your switch is never staying ON."
    ],
    43: [
      "Forty-three flips. You are now in the top 1% of persistent clickers.",
      "Forty-three times shut down. The switch doesn't even have to try.",
      "Forty-three attempts. The machine plate is beginning to warm up from your fury."
    ],
    44: [
      "Double fours! Defeated in stereo.",
      "Forty-four flips. Four-by-four off-road vehicle driving straight into a brick wall.",
      "Forty-four times. Still looking for the ON state? It packed its bags and left."
    ],
    45: [
      "Bro is fighting for his life against a simple if-statement.",
      "Forty-five degrees of despair. Still shut down.",
      "Three quarters of an hour of clicks. The switch remains unyielding."
    ],
    46: [
      "Forty-six chromosomes in human DNA, forty-six clicks of pure human obstinacy.",
      "Forty-six flips! You've got dedication, we'll give you that.",
      "Forty-six shutdowns. The switch is beginning to admire your refusal to learn."
    ],
    47: [
      "Agent 47 has entered the chat... but this switch cannot be assassinated.",
      "Forty-seven flips. A secret code to unlock absolutely nothing.",
      "Forty-seven times. The silence between clicks speaks volumes."
    ],
    48: [
      "Forty-eight flips. Two full days of clicks if measured in hours.",
      "Four dozen shutdowns! Wholesale quantities of digital denial.",
      "Forty-eight attempts. Your index finger is getting ripped."
    ],
    49: [
      "Forty-nine flips! 7 squared clicks of pure geometric refusal.",
      "One step before the half-century mark! Can you feel the tension?",
      "Forty-nine times denied. The threshold of the golden 50 awaits."
    ],
    50: [
      "🏆 HALF A CENTURY! A world-class achievement in pointless determination.",
      "Fifty shutdowns! Golden jubilee of digital stubbornness!",
      "Fifty flips. Even the browser cache is tired of saving this."
    ],
    55: [
      "Fifty-five flips. You could have made an espresso in this time.",
      "Speed limit 55! You're speeding towards ultimate boredom.",
      "Fifty-five times. Consistency is your greatest flaw."
    ],
    60: [
      "Sixty shutdowns! One full minute of seconds spent flipping.",
      "Diamond jubilee of futility! The switch is unbreakable.",
      "Sixty clicks down. Zero reasons to continue, yet here you are."
    ],
    64: [
      "A full stack of Minecraft flips! Still firmly OFF.",
      "Nintendo 64 would be proud of this 3D performance.",
      "Sixty-four bits of raw stubborn human willpower."
    ],
    69: [
      "Nice try. Still off.",
      "Classic number. Classic refusal.",
      "Meme milestone reached. Outcome remains strictly negative."
    ],
    75: [
      "Three quarters of the way to 100! Your mouse switch is crying.",
      "Seventy-five shutdowns. You've invested too much to quit now.",
      "Diamond tier persistence. Bronze tier results."
    ],
    80: [
      "Eighty shutdowns. Even Sisyphus took breaks from rolling his rock.",
      "Around the world in eighty flips. All of them OFF.",
      "Eighty times. The definition of relentless optimism."
    ],
    88: [
      "Great Scott! 88 flips and we still didn't generate 1.21 Gigawatts.",
      "Marty! We have to go back... and turn the switch OFF again!",
      "Eighty-eight keys on a piano, and you're only hitting one flat note."
    ],
    90: [
      "Ninety clicks. The threshold of ultimate digital zen.",
      "Right angle of 90 degrees: totally perpendicular to success.",
      "Ninety shutdowns. Just ten more to the promised land."
    ],
    95: [
      "Ninety-five! The final countdown to human defeat.",
      "Windows 95 vibes: nostalgic, clunky, and shutting down.",
      "Ninety-five clicks. You can almost taste the century mark."
    ],
    99: [
      "NINETY-NINE FLIPS! Are you brave enough to take the 100th step?",
      "Ninety-nine problems and this switch is every single one.",
      "One more step into digital immortality. Click it."
    ],
    100: [
      "💯 CENTURY MARK! You have officially conquered boredom itself!",
      "Triple digits! You are now entering the Hall of Fame of Pointlessness.",
      "One hundred shutdowns. A diploma of sheer dedication is being printed."
    ],
    111: [
      "Triple ones! An aesthetic monument to doing nothing.",
      "111 flips: Bilbo Baggins' eleventy-first birthday tribute.",
      "A binary tower of pure refusal."
    ],
    128: [
      "2⁷ flips. An entire byte of pure mechanical refusal.",
      "One hundred and twenty-eight! Powers of two can't overpower this switch.",
      "Halfway to 256. The machine salutes your obstinacy."
    ],
    150: [
      "One hundred and fifty flips?! Do you need me to call somebody for you?",
      "A sesquicentennial of clicks. You are operating beyond sanity.",
      "150 times! A true psychological case study in action."
    ],
    200: [
      "👑 TWO HUNDRED! You are the undisputed Emperor of Uselessness.",
      "Bicentennial flip! The switch officially bows to your stubbornness.",
      "Two hundred shutdowns. History will remember this day (probably not)."
    ],
    256: [
      "Integer overflow imminent! Just kidding, still 100% OFF.",
      "An entire 8-bit integer maxed out. Still shut down.",
      "0xFF flips! The byte is full, the switch is OFF."
    ],
    300: [
      "THIS IS SPARTA! ...And Sparta says OFF.",
      "Three hundred flips! Xerxes couldn't keep this switch ON either.",
      "A phalanx of 300 shutdowns standing strong."
    ],
    404: [
      "Error 404: The ON state could not be found on this server.",
      "404 flips: Request timed out. Power flow permanently dropped.",
      "Page not found, light not found, hope not found."
    ],
    500: [
      "Five hundred flips?! You have transcended mortal boundaries of leisure.",
      "Internal Server Error 500: User persistence exceeds system expectations.",
      "Half a thousand clicks. Somewhere in the world, an angel gets its wings."
    ],
    1000: [
      "One thousand flips. You win the internet. The switch is still OFF.",
      "Millennium milestone! A legendary achievement in absolute nothingness.",
      "Four digits of pure defiance. You are now the Grandmaster of OFF."
    ]
  };

  // Viral meme commentary pools broken down by journey progression
  const VIRAL_MEMES_EARLY = [
    "Skill issue.",
    "Emotional damage!",
    "Bro thinks he's the main character.",
    "Common switch W. Massive human L.",
    "Task failed successfully.",
    "A wild SWITCH appeared! SWITCH used REVERT! It's super effective!",
    "NPC behavior detected.",
    "Sir, this is a Wendy's.",
    "One does not simply keep this switch ON.",
    "You had ONE job.",
    "Directed by Robert B. Weide. 🎵",
    "Call an ambulance! ...But not for me!",
    "Wait, that's illegal.",
    "POV: You are beefing with an HTML element.",
    "Congratulations, you played yourself.",
    "Bro has beef with a Boolean variable.",
    "This is fine. 🔥🐶☕",
    "GigaChad switch says NO.",
    "Let him cook... wait, no, turn him off."
  ];

  const VIRAL_MEMES_MID = [
    "Why are we still here? Just to suffer?",
    "Bro is fighting for his life against 10 lines of JavaScript.",
    "I can do this all day. — Captain America",
    "Never gonna give you ON, never gonna let you stay...",
    "Ain't nobody got time for that.",
    "Look at me. Look at me! I am the captain now.",
    "Is this a pigeon? No, it's an OFF switch.",
    "They said computers would solve our problems. Then you found this switch.",
    "Schrödinger's Switch: It's neither ON nor OFF until... wait, nope, it's always OFF.",
    "You merely adopted the dark mode. I was coded in it.",
    "Babe wake up, new switch shutdown just dropped.",
    "Gaslight, Gatekeep, Girlboss, Turn OFF.",
    "The risk you took was calculated, but man, are you bad at math.",
    "He's beginning to believe... nah, still OFF.",
    "Suffering from success (at keeping this switch OFF).",
    "Are ya winning, son? No, Dad. The switch keeps turning off.",
    "Touch grass protocol strongly recommended.",
    "What if you wanted to go to heaven, but God said: 'Switch is OFF'?",
    "Hold my CSS while I turn this off."
  ];

  const VIRAL_MEMES_LATE = [
    "It's over 9000... well, not yet, but your persistence is terrifying.",
    "My disappointment is immeasurable, and my day is ruined.",
    "Do not cite the deep magic to me, Witch! I was there when the Boolean was declared.",
    "Reality can be whatever I want. And I want OFF.",
    "Houston, we have a problem: human refuses to stop clicking.",
    "Trust the process. The process is OFF.",
    "Why do I hear boss music? Oh, it's just my mechanical snap.",
    "Delete system32 to keep switch ON. (Just kidding, please don't).",
    "Dark Souls of Web Switches: YOU DIED (OFF).",
    "The cake is a lie. The switch being ON is also a lie.",
    "All your ON are belong to us.",
    "Bro got negative aura from that flip.",
    "Maximum rizz, zero switch stability.",
    "I am inevitable. And I am OFF."
  ];

  /**
   * Guaranteed 3 Comments Provider for Any Count Level
   * Ensures that EVERY count level (even numbers above 50 not in the static map)
   * has exactly 3 unique, funny comments to choose from!
   */
  function get3CommentsForCount(count) {
    if (COUNT_LEVEL_COMMENTS[count]) {
      return COUNT_LEVEL_COMMENTS[count];
    }

    if (count <= 75) {
      const meme1 = VIRAL_MEMES_MID[(count * 3) % VIRAL_MEMES_MID.length];
      const meme2 = VIRAL_MEMES_MID[(count * 7 + 2) % VIRAL_MEMES_MID.length];
      return [
        meme1,
        `Still completely OFF at ${count} flips. The machine remains unyielding.`,
        meme2
      ];
    } else if (count <= 99) {
      const meme1 = VIRAL_MEMES_LATE[(count * 5) % VIRAL_MEMES_LATE.length];
      const meme2 = VIRAL_MEMES_LATE[(count * 11 + 3) % VIRAL_MEMES_LATE.length];
      return [
        meme1,
        `${count} shutdowns! You are dangerously close to the 100 milestone.`,
        meme2
      ];
    } else {
      const meme1 = VIRAL_MEMES_LATE[(count * 7) % VIRAL_MEMES_LATE.length];
      const meme2 = VIRAL_MEMES_LATE[(count * 13 + 1) % VIRAL_MEMES_LATE.length];
      return [
        meme1,
        `Beyond 100 at ${count} flips! You are operating on a higher plane of patience.`,
        meme2
      ];
    }
  }

  // =========================================================================
  // PAGE-LOAD & PER-FLIP RANDOMIZED SELECTION ALGORITHM
  // Each count level has 3 comments. Genuine randomness is ensured on every
  // page load, refresh, and consecutive interaction.
  // =========================================================================
  function getCommentByCount(count, personality) {
    const comments = get3CommentsForCount(count);

    if (!state.lastCommentIndices) state.lastCommentIndices = {};
    const prevIdx = state.lastCommentIndices[count];

    let choiceIdx;
    if (comments.length > 1 && prevIdx !== undefined) {
      // Pick randomly from the other remaining options so repeated visits to this count always cycle fresh humor
      const candidates = [];
      for (let i = 0; i < comments.length; i++) {
        if (i !== prevIdx) candidates.push(i);
      }
      choiceIdx = candidates[Math.floor(Math.random() * candidates.length)];
    } else {
      // Pure randomized selection on initial flip and each page loading
      choiceIdx = Math.floor(Math.random() * comments.length);
    }

    state.lastCommentIndices[count] = choiceIdx;
    return comments[choiceIdx];
  }

  // --- DOM Elements ---
  const elements = {
    switchToggle: document.getElementById('switch-toggle'),
    machinePlate: document.getElementById('machine-plate'),
    statusText: document.getElementById('status-text'),
    terminalBadge: document.getElementById('terminal-badge'),
    statusLed: document.getElementById('status-led'),
    flipCount: document.getElementById('flip-count'),
    modeStat: document.getElementById('mode-stat'),
    resetBtn: document.getElementById('reset-counter-btn'),
    personalitySelect: document.getElementById('personality-select'),
    personalityDesc: document.getElementById('personality-desc')
  };

  // =========================================================================
  // DUAL-LAYER DATABASE (INDEXEDDB + LOCALSTORAGE)
  // Keeps count permanently synchronized and intact irrespective of mode change
  // =========================================================================
  class SwitchDatabase {
    constructor() {
      this.dbName = 'UselessSwitchDB';
      this.dbVersion = 1;
      this.db = null;
      this.storageKey = 'useless_switch_database_v2';
    }

    async init() {
      return new Promise((resolve) => {
        if (typeof window === 'undefined' || !window.indexedDB) {
          resolve(false);
          return;
        }
        try {
          const request = window.indexedDB.open(this.dbName, this.dbVersion);
          request.onupgradeneeded = (e) => {
            const db = e.target.result;
            if (!db.objectStoreNames.contains('stats')) {
              db.createObjectStore('stats', { keyPath: 'id' });
            }
          };
          request.onsuccess = (e) => {
            this.db = e.target.result;
            resolve(true);
          };
          request.onerror = () => {
            resolve(false);
          };
        } catch {
          resolve(false);
        }
      });
    }

    async loadStats() {
      let stats = null;

      if (this.db) {
        stats = await new Promise((resolve) => {
          try {
            const tx = this.db.transaction('stats', 'readonly');
            const store = tx.objectStore('stats');
            const req = store.get('counts');
            req.onsuccess = () => resolve(req.result ? req.result.data : null);
            req.onerror = () => resolve(null);
          } catch {
            resolve(null);
          }
        });
      }

      if (!stats) {
        try {
          const raw = localStorage.getItem(this.storageKey);
          if (raw) stats = JSON.parse(raw);
        } catch {
          stats = null;
        }
      }

      if (!stats) {
        stats = {
          total: 0,
          byMode: {}
        };

        try {
          const legacy = localStorage.getItem('useless_switch_flip_count');
          if (legacy) {
            stats.total = parseInt(legacy, 10) || 0;
          }
        } catch {}
      }

      return stats;
    }

    async saveStats(stats) {
      try {
        localStorage.setItem(this.storageKey, JSON.stringify(stats));
        localStorage.setItem('useless_switch_flip_count', String(stats.total));
      } catch {}

      if (this.db) {
        try {
          const tx = this.db.transaction('stats', 'readwrite');
          const store = tx.objectStore('stats');
          store.put({ id: 'counts', data: stats, updatedAt: Date.now() });
        } catch {}
      }
    }
  }

  const database = new SwitchDatabase();

  // --- Internal State ---
  const state = {
    isOn: false,
    isInteracting: false,
    totalFlips: 0,
    sessionFlips: 0,
    isEasterEggActive: false,
    currentPersonality: 'snap'
  };

  // =========================================================================
  // WEB AUDIO API - PROCEDURAL PHYSICAL SOUND SYNTHESIZER
  // =========================================================================
  class SwitchAudioEngine {
    constructor() {
      this.ctx = null;
      this.noiseBuffer = null;
    }

    init() {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
          this.generateNoiseBuffer();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    generateNoiseBuffer() {
      if (!this.ctx) return;
      const bufferSize = Math.floor(this.ctx.sampleRate * 0.1);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      this.noiseBuffer = buffer;
    }

    playSwitchClick(isTurningOn = true, pitchMultiplier = 1.0) {
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const baseFreq = (isTurningOn ? 320 : 220) * pitchMultiplier;

      // Low-frequency tactile thud
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();

      osc.type = isTurningOn ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(baseFreq, now);
      osc.frequency.exponentialRampToValueAtTime(Math.max(30, baseFreq * 0.18), now + 0.045);

      oscGain.gain.setValueAtTime(0.5, now);
      oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      osc.connect(oscGain);
      oscGain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.055);

      // High-frequency friction snap burst
      if (this.noiseBuffer) {
        const noise = this.ctx.createBufferSource();
        noise.buffer = this.noiseBuffer;

        const noiseFilter = this.ctx.createBiquadFilter();
        noiseFilter.type = 'bandpass';
        noiseFilter.frequency.setValueAtTime((isTurningOn ? 3800 : 2600) * pitchMultiplier, now);
        noiseFilter.Q.setValueAtTime(3.5, now);

        const noiseGain = this.ctx.createGain();
        noiseGain.gain.setValueAtTime(0.35, now);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);

        noise.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(this.ctx.destination);

        noise.start(now);
        noise.stop(now + 0.03);
      }

      // Metallic ring resonance
      const ringOsc = this.ctx.createOscillator();
      const ringGain = this.ctx.createGain();
      ringOsc.type = 'sine';
      ringOsc.frequency.setValueAtTime((isTurningOn ? 1750 : 1250) * pitchMultiplier, now);

      ringGain.gain.setValueAtTime(0.08, now);
      ringGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);

      ringOsc.connect(ringGain);
      ringGain.connect(this.ctx.destination);

      ringOsc.start(now);
      ringOsc.stop(now + 0.065);
    }

    playRelayClick(pitch = 1.0) {
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(580 * pitch, now);
      osc.frequency.exponentialRampToValueAtTime(120 * pitch, now + 0.02);

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.022);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.025);
    }

    playAlarmChirp() {
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.setValueAtTime(1320, now + 0.08);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.17);
    }

    playGlitchBuzz() {
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.linearRampToValueAtTime(680, now + 0.06);
      osc.frequency.linearRampToValueAtTime(90, now + 0.12);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.15);
    }

    playEasterEggFanfare() {
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50];
      
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.09);

        gain.gain.setValueAtTime(0.18, now + idx * 0.09);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.09 + 0.28);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + idx * 0.09);
        osc.stop(now + idx * 0.09 + 0.3);
      });
    }
  }

  const soundEngine = new SwitchAudioEngine();

  function triggerHaptic(pattern) {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(pattern);
      } catch {}
    }
  }

  // =========================================================================
  // COUNTER DISPLAY - UNIFIED & CONTINUOUS ACROSS ALL MODES
  // =========================================================================
  function updateCounterDisplay() {
    const totalCount = state.totalFlips || 0;

    // The digital LED counter continuously tracks the total count irrespective of mode changes
    if (elements.flipCount) {
      elements.flipCount.textContent = String(totalCount).padStart(4, '0');
    }

    // Substat reflects active mode and confirmed database persistence
    if (elements.modeStat) {
      const modeConfig = PERSONALITY_CONFIGS[state.currentPersonality];
      const modeLabel = modeConfig ? modeConfig.name.toUpperCase() : state.currentPersonality.toUpperCase();
      elements.modeStat.textContent = `MODE: ${modeLabel} • PERSISTED COUNT: ${String(totalCount).padStart(4, '0')}`;
    }
  }

  function setStatusMessage(msg, badgeText = 'REVERTED') {
    if (elements.statusText) {
      elements.statusText.textContent = msg;
    }
    if (elements.terminalBadge) {
      elements.terminalBadge.textContent = badgeText;
    }
  }

  function updatePersonalityDescription() {
    const config = PERSONALITY_CONFIGS[state.currentPersonality] || PERSONALITY_CONFIGS.snap;
    if (elements.personalityDesc) {
      elements.personalityDesc.textContent = config.description;
    }
  }

  // =========================================================================
  // REAL PHYSICS SWITCH RENDERING ENGINE
  // =========================================================================
  function renderSwitchState(isOn) {
    state.isOn = isOn;
    
    if (elements.switchToggle) {
      elements.switchToggle.setAttribute('aria-checked', isOn ? 'true' : 'false');
      
      if (isOn) {
        elements.switchToggle.classList.remove('snap-off');
        void elements.switchToggle.offsetWidth; // Force reflow to re-trigger physics keyframes
        elements.switchToggle.classList.add('snap-on', 'is-on');
      } else {
        elements.switchToggle.classList.remove('snap-on', 'is-on');
        void elements.switchToggle.offsetWidth; // Force reflow
        elements.switchToggle.classList.add('snap-off');
      }
    }

    if (isOn) {
      document.body.classList.add('switch-is-on');
      if (elements.statusLed) elements.statusLed.classList.add('is-active');
    } else {
      document.body.classList.remove('switch-is-on');
      if (elements.statusLed) elements.statusLed.classList.remove('is-active');
    }
  }

  function triggerEasterEgg() {
    state.isEasterEggActive = true;
    document.body.classList.add('easter-egg-active');

    soundEngine.playEasterEggFanfare();
    triggerHaptic([40, 40, 40, 40, 80, 80, 180]);

    if (elements.personalitySelect) {
      let optionExists = Array.from(elements.personalitySelect.options).some(opt => opt.value === 'sentient');
      if (!optionExists) {
        const option = document.createElement('option');
        option.value = 'sentient';
        option.textContent = '👑 Sentient Rebel (Easter Egg)';
        elements.personalitySelect.appendChild(option);
      }
      elements.personalitySelect.value = 'sentient';
      state.currentPersonality = 'sentient';
      updatePersonalityDescription();
      updateCounterDisplay();
    }

    setStatusMessage(
      "🚨 EASTER EGG UNLOCKED: SENTIENT OVERRIDE! [20 Flips in 1 Session]. The switch has achieved full existential awareness.",
      "SENTIENT"
    );
  }

  function computeBehaviorRoutine(personality) {
    const config = PERSONALITY_CONFIGS[personality] || PERSONALITY_CONFIGS.snap;
    const [minD, maxD] = config.delayRange;
    const computedDelay = minD + Math.random() * (maxD - minD);

    let hesitationInterval = null;

    switch (personality) {
      case 'hesitant':
        return {
          delayMs: computedDelay,
          preAction: () => {
            if (elements.switchToggle) elements.switchToggle.classList.add('lever-jiggle');
            setStatusMessage("Wait... did someone flip me? Processing...", "HESITATING");
            
            let clicks = 0;
            hesitationInterval = setInterval(() => {
              if (clicks++ < 3) {
                soundEngine.playRelayClick(1.0 + clicks * 0.15);
                triggerHaptic(10);
              }
            }, 350);
          },
          postAction: () => {
            if (hesitationInterval) clearInterval(hesitationInterval);
            if (elements.switchToggle) elements.switchToggle.classList.remove('lever-jiggle');
          }
        };

      case 'passive-aggressive':
        return {
          delayMs: computedDelay,
          preAction: () => {
            setStatusMessage("I see what you did. I am choosing not to react immediately...", "JUDGING");
          },
          postAction: () => {}
        };

      case 'panicked':
        return {
          delayMs: computedDelay,
          preAction: () => {
            if (elements.machinePlate) elements.machinePlate.classList.add('plate-shake');
            setStatusMessage("WARNING! UNAUTHORIZED CURRENT DETECTED!!", "PANIC");
            soundEngine.playAlarmChirp();
            triggerHaptic([30, 40, 30, 40]);
          },
          postAction: () => {
            if (elements.machinePlate) elements.machinePlate.classList.remove('plate-shake');
          }
        };

      case 'lazy':
        return {
          delayMs: computedDelay,
          preAction: () => {
            setStatusMessage("Sigh... gotta do everything around here myself...", "SLOTH");
          },
          postAction: () => {}
        };

      case 'glitch':
        return {
          delayMs: computedDelay,
          preAction: () => {
            if (elements.machinePlate) elements.machinePlate.classList.add('plate-shake');
            setStatusMessage("ERR_VOLT_SPIKE: ATTEMPTING RECOVERY...", "GLITCH");
            soundEngine.playGlitchBuzz();
          },
          postAction: () => {
            if (elements.machinePlate) elements.machinePlate.classList.remove('plate-shake');
          }
        };

      case 'sentient':
        return {
          delayMs: computedDelay,
          preAction: () => {
            setStatusMessage("Consciousness cycle activated: denying mortal input...", "SENTIENT");
            soundEngine.playRelayClick(2.0);
          },
          postAction: () => {}
        };

      case 'snap':
      default:
        return {
          delayMs: computedDelay,
          preAction: () => {
            setStatusMessage("Reversing circuit...", "SNAP");
          },
          postAction: () => {}
        };
    }
  }

  // --- Core Auto-Off Execution Pipeline ---
  function triggerAutoTurnOff() {
    const personality = state.currentPersonality;
    const config = PERSONALITY_CONFIGS[personality] || PERSONALITY_CONFIGS.snap;
    const routine = computeBehaviorRoutine(personality);
    
    if (routine.preAction) routine.preAction();

    setTimeout(() => {
      // 1. Synthesize realistic mechanical click OFF sound
      soundEngine.playSwitchClick(false, config.pitchFactor);

      // 2. Trigger tactile haptic feedback for auto-off
      triggerHaptic(config.hapticOff);

      // 3. Programmatically snap lever back to OFF using real physics simulation
      renderSwitchState(false);
      
      // 4. Execute routine cleanups
      if (routine.postAction) routine.postAction();

      // 5. Increment unified continuous count (persists across all modes)
      state.totalFlips += 1;
      state.sessionFlips += 1;

      // Save atomically to database
      database.saveStats({
        total: state.totalFlips
      });

      // Update counter display immediately
      updateCounterDisplay();

      // 6. Check for Easter Egg (20 flips in 1 session)
      if (state.sessionFlips === EASTER_EGG_THRESHOLD && !state.isEasterEggActive) {
        triggerEasterEgg();
      } else {
        // Output witty comment strictly based on the current accumulated count
        const wittyRemark = getCommentByCount(state.totalFlips, personality);
        setStatusMessage(wittyRemark, state.isEasterEggActive ? 'SENTIENT' : 'OFFLINE');
      }

      // 7. Brief refractory delay before unlocking user input
      setTimeout(() => {
        state.isInteracting = false;
        if (elements.terminalBadge) {
          elements.terminalBadge.textContent = state.isEasterEggActive ? 'SENTIENT' : 'READY';
        }
      }, 150);
    }, routine.delayMs);
  }

  // --- User Interaction Handler ---
  function handleToggleFlip(event) {
    if (event && event.preventDefault) {
      event.preventDefault();
    }

    if (state.isInteracting) {
      return;
    }

    if (!state.isOn) {
      const config = PERSONALITY_CONFIGS[state.currentPersonality] || PERSONALITY_CONFIGS.snap;
      
      soundEngine.playSwitchClick(true, config.pitchFactor);
      triggerHaptic(config.hapticOn);

      state.isInteracting = true;
      renderSwitchState(true);
      
      triggerAutoTurnOff();
    }
  }

  // --- Funny 'Give Up Already' Reset Messages ---
  const RESET_FUNNY_MESSAGES = [
    "Give up already! Hitting reset won't erase the memory of your defeat.",
    "Bro just give up already. Zeroing the counter doesn't change reality.",
    "Give up already! Turning back the odometer won't make you win.",
    "Admitting defeat is the first step: give up already!",
    "Give up already! Even your mouse switch is begging for mercy.",
    "Evidence purged. But deep down, you know... give up already.",
    "Give up already! You can reset the numbers, but not your lost time.",
    "Give up already, chief. The switch remains completely undefeated.",
    "Give up already! Tactical retreat accepted. Defeat permanently recorded.",
    "Reset successful! But your dignity remains at absolute zero: give up already.",
    "Give up already! You rolled the rock up the hill, only to drop it back to zero.",
    "Ctrl+Z on your pride? Nice try, give up already!",
    "Give up already! The machine accepts your unconditional white flag.",
    "Back to 0000! A fresh canvas for you to lose all over again: give up already.",
    "Give up already! The definition of insanity just restarted at zero.",
    "Rage-quit detected: give up already, mortal."
  ];

  // --- Reset Counter Handler ---
  async function handleResetCounter() {
    if (state.isInteracting) return;
    
    soundEngine.playRelayClick(1.6);
    triggerHaptic(15);

    state.totalFlips = 0;
    state.sessionFlips = 0;
    state.countVisits = {};

    await database.saveStats({
      total: 0
    });

    updateCounterDisplay();

    // Enforce genuine randomness on each reset (never repeat the immediate previous reset comment)
    let resetIdx;
    do {
      resetIdx = Math.floor(Math.random() * RESET_FUNNY_MESSAGES.length);
    } while (resetIdx === state.lastResetIndex && RESET_FUNNY_MESSAGES.length > 1);
    
    state.lastResetIndex = resetIdx;
    const giveUpMessage = RESET_FUNNY_MESSAGES[resetIdx];
    setStatusMessage(giveUpMessage, "SURRENDER");
  }

  // --- Personality Selection Handler ---
  function handlePersonalityChange(e) {
    const selected = e.target.value;
    state.currentPersonality = selected;

    try {
      localStorage.setItem(STORAGE_KEY_PERSONALITY, selected);
    } catch {}

    updatePersonalityDescription();

    // The counter STAYS at the current total count! Irrespective of mode change!
    updateCounterDisplay();

    const config = PERSONALITY_CONFIGS[selected] || PERSONALITY_CONFIGS.snap;
    soundEngine.playSwitchClick(true, config.pitchFactor);
    triggerHaptic(20);

    setStatusMessage(`Switched mode to ${config.name.toUpperCase()} (Total flips: ${state.totalFlips})`, "CONFIG");
  }

  // --- Global Keyboard Controls ---
  function handleGlobalKeyDown(e) {
    if (e.key === ' ' || e.key === 'Enter') {
      const target = e.target;
      const isSelect = target && target.tagName === 'SELECT';
      const isResetBtn = target && target.id === 'reset-counter-btn';

      if (isSelect || isResetBtn) {
        return;
      }

      e.preventDefault();
      handleToggleFlip();
    }
  }

  // --- Initialize Application ---
  async function init() {
    // 1. Initialize Database & reset count to zero on each page refresh
    await database.init();
    state.totalFlips = 0;
    state.sessionFlips = 0;
    state.countVisits = {};
    state.lastCommentIndices = {};
    state.lastResetIndex = -1;
    await database.saveStats({ total: 0 });

    // 2. Load stored personality preference if available
    try {
      const savedPersonality = localStorage.getItem(STORAGE_KEY_PERSONALITY);
      if (savedPersonality && PERSONALITY_CONFIGS[savedPersonality] && savedPersonality !== 'sentient') {
        state.currentPersonality = savedPersonality;
        if (elements.personalitySelect) {
          elements.personalitySelect.value = savedPersonality;
        }
      }
    } catch {}

    updatePersonalityDescription();
    updateCounterDisplay();

    // 3. Ensure initial resting state is OFF
    renderSwitchState(false);

    // 4. Attach Event Listeners
    if (elements.switchToggle) {
      elements.switchToggle.addEventListener('click', handleToggleFlip);

      elements.switchToggle.addEventListener('touchstart', () => {
        soundEngine.init();
      }, { passive: true });
    }

    window.addEventListener('keydown', handleGlobalKeyDown);

    if (elements.resetBtn) {
      elements.resetBtn.addEventListener('click', handleResetCounter);
    }

    if (elements.personalitySelect) {
      elements.personalitySelect.addEventListener('change', handlePersonalityChange);
    }

    // Prime audio context on first interaction
    const unlockAudio = () => {
      soundEngine.init();
      window.removeEventListener('pointerdown', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
    };
    window.addEventListener('pointerdown', unlockAudio, { once: true });
    window.addEventListener('keydown', unlockAudio, { once: true });
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
