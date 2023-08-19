import React from "react";
import { animated, useSpring } from "@react-spring/three";
import { Vector3 } from "@react-three/fiber";

interface AnimatedWrapperProps {
  children: React.ReactNode;
}

export const AnimatedLegoWrapper: React.FC<AnimatedWrapperProps> = ({
  children,
}) => {
  const { springScale } = useSpring({
    from: { springScale: [0, 0, 0] }, // Start from scale of 0 (invisible)
    to: { springScale: [1, 1, 1] },
    config: { tension: 150, friction: 20 }, // Adjust for desired animation feel
  });

  return (
    <animated.group scale={springScale as unknown as Vector3}>
      {children}
    </animated.group>
  );
};
