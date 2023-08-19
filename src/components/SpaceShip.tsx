import { useFrame, useThree } from "@react-three/fiber";
import { useState, useRef, useEffect, Ref } from "react";
import { GLTF } from "three-stdlib";
import { Box, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { Lego1x1 } from "./legos";
import { useBox } from "@react-three/cannon";

type GLTFResult = GLTF & {
  nodes: {
    Spaceship_0: THREE.Mesh;
  };
  materials: {
    Spaceship_Material: THREE.MeshBasicMaterial;
  };
};

export function SpaceShip(): JSX.Element {
  const [lasers, setLasers] = useState<THREE.Vector3[]>([]);
  const mainBoxRef = useRef<THREE.Mesh>(null);
  const { camera } = useThree();
  const { nodes, materials } = useGLTF("/meshes/spaceship.glb") as GLTFResult;

  const handleShoot = () => {
    if (!mainBoxRef.current) return;
    const position = new THREE.Vector3(
      mainBoxRef.current.position.x,
      mainBoxRef.current.position.y,
      mainBoxRef.current.position.z - 0.11
    );
    setLasers((prevLasers) => [...prevLasers, position]);
  };

  useFrame(({ mouse, viewport: { width, height } }) => {
    if (!mainBoxRef.current) return;

    mainBoxRef.current.position.set(
      mouse.x * width * 0.1,
      mouse.y * height * 0.1,
      camera.position.z - 1
    );

    // Update lasers position
    setLasers((prevLasers) =>
      prevLasers.map((laser) => {
        const updatedLaser = laser.clone();
        updatedLaser.z -= 0.1;
        return updatedLaser;
      })
    );
  });

  // Cleanup lasers that are out of view after updating their positions.
  useEffect(() => {
    setLasers((prevLasers) =>
      prevLasers.filter((laser) => laser.z > camera.position.z - 12)
    );
  }, [camera.position.z, lasers]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        handleShoot();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <>
      <mesh
        ref={mainBoxRef}
        geometry={nodes.Spaceship_0.geometry}
        material={materials.Spaceship_Material}
        rotation={[0, 0, 0]}
        scale={0.01}
        onClick={handleShoot}
      />
      {lasers.map((laserPosition, idx) => (
        <Box
          scale={[0.01, 0.01, 0.1]}
          key={idx}
          position={laserPosition}
          material-color="red"
        />
      ))}
    </>
  );
}
