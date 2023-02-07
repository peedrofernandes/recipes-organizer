import React, { createContext, ReactNode, useReducer } from "react"
import { AdaptedIngredient, AdaptedRecipe } from "@controllers/AdaptedTypes"
import { Id } from "@domain/utilities/types/Id"

type DataState = {
  ingredients: AdaptedIngredient[]
  recipes: AdaptedRecipe[]
}

type DataAction = {
  type: "SET_INGREDIENTS"
  payload: {
    ingredients: AdaptedIngredient[]
  }
} | {
  type: "ADD_INGREDIENT"
  payload: {
    ingredient: AdaptedIngredient
  }
} | {
  type: "UPDATE_INGREDIENT"
  payload: {
    ingredient: AdaptedIngredient
  }
} | {
  type: "DELETE_INGREDIENT"
  payload: {
    id: Id
  }
} | {
  type: "SET_RECIPES"
  payload: {
    recipes: AdaptedRecipe[]
  }
} | {
  type: "ADD_RECIPE"
  payload: {
    recipe: AdaptedRecipe
  }
} | {
  type: "UPDATE_RECIPE"
  payload: {
    recipe: AdaptedRecipe
  }
} | {
  type: "DELETE_RECIPE"
  payload: {
    id: Id
  }
}

function dataReducer(state: DataState, action: DataAction) {
  switch (action.type) {
  case "SET_INGREDIENTS": {
    return {
      ...state,
      ingredients: action.payload.ingredients
    }
  }
  case "ADD_INGREDIENT": {   
    return {
      ...state,
      ingredients: [...state.ingredients, action.payload.ingredient]
    }
  }
  case "UPDATE_INGREDIENT": {
    const indexFound = state.ingredients.findIndex(
      i => i.id === action.payload.ingredient.id
    )
    if (indexFound === -1)
      throw new Error("Index of updating ingredient was not found!")
    return {
      ...state,
      ingredients: state.ingredients.splice(indexFound, 1, action.payload.ingredient)
    }
  }
  case "DELETE_INGREDIENT": {
    return {
      ...state,
      ingredients: state.ingredients.filter(i => i.id !== action.payload.id)
    }
  }
  case "SET_RECIPES": {
    return {
      ...state,
      recipes: action.payload.recipes
    }
  }
  case "ADD_RECIPE": {
    return {
      ...state,
      recipes: [...state.recipes, action.payload.recipe]
    }
  }
  case "UPDATE_RECIPE": {
    const indexFound = state.recipes.findIndex(r => r.id === action.payload.recipe.id) 
    if (indexFound === -1)
      throw new Error("Index of updating recipe was not found!")
    return {
      ...state,
      recipes: state.recipes.splice(indexFound, 1, action.payload.recipe)
    }
  }
  case "DELETE_RECIPE": {
    return {
      ...state,
      recipes: state.recipes.filter(r => r.id !== action.payload.id)
    }
  }
  default: {
    return state
  }
  }
}

const initialState: DataState = {
  ingredients: [],
  recipes: []
}

type DataContext = {
  data: DataState;
  dispatch: (action: DataAction) => void
}

export const DataContext = createContext<DataContext>({
  data: initialState,
  dispatch: (action: DataAction) => { return action }
})

export default function DataContextProvider(props: { children: ReactNode }) {
  const [state, dispatch] = useReducer(dataReducer, initialState)
  
  return (
    <DataContext.Provider value={{ data: state, dispatch }}>
      {props.children}
    </DataContext.Provider>
  )
}