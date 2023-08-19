import { useState } from "react";

import * as legos from "../components/legos";

export enum ETheme {
  TOOLS = "tools",
  FRUITS = "fruits",
  DEFAULT = "default",
  LEGOS = "legos",
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
  name: ETheme.LEGOS,
  innerGradientColor: "#191716",
  outerGradientColor: "#000",
  // values of legos but twice to have more legos
  meshes: Object.values(legos),
  title: "",
  shadowColor: "#202020",
};

//TODO: Add context in order to share over screens
export const useTheme = () => {
  const [theme, setTheme] = useState<TTheme>({
    name: ETheme.LEGOS,
    innerGradientColor: "#191716",
    outerGradientColor: "#000",
    // values of legos but twice to have more legos
    meshes: Object.values(legos),
    title: "",
    shadowColor: "#202020",
  });

  const setDefaultTheme = () => {
    setTheme({
      name: ETheme.LEGOS,
      innerGradientColor: "#191716",
      outerGradientColor: "#000",
      // values of legos but twice to have more legos
      meshes: Object.values(legos),
      title: "",
      shadowColor: "#202020",
    });
  };

  return {
    theme,
    setDefaultTheme,
  };
};
