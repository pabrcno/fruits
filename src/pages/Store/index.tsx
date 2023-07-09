import { Background } from "../../components/Background";
import { Canvas } from "@react-three/fiber";
import { useControls } from "leva";

import * as fruits from "../../components/fruits";
import { cloneElement } from "react";

import { ProductMeshAnimationWrapper } from "../../components/ProductMeshAnimationWrapper";
import { Center } from "@react-three/drei";
import { Nav, NavItem, ScreenContainer } from "../general.styles";
import {
  ProductActionButton,
  ProductAmountControlContainer,
  ProductAmountCounter,
  ProductNavigationLeftContainer,
  ProductNavigationRightContainer,
} from "./store.styles";
import { useStore } from "./hooks/useStore";

export const StoreScreen = ({ goToMain }: { goToMain: () => void }) => {
  const {
    productScale,

    innerGradientColor,
    outerGradientColor,
  } = useControls({
    productScale: 0.00025,

    innerGradientColor: "#a8a",
    outerGradientColor: "#d8d",
  });

  const products = Object.values(fruits).map((Mesh, index) => (
    <Mesh key={`${index}-product`} scale={productScale} />
  ));

  const {
    productIndex,
    goToNextProduct,
    goToPreviousProduct,
    cart,
    addProduct,
    removeProduct,
  } = useStore(products);

  return (
    <ScreenContainer>
      <Canvas
        style={{
          height: "100vh",
          background: `radial-gradient(circle, ${innerGradientColor}, ${outerGradientColor})`,
          zIndex: 0,
        }}
      >
        <Background
          meshes={Object.values(cart).flatMap((productMeshes, productIndex) =>
            productMeshes.map((mesh, meshIndex) =>
              cloneElement(mesh, {
                key: `${productIndex}-product${meshIndex}-background`,
                scale: productScale * 0.5,
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
    </ScreenContainer>
  );
};
