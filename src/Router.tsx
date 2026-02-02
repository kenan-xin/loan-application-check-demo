import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AppShell } from './components/layout/AppShell';
import { UploadPage } from './pages/UploadPage';
import { ProcessingPage } from './pages/ProcessingPage';
import { ResultsPage } from './pages/ResultsPage';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <AppShell />,
      children: [
        { index: true, element: <UploadPage /> },
        { path: 'processing', element: <ProcessingPage /> },
        { path: 'results', element: <ResultsPage /> },
      ],
    },
  ],
  {
    basename: '/hl-bank-demo',
  }
);

export function Router() {
  return <RouterProvider router={router} />;
}
