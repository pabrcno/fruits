import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";

export const useZScrolling = () => {
  const { camera } = useThree();
  const velocity = useRef(0);
  const target = useRef(0);
  const lastY = useRef(0);
  const initialY = useRef(0);

  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      target.current += e.deltaY * 0.01;
    };

    const handleTouchStart = (e: TouchEvent) => {
      initialY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const currentY = e.touches[0].clientY;
      const difference = initialY.current - currentY;
      target.current += difference * 0.01;
      initialY.current = currentY;
    };

    window.addEventListener("wheel", handleScroll, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleScroll);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  useFrame(() => {
    velocity.current += (target.current - lastY.current) * 0.01;
    velocity.current *= 0.9;
    lastY.current += velocity.current;

    camera.position.z = lastY.current;
  });
};
