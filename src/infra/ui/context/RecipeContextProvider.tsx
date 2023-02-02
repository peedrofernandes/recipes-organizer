import { AdaptedRecipe } from "@controllers/AdaptedTypes";
import React, { createContext, ReactNode, useState } from "react";

type RecipeContextType = {
  recipes: AdaptedRecipe[];
  setRecipes: (recipes: AdaptedRecipe[]) => void;
}

export const RecipeContext = createContext<RecipeContextType>(undefined!);

export default function RecipeContextProvider(props: { children: ReactNode }) {
  const [recipes, setRecipes] = useState<AdaptedRecipe[]>([]);

  return (
    <RecipeContext.Provider value={{ recipes, setRecipes }}>
      {props.children}
    </RecipeContext.Provider>
  )
}