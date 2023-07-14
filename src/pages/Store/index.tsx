import { Background } from "../../components/Background";
import { Canvas } from "@react-three/fiber";
import { useControls } from "leva";

import { cloneElement } from "react";

import { ProductMeshAnimationWrapper } from "../../components/ProductMeshAnimationWrapper";
import { Center } from "@react-three/drei";
import {
  ActionButton,
  ActionButtonContainer,
  Nav,
  NavItem,
  ScreenContainer,
} from "../general.styles";
import {
  ProductActionButton,
  ProductAmountControlContainer,
  ProductAmountCounter,
  ProductNavigationLeftContainer,
  ProductNavigationRightContainer,
} from "./store.styles";
import { useStore } from "./hooks/useStore";
import { ETheme, useTheme } from "../../hooks/useTheme";

export const StoreScreen = ({ goToMain }: { goToMain: () => void }) => {
  const { theme, setToolsTheme, setFruitsTheme } = useTheme();
  const { productScale } = useControls({
    productScale: 0.025,
  });

  const products = theme.meshes.map((Mesh, index) => (
    <Mesh key={`${index}-product`} scale={productScale} />
  ));

  const {
    productIndex,
    goToNextProduct,
    goToPreviousProduct,
    cart,
    addProduct,
    removeProduct,
    emptyCart,
  } = useStore(products);

  return (
    <ScreenContainer>
      <Canvas
        style={{
          height: "100vh",
          background: `radial-gradient(circle, ${theme.innerGradientColor}, ${theme.outerGradientColor})`,
          zIndex: 0,
        }}
      >
        <Background
          meshes={Object.values(cart).flatMap((productMeshes, productIndex) =>
            productMeshes.map((mesh, meshIndex) =>
              cloneElement(mesh, {
                key: `${productIndex}-product${meshIndex}-background`,
                scale: productScale * 0.5,
                positionZ: -2,
              })
            )
          )}
        />

        {!!products[productIndex] && (
          <ProductMeshAnimationWrapper>
            <Center>{products[productIndex]}</Center>
          </ProductMeshAnimationWrapper>
        )}
      </Canvas>
      <Nav>
        <NavItem onClick={goToMain}>{"< Back"}</NavItem>
        <NavItem
          onClick={() => {
            theme.name === ETheme.FRUITS || theme.name === ETheme.DEFAULT
              ? setToolsTheme()
              : setFruitsTheme();
            emptyCart();
          }}
        >
          {theme.name === ETheme.FRUITS || theme.name === ETheme.DEFAULT
            ? "Fruits"
            : "Tools"}
        </NavItem>
      </Nav>
      <ProductNavigationLeftContainer>
        <ProductActionButton onClick={goToPreviousProduct}>
          {"<"}
        </ProductActionButton>
      </ProductNavigationLeftContainer>

      <ProductNavigationRightContainer>
        <ProductActionButton onClick={goToNextProduct}>
          {">"}
        </ProductActionButton>
      </ProductNavigationRightContainer>

      <ProductAmountControlContainer>
        <ProductActionButton onClick={removeProduct}>-</ProductActionButton>
        <ProductAmountCounter>{cart[productIndex].length}</ProductAmountCounter>
        <ProductActionButton onClick={addProduct}>+</ProductActionButton>
      </ProductAmountControlContainer>
      <a href="https://www.linkedin.com/in/paulo-briceno/">
        <ActionButtonContainer>
          <ActionButton>Hire!</ActionButton>
        </ActionButtonContainer>
      </a>
    </ScreenContainer>
  );
};
