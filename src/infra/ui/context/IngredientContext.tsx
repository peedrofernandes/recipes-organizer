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

  const handleSetIngredients = (ingredients: AdaptedIngredient[]) => {
    setIngredients(ingredients);
    console.log(`Ingredients state changed! New length: [${ingredients.length}].`);
  }

  return (
    <IngredientContext.Provider value={{
      ingredients,
      setIngredients: handleSetIngredients
    }}>
      {props.children}
    </IngredientContext.Provider>
  )
}