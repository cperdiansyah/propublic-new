'use client'

import { useState, useRef, useEffect } from 'react'
import { useAuthNext } from '@shared/hooks/useAuthNext'
import {
  User,
  LogOut,
  Settings,
  Crown,
  Wallet,
  ChevronDown,
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

const UserDropdown = () => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { session, logout } = useAuthNext()

  const user = session?.user

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleLogout = async () => {
    setIsOpen(false)
    await logout()
  }

  if (!user) return null

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-800/50 transition-colors"
      >
        <div className="relative">
          {user.userData?.avatar_url ? (
            <Image
              src={user.userData.avatar_url}
              alt={user.userData?.username || 'User'}
              width={32}
              height={32}
              className="rounded-full"
            />
          ) : (
            <div className="w-8 h-8 bg-custom-primary rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
          )}
          {user.userData?.is_active && (
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-dark-primary rounded-full"></div>
          )}
        </div>

        <div className="hidden md:block text-left">
          <p className="text-cream font-medium text-sm">
            {user.userData?.username}
          </p>
          <p className="text-cream/60 text-xs capitalize">
            {user.userData?.role}
          </p>
        </div>

        <ChevronDown
          className={`w-4 h-4 text-cream/60 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-dark-secondary border border-gray-700 rounded-lg shadow-xl py-2 z-50">
          {/* User Info */}
          <div className="px-4 py-3 border-b border-gray-700">
            <div className="flex items-center space-x-3">
              {user.userData?.avatar_url ? (
                <Image
                  src={user.userData.avatar_url}
                  alt={user.userData?.username || 'User'}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              ) : (
                <div className="w-10 h-10 bg-custom-primary rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
              )}
              <div>
                <p className="text-cream font-medium">
                  {user.userData?.username}
                </p>
                <p className="text-cream/60 text-sm">{user.email}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-xs bg-custom-primary/20 text-custom-primary px-2 py-0.5 rounded capitalize">
                    {user.userData?.role}
                  </span>
                  {user.userData?.wallet_balance && (
                    <span className="text-xs text-custom-accent">
                      ${user.userData.wallet_balance} {user.userData?.currency}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            <Link
              href="/dashboard"
              className="flex items-center space-x-3 px-4 py-2 text-cream/80 hover:text-cream hover:bg-gray-700/50 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <User className="w-4 h-4" />
              <span>Dashboard</span>
            </Link>

            <Link
              href="/profile"
              className="flex items-center space-x-3 px-4 py-2 text-cream/80 hover:text-cream hover:bg-gray-700/50 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <Settings className="w-4 h-4" />
              <span>Profile Settings</span>
            </Link>

            <Link
              href="/wallet"
              className="flex items-center space-x-3 px-4 py-2 text-cream/80 hover:text-cream hover:bg-gray-700/50 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <Wallet className="w-4 h-4" />
              <span>Wallet</span>
            </Link>

            {user.userData?.role === 'coach' && (
              <Link
                href="/coach/dashboard"
                className="flex items-center space-x-3 px-4 py-2 text-cream/80 hover:text-cream hover:bg-gray-700/50 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <Crown className="w-4 h-4" />
                <span>Coach Panel</span>
              </Link>
            )}
          </div>

          {/* Logout */}
          <div className="border-t border-gray-700 pt-2">
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 px-4 py-2 text-red-400 hover:text-red-300 hover:bg-gray-700/50 transition-colors w-full text-left"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserDropdown
