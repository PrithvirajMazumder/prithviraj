'use client'
import { useBreakpoint } from '@/hooks/use-breakpoint'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef, useState } from 'react'
import { Navbar } from '@/components/navbar-v1'
import { About } from './about'
import ThreeGlobe from './three-globe'

gsap.registerPlugin(ScrollTrigger)

const Name = 'Prithviraj'

export const NameIntro = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const textContainerRef = useRef<HTMLDivElement>(null)
  const heroTextRef = useRef<HTMLHeadingElement>(null)
  const accentBackdropRef = useRef<HTMLDivElement>(null)
  const [scaleFactor, setScaleFactor] = useState(1)
  const [heroTextHeight, setHeroTextHeight] = useState(0)
  const [nameIntroComplete, setNameIntroComplete] = useState(false)
  const [heroWidth, setHeroWidth] = useState<number>(0)
  const [fontSize, setFontSize] = useState('9rem')
  const { isSmaller } = useBreakpoint()

  useGSAP(
    () => {
      const tl = gsap.timeline()

      // Create scroll trigger for accent backdrop
      gsap.to(accentBackdropRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=100%',
          scrub: true
        },
        y: '-100%',
        ease: 'none'
      })
      gsap.fromTo(
        '.subtitle',
        { opacity: 1 },
        {
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: '+=20%',
            scrub: 0.5
          },
          y: '-50%',
          opacity: '0',
          ease: 'power2.in'
        }
      )

      const mobileTl = tl
        .fromTo(
          '.letter',
          {
            scaleY: 0,
            transformOrigin: 'top'
          },
          {
            scaleY: scaleFactor,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.03,
            onComplete: () => {
              textContainerRef.current?.classList.add('items-end')
              gsap.set('.letter', { transformOrigin: 'bottom' })
            }
          }
        )
        .to('.letter', {
          scaleY: 1,
          duration: 0.8,
          ease: 'power3.inOut',
          stagger: 0.03
        })
        .to('.backdrop', {
          delay: -0.8,
          transformOrigin: 'bottom',
          height: 0,
          duration: 0.6,
          ease: 'power3.inOut'
        })
        .fromTo(
          '.subtitle',
          {
            yPercent: -100,
            opacity: 0,
            height: 0
          },
          {
            delay: -0.4,
            height: 'max-content',
            yPercent: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.1,
            ease: 'power3.out'
          }
        )
        .to(containerRef.current, {
          delay: -1,
          backgroundColor: 'rgb(var(--background) / 1)',
          duration: 0,
          ease: 'power3.out'
        })
        .to('.letters-container', {
          delay: -1,
          color: 'black',
          duration: 0,
          ease: 'power3.out',
          onComplete: () => setNameIntroComplete(true)
        })
        .fromTo(
          accentBackdropRef.current,
          {
            top: -(window.innerHeight * 2)
          },
          {
            delay: -1,
            top: -(window.innerHeight * (isSmaller('sm') ? 1.65 : isSmaller('md') ? 1.55 : 1.50)),
            duration: 1.2,
            ease: 'power3.out'
          }
        )
        .fromTo(
          '.nav-item',
          {
            yPercent: -100,
            opacity: 0
          },
          {
            delay: -1.3,
            yPercent: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.1,
            ease: 'power3.out',
          }
        )

      if (window.innerWidth < 768) {
        mobileTl.to(heroTextRef.current, {
          delay: -1.94,
          paddingBottom: '6rem',
          duration: 0.8,
          ease: 'power3.out'
        })
      }
    },
    { scope: containerRef, dependencies: [scaleFactor] }
  )

  useEffect(() => {
    const letterHeight = 144
    setScaleFactor(window.innerHeight / letterHeight)
  }, [])

  useEffect(() => {
    const calculateFontSize = () => {
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight
      const totalCharacters = Name.length + 1

      // Adjust scaling factors based on screen size
      const widthScaleFactor = viewportWidth < 768 ? 0.5 : 0.35 // More aggressive scaling for mobile
      const heightScaleFactor = viewportWidth < 768 ? 0.15 : 0.2 // Slightly reduced height on mobile

      const widthBasedSize = Math.floor(viewportWidth / (totalCharacters * widthScaleFactor))
      const heightBasedSize = Math.floor(viewportHeight * heightScaleFactor)

      // Set minimum and maximum sizes
      const minSize = 32 // Minimum readable size
      const maxSize = Math.floor(viewportHeight * 0.2) // Maximum size relative to viewport height

      const calculatedSize = Math.min(widthBasedSize, heightBasedSize)
      const finalSize = Math.max(minSize, Math.min(calculatedSize, maxSize))

      setFontSize(`${finalSize}px`)
      setScaleFactor(viewportHeight / finalSize)
    }

    calculateFontSize()
    window.addEventListener('resize', calculateFontSize)
    return () => window.removeEventListener('resize', calculateFontSize)
  }, [])

  useEffect(() => {
    const updateHeroWidth = () => {
      if (heroTextRef.current) {
        setHeroWidth(heroTextRef.current.offsetWidth)
      }
    }

    const updateHeroTextHeight = () => {
      if (heroTextRef.current) {
        setHeroTextHeight(heroTextRef.current.offsetHeight)
      }
    }

    updateHeroWidth()
    updateHeroTextHeight()
    window.addEventListener('resize', updateHeroWidth)
    return () => window.removeEventListener('resize', updateHeroWidth)
  }, [fontSize])

  return (
    <>
      <div
        ref={accentBackdropRef}
        className="accent-backdrop fixed left-1/2 -translate-x-1/2 w-[calc(100svh*2)] h-[calc(100svh*2)] rounded-full z-10 bg-foreground"
      />
      <div className="absolute inset-0 z-0 opacity-70">
        <ThreeGlobe autoRotate={true} interactive={false} />
      </div>
      <div
        ref={containerRef}
        className="w-svw bg-background relative overflow-y-visible z-20 backdrop-blur-[7rem] md:backdrop-blur-[20rem] backdrop-saturate-2000"
      >
        <div className="w-svh h-svh flex justify-center relative">
          <div className="absolute bg-foreground w-svw h-full bottom-0 left-0 backdrop" />
          <Navbar heroWidth={heroWidth} />
          {/* TEXT CONTAINER */}
          <div
            ref={textContainerRef}
            className="flex justify-center items-start transition-all duration-300 mix-blend-difference"
            style={{ width: heroWidth }}
          >
            <div
              ref={heroTextRef}
              id="hero-name-text"
              className="flex flex-col whitespace-nowrap justify-end gap-8 relative overflow-y-visible"
              style={{ fontSize }}
            >
              <h3
                className="text-center md:text-start text-xl md:text-5xl text-gray-600 font-medium subtitle w-full md:w-2/3 text-wrap md:ml-4 absolute left-1/2 md:left-0 -translate-x-1/2 md:translate-x-0"
                style={{
                  bottom: heroTextHeight + (isSmaller('md') ? 184 : 24)
                }}
              >
                Designing & building digital experiences Software Consultant and Designer from Kolkata (City of Joy).
              </h3>
              <h1 className="flex text-white font-bold my-0 tracking-tight leading-none letters-container">
                {Array.from(Name).map((char, i) => (
                  <span
                    key={`name-intro-hero-letter-${char}-${i}`}
                    className="inline-block letter"
                    style={{ marginRight: char === ' ' ? '0.2em' : '0' }}
                  >
                    {char}
                  </span>
                ))}
              </h1>
            </div>
          </div>
        </div>
        {nameIntroComplete && <About  width={heroWidth}/>}
      </div>
    </>
  )
}
