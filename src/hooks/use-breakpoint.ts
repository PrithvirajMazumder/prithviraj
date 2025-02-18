import { useState, useEffect } from 'react'

type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | null

const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
}

export const useBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>(null)
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const handleResize = () => {
      const currentWidth = window.innerWidth
      setWidth(currentWidth)

      if (currentWidth < breakpoints.sm) {
        setBreakpoint(null)
      } else if (currentWidth < breakpoints.md) {
        setBreakpoint('sm')
      } else if (currentWidth < breakpoints.lg) {
        setBreakpoint('md')
      } else if (currentWidth < breakpoints.xl) {
        setBreakpoint('lg')
      } else if (currentWidth < breakpoints['2xl']) {
        setBreakpoint('xl')
      } else {
        setBreakpoint('2xl')
      }
    }

    // Initial check
    handleResize()

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return {
    breakpoint,
    width,
    isSmaller: (bp: Breakpoint) => {
      if (!bp || !breakpoint) return false
      const breakpointOrder = ['sm', 'md', 'lg', 'xl', '2xl']
      return breakpointOrder.indexOf(breakpoint) < breakpointOrder.indexOf(bp)
    },
    isLarger: (bp: Breakpoint) => {
      if (!bp || !breakpoint) return false
      const breakpointOrder = ['sm', 'md', 'lg', 'xl', '2xl']
      return breakpointOrder.indexOf(breakpoint) > breakpointOrder.indexOf(bp)
    }
  }
}