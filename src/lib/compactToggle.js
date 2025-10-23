// Global compact mode keyboard toggle
// Registers a single global listener for Ctrl+Shift+C to toggle compact mode
export function initializeCompactToggle() {
  if (typeof window === 'undefined') return;

  const applyCompact = (enabled) => {
    try {
      localStorage.setItem('mercurial-compact', enabled ? 'true' : 'false');
    } catch {}
    if (enabled) document.documentElement.classList.add('compact');
    else document.documentElement.classList.remove('compact');

    // Dispatch a simple event so components can react if they listen
    window.dispatchEvent(new CustomEvent('compact-mode-changed', { detail: { enabled } }));
  };

  // Initialize from storage
  try {
    const saved = localStorage.getItem('mercurial-compact');
    if (saved === 'true') document.documentElement.classList.add('compact');
  } catch {}

  const handler = (e) => {
    // Ctrl+Shift+C (Cmd on mac will also include ctrlKey in many browsers; keep ctrl for Windows)
    if (e.ctrlKey && e.shiftKey && (e.key === 'C' || e.key === 'c')) {
      e.preventDefault();
      const currently = document.documentElement.classList.contains('compact');
      applyCompact(!currently);
    }
  };

  window.addEventListener('keydown', handler);

  return () => {
    window.removeEventListener('keydown', handler);
  };
}
