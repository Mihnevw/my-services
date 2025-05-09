import LanguageSpeechTest from '@/components/language-speech-test'

export default function TestPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold text-center mb-6">Speech Synthesis Test Page</h1>
      <p className="text-center mb-8 text-gray-600">
        Use this page to test speech synthesis for different languages
      </p>
      
      <LanguageSpeechTest />
    </div>
  )
} 