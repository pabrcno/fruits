import { Background } from "../../components/Background";
import { Canvas } from "@react-three/fiber";
import { useControls } from "leva";

import { MainTitle, TitleContainer, TitleNote } from "./main.styles";
import * as fruits from "../../components/fruits";
import {
  ActionButton,
  ActionButtonContainer,
  Nav,
  NavItem,
  ScreenContainer,
} from "../general.styles";
import { useState } from "react";

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

  const [isTitleVisible, setIsTitleVisible] = useState(true);

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
        <a href="https://github.com/pabrcno/fruits">
          <NavItem>
            Repo
            <img src="/github-icon.png" alt="gh-icon" height={25}></img>
          </NavItem>
        </a>
      </Nav>
      {isTitleVisible && (
        <TitleContainer onDoubleClick={() => setIsTitleVisible(false)}>
          <MainTitle>Paulo's Fruit Store</MainTitle>
          <TitleNote>(Double tap to hide)</TitleNote>
        </TitleContainer>
      )}
      <ActionButtonContainer>
        <ActionButton onClick={goToStore}>Store</ActionButton>
      </ActionButtonContainer>
    </ScreenContainer>
  );
};
