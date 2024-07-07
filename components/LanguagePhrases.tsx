"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface Phrase {
  original: string
  translation: string
  audioSrc: string
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

  const playAudio = (audioSrc: string) => {
    const audio = new Audio(audioSrc)
    audio.play()
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-4 text-blue-800">Learn some {language}</h2>
      <ul className="space-y-4">
        {phrases.map((phrase, index) => (
          <li key={index} className="flex items-center justify-between bg-gray-100 p-3 rounded-lg">
            <div>
              <strong className="text-purple-600">{phrase.original}</strong>
              {showTranslations && <span className="ml-2 text-gray-600">- {phrase.translation}</span>}
            </div>
            <button
              onClick={() => playAudio(phrase.audioSrc)}
              className="bg-green-500 text-white px-3 py-1 rounded-full hover:bg-green-600 transition-colors"
            >
              Play
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-6 space-x-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
          onClick={() => setShowTranslations(!showTranslations)}
        >
          {showTranslations ? 'Hide' : 'Show'} Translations
        </button>
        <button
          className="px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
          onClick={handleLearnPhrase}
        >
          I&apos;ve learned a phrase!
        </button>
      </div>
    </div>
  )
}