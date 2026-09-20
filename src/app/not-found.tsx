import Link from 'next/link';
import type { Metadata } from 'next';
import { routes } from '@/lib/config/site';

export const metadata: Metadata = {
  title: 'Seite nicht gefunden',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="ur-blueprint-surface flex min-h-dvh flex-col items-center justify-center px-[var(--gutter)] text-center">
      <span className="ur-display text-xs uppercase tracking-[var(--tracking-display)] text-signal-caution">
        Fehler 404
      </span>
      <h1 className="mt-4 text-3xl sm:text-4xl">
        Diese Strecke wurde nicht gefunden.
      </h1>
      <p className="mt-4 max-w-md text-fg-secondary">
        Die aufgerufene Seite gibt es nicht. Vielleicht hat sie einen neuen Halt bekommen.
      </p>
      <Link
        href={routes.home}
        className="mt-8 inline-flex h-12 items-center rounded-[var(--radius-md)] bg-[var(--accent)] px-6 font-semibold text-accent-contrast"
      >
        Zurück zur Startseite
      </Link>
    </div>
  );
}
