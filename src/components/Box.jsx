import { useFrame } from '@react-three/fiber';
import React, { useRef, useState } from 'react'

const Box = (props) => {

  const meshRef = useRef();
  const [hover, setHover] = useState(false);
  const [active, setActive] = useState(false);

  useFrame((state, delta) => 
    (meshRef.current.rotation.x += delta))

  return (
    <mesh
        {...props}
        ref={meshRef}
        scale={active ? 1.5 : 1}
        onClick={(event) => setActive(!active)}
        onPointerOver={(event) => setHover(true)}
        onPointerOut={(event) => setHover(false)}>
            
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={hover ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

export default Box