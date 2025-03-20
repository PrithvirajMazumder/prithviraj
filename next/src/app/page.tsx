'use client'
import gsap from 'gsap'
import { Cursor } from '@/components/cursor'
import { InitialLoader } from '@/components/initial-loader'
import { NameIntro } from '@/components/name-intro'
import ReactLenis, { LenisRef } from 'lenis/react'
import { useEffect, useRef, useState } from 'react'

export default function Home() {
  const [loadComplete, setLoadComplete] = useState(false)
  const lenisRef = useRef<LenisRef>(null)

  useEffect(() => {
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000)
    }

    gsap.ticker.add(update)

    return () => gsap.ticker.remove(update)
  }, [])

  return (
    <>
      <Cursor isLoading={!loadComplete} />
      <ReactLenis root options={{ autoRaf: true }} ref={lenisRef}>
        {loadComplete && <NameIntro />}
        {!loadComplete && <InitialLoader onLoadComplete={() => setLoadComplete(true)} />}
      </ReactLenis>
    </>
  )
}
