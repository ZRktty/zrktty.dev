'use client'

import { createContext, useContext } from 'react'

interface NavContextType {
  isOpen: boolean
  toggle: () => void
  close: () => void
}

export const NavContext = createContext<NavContextType>({
  isOpen: false,
  toggle: () => {},
  close: () => {},
})

export const useNav = () => useContext(NavContext)
