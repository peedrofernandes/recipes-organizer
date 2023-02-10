import React, { createContext, ReactNode, useReducer } from "react"
import { AdaptedIngredient, AdaptedRecipe } from "@controllers/AdaptedTypes"
import { Id } from "@domain/utilities/types/Id"

type DataState = {
  loadingIngredients: boolean
  ingredients: AdaptedIngredient[]
  loadingRecipes: boolean
  recipes: AdaptedRecipe[]
}

type DataAction = {
  type: "TOGGLE_LOADING_INGREDIENTS"
} | {
  type: "TOGGLE_LOADING_RECIPES"
} | {
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
  case "TOGGLE_LOADING_INGREDIENTS": {
    return {
      ...state,
      loadingIngredients: true
    }
  }
  case "TOGGLE_LOADING_RECIPES": {
    return {
      ...state,
      loadingIngredients: true
    }
  }
  case "SET_INGREDIENTS": {
    return {
      ...state,
      loadingIngredients: false,
      ingredients: action.payload.ingredients
    }
  }
  case "ADD_INGREDIENT": {   
    return {
      ...state,
      loadingIngredients: false,
      ingredients: [...state.ingredients, action.payload.ingredient]
    }
  }
  case "UPDATE_INGREDIENT": {
    const indexFound = state.ingredients.findIndex(
      i => i.id === action.payload.ingredient.id
    )
    if (indexFound === -1)
      throw new Error("Index of updating ingredient was not found!")
    const newIngredients = [...state.ingredients]
    newIngredients[indexFound] = action.payload.ingredient
    return {
      ...state,
      loadingIngredients: false,
      ingredients: newIngredients
    }
  }
  case "DELETE_INGREDIENT": {
    return {
      ...state,
      loadingRecipes: false,
      ingredients: state.ingredients.filter(i => i.id !== action.payload.id)
    }
  }
  case "SET_RECIPES": {
    return {
      ...state,
      loadingRecipes: false,
      recipes: action.payload.recipes
    }
  }
  case "ADD_RECIPE": {
    return {
      ...state,
      loadingRecipes: false,
      recipes: [...state.recipes, action.payload.recipe]
    }
  }
  case "UPDATE_RECIPE": {
    const indexFound = state.recipes.findIndex(r => r.id === action.payload.recipe.id) 
    if (indexFound === -1)
      throw new Error("Index of updating recipe was not found!")
    const newRecipes = [...state.recipes]
    newRecipes[indexFound] = action.payload.recipe
    return {
      ...state,
      loading: false,
      recipes: newRecipes
    }
  }
  case "DELETE_RECIPE": {
    return {
      ...state,
      loading: false,
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
  loadingIngredients: false,
  recipes: [],
  loadingRecipes: false
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