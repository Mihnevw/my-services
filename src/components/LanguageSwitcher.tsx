import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState(i18n.language);

  useEffect(() => {
    // Load saved language from localStorage on component mount
    const savedLang = localStorage.getItem('language') || 'en';
    if (i18n.language !== savedLang) {
        i18n.changeLanguage(savedLang);
        setCurrentLang(savedLang);
      }
  }, [i18n]);

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
    setCurrentLang(lang);
    localStorage.setItem('language', lang);
  };

  return (
    <div className="relative inline-block text-left">
      <select
        value={currentLang}
        onChange={(e) => handleLanguageChange(e.target.value)}
        className="block w-full px-4 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="en">English</option>
        <option value="bg">Български</option>
      </select>
    </div>
  );
};

export default LanguageSwitcher; 