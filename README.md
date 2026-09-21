# United Rails e.V.: Webseite

Webplattform für United Rails e.V.: öffentlicher Auftritt des Vereins und des
Minecraft-Eisenbahnprojekts, Galerie mit Moderation, Bewerbungen, Modpack-Downloads,
Serverseite mit Netzkarte und Verbindungssuche sowie ein geschützter interner Bereich.

> **Stand der Umsetzung**
> Gerüst, Designsystem, öffentliche Seitenstruktur und die zentrale Konfiguration stehen.
> Datenbank, Discord-Anmeldung, Rechte, Admin-Bereich, Formulare, Galerie, Modpack-Pflege,
> Karte und CRN-Anbindung folgen in den nächsten Ausbaustufen.
> Siehe `docs/ARCHITEKTUR-HOSTING.md` und `docs/MIGRATIONSPLAN.md`.

---

## Warum Laravel und nicht Next.js

Die erste Fassung lief auf Next.js. Der Webhoster stellt PHP 8.4, Composer, Git und
geplante Aufgaben bereit, aber kein Node. Damit kann Next.js dort nicht laufen. Die
Entscheidung und die verworfenen Alternativen stehen in `docs/ARCHITEKTUR-HOSTING.md`,
die Umstellung Datei für Datei in `docs/MIGRATIONSPLAN.md`.

Design, Texte, Seitenstruktur und Adressen sind dabei unverändert geblieben.

---

## Voraussetzungen

| Werkzeug | Version | Zweck |
|---|---|---|
| PHP | 8.3 oder neuer (Hoster: 8.4.25) | Laufzeit |
| Composer | 2 | Paketverwaltung PHP |
| Node.js | 22 | nur für den Asset-Build, nie auf dem Server |
| MySQL | 8 oder MariaDB, extern | Datenbank (ab der Ausbaustufe "Datenbank") |
| S3-kompatibler Speicher | extern | Bilder, Kacheln, Modpack-Archive |

PHP-Erweiterungen: `pdo_mysql`, `mbstring`, `openssl`, `curl`, `fileinfo`, `zip`,
`intl` sowie `gd` oder `imagick`.

Node läuft ausschließlich auf dem Entwicklungsrechner und in GitHub Actions. Auf dem
Webspace wird nichts gebaut.

---

## Installation

```bash
git clone <repository-url>
cd united-rails

composer install
npm install

cp .env.example .env     # Werte eintragen, siehe unten
php artisan key:generate

npm run build            # CSS und JS nach public/build
php artisan serve        # http://localhost:8000
```

Während der Entwicklung parallel in einem zweiten Fenster:

```bash
npm run dev              # baut Assets neu, sobald sich etwas ändert
```

`.env` wird nie eingecheckt. Im Repository liegt ausschließlich `.env.example` mit
leeren Platzhaltern.

---

## Umgebungsvariablen

Alle Variablen stehen mit Erklärung in `.env.example`. Grundsatz: Was noch nicht
feststeht, bleibt leer und wird im Auftritt ausgeblendet oder als Platzhalter
gekennzeichnet. Es wird nichts erfunden.

**Anwendung**

| Variable | Bedeutung |
|---|---|
| `APP_URL` | Öffentliche Basis-URL. Die Domain steht nur hier, nirgends im Quelltext. |
| `APP_KEY` | Wird von `php artisan key:generate` gesetzt. |
| `APP_DEBUG` | Im Betrieb `false`. Fehlerseiten zeigen nie einen Stacktrace. |

**Datenbank, extern**

| Variable | Bedeutung |
|---|---|
| `DB_HOST`, `DB_PORT`, `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD` | Zugang zur externen Datenbank. |
| `DB_SSL_CA` | Pfad zum CA-Zertifikat, falls der Anbieter TLS verlangt. |
| `DB_SSL_VERIFY` | Prüfung des Serverzertifikats, standardmäßig an. |

**Dateiablage, extern und S3-kompatibel**

| Variable | Bedeutung |
|---|---|
| `FILESYSTEM_DISK` | `local` für die Entwicklung, `s3` im Betrieb. |
| `STORAGE_ENDPOINT` | Adresse des Anbieters. Leer, wenn er die Standardadresse nutzt. |
| `STORAGE_REGION`, `STORAGE_BUCKET` | Region und Bucket. |
| `STORAGE_ACCESS_KEY`, `STORAGE_SECRET_KEY` | Zugangsdaten. |
| `STORAGE_PUBLIC_BASE_URL` | Adresse, unter der Besucher die Dateien sehen. |
| `STORAGE_PATH_STYLE` | `true` bei Anbietern, die den Bucket im Pfad erwarten. |

Kein Anbietername steht im Quelltext. Ein Wechsel ist eine Änderung an `.env`.

**Discord-Anmeldung**

| Variable | Bedeutung |
|---|---|
| `DISCORD_CLIENT_ID`, `DISCORD_CLIENT_SECRET` | Zugangsdaten der Discord-Anwendung. |
| `DISCORD_REDIRECT_URI` | Rückleitungsadresse, muss in Discord hinterlegt sein. |

