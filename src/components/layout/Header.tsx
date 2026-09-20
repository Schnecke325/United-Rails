import { externalLinks } from '@/lib/config/links';
import { mainNavigation } from '@/lib/config/navigation';
import { routes } from '@/lib/config/site';
import { ButtonLink } from '@/components/ui/Button';
import { Logo } from './Logo';
import { MainNav } from './MainNav';
import { MobileNav } from './MobileNav';

/**
 * Kopfbereich. Die Navigation wird serverseitig aus der zentralen Konfiguration
 * gebaut, damit nicht konfigurierte externe Ziele gar nicht erst erscheinen.
 *
 * Die beiden Handlungsschaltflächen liegen in einem eigenen Container, der erst
 * ab `sm` erscheint — so entsteht kein Wettstreit zwischen `hidden` und
 * `inline-flex` auf demselben Element.
 */
export function Header() {
  const links = externalLinks();
  const groups = mainNavigation(links);

  return (
    <header
      className={
        'sticky top-0 z-[var(--z-header)] border-b border-[var(--border-subtle)] ' +
        'bg-[color-mix(in_srgb,var(--surface-0)_88%,transparent)] backdrop-blur-md'
      }
    >
      <div className="ur-container flex h-16 items-center justify-between gap-4">
        <Logo />
        <MainNav groups={groups} />
        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-3 sm:flex">
            <ButtonLink href={routes.server} variant="secondary" size="sm">
              Server entdecken
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
