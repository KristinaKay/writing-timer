import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const VITE_CMD = process.platform === 'win32' ? 'npm.cmd' : 'npm';

function waitForPort(host, port, timeout = 30000) {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    const tryConnect = () => {
      const net = require('net');
      const socket = new net.Socket();
      socket.setTimeout(2000);
      socket.once('connect', () => {
        socket.destroy();
        resolve();
      });
      socket.once('timeout', () => {
        socket.destroy();
        if (Date.now() - start >= timeout) reject(new Error('Timeout waiting for port'));
        else setTimeout(tryConnect, 500);
      });
      socket.once('error', () => {
        socket.destroy();
        if (Date.now() - start >= timeout) reject(new Error('Timeout waiting for port'));
        else setTimeout(tryConnect, 500);
      });
      socket.connect(port, host);
    };
    tryConnect();
  });
}

(async () => {
  // Start dev server
  console.log('Starting Vite dev server...');
  const dev = spawn(VITE_CMD, ['run', 'dev'], { cwd: process.cwd(), stdio: 'inherit' });

  // Ensure dev server is killed on exit
  const cleanup = () => {
    if (!dev.killed) dev.kill();
  };
  process.on('exit', cleanup);
  process.on('SIGINT', () => { cleanup(); process.exit(1); });
  process.on('SIGTERM', () => { cleanup(); process.exit(1); });

  try {
    await waitForPort('127.0.0.1', 5173, 30000);
  } catch (err) {
    console.error('Dev server did not start in time:', err.message || err);
    cleanup();
    process.exit(2);
  }

  // Run screenshot
  console.log('Dev server ready — running smoke screenshot...');
  try {
    const runner = spawn(VITE_CMD, ['run', 'smoke:screenshot'], { cwd: process.cwd(), stdio: 'inherit' });
    const code = await new Promise((resolve) => runner.on('close', resolve));
    cleanup();
    process.exit(code);
  } catch (err) {
    console.error('Smoke runner failed:', err);
    cleanup();
    process.exit(2);
  }
})();
