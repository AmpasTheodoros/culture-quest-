import Link from 'next/link'
import { UserButton, SignInButton, useUser } from '@clerk/nextjs'

export default function Header() {
  const { isSignedIn } = useUser()

  return (
    <header className="bg-blue-500 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          CultureQuest
        </Link>
        <nav>
          <ul className="flex space-x-4 items-center">
            <li>
              <Link href="/cities">Cities</Link>
            </li>
            <li>
              <Link href="/leaderboard">Leaderboard</Link>
            </li>
            {isSignedIn ? (
              <>
                <li>
                  <Link href="/dashboard">Dashboard</Link>
                </li>
                <li>
                  <UserButton afterSignOutUrl="/" />
                </li>
              </>
            ) : (
              <li>
                <SignInButton mode="modal">
                  <button className="bg-white text-blue-500 px-4 py-2 rounded">
                    Sign In
                  </button>
                </SignInButton>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  )
}