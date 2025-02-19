'use client'
import { useBreakpoint } from '@/hooks/use-breakpoint'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

const Name = 'Prithviraj'

type Props = {
  onAnimationComplete?: () => void
}
export const NameIntro = (props: Props) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const textContainerRef = useRef<HTMLDivElement>(null)
  const heroTextRef = useRef<HTMLHeadingElement>(null)
  const accentBackdropRef = useRef<HTMLDivElement>(null)
  const [scaleFactor, setScaleFactor] = useState(1)
  const [heroTextHeight, setHeroTextHeight] = useState(0)
  const [heroWidth, setHeroWidth] = useState<number>(0)
  const [fontSize, setFontSize] = useState('9rem')
  const { isSmaller } = useBreakpoint()

  useGSAP(
    () => {
      const tl = gsap.timeline()

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
          ease: 'power3.inOut',
          onComplete: props.onAnimationComplete && props.onAnimationComplete
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
          ease: 'power3.out'
        })
        .fromTo(
          accentBackdropRef.current,
          {
            top: -(window.innerHeight * 2)
          },
          {
            delay: -1,
            top: -(window.innerHeight * (isSmaller('sm') ? 1.65 : isSmaller('md') ? 1.55 : 1.5)),
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
            delay: -1,
            yPercent: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.1,
            ease: 'power3.out'
          }
        )

      if (window.innerWidth < 768) {
        mobileTl.to(heroTextRef.current, {
          delay: -2,
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
        className="accent-backdrop fixed left-1/2  -translate-x-1/2 w-[calc(100svh*2)] h-[calc(100svh*2)] rounded-full z-10 bg-foreground"
      />
      <div
        ref={containerRef}
        className="w-svh h-svh flex justify-center relative bg-background overflow-y-hidden z-20 backdrop-blur-[7rem] md:backdrop-blur-[20rem] backdrop-saturate-2000"
      >
        <div className="absolute bg-foreground w-full h-full bottom-0 left-0 backdrop" />
        {/* NAVBAR */}

        <div className="flex fixed top-4 md:hidden px-4 py-2 left-1/2 -translate-x-1/2 w-[calc(100svw-2rem)] justify-between gap-4 items-center mobile-nav">
          <Link className="text-background text-xl font-bold italic overflow-hidden font" href="/">
            <span className="nav-item inline-block">Logo</span>
          </Link>
          <button className="flex flex-col gap-2 justify-center items-center w-6 h-6 nav-item">
            <span className="w-full h-[2px] bg-background rounded-full" />
            <span className="w-full h-[2px] bg-background rounded-full" />
          </button>
        </div>
        <div className="hidden fixed top-0 left-1/2 -translate-x-1/2 py-8 z-50 md:flex justify-between gap-12" style={{ width: heroWidth }}>
          <Link className="text-background text-2xl overflow-hidden" href="/">
            <span className="nav-item inline-block">Portfolio</span>
          </Link>
          <Link className="text-background text-2xl overflow-hidden" href="/">
            <span className="nav-item inline-block">About</span>
          </Link>
          <Link className="text-background text-4xl font-bold italic overflow-hidden font" href="/">
            <span className="nav-item inline-block">Prithvi</span>
          </Link>
          <Link className="text-background text-2xl overflow-hidden" href="/">
            <span className="nav-item inline-block">Contact</span>
          </Link>
          <Link className="text-background text-2xl overflow-hidden" href="#">
            <span className="nav-item inline-block">Blogs</span>
          </Link>
        </div>
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
              className="text-center md:text-start text-xl md:text-5xl text-gray-600 font-medium subtitle w-full  md:w-2/3 text-wrap md:ml-4 absolute left-1/2 md:left-0 -translate-x-1/2 md:translate-x-0"
              style={{
                bottom: heroTextHeight + (isSmaller('md') ? 184 : 24)
              }}
            >
              Designing & building digital experiences—Frontend developer from Kolkata (City of Joy).
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
    </>
  )
}
