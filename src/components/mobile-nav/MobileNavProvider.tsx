'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NavContext } from './NavContext'
import ThemeSelector from '@/components/ThemeSelector'
import { NAV_ITEMS } from '@/constants'
import { cn } from '@/lib/utils'

const TRANSITION_MS = 400

interface Props {
  children: React.ReactNode
}

export function MobileNavProvider({ children }: Props) {
  // Two-phase state: stage (fixed+perspective) then animate (3D transform)
  const [isStage, setIsStage] = useState(false)
  const [isAnimate, setIsAnimate] = useState(false)

  const pathname = usePathname()
  const savedScroll = useRef(0)
  const closeTimer = useRef<ReturnType<typeof setTimeout>>()
  const openTimer = useRef<ReturnType<typeof setTimeout>>()

  const open = useCallback(() => {
    clearTimeout(closeTimer.current)
    const scrollY = window.scrollY
    savedScroll.current = scrollY
    // Store scroll offset as a CSS variable *before* React re-renders,
    // so the absolute inner div uses it as its top — no scroll jump.
    document.documentElement.style.setProperty('--nav-scroll-y', `-${scrollY}px`)
    setIsStage(true)
    openTimer.current = setTimeout(() => setIsAnimate(true), 25)
  }, [])

  const close = useCallback(() => {
    clearTimeout(openTimer.current)
    setIsAnimate(false)
    closeTimer.current = setTimeout(() => {
      setIsStage(false)
      document.documentElement.scrollTop = savedScroll.current
      document.documentElement.style.removeProperty('--nav-scroll-y')
    }, TRANSITION_MS)
  }, [])

  const toggle = useCallback(() => {
    if (isStage) close()
    else open()
  }, [isStage, open, close])

  // Close on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768 && isStage) close()
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [close, isStage])

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      clearTimeout(openTimer.current)
      clearTimeout(closeTimer.current)
    }
  }, [])

  return (
    <NavContext.Provider value={{ isOpen: isAnimate, toggle, close }}>
      {/* 3D perspective stage — becomes fixed when nav opens, mobile only */}
      <div
        className="md:contents"
        style={
          isStage
            ? {
                position: 'fixed',
                inset: 0,
                perspective: '1500px',
                zIndex: 50,
                // Background visible behind the rotating page
                backgroundColor: 'hsl(var(--background))',
              }
            : {}
        }
      >
        {/* Page content — rotates in 3D when nav opens */}
        <div
          style={{
            transformOrigin: '0% 50%',
            transition: `transform ${TRANSITION_MS}ms ease`,
            ...(isStage
              ? {
                  position: 'absolute',
                  top: 'var(--nav-scroll-y)',
                  left: 0,
                  right: 0,
                  overflow: 'hidden',
                  backfaceVisibility: 'hidden' as const,
                  cursor: isAnimate ? 'pointer' : 'default',
                  transform: isAnimate
                    ? 'translateZ(-1800px) translateX(-50%) rotateY(45deg)'
                    : 'translateZ(0) translateX(0) rotateY(0deg)',
                }
              : {}),
          }}
          onClick={isAnimate ? close : undefined}
        >
          {children}

          {/* Dimming overlay on the page content as it rotates away */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              background: 'rgba(0,0,0,0.35)',
              opacity: isAnimate ? 1 : 0,
              transition: 'opacity 0.3s',
              zIndex: 999,
            }}
          />
        </div>
      </div>

      {/* Nav links — centered vertically on the right, mobile only */}
      {isStage && (
        <nav
          aria-label="Mobile navigation"
          aria-hidden={!isAnimate}
          className="fixed top-1/2 -translate-y-1/2 right-[10%] md:hidden"
          style={{ zIndex: 60, pointerEvents: isAnimate ? 'auto' : 'none' }}
        >
          <ul className="list-none flex flex-col items-start" role="list">
            {NAV_ITEMS.map(({ label, href }, i) => {
              const delay = i * 0.04
              const isActive = href === '/' ? pathname === href : pathname.startsWith(href)
              return (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={close}
                    tabIndex={isAnimate ? 0 : -1}
                    className={cn(
                      'font-jetbrains-mono text-[1.05rem] uppercase tracking-widest py-3 block transition-colors duration-200',
                      isActive
                        ? 'text-nav-active font-bold'
                        : 'text-foreground hover:text-nav-active',
                    )}
                    style={{
                      opacity: isAnimate ? 1 : 0,
                      transform: isAnimate ? 'translateX(0)' : 'translateX(60px)',
                      transition: `opacity 0.4s ease ${isAnimate ? delay : 0}s, transform 0.4s ease ${isAnimate ? delay : 0}s`,
                    }}
                  >
                    {label}
                  </Link>
                </li>
              )
            })}
          </ul>

          <div
            className="mt-6 border-t border-foreground/20 pt-4"
            style={{
              opacity: isAnimate ? 1 : 0,
              transition: `opacity 0.4s ease ${isAnimate ? NAV_ITEMS.length * 0.04 + 0.1 : 0}s`,
            }}
          >
            <ThemeSelector />
          </div>
        </nav>
      )}
    </NavContext.Provider>
  )
}
