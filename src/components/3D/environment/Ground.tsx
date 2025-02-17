import React from 'react';
import {usePlane} from '@react-three/cannon'
import { useLoader } from '@react-three/fiber';
import { RepeatWrapping, TextureLoader } from 'three';
const Ground:React.FC = () => {
    const [ref] = usePlane(()=>({
        rotation: [-Math.PI/2,0,0],
        position: [0,-1.5,0]
    }))

    const texture = useLoader(TextureLoader, 'textures/groundTexture.jpg')
    texture.wrapS = texture.wrapT = RepeatWrapping;
    texture.repeat.set(20,20)

    return (
        <mesh ref={ref}>
            <circleGeometry args={[70,64]} />
            <meshStandardMaterial map={texture}/>
        </mesh>
    );
};

export default Ground;