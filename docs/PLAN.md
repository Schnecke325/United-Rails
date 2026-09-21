# United Rails e.V.: Architektur, Tech-Stack und Roadmap

Grundlage: `docs/MASTER_PROMPT.txt` (vom Nutzer gelieferte Spezifikation).
Stand: 2026-09-20

> **Überholt, was den Tech-Stack angeht.** Dieses Dokument geht von Next.js auf einem
> VPS aus. Der Webhoster stellt kein Node bereit. Gültig sind jetzt
> `docs/ARCHITEKTUR-HOSTING.md` (Entscheidung und Begründung) und
> `docs/MIGRATIONSPLAN.md` (Umstellung Datei für Datei). Die Anforderungsanalyse,
> das Designsystem, das Datenmodell und die Sicherheitsgrundsätze weiter unten
> gelten unverändert.

---

## 1. Anforderungsanalyse (Kurzfassung)

Die Seite ist kein Marketing-Onepager, sondern eine Plattform mit drei Ebenen:

**Öffentlich (anonym nutzbar)**
Startseite, Projekt/Über uns inkl. Historie-Timeline, Serverseite mit Netzkarte und
Verbindungssuche, Galerie (Pinterest-artiges Masonry), Downloads/Modpack,
Builder-Bewerbung, Mitgliedsinteresse, Community-Verweise (Discord, YouTube,
CurseForge, Modrinth), Impressum/Datenschutz als Platzhalter.

**Eingereicht von der Community (schreibend, aber nicht sofort sichtbar)**
Galerie-Uploads, Builder-Bewerbungen mit Portfoliobildern, Mitgliedsinteresse.
Alles läuft über einen Moderationsstatus, nichts wird ohne Freigabe öffentlich.

**Intern (geschützt)**
Admin-Dashboard mit Moderationsqueue, Bewerbungsverwaltung, Modpack-Releases,
Team- und Rollenverwaltung, Audit-Log.

Drei Dinge prägen die Architektur besonders:

1. **Unbekannte Außenwelt.** CRN-API, Storage-Provider, Server-Status-Quelle und
   ein Teil der URLs sind noch offen. Alles davon wird hinter einer eigenen
   Schnittstelle gekapselt, damit später nur ein Adapter getauscht wird.
2. **Identität ≠ Berechtigung.** Discord meldet an, die Datenbank entscheidet über
   Rechte. Discord-Rollen werden bewusst nicht auf Webseitenrechte gemappt.
3. **Uploads sind der sensibelste Teil.** Jeder Upload wird serverseitig geprüft,
   umbenannt, neu kodiert und außerhalb des Webroots abgelegt.

---

## 2. Tech-Stack und Begründung

| Baustein | Wahl | Warum |
|---|---|---|
| Framework | **Next.js 15, App Router, TypeScript** | React-basiert (von der Vorgabe bevorzugt), Frontend und Backend in einem Deployment, Server Components für schnelle öffentliche Seiten, Route Handlers für API. Läuft als normaler Node-Prozess hinter nginx auf einem VPS, genau das, was der Hoster anbietet. |
| Styling | **Tailwind CSS v4 auf CSS-Custom-Properties** | Die Design-Tokens liegen als CSS-Variablen in einer Datei; Tailwind nutzt sie. Farb- oder Akzentwechsel später an einer Stelle. |
| Datenbank | **PostgreSQL** | Relational wie gefordert, auf jedem VPS verfügbar, gute Volltext- und JSON-Unterstützung für Fahrplandaten. |
| ORM | **Prisma** | Typisiertes Schema, Migrationen, klare Trennung von Datenzugriff und Logik. |
| Auth | **Auth.js (NextAuth v5) mit Discord-Provider, Prisma-Adapter, DB-Sessions** | Nur OAuth, keine eigenen Passwörter. State- und PKCE-Handling kommt aus der Bibliothek. Rollen kommen aus der eigenen Tabelle. |
| Validierung | **Zod** | Ein Schema pro Formular, geteilt zwischen Client und Server; die Serverprüfung ist die verbindliche. |
| Bilder | **sharp** | Re-Encoding (entfernt eingebetteten Schadcode), Thumbnails, WebP/AVIF. |
| Karte | **Leaflet mit CRS.Simple und eigener Tile-Layer** | Passt exakt zum Raster `tile_z_x_y.png`, kann Zoom, Pan, Marker, Linien und später Zugpositionen. Kein BlueMap, keine Riesen-PNG. |
| Tests | **Vitest** (+ Playwright optional später) | Schnell, TypeScript-nativ; deckt Services, Berechtigungen, Validierung und Adapter ab. |
| Rate Limiting | eigene kleine Abstraktion, Start in Postgres | Kein Redis-Zwang; später austauschbar. |

