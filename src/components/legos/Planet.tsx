import { useGLTF, useTexture } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { AnimatedLegoWrapper } from "./AnimatedLegoWrapper";

type GLTFResult = GLTF & {
  nodes: {
    planet_lego: THREE.Mesh;
  };
  materials: {
    blue_and_green_planet: THREE.MeshStandardMaterial;
  };
};

export function Planet(
  props: JSX.IntrinsicElements["group"] & { textureUri: string }
) {
  const { nodes, materials } = useGLTF("/meshes/planet.glb") as GLTFResult;
  const texture = useTexture(props.textureUri);
  const clonedMaterial = materials["blue_and_green_planet"].clone();

  // Update the material's color if a color prop is provided
  if (texture) {
    clonedMaterial.map = texture;
  }

  return (
    <group {...props} dispose={null}>
      <AnimatedLegoWrapper>
        <mesh castShadow receiveShadow geometry={nodes.planet_lego.geometry}>
          <meshStandardMaterial map={texture} />
        </mesh>
      </AnimatedLegoWrapper>
    </group>
  );
}

useGLTF.preload("/planet.glb");
