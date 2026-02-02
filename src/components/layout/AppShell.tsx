import { Outlet } from 'react-router-dom';
import { Header } from './Header';

export function AppShell() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'light-dark(#f8f9fa, #1a1b1e)' }}>
      <Header />
      <main style={{ paddingTop: '20px', paddingBottom: '40px' }}>
        <Outlet />
      </main>
    </div>
  );
}
