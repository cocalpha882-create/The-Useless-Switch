/**
 * THE USELESS SWITCH - COMPLETE CORE ENGINE & FINAL POLISH (Phases 3, 4 & 5)
 * Pure Vanilla JavaScript & Web Audio API - Zero External Dependencies
 */

(() => {
  'use strict';

  // --- Constants & Storage Keys ---
  const STORAGE_KEY_COUNT = 'useless_switch_flip_count';
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
    resetBtn: document.getElementById('reset-counter-btn'),
    personalitySelect: document.getElementById('personality-select'),
    personalityDesc: document.getElementById('personality-desc')
  };

  // --- Internal State ---
  const state = {
    isOn: false,
    isInteracting: false,
    flipCount: 0,
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

    // Pre-bake 0.1s of white noise for transient mechanical snap friction
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

    /**
     * Synthesize realistic physical toggle snap
     * @param {boolean} isTurningOn - Direction of the flip
     * @param {number} pitchMultiplier - Scaled by personality
     */
    playSwitchClick(isTurningOn = true, pitchMultiplier = 1.0) {
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const baseFreq = (isTurningOn ? 320 : 220) * pitchMultiplier;

      // 1. Tactile Low-Frequency Thud (Sub impulse body)
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

      // 2. High-Frequency Transient Snap Burst (Simulates physical metal contacts)
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

      // 3. Metallic Chassis Ringing (Micro resonance)
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

    /**
     * Subtle relay micro-click for hesitant wavering
     */
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

    /**
     * Urgent alarm chimes for panicked mode
     */
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

    /**
     * Cybernetic FM glitch buzz for quantum mode
     */
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

    /**
     * Easter Egg Fanfare: Ascending sci-fi synth arpeggio
     */
    playEasterEggFanfare() {
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50]; // C Major arpeggio
      
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
      } catch {
        // Haptics disabled or unavailable
      }
    }
  }

  // --- Counter Helper Functions ---
  function loadStoredCount() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_COUNT);
      return stored ? Math.max(0, parseInt(stored, 10) || 0) : 0;
    } catch {
      return 0;
    }
  }

  function saveStoredCount(count) {
    try {
      localStorage.setItem(STORAGE_KEY_COUNT, String(count));
    } catch {
      // Storage unavailable fallback
    }
  }

  function updateCounterDisplay() {
    if (elements.flipCount) {
      elements.flipCount.textContent = String(state.flipCount).padStart(4, '0');
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

  // --- Physical Switch Rendering Engine ---
  function renderSwitchState(isOn) {
    state.isOn = isOn;
    
    if (elements.switchToggle) {
      elements.switchToggle.setAttribute('aria-checked', isOn ? 'true' : 'false');
      if (isOn) {
        elements.switchToggle.classList.add('is-on');
      } else {
        elements.switchToggle.classList.remove('is-on');
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

    // Synthesize celebration sci-fi arpeggio
    soundEngine.playEasterEggFanfare();
    triggerHaptic([40, 40, 40, 40, 80, 80, 180]);

    // Append and activate Sentient mode in the dropdown if not present
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
    
    // Execute personality pre-action
    if (routine.preAction) routine.preAction();

    // Schedule auto-off revert
    setTimeout(() => {
      // 1. Synthesize realistic mechanical click OFF sound
      soundEngine.playSwitchClick(false, config.pitchFactor);

      // 2. Trigger tactile haptic feedback for auto-off
      triggerHaptic(config.hapticOff);

      // 3. Programmatically snap lever back to OFF
      renderSwitchState(false);
      
      // 4. Execute routine cleanups
      if (routine.postAction) routine.postAction();

      // 5. Update counts
      state.flipCount += 1;
      state.sessionFlips += 1;
      saveStoredCount(state.flipCount);
      updateCounterDisplay();

      // 6. Check for Easter Egg (20 flips in 1 session)
      if (state.sessionFlips === EASTER_EGG_THRESHOLD && !state.isEasterEggActive) {
        triggerEasterEgg();
      } else {
        // Output witty/sarcastic response
        const wittyRemark = pickMessage(personality, state.flipCount);
        setStatusMessage(wittyRemark, state.isEasterEggActive ? 'SENTIENT' : 'OFFLINE');
      }

      // 7. Brief refractory delay before unlocking user input
      setTimeout(() => {
        state.isInteracting = false;
        if (elements.terminalBadge) {
          elements.terminalBadge.textContent = state.isEasterEggActive ? 'SENTIENT' : 'READY';
        }
      }, 140);
    }, routine.delayMs);
  }

  // --- User Interaction Handler ---
  function handleToggleFlip(event) {
    if (event && event.preventDefault) {
      event.preventDefault();
    }

    // Lockout guard: Ignore interactions while an auto-reset sequence is in progress
    if (state.isInteracting) {
      return;
    }

    // If currently OFF, flipping turns it ON and triggers auto-reversal
    if (!state.isOn) {
      const config = PERSONALITY_CONFIGS[state.currentPersonality] || PERSONALITY_CONFIGS.snap;
      
      // 1. Play realistic mechanical click ON sound
      soundEngine.playSwitchClick(true, config.pitchFactor);

      // 2. Haptic vibration for touch devices
      triggerHaptic(config.hapticOn);

      // 3. Update state & UI
      state.isInteracting = true;
      renderSwitchState(true);
      
      // 4. Dispatch auto-reversal
      triggerAutoTurnOff();
    }
  }

  // --- Reset Counter Handler ---
  function handleResetCounter() {
    if (state.isInteracting) return;
    
    soundEngine.playRelayClick(1.6);
    triggerHaptic(15);

    state.flipCount = 0;
    saveStoredCount(0);
    updateCounterDisplay();
    setStatusMessage("Flip counter reset to 0000. Your past failures have been wiped.", "RESET");
  }

  // --- Personality Selection Handler ---
  function handlePersonalityChange(e) {
    const selected = e.target.value;
    state.currentPersonality = selected;
    try {
      localStorage.setItem(STORAGE_KEY_PERSONALITY, selected);
    } catch {
      // ignore
    }
    updatePersonalityDescription();

    const config = PERSONALITY_CONFIGS[selected] || PERSONALITY_CONFIGS.snap;
    soundEngine.playSwitchClick(true, config.pitchFactor);
    triggerHaptic(20);

    setStatusMessage(`Personality matrix loaded: ${config.name.toUpperCase()}`, "CONFIG");
  }

  // --- Global Keyboard Controls ---
  function handleGlobalKeyDown(e) {
    // Only capture Space and Enter
    if (e.key === ' ' || e.key === 'Enter') {
      const target = e.target;
      const isSelect = target && target.tagName === 'SELECT';
      const isResetBtn = target && target.id === 'reset-counter-btn';

      // Allow native behavior on dropdowns and buttons
      if (isSelect || isResetBtn) {
        return;
      }

      // Prevent page scrolling on Spacebar and toggle switch
      e.preventDefault();
      handleToggleFlip();
    }
  }

  // --- Initialize Application ---
  function init() {
    // 1. Load persisted count
    state.flipCount = loadStoredCount();
    updateCounterDisplay();

    // 2. Load stored personality preference if available
    try {
      const savedPersonality = localStorage.getItem(STORAGE_KEY_PERSONALITY);
      if (savedPersonality && PERSONALITY_CONFIGS[savedPersonality] && savedPersonality !== 'sentient') {
        state.currentPersonality = savedPersonality;
        if (elements.personalitySelect) {
          elements.personalitySelect.value = savedPersonality;
        }
      }
    } catch {
      // ignore
    }
    updatePersonalityDescription();

    // 3. Ensure initial resting state is OFF
    renderSwitchState(false);

    // 4. Attach Event Listeners
    if (elements.switchToggle) {
      elements.switchToggle.addEventListener('click', handleToggleFlip);

      // Touch optimization: prime audio context on touchstart
      elements.switchToggle.addEventListener('touchstart', () => {
        soundEngine.init();
      }, { passive: true });
    }

    // Global keyboard support: Space and Enter keys anywhere
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
