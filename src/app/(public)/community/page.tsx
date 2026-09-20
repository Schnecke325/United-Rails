import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/PageHeader';
import { Section } from '@/components/ui/Section';
import { CommunityPanels } from '@/components/home/CommunityPanels';
import { externalLinks } from '@/lib/config/links';
import { routes } from '@/lib/config/site';

export const metadata: Metadata = {
  title: 'Community',
  description: 'Discord und YouTube von United Rails e.V.',
  alternates: { canonical: routes.community },
};

export default function CommunityPage() {
  const links = externalLinks();

  return (
    <>
      <PageHeader
        eyebrow="Community"
        title="Discord und YouTube"
        description="Der Austausch läuft über Discord. Videos gibt es auf YouTube."
      />
      <Section tone="base">
        <CommunityPanels discord={links.discord} youtube={links.youtube} />
      </Section>
    </>
  );
}
