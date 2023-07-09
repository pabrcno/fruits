import { Background } from "../../components/Background";
import { Canvas } from "@react-three/fiber";
import { useState } from "react";
import {
  ActionButton,
  Center,
  MainContainer,
  MainTitle,
  Nav,
  NavItem,
} from "./main.styles";
import * as fruits from "../../components/fruits";

const BACKGROUND_FRUIT_SCALE = 0.0008;

export const MainScreen = () => {
  const [fruitScale, setFruitScale] = useState(BACKGROUND_FRUIT_SCALE);
  const [fruitFactor, setFruitFactor] = useState(2);

  return (
    <MainContainer>
      <Canvas
        style={{
          height: "100vh",
          background: "radial-gradient(circle, #a8a, #d8d)",
          zIndex: 0,
        }}
      >
        <fog attach="fog" args={["#a8a", 11, 12]} />
        <Background
          meshes={Object.values(fruits).flatMap((Fruit, index) =>
            Array.from({ length: fruitFactor }, (_, factorIndex) => (
              <Fruit key={`${index}-${factorIndex}`} scale={fruitScale} />
            ))
          )}
        />
      </Canvas>
      <Nav>
        <NavItem>About</NavItem>
      </Nav>
      <Center>
        <MainTitle>Paulo's Fruit Store</MainTitle>
        <ActionButton onClick={() => setFruitScale((prev) => prev * 2)}>
          Buy
        </ActionButton>
      </Center>
    </MainContainer>
  );
};
