import { WorkSection3dScene } from '@/components/work-section-3d-scene'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

const works = ['Project One', 'Project Two', 'Project Three', 'Project Four']

export const WorkSection = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<Array<HTMLDivElement | null>>([])

  useGSAP(
    () => {
      if (!containerRef.current) return


      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top', // When top of trigger hits top of viewport
          end: 'bottom top', // End when bottom of section reaches top of viewport
          pin: true, // Pin the section during scroll
          pinSpacing: false, // Prevent adding extra space
          scrub: 4, // Smoother scrubbing with less delay
          invalidateOnRefresh: true // Recalculate on resize
        }
      })

      // Initial Animations with more controlled timing
      tl.fromTo(
        '.about-accent-background',
        { scale: 0 },
        {
          scale: 80,
          duration: 1,
          ease: 'power4.out'
        }
      )
        .fromTo(
          '.about-accent-3d-scene',
          { y: '100%' },
          {
            y: 0,
            duration: 1,
            ease: 'power4.out'
          },
          0
        ) // Simultaneous start
        .fromTo(
          '.work-label',
          { opacity: 0, x: 100 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: 'power4.out'
          },
          0.5
        ) // Slightly delayed start
        .to('.work-label', {
          opacity: 0,
          duration: 0.5,
          ease: 'power4.out'
        })

      // Carousel Animation with improved control and increased delay between items
      itemsRef.current.forEach((item, index) => {
        if (item) {
          tl.fromTo(
            item,
            {
              x: '200%',
            },
            {
              x: '0%',
              duration: 1,
              ease: 'power4.out'
            },
            1 + index * 3.3 // Increased delay between animations for more distinct separation
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
      <div className="absolute inset-0 flex items-center justify-center">
        {works.map((work, index) => (
          <div
            key={index}
            ref={(el) => {
              if (el) itemsRef.current[index] = el
            }}
            className="absolute top-1/2 -translate-y-1/2 w-[60%] h-[40%] bg-gray-800 text-white flex items-center justify-center text-3xl font-bold shadow-lg"
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
