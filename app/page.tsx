import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Welcome to CultureQuest</h1>
      <p className="mt-4 text-xl">Embark on a journey of language and culture!</p>
      <Link href="/cities" className="mt-8 px-4 py-2 bg-blue-500 text-white rounded">
        Explore Cities
      </Link>
    </main>
  )
}