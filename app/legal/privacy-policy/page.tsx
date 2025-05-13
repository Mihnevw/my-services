"use client";

import Navbar from "@/components/navbar"
import { useLanguage } from "@/contexts/language-context"

export default function PrivacyPolicyPage() {
  const { t } = useLanguage();
  const today = new Date().toLocaleDateString();
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white dark:bg-gray-950 pt-20">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">{t("privacyPolicyTitle")}</h1>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {t("privacyPolicyLastUpdated").replace("{date}", today)}
            </p>
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">{t("privacyPolicySection1Title")}</h2>
              <p className="text-gray-600 dark:text-gray-300">
                {t("privacyPolicySection1Content")}
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300">
                {JSON.parse(t("privacyPolicySection1List")).map((item: string, i: number) => <li key={i}>{item}</li>)}
              </ul>
            </section>
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">{t("privacyPolicySection2Title")}</h2>
              <p className="text-gray-600 dark:text-gray-300">
                {t("privacyPolicySection2Content")}
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300">
                {JSON.parse(t("privacyPolicySection2List")).map((item: string, i: number) => <li key={i}>{item}</li>)}
              </ul>
            </section>
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">{t("privacyPolicySection3Title")}</h2>
              <p className="text-gray-600 dark:text-gray-300">
                {t("privacyPolicySection3Content")}
              </p>
            </section>
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">{t("privacyPolicySection4Title")}</h2>
              <p className="text-gray-600 dark:text-gray-300">
                {t("privacyPolicySection4Content")}
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300">
                {JSON.parse(t("privacyPolicySection4List")).map((item: string, i: number) => <li key={i}>{item}</li>)}
              </ul>
            </section>
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">{t("privacyPolicySection5Title")}</h2>
              <p className="text-gray-600 dark:text-gray-300">
                {t("privacyPolicySection5Content")}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                {t("privacyPolicySection5Email")}
              </p>
            </section>
          </div>
        </div>
      </main>
    </>
  )
} 