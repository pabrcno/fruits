import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

import { AnimatedLegoWrapper } from "./AnimatedLegoWrapper";

type GLTFResult = GLTF & {
  nodes: {
    lego_1x1: THREE.Mesh;
  };
  materials: {
    ["lego_surface"]: THREE.MeshStandardMaterial;
  };
};

type LegoProps = JSX.IntrinsicElements["group"] & {
  color?: string | THREE.Color;
  scale?: [number, number, number];
};

export function Lego1x1({ color, scale, ...props }: LegoProps) {
  const { nodes, materials } = useGLTF("/lego_1x1.glb") as GLTFResult;

  const clonedMaterial = materials["lego_surface"].clone();
  if (color) {
    clonedMaterial.color.set(color);
  }

  return (
    <AnimatedLegoWrapper>
      <mesh
        geometry={nodes.lego_1x1.geometry}
        material={clonedMaterial}
        position={props.position}
        scale={scale}
      />
    </AnimatedLegoWrapper>
  );
}
useGLTF.preload("/lego_1x1.glb");
