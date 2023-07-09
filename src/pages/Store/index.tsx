import { Background } from "../../components/Background";
import { Canvas, useThree } from "@react-three/fiber";
import { useControls } from "leva";

import * as fruits from "../../components/fruits";
import { ReactElement, cloneElement, useState } from "react";

import { ProductMeshAnimationWrapper } from "../../components/ProductMeshAnimationWrapper";
import { Center } from "@react-three/drei";
import { ScreenContainer } from "../general.styles";
import {
  ProductActionButton,
  ProductAmountControlContainer,
  ProductAmountCounter,
  ProductNavigationLeftContainer,
  ProductNavigationRightContainer,
} from "./store.styles";

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

  const [productIndex, setProductIndex] = useState(0);

  const products = Object.values(fruits).map((Mesh, index) => (
    <Mesh key={`${index}-product`} scale={productScale} />
  ));

  const goToNextProduct = () => {
    if (productIndex === products.length - 1) {
      setProductIndex(0);
      return;
    }
    setProductIndex((prev) => prev + 1);
  };

  const goToPreviousProduct = () => {
    if (productIndex === 0) {
      setProductIndex(products.length - 1);
      return;
    }
    setProductIndex((prev) => prev - 1);
  };

  const [cart, setCart] = useState<{ [key: number]: ReactElement[] }>(
    products.reduce((acc, _, index) => ({ ...acc, [index]: [] }), {})
  );

  const addProduct = () => {
    setCart((prev) => ({
      ...prev,
      [productIndex]: [...(prev[productIndex] || []), products[productIndex]],
    }));
  };

  const removeProduct = () => {
    setCart((prev) => {
      const productMeshes = prev[productIndex];
      if (!productMeshes || productMeshes.length === 0) {
        return prev;
      }
      return {
        ...prev,
        [productIndex]: productMeshes.slice(0, productMeshes.length - 1),
      };
    });
  };
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
