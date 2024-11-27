import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import App from '@/App.tsx';

import BookmarksContextProvider from '@/contexts/BookmarksContextProvider';
import ActiveJobIdContextProvider from '@/contexts/ActiveJobIdContextProvider';

import '@/index.css';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BookmarksContextProvider>
        <ActiveJobIdContextProvider>
          <App />
        </ActiveJobIdContextProvider>
      </BookmarksContextProvider>
    </QueryClientProvider>
  </StrictMode>,
);
