"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface QuizQuestion {
  question: string
  options: string[]
  correctAnswer: number
}

const quizQuestions: Record<string, QuizQuestion[]> = {
  'Paris': [
    {
      question: 'What is the famous iron tower in Paris called?',
      options: ['Big Ben', 'Eiffel Tower', 'Leaning Tower', 'Tokyo Tower'],
      correctAnswer: 1,
    },
    // Add more questions...
  ],
  // Add quizzes for other cities...
}

export default function CityQuiz({ cityName }: { cityName: string }) {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)

  const questions = quizQuestions[cityName] || []

  const handleAnswer = async (selectedOption: number) => {
    if (selectedOption === questions[currentQuestion].correctAnswer) {
      setScore(score + 1)
    }

    const nextQuestion = currentQuestion + 1
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion)
    } else {
      setShowResult(true)
    }

    if (showResult) {
      // Quiz completed, update progress
      await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          cityVisited: cityName,
          quizCompleted: true
        }),
    })
    
    router.refresh() // Refresh the page to update displayed progress
    }
  }

  if (questions.length === 0) {
    return <div>No quiz available for this city.</div>
  }

  if (showResult) {
    return (
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Quiz Results</h2>
        <p>You scored {score} out of {questions.length}!</p>
      </div>
    )
  }

  const question = questions[currentQuestion]

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">City Quiz</h2>
      <p className="mb-4">{question.question}</p>
      <div className="space-y-2">
        {question.options.map((option, index) => (
          <button
            key={index}
            className="w-full p-2 text-left bg-gray-100 hover:bg-gray-200 rounded"
            onClick={() => handleAnswer(index)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  )
}