import { useState } from "react";
import * as fruits from "../components/fruits";
import * as tools from "../components/tools";
import { Fire } from "../components/Fire";
export enum ETheme {
  TOOLS = "tools",
  FRUITS = "fruits",
  FIRE = "fire",
  DEFAULT = "default",
}

type TTheme = {
  name: ETheme;
  innerGradientColor: string;
  outerGradientColor: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  meshes: any[];
  title: string;
  shadowColor: string;
};

const DEFAULT_THEME: TTheme = {
  name: ETheme.DEFAULT,
  innerGradientColor: "#191716",
  outerGradientColor: "#3D348B",
  meshes: Object.values(fruits),
  title: "Paulo's Fruit Store",
  shadowColor: "#202020",
};

//TODO: Add context in order to share over screens
export const useTheme = () => {
  const [theme, setTheme] = useState<TTheme>(DEFAULT_THEME);

  const setToolsTheme = () => {
    setTheme({
      name: ETheme.TOOLS,
      innerGradientColor: "#191716",
      outerGradientColor: "#3D348B",
      meshes: Object.values(tools),
      title: "Paulo's Tool Store",
      shadowColor: "#202020",
    });
  };

  const setFruitsTheme = () => {
    setTheme({
      name: ETheme.FRUITS,
      innerGradientColor: "#191716",
      outerGradientColor: "#3D348B",
      meshes: Object.values(fruits),
      title: "Paulo's Fruit Store",

      shadowColor: "#202020",
    });
  };

  const setFireTheme = () => {
    setTheme({
      name: ETheme.FIRE,
      innerGradientColor: "#000",
      outerGradientColor: "#000",
      meshes: Array.from({ length: 1 }, () => Fire),
      title: "Fire",

      shadowColor: "#202020",
    });
  };
  const setDefaultTheme = () => {
    setTheme(DEFAULT_THEME);
  };

  return {
    theme,
    setToolsTheme,
    setFruitsTheme,
    setDefaultTheme,
    setFireTheme,
  };
};
