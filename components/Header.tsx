"use client"

import Link from 'next/link'
import { UserButton, SignInButton, useAuth } from '@clerk/nextjs'

export default function Header() {
  const { isSignedIn } = useAuth()

  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-3xl font-bold text-yellow-300 hover:text-yellow-100 transition-colors">
          CultureQuest
        </Link>
        <nav>
          <ul className="flex space-x-6 items-center">
            <li>
              <Link href="/cities" className="hover:text-yellow-300 transition-colors">Cities</Link>
            </li>
            <li>
              <Link href="/leaderboard" className="hover:text-yellow-300 transition-colors">Leaderboard</Link>
            </li>
            {isSignedIn ? (
              <>
                <li>
                  <Link href="/dashboard" className="hover:text-yellow-300 transition-colors">Dashboard</Link>
                </li>
                <li>
                  <UserButton afterSignOutUrl="/" />
                </li>
              </>
            ) : (
              <li>
                <SignInButton mode="modal">
                  <button className="bg-yellow-400 text-blue-800 px-4 py-2 rounded-full hover:bg-yellow-300 transition-colors">
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