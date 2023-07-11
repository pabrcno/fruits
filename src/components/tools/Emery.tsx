/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    ["Box006_Material_#32_0"]: THREE.Mesh;
  };
  materials: {
    Material_32: THREE.MeshStandardMaterial;
  };
};

export function Emery(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/emery.glb") as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes["Box006_Material_#32_0"].geometry}
        material={materials.Material_32}
        scale={0.75}
      />
    </group>
  );
}

useGLTF.preload("/emery.glb");
