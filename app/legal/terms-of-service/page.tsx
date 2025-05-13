"use client"

import Navbar from "@/components/navbar"
import { useLanguage } from "@/contexts/language-context"

export default function TermsOfServicePage() {
  const { t } = useLanguage();
  const today = new Date().toLocaleDateString();
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white dark:bg-gray-950 pt-20">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">{t("termsOfServiceTitle")}</h1>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {t("termsOfServiceLastUpdated").replace("{date}", today)}
            </p>
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">{t("termsOfServiceSection1Title")}</h2>
              <p className="text-gray-600 dark:text-gray-300">
                {t("termsOfServiceSection1Content")}
              </p>
            </section>
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">{t("termsOfServiceSection2Title")}</h2>
              <p className="text-gray-600 dark:text-gray-300">
                {t("termsOfServiceSection2Content")}
              </p>
            </section>
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">{t("termsOfServiceSection3Title")}</h2>
              <p className="text-gray-600 dark:text-gray-300">
                {t("termsOfServiceSection3Content")}
              </p>
            </section>
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">{t("termsOfServiceSection4Title")}</h2>
              <p className="text-gray-600 dark:text-gray-300">
                {t("termsOfServiceSection4Content")}
              </p>
            </section>
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">{t("termsOfServiceSection5Title")}</h2>
              <p className="text-gray-600 dark:text-gray-300">
                {t("termsOfServiceSection5Content")}
              </p>
            </section>
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">{t("termsOfServiceSection6Title")}</h2>
              <p className="text-gray-600 dark:text-gray-300">
                {t("termsOfServiceSection6Content")}
              </p>
            </section>
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">{t("termsOfServiceSection7Title")}</h2>
              <p className="text-gray-600 dark:text-gray-300">
                {t("termsOfServiceSection7Content")}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                {t("termsOfServiceSection7Email")}
              </p>
            </section>
          </div>
        </div>
      </main>
    </>
  )
} 