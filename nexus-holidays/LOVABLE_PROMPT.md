Build a premium, cinematic marketing website for a travel agency called **Nexus Holidays**. Tagline: "Global Destinations, Unforgettable Memories." Two pages: a home page and a contact page.

## Brand
- Colors (dark theme throughout, never light): deep navy `#0B1B33` (section background), darkest navy `#01173C` (footer/darkest bands), navy-soft `#142A4A` (borders/cards), gold `#D9A94A` (primary accent), gold-bright `#F8CF5A` (hover state), sunset orange `#F0834D` (sparing highlight), ink white `#FFFFFF`, muted ink `#B9C4D6` (secondary text).
- Fonts: display headings in "Outfit" (600/700 weight, tight letter-spacing), body text in "Inter Tight", small uppercase kicker labels/tags in "IBM Plex Mono".
- I'll upload the real Nexus Holidays logo (navy background, gold plane-and-arc icon, white "NEXUS" wordmark, gold "HOLIDAYS" subtext) — use it in the nav and footer with its background removed/transparent. Derive a favicon from the icon mark alone.
- No em-dashes anywhere in copy. No filler marketing words like "seamless" or "revolutionize."

## Home page structure, top to bottom

### 1. Nav (fixed/sticky, transparent over the hero)
Logo on the left. Center links: "Bespoke Holidays", "Destinations", "Why Nexus" (smooth-scroll to in-page anchors). Right side: a "Contact Now" pill button — gold outline, fills with a gold gradient sweep on hover, text inverts to navy — linking to the contact page. Collapse into a hamburger menu below 860px width.

### 2. Hero: a scroll-scrubbed flight journey (the centerpiece)
This is the most important section. Build a tall (about 500vh) pinned/sticky full-viewport video section where **scrolling plays a cinematic flight sequence forward and backward** — the video's current time is driven directly by scroll position, not autoplay. Use four video clips, stacked and cross-faded based on which "leg" of the journey the scroll position falls into (weight each leg's share of the scroll range roughly by its own duration):

1. **Boarding** (kicker "Departure") — starts looking out an airplane's oval window at golden clouds, descends and ends at a tropical beach. Headline: "Every window seat starts a story." Body: "Fasten in. Nexus Holidays turns take off into the first chapter of your holiday, all the way down to the beach below." Tags: "Private check in", "Priority boarding". Video: https://d8j0ntlcm91z4.cloudfront.net/user_3I7oktfELrYq5ptET2i2xFrfTSZ/hf_20260919_233032_21ba469c-2bd7-491e-91dd-8ef023015e83.mp4 — poster: https://d8j0ntlcm91z4.cloudfront.net/user_3I7oktfELrYq5ptET2i2xFrfTSZ/hf_20260919_230141_f1e00c9b-ba72-423d-80f0-091ff5f290d6.png
2. **Paradise Found** (kicker "Arrival") — gliding low over a turquoise lagoon and overwater villas. Headline: "Turquoise water, zero itinerary stress." Body: "We match you to the shoreline built for the way you actually holiday." Tags: "Private villas", "Beachfront transfers". Video: https://d8j0ntlcm91z4.cloudfront.net/user_3I7oktfELrYq5ptET2i2xFrfTSZ/hf_20260919_233608_2a7dd6b6-73b1-433d-99bd-3a76f5e50bb2.mp4 — poster: https://d2ol7oe51mr4n9.cloudfront.net/user_3I7oktfELrYq5ptET2i2xFrfTSZ/2fa227fd-3c1f-4c86-9b6b-2c86e817334b.png
3. **Dubai Nights** (kicker "Destination 02") — flying toward the Dubai skyline at dusk, Burj Khalifa and Burj Al Arab. Headline: "Skylines built for golden hour." Body: "From Burj views to desert dusk, Dubai unfolds exactly the way you pictured it." Tags: "Five star stays", "Desert excursions". Video: https://d8j0ntlcm91z4.cloudfront.net/user_3I7oktfELrYq5ptET2i2xFrfTSZ/hf_20260919_234009_f3c13941-35a6-414a-ab9a-9e01a93a1954.mp4 — poster: https://d2ol7oe51mr4n9.cloudfront.net/user_3I7oktfELrYq5ptET2i2xFrfTSZ/76011b65-8d9c-40ab-a027-8156ce966f08.png
4. **Santorini Sunsets** (kicker "Destination 03") — arriving at Santorini's white and blue cliffside buildings over the Aegean at sunset. Headline: "The postcard, made real." Body: "Cliffside sunsets over the Aegean, held for you at the exact table with the view." Tags: "Cliffside suites", "Private sunset dining". Video: https://d8j0ntlcm91z4.cloudfront.net/user_3I7oktfELrYq5ptET2i2xFrfTSZ/hf_20260919_234410_4d202775-cfd9-4c79-ab4b-3a51725a496e.mp4 — poster: https://d2ol7oe51mr4n9.cloudfront.net/user_3I7oktfELrYq5ptET2i2xFrfTSZ/a1f54559-e60d-43b9-ab44-e1174a98b9b0.png

Each chapter's text (kicker, headline, body, tags) is positioned bottom-left or bottom-right alternating per chapter, over a dark gradient scrim on the video, and fades/slides in with a subtle 3D transform (translateY + slight rotateX) as its leg becomes active — never purely opacity-triggered on scroll, always combined with a transform so it stays screenshot-safe. Add a vertical progress-dot indicator on the right edge showing which of the 4 legs is active, and a small "Scroll" hint at the bottom-center that fades out once the user starts scrolling.

