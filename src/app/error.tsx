'use client';

import { useEffect } from 'react';

/**
 * Fehlerseite. Zeigt nie Details der Ursache — weder Stacktrace noch interne
 * Meldungen. Die Diagnose bleibt im Serverlog.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // TODO: An eine Fehlerüberwachung anbinden, sobald eine eingerichtet ist.
    console.error('Unbehandelter Fehler', error.digest);
  }, [error]);

  return (
    <div className="ur-grid-surface flex min-h-dvh flex-col items-center justify-center px-[var(--gutter)] text-center">
      <span className="ur-display text-xs uppercase tracking-[var(--tracking-display)] text-signal-stop">
        Fehler 500
      </span>
      <h1 className="mt-4 text-3xl sm:text-4xl">
        Signalstörung.
      </h1>
      <p className="mt-4 max-w-md text-fg-secondary">
        Auf unserer Seite ist etwas schiefgelaufen. Wir kümmern uns darum.
      </p>
      {error.digest && (
        <p className="ur-display mt-4 text-xs text-fg-muted">
          Vorgangsnummer {error.digest}
        </p>
      )}
      <button
        type="button"
        onClick={reset}
        className="mt-8 inline-flex h-12 items-center rounded-[var(--radius-md)] border border-[var(--border-default)] px-6 font-medium"
      >
        Erneut versuchen
      </button>
    </div>
  );
}
