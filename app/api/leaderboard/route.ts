import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
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

  return NextResponse.json(leaderboard)
}