import LanguageExample from "@/components/examples/language-example"

export default function MultilingualPage() {
  return (
    <main className="container mx-auto px-4 py-24">
      <h1 className="text-4xl font-bold mb-8">Multilingual System Demo</h1>
      
      <p className="text-lg mb-8">
        This page demonstrates how to use the language context to create multilingual content.
        Try switching languages and interacting with the example component below.
      </p>
      
      <LanguageExample />
      
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">How It Works</h2>
        <p className="mb-4">
          The multilingual system uses a React Context to manage the current language and provide
          translations throughout the application. See the full documentation at{" "}
          <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
            docs/multilingual-system.md
          </code>
        </p>
      </div>
    </main>
  )
} 