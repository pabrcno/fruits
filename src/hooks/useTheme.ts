import { useState } from "react";
import * as fruits from "../components/fruits";
import * as tools from "../components/tools";
export enum ETheme {
  TOOLS = "tools",
  FRUITS = "fruits",
  DEFAULT = "default",
}

type TTheme = {
  name: ETheme;
  innerGradientColor: string;
  outerGradientColor: string;
  meshes: any[];
  title: string;
  shadowColor: string;
};

const DEFAULT_THEME: TTheme = {
  name: ETheme.DEFAULT,
  innerGradientColor: "#d8d",
  outerGradientColor: "#a8a",
  meshes: Object.values(fruits),
  title: "Fruit Store",
  shadowColor: "#a8a",
};

//TODO: Add context
export const useTheme = () => {
  const [theme, setTheme] = useState<TTheme>(DEFAULT_THEME);

  const setToolsTheme = () => {
    setTheme({
      name: ETheme.TOOLS,
      innerGradientColor: "#191716",
      outerGradientColor: "#3D348B",
      meshes: Object.values(tools),
      title: "Hardware Store",
      shadowColor: "#202020",
    });
  };

  const setFruitsTheme = () => {
    setTheme({
      name: ETheme.FRUITS,
      innerGradientColor: "#d8d",
      outerGradientColor: "#a8a",
      meshes: Object.values(fruits),
      title: "Fruit Store",

      shadowColor: "#a8a",
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
  };
};
