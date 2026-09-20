import { externalLinks } from '@/lib/config/links';
import { mainNavigation } from '@/lib/config/navigation';
import { routes } from '@/lib/config/site';
import { ButtonLink } from '@/components/ui/Button';
import { Logo } from './Logo';
import { MainNav } from './MainNav';
import { MobileNav } from './MobileNav';

/**
 * Kopfbereich. Dunkles Band über der hellen Seite, damit die Navigation als
 * eigener Bereich lesbar bleibt.
 *
 * Die Navigation wird serverseitig aus der zentralen Konfiguration gebaut,
 * damit nicht konfigurierte externe Ziele gar nicht erst erscheinen.
 */
export function Header() {
  const links = externalLinks();
  const groups = mainNavigation(links);

  return (
    <header className="ur-dark sticky top-0 z-[var(--z-header)] border-b border-[var(--border-on-dark)]">
      <div className="ur-container flex h-16 items-center justify-between gap-4">
        <Logo />
        <MainNav groups={groups} />
        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-3 sm:flex">
            <ButtonLink
              href={routes.server}
              variant="secondary"
              size="sm"
              className="border-[var(--border-on-dark)] bg-transparent text-fg-on-dark hover:border-[var(--fg-on-dark-muted)] hover:bg-[var(--surface-dark-2)]"
            >
              Server ansehen
            </ButtonLink>
            <ButtonLink href={routes.builder} size="sm">
              Mitmachen
            </ButtonLink>
          </div>
          <MobileNav groups={groups} />
        </div>
      </div>
    </header>
  );
}
