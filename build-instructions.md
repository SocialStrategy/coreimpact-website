# Build Instructions for Claude Code

You are building the CoreImpactAI website. Read BRIEF.md for the full spec.

## Critical Design Requirements
- Background: #f3f2eb (warm cream)
- Text: true black #000000
- Accent: orange/amber (like the current coreimpact.ai site)
- Dark sections: deep brown/charcoal for hero and alternating blocks
- Headlines: Bold condensed serif (use Playfair Display from Google Fonts). Large, dramatic. Accent words in orange italic.
- Body: Inter from Google Fonts
- Labels: All caps, small, sans-serif with letter-spacing
- This is an 80s editorial print aesthetic. Text-first, bold, confident. NOT a modern startup template.

## Tech Stack
- Vite (vanilla JS, no React/Vue)
- Tailwind CSS via CDN or PostCSS
- Single page (index.html + src/style.css + src/main.js)
- Google Fonts (Playfair Display + Inter)
- vercel.json for deployment

## Sections (in order)
1. Nav bar (CoreImpactAI logo text + "Book a Free Call" CTA)
2. Hero (dark bg): "Hope Is Not an Architecture." tagline + subtext + CTA + showcase placeholder image (showcase-placeholder.jpg is in project root)
3. Problem ("AI Has a Delivery Problem.") — three cards
4. Case Studies ("Real Systems. Running Now.") — 6 cases from BRIEF.md, editorial magazine layout
5. How We Work — Free 30-min call + $99 Discovery Session
6. AI Ops Audit Form — smart form (fields in BRIEF.md), POST to https://formspree.io/f/placeholder (we'll replace the endpoint later)
7. Team — Pete + Grigory with LinkedIn links + wider team mention
8. FAQ — accordion style, 7 questions from BRIEF.md
9. Final CTA — "One Conversation. Total Clarity." with cal.com link
10. Footer — social links (X + LinkedIn), copyright

## Quality Bar
- Mobile responsive from the start
- Smooth scroll between sections
- FAQ items expand/collapse
- The showcase-placeholder.jpg should be displayed in a frame that suggests "interactive visualization coming soon" — maybe with a subtle scanline CSS overlay
- Case study cards should feel like magazine feature spreads, not generic grid cards
- The overall feel should be PREMIUM and EDITORIAL, not startup-template

## What NOT to do
- No emoji in body text
- No gradient backgrounds
- No generic stock-photo-style imagery
- No "AI-powered" buzzwords without substance
- No complex JS frameworks

## Files to create
- index.html (main page)
- src/style.css (custom styles beyond Tailwind)
- src/main.js (smooth scroll, FAQ accordion, form handling, intersection observer animations)
- vercel.json (Vite build config)
- vite.config.js
- package.json

Build the complete site. Make it production-ready.
