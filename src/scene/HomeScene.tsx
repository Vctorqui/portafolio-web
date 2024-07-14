import {
  OrbitControls,
  Environment,
  MeshWobbleMaterial,
} from '@react-three/drei'
import React from 'react'


const HomeScene = ({ animationSpeed, animationFactor , color}: any) => {
  return (
    <>
      <OrbitControls enableZoom={false} />
      <Environment preset='sunset' />
      <ambientLight />
      <mesh>
        <boxGeometry args={[2, 1.5, 1.2]} morphTargetsRelative={true} />
        <MeshWobbleMaterial
          depthTest={true}
          color={color}
          depthWrite={true}
          speed={animationSpeed}
          factor={animationFactor}
          envMapIntensity={1}
          roughness={1}
          metalness={1}
        />
      </mesh>
    </>
  )
}

export default HomeScene






