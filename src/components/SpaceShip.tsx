import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";

import { GLTF } from "three-stdlib";
import { Box, useGLTF } from "@react-three/drei";
import * as THREE from "three";
type GLTFResult = GLTF & {
  nodes: {
    Spaceship_0: THREE.Mesh;
  };
  materials: {
    Spaceship_Material: THREE.MeshBasicMaterial;
  };
};
export function SpaceShip(): JSX.Element {
  const mainBoxRef =
    useRef<
      THREE.Mesh<
        THREE.BufferGeometry<THREE.NormalBufferAttributes>,
        THREE.Material | THREE.Material[]
      >
    >(null);
  const { camera } = useThree();

  const { nodes, materials } = useGLTF("/meshes/spaceship.glb") as GLTFResult;
  useFrame(({ mouse, viewport: { width, height } }) => {
    if (!mainBoxRef.current) return;
    mainBoxRef.current.position.set(
      mouse.x * width * 0.5,
      mouse.y * height * 0.5,
      camera.position.z - 1
    );
  });

  return (
    <>
      <mesh
        ref={mainBoxRef}
        geometry={nodes.Spaceship_0.geometry}
        material={materials.Spaceship_Material}
        position={[44.253, 0, 0]}
        rotation={[0, 0, 0]}
        scale={0.015}
      />
    </>
  );
}
