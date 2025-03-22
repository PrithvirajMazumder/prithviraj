'use client'

import ThreeScene from '@/components/three-scene'
import { SectionIDs } from '@/constants/sectionsIds'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { useRef } from 'react'
import { AboutSection } from './about-section'
import { Navbar } from '../navbar'

export const LandingSection = () => {
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
            delay: 1.5,
            stagger: 0.1,
            ease: 'back.out(0.2)'
          }
        ).fromTo(
          '.navbar-link',
          {
            opacity: 0,
            y: 20
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            delay: -1.75,
            stagger: 0.2,
            ease: 'power4.out'
          }
        ).fromTo(
          '.working-status',
          {
            opacity: 0,
            y: 20
          },
          {
            opacity: 1,
            y: 0,
            duration: 2.8,
            delay: -1,
            ease: 'power4.out'
          }
        )
      }
    },
    { scope: containerRef }
  )

  return (
    <main id={SectionIDs.landingPage} ref={containerRef} className="bg-foreground">
      <Navbar />
      <ThreeScene className="opacity-[0.06]" />
      <div className="relative min-h-screen">
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 z-10 pointer-events-none overflow-hidden">
          <h1 ref={headingRef} className="mb-8 font-le-murmure text-7xl md:text-[32svh] text-background pointer-events-auto">
            Prithvi
          </h1>
        </div>
        <div className="absolute bottom-0 w-svw py-8 px-16 flex items-center justify-between">
          <span className="text-2xl text-background working-status">
            <span >Software Consultant</span> <br />
            <span >from Kolkata, India</span>
          </span>
          <span className="text-2xl text-background text-right working-status">
            <span >Currently working at</span> <br />
            <span >TechVerito Software Solutions LLP</span>
          </span>
        </div>
      </div>
      <AboutSection />
    </main>
  )
}
