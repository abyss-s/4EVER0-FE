import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import { GlobalModalProvider } from './provider/GlobalModalProvider/GlobalModalProvider';
import router from './routes';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <GlobalModalProvider />
    </QueryClientProvider>
  );
}

export default App;
