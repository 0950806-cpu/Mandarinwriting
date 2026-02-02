# MandarinWriting (Traditional Chinese)

This project is a small web app to practice handwriting Traditional Chinese characters. Only Traditional Chinese characters are included — no simplified characters are allowed.

Getting started

1. Install dependencies

   npm install

2. Start dev server

   npm run dev

3. Build

   npm run build

Notes
- The project uses Vite + React + TypeScript + Tailwind.
- Characters are currently a small set placed in `src/data/characters.ts`. For production, extract stroke paths from HanziWriter (or an open dataset) to improve scoring.

If you want, I can:
- Replace placeholder stroke arrays in `src/data/characters.ts` with stroke path data extracted from HanziWriter for accurate per-stroke scoring.
- Add tests and CI.
- Add mobile-specific UI improvements.
