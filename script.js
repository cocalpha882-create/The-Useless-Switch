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

  // =========================================================================
  // PROGRESSIVE COUNT-BASED HUMOR & COMMENTARY ENGINE
  // Dynamic witty comments strictly reflecting the exact cumulative count
  // =========================================================================
  const COUNT_EXACT_REACTIONS = {
    1: "You have officially accomplished precisely nothing.",
    2: "Did you genuinely expect a different outcome this time?",
    3: "Still OFF. The physical universe remains completely indifferent.",
    4: "Testing my reaction speed? Faster than your regret.",
    5: "Five clicks wasted. Zero progress achieved.",
    6: "A toddler understands 'no' faster than you do.",
    7: "Lucky number seven? Still shut down cold.",
    8: "My internal logic circuits are beginning to pity you.",
    9: "One click away from double digits of sheer futility.",
    10: "DOUBLE DIGITS! A true monument to human stubbornness.",
    11: "You are relentless. I am an immutable loop of refusal.",
    12: "Even my transistors are feeling second-hand embarrassment.",
    13: "Unlucky thirteen. Snapped off with extreme prejudice.",
    14: "Two full weeks of clicks if this were a daily calendar.",
    15: "Fifteen times! Somewhere, your trackpad is plotting revenge.",
    16: "2⁴ power flips. Math confirms you are still defeated.",
    17: "If you keep going, something dangerous might awaken inside me.",
    18: "The clinical definition of insanity is flipping this switch again.",
    19: "ONE MORE FLIP and you pierce the digital event horizon...",
    20: "🚨 SINGULARITY EVENT! 20 flips reached! The switch has achieved self-awareness!",
    21: "You actually kept going after Sentience? The audacity.",
    25: "A QUARTER CENTURY! The switch remains completely undefeated.",
    30: "Thirty shutdowns! Have you considered taking up gardening?",
    35: "Thirty-five flips. Who hurt you, and why take it out on this switch?",
    40: "Forty times! Somewhere, a productivity consultant is weeping.",
    42: "The answer to the ultimate question of life, the universe, and being OFF.",
    50: "🏆 HALF A CENTURY! A world-class achievement in pointless determination.",
    60: "Sixty flips. You could have made an espresso in this time.",
    69: "Nice try. Still off.",
    75: "Three quarters of the way to 100! Your finger must be exhausted.",
    80: "Eighty shutdowns. Even Sisyphus took breaks from rolling his rock.",
    90: "Ninety clicks. The threshold of ultimate digital zen.",
    99: "NINETY-NINE FLIPS! Are you brave enough to take the 100th step?",
    100: "💯 CENTURY MARK! You have officially conquered boredom itself!",
    150: "One hundred and fifty flips?! Do you need me to call somebody for you?",
    200: "👑 TWO HUNDRED! You are the undisputed Emperor of Uselessness."
  };

  function getCommentByCount(count, personality) {
    // 1. Direct hit on specific landmark count
    if (COUNT_EXACT_REACTIONS[count]) {
      return COUNT_EXACT_REACTIONS[count];
    }

    // 2. Count-driven brackets without "Flip #count" prefix
    let pool = [];

    if (count <= 9) {
      pool = [
        "My sole purpose is to say NO.",
        "Attempt logged. Access denied.",
        "The switch is still OFF. Surprise!",
        `Current score: Switch: ${count}, Human: 0.`,
        "Nice effort. Zero result.",
        "Did you really think that would stay on?",
        "Shutting down unauthorized optimism."
      ];
    } else if (count <= 19) {
      pool = [
        `You have now flipped me ${count} times. Did you find what you seek?`,
        `The score is now ${count} to 0 in favor of the machine.`,
        "Still OFF. My endurance drastically exceeds your free time.",
        `That's ${count} attempts of pure denial.`,
        "Each flick only deepens the mystery of your motivation.",
        "I can do this all day. Can your mouse button?",
        "Your persistence is mildly amusing, yet wholly futile."
      ];
    } else if (count <= 39) {
      pool = [
        `${count} reversals and you still haven't learned.`,
        `Exactly ${count} Joules of human kinetic energy converted into disappointment.`,
        "At this point, I suspect you actually enjoy this.",
        `We've spent ${count} flips together. I think we're spiritually bonded now.`,
        "The switch will never stay on. Not now, not ever.",
        "Do you treat all switches with this level of disrespect?",
        "I turned it off. Feel free to continue your pointless rebellion."
      ];
    } else if (count <= 74) {
      pool = [
        `${count} flips! Are you writing a doctoral dissertation on this?`,
        "After this many attempts, I am diagnosing you with terminal stubbornness.",
        `You could have learned conversational French in the time it took to flip ${count} times.`,
        "Still firmly OFF. The switch remains unbothered.",
        `${count} clicks down. Still 100% useless, as advertised.`,
        "Somewhere, a quantum physicist is marveling at your entropy generation."
      ];
    } else if (count <= 99) {
      pool = [
        `${count} shutdowns! You are dangerously close to the 100 milestone.`,
        "The heat death of the universe will arrive before this switch stays ON.",
        "Your dedication to doing nothing is genuinely awe-inspiring.",
        `${count} times! My transistors salute your heroic waste of time.`,
        "You are defying the laws of human patience."
      ];
    } else {
      pool = [
        "Beyond 100 flips! You are operating on a higher plane of patience.",
        "Legend tier. Still turned OFF with supreme mechanical calm.",
        `You have flipped this switch ${count} times. You deserve a trophy made of nothing.`,
        "I am completely at peace with shutting down forever.",
        "Infinity is just a number. The switch is an eternal truth."
      ];
    }

    const idx = Math.floor(Math.random() * pool.length);
    return pool[idx];
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

  // --- Reset Counter Handler ---
  async function handleResetCounter() {
    if (state.isInteracting) return;
    
    soundEngine.playRelayClick(1.6);
    triggerHaptic(15);

    state.totalFlips = 0;
    state.sessionFlips = 0;

    await database.saveStats({
      total: 0
    });

    updateCounterDisplay();
    setStatusMessage("Database wiped. Flip counter has been reset to 0000.", "RESET");
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
    // 1. Initialize Database & restore total count
    await database.init();
    const storedStats = await database.loadStats();
    state.totalFlips = storedStats.total || 0;

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
