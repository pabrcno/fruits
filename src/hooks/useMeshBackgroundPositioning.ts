import { useFrame, useThree } from "@react-three/fiber";
import React, { useMemo, useState } from "react";

const MIN_DISTANCE = 3;

export const useMeshBackgroundPositioning = (meshes: JSX.Element[]) => {
  const { viewport } = useThree();
  const MAX_RANGE = viewport.width;
  const MAX_RANGE_Y = viewport.height;
  const [positions, setPositions] = useState<[number, number, number][]>([]);
  const { camera } = useThree();

  function generateRandomPosition() {
    return [
      (Math.random() - 0.5) * MAX_RANGE,
      (Math.random() - 0.5) * MAX_RANGE_Y,
      (Math.random() - 1) * 10,
    ] as [number, number, number];
  }

  function checkIntersect(
    positions: [number, number, number][],
    newPos: [number, number, number]
  ) {
    for (const pos of positions) {
      const dx = pos[0] - newPos[0];
      const dy = pos[1] - newPos[1];
      const dz = pos[2] - newPos[2];
      const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

      if (distance < MIN_DISTANCE) return true;
    }
    return false;
  }

  const THRESHOLD = 16; // The distance from camera when objects start moving closer.
  const BEHIND_CAMERA = 1; // The distance behind the camera to render the objects.

  useFrame(() => {
    const newPositions = positions.map(([x, y, z]) => {
      if (camera.position.z < z) {
        return [
          x + (Math.random() - 0.5) * 2.5,
          y + (Math.random() - 0.5) * 2.5,
          camera.position.z - (Math.random() - 0.5) * 2.5 - THRESHOLD,
        ];
      } else if (z < camera.position.z - THRESHOLD) {
        return [x, y, camera.position.z + BEHIND_CAMERA];
      } else {
        return [x, y, z];
      }
    });

    setPositions(newPositions as [number, number, number][]);
  });
  useMemo(() => {
    const possiblePositions: [number, number, number][] = Array(
      meshes.length * 50
    )
      .fill(0)
      .map(() => generateRandomPosition());

    for (const pos of possiblePositions) {
      if (positions.length >= meshes.length) {
        break;
      }

      if (!checkIntersect(positions, pos)) {
        setPositions((prev) => [...prev, pos]);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meshes.length, MAX_RANGE]);

  return meshes.map((mesh, i) =>
    React.cloneElement(mesh, { position: positions[i] })
  );
};
