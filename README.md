# Bima Sangkur — Web Developer Portfolio

A personal portfolio landing page built to demonstrate design and front-end development skills. Swiss/editorial-influenced design: black and white with a single red accent, bold display type, asymmetric layout. Plain HTML, CSS, and JavaScript, no framework, no build step.

## Demo

Add the live demo link here once deployed.

## Features

- Bold, asymmetric hero with a tilted browser mockup that overlaps the text column
- Section headers styled as editorial margin notes (large ghost numerals beside each heading)
- Services, process, and an asymmetric work showcase (one featured project, three smaller)
- Stats that count up when scrolled into view
- Testimonials, three-tier pricing, and an FAQ accordion
- Scroll-triggered reveal animations (Intersection Observer)
- Mobile nav with a hamburger menu
- Respects `prefers-reduced-motion` — animations turn off automatically for users who have that preference set
- Decorative elements (section numerals, work initials) are marked `aria-hidden` so screen readers only announce real content

## Tech Stack

HTML5, CSS3 (custom properties, keyframe animation, CSS Grid), JavaScript ES6+ (class-based), Bricolage Grotesque and Instrument Sans from Google Fonts.

## Project Structure

```
├── index.html    # Page structure, all sections
├── style.css     # Design, layout, animation, responsive rules
├── script.js     # Interactions: mobile nav, scroll reveal, counters, FAQ
├── .gitignore    # Keeps local editor/tool config out of the repo
└── README.md
```

## Running It

No build step, no dependencies to install. Open `index.html` in a browser.

## Note

The projects, stats, testimonials, and pricing shown on this page are illustrative examples for demo purposes, not real client work or figures.

## License

MIT
