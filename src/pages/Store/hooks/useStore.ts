import { ReactElement, useState } from "react";

export const useStore = (products: JSX.Element[]) => {
  const [productIndex, setProductIndex] = useState(0);

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

  return {
    productIndex,
    goToNextProduct,
    goToPreviousProduct,
    cart,
    addProduct,
    removeProduct,
  };
};
