import React, { FC, PropsWithChildren, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { Physics } from "@react-three/cannon";
import Ground from "@/components/3D/environment/Ground";
import PressurePlate from "@/components/3D/environment/PressurePlate";
import CharacterCreationModal from "@/components/3D/ui/CharacterCreationModal";
import Tree from "@/components/3D/environment/Tree";
import AncientArc from "@/components/3D/environment/AncientArc";
import BorderWall from "@/components/3D/environment/BorderWall";
import { OrbitControls } from "@react-three/drei";
import Boundary from "@/components/3D/environment/Boundary";
import { Stars } from "@react-three/drei";
import Dragonborn from "@/components/3D/characters/Dragonborn";

const ThreeProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isCharacterOnPlate, setIsCharacterOnPlate] = useState<boolean>(false);

  const plateRef = useRef<THREE.Mesh | null>(null);

  const Trees = () => {
    const treeCount = 350; 
    const minRadius = 30; 
    const maxRadius = 70; 
    const minDistance = 1.5; 
  
    const trees: { position: [number, number, number]; scale: number }[] = [];
  
    while (trees.length < treeCount) {
      let angle = Math.random() * Math.PI * 2; 
      let radius = minRadius + Math.random() * (maxRadius - minRadius); 
  
      let x = Math.cos(angle) * radius;
      let z = Math.sin(angle) * radius;
  
      let isFarEnough = trees.every(
        (tree) => Math.hypot(tree.position[0] - x, tree.position[2] - z) > minDistance
      );
  
      if (isFarEnough) {
        trees.push({
          position: [x, -1.5, z],
          scale: Math.random() * 0.4 + 0.8,
        });
      }
    }
  
    return (
      <>
        {trees.map((tree, index) => (
          <Tree key={index} position={tree.position} scale={tree.scale / 15} />
        ))}
      </>
    );
  };
  

  

  return (
    <>
      <Canvas
        camera={{ position: [0, 2, 5] }}
        style={{
          width: "100vw",
          height: "100vh",
          position: "absolute",
          top: 0,
          left: 0,
        }}
        shadows
        gl={{ alpha: false }}
        onCreated={({ scene }) => {
          scene.background = new THREE.Color("#161616");
          scene.fog = new THREE.Fog("#161616", 20, 50);
        }}
      >
        <pointLight position={[0, 10, 0]} intensity={2} />
        <OrbitControls />
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 10, 5]} intensity={1} />
        <Stars
          radius={100} 
          depth={50} 
          count={5000} 
          factor={4} 
          saturation={0}
          fade
        />
        <Physics gravity={[0, -9.81, 0]}>
          <PressurePlate
            ref={plateRef}
            isCharacterOnPlate={isCharacterOnPlate}
            position={[0, -1.5, -15]}
          />

          <Dragonborn setIsCharacterOnPlate={setIsCharacterOnPlate} />

          <Ground />
          <Trees />
          <AncientArc />
          <BorderWall />
          <Boundary position={[0, 0, 0]} radius={28} height={10} />
        </Physics>
      </Canvas>

      {/* <CharacterCreationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      /> */}
    </>
  );
};

export default ThreeProvider;
