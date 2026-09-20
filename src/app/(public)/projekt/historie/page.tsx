import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/PageHeader';
import { Section } from '@/components/ui/Section';
import { Timeline } from '@/components/home/Timeline';
import { routes } from '@/lib/config/site';

export const metadata: Metadata = {
  title: 'Historie',
  description: 'Die Entstehungsgeschichte von United Rails e.V. als Zeitleiste.',
  alternates: { canonical: routes.historie },
};

export default function HistoriePage() {
  // TODO: Die offiziellen Stationen der Vereinsgeschichte liegen noch nicht vor.
  // Es werden bewusst keine Daten erfunden; die Zeitleiste bleibt bis dahin leer.
  const entries: never[] = [];

  return (
    <>
      <PageHeader
        eyebrow="Historie"
        title="Historie"
        description="Die wichtigsten Stationen von United Rails in zeitlicher Reihenfolge."
      />
      <Section tone="base">
        <Timeline entries={entries} />
      </Section>
    </>
  );
}
