import { createContext, useContext } from 'react';
import { useTranslation } from 'react-i18next';

// Create context
const TranslationContext = createContext(null);

// Provider component
export function TranslationProvider({ children }) {
  const { t, i18n } = useTranslation();
  
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  
  return (
    <TranslationContext.Provider value={{ t, i18n, changeLanguage }}>
      {children}
    </TranslationContext.Provider>
  );
}

// Custom hook to use the translation context
export function useAppTranslation() {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useAppTranslation must be used within a TranslationProvider');
  }
  return context;
}