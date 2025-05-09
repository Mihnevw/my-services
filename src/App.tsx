import { useTranslation } from 'react-i18next';
import './i18n';
import LanguageSwitcher from './components/LanguageSwitcher';

function App() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">
            {t('welcome')}
          </h1>
          <LanguageSwitcher />
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <p className="text-lg text-gray-700">
              {t('about')}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App; 