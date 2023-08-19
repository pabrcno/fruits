import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";

export const useAutoZScrolling = (deactivateScroll?: boolean, speed = 0.01) => {
  const { camera } = useThree();
  const lastY = useRef(0);

  useFrame(() => {
    if (deactivateScroll) return;

    lastY.current -= speed;
    camera.position.z = lastY.current;
  });
};
