import { Background } from "../../components/Background";
import { Canvas } from "@react-three/fiber";
import { useControls } from "leva";

import { MainTitle, TitleContainer, TitleNote } from "./main.styles";

import {
  ActionButton,
  ActionButtonContainer,
  Nav,
  NavItem,
  ScreenContainer,
} from "../../styles/general.styles";
import { useEffect, useState } from "react";

import { ETheme, useTheme } from "../../hooks/useTheme";

export const MainScreen = ({ goToStore }: { goToStore: () => void }) => {
  const { theme, setFireTheme, setFruitsTheme } = useTheme();

  const {
    bgMeshScale,
    bgMeshFactor,
    innerGradientColor,
    outerGradientColor,
    shadowColor,
  } = useControls({
    bgMeshScale: 0.1,
    bgMeshFactor: 2,
    innerGradientColor: "#000",
    outerGradientColor: "#000",
    shadowColor: theme.shadowColor,
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
        gl={{ alpha: true }}
      >
        <fog attach="fog" args={[shadowColor, 11, 12]} />
        <Background
          meshes={theme.meshes.flatMap((Mesh, index) =>
            Array.from({ length: bgMeshFactor }, (_, factorIndex) => (
              <Mesh key={`${index}-${factorIndex}`} scale={bgMeshScale} />
            ))
          )}
        />
      </Canvas>
      <Nav>
        <div>
          <NavItem
            onClick={() => {
              theme.name === ETheme.TOOLS ? setFruitsTheme() : setFireTheme();
            }}
          >
            Change Theme
          </NavItem>
        </div>
        <a href="https://github.com/pabrcno/fruits">
          <NavItem>
            Repo
            <img src="/github-icon.png" alt="gh-icon" height={25}></img>
          </NavItem>
        </a>
      </Nav>
      {isTitleVisible && (
        <TitleContainer onDoubleClick={() => setIsTitleVisible(false)}>
          <MainTitle>{theme.title}</MainTitle>
          <TitleNote>(Double tap to hide)</TitleNote>
        </TitleContainer>
      )}
      <ActionButtonContainer>
        <ActionButton onClick={goToStore}>Store</ActionButton>
      </ActionButtonContainer>
    </ScreenContainer>
  );
};
