import React, { createContext, ReactNode, useReducer } from "react"
import { AdaptedIngredient, AdaptedRecipe } from "@controllers/AdaptedTypes"
import { Id } from "@domain/utilities/types/Id"

type DataState = {
  passedTutorial: boolean
  loading: {
    fetchIngredients: boolean
    createIngredient: boolean
    updateIngredient: Id | null
    deleteIngredient: boolean
    fetchRecipes: boolean
    createRecipe: boolean
    updateRecipe: Id | null
    deleteRecipe: boolean
  }
  ingredients: AdaptedIngredient[]
  recipes: AdaptedRecipe[]
  selectedRecipes: [AdaptedRecipe, Date][]
}

type DataAction = {
  type:
    | "LOADING_FETCH_INGREDIENTS"
    | "LOADING_CREATE_INGREDIENT"
    | "LOADING_DELETE_INGREDIENT"
    | "LOADING_FETCH_RECIPES"
    | "LOADING_CREATE_RECIPE"
    | "LOADING_DELETE_RECIPE"
    | "PASSED_TUTORIAL"
    | "RETURN_TO_TUTORIAL"
} | {
  type: "LOADING_UPDATE_INGREDIENT"
  payload: { id: Id }
} | {
  type: "LOADING_UPDATE_RECIPE"
  payload: { id: Id }
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
} | {
  type: "SET_SELECTED_RECIPES_WITH_DATES"
  payload: { recipes: [AdaptedRecipe, Date][] }
} | {
  type: "ADD_DATA"
  payload: { ingredients: AdaptedIngredient[], recipes: AdaptedRecipe[] }
}

function dataReducer(state: DataState, action: DataAction): DataState {
  switch (action.type) {
  case "PASSED_TUTORIAL":
    localStorage.setItem("PASSED_TUTORIAL", "true")    
    return {
      ...state,
      passedTutorial: true
    }
  case "RETURN_TO_TUTORIAL":
    localStorage.setItem("PASSED_TUTORIAL", "false")
    return {
      ...state,
      passedTutorial: false
    }
  case "LOADING_FETCH_INGREDIENTS":
    return {
      ...state,
      loading: { ...state.loading, fetchIngredients: true }
    }
  case "LOADING_CREATE_INGREDIENT": {
    return {
      ...state,
      loading: { ...state.loading, createIngredient: true }
    }
  }
  case "LOADING_UPDATE_INGREDIENT": {
    return {
      ...state,
      loading: { ...state.loading, updateIngredient: action.payload.id }
    }
  }
  case "LOADING_DELETE_INGREDIENT": {
    return {
      ...state,
      loading: { ...state.loading, deleteIngredient: true }
    }
  }
  case "LOADING_FETCH_RECIPES": {
    return {
      ...state,
      loading: { ...state.loading, fetchRecipes: true }
    }
  }
  case "LOADING_CREATE_RECIPE": {
    return {
      ...state,
      loading: { ...state.loading, createRecipe: true }
    }
  }
  case "LOADING_UPDATE_RECIPE": {
    return {
      ...state,
      loading: { ...state.loading, updateRecipe: action.payload.id }
    }
  }
  case "LOADING_DELETE_RECIPE": {
    return {
      ...state,
      loading: { ...state.loading, deleteRecipe: true }
    }
  }
  case "SET_INGREDIENTS": {
    return {
      ...state,
      loading: {
        ...state.loading,
        createIngredient: false,
        updateIngredient: null,
        deleteIngredient: false,
        fetchIngredients: false
      },
      ingredients: action.payload.ingredients
    }
  }
  case "ADD_INGREDIENT": {   
    return {
      ...state,
      loading: { ...state.loading, createIngredient: false },
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
      
    // Update the affected recipes from the ingredient change
    state.recipes.forEach(recipe => {
      
      // Update the values of the new ingredient inside the recipes
      recipe.ingredients = recipe.ingredients?.map(
        item => item[0].id === action.payload.ingredient.id
          ? [action.payload.ingredient, item[1]]
          : item
      ) || undefined
    })
      

    return {
      ...state,
      loading: { ...state.loading, updateIngredient: null },
      ingredients: newIngredients
    }
  }
  case "DELETE_INGREDIENT": {
    state.recipes.forEach(recipe => {
      recipe.ingredients = recipe.ingredients?.filter(i => i[0].id !== action.payload.id)
    })

    return {
      ...state,
      loading: { ...state.loading, deleteIngredient: false },
      ingredients: state.ingredients.filter(i => i.id !== action.payload.id)
    }
  }
  case "SET_RECIPES": {
    return {
      ...state,
      loading: {
        ...state.loading,
        fetchRecipes: false,
        createRecipe: false,
        updateRecipe: null,
        deleteRecipe: false
      },
      recipes: action.payload.recipes
    }
  }
  case "ADD_RECIPE": {
    return {
      ...state,
      loading: { ...state.loading, createRecipe: false },
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
      loading: { ...state.loading, updateRecipe: null },
      recipes: newRecipes
    }
  }
  case "DELETE_RECIPE": {
    return {
      ...state,
      loading: { ...state.loading, deleteRecipe: false },
      recipes: state.recipes.filter(r => r.id !== action.payload.id)
    }
  }
  case "SET_SELECTED_RECIPES_WITH_DATES": {
    return {
      ...state,
      selectedRecipes: action.payload.recipes
    }
  }
  case "ADD_DATA": {
    console.log("ADD_DATA was dispatched! Data: ")
    console.table(action.payload)
    console.table(action.payload.recipes)
    console.table(action.payload.ingredients)
      
    return {
      ...state,
      recipes: [ ...state.recipes, ...action.payload.recipes ],
      ingredients: [ ...state.ingredients, ...action.payload.ingredients ]
    }
  }
  default: {
    return state
  }
  }
}

const initialState: DataState = {
  passedTutorial: JSON.parse(localStorage.getItem("PASSED_TUTORIAL") as string) ?? false,
  loading: {
    fetchIngredients: false,
    createIngredient: false,
    updateIngredient: null,
    deleteIngredient: false,
    fetchRecipes: false,
    createRecipe: false,
    updateRecipe: null,
    deleteRecipe: false
  },
  ingredients: [],
  recipes: [],
  selectedRecipes: []
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