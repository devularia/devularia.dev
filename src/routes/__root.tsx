import { LanyardProvider } from '@/hooks/use-lanyard';
import { NavShell } from '@/components/navbar';
import { NotFound } from '@/components/not-found';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import Footer from '@/components/footer';

const RootLayout = () => (
  <LanyardProvider>
    <div className="flex flex-col min-h-screen">
      <NavShell>
        <Outlet />
      </NavShell>

      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  </LanyardProvider>
);

export const Route = createRootRoute({ component: RootLayout, notFoundComponent: () => <NotFound /> });
