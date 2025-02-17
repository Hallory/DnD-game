import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { PerspectiveCamera } from "three";
import * as THREE from "three";

type ThirdPersonCameraProps = {
  target: React.RefObject<THREE.Group | null>;
};

const ThirdPersonCamera = ({ target }: ThirdPersonCameraProps) => {
  const cameraRef = useRef<PerspectiveCamera | null>(null);
  const { camera } = useThree();
  useFrame(() => {
    if (!target.current || !camera) return;

    const playerPosition = target.current.position;

    const offset = new THREE.Vector3(0, 5, 5); 
    const targetPosition = playerPosition.clone().add(offset);

    camera.position.lerp(targetPosition, 0.08);

    const lookAtPosition = playerPosition.clone().add(new THREE.Vector3(0, 2, 0));
    camera.lookAt(lookAtPosition);
});


  return null;
};

export default ThirdPersonCamera;
