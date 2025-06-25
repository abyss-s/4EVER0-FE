import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { GlobalModalProvider } from './provider/GlobalModalProvider/GlobalModalProvider';
import { Sooner } from '@/components/Sooner/Sonner';
import { ThemeProvider } from '@/provider/ThemeProvider';
import router from './routes';

const queryClient = new QueryClient();

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <RouterProvider router={router} />
          <GlobalModalProvider />
          <Sooner position="bottom-center" style={{ bottom: '80px' }} />
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
