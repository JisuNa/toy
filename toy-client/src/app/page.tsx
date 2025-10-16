'use client'

import { useEffect, useState } from 'react'
import { UserMenu } from '@/components/auth/user-menu'

interface HealthResponse {
  status: string
  timestamp: string
}

export default function Home() {
  const [health, setHealth] = useState<HealthResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const response = await fetch('/api/health')
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        setHealth(data)
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Unknown error occurred')
      } finally {
        setLoading(false)
      }
    }

    checkHealth()
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <header className="w-full p-4 flex justify-end">
        <UserMenu />
      </header>
      <main className="flex-1 flex flex-col gap-8 items-center justify-center p-8 max-w-2xl w-full mx-auto">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Language Learning Service
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Welcome to Toy Client
          </p>
        </div>

        <div className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
            Backend Connection Status
          </h2>

          {loading && (
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
              <div className="animate-spin h-5 w-5 border-2 border-blue-600 border-t-transparent rounded-full"></div>
              <span>Checking backend connection...</span>
            </div>
          )}

          {error && (
            <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded p-4">
              <p className="text-red-800 dark:text-red-300 font-medium">Connection Failed</p>
              <p className="text-red-600 dark:text-red-400 text-sm mt-1">{error}</p>
              <p className="text-gray-600 dark:text-gray-400 text-xs mt-2">
                Make sure the backend server is running on http://localhost:8080
              </p>
            </div>
          )}

          {health && (
            <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded p-4">
              <p className="text-green-800 dark:text-green-300 font-medium flex items-center gap-2">
                <span className="h-3 w-3 bg-green-500 rounded-full animate-pulse"></span>
                Backend Connected
              </p>
              <div className="mt-3 space-y-1 text-sm">
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-medium">Status:</span> {health.status}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-medium">Time:</span> {new Date(health.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
              Frontend Stack
            </h3>
            <ul className="text-gray-600 dark:text-gray-300 space-y-1 text-sm">
              <li>Next.js 14 (LTS)</li>
              <li>React 18</li>
              <li>TypeScript</li>
              <li>Tailwind CSS</li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
              Backend Stack
            </h3>
            <ul className="text-gray-600 dark:text-gray-300 space-y-1 text-sm">
              <li>Kotlin + Spring Boot</li>
              <li>MySQL 8.4</li>
              <li>Hexagonal Architecture</li>
              <li>CQRS Pattern</li>
            </ul>
          </div>
        </div>
      </main>

      <footer className="mt-16 text-center text-gray-500 dark:text-gray-400 text-sm">
        <p>Built with Next.js and Tailwind CSS</p>
      </footer>
    </div>
  )
}
