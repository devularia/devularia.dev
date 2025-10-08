import { LanyardProvider } from '@/hooks/use-lanyard';
import { NavShell } from '@/components/navbar';
import { NotFound } from '@/components/not-found';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import Footer from '@/components/footer';

const RootLayout = () => (
  <LanyardProvider>
    <NavShell>
      <Outlet />
    </NavShell>
    <Footer />
  </LanyardProvider>
);

export const Route = createRootRoute({ component: RootLayout, notFoundComponent: () => <NotFound /> });