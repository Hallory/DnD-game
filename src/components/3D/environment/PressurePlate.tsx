import { useBox } from "@react-three/cannon";
import React, { useState, useEffect, forwardRef } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import { Html } from "@react-three/drei";
import { Mesh } from "three";

interface PressurePlateProps {
  position: [number, number, number];
  isCharacterOnPlate: boolean;
}

const PressurePlate = forwardRef<Mesh, PressurePlateProps>(({ position, isCharacterOnPlate }, ref) => {
  const [showButton, setShowButton] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isCharacterOnPlate) {
      setTimeout(() => setShowButton(true), 500);
    } else {
      setShowButton(false);
    }
  }, [isCharacterOnPlate]);

  return (
    <mesh
      ref={(node) => {
        if (ref && typeof ref === "object") {
          ref.current = node as Mesh;
        }
      }}
      position={position}
    >
      <boxGeometry args={[1, 0.1, 1]} />
      <meshStandardMaterial color={"red"} />
      <Html>
        {showButton &&
          createPortal(
            <button
              style={{
                position: "absolute",
                top: "80%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                background: "blue",
                color: "white",
                padding: "10px 20px",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "16px",
                border: "none",
                zIndex: 1000,
              }}
              onClick={() => router.push("/character-creation")}
            >
              Перейти к созданию персонажа
            </button>,
            document.body
          )}
      </Html>
    </mesh>
  );
});

export default PressurePlate;
