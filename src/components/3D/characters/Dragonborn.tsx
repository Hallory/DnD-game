import * as THREE from "three";
import React, { useRef, useEffect, useState } from "react";
import { useFBX } from "@react-three/drei";
import { AnimationMixer, Group } from "three";
import { useFrame } from "@react-three/fiber";
import { useSphere } from "@react-three/cannon";
import ThirdPersonCamera from "../three/ThirdPersonCamera";

interface CharacterProps {
  setIsCharacterOnPlate: (value: boolean) => void;
}

const Dragonborn: React.FC<CharacterProps> = ({ setIsCharacterOnPlate }) => {
  const model = useFBX("/models/T-Pose.fbx");
  const { animations: walkAnimations } = useFBX("/animations/Female_Walk.fbx");
  const { animations: idleAnimations } = useFBX("/animations/Idle.fbx");

  const [ref, api] = useSphere(() => ({
    mass: 1,
    args: [0.5], 
    position: [0, -1.5, 0],
    type: "Dynamic",
  }));

  const modelRef = useRef<Group>(null);
  const mixerRef = useRef<AnimationMixer | null>(null);
  const walkActionRef = useRef<THREE.AnimationAction | null>(null);
  const idleActionRef = useRef<THREE.AnimationAction | null>(null);

  const activeKeys = useRef<Set<string>>(new Set());
  const [position, setPosition] = useState(new THREE.Vector3(0, -1.5, 0));

  const speed = 3;

  useEffect(() => {
    const unsubscribe = api.position.subscribe((p) => {
      setPosition(new THREE.Vector3(p[0], p[1], p[2]));
    });
    return unsubscribe;
  }, [api.position]);

  useEffect(() => {
    if (modelRef.current) {
      modelRef.current.scale.set(0.02, 0.02, 0.02);
      modelRef.current.rotation.set(0, Math.PI, 0);
    }

    if (modelRef.current && walkAnimations.length > 0 && idleAnimations.length > 0) {
      mixerRef.current = new AnimationMixer(modelRef.current);

      walkActionRef.current = mixerRef.current.clipAction(walkAnimations[0]);
      idleActionRef.current = mixerRef.current.clipAction(idleAnimations[0]);

      walkActionRef.current.loop = THREE.LoopRepeat;
      idleActionRef.current.loop = THREE.LoopRepeat;

      idleActionRef.current.play();
    }
  }, [walkAnimations, idleAnimations]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      activeKeys.current.add(event.code);
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      activeKeys.current.delete(event.code);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useFrame((_, delta) => {
    if (!modelRef.current || !mixerRef.current) return;

    let newVelocity = new THREE.Vector3(0, 0, 0);

    if (activeKeys.current.has("KeyW")) newVelocity.z -= 1;
    if (activeKeys.current.has("KeyS")) newVelocity.z += 1;
    if (activeKeys.current.has("KeyA")) newVelocity.x -= 1;
    if (activeKeys.current.has("KeyD")) newVelocity.x += 1;

    if (newVelocity.length() > 0) {
        newVelocity.normalize().multiplyScalar(speed);
    }

    api.velocity.subscribe((v) => {
        const maxSpeed = 4;
        newVelocity.x = THREE.MathUtils.clamp(v[0] + newVelocity.x * 0.5, -maxSpeed, maxSpeed);
        newVelocity.z = THREE.MathUtils.clamp(v[2] + newVelocity.z * 0.5, -maxSpeed, maxSpeed);
    });

    api.velocity.set(newVelocity.x, 0, newVelocity.z);

    api.position.subscribe((p) => {
        modelRef.current!.position.set(p[0], p[1], p[2]);
    });

    if (newVelocity.length() > 0) {
        const newRotation = new THREE.Quaternion();
        const angle = Math.atan2(newVelocity.x, newVelocity.z);

        newRotation.setFromEuler(new THREE.Euler(0, angle, 0));

        modelRef.current.quaternion.slerp(newRotation, delta * 10);
    }

    const radiusLimit = 28; 
    const currentPosition = modelRef.current.position.clone();
    const distanceFromCenter = Math.sqrt(currentPosition.x ** 2 + currentPosition.z ** 2);

    if (distanceFromCenter > radiusLimit * 0.95) {
        const angle = Math.atan2(currentPosition.z, currentPosition.x);
        api.velocity.set(-Math.cos(angle) * 1.5, 0, -Math.sin(angle) * 1.5);
    }

    mixerRef.current.update(delta);

    const isStandingStill = newVelocity.x === 0 && newVelocity.z === 0;

    if (isStandingStill) {
        if (walkActionRef.current?.isRunning()) {
            walkActionRef.current.crossFadeTo(idleActionRef.current!, 0.3, false);
            walkActionRef.current.stop();
            idleActionRef.current?.reset().play();
        }
    } else {
        if (!walkActionRef.current?.isRunning()) {
            idleActionRef.current?.crossFadeTo(walkActionRef.current!, 0.3, false);
            walkActionRef.current?.reset().play();
        }
    }
});


  return (
    <> 
      {/* <ThirdPersonCamera target={modelRef}/> */}
      <primitive object={model} ref={modelRef} />
      <mesh ref={ref} visible={false}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="red" />
      </mesh>
    </>
  );
};

export default Dragonborn;
