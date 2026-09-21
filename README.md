# Velvet Roll Co. — Website

A luxury, award-style website for Velvet Roll Co., a 100% halal dessert sushi cart based in
Scotland. Built from the [Website PRD](https://claude.ai/artifact/9c7s7vwzXP9r7AAFxBpdAu): a
cinematic, scroll-driven 3D homepage plus Menu, Events & Weddings, Gallery and Book pages.

## Stack

- **Next.js 15** (App Router) + **React 19** + TypeScript
- **Tailwind CSS** for styling, with the brand's velvet/gold tokens in `tailwind.config.ts`
- **React Three Fiber v9** + drei v10 for the procedural 3D dessert-roll scene (no external 3D
  models required — everything is built from primitives so it renders anywhere)
- **GSAP ScrollTrigger** + **Lenis** for the smooth, scrubbed scroll story
- **Framer Motion** for UI transitions
- **Resend** for the enquiry form's email delivery
- **Zod** for form validation (shared between client and API route)

React 19 / R3F v9 is a deliberate pairing: Next.js 15 vendors its own internal React build for
parts of its App Router runtime, and mixing that with an app pinned to React 18 breaks
`react-reconciler`'s internals lookup inside `@react-three/fiber` (`ReactCurrentOwner`/
`ReactCurrentBatchConfig` read off `undefined`). Aligning the whole app on React 19 removes the
version split entirely.

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in real values, see below
npm run dev
```

Open http://localhost:3000.

## Environment variables

See `.env.example`. Required for the enquiry form to actually send email:

- `RESEND_API_KEY` — from [resend.com](https://resend.com). Without it, the form still works
  and returns a success state, but enquiries are only logged server-side (`delivered: false`)
  rather than emailed — safe placeholder behaviour for development.
- `ENQUIRY_TO_EMAIL` — where enquiries are sent (the owner's inbox).
- `ENQUIRY_FROM_EMAIL` — the verified sending address/domain in Resend.
- `NEXT_PUBLIC_SITE_URL` — used in metadata, sitemap and LocalBusiness schema.
- `NEXT_PUBLIC_INSTAGRAM_URL` / `NEXT_PUBLIC_WHATSAPP_NUMBER` — for the DM/WhatsApp buttons.

## Content still needed from the owner

The site ships with clearly-labelled placeholder art (`public/images/**/*.svg`, all reading
"PLACEHOLDER — REPLACE WITH PHOTO") so it's demo-ready today. Before launch, swap in:

- [ ] Logo as SVG or high-res transparent PNG (`public/images/logo.jpg` is currently the
      provided reference screenshot)
- [ ] Final roll names, descriptions, allergens and dips (edit `src/lib/content.ts` → `ROLLS`)
- [ ] Studio photos of each roll + 5–10 event photos of the cart
- [ ] Halal statement specifics: certified supplier, ingredients policy
      (`src/lib/content.ts` → `HALAL_STATEMENT`)
- [ ] 3–5 real testimonials (`TESTIMONIALS`)
- [ ] Business email, WhatsApp number, domain name (`.env.local` + `SITE` in `content.ts`)
- [ ] Package names and "from" prices, if you want to show them (`PACKAGES`)

### Open questions from the PRD

- Which areas of Scotland do you travel to, and is there a travel fee?
- Minimum booking size or spend?
- Show prices publicly, or quote only?
- Is there a specific halal certification to name?

## Project structure

```
src/
  app/                    Routes: /, /menu, /events, /gallery, /book, /api/enquiry
  components/
    home/scroll-story/    The 9-scene 3D scroll story (GSAP + R3F)
    layout/                Header, Footer, sticky mobile "Book" button
    menu/ events/ gallery/ book/   Per-page components
    ui/                     Shared primitives (gold divider, section label)
    providers/              Lenis smooth-scroll provider
  lib/
    content.ts              All site copy — rolls, packages, FAQs, testimonials, scroll scenes
    validation.ts            Zod schema for the enquiry form
    theme.ts / schema.ts     Colour tokens for Three.js, LocalBusiness JSON-LD
```

## Accessibility & performance notes

- `prefers-reduced-motion` swaps the 3D scroll story for a static, fading section list
  (`StaticFallback.tsx`) — no WebGL, no scroll-jacking.
- All scroll-story copy is real HTML text layered over the canvas (readable, indexable), with a
  screen-reader-only ordered summary of every scene.
- The 3D canvas is dynamically imported (`ssr: false`) and mounted one frame after the hero
  text paints, and particle counts scale down on mobile.
- Sparkle/particle counts and DPR are reduced under `useIsMobile`.

## Known `npm audit` finding

`npm audit` reports 1 moderate + 1 high finding for `postcss` — but that's Next.js's own
*internal* bundled copy (`node_modules/next/node_modules/postcss`), used only by Next's build
tooling, not the project's own pinned `postcss` dependency. Clearing it requires jumping to
Next.js 16, which is a breaking change outside this project's scope right now; revisit when
Next 16 has settled.
