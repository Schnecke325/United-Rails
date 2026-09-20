'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import type { NavGroup } from '@/lib/config/navigation';
import { cn } from '@/lib/utils/cn';

/**
 * Hauptnavigation für große Bildschirme.
 * Gruppen mit Unterpunkten öffnen ein Menü, das mit Tastatur und Maus bedienbar ist.
 */
export function MainNav({ groups }: { groups: NavGroup[] }) {
  const pathname = usePathname();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setOpenIndex(null);
  }, [pathname]);

  useEffect(() => {
    if (openIndex === null) return;

    function onPointerDown(event: PointerEvent) {
      if (!navRef.current?.contains(event.target as Node)) setOpenIndex(null);
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpenIndex(null);
    }

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [openIndex]);

  function isActive(href: string | undefined) {
    if (!href) return false;
    return href === '/' ? pathname === '/' : pathname.startsWith(href);
  }

  return (
    <nav ref={navRef} aria-label="Hauptnavigation" className="hidden lg:block">
      <ul className="flex items-center gap-1">
        {groups.map((group, index) => {
          const active = isActive(group.href);
          const hasMenu = Boolean(group.items?.length);
          const open = openIndex === index;

          const triggerClasses = cn(
            'ur-display flex items-center gap-1.5 whitespace-nowrap rounded-[var(--radius-sm)] px-3 py-2',
            'text-xs uppercase transition-colors duration-[var(--duration-fast)]',
            active
              ? 'text-accent'
              : 'text-fg-secondary hover:text-fg',
          );

          return (
            <li
              key={group.label}
              className="relative"
              onMouseEnter={() => hasMenu && setOpenIndex(index)}
              onMouseLeave={() => hasMenu && setOpenIndex(null)}
            >
              {hasMenu ? (
                <button
                  type="button"
                  className={triggerClasses}
                  aria-expanded={open}
                  aria-haspopup="true"
                  onClick={() => setOpenIndex(open ? null : index)}
                >
                  {group.label}
                  <Chevron open={open} />
                </button>
              ) : (
                <Link href={group.href ?? '#'} className={triggerClasses}>
                  {group.label}
                </Link>
              )}

              {hasMenu && open && (
                <div
                  className={cn(
                    'absolute left-0 top-full z-[var(--z-dropdown)] min-w-64 pt-2',
                  )}
                >
                  <ul
                    className={cn(
                      'rounded-[var(--radius-md)] border border-[var(--border-default)]',
                      'bg-[var(--surface-2)] p-2 shadow-[var(--shadow-raised)]',
                    )}
                  >
                    {group.items?.map((item) => (
                      <li key={`${item.label}-${item.href}`}>
                        <Link
                          href={item.href}
                          {...(item.external
                            ? { target: '_blank', rel: 'noopener noreferrer' }
                            : {})}
                          className={cn(
                            'block rounded-[var(--radius-sm)] px-3 py-2',
                            'transition-colors duration-[var(--duration-fast)]',
                            'hover:bg-[var(--surface-3)]',
                          )}
                        >
                          <span className="flex items-center gap-1.5 text-sm font-medium text-fg">
                            {item.label}
                            {item.external && <ExternalIcon />}
                          </span>
                          {item.description && (
                            <span className="mt-0.5 block text-xs text-fg-muted">
                              {item.description}
                            </span>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      aria-hidden
      className={cn(
        'transition-transform duration-[var(--duration-fast)]',
        open && 'rotate-180',
      )}
    >
      <path
        d="M2 4l3 3 3-3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
      <path
        d="M3.5 1.5h5v5M8.5 1.5L4 6M7 6.5v2H1.5V3h2"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
