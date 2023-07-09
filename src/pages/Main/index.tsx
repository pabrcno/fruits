import { Apple } from "../../components/Apple";
import { Appercut } from "../../components/Appercut";
import { Cherry } from "../../components/Cherry";
import { Avocado } from "../../components/Avocado";
import { Banana } from "../../components/Banana";
import { Chestnut } from "../../components/Chestnut";

import { Lemon } from "../../components/Lemon";
import { Lime } from "../../components/Lime";
import { LemonCut } from "../../components/LemmonCut";
import { MelonCut } from "../../components/MelonCut";
import { Melon } from "../../components/Melon";
import { Peach } from "../../components/Peach";
import { Pear } from "../../components/Pear";
import { Pineapple } from "../../components/Pineapple";
import { Pumpkin } from "../../components/Pumpkin";
import { Plum } from "../../components/Plum";
import { Strawberry } from "../../components/Strawberry";
import { WatermelonCut } from "../../components/WatermelonCut";
import { Watermelon } from "../../components/Watermelon";
import { Background } from "../../components/Background";
import { Canvas } from "@react-three/fiber";
import { useState } from "react";

const BACKGROUND_FRUIT_SCALE = 0.0005;
export const MainScreen = () => {
  const [fruitScale, setFruitScale] = useState(BACKGROUND_FRUIT_SCALE);
  const fruits = [
    <Apple scale={fruitScale} />,
    <Appercut scale={fruitScale} />,
    <Cherry scale={fruitScale} />,
    <Avocado scale={fruitScale} rotation={[1, 4, 0]} />,
    <Banana scale={fruitScale} />,
    <Chestnut scale={fruitScale} />,
    <LemonCut scale={fruitScale} />,
    <Lemon scale={fruitScale} />,
    <Lime scale={fruitScale} rotation={[1, 4, 0]} />,
    <MelonCut scale={fruitScale} />,
    <Melon scale={fruitScale} />,
    <Peach scale={fruitScale} />,
    <Pear scale={fruitScale} />,
    <Pineapple scale={fruitScale} />,
    <Pumpkin scale={fruitScale} />,
    <Plum scale={fruitScale} />,
    <Strawberry scale={fruitScale} />,
    <WatermelonCut scale={fruitScale} rotation={[1, 4, 0]} />,
    <Watermelon scale={fruitScale} />,
    <Apple scale={fruitScale} />,
    <Appercut scale={fruitScale} />,
    <Cherry scale={fruitScale} />,
    <Avocado scale={fruitScale} rotation={[1, 4, 0]} />,
    <Banana scale={fruitScale} />,
    <Chestnut scale={fruitScale} />,
    <LemonCut scale={fruitScale} />,
    <Lemon scale={fruitScale} />,
    <Lime scale={fruitScale} rotation={[1, 4, 0]} />,
    <MelonCut scale={fruitScale} />,
    <Melon scale={fruitScale} />,
    <Peach scale={fruitScale} />,
    <Pear scale={fruitScale} />,
    <Pineapple scale={fruitScale} />,
    <Pumpkin scale={fruitScale} />,
    <Plum scale={fruitScale} />,
    <Strawberry scale={fruitScale} />,
    <WatermelonCut scale={fruitScale} rotation={[1, 4, 0]} />,
    <Watermelon scale={fruitScale} />,
  ];

  return (
    <Canvas
      style={{
        height: "100vh",
      }}
    >
      <fog attach="fog" args={["#ddd", 11, 12]} />
      <Background meshes={fruits} />
    </Canvas>
  );
};
