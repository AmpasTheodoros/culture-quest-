import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import prisma from '@/lib/prisma'

export default async function Dashboard() {
  const { userId } = auth()
  if (!userId) {
    redirect('/sign-in')
  }

  const progress = await prisma.userProgress.findUnique({
    where: { userId },
    include: { achievements: true },
  })

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">Your Dashboard</h1>
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4">Your Progress</h2>
        <p>Cities visited: {progress?.citiesVisited.length || 0}</p>
        <p>Quizzes completed: {progress?.quizzesCompleted || 0}</p>
        <p>Phrases learned: {progress?.phrasesLearned || 0}</p>
        <p>Total points: {progress?.totalPoints || 0}</p>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Your Achievements</h2>
        {progress?.achievements.length ? (
          <ul>
            {progress.achievements.map((achievement) => (
              <li key={achievement.id} className="mb-2">
                <strong>{achievement.name}</strong>: {achievement.description}
              </li>
            ))}
          </ul>
        ) : (
          <p>No achievements yet. Keep exploring to earn some!</p>
        )}
      </div>
    </div>
  )
}