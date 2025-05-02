import './App.css'
import './styles/scrollbar.css' // Import the scrollbar styles
import AppRoutes from '@/routes/AppRoutes';
import { TranslationProvider } from '@/contexts/TranslationContext';
import { AuthProvider } from '@/contexts/AuthContext';

import '@/configs/i18n.config'; // Import i18n configuration
import { Toaster } from '@/components/elements/toaster/Toaster';
import RouteTransition from './components/elements/route-transition/RouteTransition';

export default function App() {
  return (
    <AuthProvider>
      <TranslationProvider>
        <RouteTransition>
          <AppRoutes />
        </RouteTransition>
      </TranslationProvider>
      <Toaster />
    </AuthProvider>
  );
}
