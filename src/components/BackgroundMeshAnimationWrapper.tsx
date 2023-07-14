import { Float } from "@react-three/drei";
import { ReactElement } from "react";

export const BackgroundMeshAnimationWrapper = ({
  children,
}: {
  children: ReactElement;
}) => {
  return (
    <Float
      speed={0.5} // Animation speed, defaults to 1
      rotationIntensity={0.5} // XYZ rotation intensity, defaults to 1
      floatIntensity={0.2} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
      floatingRange={[-0.01, 0.01]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
    >
      {children}
    </Float>
  );
};
