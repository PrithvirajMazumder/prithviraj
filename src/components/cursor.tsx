'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

type Props = {
  isLoading?: boolean
}
export const Cursor = (props: Props) => {
  const cursorRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: 0, y: 0 })
  const mouse = useRef({ x: 0, y: 0 })
  const speed = 0.2

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY

      // Check if the cursor is over an interactive element
      const target = e.target as HTMLElement
      const isClickable = target.tagName.toLowerCase() === 'button' ||
        target.tagName.toLowerCase() === 'a' ||
        target.hasAttribute('role') ||
        target.onclick !== null ||
        target.closest('button, a, [role="button"]') !== null
      
      if (isClickable) {
        gsap.to('.cursor-dot', {
          scale: 3,
          duration: 0.05,
          ease: 'elastic'
        })
      } else {
        gsap.to('.cursor-dot', {
          scale: 1,
          duration: 0.05,
          ease: 'elastic'
        })
      }
    }

    const handleMouseDown = () => {
      gsap.to('.cursor-dot', {
        scale: 0.5,
        duration: 0.05,
      })
    }

    const handleMouseUp = () => {
      gsap.to('.cursor-dot', {
        scale: 1,
        duration: 0.05,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)

    const updateCursor = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * speed
      pos.current.y += (mouse.current.y - pos.current.y) * speed

      if (Math.abs(mouse.current.x - pos.current.x) < 0.1) pos.current.x = mouse.current.x
      if (Math.abs(mouse.current.y - pos.current.y) < 0.1) pos.current.y = mouse.current.y

      gsap.set(cursor, {
        x: pos.current.x - cursor.offsetWidth / 2,
        y: pos.current.y - cursor.offsetHeight / 2
      })

      requestAnimationFrame(updateCursor)
    }

    updateCursor()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    const loadingCursor = cursor.firstElementChild
    const dotCursor = cursor.lastElementChild

    const tl = gsap.timeline()

    if (props.isLoading) {
      tl.set(dotCursor, { scale: 0, opacity: 0 })
        .fromTo(
          loadingCursor,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5, ease: 'power3.out' }
        )
    } else {
      tl.to(loadingCursor, {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        ease: 'power3.in'
      }).fromTo(
        dotCursor,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: 'power3.out' },
        '-=0.3'
      )
    }
  }, [props.isLoading])

  return (
    <div ref={cursorRef} className="fixed top-0 left-0 pointer-events-none z-50 mix-blend-difference">
      {props.isLoading ? (
        <div className="flex justify-center items-center h-screen relative">
          <svg
            className="rotating-svg animate-rotate-loader-text"
            width="200"
            height="200"
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <path id="circlePath" d="M 100, 100 m -70, 0 a 70,70 0 1,1 140, 0 a 70,70 0 1,1 -140, 0" />
            </defs>
            <text className="fill-current text-background">
              <textPath href="#circlePath">Loading | Loading | Loading | Loading | Loading | Loading | Loading</textPath>
            </text>
          </svg>
          <p className="justify-self-center text-background text-lg absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">Loading...</p>
        </div>
      ) : (
        <div className="cursor-dot w-6 h-6 bg-background rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-transform duration-300" />
      )}
      <style jsx global>{`
        * {
          cursor: none !important;
        }
      `}</style>
    </div>
  )
}
