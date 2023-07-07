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

const FRUIT_SCALE = 0.001;
export const MainScreen = () => {
  const fruits = [
    <Apple scale={FRUIT_SCALE} />,
    <Appercut scale={FRUIT_SCALE} />,
    <Cherry scale={FRUIT_SCALE} />,
    <Avocado scale={FRUIT_SCALE} rotation={[1, 4, 0]} />,
    <Banana scale={FRUIT_SCALE} />,
    <Chestnut scale={FRUIT_SCALE} />,
    <LemonCut scale={FRUIT_SCALE} />,
    <Lemon scale={FRUIT_SCALE} />,
    <Lime scale={FRUIT_SCALE} rotation={[1, 4, 0]} />,
    <MelonCut scale={FRUIT_SCALE} />,
    <Melon scale={FRUIT_SCALE} />,
    <Peach scale={FRUIT_SCALE} />,
    <Pear scale={FRUIT_SCALE} />,
    <Pineapple scale={FRUIT_SCALE} />,
    <Pumpkin scale={FRUIT_SCALE} />,
    <Plum scale={FRUIT_SCALE} />,
    <Strawberry scale={FRUIT_SCALE} />,
    <WatermelonCut scale={FRUIT_SCALE} rotation={[1, 4, 0]} />,
    <Watermelon scale={FRUIT_SCALE} />,
  ];

  return (
    <Canvas
      style={{
        height: "90vh",
      }}
    >
      <Background fruits={fruits} />
    </Canvas>
  );
};
