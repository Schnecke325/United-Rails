# Migrationsplan: Next.js zu Laravel

Stand: 2026-09-21. Grundlage ist die Entscheidung für Weg A aus
`docs/ARCHITEKTUR-HOSTING.md`.

Ziel: Das bestehende Erscheinungsbild und die Seitenstruktur bleiben erhalten. Getauscht
wird die Technik darunter. Eine fertig migrierte Seite soll im Browser nicht von der
heutigen zu unterscheiden sein.

Eine Korrektur zum Architekturdokument: Aktuell ist Laravel 13, nicht 12. Es verlangt
PHP 8.3 oder neuer, der Hoster liefert 8.4.25. Passt.

---

## 1. Grundsätze der Migration

1. **Das CSS wird nicht neu geschrieben.** `tokens.css` und `globals.css` sind reines
   CSS und wandern unverändert in `resources/css/`. Alle Farben, Abstände, Schriftgrößen
   und die Hilfsklassen `.ur-*` bleiben, wie sie sind.
2. **Die Auszeichnung wandert eins zu eins.** Aus jeder React-Komponente wird eine
   Blade-Komponente mit denselben Tailwind-Klassen und derselben Struktur.
3. **Texte werden nicht angefasst.** Jeder deutsche Satz, jede Beschriftung und jeder
   Platzhalter wird übernommen. Es kommt kein Wort dazu.
4. **React wird durch Alpine.js ersetzt**, aber nur dort, wo wirklich etwas passiert:
   aufklappende Menüs und das mobile Vollbildmenü. Alles andere ist serverseitig gerendert.
5. **Kein Anbieter im Quelltext.** Datenbank und Dateispeicher kommen ausschließlich aus
   Umgebungsvariablen.
6. **Ein Schritt nach dem anderen.** Nach jedem Abschnitt muss die Seite laufen.

---

## 2. Datei für Datei

### 2.1 Wird unverändert übernommen

| Datei | Neues Ziel | Anmerkung |
|---|---|---|
| `src/styles/tokens.css` | `resources/css/tokens.css` | reines CSS, keine Änderung |
| `public/favicon.svg` | `public/favicon.svg` | bleibt |
| `public/robots.txt` | `public/robots.txt` | bleibt |
| `docs/MASTER_PROMPT.txt` | bleibt | Vorgabe |
| `docs/PLAN.md` | bleibt | bekommt einen Verweis auf die neue Architektur |
| `docs/ARCHITEKTUR-HOSTING.md` | bleibt | Begründung der Entscheidung |

### 2.2 Wird übernommen, mit kleiner Anpassung

| Datei | Neues Ziel | Was sich ändert |
|---|---|---|
| `src/styles/globals.css` | `resources/css/app.css` | `@source` zeigt auf `resources/views`; die Schriftvariablen kommen nicht mehr von `next/font`, sondern aus selbst ausgelieferten Schriftdateien |
| `src/lib/config/site.ts` | `config/site.php` | Stammdaten und Routennamen, gleiche Werte |
| `src/lib/config/links.ts` | `app/Support/ExternalLinks.php` | gleiche Logik: leere URL bedeutet, der Link erscheint nirgends |
| `src/lib/config/navigation.ts` | `app/Support/Navigation.php` | gleiche Struktur, gleiche Beschriftungen, gleiche Regeln für externe Einträge |
| `src/lib/config/env.ts` | `config/site.php`, `config/services.php`, `app/Support/Features.php` | Zod entfällt, Laravel liest die Umgebung. Die Funktion `features()` wird zu `Features::*`, die Sichtbarkeitsregeln bleiben |
| `src/services/serverStatus/serverStatusService.ts` | `app/Services/ServerStatus/` | gleicher Adapter-Gedanke, gleiches Verhalten ohne Datenquelle |
| `src/services/gallery/types.ts`, `src/services/modpack/types.ts`, `src/services/serverStatus/types.ts` | `app/Enums/`, `app/Data/` | aus TypeScript-Typen werden PHP-Enums und schlichte Wertobjekte |
| `tests/config/navigation.test.ts` | `tests/Feature/NavigationTest.php` | dieselben Fälle, in PHPUnit statt Vitest |
| `.env.example` | `.env.example` | neue Variablen für MySQL und S3, die alten Platzhalter bleiben |
| `README.md` | `README.md` | Installation, Build und Deployment neu für Plesk |
| `.gitignore` | `.gitignore` | Laravel-Einträge statt Next.js-Einträge |

### 2.3 Wird in Blade neu geschrieben, Inhalt bleibt

Alle Komponenten. Die Struktur und die Klassen wandern mit, nur die Sprache ändert sich.

