# Deployment auf Plesk

Stand: 2026-09-21. Gilt für die Laravel-Fassung der Seite.

Der Webspace hat PHP 8.4.25, Git, Composer, FTP und geplante Aufgaben, aber kein Node.
Deshalb wird dort nichts gebaut. CSS und JavaScript entstehen in GitHub Actions und
kommen fertig mit.

---

## 1. Einmalig einrichten

### Document Root

Das Document Root der Domain muss auf den Ordner `public/` innerhalb des Projekts
zeigen, nicht auf das Projektverzeichnis selbst.

In Plesk: Websites & Domains, die Domain, Hosting-Einstellungen, Feld
"Dokumentenstamm" auf `httpdocs/public` setzen (oder den Pfad, in den das Repository
geklont wird, plus `/public`).

Das ist kein Schönheitsfehler, sondern die wichtigste Einstellung überhaupt. Zeigt das
Document Root eine Ebene höher, liegen `.env` mit allen Zugangsdaten, `vendor/` und
`storage/` im Netz.

### Git-Repository in Plesk

Websites & Domains, Git, Repository hinzufügen. Als Branch **`deploy`** wählen, nicht
`main`. Nur auf `deploy` liegen die gebauten Assets in `public/build`.

### Deployment-Aktionen

Unter "Zusätzliche Deployment-Aktionen" eintragen:

```
composer install --no-dev --optimize-autoloader --no-interaction
php artisan migrate --force
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

`config:cache` liest `.env` einmal ein. Nach jeder Änderung an `.env` muss das Deployment
erneut laufen oder wenigstens `php artisan config:clear` und `config:cache`.

Wenn Plesk `proc_open` oder `exec` sperrt, kann Composer dort nicht laufen. Dann muss
GitHub Actions zusätzlich `vendor/` bauen und mit auf den Deploy-Branch legen. Das ist
der Rückfallweg; prüfen lässt sich das mit einer Datei `info.php`, die
`var_dump(function_exists('proc_open'));` ausgibt und danach wieder gelöscht wird.

### .env anlegen

`.env` gehört nicht ins Repository. Einmal von Hand auf den Webspace legen, als Vorlage
dient `.env.example`. Danach einmalig:

```
php artisan key:generate
```

Der Schlüssel bleibt dann bestehen. Wird er später getauscht, sind alle bestehenden
Sitzungen und verschlüsselten Werte ungültig.

### Geplante Aufgaben

Zwei Einträge unter Websites & Domains, Geplante Aufgaben:

| Takt | Befehl | Wofür |
|---|---|---|
| jede Minute | `php /pfad/zum/projekt/artisan schedule:run` | wiederkehrende Aufgaben |
| jede Minute | `php /pfad/zum/projekt/artisan queue:work --stop-when-empty --max-time=55` | Warteschlange |

Die Warteschlange braucht diesen Umweg, weil es auf einem Plesk-Webspace in der Regel
keinen Supervisor für Dauerprozesse gibt. `--max-time=55` sorgt dafür, dass sich zwei
Läufe nicht überholen.

### Schreibrechte

`storage/` und `bootstrap/cache/` müssen für den PHP-Benutzer beschreibbar sein.

---

## 2. Der laufende Ablauf

1. Auf `main` entwickeln und pushen.
2. GitHub Actions baut CSS und JS und schiebt alles auf den Branch `deploy`.
3. In Plesk auf "Pull & Deploy" klicken, oder das automatische Deployment aktivieren.
4. Die Deployment-Aktionen laufen und die neue Fassung ist live.

---

## 3. Externe Datenbank

Die Datenbank läuft nicht auf dem Webspace. Nötig sind Host, Port, Name, Benutzer und
Passwort in `.env`.

- Verbindet der Anbieter nur über TLS, gehört sein CA-Zertifikat auf den Webspace und
  der Pfad in `DB_SSL_CA`.
- Verlangt der Anbieter eine IP-Freigabe, muss die ausgehende IP-Adresse des Webspace
  eingetragen werden. Sie steht in Plesk oder lässt sich mit einem kurzen Skript
  ermitteln.
- Sitzungen und Cache liegen bewusst auf der Platte des Webspace. Würden sie in der
  Datenbank liegen, kostete jeder Seitenaufruf zusätzliche Runden über das Netz.

Migrationen laufen als Teil des Deployments. Vor größeren Migrationen lohnt ein Dump.

---

## 4. Externer Dateispeicher

Die Anwendung spricht S3-kompatibel. Welcher Dienst dahinter steht, sagt nur die
Umgebung:

```
FILESYSTEM_DISK=s3
STORAGE_ENDPOINT=
STORAGE_REGION=auto
STORAGE_BUCKET=
STORAGE_ACCESS_KEY=
STORAGE_SECRET_KEY=
STORAGE_PUBLIC_BASE_URL=
STORAGE_PATH_STYLE=false
```

`STORAGE_PATH_STYLE=true` brauchen Anbieter, die den Bucket im Pfad statt in der
Subdomain erwarten. `STORAGE_PUBLIC_BASE_URL` ist die Adresse, unter der Besucher die
Dateien sehen, oft eine eigene Domain oder ein CDN vor dem Bucket.

Auf dem Webspace liegen keine Uploads. Das ist keine Empfehlung, sondern die Bedingung,
unter der 5 GB reichen.

---

## 5. Platz auf dem Webspace

| Posten | Größenordnung |
|---|---|
| Quelltext und `vendor/` | etwa 100 bis 150 MB |
| `public/build` | wenige hundert KB |
| Logs | rotieren täglich, 14 Tage |
| Uploads | 0, sie liegen extern |

Das AWS-SDK bringt von Haus aus Definitionen für über 400 Dienste mit, etwa 270 MB.
`composer.json` wirft beim Installieren alle bis auf S3 weg (`extra."aws/aws-sdk-php"`),
damit bleiben rund 36 MB übrig. Diese Einstellung sollte drin bleiben.

---

## 6. Sicherung

- **Datenbank:** beim Anbieter oder als regelmäßiger Dump über eine geplante Aufgabe.
- **Dateien:** liegen beim Speicheranbieter, dessen Versionierung oder Sicherung nutzen.
- **Code:** liegt in Git.
- **`.env`:** liegt nur auf dem Webspace. Eine Kopie an einem sicheren Ort ist Pflicht,
  sonst ist nach einem Serverwechsel jede Zugangsangabe weg.

---

## 7. Was beim Hoster noch zu prüfen ist

Die Liste aus `docs/ARCHITEKTUR-HOSTING.md` gilt weiter:

1. PHP-Erweiterungen: `pdo_mysql`, `mbstring`, `openssl`, `curl`, `fileinfo`, `zip`,
   `intl` und `gd` oder `imagick`.
2. Darf das Document Root auf `public/` zeigen?
3. Sind `proc_open` und `exec` erlaubt, läuft Composer also auf dem Server?
4. Gibt es SSH oder nur die Deployment-Aktionen von Plesk?
5. Sind ausgehende Verbindungen offen, zur Datenbank und per HTTPS zum Dateispeicher?
6. Wie hoch sind `memory_limit` und `max_execution_time`?
7. Dürfen geplante Aufgaben minütlich laufen?
8. Bietet der Datenbankanbieter TLS, und braucht er eine feste IP-Freigabe?
