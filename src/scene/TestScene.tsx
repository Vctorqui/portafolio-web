import { useRef, useState, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

function MorphingBox(props: any) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef()
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false)

  // Create the geometry with morph targets
  const geom = useMemo(() => {
    const geometry = new THREE.BoxGeometry(2, 2, 2, 32, 32, 32)

    // Create the morph target for twisting
    const positionAttribute = geometry.attributes.position
    const twistAmount = Math.PI / 2.5 // 45 degrees twist

    const morphPositions = new Float32Array(positionAttribute.count * 3)
    for (let i = 0; i < positionAttribute.count; i++) {
      const x = positionAttribute.getX(i)
      const y = positionAttribute.getY(i)
      const z = positionAttribute.getZ(i)

      // Apply twist
      const angle = twistAmount * y // Twist more at the top
      const sinAngle = Math.sin(angle)
      const cosAngle = Math.cos(angle)

      morphPositions[i * 3] = x * cosAngle - z * sinAngle
      morphPositions[i * 3 + 1] = y
      morphPositions[i * 3 + 2] = x * sinAngle + z * cosAngle
    }

    geometry.morphAttributes.position = [
      new THREE.BufferAttribute(morphPositions, 3),
    ]

    return geometry
  }, [])

  // Subscribe this component to the render-loop, rotate the mesh every frame
  // useFrame((state, delta) => {
  //   ref.current.rotation.x += delta
  //   ref.current.rotation.y += delta
  //   ref.current.rotation.z += delta
  // })

  // Return the view
  return (
    <mesh
      {...props}
      ref={ref}
      geometry={geom}
      // onPointerOver={(event) => (event.stopPropagation(), hover(true))}
      onPointerOut={(event) => hover(false)}
      morphTargetInfluences={[hovered ? 1 : 1]}
    >
      <meshStandardMaterial
        // color={hovered ? 'hotpink' : 'orange'}
        color={'#1cc3e2'}
        morphTargets
      />
    </mesh>
  )
}

export default function TestScene() {
  return (
    <>
      <ambientLight intensity={Math.PI / 2} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        decay={0}
        intensity={Math.PI}
      />
      <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
      <MorphingBox position={[-0.2, 0, 1.9]} />
      <OrbitControls enableZoom={false} />
    </>
  )
}
