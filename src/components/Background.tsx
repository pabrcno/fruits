import { ReactElement } from "react";
import { useSpring, a } from "@react-spring/three";
import { useGesture } from "@use-gesture/react";

import { useMeshBackgroundPositioning } from "../hooks/useMeshBackgroundPositioning";
import { useZScrolling } from "../hooks/useZScrolling";

import { MeshAnimationWrapper } from "./MeshAnimationWrapper";

type MeshProps = {
  scale: number;
  position?: [number, number, number];
};

type meshBackgroundProps = {
  meshes: ReactElement<MeshProps>[];
};

export const Background = ({ meshes }: meshBackgroundProps) => {
  const positionedMeshes = useMeshBackgroundPositioning(meshes);

  useZScrolling();

  // The types are not being returned correctly from useSpring
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const [{ rotXY }, set] = useSpring(() => ({ rotXY: [0, 0] })) as unknown as [
    {
      rotXY: {
        // The types are not being returned correctly from useSpring so we have to use any here
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        to: any;
      };
    },
    (props: { rotXY: [number, number] }) => void
  ];

  const bind = useGesture({
    onMove: ({ xy }) =>
      set({ rotXY: [xy[0] / window.innerWidth, xy[1] / window.innerHeight] }),
  });

  return (
    <group>
      {positionedMeshes.map((mesh, index) => (
        /* 
    Ignoring TypeScript warnings here because the event handlers 
    returned by `bind()` from @use-gesture/react are designed for 
    native HTML elements, not for the 3D objects provided by 
    @react-three/fiber. There's a mismatch between the two event 
    systems, hence the TypeScript warning. But the event handlers 
    work as expected in this context. And it is not a production app.
  */
        //@ts-expect-error above
        <a.mesh
          {...bind()}
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
          rotation={rotXY.to((x: number, y: number) => [y * 0.05, x * 0.1, 0])}
          key={index}
        >
          <MeshAnimationWrapper>{mesh}</MeshAnimationWrapper>
        </a.mesh>
      ))}
      <ambientLight />
    </group>
  );
};
