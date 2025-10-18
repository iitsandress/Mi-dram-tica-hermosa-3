# Repository Guidelines

## Project Structure & Module Organization

- Root contains a simple static web app:
  - `index.html` — main HTML entry with markup, audio player, gallery, lightbox containers, and UI controls.
  - `styles.css` — global styles, variables, themes (light/dark), animations, responsive rules.
  - `script.js` — all client-side logic: initialization, particles, counters, lightbox, carousel, theme/music toggles, notifications.
  - Assets in root: `1.jpg` … `5.jpg`, `corazon.ico`, background music MP3.
  - `chat-con-mi-novia/WhatsApp Chat - Mi Princesa/` — media exports (not used by the app at runtime).
  - `README.md` — end-user customization guide.

## Build, Test, and Development Commands

This is a static site without a build system. You can open it directly in a browser or serve locally.

```bash
# Open directly (double-click index.html) or run a static server
# Python 3
python -m http.server 8080
# or Node (if installed)
npx serve . -l 8080
```

## Coding Style & Naming Conventions

- Indentation: 4 spaces in JS/HTML/CSS.
- File naming: lowercase with hyphens for assets; main files use simple names (`index.html`, `styles.css`, `script.js`).
- Functions/variables: camelCase in JavaScript (e.g., initializeParticles, showNotification).
- Linting/formatting: No tooling configured; keep consistent spacing and semicolons as in existing code.

## Testing Guidelines

- Framework: None configured.
- Test files: Not present.
- Running tests: N/A.
- Coverage: Not applicable.

## Commit & Pull Request Guidelines

- Current history shows informal messages. Prefer clear, imperative commit messages:
  - Example: "Add lightbox navigation and counter"
  - Example: "Refactor particle system for performance"
- PR process: Not defined in repo; propose PRs that explain scope, screenshots (for UI), and manual test steps.
- Branch naming: Use feature/bugfix/chore prefixes, e.g., `feature/lightbox-keyboard-nav`.

---

# Repository Tour

## 🎯 What This Repository Does

Mi Dramática Hermosa is a single-page romantic website with animations, a photo lightbox, rotating phrases, a relationship time counter, notifications, theme and music controls.

**Key responsibilities:**
- Present a responsive, animated gallery and lightbox
- Provide interactive UX (particles, notifications, carousel, counter)
- Allow easy personalization via HTML/CSS/JS and asset swaps

---

## 🏗️ Architecture Overview

### System Context
```
[User Browser] → [Static Files: index.html + styles.css + script.js]
                         ↓
                  [Local assets (images/audio)]
```

### Key Components
- index.html — Declares structure: gallery, lightbox, controls, notification containers, and binds script/style.
- styles.css — Theming (CSS variables), animations, layout (Grid/Flex), responsive rules, light/dark modes.
- script.js — Initializes app; modules as functions: particles, counter, lightbox, carousel, theme/music toggles, notifications, lazy-loading helpers.

### Data Flow
1. Browser loads index.html which references styles.css and script.js.
2. script.js initializeApp() runs after DOMContentLoaded, shows loading screen, then sets up features.
3. UI events (clicks/keys/scroll/intersection) drive state changes (lightbox image index, theme, music state, notifications).
4. LocalStorage persists theme and first-visit flag; media assets are read directly by the browser.

---

## 📁 Project Structure [Partial Directory Tree]

```
.
├── index.html                # HTML entry and UI structure
├── styles.css                # Global styles, themes, animations
├── script.js                 # Client-side logic and interactions
├── README.md                 # Customization guide for end users
├── corazon.ico               # Favicon
├── 1.jpg … 5.jpg             # Gallery images referenced by HTML
├── JVKE - golden hour (official music video).mp3  # Background music
└── chat-con-mi-novia/
    └── WhatsApp Chat - Mi Princesa/               # Exported media (unused by app)
```

### Key Files to Know

| File | Purpose | When You'd Touch It |
|------|---------|---------------------|
| `index.html` | App entry, declares gallery, lightbox, controls, audio | Add/modify sections, images, phrases, or audio source |
| `styles.css` | Theme variables, animations, layout, responsive rules | Adjust colors, spacing, animations, mobile behavior |
| `script.js` | App initialization and features (particles, counter, lightbox, carousel, notifications, theme/music) | Add features, tweak UX logic, fix bugs |
| `README.md` | End-user customization instructions | Update guidance when changing structure or options |

---

## 🔧 Technology Stack

### Core Technologies
- Language: HTML5, CSS3, JavaScript (ES6+, browser runtime)
- Framework: None (vanilla JS)
- Database: None
- Web Server: Any static file server (optional for local dev)

### Key Libraries
- Google Fonts (Great Vibes, Poppins) via CSS import.
- Browser APIs: IntersectionObserver, LocalStorage, HTMLAudioElement.

### Development Tools
- None mandated; you can use any static server for preview.

---

## 🌐 External Dependencies

- Remote fonts via Google Fonts.
- No external JS libraries/CDNs used; everything else is local.

### Environment Variables  [Optional]

Not applicable for this static site.

---

## 🔄 Common Workflows

### Customize gallery images
1. Replace `1.jpg` … `5.jpg` in repo root with your images.
2. Keep file names or update `index.html` data-index/img src accordingly.

Code path: index.html (galeria) → script.js initializeLightbox()

### Change background music
1. Place MP3 in repo root and update `<source src="...">` in `index.html`.
2. Reload page; use the 🎵 button to toggle.

Code path: index.html (audio) → script.js initializeMusicControls()

### Edit rotating phrases
1. Edit frases in `index.html` under `.frases-carousel`.
2. Behavior controlled by `initializeCarousel()`.

Code path: index.html → script.js initializeCarousel()

---

## 📈 Performance & Scale

### Performance Considerations
- Lazy loading for images via `loading="lazy"` and IntersectionObserver helper.
- Particle count capped; reduced on mobile via optimizeForMobile().

### Monitoring
- Dev logs when running on localhost (console messages in window.load).

---

## 🚨 Things to Be Careful About

### 🔒 Security Considerations
- Media licenses: ensure you have rights to distribute images/audio.
- Autoplay restrictions: browsers may block audio until user interaction; handled with notifications and event listeners.
- LocalStorage use: stores only simple flags (theme, visitedBefore).

*Update to last commit: 62a87a0c656212f0da67e9ed89bac1220d692a5a*
