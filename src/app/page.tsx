'use client'
import { Cursor } from '@/components/cursor'
import { WorkSection } from '@/components/sections/work-section'
import { LandingSection } from '@/components/sections/landing-section'
import gsap from 'gsap'
import ReactLenis, { LenisRef } from 'lenis/react'
import { useEffect, useRef } from 'react'

export default function App() {
  const lenisRef = useRef<LenisRef>(null)

  useEffect(() => {
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000)
    }

    gsap.ticker.add(update)

    return () => gsap.ticker.remove(update)
  }, [])

  return (
    <ReactLenis root options={{ autoRaf: true }} ref={lenisRef}>
      <Cursor />
      <LandingSection />
      <WorkSection />
    </ReactLenis>
  )
}
