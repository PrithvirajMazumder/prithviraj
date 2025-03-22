'use client'

import { useGSAP } from '@gsap/react'
import { OrbitControls, PerspectiveCamera, useGLTF } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

gsap.registerPlugin(ScrollTrigger)
const BASE_ROTATION = { x: -0.25, y: 0.65, z: Math.PI }
const BASE_POSITION = { x: 2.75, y: 0, z: -1 }

type ThreeSceneProps = {
  className?: string
}

const ThreeScene = ({ className = '' }: ThreeSceneProps) => {
  return (
    <div className={`fixed inset-0 w-screen h-screen overflow-hidden ${className}`}>
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
  const [baseRotation] = useState<{ x: number; y: number; z: number }>(BASE_ROTATION)
  const [basePosition] = useState<{ x: number; y: number; z: number }>(BASE_POSITION)
  const currentPosition = useRef({ x: BASE_POSITION.x, y: BASE_POSITION.y, z: BASE_POSITION.z })
  const modelRef = useRef<THREE.Group>(null)
  const { scene } = useGLTF('/gltfs/radial-glass.gltf')
  const ScaleFactor = 2.25

  useGSAP(() => {
    if (!modelRef.current) return

    // Set initial rotation
    modelRef.current.rotation.y = baseRotation.y
    modelRef.current.rotation.x = baseRotation.x
    modelRef.current.position.x = basePosition.x

    // Create z-axis rotation animation that stops with easing
    const rotationTl = gsap.timeline()

    rotationTl.fromTo(modelRef.current.rotation, { opacity: 0 }, { opacity: 1, duration: 3, ease: 'power3.out' }).to(modelRef.current.rotation, {
      delay: -3.5,
      z: Math.PI,
      duration: 4,
      ease: 'back.out(0.2)',
      repeat: 0,
      onComplete: () => {
        if (modelRef.current) {
          modelRef.current.rotation.y = baseRotation.y
          modelRef.current.rotation.x = baseRotation.x
          modelRef.current.position.x = basePosition.x
        }
      }
    })
  }, [])

  useEffect(() => {
    if (!modelRef.current) return

    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
      const scrollPercent = (scrollTop / docHeight) * 100

      currentPosition.current = {
        x: BASE_POSITION.x - scrollPercent * 0.07,
        y: BASE_POSITION.y - scrollPercent * 0.1,
        z: BASE_POSITION.z
      }
      gsap.to(modelRef.current?.position ?? '', {
        y: BASE_POSITION.y - scrollPercent * 0.1,
        x: BASE_POSITION.x - scrollPercent * 0.07,
        duration: 0.5,
        ease: 'power2.out'
      })
      gsap.to(modelRef.current?.rotation ?? '', {
        y: BASE_ROTATION.y - scrollPercent * 0.005,
        z: BASE_ROTATION.z + scrollPercent * 0.005,
        duration: 0.5,
        ease: 'power2.out'
      })
    }

    const handleMouseMove = (event: MouseEvent) => {
      const { innerWidth, innerHeight } = window
      const x = (currentPosition.current?.x ?? 0) + (event.clientX / innerWidth - 0.5) * 0.2 // Subtle movement
      const y = (currentPosition.current?.y ?? 0) - (event.clientY / innerHeight - 0.5) * 0.2

      gsap.to(modelRef.current?.position ?? '', {
        x,
        y,
        duration: 0.5,
        ease: 'power2.out'
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('wheel', handleScroll)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('wheel', handleScroll)
    }
  }, [])

  const model = scene.clone()

  return <primitive object={model} ref={modelRef} scale={ScaleFactor} position={[0, 0, -1]} />
}

export default ThreeScene
