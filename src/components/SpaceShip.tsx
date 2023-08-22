import { useFrame, useThree } from "@react-three/fiber";
import { useState, useRef, useEffect, useMemo } from "react";

import { Box } from "@react-three/drei";
import * as THREE from "three";
import { SpaceshipMesh } from "./SpaceShipMesh";

export function SpaceShip(): JSX.Element {
  const [lasers, setLasers] = useState<THREE.Vector3[]>([]);
  const mainBoxRef = useRef<THREE.Mesh>(null);
  const { camera } = useThree();
  const shotSound = useMemo(() => new Audio("/sound/laser-shot.wav"), []);
  const legoSound = useMemo(() => new Audio("/sound/lego-click.wav"), []);
  const handleShoot = () => {
    if (!mainBoxRef.current) return;
    const position = new THREE.Vector3(
      mainBoxRef.current.position.x,
      mainBoxRef.current.position.y,
      mainBoxRef.current.position.z - 0.11
    );
    setLasers((prevLasers) => [...prevLasers, position]);
    shotSound.volume = 0.05;
    legoSound.play().catch((err) => console.error(err));
    shotSound.play().catch((err) => console.error(err));
  };

  useFrame(({ mouse, viewport: { width, height } }) => {
    if (!mainBoxRef.current) return;

    mainBoxRef.current.position.set(
      mouse.x * width * 0.1,
      mouse.y * height * 0.1 - 0.1,
      camera.position.z - 1
    );

    // Update lasers position
    setLasers((prevLasers) =>
      prevLasers.map((laser) => {
        const updatedLaser = laser.clone();
        updatedLaser.z -= 0.5;
        return updatedLaser;
      })
    );
  });

  // Cleanup lasers that are out of view after updating their positions.
  useEffect(() => {
    setLasers((prevLasers) =>
      prevLasers.filter((laser) => laser.z > camera.position.z - 5)
    );
  }, [camera.position.z, lasers]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        handleShoot();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <SpaceshipMesh onClick={handleShoot} ref={mainBoxRef} />
      {lasers.map((laserPosition, idx) => (
        <Box
          scale={[0.01, 0.01, 0.1]}
          key={idx}
          name="laser"
          position={laserPosition}
          material-color="red"
        />
      ))}
    </>
  );
}
