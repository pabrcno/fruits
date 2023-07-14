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
      rotationIntensity: 0.5,
      floatIntensity: 0.25,
      mass: 1,
      tension: 280,
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

  const cameraFactor = Math.abs(camera.position.z * 0.1) + 1;

  return (
    <a.group
      rotation={
        rotXY.to((x: number, y: number) => [
          y / cameraFactor,
          x / cameraFactor,
          0,
        ]) as unknown as [number, number, number]
      }
    >
      {positionedMeshes.map((mesh, index) => (
        <Float
          speed={speed}
          rotationIntensity={rotationIntensity}
          floatIntensity={floatIntensity}
          floatingRange={[-0.01 / cameraFactor, 0.01 / cameraFactor]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
          key={index}
          onPointerMove={({ clientX, clientY }) => {
            setMousePosition([
              (clientX / window.innerWidth) * 0.5,
              -(clientY / window.innerHeight) * 0.25,
            ]);
          }}
        >
          {mesh}
        </Float>
      ))}
      <ambientLight />
    </a.group>
  );
};
