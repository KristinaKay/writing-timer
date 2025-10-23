import React, { useEffect, useState } from 'react';
import './CompactToast.css';

const CompactToast = () => {
  const [visible, setVisible] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      const v = !!(e && e.detail && e.detail.enabled);
      setEnabled(v);
      setVisible(true);
      // auto-hide after 1800ms
      setTimeout(() => setVisible(false), 1800);
    };

    window.addEventListener('compact-mode-changed', handler);
    return () => window.removeEventListener('compact-mode-changed', handler);
  }, []);

  if (!visible) return null;

  return (
    <div className={`compact-toast ${enabled ? 'on' : 'off'}`} role="status" aria-live="polite">
      {enabled ? 'Compact mode enabled' : 'Compact mode disabled'}
    </div>
  );
};

export default CompactToast;
