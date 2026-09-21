# Architektur unter den Hosting-Bedingungen

Stand: 2026-09-21. Grundlage sind die vom Verein genannten Rahmenbedingungen.
Dieses Dokument schlägt vor und entscheidet nichts. Am Code wurde dafür nichts geändert.

---

## 1. Was sich geändert hat

Die bisherige Planung in `docs/PLAN.md` steht auf einer Annahme, die nicht mehr gilt:
ein Node-Prozess hinter nginx auf einem VPS. Die neuen Bedingungen sind andere.

| Bedingung | Folge für die Architektur |
|---|---|
| Plesk als Hosting-Oberfläche | Deployment über Plesk-Git und geplante Aufgaben, kein eigener Dienst, kein systemd |
| PHP 8.4.25, Git, Composer, FTP, Cronjobs | PHP ist die einzige Sprache, die auf dem Webspace läuft |
| Kein Node.js, kein npm | Next.js kann dort nicht laufen. Auch kein Build auf dem Server |
| 5 GB Webspace | Genug für Code, nicht für Bilder, Kacheln und Modpack-Archive |
| Datenbank extern, bevorzugt MySQL | Jede Abfrage geht über das Netz. PostgreSQL und Prisma fallen weg |
| Große Dateien extern | Uploads laufen an der Festplatte des Webspace vorbei |
| Anbieter nur über Konfiguration | Kein Anbietername im Quelltext, alles über Umgebungsvariablen |

Die Master-Vorgabe wünscht sich TypeScript und ein React-Framework, sagt aber im selben
Abschnitt: "The final choice should be compatible with the hosting environment."
Beides zusammen geht auf diesem Webspace nicht. Das ist die Entscheidung, die ansteht.

### Was bisher existiert

Auf `webseite/grundgeruest` liegen rund 3400 Zeilen, fast ausschließlich Oberfläche:
Designsystem als CSS-Variablen, Kopf- und Fußbereich, Navigation, die öffentlichen
Seiten mit ihren Texten und Platzhaltern. Datenbank, Anmeldung, Uploads und der
Adminbereich sind noch nicht gebaut. Der Umstieg trifft also den kleineren Teil der
bisherigen Arbeit.

---

## 2. Die drei möglichen Wege

### Weg A: PHP-Anwendung auf dem Webspace (Laravel)

Die komplette Seite läuft als Laravel-Anwendung auf dem Plesk-Webspace.
Vorlagen in Blade, Datenbank extern über MySQL, Dateien extern über einen
S3-kompatiblen Speicher.

**Passt zu den Bedingungen:** PHP 8.4 erfüllt die Anforderung von Laravel 13
(ab PHP 8.3). Composer ist da. Geplante Aufgaben decken Cron und Warteschlange ab.
Auf dem Server wird nichts gebaut.

**Was aus der bisherigen Arbeit bleibt:** Das Designsystem in `tokens.css` und
`globals.css` bleibt unverändert, es ist reines CSS. Die Seitenstruktur, die
Textbausteine, die Platzhalterlogik und die Regel "leere URL blendet den Link aus"
werden übernommen. Die Tailwind-Klassen in den Komponenten wandern eins zu eins in
Blade-Vorlagen. Das ist Handarbeit, aber keine Neuerfindung.

**Was wegfällt:** Next.js, React, Prisma, die TypeScript-Konfigurationsdateien und
die Vitest-Tests dazu. Ersatz: Eloquent mit Migrationen, Konfiguration in
`config/site.php`, Tests in Pest oder PHPUnit.

### Weg B: Statisches Next.js plus PHP-Backend

Next.js wird als statischer Export gebaut, das Ergebnis landet als HTML auf dem
Webspace. Alles Dynamische, also Anmeldung, Galerie, Moderation, Adminbereich,
Serverstatus, läuft daneben in einer PHP-Anwendung, die der Browser per JavaScript
abfragt.

**Der Haken:** Zwei Stacks, zwei Build-Wege, zwei Datenmodelle, die man von Hand
synchron hält. Die Galerie und die Serverseite verlieren serverseitiges Rendern und
damit ihre Suchmaschinen-Sichtbarkeit. Der Adminbereich muss eine eigene Anwendung
werden. Gespart wird dabei genau das, was ohnehin am schnellsten portiert ist: die
Auszeichnung der öffentlichen Seiten. Die Kosten bleiben dauerhaft.

### Weg C: Next.js bleibt, läuft aber woanders

Die Anwendung bleibt wie geplant, wird aber auf einer Node-fähigen Plattform
betrieben. Der Plesk-Webspace behält dann nur Domain, Mail und vielleicht eine
Weiterleitung.

**Dafür:** Der bestehende Code bleibt vollständig, der Wunsch der Vorgabe nach
TypeScript und React bleibt erfüllt.

**Dagegen:** Ein weiterer Anbieter neben Datenbank und Dateispeicher, also drei
externe Abhängigkeiten und ein zusätzlicher Vertrag. Der Webspace, der ohnehin bezahlt
wird, trägt die Seite nicht mehr. Ob das Angebot des Hosters dann noch sinnvoll ist,
entscheidet der Verein, nicht die Technik.