Videos are muted, `playsinline`, and never autoplay-loop — they only move because the user scrolls (pause them and set `currentTime` programmatically). Respect `prefers-reduced-motion`: show the last video's poster frame statically and skip the scrub entirely.

### 3. Bespoke Holidays (asymmetric two-column section)
Left: eyebrow "Bespoke Holidays", headline "A holiday planned around you, not a template.", a paragraph about a dedicated specialist building itineraries leg by leg, and a short checklist ("One specialist, from first call to landing home", "Itineraries built around your dates, not a fixed package", "Direct access if a flight changes or plans shift mid trip"). Right: a large image in a rounded frame with a subtle parallax drift on scroll (use a warm sunset/ocean photo — I'll upload one, or generate a placeholder).

### 4. Destinations (bento grid)
Eyebrow "Destinations", headline "Where we fly you". A grid: one large tile (Maldives, spans full width on desktop) plus two smaller tiles (Dubai, Santorini), plus a fourth tile that's a plain text CTA card ("Not seeing your destination / Ask your specialist / We plan trips well beyond this list.") linking to the contact page. Each photo tile: image fills the card, dark gradient scrim at the bottom, destination name + one-line note, a small index number top-right, and an "Explore →" label that's hidden until hover (slides up and fades in). On hover the image zooms in slightly and the whole card gets a subtle 3D tilt that follows the cursor position. Photos:
- Maldives: https://d8j0ntlcm91z4.cloudfront.net/user_3I7oktfELrYq5ptET2i2xFrfTSZ/hf_20260919_230141_a082e033-469b-486c-8756-03ca10e1c4a9.png
- Dubai: https://d8j0ntlcm91z4.cloudfront.net/user_3I7oktfELrYq5ptET2i2xFrfTSZ/hf_20260919_230141_3e8bec02-4e45-4709-9f68-c4b8c80fbe2c.png
- Santorini: https://d8j0ntlcm91z4.cloudfront.net/user_3I7oktfELrYq5ptET2i2xFrfTSZ/hf_20260919_230141_ee2e0919-03ea-4d88-a136-a401c2ba6a20.png

### 5. Why Nexus (icon feature rows)
Headline "Why holiday with Nexus". Four rows in a zigzag layout (icon left/text right, then icon right/text left, alternating), each row fading/sliding in on scroll:
- Airplane icon — "Tailor-made itineraries" — "Flights, stays and excursions planned around your dates and your pace, never a fixed package."
- Shield icon — "Handpicked stays" — "Every hotel and villa is vetted in person by a Nexus specialist before it makes the list."
- Headset icon — "24/7 in-destination support" — "A direct line to your specialist for the whole trip, not a call center queue."
- Compass icon — "Best-value guarantee" — "We negotiate directly with partners, so the price you're quoted is the best one available."

### 6. Marquee band
A full-width, continuously auto-scrolling horizontal strip of destination names separated by small gold dots: Dubai, Santorini, Maldives, Paris, Bali, Amalfi Coast, Zanzibar, Kyoto (looping). Pause the animation for `prefers-reduced-motion`.

### 7. Final CTA band
Full-width gold gradient background (navy text). Eyebrow "Nexus Holidays", headline "Ready for your next escape?", one line of body copy, and a large circular "Contact Now" button styled like a passport/travel stamp (dashed circular border, slight rotate + scale on hover, presses inward with a skew on click) linking to the contact page.

### 8. Footer
Logo + tagline on the left, page links in the middle, "Get in touch" with an "Email us directly" mailto link on the right. Bottom bar: "Nexus Holidays" and "All trips are subject to availability".

## Contact page
Hero banner (a destination photo with a dark scrim) with headline "Let's plan your next trip". Below, a two-column layout:
- **Left**: "Contact directly" — a short paragraph, then an email link styled so that on hover the label "Email Us Directly" slides up and is replaced by the actual address, then "We reply within one business day."
- **Right**: a form card "Send us your trip details" with fields: Full name (required), Email (required), Phone (optional), Destination (optional), Travel dates (optional), Message/trip details (required, textarea). Submit button styled like a rubber travel stamp (circular-ish, presses/skews on click). On submit: validate client-side (name length, email format, message length), then show a success state ("Message received — a Nexus Holidays specialist will reply within one business day.") If there's no backend available, fall back to opening a pre-filled `mailto:` to the business email with the form details in the body.

## Motion and polish requirements
- Use real inertial smooth-scrolling site-wide (Lenis or an equivalent), not just CSS `scroll-behavior`.
- Every scroll-triggered reveal animates `transform` (translateY/scale/rotate), never fades purely via opacity-from-zero gated on visibility, so the page still reads correctly in a static screenshot.
- Give every distinct call-to-action its own visual treatment (the nav pill, the passport-stamp CTA, the card hover-reveal, the form's stamp button) — no single reused generic button style everywhere.
- Fully responsive down to mobile; the journey section's chapter text should stay readable and center-safe at narrow widths.
- Respect `prefers-reduced-motion` everywhere (no parallax, no tilt, no marquee scroll, static final frame for the journey).

## Assets
I have the real Nexus Holidays logo file to upload — use it in the header/footer with a transparent background, and derive a simple favicon from just its icon mark. The video clips and destination photos above are already hosted; embed them by URL rather than re-generating new ones.
