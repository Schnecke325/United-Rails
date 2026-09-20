/**
 * Serverstatus.
 *
 * `unknown` ist der ehrliche Normalfall, solange keine Datenquelle konfiguriert
 * ist. Die Oberfläche zeigt dann einen Platzhalter statt erfundener Zahlen.
 */
export type ServerStatus =
  | { kind: 'online'; players: number; maxPlayers: number; version?: string; checkedAt: Date }
  | { kind: 'offline'; checkedAt: Date }
  | { kind: 'unknown'; reason: 'not-configured' | 'unreachable' };
