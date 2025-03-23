'use client'

import ThreeScene from '@/components/three-scene'
import { SectionIDs } from '@/constants/sectionsIds'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef } from 'react'
import { Navbar } from '../navbar'
import { AboutSection } from './about-section'

gsap.registerPlugin(ScrollTrigger)

export const LandingSection = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const headingContainerRef = useRef<HTMLHeadingElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)

  useGSAP(
    () => {
      const tl = gsap.timeline()

      const text = headingRef.current?.textContent || ''
      if (headingRef.current) {
        headingRef.current.innerHTML = ''

        text.split('').forEach((char) => {
          const span = document.createElement('span')
          span.textContent = char
          span.className = 'heading-char inline-block'
          headingRef.current?.appendChild(span)
        })

        // ✅ Set initial state BEFORE animation runs
        gsap.set('.heading-char', { y: 0, opacity: 1 })

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
            ease: 'back.out(0.2)',
            onComplete: () => {
              ScrollTrigger.refresh()

              const newTl = gsap.timeline({
                scrollTrigger: {
                  trigger: headingContainerRef.current,
                  start: 'top top',
                  end: '+=50%',
                  scrub: true,
                  pin: true,
                  pinSpacing: false,
                  anticipatePin: 1
                }
              })

              newTl.fromTo(
                '.heading-char',
                {
                  y: 0,
                  opacity: 1
                },
                {
                  y: 100,
                  opacity: 0,
                  duration: 1.2,
                  stagger: 0.1,
                  ease: 'power4.out'
                }
              )

              newTl.fromTo(
                '.current-office-line',
                {
                  opacity: 1
                },
                {
                  delay: -1.8,
                  opacity: 0,
                  duration: 1.2,
                  stagger: 0.8,
                  ease: 'power4.out'
                }
              )
              newTl.fromTo(
                '.role-info-line',
                {
                  opacity: 1
                },
                {
                  opacity: 0,
                  delay: -1.8,
                  duration: 1.2,
                  stagger: 0.2,
                  ease: 'power4.out'
                }
              )
            }
          }
        )
          .fromTo(
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
          )
          .fromTo(
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
              stagger: 0.2,
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
      <div ref={headingContainerRef} className="relative min-h-svh">
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 z-10 pointer-events-none overflow-hidden">
          <h1 ref={headingRef} className="mb-8 font-le-murmure text-7xl md:text-[32svh] text-background pointer-events-auto">
            Prithvi
          </h1>
        </div>
        <div className="absolute bottom-0 w-svw py-8 px-16 flex items-center justify-between">
          <span className="text-2xl text-background working-status role-info">
            <span className="role-info-line">Software Consultant</span> <br />
            <span className="role-info-line">from Kolkata, India</span>
          </span>
          <span className="text-2xl text-background text-right working-status current-office">
            <span className="current-office-line">Currently working at</span> <br />
            <span className="current-office-line">TechVerito Software Solutions LLP</span>
          </span>
        </div>
      </div>
      <AboutSection />
    </main>
  )
}
