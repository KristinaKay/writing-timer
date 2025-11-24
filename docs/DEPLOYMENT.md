# Deployment Guide

This guide explains how to deploy A Timer to Write as a web application.

## 📦 Building for Production

### Build the App

```bash
npm install
npm run build
```

This creates a `dist/` folder with optimized production files.

### Test the Build Locally

```bash
npm run preview
```

Visit `http://localhost:4173` to test the production build.

## 🚀 Deployment Options

### Option 1: Netlify (Recommended)

**Easiest method - drag and drop:**

1. Go to [netlify.com](https://netlify.com)
2. Sign up/login with GitHub
3. Drag the `dist/` folder to Netlify's deploy area
4. Your app is live! ✨

**Or connect your GitHub repo:**

1. Click "Add new site" → "Import an existing project"
2. Connect to GitHub and select `writing-timer` repo
3. Configure build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
4. Click "Deploy site"

**Custom domain:** Netlify provides a free subdomain, or connect your own domain.

### Option 2: Vercel

1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Vercel auto-detects Vite settings
4. Click "Deploy"

**Features:**

- Automatic deployments on Git push
- Free SSL certificates
- Built-in analytics
- Instant rollbacks

### Option 3: GitHub Pages

1. Install GitHub Pages plugin:

   ```bash
   npm install --save-dev gh-pages
   ```

2. Add to `package.json`:

   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```

3. Update `vite.config.js`:

   ```javascript
   export default defineConfig({
     plugins: [react()],
     base: '/writing-timer/', // Your repo name
   })
   ```

4. Deploy:

   ```bash
   npm run deploy
   ```

5. Enable GitHub Pages in repo settings (Settings → Pages → Source: gh-pages branch)

Your app will be at: `https://KristinaKay.github.io/writing-timer/`

### Option 4: Self-Hosted

Copy the `dist/` folder to any web server:

- Apache
- Nginx
- Your own hosting service

The app is just HTML/CSS/JS - no server-side code needed!

## 🔧 Configuration

### Base URL

If deploying to a subdirectory, update `vite.config.js`:

```javascript
export default defineConfig({
  plugins: [react()],
  base: '/your-path/', // e.g., '/timer/' or '/writing-timer/'
})
```

### Environment Variables

Currently, the app uses localStorage only. No environment variables needed.

## 📱 PWA (Progressive Web App) - Future

To make the app installable on mobile/desktop:

1. Add service worker
2. Create manifest.json
3. Configure Vite PWA plugin

See [Future Changes](FUTURE_CHANGES.md) for roadmap.

## ✅ Pre-Deployment Checklist

- [ ] Run `npm run build` successfully
- [ ] Test with `npm run preview`
- [ ] Check all features work (timer, tasks, themes, statistics)
- [ ] Test on different browsers (Chrome, Firefox, Safari, Edge)
- [ ] Test responsive design on mobile
- [ ] Verify localStorage persists data
- [ ] Check accessibility with screen reader

## 🐛 Troubleshooting

**Build fails:**

- Run `npm install` to ensure dependencies are installed
- Check for any TypeScript/ESLint errors
- Review error messages in terminal

**Blank page after deployment:**

- Check browser console for errors
- Verify `base` path in `vite.config.js` matches your URL
- Ensure files are in correct directory

**Timer not working:**

- Check browser compatibility (requires modern browser with ES6+ support)
- Verify JavaScript is enabled
- Check for Content Security Policy issues

## 📊 Analytics (Optional)

Consider adding:

- Google Analytics
- Plausible (privacy-friendly)
- Netlify Analytics

## 🔐 Security

The app runs entirely client-side with no backend:

- All data stored in browser localStorage
- No user authentication required
- No sensitive data collected
- No external API calls

Safe for public deployment!
