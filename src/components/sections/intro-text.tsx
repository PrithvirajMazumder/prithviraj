'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const IntroText = () => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const textRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!containerRef.current || !textRef.current) return

    const lines = gsap.utils.toArray('.line')

    gsap
      .timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top', // ✅ Adjusted start position for smoother transition
          end: '+=100%', // Increased from 100% to 200% to make the animation last longer during scroll
          scrub: true,
          pin: true,
          pinSpacing: true, // ✅ Allow pinning to function correctly here
          anticipatePin: 1
        }
      })
      .fromTo(lines, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1.2, stagger: 0.7, ease: 'power4.out' })
      // Add a delay to keep text visible before fading out
      .to(lines, { opacity: 1, duration: 5, ease: 'none' }) // Increased from 3 to 5 for longer visibility
      .fromTo(lines, { opacity: 1 }, {opacity: 0, duration: 1.2, stagger: 0.3, ease: 'power4.out'})
  }, [])

  return (
    <main ref={containerRef} className="h-screen flex items-center justify-center text-background">
      <div ref={textRef} className="text-4xl text-center leading-[1.2] ">
        <p className="line">I craft seamless web experiences for you,</p>
        <p className="line">from scalable solutions to stunning interfaces.</p>
        <p className="line">Whatever you need, I bring it to life.</p>
      </div>
    </main>
  )
}
