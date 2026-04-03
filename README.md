# Pulse Forge Landing Page

Static landing page for **Pulse Forge**, a custom gaming PC and creator workstation brand.  
The project is built with plain HTML, CSS, and JavaScript, with Vite used as the local dev server and build tool.

## Overview

This project includes:

- A storefront-style landing page focused on product browsing and conversions
- Local image assets stored inside the project
- Responsive layout for desktop and mobile
- Lightweight interactions for mobile navigation, scroll reveal, animated counters, and sticky header behavior

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
  Main page markup and content sections

- `pulse-landing-page.css`  
  Visual system, layout, responsive styles, and component styling

- `pulse-landing-page.js`  
  Mobile menu behavior, header scroll state, reveal animations, counters, and footer year

- `assets/images/`  
  Local image assets used by the page

- `index.html`  
  Redirect entry point that opens `pulse-landing-page.html`

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

## Customization

### Update content

Edit:

- `pulse-landing-page.html`

### Update styling

Edit:

- `pulse-landing-page.css`

### Update interactions

Edit:

- `pulse-landing-page.js`

### Replace images

Add or replace files in:

- `assets/images/`

Then update the relevant `<img>` paths in `pulse-landing-page.html`.

## Notes

- The page uses local image files instead of external hotlinked images.
- Debug screenshots and render checks are stored under `artifacts/` and ignored by git.
- The project can be deployed as a static site on GitHub Pages, Netlify, Vercel, or any basic static hosting.

## License

No license file is currently included in this project.
