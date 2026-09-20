import Link from 'next/link';
import { externalLinks } from '@/lib/config/links';
import { footerNavigation } from '@/lib/config/navigation';
import { site } from '@/lib/config/site';
import type { NavItem } from '@/lib/config/navigation';

/** Fußbereich als dunkles Band, das die helle Seite unten abschließt. */
export function Footer() {
  const links = externalLinks();
  const nav = footerNavigation(links);
  const year = new Date().getFullYear();

  const columns: Array<{ title: string; items: NavItem[] }> = [
    { title: 'Projekt', items: nav.projekt },
    { title: 'Plattform', items: nav.plattform },
    { title: 'Mitmachen', items: nav.mitmachen },
  ];

  if (nav.extern.length > 0) {
    columns.push({ title: 'Community', items: nav.extern });
  }

  return (
    <footer className="ur-dark">
      <div className="ur-container py-14">
        <div className="ur-rail-divider mb-12" aria-hidden />

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <p className="text-lg font-semibold text-fg-on-dark">{site.name}</p>
            <p className="ur-display mt-1 text-xs uppercase text-fg-on-dark-muted">
              {site.tagline}
            </p>
            <p className="mt-4 max-w-xs text-sm text-fg-on-dark-muted">{site.description}</p>
          </div>

          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <p className="ur-display text-xs uppercase text-fg-on-dark-muted">{column.title}</p>
              <ul className="mt-4 space-y-2.5">
                {column.items.map((item) => (
                  <li key={`${item.label}-${item.href}`}>
                    <Link
                      href={item.href}
                      {...(item.external
                        ? { target: '_blank', rel: 'noopener noreferrer' }
                        : {})}
                      className="text-sm text-fg-on-dark-secondary transition-colors hover:text-fg-on-dark"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-[var(--border-on-dark)] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-fg-on-dark-muted">
            © {year} {site.name}
          </p>
          <ul className="flex flex-wrap gap-5">
            {nav.rechtliches.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-xs text-fg-on-dark-muted transition-colors hover:text-fg-on-dark"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
