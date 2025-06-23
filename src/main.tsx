import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import { store } from './store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { Toaster } from 'sonner';
import { NotificationProvider } from './context/NotificationContext';
import { ThemeProvider } from './context/ThemeContext';
import './index.css'
import App from './App.tsx'

let persistor = persistStore(store);

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NotificationProvider>
          <ThemeProvider>
            <App />
            <Toaster position="top-right" richColors />
          </ThemeProvider>
        </NotificationProvider>
      </PersistGate>
    </Provider>
);

console.log('Attempting service worker registration...');
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/firebase-messaging-sw.js')
    .then((registration) => {
      console.log('Service Worker registered with scope:', registration.scope);
    })
    .catch((error) => {
      console.error('Service Worker registration failed:', error);
    });
}
