# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Development

From the project root run the development server with a single command:

```powershell
npm install
npm run dev
```

Open <http://localhost:5173/> to view the app.

## Developer checklist

Quick steps for local development:

- Install dependencies: `npm install`
- Run dev server (hot reload): `npm run dev`
- Build for production: `npm run build`
- Preview production build locally: `npm run preview`
- Run the linter: `npm run lint`

Quick tips:

- The app entry is `src/main.jsx` and the primary component is `src/App.jsx`.
- Styles are in `src/App.css`; use the `.container` helper to constrain content while keeping background full-width.
- Sidebar accordion state persists to localStorage under the key `openSidebarSection`.
- For accessibility: use ArrowUp/ArrowDown, Tab/Shift+Tab to move between sidebar headers and Enter/Space to toggle a section.

### Run in VS Code

You can start the dev server directly from VS Code using the built-in Tasks: open the Command Palette (Ctrl+Shift+P) and run `Tasks: Run Task` → **Start Dev Server**.

Badge (copy-paste into other docs):

`![dev](https://img.shields.io/badge/dev-vite-blue)`

## Smoke test (visual screenshot)

This project includes a tiny visual smoke test that captures a screenshot of the running dev site.

Start dev server manually (optional):

```powershell
npm run dev
```

Run the standalone screenshot (connects to the running server at <http://localhost:5173/> by default):

```powershell
npm run smoke:screenshot
```

Or run the runner which starts the dev server, waits for it, runs the screenshot, and then shuts the server down:

```powershell
npm run smoke
```

Environment variables:

- `CHROME_PATH` — path to a system Chrome/Chromium executable to use with `puppeteer-core` (recommended). If unset the script will search common install locations.
- `SMOKE_URL` — override target URL (default: <http://localhost:5173/>).
- `SMOKE_WAIT_MS` — how long (ms) to wait for the server port to accept connections.

Output:

- Screenshot is saved at `test/smoke/screenshot.png`.

Notes:

- This repo now uses `puppeteer-core` which requires a system Chrome/Chromium. On CI you'll need either Chrome installed or a GitHub Actions runner that includes Chrome (many do).
