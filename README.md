# 🧠 Memory Master: Pro Edition

![React](https://img.shields.io/badge/React-18-blue?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?logo=vite&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-Animation-black?logo=framer&logoColor=white)
![Material UI](https://img.shields.io/badge/Material_UI-Layout-007FFF?logo=mui&logoColor=white)

> A modern, high-performance Memory Game built to demonstrate advanced frontend logic, state persistence, and immersive user experience design.

## 🚀 Introduction

**Memory Master: Pro Edition** goes beyond the classic "Memotest". It's a fully responsive, interactive web application that prioritizes **sensory feedback**. From satisfying 3D flips to immersive sound effects generated via the **Web Audio API**, every interaction is designed to feel polished and professional.

This project showcases mastery over complex React state, custom hooks, and algorithmic logic, packaged in a sleek Dark Mode UI.

## ✨ Key Features

- **🎮 Dynamic Difficulty Levels**:
  - **Easy**: 4x2 grid (Beginner friendly).
  - **Medium**: 4x4 grid (Standard challenge).
  - **Hard**: 6x4 grid (For the true masters).
- **🏆 Persistence Systems**:
  - Local Leaderboard driven by `localStorage`.
  - Top 5 scores saved per difficulty category.
- **⚡ Advanced Visual Feedback**:
  - **3D Flip**: Smooth CSS/Motion card transitions.
  - **Pulse Effect**: Visual confirmation on matches.
  - **Shake Effect**: Immediate feedback on errors.
  - **Confetti**: Particle celebration on victory using `canvas-confetti`.
- **🔊 Immersive Audio**:
  - Custom sound engine (generated waveforms, no external assets).
  - Distinct sounds for Flipped, Matched, Error, and Win events.
  - Mute/Unmute toggle.
- **📱 100% Responsive**: Mobile-first design that adapts grids to any device size.

## 🛠️ Technical Deep Dive

This project leverages a sophisticated composition of Custom Hooks to separate logic from UI:

### 🧩 Custom Hooks

- **`useMemoryGame`**: The brain of the operation. Handles the game loop, shuffling algorithms, grid generation dynamic to difficulty, and the core matching logic.
- **`useLeaderboard`**: Manages the persistence layer. Reads/writes to `localStorage`, sorts scores by efficiency (Moves -> Time), and maintains the Top 5 rankings.
- **`useSound`**: A dependency-free audio engine. Uses the **Web Audio API** (`OscillatorNode`) to generate pleasant game sounds on the fly, eliminating the need for loading external audio files.

### ⚛️ State Management

- Complex coordination between `flippedCards`, `matchedCards`, and `shakeCards` states ensures animations fire at the exact right moments without race conditions.
- `useEffect` hooks manage the Game Timer and auto-flip logic with precise cleanups.

## 📦 Installation & Setup

Clone the repository and start the development server in seconds:

```bash
# 1. Clone the repository
git clone https://github.com/your-username/memory-master-pro.git

# 2. Navigate to project folder
cd memory-master-pro

# 3. Install dependencies
npm install

# 4. Start the game
npm run dev
```

## 🎓 Learnings & Demonstration

This project was built to demonstrate:

- **Algorithmic efficiency** in game state management.
- **Performance optimization** in React rendering (minimizing re-renders on the grid).
- **Advanced Animation** techniques using `Framer Motion` variants.
- **TypeScript** strict typing for robust and maintainable code.
- **UX/UI Design** principles using Material UI's theming system.

---

Made with ❤️ and TypeScript.
