import 'server-only';
import { env } from '@/lib/config/env';
import type { ServerStatus } from './types';

/**
 * Anbindung an eine künftige Live-Status-Schnittstelle.
 *
 * TODO: Es steht noch nicht fest, woher der Status kommt (eigenes Plugin,
 * Query-Protokoll, Hoster-API). Sobald das feststeht, wird hier genau eine
 * Funktion implementiert. Der Rest der Anwendung bleibt unverändert.
 *
 * Bis dahin liefert der Dienst bewusst `unknown` statt Beispielwerten.
 */
export async function getServerStatus(): Promise<ServerStatus> {
  const url = env().SERVER_STATUS_API_URL;
  if (!url) {
    return { kind: 'unknown', reason: 'not-configured' };
  }

  // TODO: Antwortformat der künftigen Statusquelle abbilden und validieren.
  return { kind: 'unknown', reason: 'not-configured' };
}
