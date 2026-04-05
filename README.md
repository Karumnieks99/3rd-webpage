# FORGE CUSTOMS Landing Page

Static storefront-style landing page for **FORGE CUSTOMS**, a boutique custom PC brand focused on luxury systems, custom part selection, and a frontend-led quote request flow.

## Links

- Live app: [https://karumnieks99.github.io/3rd-webpage/](https://karumnieks99.github.io/3rd-webpage/)
- GitHub repo: [https://github.com/Karumnieks99/3rd-webpage](https://github.com/Karumnieks99/3rd-webpage)

## Overview

This project includes:

- A premium landing page for prebuilt systems and custom PC builds
- A custom PC configurator with live price updates
- A localStorage cart for both signature systems and custom builds
- Product details dialogs and an email-ready build inquiry flow
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
- Inquiry dialog with cart/build prefill, copy/download actions, and email handoff
- Responsive navigation and section transitions
- Keyboard-friendly cart drawer and dialog focus trapping

## Suggested Next Upgrades

- Connect the inquiry form to a real backend or email service
- Save custom build presets and allow sharing a configuration link
- Add validation rules for incompatible part combinations
- Replace remaining generic brand-strip content with real proof or social proof
- Add CRM integration, analytics events, or automated quote routing
- Add real checkout or payment handoff if the site moves beyond lead generation

## Notes

- The cart remains browser-based and the inquiry flow prepares an email-ready brief rather than posting to a backend.
- Images are stored locally instead of hotlinked from external sources.
- Debug artifacts are kept under `artifacts/` and ignored by git.

## License

No license file is currently included in this project.