### Gegenüberstellung

| | A: Laravel | B: Statisch plus PHP | C: Node woanders |
|---|---|---|---|
| Läuft auf dem Webspace | ja | teilweise | nein |
| Zusätzlicher Anbieter | nein | nein | ja |
| Sprachen im Projekt | eine | zwei | eine |
| Bestehender Code | Oberfläche wird portiert | öffentliche Seiten bleiben | bleibt ganz |
| Serverseitiges Rendern | überall | nur die statischen Seiten | überall |
| Dauerhafter Pflegeaufwand | normal | hoch | normal |
| Erfüllt die Stack-Präferenz der Vorgabe | nein | teilweise | ja |

---

## 3. Empfehlung: Weg A

Der Webspace ist die Vorgabe, und PHP 8.4 mit Composer, Git und geplanten Aufgaben ist
eine vollständige Plattform für genau diese Seite. Weg B kauft eine kleine Ersparnis
mit dauerhaft zwei Stacks. Weg C ist nur richtig, wenn der Verein bereit ist, die Seite
außerhalb des Hoster-Angebots zu betreiben, und dafür einen zweiten Vertrag hat.

Die Teile, die Arbeit gekostet haben, überleben den Wechsel: Farben, Abstände,
Typografie, Seitenaufbau, Texte und die Regeln für Platzhalter. Was neu geschrieben
wird, ist die Technik darunter, und die ist bisher ohnehin nur geplant.

---

## 4. Wie Weg A konkret aussieht

### Bausteine

| Baustein | Wahl | Warum |
|---|---|---|
| Framework | Laravel 13 | Läuft auf PHP 8.3 und neuer, bringt Migrationen, Validierung, Rechte, Warteschlange und Dateiabstraktion mit |
| Vorlagen | Blade | Keine Build-Kette auf dem Server, serverseitig gerendert |
| CSS | Tailwind, gebaut außerhalb des Servers | Die bestehenden Tokens und Klassen bleiben |
| Interaktion | Alpine.js, eine kleine Datei | Menü, Dialoge, Filter. Kein Bundler, kein React |
| Karte | Leaflet als mitgelieferte Datei | Wie geplant, reine Browser-Bibliothek |
| Datenbank | MySQL extern, Eloquent | Wunsch des Vereins, Zugriff über PDO mit TLS |
| Dateien | Flysystem mit S3-kompatiblem Treiber | Endpunkt, Bucket und Region kommen aus der Umgebung |
| Anmeldung | Laravel Socialite mit Discord | OAuth wie geplant, Rechte weiter nur aus der Datenbank |
| Bilder | Intervention Image auf GD oder Imagick | Ersetzt sharp: neu kodieren, verkleinern, Vorschaubilder |
| Tests | Pest oder PHPUnit | Rechte, Validierung, Adapter, Konfiguration |

### Das Problem "kein Node auf dem Server"

Tailwind braucht einen Build. Der läuft künftig nicht mehr auf dem Server, sondern in
GitHub Actions. Dort entsteht das fertige CSS, es wird auf einen Deploy-Branch gelegt,
und Plesk zieht nur noch diesen Branch. Der Server kompiliert nichts.

Wenn Plesk `proc_open` oder `exec` sperrt, kann auch Composer dort nicht laufen. Dann
baut GitHub Actions zusätzlich das `vendor`-Verzeichnis und liefert es mit. Das ist der
Rückfallweg, er sollte früh geprüft werden.

### Deployment

1. Plesk-Git zieht den Deploy-Branch.
2. Als Deployment-Aktion: `composer install --no-dev --optimize-autoloader`,
   dann `php artisan migrate --force`, dann `php artisan config:cache route:cache view:cache`.
3. Das Document Root der Domain zeigt auf `public/`, nicht auf das Projektverzeichnis.
   Sonst liegen `.env` und `vendor` im Netz.
4. Geplante Aufgabe jede Minute: `php artisan schedule:run`.
5. Warteschlange ohne Dauerprozess: geplante Aufgabe mit
   `php artisan queue:work --stop-when-empty --max-time=55`. Auf einem Plesk-Webspace
   gibt es in der Regel keinen Supervisor für Dauerprozesse.

### Externe Datenbank: was dabei zu beachten ist

Jede Abfrage geht über das Internet statt über einen lokalen Socket. Das ist der
wichtigste Unterschied zur bisherigen Planung.

- Sitzungen und Cache gehören auf die Festplatte des Webspace, nicht in die Datenbank.
  Sonst kostet jeder Seitenaufruf zusätzliche Runden über das Netz.
- `config:cache`, `route:cache` und `view:cache` gehören zum Deployment.
- Seiten sollen mit wenigen Abfragen auskommen. Die Startseite verträgt einen kurzen
  Cache von einigen Minuten.
- Die Verbindung braucht TLS und, je nach Anbieter, die IP des Webspace auf einer
  Freigabeliste. Beides muss der Anbieter können.
