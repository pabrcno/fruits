import { Float } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { Group } from "three";

export const ProductMeshAnimationWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const productAnimatedMeshRef = useRef<Group>(null);
  const { camera } = useThree();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (!productAnimatedMeshRef.current) return;
    productAnimatedMeshRef.current.rotation.y = t * 0.5;
    productAnimatedMeshRef.current.position.z = camera.position.z - 1;
  });

  return (
    <group ref={productAnimatedMeshRef}>
      <Float>{children}</Float>
    </group>
  );
};
