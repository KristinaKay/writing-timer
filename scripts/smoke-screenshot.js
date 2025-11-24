import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';
import net from 'net';
import { URL as NodeURL } from 'url';
import os from 'os';

// Config
const TARGET = process.env.SMOKE_URL || 'http://localhost:5173/';
const OUT_DIR = path.resolve('test', 'smoke');
const OUT_PATH = path.join(OUT_DIR, 'screenshot.png');
const WAIT_TIMEOUT = parseInt(process.env.SMOKE_WAIT_MS || '20000', 10);
const POLL_INTERVAL = 500;

function waitForPort(targetUrl, timeout = WAIT_TIMEOUT) {
  const url = new NodeURL(targetUrl);
  const hostname = url.hostname || '127.0.0.1';
  const port = parseInt(url.port || (url.protocol === 'https:' ? '443' : '80'), 10);

  return new Promise((resolve, reject) => {
    const start = Date.now();
    let attemptCount = 0;

    const tryConnect = () => {
      attemptCount++;
      const socket = new net.Socket();
      socket.setTimeout(2000);
      
      socket.once('connect', () => {
        console.log(`✓ Connected to ${hostname}:${port} after ${attemptCount} attempts`);
        socket.destroy();
        resolve();
      });
      
      socket.once('timeout', () => {
        socket.destroy();
        const elapsed = Date.now() - start;
        if (elapsed >= timeout) {
          reject(new Error(`Timeout waiting for ${hostname}:${port} after ${attemptCount} attempts`));
        } else {
          setTimeout(tryConnect, POLL_INTERVAL);
        }
      });
      
      socket.once('error', (err) => {
        socket.destroy();
        const elapsed = Date.now() - start;
        if (elapsed >= timeout) {
          reject(new Error(`Connection error to ${hostname}:${port} after ${attemptCount} attempts: ${err.message}`));
        } else {
          // Don't log every error, just retry silently
          if (attemptCount % 10 === 0) {
            console.log(`Still trying to connect (attempt ${attemptCount})...`);
          }
          setTimeout(tryConnect, POLL_INTERVAL);
        }
      });
      
      socket.connect(port, hostname);
    };

    tryConnect();
  });
}

async function run() {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

  console.log(`Waiting for ${TARGET} to accept connections (timeout ${WAIT_TIMEOUT}ms)...`);
  try {
    await waitForPort(TARGET);
  } catch (err) {
    console.error('Server not reachable:', err.message || err);
    process.exitCode = 2;
    return;
  }

  console.log(`Opening ${TARGET} and taking screenshot...`);

  // Resolve executablePath for puppeteer-core. Prefer CHROME_PATH env var, then common paths.
  const chromeFromEnv = process.env.CHROME_PATH;
  let executablePath = chromeFromEnv;
  if (!executablePath) {
    const plat = os.platform();
    const candidates = [];
    if (plat === 'win32') {
      candidates.push(
        'C:/Program Files/Google/Chrome/Application/chrome.exe',
        'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe'
      );
    } else if (plat === 'darwin') {
      candidates.push('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome');
    } else {
      // linux
      candidates.push('/usr/bin/google-chrome', '/usr/bin/chromium-browser', '/usr/bin/chromium');
    }
    for (const c of candidates) {
      if (fs.existsSync(c)) {
        executablePath = c;
        break;
      }
    }
  }

  const launchOptions = { args: ['--no-sandbox', '--disable-setuid-sandbox'] };
  if (executablePath) {
    launchOptions.executablePath = executablePath;
    console.log('Using Chrome at', executablePath);
  } else {
    console.warn('No system Chrome found. Set CHROME_PATH to a Chrome/Chromium binary for puppeteer-core.');
  }

  const browser = await puppeteer.launch(launchOptions);
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 900 });
    
    // Capture console messages BEFORE navigation to catch startup errors
    const consoleLogs = [];
    page.on('console', msg => {
      try {
        const text = msg.text();
        const type = msg.type();
        consoleLogs.push(`[${type}] ${text}`);
        // Also log to our console for immediate visibility
        console.log(`Browser [${type}]:`, text);
      } catch (error) {
        console.error('Failed to capture console message:', error);
      }
    });

    // Capture page errors
    page.on('pageerror', error => {
      const message = error.toString();
      consoleLogs.push(`[pageerror] ${message}`);
      console.error('Browser page error:', message);
    });

    // Pre-set compact mode in localStorage so the app loads in compact mode for screenshot
    await page.goto('about:blank');
    await page.evaluateOnNewDocument(() => {
      try {
        localStorage.setItem('mercurial-compact', 'true');
      } catch (error) {
        console.error('Failed to set compact mode:', error);
      }
    });
    
    console.log('Navigating to', TARGET);
    await page.goto(TARGET, { waitUntil: 'networkidle2', timeout: 30000 });

    // Wait for a reliable selector from the app (increased timeout)
    console.log('Waiting for .App .timer-display element...');
    await page.waitForSelector('.App .timer-display', { timeout: 20000 });

  // Small delay to allow animations to settle
  await new Promise((r) => setTimeout(r, 500));

    await page.screenshot({ path: OUT_PATH, fullPage: false });
    console.log(`Screenshot saved to ${OUT_PATH}`);
    // Write captured console logs
    try {
      const logPath = path.join(OUT_DIR, 'console.log');
      fs.writeFileSync(logPath, consoleLogs.join('\n'), 'utf-8');
      console.log('Console log saved to', logPath);
    } catch (err) {
      console.warn('Failed to write console log:', err && err.message ? err.message : err);
    }
  } catch (err) {
    console.error('Smoke screenshot failed:', err);
    process.exitCode = 2;
  } finally {
    await browser.close();
  }
}

run();
