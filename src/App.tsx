import '@mantine/core/styles.css';
import '@mantine/dropzone/styles.css';
import '@mantine/nprogress/styles.css';

import { MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Router } from './Router';
import { theme } from './theme';

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      retry: 3,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme}>
        <Router />
      </MantineProvider>
    </QueryClientProvider>
  );
}