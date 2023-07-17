import React, { useRef, useEffect } from "react";
import { useFrame, useThree, extend, Canvas } from "@react-three/fiber";
import * as THREE from "three";
import particleFire from "three-particle-fire";

particleFire.install({ THREE: THREE });

extend({ particleFire });

type FireProps = {
  fireRadius: number;
  fireHeight: number;
  particleCount: number;
  color: string | number | THREE.Color;
} & JSX.IntrinsicElements["group"];

export const Fire: React.FC<FireProps> = ({
  fireRadius = 0.5,
  fireHeight = 2,
  particleCount = 500,
  color = 0xff0000,
  ...props
}) => {
  const mesh = useRef<THREE.Points>();
  const { camera, size } = useThree();

  useEffect(() => {
    if (mesh.current) {
      const geometry0 = new particleFire.Geometry(
        fireRadius,
        fireHeight,
        particleCount
      );

      const material0 = new particleFire.Material({
        color,
      });

      material0.setPerspective(camera.fov, size.height);
      mesh.current.geometry = geometry0;
      mesh.current.material = material0;
    }
  }, [camera, size, fireRadius, fireHeight, particleCount, color]);

  useFrame((state) => {
    if (mesh.current) {
      const delta = state.clock.getDelta();
      (mesh.current.material as any).update(delta);
    }
  });

  return (
    <group {...props} scale={1}>
      <points ref={mesh} />
    </group>
  );
};
