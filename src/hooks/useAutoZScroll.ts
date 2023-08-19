import { useSpring, animated } from "@react-spring/three";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";

export const useAutoZScrolling = (deactivateScroll?: boolean) => {
  const { camera } = useThree();
  const lastY = useRef(0);

  // Spring state for speed transition
  const [{ speed }, setSpeed] = useSpring(() => ({ speed: 0.01 }));

  useFrame(() => {
    if (deactivateScroll) return;

    // Update camera position with the current animated speed
    lastY.current -= speed.get();
    camera.position.z = lastY.current;
  });

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Shift") {
        // Set the spring to the faster speed
        setSpeed({ speed: 0.25 });
      }
    };

    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === "Shift") {
        // Reset the spring to the normal speed
        setSpeed({ speed: 0.01 });
      }
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [setSpeed]);

  return { speed: speed.get() };
};
