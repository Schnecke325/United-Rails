import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/PageHeader';
import { Section } from '@/components/ui/Section';
import { Placeholder } from '@/components/ui/Placeholder';
import { routes } from '@/lib/config/site';

export const metadata: Metadata = {
  title: 'Team',
  description: 'Die Teamprofile von United Rails e.V.',
  alternates: { canonical: routes.team },
};

export default function TeamPage() {
  // TODO: Teamprofile kommen aus der Datenbank und werden im Admin-Dashboard
  // gepflegt. Es werden keine Personen erfunden.
  const members: never[] = [];

  return (
    <>
      <PageHeader
        eyebrow="Team"
        title="Das Team"
        description="Anzeigename, Rolle, Avatar und eine kurze Beschreibung. Mehr wird öffentlich nicht gezeigt."
      />
      <Section tone="base">
        {members.length === 0 && (
          <Placeholder title="Teamprofile">
            Die Profile werden vom Team selbst im internen Bereich angelegt. Private Angaben
            erscheinen nie auf der öffentlichen Seite.
          </Placeholder>
        )}
      </Section>
    </>
  );
}
