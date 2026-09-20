import { StatusBadge } from '@/components/ui/StatusBadge';
import { Placeholder } from '@/components/ui/Placeholder';
import { cn } from '@/lib/utils/cn';
import type { ServerStatus } from '@/services/serverStatus/types';

/**
 * Serverstatus im Stil einer Anzeigetafel.
 *
 * Ohne echte Datenquelle steht hier "keine Daten", nie erfundene Spielerzahlen.
 */
export function ServerStatusPanel({
  status,
  address,
}: {
  status: ServerStatus;
  address?: string;
}) {
  return (
    <div
      className={cn(
        'rounded-[var(--radius-lg)] border border-[var(--border-default)]',
        'bg-[var(--surface-inset)] p-6',
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <span className="ur-display text-xs uppercase text-fg-muted">Serverstatus</span>
        {status.kind === 'online' && <StatusBadge tone="clear">Online</StatusBadge>}
        {status.kind === 'offline' && <StatusBadge tone="stop">Offline</StatusBadge>}
        {status.kind === 'unknown' && <StatusBadge tone="info">Keine Daten</StatusBadge>}
      </div>

      {status.kind === 'online' && (
        <p className="ur-display mt-4 text-3xl text-fg">
          {status.players} <span className="text-fg-muted">/ {status.maxPlayers}</span>
          <span className="ml-2 text-sm text-fg-muted">Spieler</span>
        </p>
      )}

      {status.kind === 'unknown' && (
        <Placeholder className="mt-4" title="Live-Serverstatus" token="SERVER_STATUS_API_URL">
          Es ist noch keine Statusquelle hinterlegt. Die Anzeige bleibt leer, bis eine
          echte Schnittstelle konfiguriert ist.
        </Placeholder>
      )}

      <div className="mt-6 border-t border-[var(--border-subtle)] pt-4">
        <span className="ur-display block text-xs uppercase text-fg-muted">Adresse</span>
        {address ? (
          <code className="ur-display mt-1 block text-base text-fg">{address}</code>
        ) : (
          <span className="mt-1 block text-sm text-fg-muted">
            Noch nicht hinterlegt (SERVER_URL)
          </span>
        )}
      </div>
    </div>
  );
}
