import 'server-only';
import { z } from 'zod';

/**
 * Zentrale, einmalig geprüfte Umgebungskonfiguration.
 *
 * Diese Datei ist serverseitig. Werte gelangen nur über explizite Props in den
 * Client, damit niemals versehentlich ein Secret im Bundle landet.
 *
 * Grundsatz: Was noch nicht feststeht, bleibt leer und wird im UI ausgeblendet
 * oder als Platzhalter gekennzeichnet. Es wird nichts erfunden.
 */

/** Leerer String wird zu undefined, damit `.optional()` greift. */
const optionalUrl = z
  .string()
  .trim()
  .transform((value) => (value === '' ? undefined : value))
  .pipe(z.url().optional())
  .optional();

const optionalString = z
  .string()
  .trim()
  .transform((value) => (value === '' ? undefined : value))
  .optional();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),

  /** Öffentliche Basis-URL der Seite. Die Domain kann sich ändern, daher konfigurierbar. */
  SITE_URL: z.url().default('http://localhost:3000'),

  /** Datenbank. Ohne sie läuft nur das statische Frontend. */
  DATABASE_URL: optionalString,

  /** Discord OAuth. Identifiziert Personen, vergibt aber keine Rechte. */
  DISCORD_CLIENT_ID: optionalString,
  DISCORD_CLIENT_SECRET: optionalString,
  DISCORD_REDIRECT_URI: optionalUrl,
  AUTH_SECRET: optionalString,

  /** Externe Ziele. Noch unbekannte URLs bleiben leer. */
  DISCORD_URL: optionalUrl,
  CURSEFORGE_URL: optionalUrl,
  MODRINTH_URL: optionalUrl,
  YOUTUBE_URL: optionalUrl,
  GALLERY_URL: optionalUrl,
  SERVER_URL: optionalString,
  HOSTER_URL: optionalUrl,

  /** Ablage für Uploads. Der endgültige Anbieter steht noch nicht fest. */
  STORAGE_PROVIDER: z.enum(['local', 's3']).default('local'),
  STORAGE_LOCAL_PATH: z.string().trim().default('./storage'),
  STORAGE_PUBLIC_BASE_URL: optionalString,
  STORAGE_BUCKET: optionalString,
  STORAGE_ENDPOINT: optionalString,
  STORAGE_REGION: optionalString,
  STORAGE_ACCESS_KEY: optionalString,
  STORAGE_SECRET_KEY: optionalString,

  /**
   * Create Railway Navigator.
   * TODO: Die offizielle CRN-Dokumentation liegt noch nicht vor. Basis-URL und
   * Authentifizierung sind Platzhalter und werden erst nach der Doku belegt.
   */
  CRN_API_BASE_URL: optionalString,
  CRN_API_KEY: optionalString,

  /**
   * Quelle für den Live-Serverstatus.
   * TODO: Noch keine Datenquelle festgelegt. Solange leer, zeigt die Seite
   * ausdrücklich „keine Daten" statt erfundener Spielerzahlen.
   */
  SERVER_STATUS_API_URL: optionalString,

  /** Obergrenzen für Uploads, in Megabyte. */
  UPLOAD_MAX_FILE_SIZE_MB: z.coerce.number().int().positive().default(8),
  UPLOAD_MAX_FILES_PER_APPLICATION: z.coerce.number().int().positive().default(8),
});

export type Env = z.infer<typeof envSchema>;

function loadEnv(): Env {
  const parsed = envSchema.safeParse(process.env);

  if (!parsed.success) {
    const issues = parsed.error.issues
      .map((issue) => `  ${issue.path.join('.') || '(root)'}: ${issue.message}`)
      .join('\n');
    throw new Error(
      `Ungültige Umgebungskonfiguration:\n${issues}\n\nSiehe .env.example für alle Variablen.`,
    );
  }

  return parsed.data;
}

let cached: Env | undefined;

/** Geprüfte Umgebungskonfiguration. Wird beim ersten Zugriff geladen. */
export function env(): Env {
  cached ??= loadEnv();
  return cached;
}

/** True, sobald die jeweilige Funktion konfiguriert ist. Steuert die Sichtbarkeit im UI. */
export function features() {
  const e = env();
  return {
    database: Boolean(e.DATABASE_URL),
    discordLogin: Boolean(e.DISCORD_CLIENT_ID && e.DISCORD_CLIENT_SECRET && e.AUTH_SECRET),
    crnApi: Boolean(e.CRN_API_BASE_URL),
    serverStatus: Boolean(e.SERVER_STATUS_API_URL),
    remoteStorage: e.STORAGE_PROVIDER !== 'local',
  } as const;
}