Bewusst **nicht** gewählt: ein getrenntes Backend (unnötige Komplexität für ein
Vereinsprojekt), Redis/Queue als Pflicht, ein CMS, BlueMap.

---

## 3. Projektstruktur

```
united-rails/
├── prisma/
│   ├── schema.prisma            # alle Entitäten
│   ├── migrations/
│   └── seed.ts                  # Kategorien, Rollen, Berechtigungen
├── public/                      # statische Assets, favicon, og-image
├── src/
│   ├── app/
│   │   ├── (public)/            # öffentliches Layout
│   │   │   ├── page.tsx                 # Home
│   │   │   ├── projekt/                 # Projekt + Historie
│   │   │   ├── ueber-uns/               # Verein, Team
│   │   │   ├── server/                  # Karte, Navigator, Status
│   │   │   ├── galerie/                 # Masonry, Upload
│   │   │   ├── downloads/               # Modpack-Releases
│   │   │   ├── builder/                 # Builder-Bewerbung
│   │   │   ├── mitgliedschaft/          # Mitgliedsinteresse
│   │   │   ├── impressum/ datenschutz/  # PLATZHALTER
│   │   ├── (admin)/admin/       # geschützter Bereich
│   │   │   ├── page.tsx                 # Dashboard
│   │   │   ├── bewerbungen/ galerie/ modpacks/ server/ team/ einstellungen/
│   │   ├── api/                 # Route Handlers (Auth, Uploads, CRN-Proxy)
│   │   ├── not-found.tsx        # "Diese Strecke wurde nicht gefunden."
│   │   └── error.tsx            # "Signalstörung."
│   ├── components/
│   │   ├── ui/                  # Button, Input, Badge, Dialog, …
│   │   ├── layout/              # Header, MobileMenu, Footer
│   │   ├── home/ gallery/ map/ navigator/ modpack/ admin/
│   ├── lib/
│   │   ├── config/              # site.ts (alle externen URLs), env.ts (Zod-geprüft)
│   │   ├── auth/                # Auth.js-Setup, Session-Helfer
│   │   ├── permissions/         # Rollen, Rechte, requirePermission()
│   │   ├── db/                  # Prisma-Client
│   │   ├── validation/          # Zod-Schemas
│   │   └── utils/
│   ├── services/
│   │   ├── storage/             # StorageService + local/s3-Treiber
│   │   ├── railway/             # railwayApi, railwayAdapter (CRN, TODO)
│   │   ├── gallery/ applications/ modpack/ audit/ serverStatus/
│   └── styles/tokens.css        # Design-Tokens
├── tests/
├── .env.example                 # nur leere Platzhalter
└── README.md
```

Regel: Seiten rendern, Services entscheiden, Prisma greift zu. Keine Datenbankabfrage
direkt in einer Komponente, keine Geschäftslogik in einer Route.

---

## 4. Designsystem

Hell, luftig, technisch. Der industrielle Bahncharakter kommt aus Layout, Typografie,
Linien und Rastern, nicht aus dunklen Flächen. Minecraft bleibt ein Detail.

- **Grundfläche:** Weiß, dazu ein sehr helles Stahlgrau als Band für abgesetzte
  Abschnitte (`--surface-0` bis `--surface-3`)
- **Dunkel gezielt:** Kopfbereich, mobiles Menü und Fußbereich stehen auf
  `--surface-dark`. Die Hilfsklasse `.ur-dark` schaltet Text- und Rahmenfarben mit um,
  damit Komponenten nicht jede Farbe einzeln kennen müssen.
- **Akzent:** ein Signalton in drei Abstufungen, weil Kontrast und Signalwirkung sich
  sonst widersprechen: `--accent-bright` nur für Grafik, `--accent` als Fläche hinter
  weißem Text (4.7:1), `--accent-text` für Text und Links auf hellem Grund (5.5:1)
- **Status:** eigene Töne für Frei, Halt und Warnung, wiederverwendet für
  PENDING, APPROVED, REJECTED und den Serverstatus
- **Typografie:** Inter für Fließtext, IBM Plex Mono für Fahrplan- und
  Anzeigetafel-Elemente
- **Struktur:** feines Ingenieurraster, Blaupausen-Linien, Gleis-Trenner
- **Bilder statt Symbole:** Wo ein Bild hingehört, steht die Komponente
  `ImagePlaceholder` mit festem Seitenverhältnis und Beschriftung. Symbole gibt es nur
  dort, wo sie eine Funktion haben: Menü, Schließen, Aufklappen, externer Link.
- **Bewegung:** kurze Fades, Hover-Zustände, sonst nichts

Alle Werte stehen als CSS-Variablen in `src/styles/tokens.css`. Keine Farbe steht in
einer Komponente. Die Kontrastwerte sind gegen die Zielwerte der WCAG-Stufe AA geprüft.

## 5. Datenmodell (Kern)

