# Smoke test (visual screenshot)

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
