import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SkipLink } from '@/components/layout/SkipLink';

/** Layout aller öffentlich zugänglichen Seiten. */
export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <SkipLink />
      <Header />
      <main id="inhalt" className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