Discord meldet nur an. Rechte auf der Webseite kommen ausschließlich aus der Datenbank,
nie aus Discord-Rollen.

**Externe Ziele**

`DISCORD_URL`, `CURSEFORGE_URL`, `MODRINTH_URL`, `YOUTUBE_URL`, `GALLERY_URL`,
`SERVER_URL`, `HOSTER_URL`.

Ist ein Wert leer, verschwindet der zugehörige Link im gesamten Auftritt: Navigation,
Fußbereich und Seiten. Es wird nie ins Leere verlinkt. Geprüft wird das in
`tests/Feature/NavigationTest.php`.

**Noch offen**

`CRN_API_BASE_URL`, `CRN_API_KEY` und `SERVER_STATUS_API_URL` bleiben leer, bis die
jeweilige Dokumentation vorliegt. Solange zeigt die Seite sichtbare Platzhalter statt
erfundener Werte.

---

## Datenbank und Migrationen

```bash
php artisan migrate            # Entwicklung
php artisan migrate --force    # Betrieb, Teil des Deployments
```

Das eigentliche Datenmodell (Rollen, Rechte, Galerie, Bewerbungen, Modpack, Audit-Log)
folgt in der nächsten Ausbaustufe.

---

## Entwicklung

```bash
php artisan serve        # Anwendung
npm run dev              # Assets beobachten
php artisan test         # Tests
vendor/bin/pint          # Codestil
vendor/bin/pint --test   # nur prüfen, ändert nichts
```

---

## Aufbau

```
united-rails/
├── app/
│   ├── Data/                  # Wertobjekte für die Oberfläche
│   ├── Enums/                 # feste Listen: Kategorien, Status, Loader
│   ├── Http/Controllers/      # liefern die Seiten
│   ├── Services/              # ServerStatus, später CRN, Galerie, Modpack
│   └── Support/               # Navigation, externe Ziele, Feature-Schalter
├── config/site.php            # Stammdaten und externe Ziele an einer Stelle
├── docs/                      # Vorgabe, Architektur, Migrationsplan, Deployment
├── resources/
│   ├── css/                   # tokens.css, fonts.css, app.css
│   ├── js/app.js              # Alpine, nur für Menüs
│   └── views/
│       ├── components/        # ui, layout, home, gallery, modpack
│       ├── errors/            # 404 und 500
│       ├── layouts/           # app und public
│       └── pages/             # die öffentlichen Seiten
├── routes/web.php             # alle Adressen mit Namen
└── tests/
```

Regel: Seiten rendern, Services entscheiden, die Datenschicht greift zu. Keine Abfrage
in einer Vorlage, keine Geschäftslogik in einer Route.

---

## Designsystem

Hell, luftig, technisch. Der industrielle Bahncharakter kommt aus Layout, Typografie,
Linien und Rastern, nicht aus dunklen Flächen. Dunkel stehen nur Kopfbereich, mobiles
Menü und Fußbereich.

Alle Farben, Abstände, Schriftgrößen und Radien stehen als CSS-Variablen in
`resources/css/tokens.css`. Keine Farbe steht in einer Komponente. Tailwind greift über
`@theme inline` in `resources/css/app.css` auf dieselben Variablen zu.

Die Schriften Inter und IBM Plex Mono liefert die Seite selbst aus. Es wird keine
Schrift von einem fremden Server geladen.

Wo ein Bild hingehört, steht `<x-ui.image-placeholder>` mit festem Seitenverhältnis, damit
sich beim Austausch nichts verschiebt. Symbole gibt es nur dort, wo sie eine Funktion
haben: Menü, Schließen, Aufklappen, externer Link.

---

## Produktionsbuild und Deployment

```bash
npm run build
composer install --no-dev --optimize-autoloader
php artisan config:cache route:cache view:cache
```

Der vollständige Ablauf für Plesk, einschließlich Document Root, Deployment-Aktionen,
geplanten Aufgaben und Sicherung, steht in `docs/DEPLOYMENT.md`.

---

## Sicherheit

- Jede geschützte Operation prüft serverseitig. Prüfungen im Browser sind nur Komfort.
- Uploads: Typ- und Größenprüfung, generierter Dateiname, Neukodierung des Bildes,
  Ablage im externen Speicher, niemals ausführbare Dateien.
- Große Dateien laden direkt in den externen Speicher, nicht durch PHP.
- Öffentliche Formulare bekommen ein Rate Limit.
- Keine Secrets im Repository, nur `.env.example` mit leeren Werten.
- Fehlerseiten ohne Stacktrace.
- Administrative Aktionen landen im Audit-Log.

---

## Was noch fehlt und vom Verein kommt

Diese Angaben dürfen nicht erfunden werden und stehen im Auftritt als sichtbare
Platzhalter:

- Vereinshistorie mit Daten
- Impressum und Datenschutzerklärung
- offizielle Projekt- und Vereinsbeschreibung, Satzungsziele
- Teamprofile
- CRN-API: Dokumentation, Basis-URL, Authentifizierung, Datenmodelle
- Quelle für den Live-Serverstatus
- Kartenkacheln des Netzes
- Bannerbild und Vereinslogo
- die noch offenen externen URLs
