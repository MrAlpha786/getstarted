# Changelog

## v0.2.1 - Update package name

### Changes
- Fix the long name to include the word `startpage`.

## v0.2.0 – Semantic Versioning & About Page

### Features
- Implemented full [Semantic Versioning](https://semver.org/) validation and version bumping in release scripts.
- Version information is now displayed on the About page.
- Added automated commit and tagging mechanism as part of the release workflow.

### Changes
- Refined release script to enforce SemVer format and reject invalid versions.
- Improved the robustness of the build process and tagging strategy.

### Internal Commits
- `Bump v0.1.0 -> v0.2.0`
- `Add ability to commit version bump and add tag`
- `Show version info in about page`
- `Add semantic versioning and create a more robust release script`

---

## v0.0.0.2 (v0.1.0) – Add Release Scripts

### Features
- Scripts to create artifacts for release as assets.
- Added a subtle border around the search bar when active.

---

## v0.0.0.1 – Initial Public Release

### Overview
The first public release of the **Minimal Startpage Extension** — a fast, accessible, and configurable new-tab replacement.

### Features
- Central search bar with instant focus.
- Four customizable tabbed lists: General, Tech, Work, Social.
- Dark/light mode toggle.
- UI-based configuration panel.
- Settings stored in browser sync storage for cross-device sync.
- Installable as a Progressive Web App (PWA).
- Compatible with Chrome, Firefox, and Safari.

### Key Improvements from HTML-based Version
- Fully rebuilt using Svelte.
- Replaced manual `config.js` with UI-driven configuration.
- Migrated to `browser.storage.sync`.
- Multi-browser support with a new build system.