'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, useTexture } from '@react-three/drei'
import { useRef, useState } from 'react'
import * as THREE from 'three'

type ThreeGlobeProps = {
  className?: string
  autoRotate?: boolean
  interactive?: boolean
}

const ThreeGlobe = ({ 
  className = '', 
  autoRotate = true,
  interactive = true 
}: ThreeGlobeProps) => {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas dpr={[1, 2]} shadows>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <Globe autoRotate={autoRotate} />
        {interactive && <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={Math.PI / 2.5} maxPolarAngle={Math.PI / 1.5} />}
      </Canvas>
    </div>
  )
}

type GlobeProps = {
  autoRotate?: boolean
}

const Globe = ({ autoRotate = true }: GlobeProps) => {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  
  // Load texture
  const texture = useTexture('/globe.svg')
  
  useFrame((_, delta) => {
    if (autoRotate && meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2
    }
  })

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <sphereGeometry args={[1.5, 64, 64]} />
      <meshStandardMaterial 
        map={texture} 
        emissive={hovered ? new THREE.Color(0x6366f1) : new THREE.Color(0x000000)}
        emissiveIntensity={0.5}
        metalness={0.2}
        roughness={0.7}
      />
    </mesh>
  )
}

export default ThreeGlobe