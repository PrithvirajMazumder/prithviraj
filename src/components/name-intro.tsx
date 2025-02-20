'use client'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

const Name = 'Prithvi Raj'

type Props = {
  onAnimationComplete?: () => void
}
export const NameIntro = (props: Props) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const textContainerRef = useRef<HTMLDivElement>(null)
  const heroTextRef = useRef<HTMLHeadingElement>(null)
  const accentBackdropRef = useRef<HTMLDivElement>(null)
  const [scaleFactor, setScaleFactor] = useState(1)
  const [heroWidth, setHeroWidth] = useState<number>(0)
  const [fontSize, setFontSize] = useState('9rem')

  useGSAP(
    () => {
      const tl = gsap.timeline()

      tl.fromTo(
        '.letter',
        {
          scaleY: 0,
          transformOrigin: 'top'
        },
        {
          scaleY: scaleFactor,
          duration: 0.5,
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
          duration: 0.4,
          ease: 'power3.inOut',
          stagger: 0.03
        })
        .to('.backdrop', {
          delay: -0.8,
          transformOrigin: 'bottom',
          height: 0,
          duration: 0.8,
          ease: 'power3.inOut',
          onComplete: props.onAnimationComplete && props.onAnimationComplete
        })
        .fromTo(
          '.nav-item',
          {
            yPercent: -100,
            opacity: 0
          },
          {
            delay: -0.5,
            yPercent: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out'
          }
        )
        .fromTo(
          '.subtitle',
          {
            yPercent: -100,
            opacity: 0,
            height: 0
          },
          {
            delay: -1.2,
            height: 'max-content',
            yPercent: 0,
            opacity: 1,
            duration: 0.8,
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
            top: -(window.innerHeight * 1.55),
            opacity: 0
          },
          {
            delay: -1,
            top: -(window.innerHeight * 1.5),
            opacity: 1,
            duration: 1,
            ease: 'power3.out'
          }
        )
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

      const widthBasedSize = Math.floor(viewportWidth / (totalCharacters * 0.35))
      const heightBasedSize = Math.floor(viewportHeight * 0.2)

      const finalSize = Math.min(widthBasedSize, heightBasedSize)

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

    updateHeroWidth()
    window.addEventListener('resize', updateHeroWidth)
    return () => window.removeEventListener('resize', updateHeroWidth)
  }, [fontSize])

  return (
    <>
      <div
        ref={accentBackdropRef}
        className="accent-backdrop fixed left-1/2  -translate-x-1/2 w-[calc(100svh*2)] h-[calc(100svh*2)] rounded-full z-10 bg-blue-800"
      />
      <div
        ref={containerRef}
        className="w-svh h-svh flex justify-center relative bg-background overflow-y-hidden z-20 backdrop-blur-[20rem] backdrop-saturate-2000"
      >
        <div
          className="fixed top-0 left-1/2 -translate-x-1/2 py-8 z-50 flex justify-between gap-12 mix-blend-difference"
          style={{ width: heroWidth }}
        >
          <Link className="text-background text-lg overflow-hidden" href="/">
            <span className="nav-item inline-block">Portfolio</span>
          </Link>
          <Link className="text-background text-lg overflow-hidden" href="/">
            <span className="nav-item inline-block">About</span>
          </Link>
          <Link className="text-background text-2xl font-bold italic overflow-hidden font" href="/">
            <span className="nav-item inline-block">Prithvi</span>
          </Link>
          <Link className="text-background text-lg overflow-hidden" href="/">
            <span className="nav-item inline-block">Contact</span>
          </Link>
          <Link className="text-background text-lg overflow-hidden" href="#">
            <span className="nav-item inline-block">2025</span>
          </Link>
        </div>
        <div className="absolute bg-foreground w-full h-full bottom-0 left-0 backdrop" />
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
            <h3 className="text-3xl text-gray-600 subtitle w-2/3 text-wrap ml-4 absolute -top-24 left-0">
              I am just and ordinary frontend developer and designer from Kolkata (City of Joy), India
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
