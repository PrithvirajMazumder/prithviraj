import { WorkSection3dScene } from '@/components/work-section-3d-scene'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef } from 'react'

const works = ['Project One', 'Project Two', 'Project Three', 'Project Four']

export const WorkSection = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<Array<HTMLDivElement | null>>([])
  const carouselContainerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!containerRef.current || !carouselContainerRef.current) return

      // Destroy existing ScrollTriggers to prevent multiple instances
      ScrollTrigger.refresh()

      const totalProjects = works.length
      const projectHeight = window.innerHeight // Each project takes full viewport height

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: () => `+=${projectHeight * totalProjects}px`, // Explicit scroll end calculation
          pin: true,
          pinSpacing: true, // Allow proper scrolling space
          scrub: 1, // Smooth scrolling
          invalidateOnRefresh: true
        }
      })

      // Background accent scale animation
      tl.fromTo(
        '.about-accent-background',
        { scale: 0 },
        {
          scale: 80,
          duration: 1,
          ease: 'power4.out'
        }
      )

      // 3D Scene entrance animation
      tl.fromTo(
        '.about-accent-3d-scene',
        { y: '100%' },
        {
          y: 0,
          duration: 1,
          ease: 'power4.out'
        },
        0
      )

      // Work label animation
      tl.fromTo(
        '.work-label',
        { opacity: 0, x: 100 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power4.out'
        },
        0.5
      ).to('.work-label', {
        opacity: 0,
        duration: 0.5,
        ease: 'power4.out'
      })

      // Project reveal and transition animations
      itemsRef.current.forEach((item, index) => {
        if (item) {
          // Entrance animation for each project
          tl.fromTo(
            item,
            {
              x: '200%',
              scale: 0.5
            },
            {
              x: '0%',
              scale: 1,
              duration: 1,
              ease: 'power4.out'
            },
            1 + index * 1 // Staggered entrance
          )

            // Exit animation for each project
            .to(
              item,
              {
                x: '-200%',
                scale: 0.8,
                duration: 1,
                ease: 'power4.out'
              },
              2 + index * 1 // Staggered exit
            )
        }
      })
    },
    { scope: containerRef }
  )

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden">
      {/* Background Accent */}
      <div className="bg-background z-10 h-12 w-12 rounded-full absolute bottom-0 left-1/2 -translate-x-1/2 about-accent-background" />

      {/* Carousel Wrapper */}
      <div ref={carouselContainerRef} className="absolute inset-0 flex items-center justify-center">
        {works.map((work, index) => (
          <div
            key={index}
            ref={(el) => {
              if (el) itemsRef.current[index] = el
            }}
            className="absolute top-[20%] -translate-y-[-20%] w-[60%] h-[40%] bg-gray-800 text-white flex items-center justify-center text-3xl font-bold shadow-lg"
            style={{ zIndex: 50 + index }}
          >
            {work}
          </div>
        ))}
      </div>

      {/* Work Label */}
      <div
        className="absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-max overflow-x-hidden"
        style={{
          maskImage: 'linear-gradient(to right, transparent 15%, black 45%, black 55%, transparent 85%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 15%, black 45%, black 55%, transparent 85%)'
        }}
      >
        <h1 className="text-7xl md:text-[8svh] font-le-murmure text-foreground work-label">Work • Work • Work • Work • Work • Work • Work</h1>
      </div>

      {/* 3D Scene */}
      <WorkSection3dScene className="opacity-[0.06] z-20 absolute inset-0 about-accent-3d-scene" />
    </div>
  )
}
