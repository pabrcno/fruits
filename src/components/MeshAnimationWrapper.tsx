import { a, useSpring } from "@react-spring/three";
import { Float } from "@react-three/drei";
import { ReactElement, useState } from "react";

export const MeshAnimationWrapper = ({
  children,
}: {
  children: ReactElement;
}) => {
  const [hovered, setHovered] = useState(false);
  const { scale } = useSpring({ scale: hovered ? 0.95 : 1 });

  return (
    <a.mesh
      scale={scale}
      onPointerOver={() => setHovered(true)} // set hovered state to true on pointer over
      onPointerOut={() => setHovered(false)} // set hovered state to false on pointer out
    >
      <Float
        speed={0.5} // Animation speed, defaults to 1
        rotationIntensity={0.5} // XYZ rotation intensity, defaults to 1
        floatIntensity={0.2} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
        floatingRange={[-0.01, 0.01]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
      >
        {children}
      </Float>
    </a.mesh>
  );
};
