import React, { ReactElement } from "react";
import { useSpring, a } from "@react-spring/three";
import { useGesture } from "@use-gesture/react";

import { useMeshBackgroundPositioning } from "../hooks/useMeshBackgroundPositioning";
import { useZScrolling } from "../hooks/useZScrolling";
import { Float } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";

type MeshProps = {
  scale: number;
  position?: [number, number, number];
};

type meshBackgroundProps = {
  meshes: ReactElement<MeshProps>[];
};

export const Background = ({ meshes }: meshBackgroundProps) => {
  const positionedMeshes = useMeshBackgroundPositioning(meshes);

  const { camera } = useThree();

  useZScrolling();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const [{ rotXY }, set] = useSpring(() => ({ rotXY: [0, 0] })) as unknown as [
    { rotXY: [number, number] },
    (props: { rotXY: [number, number] }) => void
  ];

  const bind = useGesture({
    onMove: ({ xy }) =>
      set({ rotXY: [xy[0] / window.innerWidth, -xy[1] / window.innerHeight] }),
  });

  return (
    // @ts-expect-error - the types are not defined correctly by the  library
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    <a.group {...bind()} rotation={rotXY.to((x, y) => [y * 0.2, x * 0.1, 0])}>
      {positionedMeshes.map((mesh, index) => (
        <Float
          speed={0.5} // Animation speed, defaults to 1
          rotationIntensity={0.5} // XYZ rotation intensity, defaults to 1
          floatIntensity={0.2} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
          floatingRange={[-0.1, -0.1]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
          key={index}
        >
          {mesh}
        </Float>
      ))}
      <ambientLight />
    </a.group>
  );
};
