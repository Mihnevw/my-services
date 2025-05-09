import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from './locales/en.json';
import bgTranslations from './locales/bg.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslations },
      bg: { translation: bgTranslations }
    },
    lng: 'en', // Временно по подразбиране (ще се сменя от клиента)
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
