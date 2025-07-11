import React from "react";
import { BrowserRouter } from "react-router-dom";
import ScrollToTop from "./components/utils/ScrollToTop";
import AppRoutes from "./routes/AppRoutes";
import { useFirebaseMessaging } from './hooks/useFirebaseMessaging';
import './App.css';
import { NotificationProvider } from "./context/NotificationContext";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "./context/ThemeContext";

const App: React.FC = () => {
  useFirebaseMessaging();

  return (
    <BrowserRouter>
      <NotificationProvider>
        <ThemeProvider>
          <ScrollToTop />
          <AppRoutes />
        </ThemeProvider>
        <Toaster richColors position="top-right" />
      </NotificationProvider>
    </BrowserRouter>
  );
}

export default App;