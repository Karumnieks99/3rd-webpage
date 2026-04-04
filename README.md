# FORGE CUSTOMS Landing Page

Static storefront-style landing page for **FORGE CUSTOMS**, a boutique custom PC brand focused on luxury systems, custom part selection, and frontend-only shopping flow.

## Links

- Live app: [https://karumnieks99.github.io/3rd-webpage/](https://karumnieks99.github.io/3rd-webpage/)
- GitHub repo: [https://github.com/Karumnieks99/3rd-webpage](https://github.com/Karumnieks99/3rd-webpage)

## Overview

This project includes:

- A premium landing page for prebuilt systems and custom PC builds
- A frontend-only custom PC configurator with live price updates
- A localStorage cart for both signature systems and custom builds
- Product details dialogs and build inquiry flow
- Local image assets and responsive desktop/mobile layouts

## Tech Stack

- HTML
- CSS
- JavaScript
- Vite

## Project Structure

```text
.
|-- assets/
|   `-- images/
|-- index.html
|-- pulse-landing-page.html
|-- pulse-landing-page.css
|-- pulse-landing-page.js
|-- package.json
`-- README.md
```

## Main Files

- `pulse-landing-page.html`
  Main page structure, content sections, dialogs, cart drawer, and custom builder markup

- `pulse-landing-page.css`
  Layout, visual system, component styling, responsive behavior, cart UI, and builder styles

- `pulse-landing-page.js`
  Mobile navigation, reveal logic, cart persistence, dialogs, product actions, inquiry flow, and custom PC builder logic

- `assets/images/`
  Local image assets used by the page

- `index.html`
  Entry point used for deployment

## Getting Started

### Install dependencies

```bash
npm install
```

### Run locally

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

## Current Features

- Signature system cards with detail dialogs
- Frontend cart with quantity controls and subtotal
- Custom PC builder with configurable parts
- Inquiry dialog with cart/build prefill
- Responsive navigation and section transitions

## Suggested Next Upgrades

- Connect the inquiry form to a real backend or email service
- Save custom build presets and allow sharing a configuration link
- Add validation rules for incompatible part combinations
- Replace remaining generic brand-strip content with real proof or social proof
- Add keyboard focus trapping inside the cart and dialog overlays
- Add real checkout, payment, or quote-request handoff

## Notes

- The current cart and inquiry system are frontend-only.
- Images are stored locally instead of hotlinked from external sources.
- Debug artifacts are kept under `artifacts/` and ignored by git.

## License

No license file is currently included in this project.
