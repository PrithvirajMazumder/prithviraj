import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef } from 'react'
import { AboutSection3dScene } from '../about-section-3d-scene'

gsap.registerPlugin(ScrollTrigger)

export const AboutSection = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=100%',
          scrub: true,
          pin: true,
          pinSpacing: false,
          anticipatePin: 1
        }
      })

      tl.fromTo(
        '.about-accent-background',
        {
          scale: 0
        },
        {
          delay: 1.5,
          scale: 80,
          duration: 15,
          ease: 'power4.out'
        }
      )
        .fromTo(
          '.about-accent-3d-scene',
          {
            y: '100%'
          },
          {
            delay: -16,
            y: 0,
            duration: 10,
            ease: 'power4.out'
          }
        )
        .fromTo(
          '.work-label',
          {
            opacity: '0'
          },
          {
            delay: -10,
            opacity: '1',
            duration: 10,
            ease: 'power4.out'
          }
        )
        .fromTo(
          '.work-label',
          {
            x: 100
          },
          {
            x: 0,
            delay: -10,
            duration: 10,
            ease: 'power4.out'
          }
        )
        .fromTo(
          '.work-label',
          {
            opacity: 1
          },
          {
            opacity: 0,
            delay: -5,
            duration: 10,
            ease: 'power4.out'
          }
        )
    },
    { scope: containerRef }
  )

  return (
    <div ref={containerRef} className="flex flex-col items-center justify-center w-full h-svh relative overflow-x-hidden">
      <div className="bg-background z-10  h-12 w-12 rounded-full bottom-0 left-1/2 -translate-x-1/2 absolute about-accent-background" />
      <div
        className="absolute z-20 top-[40%] -translate-y-[40%] left-1/2 -translate-x-1/2 w-max overflow-x-hidden"
        style={{
          maskImage: 'linear-gradient(to right, transparent 15%, black 45%, black 55%, transparent 85%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 15%, black 45%, black 55%, transparent 85%)'
        }}
      >
        <h1 className="text-7xl md:text-[8svh] font-le-murmure text-foreground work-label">Work • Work • Work • Work • Work • Work • Work</h1>
      </div>
      <AboutSection3dScene className="opacity-[0.06] z-20 about-accent-3d-scene" />
    </div>
  )
}
