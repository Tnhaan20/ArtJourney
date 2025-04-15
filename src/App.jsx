import './App.css'
import AppRoutes from './routes/AppRoutes';
import { TranslationProvider } from './contexts/TranslationContext';
import './configs/i18n'; // Import i18n configuration

export default function App() {
  return (
    <TranslationProvider>
      <AppRoutes />
    </TranslationProvider>
  );
}
