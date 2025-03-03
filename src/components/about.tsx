'use client'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

type Props = {
  width: number
}
export const About = (props: Props) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLHeadingElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.fromTo(
        textRef.current,
        {
          top: 200
        },
        {
          top: -60,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 99%',
            end: 'top 60%',
            scrub: 1,
            markers: false
          }
        }
      )

      gsap.fromTo(
        aboutRef.current,
        {
          opacity: 0
        },
        {
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 50%',
            end: 'top 40%',
            scrub: 1,
            markers: false
          }
        }
      )

      // After initial animation, animate each word
      const words = aboutRef.current?.querySelectorAll('.word')
      if (words) {
        gsap.fromTo(
          words,
          { opacity: 0.3 },
          {
            opacity: 1,
            stagger: 0.2,
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 40%',
              end: 'top 5%',
              scrub: 1,
              markers: false
            }
          }
        )
      }
    },
    { scope: containerRef }
  )

  return (
    <div
      ref={containerRef}
      className="h-screen relative mx-auto"
      style={{
        width: props.width ?? 0
      }}
    >
      <h1 ref={textRef} className="font-black text-start text-foreground text-[11svh] absolute left-0">
        Mazumder
      </h1>
      <div ref={aboutRef} className="font-black text-start text-foreground text-[7svh] absolute left-0 leading-none mt-[8rem]">
        {'is a full stack software engineer who is more inclined towards creating beautiful, scalable and easy to use user experience.'.split(' ').map((word, index) => (
          <span key={`word-${index}`} className="word inline-block mr-2 opacity-30">
            {word}
          </span>
        ))}
      </div>
    </div>
  )
}
