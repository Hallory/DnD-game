import { useGLTF } from "@react-three/drei";
import React, { FC, useEffect, useMemo } from "react";
import { clone } from "three/examples/jsm/utils/SkeletonUtils.js";

interface TreeProps {
  position: number[];
  scale?: number;
}

const Tree: FC<TreeProps> = ({ position, scale = 1 }) => {
  const { scene } = useGLTF('/models/pine_tree.glb');

    const clonedScene = useMemo(() => clone(scene), [scene]);

    return <primitive object={clonedScene} position={position} scale={scale} />;
};

export default Tree;