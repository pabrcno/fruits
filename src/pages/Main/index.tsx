import { Background } from "../../components/Background";
import { Canvas } from "@react-three/fiber";
import { useControls } from "leva";

import {
  ActionButton,
  Center,
  MainContainer,
  MainTitle,
  Nav,
  NavItem,
} from "./main.styles";
import * as fruits from "../../components/fruits";

export const MainScreen = () => {
  const {
    fruitScale,
    fruitFactor,
    innerGradientColor,
    outerGradientColor,
    fogColor,
  } = useControls({
    fruitScale: 0.0008,
    fruitFactor: 2,
    innerGradientColor: "#a8a",
    outerGradientColor: "#d8d",
    fogColor: "#a8a",
  });

  return (
    <MainContainer>
      <Canvas
        style={{
          height: "100vh",
          background: `radial-gradient(circle, ${innerGradientColor}, ${outerGradientColor})`,
          zIndex: 0,
        }}
      >
        <fog attach="fog" args={[fogColor, 11, 12]} />
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
        <ActionButton>Buy</ActionButton>
      </Center>
    </MainContainer>
  );
};
