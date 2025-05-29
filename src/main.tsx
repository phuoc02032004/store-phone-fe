import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import { store } from './store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { Toaster } from 'sonner';
import { NotificationProvider } from './context/NotificationContext';
import './index.css'
import App from './App.tsx'

let persistor = persistStore(store);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NotificationProvider>
          <App />
          <Toaster position="top-right" richColors />
        </NotificationProvider>
      </PersistGate>
    </Provider>
  </StrictMode>,
)