| Bisher | Neu | Besonderheit |
|---|---|---|
| `components/ui/Button.tsx` | `components/ui/button.blade.php` | |
| `components/ui/Card.tsx` | `components/ui/card.blade.php` | |
| `components/ui/Section.tsx` | `components/ui/section.blade.php` | |
| `components/ui/Prose.tsx` | `components/ui/prose.blade.php` | |
| `components/ui/Placeholder.tsx` | `components/ui/placeholder.blade.php` | Platzhaltermarken bleiben wortgleich |
| `components/ui/ImagePlaceholder.tsx` | `components/ui/image-placeholder.blade.php` | |
| `components/ui/StatusBadge.tsx` | `components/ui/status-badge.blade.php` | |
| `components/layout/Header.tsx` | `components/layout/header.blade.php` | |
| `components/layout/Footer.tsx` | `components/layout/footer.blade.php` | |
| `components/layout/Logo.tsx` | `components/layout/logo.blade.php` | das gezeichnete Signet bleibt |
| `components/layout/PageHeader.tsx` | `components/layout/page-header.blade.php` | |
| `components/layout/SkipLink.tsx` | `components/layout/skip-link.blade.php` | |
| `components/layout/MainNav.tsx` | `components/layout/main-nav.blade.php` | React-Zustand wird Alpine: Aufklappen, Klick nach außen, Escape |
| `components/layout/MobileNav.tsx` | `components/layout/mobile-nav.blade.php` | Alpine mit `x-teleport` statt React-Portal, Scroll-Sperre bleibt |
| `components/home/Hero.tsx` | `components/home/hero.blade.php` | |
| `components/home/FeatureGrid.tsx` | `components/home/feature-grid.blade.php` | |
| `components/home/Timeline.tsx` | `components/home/timeline.blade.php` | |
| `components/home/ServerStatusPanel.tsx` | `components/home/server-status-panel.blade.php` | zeigt weiter ausdrücklich „keine Daten" |
| `components/home/CommunityPanels.tsx` | `components/home/community-panels.blade.php` | |
| `components/home/HosterBanner.tsx` | `components/home/hoster-banner.blade.php` | |
| `components/gallery/GalleryPreview.tsx` | `components/gallery/preview.blade.php` | |
| `components/gallery/MasonryGrid.tsx` | `components/gallery/masonry-grid.blade.php` | CSS-Spalten, kein JavaScript nötig |
| `components/gallery/EmptyGallery.tsx` | `components/gallery/empty.blade.php` | |
| `components/modpack/ModpackCurrent.tsx` | `components/modpack/current.blade.php` | |
| `components/modpack/ModpackArchive.tsx` | `components/modpack/archive.blade.php` | |

### 2.4 Seiten: gleiche Adressen, neue Vorlagen

Die URLs bleiben exakt gleich, damit später nichts umgeleitet werden muss.

| Bisher | Neu | Adresse |
|---|---|---|
| `app/layout.tsx` | `resources/views/layouts/app.blade.php` | Meta-Angaben, Open Graph, Schriften |
| `app/(public)/layout.tsx` | `resources/views/layouts/public.blade.php` | Kopf, Inhalt, Fuß |
| `app/(public)/page.tsx` | `pages/home.blade.php` | `/` |
| `app/(public)/projekt/page.tsx` | `pages/projekt/index.blade.php` | `/projekt` |
| `app/(public)/projekt/historie/page.tsx` | `pages/projekt/historie.blade.php` | `/projekt/historie` |
| `app/(public)/ueber-uns/page.tsx` | `pages/ueber-uns/index.blade.php` | `/ueber-uns` |
| `app/(public)/ueber-uns/team/page.tsx` | `pages/ueber-uns/team.blade.php` | `/ueber-uns/team` |
| `app/(public)/server/page.tsx` | `pages/server/index.blade.php` | `/server` |
| `app/(public)/server/karte/page.tsx` | `pages/server/karte.blade.php` | `/server/karte` |
| `app/(public)/server/navigator/page.tsx` | `pages/server/navigator.blade.php` | `/server/navigator` |
| `app/(public)/galerie/page.tsx` | `pages/galerie/index.blade.php` | `/galerie` |
| `app/(public)/galerie/upload/page.tsx` | `pages/galerie/upload.blade.php` | `/galerie/upload` |
| `app/(public)/downloads/page.tsx` | `pages/downloads.blade.php` | `/downloads` |
| `app/(public)/mitmachen/builder/page.tsx` | `pages/mitmachen/builder.blade.php` | `/mitmachen/builder` |
| `app/(public)/mitmachen/mitgliedschaft/page.tsx` | `pages/mitmachen/mitgliedschaft.blade.php` | `/mitmachen/mitgliedschaft` |
| `app/(public)/community/page.tsx` | `pages/community.blade.php` | `/community` |
| `app/(public)/impressum/page.tsx` | `pages/impressum.blade.php` | `/impressum` |
| `app/(public)/datenschutz/page.tsx` | `pages/datenschutz.blade.php` | `/datenschutz` |
| `app/not-found.tsx` | `resources/views/errors/404.blade.php` | „Diese Strecke wurde nicht gefunden." |
| `app/error.tsx` | `resources/views/errors/500.blade.php` | „Signalstörung." |

