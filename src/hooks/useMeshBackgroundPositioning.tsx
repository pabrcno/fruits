import { useThree } from "@react-three/fiber";
import { useMemo } from "react";

const MIN_DISTANCE = 2.5;

export const useMeshBackgroundPositioning = (
  count: number
): [number, number, number][] => {
  const { viewport } = useThree();
  const MAX_RANGE = viewport.width;
  const MAX_RANGE_Y = viewport.height;

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

  return useMemo(() => {
    const positions: [number, number, number][] = [];
    let newPos;
    for (let i = 0; i < count; i++) {
      do {
        newPos = generateRandomPosition();
      } while (checkIntersect(positions, newPos));

      positions.push(newPos);
    }
    return positions;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, MAX_RANGE]);
};
