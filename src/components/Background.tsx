import React, { ReactElement } from "react";
import { useSpring, a } from "@react-spring/three";
import { useGesture } from "@use-gesture/react";

import { FloatingFruitWrapper } from "./FloatingFruitWrapper";
import { useMeshBackgroundPositioning } from "../hooks/useMeshBackgroundPositioning";

type MeshProps = {
  scale: number;
  position?: [number, number, number];
};

type FruitBackgroundProps = {
  fruits: ReactElement<MeshProps>[];
};

export const Background = ({ fruits }: FruitBackgroundProps) => {
  const positions = useMeshBackgroundPositioning(fruits.length);

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
    <a.group {...bind()} rotation={rotXY.to((x, y) => [y * 0.1, x * 0.1, 0])}>
      {fruits.map((fruit, index) => (
        <FloatingFruitWrapper key={index}>
          {React.cloneElement(fruit, { position: positions[index] })}
        </FloatingFruitWrapper>
      ))}
      <ambientLight />
    </a.group>
  );
};
