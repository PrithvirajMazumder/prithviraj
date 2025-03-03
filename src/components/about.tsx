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
  const aboutRef = useRef<HTMLHeadingElement>(null)

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
          opacity: 0.3,
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
      <h1 ref={aboutRef} className="font-black text-start text-foreground text-[7svh] absolute left-0 leading-none mt-[8rem]">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aspernatur, a nemo! Eius rerum
      </h1>
    </div>
  )
}
