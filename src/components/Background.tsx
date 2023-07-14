import { ReactElement, useState } from "react";
import { useSpring, a } from "@react-spring/three";
import { useThree } from "@react-three/fiber";

import { useMeshBackgroundPositioning } from "../hooks/useMeshBackgroundPositioning";
import { useZScrolling } from "../hooks/useZScrolling";

import { Float } from "@react-three/drei";
import { useControls } from "leva";

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
    useControls({
      speed: 0.5,
      rotationIntensity: 2,
      floatIntensity: 0.25,
      mass: 1,
      tension: 300,
      friction: 240,
    });
  useZScrolling(deactivateScroll);

  const { camera } = useThree();

  // Mouse state
  const [mousePosition, setMousePosition] = useState([0, 0]);

  // Spring for smooth animation
  const { rotXY } = useSpring({
    rotXY: mousePosition,
    config: { mass, tension, friction }, // Customize the config as needed
  });

  const cameraFactor = Math.abs(camera.position.z * 0.5) + 1;

  return (
    <a.group
      rotation={
        rotXY.to((x: number, y: number) => [
          -x / cameraFactor,
          -y / cameraFactor,
          0,
        ]) as unknown as [number, number, number]
      }
      onPointerMove={({ clientX, clientY }) => {
        setMousePosition([
          (clientX / window.innerWidth) * 0.25,
          (clientY / window.innerHeight) * 0.25,
        ]);
      }}
    >
      {positionedMeshes.map((mesh, index) => (
        <Float
          speed={speed}
          rotationIntensity={rotationIntensity / cameraFactor}
          floatIntensity={floatIntensity}
          floatingRange={[-0.5, 0.5]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
          key={index}
        >
          {mesh}
        </Float>
      ))}
      <ambientLight />
    </a.group>
  );
};
