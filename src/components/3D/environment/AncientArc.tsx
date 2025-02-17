import { useGLTF } from '@react-three/drei';
import React from 'react';

const AncientArc: React.FC = () => {

    const {scene} = useGLTF('/models/ancient_ruins_arc.glb');

    return (
        <primitive object={scene} position={[0.3, 0.1, -15]} scale={[3, 3, 3]} rotation={[0, Math.PI / 2, 0]}/>
    );
};

export default AncientArc;