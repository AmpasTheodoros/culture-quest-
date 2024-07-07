import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import prisma from '@/lib/prisma'

export async function GET() {
  const { userId } = auth()
  if (!userId) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  const progress = await prisma.userProgress.findUnique({
    where: { userId },
  })

  if (!progress) {
    return new NextResponse('Progress not found', { status: 404 })
  }

  return NextResponse.json(progress)
}

export async function POST(req: Request) {
  const { userId } = auth()
  if (!userId) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  const { cityVisited, quizCompleted, phraseLearned } = await req.json()

  const progress = await prisma.userProgress.upsert({
    where: { userId },
    update: {
      citiesVisited: cityVisited ? { push: cityVisited } : undefined,
      quizzesCompleted: quizCompleted ? { increment: 1 } : undefined,
      phrasesLearned: phraseLearned ? { increment: 1 } : undefined,
    },
    create: {
      userId,
      citiesVisited: cityVisited ? [cityVisited] : [],
      quizzesCompleted: quizCompleted ? 1 : 0,
      phrasesLearned: phraseLearned ? 1 : 0,
    },
  })

  return NextResponse.json(progress)
}
