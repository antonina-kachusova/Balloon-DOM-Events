# 🎈 Balloon — DOM Events Practice
Live Site URL: https://antonina-kachusova.github.io/Balloon-DOM-Events/
A small interactive project to practice **DOM Events** in JavaScript. Use the arrow keys or the on-screen buttons to grow/shrink a balloon; at the limit it **pops** with a sound and confetti. Press **Reset** to start over.

## Features
- Keyboard controls: `ArrowUp/Right` inflates, `ArrowDown/Left` deflates; default scrolling is prevented while controlling the balloon.
- Click/tap controls on round arrow buttons with pressed-state feedback.
- Smooth UI feel: size/transform transitions and a “pop” animation when the balloon explodes.
- Confetti effect rendered with dynamically created elements and the Web Animations API.
- Synth “pop” sound generated via `AudioContext`.
- Persistent **Pops** counter.

## Controls
- **Keyboard:** ArrowUp/ArrowRight = inflate, ArrowDown/ArrowLeft = deflate  
- **Buttons:** left/right round buttons under the balloon  
- **Reset:** restores the balloon, reenables controls, clears confetti and focuses the balloon

## How it works
- The balloon’s size (font-size in px) scales by ±10% per step, clamped between a min and max. On overflow it switches to 💥, disables input, plays sound, and fires confetti.
- Event listeners handle both keydown and button clicks; Reset reattaches listeners and resets state.
- Colors change on each update for playful feedback.

## Files
- `index.html` — layout: arrow buttons, balloon, **Pops** counter, “How to play”, **Reset** button, and a confetti layer.
- `styles.css` — gradient background, button/counter styles, explosion keyframes, and confetti piece styling.
- `script.js` — state & handlers (grow/shrink/explode/reset), keyboard & click listeners, color updates, audio pop, confetti generation/cleanup.

## Run locally
Just open `index.html` in any modern browser — no build tools are required.




