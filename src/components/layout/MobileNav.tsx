'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import type { NavGroup } from '@/lib/config/navigation';
import { routes } from '@/lib/config/site';
import { cn } from '@/lib/utils/cn';

/**
 * Vollflächiges Menü für Tablet und Smartphone.
 * Öffnet über den gesamten Bildschirm, sperrt den Hintergrund-Scroll und
 * lässt sich mit Escape schließen.
 *
 * Die Fläche hängt bewusst an `document.body`: Der Kopfbereich nutzt
 * `backdrop-filter`, und ein solcher Vorfahr wird zum Bezugsrahmen für
 * `position: fixed`. Im Kopfbereich gerendert bliebe das Menü so hoch wie
 * der Kopfbereich selbst.
 */
export function MobileNav({ groups }: { groups: NavGroup[] }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false);
    }
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  const overlay = (
    <div
      id="mobile-menu"
      className={cn(
        'ur-dark fixed inset-0 z-[var(--z-overlay)] flex flex-col',
        'ur-grid-surface',
      )}
    >
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-[var(--border-on-dark)] px-[var(--gutter)]">
        <span className="ur-display text-xs uppercase text-fg-on-dark-muted">Navigation</span>
        <button
          type="button"
          onClick={() => setOpen(false)}
          autoFocus
          className={cn(
            'inline-flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)]',
            'border border-[var(--border-on-dark)] text-fg-on-dark',
          )}
        >
          <span className="ur-sr-only">Menü schließen</span>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
            <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.6" />
          </svg>
        </button>
      </div>

      <nav
        aria-label="Hauptnavigation (mobil)"
        className="min-h-0 flex-1 overflow-y-auto px-[var(--gutter)] py-6"
      >
        <ul className="space-y-6">
          {groups.map((group) => (
            <li key={group.label}>
              {group.href ? (
                <Link
                  href={group.href}
                  className="ur-display block text-xs uppercase text-accent-text"
                >
                  {group.label}
                </Link>
              ) : (
                <span className="ur-display block text-xs uppercase text-accent-text">
                  {group.label}
                </span>
              )}

              {group.items?.length ? (
                <ul className="mt-3 space-y-1 border-l border-[var(--border-on-dark)] pl-4">
                  {group.items.map((item) => (
                    <li key={`${item.label}-${item.href}`}>
                      <Link
                        href={item.href}
                        {...(item.external
                          ? { target: '_blank', rel: 'noopener noreferrer' }
                          : {})}
                        className="block py-2 text-lg text-fg-on-dark"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
        </ul>
      </nav>

      <div className="shrink-0 border-t border-[var(--border-on-dark)] px-[var(--gutter)] py-5">
        <Link
          href={routes.builder}
          className={cn(
            'flex h-12 items-center justify-center rounded-[var(--radius-md)]',
            'bg-[var(--accent)] font-semibold text-accent-contrast',
          )}
        >
          Builder werden
        </Link>
      </div>
    </div>
  );

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        className={cn(
          'inline-flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)]',
          'border border-[var(--border-on-dark)] text-fg-on-dark',
          'transition-colors hover:bg-[var(--surface-dark-2)]',
        )}
      >
        <span className="ur-sr-only">Menü öffnen</span>
        <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden>
          <path d="M0 1h18M0 7h18M0 13h18" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      </button>

      {open && mounted && createPortal(overlay, document.body)}
    </div>
  );
}
