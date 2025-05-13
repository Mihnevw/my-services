"use client"

import Navbar from "@/components/navbar"
import { useLanguage } from "@/contexts/language-context"

export default function CookiePolicyPage() {
  const { t } = useLanguage();
  const today = new Date().toLocaleDateString();
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white dark:bg-gray-950 pt-20">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">{t("cookiePolicyTitle")}</h1>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {t("cookiePolicyLastUpdated").replace("{date}", today)}
            </p>
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">{t("cookiePolicySection1Title")}</h2>
              <p className="text-gray-600 dark:text-gray-300">
                {t("cookiePolicySection1Content")}
              </p>
            </section>
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">{t("cookiePolicySection2Title")}</h2>
              <p className="text-gray-600 dark:text-gray-300">
                {t("cookiePolicySection2Content")}
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300">
                {JSON.parse(t("cookiePolicySection2List")).map((item: string, i: number) => <li key={i}>{item}</li>)}
              </ul>
            </section>
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">{t("cookiePolicySection3Title")}</h2>
              <p className="text-gray-600 dark:text-gray-300">
                {t("cookiePolicySection3Content")}
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300">
                {JSON.parse(t("cookiePolicySection3List")).map((item: string, i: number) => <li key={i}>{item}</li>)}
              </ul>
            </section>
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">{t("cookiePolicySection4Title")}</h2>
              <p className="text-gray-600 dark:text-gray-300">
                {t("cookiePolicySection4Content")}
              </p>
            </section>
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">{t("cookiePolicySection5Title")}</h2>
              <p className="text-gray-600 dark:text-gray-300">
                {t("cookiePolicySection5Content")}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                {t("cookiePolicySection5Email")}
              </p>
            </section>
          </div>
        </div>
      </main>
    </>
  )
} 