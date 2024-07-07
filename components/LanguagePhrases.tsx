"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface Phrase {
  original: string
  translation: string
}

interface LanguagePhrasesProps {
  language: string
  phrases: Phrase[]
}

export default function LanguagePhrases({ language, phrases }: LanguagePhrasesProps) {
  const [showTranslations, setShowTranslations] = useState(false)
  const router = useRouter()

  const handleLearnPhrase = async () => {
    await fetch('/api/progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phraseLearned: true }),
    })
    router.refresh()
  }

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-3">Learn some {language}</h2>
      <ul className="space-y-2">
        {phrases.map((phrase, index) => (
          <li key={index}>
            <strong>{phrase.original}</strong>
            {showTranslations && <span className="ml-2">- {phrase.translation}</span>}
          </li>
        ))}
      </ul>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => setShowTranslations(!showTranslations)}
      >
        {showTranslations ? 'Hide' : 'Show'} Translations
      </button>
      <button
        className="mt-4 ml-4 px-4 py-2 bg-green-500 text-white rounded"
        onClick={handleLearnPhrase}
      >
        I&apos;ve learned a phrase!
      </button>
    </div>
  )
}