# United Rails e.V. — Webseite

Webplattform für United Rails e.V.: öffentlicher Auftritt des Vereins und des
Minecraft-Eisenbahnprojekts, Galerie mit Moderation, Bewerbungen, Modpack-Downloads,
Serverseite mit Netzkarte und Verbindungssuche sowie ein geschützter interner Bereich.

> **Stand der Umsetzung**
> Gerüst, Designsystem, öffentliche Seitenstruktur und die zentrale Konfiguration stehen.
> Datenbank, Discord-Anmeldung, Rechte, Admin-Bereich, Formulare, Galerie, Modpack-Pflege,
> Karte und CRN-Anbindung folgen in den nächsten Ausbaustufen. Siehe `docs/PLAN.md`.

---

## Voraussetzungen

| Werkzeug | Version | Zweck |
|---|---|---|
| Node.js | 20 LTS oder neuer (entwickelt mit 22) | Laufzeit |
| npm | 10 oder neuer | Paketverwaltung |
| PostgreSQL | 14 oder neuer | Datenbank (ab der Ausbaustufe „Datenbank") |

Für den Produktivbetrieb zusätzlich: ein Reverse Proxy (nginx oder Caddy) mit TLS und
ein Prozessmanager (systemd oder PM2).

---

## Installation

```bash
git clone <repository-url>
cd united-rails
npm install
cp .env.example .env     # Werte eintragen, siehe unten
npm run dev              # http://localhost:3000
```

`.env` wird nie eingecheckt. Im Repository liegt ausschließlich `.env.example` mit
leeren Platzhaltern.

---

## Umgebungsvariablen

Alle Variablen stehen mit Erklärung in `.env.example`. Geprüft werden sie beim Start in
`src/lib/config/env.ts`; fehlt etwas Pflichtiges oder ist ein Wert ungültig, bricht die
Anwendung mit einer klaren Meldung ab statt später still falsch zu laufen.

**Seite und Datenbank**

| Variable | Bedeutung |
|---|---|
| `SITE_URL` | Öffentliche Basis-URL. Die Domain steht nur hier, nirgends im Quelltext. |
| `DATABASE_URL` | PostgreSQL-Verbindung. |

**Discord-Anmeldung**

| Variable | Bedeutung |
|---|---|
| `DISCORD_CLIENT_ID`, `DISCORD_CLIENT_SECRET` | Zugangsdaten der Discord-Anwendung. |
| `DISCORD_REDIRECT_URI` | Rückleitungsadresse, muss in Discord hinterlegt sein. |
| `AUTH_SECRET` | Signiert die Sitzungen, z. B. `openssl rand -base64 32`. |

Discord meldet Personen an. Rechte auf der Webseite vergibt ausschließlich die Datenbank —
eine Discord-Rolle macht niemanden zum Administrator.

**Externe Ziele**

`DISCORD_URL`, `CURSEFORGE_URL`, `MODRINTH_URL`, `YOUTUBE_URL`, `GALLERY_URL`,
`SERVER_URL`, `HOSTER_URL`.

Ist ein Wert leer, verschwindet der zugehörige Link im gesamten Auftritt — in der
Navigation, im Fußbereich und auf den Seiten. Es wird nie ins Leere verlinkt.

**Dateiablage**

`STORAGE_PROVIDER` (`local` oder `s3`), `STORAGE_LOCAL_PATH`, `STORAGE_PUBLIC_BASE_URL`,
`STORAGE_BUCKET`, `STORAGE_ENDPOINT`, `STORAGE_REGION`, `STORAGE_ACCESS_KEY`,
`STORAGE_SECRET_KEY`.

Der endgültige Anbieter steht noch nicht fest. Deshalb liegt zwischen Anwendung und
Speicher eine eigene Schnittstelle; ein Wechsel betrifft nur einen Treiber.

**Noch offen**

| Variable | Warum leer |
|---|---|
| `CRN_API_BASE_URL`, `CRN_API_KEY` | Die offizielle Dokumentation des Create Railway Navigator liegt noch nicht vor. Es werden keine Endpunkte, Formate oder Anmeldeverfahren geraten. |
| `SERVER_STATUS_API_URL` | Für den Live-Serverstatus ist noch keine Quelle festgelegt. Ohne Quelle zeigt die Seite ausdrücklich „keine Daten" statt erfundener Spielerzahlen. |

---

## Datenbank und Migrationen

Ab der Ausbaustufe „Datenbank":

```bash
npm run db:generate     # Prisma-Client erzeugen
npm run db:migrate      # Migration in der Entwicklung anlegen und anwenden
npm run db:seed         # Rollen, Rechte und Galerie-Kategorien einspielen
npm run db:studio       # Daten im Browser ansehen
```

Im Produktivbetrieb werden Migrationen nicht erzeugt, sondern nur angewendet:

```bash
npm run db:deploy
```

---

## Entwicklung

```bash
npm run dev         # Entwicklungsserver
npm run typecheck   # TypeScript prüfen
npm run test        # Tests
npm run build       # Produktionsbündel bauen
```

Aufbau des Quelltexts:

```
src/app/(public)   öffentliche Seiten
src/app/(admin)    geschützter Bereich
src/components     Bausteine der Oberfläche
src/lib/config     zentrale Konfiguration: Umgebung, URLs, Navigation
src/services       Fachlogik: Galerie, Bewerbungen, Modpack, Storage, Bahn-Adapter
src/styles         Design-Tokens
```

Grundregel: Seiten rendern, Services entscheiden, der Datenzugriff liegt in einer eigenen
Schicht. Keine Datenbankabfrage in einer Komponente, keine Fachlogik in einer Route.

---

## Produktivbetrieb

```bash
npm ci
npm run build
npm run db:deploy
npm run start          # lauscht auf PORT, Standard 3000
```

Der Bau lädt die Schriften von Google Fonts herunter und legt sie danach selbst bei.
Der Bauschritt braucht also einmalig Netzzugang; der laufende Betrieb nicht.

### Beispiel: systemd

```ini
[Unit]
Description=United Rails Webseite
After=network.target postgresql.service

[Service]
Type=simple
User=unitedrails
WorkingDirectory=/var/www/united-rails
Environment=NODE_ENV=production
Environment=PORT=3000
EnvironmentFile=/var/www/united-rails/.env
ExecStart=/usr/bin/npm run start
Restart=always

[Install]
WantedBy=multi-user.target
```

### Reverse Proxy

nginx oder Caddy nimmt Port 443 entgegen, terminiert TLS und reicht an Port 3000 weiter.
Weiterzureichen sind `X-Forwarded-For`, `X-Forwarded-Proto` und `Host`.

Die Obergrenze für Uploads muss im Proxy mindestens so hoch stehen wie
`UPLOAD_MAX_FILE_SIZE_MB` (bei nginx `client_max_body_size`), sonst bricht der Upload
schon vor der Anwendung ab.

---

## Sicherung

Drei Dinge sind zu sichern, und sie gehören zusammen:

1. **Datenbank** — `pg_dump` täglich, Aufbewahrung nach Bedarf des Vereins.
   ```bash
   pg_dump "$DATABASE_URL" | gzip > united-rails-$(date +%F).sql.gz
   ```
2. **Hochgeladene Dateien** — bei `STORAGE_PROVIDER=local` das Verzeichnis aus
   `STORAGE_LOCAL_PATH`; bei externem Speicher die Sicherung des Anbieters.
3. **`.env`** — enthält Zugangsdaten. Gehört verschlüsselt abgelegt, niemals ins
   Repository.

Ein Datenbankstand ohne die zugehörigen Dateien ergibt eine Galerie voller toter Bilder.
Beide Sicherungen sollten denselben Zeitpunkt haben.

Wiederherstellung prüfen, bevor man sie braucht:

```bash
gunzip -c united-rails-JJJJ-MM-TT.sql.gz | psql "$DATABASE_URL_TEST"
```

---

## Sicherheit

- Jede geschützte Aktion wird serverseitig geprüft. Prüfungen im Frontend sind nur Komfort.
- Uploads werden auf MIME-Typ, Endung und Größe geprüft, bekommen einen erzeugten
  Dateinamen und werden neu kodiert; ausführbare Dateien werden abgewiesen.
- Öffentliche Formulare haben ein Rate Limit.
- Fehlerseiten zeigen keine internen Details.
- Administrative Aktionen landen im Protokoll (Audit-Log).
- Keine Zugangsdaten im Quelltext, im Frontend oder im Repository.

---

## Offene Zulieferungen

Damit die Seite vollständig wird, fehlen noch Angaben, die nur der Verein liefern kann.
Alle Stellen sind im Auftritt sichtbar als Platzhalter gekennzeichnet:

- offizielle Vereinshistorie mit Daten
- Impressum und Datenschutzerklärung
- offizielle Projekt- und Vereinsbeschreibung
- Teamprofile
- Discord-, CurseForge-, Modrinth-, Galerie- und Hoster-URL sowie die Serveradresse
- Dokumentation der CRN-Schnittstelle
- Quelle für den Live-Serverstatus
- Kartenkacheln des Netzes
- Bannerbild und Vereinslogo

---

## Dokumentation

- `docs/PLAN.md` — Architektur, Tech-Stack, Datenmodell und Umsetzungs-Roadmap
- `docs/MASTER_PROMPT.txt` — die zugrunde liegende Spezifikation
