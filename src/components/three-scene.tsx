'use client'

import { useGSAP } from '@gsap/react'
import { OrbitControls, PerspectiveCamera, useGLTF } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef, useState } from 'react'
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
  const [rotationSpeed] = useState(0.2)

  // Set initial rotation using useGSAP
  useGSAP(() => {
    if (!modelRef.current) return

    // Set initial rotation
    modelRef.current.rotation.y = 0.65
    modelRef.current.rotation.x = -0.25
    modelRef.current.position.x = 2.75
  }, [])

  // Use useFrame for continuous rotation animation instead of scroll-triggered
  useFrame((_, delta) => {
    if (modelRef.current) {
      // Continuously rotate the model on z-axis
      modelRef.current.rotation.z += delta * rotationSpeed
    }
  })

  // Clone the scene to avoid issues with multiple renders
  const model = scene.clone()

  return <primitive object={model} ref={modelRef} scale={ScaleFactor} position={[0, 0, -1]} />
}

export default ThreeScene
