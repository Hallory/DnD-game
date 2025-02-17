import { useCylinder } from '@react-three/cannon';
import React from 'react';

interface BoundaryProps {
    position: [number, number, number];
    radius: number;
    height: number;
}
const Boundary: React.FC<BoundaryProps> = ({ position, radius, height }) => {
    const [ref] = useCylinder(() => ({
        args: [radius, radius, height, 32],
        position: position,
        type: 'Static',
        collisionFilterGroup: 1,
        collisionFilterMask: 1,
        material: { friction: 1, restitution: 0 } 
    }));

    return (
        <mesh ref={ref} position={position}>
            <cylinderGeometry args={[radius, radius, height, 32]} />
            <meshStandardMaterial color="red" transparent opacity={0} />
        </mesh>
    );
};

export default Boundary;
