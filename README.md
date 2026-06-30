# Business Technology & Operations Mission Control

A polished executive dashboard built with React + Tailwind CSS, designed for GitHub Pages deployment.

## Features

- Dark executive header
- KPI cards
- Mission status banner
- Three-column accordion layout:
  - 🚀 Launches
  - ✈️ In Flight
  - 🔴 Watch List
- Expand/collapse initiative cards with descriptions
- Organization-based filter chips
- Search across initiatives
- Light/Dark mode toggle
- Timeline section for May/June milestones
- Responsive design (mobile + desktop)
- Data-driven via JSON file
- Reusable component-based architecture

## Tech Stack

- React (Vite)
- Tailwind CSS
- Heroicons
- GitHub Pages (`gh-pages`)

## Local Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploy to GitHub Pages

```bash
npm run deploy
```

## Project Structure

- `src/App.jsx` – main dashboard UI and component composition
- `src/data/updates.json` – all KPI, initiative, org, and timeline data
- `src/index.css` – Tailwind/global styles
- `tailwind.config.js` – dark mode + theme config
- `vite.config.js` – GitHub Pages base path config
