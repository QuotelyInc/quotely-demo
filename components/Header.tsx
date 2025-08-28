'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      {/* Top Banner */}
      <div className="bg-indigo-900 text-white text-center py-2 px-4 text-sm">
        <span className="text-white/90">1 million+ agencies helped.</span>
        <Link href="/demo" className="text-orange-400 hover:text-orange-300 ml-2 font-medium">
          Get quotes →
        </Link>
      </div>

      {/* Main Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">Q</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Quotely</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <div className="relative group">
                <button className="flex items-center text-gray-700 hover:text-gray-900 font-medium">
                  Solutions
                  <svg className="ml-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                {/* Dropdown would go here */}
              </div>
              
              <Link href="/pricing" className="text-gray-700 hover:text-gray-900 font-medium">
                Pricing
              </Link>
              
              <Link href="/demo" className="text-gray-700 hover:text-gray-900 font-medium">
                Demo
              </Link>
              
              <div className="relative group">
                <button className="flex items-center text-gray-700 hover:text-gray-900 font-medium">
                  Company
                  <svg className="ml-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </nav>

            {/* Search and CTA */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for carriers or coverage types"
                  className="w-80 pl-4 pr-10 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg className="h-4 w-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              
              <Link
                href="/demo"
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full font-semibold transition-colors"
              >
                Get Quotes
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-4 py-6 space-y-4">
              <Link href="/solutions" className="block text-gray-700 font-medium">Solutions</Link>
              <Link href="/pricing" className="block text-gray-700 font-medium">Pricing</Link>
              <Link href="/demo" className="block text-gray-700 font-medium">Demo</Link>
              <Link href="/company" className="block text-gray-700 font-medium">Company</Link>
              <div className="pt-4">
                <Link
                  href="/demo"
                  className="block w-full text-center bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-semibold"
                >
                  Get Quotes
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  )
}