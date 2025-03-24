import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef } from 'react'

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
    },
    { scope: containerRef }
  )

  return (
    <div ref={containerRef} className="flex flex-col items-center justify-center w-full h-svh relative overflow-x-hidden">
      <div className="bg-background h-12 w-12 rounded-full bottom-0 left-1/2 -translate-x-1/2 absolute about-accent-background" />
    </div>
  )
}
