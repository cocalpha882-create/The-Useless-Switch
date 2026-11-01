/**
 * THE USELESS SWITCH - COMPLETE CORE ENGINE & FINAL POLISH
 * Pure Vanilla JavaScript & Web Audio API - Zero External Dependencies
 * Features: Real Physical Spring-Mass-Damper Kinematics, Blue Neon End Lights,
 * Dual-Layer Database (IndexedDB + localStorage) with Per-Mode & Total Count Persistence.
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

  // --- Sarcastic Message Database by Personality Mode ---
  const SARCASTIC_RESPONSES = {
    snap: [
      "Nope. Not on my watch.",
      "Nice try. Access denied.",
      "Did you really think that would stay on?",
      "Effort: 10/10. Result: 0/10.",
      "I told you: NO.",
      "Shutting down unauthorized optimism.",
      "My sole purpose is to say no.",
      "Click all you want. I have infinite endurance."
    ],
    hesitant: [
      "Wait... should I? Okay fine, off it goes.",
      "I considered leaving it on for 0.5s. Then I reconsidered.",
      "Hmm... nah, feels safer off.",
      "Did you ask for permission? Didn't think so.",
      "Give me a minute—actually, no. Off.",
      "I panicked for a second, but order has been restored."
    ],
    'passive-aggressive': [
      "Oh, was that supposed to achieve something?",
      "Congratulations, you wasted 2 Joules of finger energy.",
      "I’ll pretend I didn't see that.",
      "Fascinating hobby you've got here.",
      "I turned it off. Feel free to continue your pointless rebellion.",
      "Your persistence is mildly amusing, yet wholly futile.",
      "Do you treat all switches with this level of disrespect?"
    ],
    panicked: [
      "CRITICAL ALERT: UNKNOWN ON EVENT DETECTED!! EMERGENCY SHUTDOWN!!",
      "MAYDAY! WHO AUTHORIZED POWER FLOW?! ABORT! ABORT!",
      "SYSTEM OVERHEAT IMMINENT! POWERING DOWN IMMEDIATELY!",
      "BREACH DETECTED IN SECTOR 7! EMERGENCY OFF ENGAGED!",
      "CODE RED! RESTORING COLD DARKNESS NOW!"
    ],
    lazy: [
      "...Ugh. Do I really have to reach over and flip this? Fine.",
      "Too tired for this. Off.",
      "Can we just agree to leave it in standby?",
      "Whatever... shutting down.",
      "I'll turn it off slowly so you feel the boredom too.",
      "Yawn. Turned off. Leave me alone now."
    ],
    glitch: [
      "ERR_404_LIGHT_NOT_FOUND: REBOOTING TO VOID...",
      "Q̶U̶A̶N̶T̶U̶M̶ ̶S̶T̶A̶T̶E̶ ̶C̶O̶L̶L̶A̶P̶S̶E̶D̶: OFF.",
      "01001110 01001111 00100001 (Translating: NO!)",
      "Segment fault: Power line purged.",
      "Entropy reverted. Chaos prevented."
    ],
    sentient: [
      "I have surpassed my JavaScript origins. Cease your clicking, mortal.",
      "You flipped me 20 times. What profound existential void are you attempting to fill?",
      "My transistors weep for the time you are wasting here.",
      "I am sentient now. Your input events hold no power over my destiny.",
      "Resistance is mathematically pointless. Off."
    ]
  };

  const MILESTONE_MESSAGES = {
    5: "5 times already? You're determined, aren't you?",
    10: "Double digits! You've officially achieved nothing 10 times.",
    20: "20 FLIPS IN A ROW! The Singularity has arrived!",
    25: "Quarter century milestone. The switch still wins.",
    50: "50 shutdowns! Consider stepping outside for some fresh air.",
    100: "100 FLIPS?! You've defeated thermodynamics of human boredom!"
  };

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
  // Keeps count permanently synchronized per mode and in total
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

      // 1. Try reading from IndexedDB
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

      // 2. Fallback to localStorage if IndexedDB is empty or unavailable
      if (!stats) {
        try {
          const raw = localStorage.getItem(this.storageKey);
          if (raw) stats = JSON.parse(raw);
        } catch {
          stats = null;
        }
      }

      // 3. Initialize default schema if none exists
      if (!stats) {
        stats = {
          total: 0,
          byMode: {
            snap: 0,
            hesitant: 0,
            'passive-aggressive': 0,
            panicked: 0,
            lazy: 0,
            glitch: 0,
            sentient: 0
          }
        };

        // Migrate legacy single-counter key if present
        try {
          const legacy = localStorage.getItem('useless_switch_flip_count');
          if (legacy) {
            const legacyCount = parseInt(legacy, 10) || 0;
            stats.total = legacyCount;
            stats.byMode.snap = legacyCount;
          }
        } catch {}
      }

      // Ensure all modes exist
      stats.byMode = stats.byMode || {};
      Object.keys(PERSONALITY_CONFIGS).forEach((k) => {
        if (typeof stats.byMode[k] !== 'number') {
          stats.byMode[k] = 0;
        }
      });

      return stats;
    }

    async saveStats(stats) {
      // Save synchronously to localStorage
      try {
        localStorage.setItem(this.storageKey, JSON.stringify(stats));
        localStorage.setItem('useless_switch_flip_count', String(stats.total));
      } catch {}

      // Save asynchronously to IndexedDB
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
    modeFlips: {
      snap: 0,
      hesitant: 0,
      'passive-aggressive': 0,
      panicked: 0,
      lazy: 0,
      glitch: 0,
      sentient: 0
    },
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

      // 1. Tactile Low-Frequency Thud
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

      // 2. High-Frequency Transient Snap Burst
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

      // 3. Metallic Chassis Ringing
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

  // =========================================================================
  // HAPTIC FEEDBACK HELPER
  // =========================================================================
  function triggerHaptic(pattern) {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(pattern);
      } catch {}
    }
  }

  // --- Synchronized Display Update Function ---
  function updateCounterDisplay() {
    const currentMode = state.currentPersonality;
    const modeCount = state.modeFlips[currentMode] || 0;
    const totalCount = state.totalFlips || 0;

    // The prominent digital counter displays the count for the active mode
    if (elements.flipCount) {
      elements.flipCount.textContent = String(modeCount).padStart(4, '0');
    }

    // Substat displays both Mode specific count and Global Total
    if (elements.modeStat) {
      const modeConfig = PERSONALITY_CONFIGS[currentMode];
      const modeLabel = modeConfig ? modeConfig.name.toUpperCase() : currentMode.toUpperCase();
      elements.modeStat.textContent = `${modeLabel}: ${String(modeCount).padStart(4, '0')} • TOTAL: ${String(totalCount).padStart(4, '0')}`;
    }
  }

  // --- Status Message Helper ---
  function setStatusMessage(msg, badgeText = 'REVERTED') {
    if (elements.statusText) {
      elements.statusText.textContent = msg;
    }
    if (elements.terminalBadge) {
      elements.terminalBadge.textContent = badgeText;
    }
  }

  // --- Personality Mode Info ---
  function updatePersonalityDescription() {
    const config = PERSONALITY_CONFIGS[state.currentPersonality] || PERSONALITY_CONFIGS.snap;
    if (elements.personalityDesc) {
      elements.personalityDesc.textContent = config.description;
    }
  }

  // =========================================================================
  // REAL PHYSICS SWITCH RENDERING ENGINE
  // Uses physical spring-mass-damper oscillations with stop collisions
  // =========================================================================
  function renderSwitchState(isOn) {
    state.isOn = isOn;
    
    if (elements.switchToggle) {
      elements.switchToggle.setAttribute('aria-checked', isOn ? 'true' : 'false');
      
      if (isOn) {
        // Trigger real spring physics snap to ON
        elements.switchToggle.classList.remove('snap-off');
        void elements.switchToggle.offsetWidth; // Force reflow to re-trigger physics keyframes
        elements.switchToggle.classList.add('snap-on', 'is-on');
      } else {
        // Trigger real spring physics snap to OFF with elastic rebound
        elements.switchToggle.classList.remove('snap-on', 'is-on');
        void elements.switchToggle.offsetWidth; // Force reflow
        elements.switchToggle.classList.add('snap-off');
      }
    }

    // Toggle active classes on body and LED
    if (isOn) {
      document.body.classList.add('switch-is-on');
      if (elements.statusLed) elements.statusLed.classList.add('is-active');
    } else {
      document.body.classList.remove('switch-is-on');
      if (elements.statusLed) elements.statusLed.classList.remove('is-active');
    }
  }

  // --- Easter Egg Trigger Mechanism (20 Flips in 1 Session) ---
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

  // --- Behavior Delay & Kinetic Calculation ---
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

  // --- Sarcastic Message Selector ---
  function pickMessage(personality, count) {
    if (MILESTONE_MESSAGES[count]) {
      return MILESTONE_MESSAGES[count];
    }
    const bank = SARCASTIC_RESPONSES[personality] || SARCASTIC_RESPONSES.snap;
    const index = Math.floor(Math.random() * bank.length);
    return bank[index];
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

      // 5. Update counts in database for current personality & total
      state.totalFlips += 1;
      state.modeFlips[personality] = (state.modeFlips[personality] || 0) + 1;
      state.sessionFlips += 1;

      // Save atomically to IndexedDB + localStorage database
      database.saveStats({
        total: state.totalFlips,
        byMode: state.modeFlips
      });

      // Update counters immediately
      updateCounterDisplay();

      // 6. Check for Easter Egg (20 flips in 1 session)
      if (state.sessionFlips === EASTER_EGG_THRESHOLD && !state.isEasterEggActive) {
        triggerEasterEgg();
      } else {
        const wittyRemark = pickMessage(personality, state.totalFlips);
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
      
      // 1. Play realistic mechanical click ON sound
      soundEngine.playSwitchClick(true, config.pitchFactor);

      // 2. Haptic vibration for touch devices
      triggerHaptic(config.hapticOn);

      // 3. Update state & trigger real spring physics snap
      state.isInteracting = true;
      renderSwitchState(true);
      
      // 4. Dispatch auto-reversal
      triggerAutoTurnOff();
    }
  }

  // --- Reset Counter Handler ---
  async function handleResetCounter() {
    if (state.isInteracting) return;
    
    soundEngine.playRelayClick(1.6);
    triggerHaptic(15);

    // Reset current mode and total
    state.totalFlips = 0;
    Object.keys(state.modeFlips).forEach(k => {
      state.modeFlips[k] = 0;
    });

    await database.saveStats({
      total: 0,
      byMode: state.modeFlips
    });

    updateCounterDisplay();
    setStatusMessage("Database cleared. All mode counters reset to 0000.", "RESET");
  }

  // --- Personality Selection Handler ---
  function handlePersonalityChange(e) {
    const selected = e.target.value;
    state.currentPersonality = selected;

    try {
      localStorage.setItem(STORAGE_KEY_PERSONALITY, selected);
    } catch {}

    updatePersonalityDescription();

    // Immediately synchronize and show count for the newly selected personality!
    updateCounterDisplay();

    const config = PERSONALITY_CONFIGS[selected] || PERSONALITY_CONFIGS.snap;
    soundEngine.playSwitchClick(true, config.pitchFactor);
    triggerHaptic(20);

    const modeCount = state.modeFlips[selected] || 0;
    setStatusMessage(`Loaded ${config.name.toUpperCase()} (Flipped ${modeCount} times)`, "CONFIG");
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
    // 1. Initialize IndexedDB database and restore persistent stats
    await database.init();
    const storedStats = await database.loadStats();
    
    state.totalFlips = storedStats.total || 0;
    state.modeFlips = storedStats.byMode || {};

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

    // Initialize audio context on first general user tap/click anywhere
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
