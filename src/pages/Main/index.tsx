import { Background } from "../../components/Background";
import { Canvas } from "@react-three/fiber";
import { useControls } from "leva";

import { MainTitle, TitleContainer } from "./main.styles";
import * as fruits from "../../components/fruits";
import {
  ActionButton,
  ActionButtonContainer,
  Nav,
  NavItem,
  ScreenContainer,
} from "../general.styles";

export const MainScreen = ({ goToStore }: { goToStore: () => void }) => {
  const {
    bgMeshScale,
    bgMeshFactor,
    innerGradientColor,
    outerGradientColor,
    fogColor,
  } = useControls({
    bgMeshScale: 0.0008,
    bgMeshFactor: 2,
    innerGradientColor: "#a8a",
    outerGradientColor: "#d8d",
    fogColor: "#a8a",
  });

  return (
    <ScreenContainer>
      <Canvas
        style={{
          height: "100vh",
          background: `radial-gradient(circle, ${innerGradientColor}, ${outerGradientColor})`,
          zIndex: 0,
        }}
      >
        <fog attach="fog" args={[fogColor, 11, 12]} />
        <Background
          meshes={Object.values(fruits).flatMap((Mesh, index) =>
            Array.from({ length: bgMeshFactor }, (_, factorIndex) => (
              <Mesh key={`${index}-${factorIndex}`} scale={bgMeshScale} />
            ))
          )}
        />
      </Canvas>
      <Nav>
        <NavItem>Repo</NavItem>
      </Nav>
      <TitleContainer>
        <MainTitle>Paulo's Fruit Store</MainTitle>
      </TitleContainer>
      <ActionButtonContainer>
        <ActionButton onClick={goToStore}>Store</ActionButton>
      </ActionButtonContainer>
    </ScreenContainer>
  );
};
