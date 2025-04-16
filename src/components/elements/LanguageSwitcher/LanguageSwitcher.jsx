import { useState, useRef, useEffect } from 'react';
import { useAppTranslation } from '@/contexts/TranslationContext';
import { TailwindStyle } from '@/utils/Enum';

export default function LanguageSwitcher() {
  const { t, i18n, changeLanguage } = useAppTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // SVG flags based on current language
  const VietnamFlag = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32">
      <rect x="1" y="4" width="30" height="24" rx="4" ry="4" fill="#c93728"></rect>
      <path d="M27,4H5c-2.209,0-4,1.791-4,4V24c0,2.209,1.791,4,4,4H27c2.209,0,4-1.791,4-4V8c0-2.209-1.791-4-4-4Zm3,20c0,1.654-1.346,3-3,3H5c-1.654,0-3-1.346-3-3V8c0-1.654,1.346-3,3-3H27c1.654,0,3,1.346,3,3V24Z" opacity=".15"></path>
      <path d="M27,5H5c-1.657,0-3,1.343-3,3v1c0-1.657,1.343-3,3-3H27c1.657,0,3,1.343,3,3v-1c0-1.657-1.343-3-3-3Z" fill="#fff" opacity=".2"></path>
      <path fill="#ff5" d="M18.008 16.366L21.257 14.006 17.241 14.006 16 10.186 14.759 14.006 10.743 14.006 13.992 16.366 12.751 20.186 16 17.825 19.249 20.186 18.008 16.366z"></path>
    </svg>
  );

  const UKFlag = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32">
      <rect x="1" y="4" width="30" height="24" rx="4" ry="4" fill="#071b65"></rect>
      <path d="M5.101,4h-.101c-1.981,0-3.615,1.444-3.933,3.334L26.899,28h.101c1.981,0,3.615-1.444,3.933-3.334L5.101,4Z" fill="#fff"></path>
      <path d="M22.25,19h-2.5l9.934,7.947c.387-.353,.704-.777,.929-1.257l-8.363-6.691Z" fill="#b92932"></path>
      <path d="M1.387,6.309l8.363,6.691h2.5L2.316,5.053c-.387,.353-.704,.777-.929,1.257Z" fill="#b92932"></path>
      <path d="M5,28h.101L30.933,7.334c-.318-1.891-1.952-3.334-3.933-3.334h-.101L1.067,24.666c.318,1.891,1.952,3.334,3.933,3.334Z" fill="#fff"></path>
      <rect x="13" y="4" width="6" height="24" fill="#fff"></rect>
      <rect x="1" y="13" width="30" height="6" fill="#fff"></rect>
      <rect x="14" y="4" width="4" height="24" fill="#b92932"></rect>
      <rect x="14" y="1" width="4" height="30" transform="translate(32) rotate(90)" fill="#b92932"></rect>
      <path d="M28.222,4.21l-9.222,7.376v1.414h.75l9.943-7.94c-.419-.384-.918-.671-1.471-.85Z" fill="#b92932"></path>
      <path d="M2.328,26.957c.414,.374,.904,.656,1.447,.832l9.225-7.38v-1.408h-.75L2.328,26.957Z" fill="#b92932"></path>
      <path d="M27,4H5c-2.209,0-4,1.791-4,4V24c0,2.209,1.791,4,4,4H27c2.209,0,4-1.791,4-4V8c0-2.209-1.791-4-4-4Zm3,20c0,1.654-1.346,3-3,3H5c-1.654,0-3-1.346-3-3V8c0-1.654,1.346-3,3-3H27c1.654,0,3,1.346,3,3V24Z" opacity=".15"></path>
      <path d="M27,5H5c-1.657,0-3,1.343-3,3v1c0-1.657,1.343-3,3-3H27c1.657,0,3,1.343,3,3v-1c0-1.657-1.343-3-3-3Z" fill="#fff" opacity=".2"></path>
    </svg>
  );

  return (
    <div className="relative " ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-center w-8 h-8 hover:opacity-80 transition-opacity cursor-pointer `}
      >
        {i18n.language === "vi" ? <VietnamFlag /> : <UKFlag />}
      </button>

      {isOpen && (
        <div
          className={`${TailwindStyle.GLASSMORPHISM} absolute transform -translate-x-1/2 left-1/2 mt-2 w-40 rounded-md shadow-lg z-50 overflow-hidden`}
        >
          <div className="py-1">
            <button
              onClick={() => {
                changeLanguage("en");
                setIsOpen(false);
              }}
              className={`flex items-center w-full text-left px-4 py-2 text-sm ${
                i18n.language === "en"
                  ? `${TailwindStyle.GLASSMORPHISM} text-secondary-blue`
                  : `text-primary-blue cursor-pointer`
              }`}
            >
              <span className="mr-2">
                <UKFlag />
              </span>{" "}
              {t("language.english")}
            </button>
            <button
              onClick={() => {
                changeLanguage("vi");
                setIsOpen(false);
              }}
              className={`flex items-center w-full text-left px-4 py-2 text-sm ${
                i18n.language === "vi"
                  ? `${TailwindStyle.GLASSMORPHISM} text-secondary-blue`
                  : `text-primary-blue cursor-pointer`
              }`}
            >
              <span className="mr-2">
                <VietnamFlag />
              </span>{" "}
              {t("language.vietnamese")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}