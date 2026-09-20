import { Card, CardBody, CardTitle } from '@/components/ui/Card';
import { ButtonLink } from '@/components/ui/Button';
import { Placeholder } from '@/components/ui/Placeholder';
import type { ExternalLink } from '@/lib/config/links';

/**
 * Discord- und YouTube-Bereich. Jede Karte erscheint nur, wenn die zugehörige
 * URL konfiguriert ist; fehlt sie, steht dort ein Platzhalter statt eines
 * toten Links.
 */
export function CommunityPanels({
  discord,
  youtube,
}: {
  discord?: ExternalLink;
  youtube?: ExternalLink;
}) {
  return (
    <div className="mt-10 grid gap-4 md:grid-cols-2">
      <Card>
        <CardBody className="flex h-full flex-col gap-4">
          <CardTitle>Discord</CardTitle>
          <p className="flex-1 text-sm text-fg-secondary">
            Absprachen zu Strecken und Bauprojekten, Support und Ankündigungen laufen
            über den Discord-Server.
          </p>
          {discord ? (
            <ButtonLink href={discord.url} external variant="secondary" className="self-start">
              Discord beitreten
            </ButtonLink>
          ) : (
            <Placeholder title="Discord-Einladung" token="DISCORD_URL">
              Die Einladungs-URL ist noch nicht hinterlegt.
            </Placeholder>
          )}
        </CardBody>
      </Card>

      <Card>
        <CardBody className="flex h-full flex-col gap-4">
          <CardTitle>YouTube</CardTitle>
          <p className="flex-1 text-sm text-fg-secondary">
            Videos zu Strecken, Fahrzeugen und Bauprojekten aus dem Netz von United Rails.
          </p>
          {youtube ? (
            <ButtonLink href={youtube.url} external variant="secondary" className="self-start">
              Kanal ansehen
            </ButtonLink>
          ) : (
            <Placeholder title="YouTube-Kanal" token="YOUTUBE_URL">
              Die Kanal-URL ist noch nicht hinterlegt.
            </Placeholder>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
