import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import prisma from '@/lib/prisma'

export async function GET() {
  const { userId } = auth()
  if (!userId) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  const achievements = await prisma.achievement.findMany({
    where: {
      userProgress: {
        userId,
      },
    },
  })

  return NextResponse.json(achievements)
}

export async function POST(req: Request) {
  const { userId } = auth()
  if (!userId) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  const { name, description } = await req.json()

  const achievement = await prisma.achievement.create({
    data: {
      name,
      description,
      userProgress: {
        connect: {
          userId,
        },
      },
    },
  })

  // Update total points
  await prisma.userProgress.update({
    where: { userId },
    data: {
      totalPoints: {
        increment: 10, // Award 10 points for each achievement
      },
    },
  })

  return NextResponse.json(achievement)
}