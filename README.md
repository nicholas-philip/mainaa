# love-story

A cute romantic digital scrapbook — Girlfriend's Day website. React + Vite +
Tailwind CSS + Framer Motion, no backend required.

## Run it

```bash
npm install
npm run dev
```

Then open the printed local URL (usually `http://localhost:5173`).

Build for production:

```bash
npm run build
npm run preview
```

## Customize

**Text** — edit directly in these files:
- `src/pages/PageLetter.jsx` — the `LETTER` string
- `src/pages/PageFinal.jsx` — closing line
- `src/data/reasons.js`, `src/data/timeline.js`, `src/data/dreams.js`, `src/data/quotes.js`

**Photos** — drop images into `public/images/` using these exact names
(or update the paths in the page files):
- `memory-1.jpg` … `memory-4.jpg` → gallery page (`PageGallery.jsx`)
- `collage-1.jpg` … `collage-6.jpg` → collage page (`PageCollage.jsx`)

Until you add real files, those slots show a soft pink placeholder instead
of a broken image — nothing crashes.

**Music** — drop one audio file at `public/music/song.mp3`. The mute button
and play/pause controls on the music page work automatically once it's
there; if it's missing, the controls just stay silent instead of erroring.

**Colors / fonts** — all defined as design tokens in `tailwind.config.js`
under `theme.extend.colors.blush` and `theme.extend.fontFamily`.

## Structure

```
love-story/
├── public/
│   ├── images/       ← your photos go here
│   ├── music/         ← your song goes here
│   └── favicon.png
├── src/
│   ├── components/    Landing gift, nav chrome, confetti, ambient FX
│   ├── pages/          The 10 scrapbook pages
│   ├── data/            Editable content (reasons, timeline, quotes, dreams)
│   ├── hooks/           useAudio — background music control
│   ├── App.jsx           Page flow, page-flip transitions, keyboard nav
│   └── index.css
└── ...
```

## Navigation

- Click the gift on the landing screen to open the scrapbook.
- Arrow buttons or **← / →** keys move between pages.
- Progress dots at the bottom show where you are.
- Replay button on the last page restarts from page one.
