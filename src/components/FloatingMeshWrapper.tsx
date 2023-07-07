import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh } from "three";

export const FloatingMeshWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const ref = useRef<Mesh>(null);
  const offset = Math.random() * Math.PI * 2;

  useFrame((state) => {
    const t = state.clock.getElapsedTime() + offset;
    if (ref.current === null) return;
    ref.current.rotation.set(
      Math.cos(t / 4) / 8,
      Math.sin(t / 3) / 16,
      0.15 + Math.sin(t / 2) / 16
    );
    ref.current.position.y = (0.5 + Math.cos(t / 2)) / 7;
  });
  return (
    <mesh ref={ref} castShadow>
      {children}
    </mesh>
  );
};