### 2.5 Fällt ersatzlos weg

Werkzeugdateien der alten Kette. Ihr Zweck wird von Laravel oder Composer übernommen.

| Datei | Warum |
|---|---|
| `next.config.ts` | kein Next.js mehr |
| `tsconfig.json` | kein TypeScript mehr im Projekt |
| `eslint.config.mjs` | ersetzt durch Laravel Pint für PHP |
| `vitest.config.ts` | ersetzt durch PHPUnit |
| `postcss.config.mjs` | Tailwind 4 läuft über das Vite-Plugin |
| `package-lock.json` | wird neu erzeugt, die Abhängigkeiten schrumpfen stark |
| `src/lib/utils/cn.ts` | Blade hat dafür `@class` |

`package.json` bleibt, enthält aber nur noch, was der Asset-Build braucht: Tailwind, Vite
und Alpine. Node läuft damit nur noch auf dem Entwicklungsrechner und in GitHub Actions,
nie auf dem Webspace.

---

## 3. Was neu dazukommt

| Neu | Zweck |
|---|---|
| `composer.json`, `artisan`, `bootstrap/`, `config/`, `routes/web.php` | Laravel-Grundgerüst |
| `config/database.php` mit MySQL aus der Umgebung | externe Datenbank, TLS-Option vorbereitet |
| `config/filesystems.php` mit S3-kompatibler Platte | Endpunkt, Bucket, Region, Schlüssel und öffentliche Basis-URL kommen aus der Umgebung. Kein Anbietername im Code |
| `app/Support/Navigation.php`, `ExternalLinks.php`, `Features.php` | die bisherige Konfigurationsschicht in PHP |
| `app/Http/Controllers/PageController.php` | liefert die öffentlichen Seiten |
| `resources/js/app.js` mit Alpine | die wenigen interaktiven Stellen |
| `resources/css/fonts.css` und `public/fonts/` | Inter und IBM Plex Mono selbst ausliefern. Keine Einbindung von Google-Servern, das wäre datenschutzrechtlich heikel und war mit `next/font` bisher auch nicht der Fall |
| `.github/workflows/assets.yml` | baut CSS und JS, damit der Webspace nichts bauen muss |
| `tests/Feature/` | Navigation, Platzhalterregel, Erreichbarkeit aller Seiten |
| `docs/DEPLOYMENT.md` | Plesk, Document Root, Deployment-Aktionen, geplante Aufgaben |

---

## 4. Reihenfolge

| Schritt | Inhalt | Danach prüfbar |
|---|---|---|
| 1 | Laravel-Grundgerüst, alte Next.js-Dateien entfernen, `.gitignore` und `.env.example` | `php artisan serve` startet |
| 2 | Asset-Kette: Vite, Tailwind 4, Tokens, Schriften, Alpine | Startseite lädt das gebaute CSS |
| 3 | Konfigurationsschicht: `config/site.php`, `ExternalLinks`, `Navigation`, `Features` | Tests für die Platzhalterregel laufen |
| 4 | Layout: Kopf, Navigation, mobiles Menü, Fuß, Fehlerseiten | Rahmen steht auf Desktop und Mobil |
| 5 | UI-Bausteine: Button, Card, Section, Prose, Platzhalter, Statusmarke | Bausteine da |
| 6 | Startseite mit allen Abschnitten | Startseite sieht aus wie bisher |
| 7 | Die übrigen 17 öffentlichen Seiten | alle Adressen erreichbar |
| 8 | Datenbank- und Speicherkonfiguration, Adapter für den Serverstatus | Konfiguration greift, ohne dass ein Anbieter feststeht |
| 9 | Tests, Pint, Build | grün |
| 10 | README und Deployment-Dokumentation | nachvollziehbar aufsetzbar |

---

## 5. Was dieser Durchgang bewusst nicht enthält

Das folgt danach, in der Reihenfolge aus `docs/ARCHITEKTUR-HOSTING.md`:

- Migrationen und Datenmodell
- Discord-Anmeldung, Rollen und Rechte
- Uploads, Galerie-Moderation, Modpack-Verwaltung
- Adminbereich
- Karte und Verbindungssuche mit echten Daten
- CRN-Anbindung

Bis dahin bleibt alles, was heute Platzhalter ist, Platzhalter. Es wird nichts erfunden.

---

## 6. Was dabei verloren geht

Ehrlich benannt, damit es keine Überraschung gibt:

- Die Typsicherheit von TypeScript über das gesamte Frontend. PHP mit strikten Typen und
  PHPStan kann das für die Serverseite auffangen, für die Vorlagen nicht vollständig.
- Die React-Komponentenmodelle. Blade-Komponenten können dasselbe, aber der Code sieht
  anders aus.
- Die Vitest-Tests. Es gibt bisher einen, er wird in PHPUnit nachgebaut.

Was nicht verloren geht: das Design, die Texte, die Seitenstruktur, die Platzhalterregeln
und die Architekturgrundsätze.
