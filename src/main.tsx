
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import store from './store/store.tsx';
import { Provider } from 'react-redux';

const queryClient = new QueryClient();


createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <Provider store = {store}>
    <App />
    </Provider>
  </QueryClientProvider>
)
