# Nexus Holidays

A static, no-build marketing site for Nexus Holidays: a scroll-scrubbed flight
journey (plane window → beach → Dubai → Santorini) built from Higgsfield-generated
video clips, followed by a bespoke-holidays pitch, a destinations grid, a
features section, and a contact page.

## Running locally

No build step or dependencies. Serve the folder with any static file server, e.g.:

```
python3 -m http.server 8080
```

Then open http://localhost:8080/index.html.

## Structure

- `index.html` — home page (nav, scroll-scrub journey, sections, footer)
- `contact.html` — contact page (direct email + trip-details form)
- `assets/style.css` — all styling (brand tokens, layout, motion, responsive)
- `assets/main.js` — scroll-scrub controller, scroll-reveal, parallax, 3D tilt, mobile nav
- `assets/logo-lockup.png`, `assets/favicon*`, `assets/icon-*` — brand assets
  derived locally (background removed, favicon set) from the supplied Nexus
  Holidays logo
- `assets/bespoke-sunset.jpg` — cropped from the supplied logo's sunset photo

## Video and destination photography

The journey's four video clips and the destination photos (Maldives, Dubai,
Santorini) are hosted on Higgsfield's asset CDN and referenced directly by
URL rather than bundled into the repo — visitors' browsers load them
directly from Higgsfield.

## Contact form

This is a static site with no backend, so the trip-details form builds a
pre-filled `mailto:` message to `adelevate803@gmail.com` on submit (opening
the visitor's email client) rather than posting to a server. For silent
submission without opening an email client, wire the form up to a form
backend (e.g. Formspree) or a small serverless function.
