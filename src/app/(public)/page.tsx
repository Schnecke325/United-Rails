import type { Metadata } from 'next';
import Link from 'next/link';
import { externalLinks, serverAddress } from '@/lib/config/links';
import { routes } from '@/lib/config/site';
import { getServerStatus } from '@/services/serverStatus/serverStatusService';
import { Section, SectionHeading } from '@/components/ui/Section';
import { ButtonLink } from '@/components/ui/Button';
import { Placeholder } from '@/components/ui/Placeholder';
import { Card, CardBody, CardTitle } from '@/components/ui/Card';
import { Hero } from '@/components/home/Hero';
import type { GalleryImageView } from '@/services/gallery/types';
import { FeatureGrid } from '@/components/home/FeatureGrid';
import { ServerStatusPanel } from '@/components/home/ServerStatusPanel';
import { HosterBanner } from '@/components/home/HosterBanner';
import { CommunityPanels } from '@/components/home/CommunityPanels';
import { GalleryPreview } from '@/components/gallery/GalleryPreview';
import { ModpackCurrent } from '@/components/modpack/ModpackCurrent';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

export default async function HomePage() {
  const links = externalLinks();
  const status = await getServerStatus();
  const address = serverAddress();

  // TODO: Sobald die Datenbank steht, kommen freigegebene Bilder und das
  // aktuelle Modpack-Release aus den jeweiligen Services.
  const galleryPreview: GalleryImageView[] = [];
  const currentModpack = undefined;

  return (
    <>
      <Hero discord={links.discord} />

      {/* 2. Was ist United Rails? */}
      <Section tone="base">
        <SectionHeading
          eyebrow="Überblick"
          title="Was ist United Rails?"
          description="Ein Minecraft-Eisenbahnserver und ein eingetragener Verein. Gebaut wird ein zusammenhängendes Netz aus Strecken, Bahnhöfen und Fahrzeugen, betrieben nach Fahrplan."
        />
        <FeatureGrid />
      </Section>

      {/* 3. Projekt und Historie */}
      <Section tone="grid">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <SectionHeading
            eyebrow="Projekt"
            title="Das Projekt"
            description="Strecken werden geplant, gebaut, angebunden und in Betrieb genommen. Das Projekt ist auf Dauer angelegt, der Verein gibt ihm die organisatorische Grundlage."
          />
          <div className="space-y-5">
            <Placeholder title="Offizielle Vereinshistorie" token="[PLATZHALTER: OFFIZIELLE UNITED-RAILS-HISTORIE]">
              Gründungsdaten und Meilensteine liegen noch nicht vor. Die Zeitleiste steht
              bereit und wird gefüllt, sobald der Verein die offiziellen Angaben liefert.
              Es werden keine Daten erfunden.
            </Placeholder>
            <ButtonLink href={routes.historie} variant="secondary">
              Zur Zeitleiste
            </ButtonLink>
          </div>
        </div>
      </Section>

      {/* 4. Galerie-Vorschau */}
      <Section tone="base">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Galerie"
            title="Bauwerke, Fahrzeuge, Strecken"
            description="Bilder aus der Community, sortiert nach festen Kategorien und vom Team freigegeben."
          />
          <ButtonLink href={routes.galerie} variant="secondary">
            Alle Bilder
          </ButtonLink>
        </div>
        <div className="mt-10">
          <GalleryPreview images={galleryPreview} />
        </div>
      </Section>

      {/* 5. Aktuelles Modpack */}
      <Section tone="raised">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Downloads"
            title="Aktuelles Modpack"
            description="Version, Minecraft-Version, Loader und Änderungsliste. Direkt oder über CurseForge und Modrinth."
          />
          <ButtonLink href={routes.downloads} variant="secondary">
            Alle Versionen
          </ButtonLink>
        </div>
        <div className="mt-10">
          <ModpackCurrent
            version={currentModpack}
            curseforge={links.curseforge}
            modrinth={links.modrinth}
          />
        </div>
      </Section>

      {/* 6. Server und Community */}
      <Section tone="grid">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Server"
              title="Karte, Linien und Fahrpläne"
              description="Die Serverseite führt Netzkarte, Bahnhöfe, Linien und Fahrpläne zusammen, mit einer Verbindungssuche von Bahnhof zu Bahnhof."
            />
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={routes.server}>Serverseite öffnen</ButtonLink>
              <ButtonLink href={routes.serverNavigator} variant="secondary">
                Verbindung suchen
              </ButtonLink>
            </div>
          </div>
          <ServerStatusPanel status={status} address={address} />
        </div>
      </Section>

      {/* 7. Partner und Hoster */}
      <Section tone="base">
        <HosterBanner hoster={links.hoster} />
      </Section>

      {/* 8. YouTube und Discord */}
      <Section tone="raised">
        <SectionHeading
          eyebrow="Community"
          title="Discord und YouTube"
          description="Der Austausch läuft über Discord. Videos gibt es auf YouTube."
        />
        <CommunityPanels discord={links.discord} youtube={links.youtube} />
      </Section>

      {/* 9. Mitmachen */}
      <Section tone="grid">
        <SectionHeading
          eyebrow="Mitmachen"
          title="Zwei Wege in das Projekt"
          description="Bau mit am Netz oder unterstütze den Verein als Mitglied."
          align="center"
          className="mx-auto"
        />
        <div className="mx-auto mt-10 grid max-w-4xl gap-4 md:grid-cols-2">
          <Card interactive>
            <CardBody className="flex h-full flex-col gap-4">
              <CardTitle>Builder werden</CardTitle>
              <p className="flex-1 text-sm text-fg-secondary">
                Bewirb dich mit Minecraft-Name, Discord-Name und Bildern deiner Bauwerke
                oder Fahrzeuge. Das Team sieht sich jede Bewerbung an.
              </p>
              <Link href={routes.builder} className="text-accent hover:underline">
                Zur Bewerbung
              </Link>
            </CardBody>
          </Card>
          <Card interactive>
            <CardBody className="flex h-full flex-col gap-4">
              <CardTitle>Mitglied werden</CardTitle>
              <p className="flex-1 text-sm text-fg-secondary">
                Sag uns, dass du Mitglied im United Rails e.V. werden möchtest. Für den
                ersten Schritt reichen Minecraft-Name und Discord-Name.
              </p>
              <Link href={routes.mitgliedschaft} className="text-accent hover:underline">
                Interesse bekunden
              </Link>
            </CardBody>
          </Card>
        </div>
      </Section>
    </>
  );
}
