'use client';

import { useState, useEffect } from 'react';

const CONSENT_KEY = 'analytics-consent';

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem(CONSENT_KEY, 'declined');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-sm z-50 p-4 rounded-xl border border-border bg-surface-elevated shadow-2xl"
    >
      <p className="text-sm text-muted mb-3">
        This site uses privacy-friendly analytics (Plausible) to understand
        traffic. No cookies are used for tracking.
      </p>
      <div className="flex gap-2">
        <button
          onClick={accept}
          className="flex-1 text-sm px-3 py-1.5 rounded-lg bg-accent text-accent-foreground hover:opacity-90 transition-opacity duration-200"
        >
          Accept
        </button>
        <button
          onClick={decline}
          className="flex-1 text-sm px-3 py-1.5 rounded-lg border border-border text-muted hover:text-foreground transition-colors duration-200"
        >
          Decline
        </button>
      </div>
    </div>
  );
}
