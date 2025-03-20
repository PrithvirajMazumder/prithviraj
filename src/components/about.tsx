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
  const careerTimelineRef = useRef<HTMLDivElement>(null)

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
            scrub: 1
          }
        }
      )

      gsap.fromTo(
        aboutRef.current,
        {
          opacity: 0,
          x: -100
        },
        {
          opacity: 1,
          x: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 50%',
            end: 'top 40%',
            scrub: 1
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
              scrub: 1
            }
          }
        )

        // Create a timeline for sequential animations
        const timelineTl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top -10%',
            end: 'top -80%',
            scrub: 1
          }
        })

        // First animation: top line
        timelineTl
          .fromTo('.first-timeline-top-line', { height: 0 }, { height: '10rem', ease: 'none' })
          .fromTo('.first-timeline-top-border', { width: 0 }, { width: '50%', ease: 'none' })
          .fromTo('.first-timeline-left-border', { height: 0 }, { height: 'calc(100% - 10rem)', ease: 'none' })
          .fromTo('.first-timeline-bottom-border', { width: 0 }, { width: '100%', ease: 'none' })
      }
    },
    { scope: containerRef }
  )

  return (
    <div ref={containerRef} className="h-max">
      <div
        className="h-max relative mx-auto pt-[8rem]"
        style={{
          width: props.width ?? 0
        }}
      >
        <h1 ref={textRef} className="font-black text-start text-foreground text-[11svh] absolute left-0">
          Mazumder
        </h1>
        <div ref={aboutRef} className="font-black text-start text-foreground text-[6svh]  leading-tight">
          {'A full-stack software consultant who thrives on building scalable, high-performance applications. Blending logic with craftsmanship, I create systems that are not only efficient and resilient but also deliver seamless and intuitive user experiences.'
            .split(' ')
            .map((word, index) => (
              <span key={`word-${index}`} className="word inline-block mr-2 opacity-30">
                {word}
              </span>
            ))}
        </div>
      </div>
      <div className="career-timeline w-full flex flex-col items-center mt-32 pb-52 container mx-auto" ref={careerTimelineRef}>
        <div className="timeline-first relative w-full h-max">
          <div className="w-full h-max mt-[10rem] relative flex">
            <div className="flex-1 flex flex-col gap-4 p-32 justify-center">
              <p className="text-foreground font-semibold text-3xl leading-3">Consilious Software Consulting LLP.</p>
              <p className="text-foreground opacity-50 text-lg leading-3">Full-Stack Developer</p>
              <p className="text-foreground text-md w-72">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laboriosam, quam. Delectus suscipit in alias nisi ipsum dicta, minima esse
                quis nihil, quasi, nobis aliquam quibusdam sint numquam sunt tenetur eum. Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Similique deserunt at fugiat doloremque accusantium molestias in voluptates blanditiis, soluta id dolor rerum perspiciatis pariatur
                dicta possimus sed quisquam saepe labore.
              </p>
              <div></div>
            </div>
            <div className="flex-1">

            </div>
          </div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 flex justify-center">
            <div className="w-[5px] bg-foreground first-timeline-top-line" />
          </div>
          <div className="absolute top-[calc(10rem-5px)] right-1/2 h-[5px] bg-foreground first-timeline-top-border" />
          <div className="absolute top-[calc(10rem-5px)] left-0 w-[5px] bg-foreground first-timeline-left-border" />
          <div className="absolute bottom-0 left-0 h-[5px] bg-foreground first-timeline-bottom-border" />
        </div>
      </div>
    </div>
  )
}