```
User            ← Discord-Identität (discordId, username, avatar)
Role            ← OWNER, ADMIN, MODERATOR, BUILDER_TEAM, GALLERY_TEAM
Permission      ← feingranular, Rolle↔Recht als n:m
TeamMember      ← öffentliches Profil + aktiv/inaktiv

BuilderApplication      (NEW, REVIEWING, ACCEPTED, REJECTED, NEEDS_INFORMATION)
  └─ BuilderApplicationImage
MembershipApplication   (Interesse, ausdrücklich kein Rechtsakt)

GalleryImage    (PENDING, APPROVED, REJECTED) ─ n:m ─ GalleryCategory  (feste Liste)
ModpackVersion  ─ 1:n ─ ModpackFile           (aktuelle Version markiert)
Station, Route, RouteStop, Train, MapTile      (lokale Sicht, CRN füllt später)
AuditLog        (Akteur, Aktion, Objekt, Zeitpunkt, Kontext)
```

Die Bewerbung trägt das Feld „Interesse an Vereinsmitgliedschaft" als Ankreuzoption,
so wie die Vorgabe es verlangt.

---

## 6. Offene Punkte, die Platzhalter bleiben

| Thema | Umgang |
|---|---|
| CRN-API | Adapter-Schicht mit TODO; keine erfundenen Endpunkte, Formate oder Auth |
| Server-Status | Architektur steht, Anzeige zeigt sichtbar „keine Datenquelle" statt Fantasiezahlen |
| Discord-, CurseForge-, Modrinth-, Galerie-, Server-, Hoster-URL | leer in `.env.example`, Links werden ausgeblendet solange unkonfiguriert |
| Vereinshistorie | `[PLATZHALTER: OFFIZIELLE UNITED-RAILS-HISTORIE]` |
| Impressum, Datenschutz | Platzhalterseiten mit Hinweis, kein erfundener Rechtstext |
| Team, echte Personen | keine erfundenen Profile; Struktur vorhanden, Inhalt kommt vom Verein |
| Storage-Provider | `StorageService` mit lokalem Treiber, S3-kompatibler Treiber vorbereitet |
| Karten-Tiles | Komponente lädt Raster; ohne Tiles zeigt sie einen deutlichen Hinweis |

---

## 7. Umsetzungs-Roadmap

| Phase | Inhalt | Ergebnis |
|---|---|---|
| **1** | Projektaufbau, TypeScript, Tailwind, Env-Validierung, zentrale URL-Konfiguration, README, `.env.example` | lauffähiges Grundgerüst |
| **2** | Designsystem, Header mit Mobile-Menü, Footer, 404/500, Grundkomponenten | konsistentes Layout |
| **3** | Öffentliches Routing und Seitengerüste, Home mit allen zehn Abschnitten | vollständige Seitenstruktur |
| **4** | Prisma-Schema, Migrationen, Seed | Datenbankfundament |
| **5** | Discord-OAuth, Sessions | Anmeldung |
| **6** | Rollen und Rechte, `requirePermission()`, Audit-Log | Autorisierung |
| **7** | Admin-Dashboard mit Übersicht | geschützter Bereich |
| **8** | Builder-Bewerbung inkl. Upload-Sicherheit und Bearbeitung im Admin | Bewerbungen laufen |
| **9** | Mitgliedsinteresse, beide Wege | Mitgliedschaft |
| **10** | Galerie, Masonry, Upload, Moderationsqueue | Galerie live |
| **11** | Modpack-Releases mit Pflege im Admin | Downloads |
| **12** | Storage-Abstraktion, Thumbnails, Bildoptimierung | Dateien sauber abgelegt |
| **13** | Serverseite: Tile-Karte, Stationen, Verbindungssuche-UI | Serverseite |
| **14** | CRN-Adapter als Schnittstellenpunkt, ohne Erfindungen | Integrationspunkt |
| **15** | SEO, Barrierefreiheit, Performance | Feinschliff |
| **16** | Tests für Auth, Rechte, Bewerbungen, Moderation, Uploads, Adapter | Absicherung |
| **17** | Deployment-Dokumentation, Backups | Betriebsreife |

Phase 1 bis 3 liefern eine sichtbare Seite, ab Phase 4 wächst die Plattform dahinter.

---

## 8. Sicherheitsgrundsätze

- Jede geschützte Operation prüft serverseitig, Frontend-Prüfungen sind nur Komfort.
- Uploads: MIME- und Endungsprüfung, Größenlimit, generierter Dateiname, Re-Encoding
  durch sharp, Ablage außerhalb des Webroots, niemals ausführbare Dateien.
- Öffentliche Formulare mit Rate Limit.
- Keine Secrets im Frontend, keine Secrets im Repository, nur `.env.example` mit leeren Werten.
- Fehlerseiten ohne Stacktrace.
- Administrative Aktionen landen im Audit-Log.
