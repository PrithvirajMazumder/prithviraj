'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const AboutSection = () => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const textRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!containerRef.current || !textRef.current) return

    const lines = gsap.utils.toArray('.line')

    gsap
    .timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top+=5% top', // ✅ Adjusted start position for smoother transition
        end: '+=100%',
        scrub: true,
        pin: true,
        pinSpacing: true, // ✅ Allow pinning to function correctly here
        anticipatePin: 1
      }
    })
    .fromTo(lines, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1.2, stagger: 0.5, ease: 'power4.out' })
  }, [])

  return (
    <main ref={containerRef} className="h-screen flex items-center justify-center text-background">
      <div ref={textRef} className="text-4xl font-bold text-center leading-[1.2] ">
        <p className="line">Welcome to My Website</p>
        <p className="line">Experience Smooth Animations</p>
        <p className="line">With GSAP & Three.js</p>
      </div>
    </main>
  )
}
