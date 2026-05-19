import React, { useMemo } from 'react'
import { useSnapshot } from 'valtio'
import { Decal , useGLTF , useTexture } from '@react-three/drei'
import state from '../store'

useGLTF.preload('/shirt_baked.glb')

const Shirt = () => {
  const snap = useSnapshot(state)
  const { nodes, materials } = useGLTF('/shirt_baked.glb')
  const logoTexture = useTexture(snap.logoDecal)
  const positionY = useMemo(() => snap.decalPosition * 0.01, [snap.decalPosition])
  const scale = useMemo(() => snap.decalSize * 0.01, [snap.decalSize])
  const logoScale = useMemo(() => {
    const width = logoTexture?.image?.width || 1
    const height = logoTexture?.image?.height || 1
    const aspect = width / height
    return [scale * aspect, scale, 1]
  }, [logoTexture, scale])

  return (
    <group>
      <mesh
        castShadow
        geometry={nodes.T_Shirt_male.geometry}
        material={materials.lambert1}
        material-roughness={1}
        dispose={null}
      >
        {snap.isLogoTexture && (
          <Decal
            position={[0, positionY, 0.15]}
            rotation={[0, 0, 0]}
            scale={logoScale}
            map={logoTexture}
            mapAnisotropy={16}
            depthTest={false}
            depthWrite={true}
          />
        )}
      </mesh>
    </group>
  )
}

export default Shirt;
