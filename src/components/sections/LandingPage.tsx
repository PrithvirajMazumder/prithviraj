'use client'

import ThreeScene from '@/components/three-scene'
import { SectionIDs } from '@/constants/sectionsIds'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { useRef } from 'react'

export const LandingPage = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)

  useGSAP(
    () => {
      // Create a timeline for the heading animation
      const tl = gsap.timeline()

      // Split the text into individual characters for staggered animation
      const text = headingRef.current?.textContent || ''
      if (headingRef.current) {
        headingRef.current.innerHTML = ''

        // Create spans for each character
        text.split('').forEach((char) => {
          const span = document.createElement('span')
          span.textContent = char
          span.className = 'heading-char inline-block'
          headingRef.current?.appendChild(span)
        })

        // Animate each character
        tl.fromTo(
          '.heading-char',
          {
            opacity: 0,
            y: 100
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
            duration: 1.2,
            stagger: 0.1,
            ease: 'power3.out'
          }
        ).fromTo(
          '.landing-page-3d-scene',
          {
            opacity: 0
          },
          {
            opacity: 0.06,
            duration: 1,
            ease: 'power3.out'
          }
        )
      }
    },
    { scope: containerRef }
  )

  return (
    <main id={SectionIDs.landingPage} className="relative min-h-screen bg-foreground" ref={containerRef}>
      <ThreeScene className="landing-page-3d-scene" />
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 z-10 pointer-events-none">
        <h1 ref={headingRef} className="font-bold mb-8 font-le-murmure text-7xl md:text-[32svh] text-white pointer-events-auto">
          Prithvi
        </h1>
      </div>
    </main>
  )
}
