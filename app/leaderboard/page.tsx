import { auth } from '@clerk/nextjs/server'
import prisma from '@/lib/prisma'

export default async function Leaderboard() {
  const { userId } = auth()
  
  const leaderboard = await prisma.userProgress.findMany({
    orderBy: {
      totalPoints: 'desc',
    },
    take: 10,
    select: {
      userId: true,
      totalPoints: true,
    },
  })

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">Leaderboard</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left">Rank</th>
              <th className="text-left">User</th>
              <th className="text-left">Points</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((entry, index) => (
              <tr key={entry.userId} className={entry.userId === userId ? "bg-yellow-100" : ""}>
                <td>{index + 1}</td>
                <td>{entry.userId === userId ? "You" : `User ${index + 1}`}</td>
                <td>{entry.totalPoints}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}