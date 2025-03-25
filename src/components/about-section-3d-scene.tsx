'use client'

import { OrbitControls, PerspectiveCamera, useGLTF } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

gsap.registerPlugin(ScrollTrigger)

// Different position and rotation values for the about section
const BASE_POSITION = { x: 0, y: -5, z: -1 }

type Props = {
  className?: string
}

export const AboutSection3dScene = ({ className = '' }: Props) => {
  return (
    <div className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none ${className}`}>
      <Canvas>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={60} />
        <Scene />
        <OrbitControls enableZoom={false} enableRotate={false} />
      </Canvas>
    </div>
  )
}

const Scene = () => {
  const [basePosition] = useState<{ x: number; y: number; z: number }>(BASE_POSITION)
  const modelRef = useRef<THREE.Group>(null)
  const { scene } = useGLTF('/gltfs/radial-glass.gltf')
  const ScaleFactor = 0.8

  useEffect(() => {
    if (!modelRef.current) return

    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
      const scrollPercent = (scrollTop / docHeight) * 100

      gsap.to(modelRef.current?.rotation ?? '', {
        z: (modelRef.current?.rotation?.z ?? 0) + scrollPercent * 0.0005,
        duration: 2,
        ease: 'power4.out'
      })
    }

    window.addEventListener('wheel', handleScroll)
    return () => {
      window.removeEventListener('wheel', handleScroll)
    }
  }, [])

  const model = scene.clone()

  return <primitive object={model} ref={modelRef} scale={ScaleFactor} position={[basePosition.x, basePosition.y, basePosition.z]} />
}
