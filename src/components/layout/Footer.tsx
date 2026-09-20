import Link from 'next/link';
import { externalLinks } from '@/lib/config/links';
import { footerNavigation } from '@/lib/config/navigation';
import { site } from '@/lib/config/site';
import type { NavItem } from '@/lib/config/navigation';

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
    <footer className="border-t border-[var(--border-subtle)] bg-[var(--surface-1)]">
      <div className="ur-container py-12">
        <div className="ur-rail-divider mb-10" aria-hidden />

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <p className="text-lg font-semibold">{site.name}</p>
            <p className="ur-display mt-1 text-xs uppercase text-fg-muted">
              {site.tagline}
            </p>
            <p className="mt-4 max-w-xs text-sm text-fg-muted">
              {site.description}
            </p>
          </div>

          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <p className="ur-display text-xs uppercase text-fg-muted">
                {column.title}
              </p>
              <ul className="mt-4 space-y-2">
                {column.items.map((item) => (
                  <li key={`${item.label}-${item.href}`}>
                    <Link
                      href={item.href}
                      {...(item.external
                        ? { target: '_blank', rel: 'noopener noreferrer' }
                        : {})}
                      className="text-sm text-fg-secondary transition-colors hover:text-accent"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-[var(--border-subtle)] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-fg-muted">
            © {year} {site.name}
          </p>
          <ul className="flex flex-wrap gap-5">
            {nav.rechtliches.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-xs text-fg-muted transition-colors hover:text-fg"
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
