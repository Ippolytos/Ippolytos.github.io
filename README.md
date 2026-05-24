# Hropiberhtaz — Creative Tools Suite

A multi-page website with 5 precision creative tools. Hosted via GitHub Pages.

## Pages

| File | Tool |
|------|------|
| `index.html` | Home / Landing page |
| `colordrop.html` | ColorDrop — HSV color picker |
| `hue.html` | HUE — Image color editor |
| `chroma.html` | Chroma — Image recolor |
| `upscale.html` | UpScale — Lanczos-3 image upscaler |
| `urlclean.html` | URLClean — URL tracker stripper |
| `shared.css` | Shared styles (used by all pages) |
| `shared.js` | Shared JavaScript (used by all pages) |

## Deploy to GitHub Pages

1. Create a new GitHub repository (e.g. `yourusername/hropiberhtaz`)
2. Upload **all files** from this folder into the repo root
3. Go to **Settings → Pages → Source → Deploy from branch → main → / (root)**
4. Your site will be live at `https://yourusername.github.io/hropiberhtaz/`

> Make sure `.nojekyll` is included — it tells GitHub Pages not to run Jekyll processing.

## Features
- Yin-yang background that rotates on scroll
- Dark / light theme toggle (persists via localStorage)
- Lo-fi ambient audio player
- Floating particle system
- Ripple click effects
- All processing is 100% client-side — no server needed
