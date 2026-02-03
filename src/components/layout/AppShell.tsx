import { ReactNode } from 'react';
import { Header } from './Header';

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'light-dark(#f8f9fa, #1a1b1e)' }}>
      <Header />
      <main style={{ paddingTop: '20px', paddingBottom: '40px' }}>
        {children}
      </main>
    </div>
  );
}
