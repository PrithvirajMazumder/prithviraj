'use client'

import { useGSAP } from '@gsap/react'
import { OrbitControls, PerspectiveCamera, useGLTF } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

gsap.registerPlugin(ScrollTrigger)

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
  const modelRef = useRef<THREE.Group>(null)
  const { scene } = useGLTF('/gltfs/radial-glass.gltf')
  const ScaleFactor = 2.25

  // Store the base rotation and position values
  const baseRotation = useRef({ x: -0.25, y: 0.65, z: 0 })
  const basePosition = useRef({ x: 2.75, y: 0, z: -1 })

  // Set initial rotation and handle z-axis rotation animation using useGSAP
  useGSAP(() => {
    if (!modelRef.current) return

    // Set initial rotation
    modelRef.current.rotation.y = baseRotation.current.y
    modelRef.current.rotation.x = baseRotation.current.x
    modelRef.current.position.x = basePosition.current.x

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
          modelRef.current.rotation.y = baseRotation.current.y
          modelRef.current.rotation.x = baseRotation.current.x
          modelRef.current.position.x = basePosition.current.x
        }
      }
    })
  }, [])

  // Apply parallax effect based on mouse position
  useEffect(() => {
    if (!modelRef.current) return

    const handleMouseMove = (event: MouseEvent) => {
      const { innerWidth, innerHeight } = window
      const x = basePosition.current.x + (event.clientX / innerWidth - 0.5) * 0.2 // Subtle movement
      const y = basePosition.current.y - (event.clientY / innerHeight - 0.5) * 0.2

      gsap.to(modelRef.current?.position ?? '', {
        x,
        y,
        duration: 0.5,
        ease: 'power2.out'
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const model = scene.clone()

  return <primitive object={model} ref={modelRef} scale={ScaleFactor} position={[0, 0, -1]} />
}

export default ThreeScene
