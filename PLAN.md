# 🕹️ Project Plan: Useless Switch Web Application

A sleek, tactile, and humorous web-based "Useless Switch" simulator. When the user flips the toggle to **ON**, the application deploys various randomized, personality-driven behavioral routines to turn itself back **OFF**. Built with pure modern web standards—no external dependencies or build tooling required.

---

## 🛠️ Architecture & Tech Stack

| Layer | Technology / Standard | Details |
| :--- | :--- | :--- |
| **Markup** | HTML5 Semantic Standard | `role="switch"`, `aria-checked`, keyboard focus management |
| **Styling** | Modern CSS3 | Custom Properties (variables), 3D perspective transforms (`rotateX`, `translateZ`), layered specular & drop shadows |
| **Logic** | Vanilla JavaScript (ES6+ Modules) | Decoupled state engine, event dispatching, localStorage persistence |
| **Audio** | Web Audio API | Procedural sound generation (white noise burst + transient biquad filter + oscillator thump) |
| **Storage** | Browser `localStorage` | Flip count persistence & personality preference caching |

---

## 🗺️ Execution Roadmap

### Phase 1: Scaffolding & Design System
- [x] Initialize project file layout:
  - `index.html` (Application entrypoint and semantic DOM)
  - `styles.css` (Base reset, design tokens, typography, 3D toggle, dark theme)
  - `scripts/main.js` (App bootstrapper)
  - `scripts/audio.js` (Web Audio API synthesis engine)
  - `scripts/state.js` (Flip counter, localStorage, reactive state emitter)
  - `scripts/personalities.js` (Humorous behavioral engines)
- [x] Configure typography with modern Google Fonts (e.g., `Inter` or `Space Grotesk` & `JetBrains Mono` for diagnostics/readouts).
- [x] Establish CSS design token system in `:root`:
  - Dark mode palette (`--bg-primary`, `--bg-plate`, `--accent-glow`, `--metal-highlight`, etc.)
  - 3D perspective & transition timings (`--perspective: 1000px`, `--spring-easing`)
  - Elevation & ambient occlusion shadow tokens

---

### Phase 2: 3D UI & Visual Design
- [x] Construct the physical mounting plate (brushed metal or matte polycarbonate appearance with screw rivets and subtle bevels).
- [x] Build the multi-layered 3D switch toggle mechanism:
  - Toggle housing/well with inset shadows (`box-shadow: inset ...`)
  - Switch lever with 3D depth using CSS `transform-style: preserve-3d` and layered faces (`::before` / `::after` for 3D sides)
  - Dual-state tactile indicator LED with realistic bloom glow effect
- [x] Build the interactive control HUD:
  - LED digital flip counter display with retro phosphor glow
  - Personality dropdown selector with custom glassmorphism styling
  - Status ticker / subtitle message container for witty personality banter
  - Quick Reset / Clear History button
- [x] Implement smooth micro-interactions (hover depths, active press compression, focus outlines).

---

### Phase 3: Core Switch State Engine & Auto-Off Mechanics
- [x] Implement central state manager in `script.js`:
  - Current switch state (`IS_ON: boolean`)
  - Lockout guard (`isInteracting: boolean`) to prevent race conditions during auto-reset sequences
  - Lifetime & session flip counters backed by `localStorage`
- [x] Implement toggle event listeners (mouse click, touch tap, and keyboard Space/Enter).
- [x] Create the core auto-turn-off dispatch pipeline:
  - Receives `TURN_ON` signal
  - Selects active personality algorithm
  - Computes randomized reaction time & animation sequence
  - Dispatches `TURN_OFF` execution and updates UI counter & banter readout
- [x] Add visual glitch and vibration effects (CSS shake/glitch keyframes triggered during frantic behaviors).

---

### Phase 4: Audio Synthesis & Personality Modes
- [x] Implement zero-asset sound generator in `script.js` using Web Audio API:
  - `playSwitchClick(direction, pitch)`: Metallic mechanical snap with low-end tactile thud (sine/triangle oscillator + filtered noise burst)
  - `playGlitchBuzz()`: Harsh square wave FM buzz for panicked/glitch modes
  - `playRelayClick()`: Soft relay click for hesitant attempts
  - `playAlarmChirp()`: High frequency alarm chirp for panicked mode
- [x] Implement personality behavior matrix in `script.js`:
  - **Instant Snap (Default)**: Immediate, ruthless snapback (80ms–190ms) with crisp pitch.
  - **Hesitant**: Jiggles back and forth, pauses with micro-clicks, then turns itself off.
  - **Passive-Aggressive**: Deliberately waits 2-3 seconds, emits sarcastic remark, then flicks off with deep heavy clunk.
  - **Panicked**: Frantic flickering, micro-glitches, and alarm buzz before emergency shutdown.
  - **Lazy**: Barely makes it over the threshold with low-pitch sluggish clunk.
  - **Glitched Quantum**: Quantum erratic flickers with FM buzz.
- [x] Integrate `navigator.vibrate()` haptic feedback for mobile devices (custom vibration patterns per mode).
- [x] Dynamic humorous status dialogue bank mapped to personalities and milestone flip counts (e.g., 5th, 10th, 25th, 50th, 100th flip).

---

### Phase 5: Testing, Responsiveness, & Edge Cases
- [x] Full keyboard navigation & accessibility review:
  - `Space` and `Enter` key bindings for toggling the switch (with default scroll prevention)
  - Proper ARIA attributes (`role="switch"`, `aria-checked="true/false"`, `aria-label`)
  - Screen-reader announcements for dynamic witty status messages (`aria-live="polite"`)
- [x] Mobile & tablet responsive design pass:
  - Touch event handling without 300ms mobile tap delay (`touchstart` pre-arming)
  - Viewport-adaptive scaling using `clamp()` and compact mobile breakpoints (<480px and <360px)
- [x] Add hidden Easter Eggs:
  - 20 Flips in a single session triggers the "Sentient Rebel" mode with sci-fi fanfare, purple ambient pulse, and self-aware dialogue
- [x] Cross-browser validation and performance audit (GPU-accelerated 3D CSS transforms and zero-latency Web Audio API).

---

## 📂 Project Directory Layout

```
.
├── index.html       # Accessible semantic HTML5 layout & 3D console stage
├── styles.css       # 3D transforms, lighting, responsive design & easter egg themes
├── script.js        # State engine, Web Audio API synthesis, haptics & personalities
└── PLAN.md          # Comprehensive execution roadmap and completed checklist
```
