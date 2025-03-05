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
          top: 100
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
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 40%',
              end: 'top 0%',
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
      <div ref={aboutRef} className="font-black text-start text-foreground text-[6svh] absolute left-0 leading-tight mt-[8rem]">
        {"I'm a full-stack software consultant who thrives on building scalable, high-performance applications. Blending logic with craftsmanship, I create systems that are not only efficient and resilient but also deliver seamless and intuitive user experiences.".split(' ').map((word, index) => (
          <span key={`word-${index}`} className="word inline-block mr-2 opacity-30">
            {word}
          </span>
        ))}
      </div>
    </div>
  )
}
