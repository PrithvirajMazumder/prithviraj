'use client'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { useRef, useState } from 'react'

const loaderLevels = [
  {
    step: 1,
    levelText: 12
  },
  {
    step: 2,
    levelText: 36
  },
  {
    step: 3,
    levelText: 45
  },
  {
    step: 4,
    levelText: 78
  },
  {
    step: 5,
    levelText: 99
  }
]

type LoaderTextProps = {
  startAnimation: boolean
  onAnimationComplete: () => void
  level: number
}
const LoaderText = (props: LoaderTextProps) => {
  const loaderContainerRef = useRef<HTMLDivElement>(null)
  const [shouldEnd, setShouldEnd] = useState(false)

  useGSAP(
    () => {
      if (props.startAnimation) {
        gsap.fromTo(
          '.loader-text',
          {
            x: -(loaderContainerRef?.current?.offsetWidth ?? 0),
            opacity: 1
          },
          {
            x: 0,
            onComplete: () => {
              setShouldEnd(true)
            }
          }
        )
        if (shouldEnd) {
          gsap.fromTo(
            '.loader-text',
            {
              x: 0
            },
            {
              x: loaderContainerRef?.current?.offsetWidth ?? 0 + 50,
              onStart: () => {
                props.onAnimationComplete()
              }
            }
          )
        }
      }
    },
    {
      scope: loaderContainerRef,
      dependencies: [props.startAnimation, shouldEnd]
    }
  )

  return (
    <div ref={loaderContainerRef} className="relative flex-1 overflow-hidden">
      <p className="loader-text text-[16rem] text-background font-bold leading-none opacity-0">{props.level}</p>
    </div>
  )
}

type InitialLoaderProps = {
  onLoadComplete: () => void
}
export const InitialLoader = (props: InitialLoaderProps) => {
  const [activeLoaderLevel, setActiveLoaderLevel] = useState(loaderLevels[0].step)

  return (
    <div className="w-svh h-svh bg-foreground relative z-40">
      <div className="absolute bottom-0 left-0 flex w-full justify-center">
        {loaderLevels.map((level) => (
          <LoaderText
            level={level.levelText}
            key={`initial-loader-${level.step}`}
            startAnimation={activeLoaderLevel === level.step}
            onAnimationComplete={() => {
              if (level.step === loaderLevels.length) {
                return setTimeout(() => {
                  props.onLoadComplete()
                }, 800)
              }
              setActiveLoaderLevel(level.step + 1)
            }}
          />
        ))}
      </div>
    </div>
  )
}
