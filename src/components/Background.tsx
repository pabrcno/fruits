import { ReactElement, useState } from "react";
import { useSpring, a } from "@react-spring/three";
import { useThree } from "@react-three/fiber";

import { useMeshBackgroundPositioning } from "../hooks/useMeshBackgroundPositioning";
import { useZScrolling } from "../hooks/useZScrolling";

import { Float, Sparkles, Stars } from "@react-three/drei";
import { useControls } from "leva";
import { useAutoZScrolling } from "../hooks/useAutoZScroll";
import { cameraPosition } from "three/examples/jsm/nodes/Nodes.js";

type MeshProps = {
  scale: number;
  position?: [number, number, number];
};

type meshBackgroundProps = {
  meshes: ReactElement<MeshProps>[];
  deactivateScroll?: boolean;
};

export const Background = ({
  meshes,
  deactivateScroll,
}: meshBackgroundProps) => {
  const positionedMeshes = useMeshBackgroundPositioning(meshes);
  const { speed, rotationIntensity, floatIntensity, mass, tension, friction } =
    {
      speed: 0.5,
      rotationIntensity: 2,
      floatIntensity: 1,
      mass: 1,
      tension: 300,
      friction: 240,
    };
  const { speed: scrollSpeed } = useAutoZScrolling();

  const { camera } = useThree();

  const cameraFactor = Math.abs(camera.position.z * 0.5) + 2;

  return (
    <group>
      {positionedMeshes.map((mesh, index) => (
        <Float
          speed={speed}
          rotationIntensity={rotationIntensity / cameraFactor}
          floatIntensity={floatIntensity}
          key={index}
          floatingRange={[-1, 1]}
        >
          {mesh}
        </Float>
      ))}
      <ambientLight />
      <Sparkles
        position={[0, 0, camera.position.z - 10]}
        size={2}
        count={100}
        speed={scrollSpeed * 10}
        noise={1}
        scale={20}
      />
      <Stars
        radius={100}
        depth={500}
        count={5000}
        factor={4}
        saturation={0}
        fade
      />
    </group>
  );
};
