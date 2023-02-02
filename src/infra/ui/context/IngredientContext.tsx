import React from "react";

import { AdaptedIngredient } from "@controllers/AdaptedTypes";
import { createContext, ReactNode, useState } from "react";

type IngredientContextType = {
  ingredients: AdaptedIngredient[],
  setIngredients: (ingredients: AdaptedIngredient[]) => void
}

export const IngredientContext = createContext<IngredientContextType>(undefined!);

export default function IngredientContextProvider(props: { children: ReactNode }) {
  const [ingredients, setIngredients] = useState<AdaptedIngredient[]>([]);

  return (
    <IngredientContext.Provider value={{ ingredients, setIngredients }}>
      {props.children}
    </IngredientContext.Provider>
  )
}