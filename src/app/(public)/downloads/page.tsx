import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/PageHeader';
import { Section, SectionHeading } from '@/components/ui/Section';
import { ModpackCurrent } from '@/components/modpack/ModpackCurrent';
import { ModpackArchive } from '@/components/modpack/ModpackArchive';
import { externalLinks } from '@/lib/config/links';
import { routes } from '@/lib/config/site';
import type { ModpackVersionView } from '@/services/modpack/types';

export const metadata: Metadata = {
  title: 'Downloads',
  description:
    'Das Modpack von United Rails: aktuelle Version, ältere Versionen, Änderungslisten und Downloads.',
  alternates: { canonical: routes.downloads },
};

export default function DownloadsPage() {
  const links = externalLinks();

  // TODO: Releases kommen aus der Datenbank und werden im Admin-Dashboard gepflegt,
  // nicht im Quelltext.
  const versions: ModpackVersionView[] = [];
  const current = versions.find((version) => version.isCurrent);
  const older = versions.filter((version) => !version.isCurrent);

  return (
    <>
      <PageHeader
        eyebrow="Downloads"
        title="Modpack"
        description="Lade das Modpack herunter, das für den Server von United Rails gebraucht wird."
      />

      <Section tone="base">
        <SectionHeading
          eyebrow="Aktuell"
          title="Aktuelle Version"
          description="Version, Minecraft-Version, Loader und Änderungen der Fassung, die auf dem Server läuft."
        />
        <div className="mt-8">
          <ModpackCurrent
            version={current}
            curseforge={links.curseforge}
            modrinth={links.modrinth}
          />
        </div>
      </Section>

      <Section tone="raised">
        <SectionHeading
          eyebrow="Archiv"
          title="Ältere Versionen"
          description="Zum Aufklappen: Version, Datum, Minecraft-Version, Loader, Änderungen und Download."
        />
        <div className="mt-8">
          <ModpackArchive versions={older} />
        </div>
      </Section>
    </>
  );
}