- MySQL statt PostgreSQL heißt: Volltextsuche über MySQL-FULLTEXT statt über
  PostgreSQL-Werkzeuge. Für die Stationssuche reicht das.

### Externer Dateispeicher

Kein Anbieter steht im Code. Die Anwendung spricht S3-kompatibel, und welcher Dienst
dahinter steht, sagt die Umgebung:

```
FILESYSTEM_DISK=s3
S3_ENDPOINT=
S3_REGION=
S3_BUCKET=
S3_ACCESS_KEY=
S3_SECRET_KEY=
S3_USE_PATH_STYLE=true
S3_PUBLIC_URL=
```

Zwei getrennte Wege für zwei Arten von Dateien:

- **Galeriebilder** sind klein. Sie gehen durch PHP: Typ prüfen, Größe begrenzen,
  neu kodieren, umbenennen, Vorschaubild erzeugen, dann in den Speicher schieben.
  Das Neukodieren bleibt die wichtigste Schutzmaßnahme.
- **Modpack-Archive** sind groß. Sie gehen nicht durch PHP. Der Browser lädt mit einer
  vorsignierten URL direkt in den Speicher hoch, PHP signiert nur und merkt sich
  Name, Größe, Prüfsumme und Version. Damit sind die Upload-Grenzen von PHP und die
  5 GB des Webspace kein Thema.
- **Kartenkacheln** liegen ebenfalls extern. Ein Kachelraster wächst schnell über das
  hinaus, was 5 GB tragen.

### Speicherplanung für die 5 GB

Code und `vendor` liegen bei einigen hundert MB. Dazu Logs und Framework-Cache. Auf dem
Webspace liegen keine Uploads und keine Bildkopien. Logs müssen rotieren, sonst füllt
sich der Platz langsam von selbst. Das passt, solange die Regel gilt: alles, was Nutzer
hochladen, geht nach draußen.

### Was sich an der Struktur nicht ändert

Die drei tragenden Regeln aus `docs/PLAN.md` gelten weiter und passen unverändert:

- Rechte kommen nur aus der Datenbank, Discord meldet nur an.
- Alles Unbekannte liegt hinter einer eigenen Schnittstelle: CRN-API, Dateispeicher,
  Serverstatus. Getauscht wird später nur der Adapter.
- Seiten rendern, Services entscheiden, die Datenschicht greift zu.

Auch die Platzhalterregel bleibt: Eine leere URL in der Umgebung blendet den Link im
ganzen Auftritt aus. Aus `src/lib/config/links.ts` wird `config/site.php`, die Logik
ist dieselbe und bekommt wieder einen Test.

---

## 5. Was beim Hoster noch zu prüfen ist

Diese Punkte entscheiden über Details des Wegs A. Sie lassen sich in Plesk nachsehen
oder beim Hoster erfragen. Erfunden wird hier nichts.

1. Welche PHP-Erweiterungen aktiv sind: `pdo_mysql`, `mbstring`, `openssl`, `curl`,
   `fileinfo`, `zip`, `intl` und `gd` oder `imagick`.
2. Ob das Document Root der Domain auf einen Unterordner wie `public/` zeigen darf.
3. Ob `proc_open` und `exec` erlaubt sind, also ob Composer auf dem Server laufen kann.
4. Ob es SSH gibt oder nur die Deployment-Aktionen von Plesk.
5. Ob ausgehende Verbindungen offen sind: Datenbankport zur externen Datenbank und
   HTTPS zum Dateispeicher.
6. `memory_limit` und `max_execution_time` für die Bildverarbeitung.
7. Wie oft geplante Aufgaben laufen dürfen, minütlich oder seltener.
8. Ob der Datenbankanbieter TLS anbietet und ob er eine feste IP-Freigabe braucht.

---

## 6. Vorgeschlagene Reihenfolge, falls Weg A gewählt wird

| Schritt | Inhalt |
|---|---|
| 1 | Laravel-Grundgerüst, Konfiguration und `.env.example` an die neuen Bedingungen angepasst |
| 2 | GitHub Actions baut CSS, Deploy-Branch, Plesk-Deployment steht |
| 3 | Designsystem und Layout portiert: Tokens, Kopf, Navigation, Fuß, Fehlerseiten |
| 4 | Öffentliche Seiten portiert, Texte und Platzhalter unverändert |
| 5 | Migrationen gegen die externe MySQL-Datenbank, Seed für Rollen und Kategorien |
| 6 | Discord-Anmeldung, Sitzungen auf der Festplatte |
| 7 | Rollen, Rechte, Audit-Log |
| 8 | Dateispeicher-Adapter, Galerie-Upload mit Neukodierung |
| 9 | Modpack-Bereich mit vorsignierten Uploads |
| 10 | Adminbereich mit Moderation und Bewerbungen |
| 11 | Serverseite mit Karte und Verbindungssuche |
| 12 | CRN-Adapter als Schnittstellenpunkt, weiterhin ohne Erfindungen |

Die Schritte 1 bis 4 führen zurück auf den heutigen sichtbaren Stand, danach geht es
weiter wie im alten Plan.
