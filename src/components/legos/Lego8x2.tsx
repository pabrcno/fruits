import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

import { AnimatedLegoWrapper } from "./AnimatedLegoWrapper";
type GLTFResult = GLTF & {
  nodes: {
    lego_8x2: THREE.Mesh;
  };
  materials: {
    ["lego_surface"]: THREE.MeshStandardMaterial;
  };
};

type LegoProps = JSX.IntrinsicElements["group"] & {
  color?: string | THREE.Color;
  scale?: [number, number, number];
};

export function Lego8x2({ color, scale, ...props }: LegoProps) {
  const { nodes, materials } = useGLTF("/lego_8x2.glb") as GLTFResult;

  const clonedMaterial = materials["lego_surface"].clone();

  // Update the material's color if a color prop is provided
  if (color) {
    clonedMaterial.color.set(color);
  }

  return (
    <AnimatedLegoWrapper>
      <mesh
        scale={scale}
        castShadow
        geometry={nodes.lego_8x2.geometry}
        material={clonedMaterial}
        position={props.position}
      />
    </AnimatedLegoWrapper>
  );
}

useGLTF.preload("/lego_8x2.glb");
