import { Plane, useGLTF, useTexture } from '@react-three/drei';
import React from 'react';
import { RepeatWrapping } from 'three';

const BorderWall: React.FC = () => {
    const {scene} = useGLTF('/models/round.glb')

    return (
        <primitive object={scene} position = {[0,-1.4,0]} scale = {[1,1,1]}/>
    );
};

export default BorderWall;
