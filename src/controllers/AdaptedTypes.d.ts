import { Id } from "@domain/utilities/types/Id"

export type IngredientInput = {
  name: string;
  description?: string;
  imageFile?: File;
  initialImageUrl?: string;
  macros?: [number, number, number, number]
}
export type AdaptedIngredient = {
  id: Id,
  name: string,
  description?: string,
  imageUrl?: string,
  macros?: [number, number, number, number]
}
export type StoredIngredient = {
  id: Id
  name: string
  description?: string
  imageUrl?: string
  macros?: [number, number, number, number]
}

export type RecipeInput = {
  name: string;
  type: "Week" | "Weekend" | "Both";
  description?: string;
  imageFile?: File;
  initialImageUrl?: string;
  ingredients?: [AdaptedIngredient, number][];
}
export type  AdaptedRecipe = {
  id: Id,
  name: string,
  type: "Week" | "Weekend" | "Both",
  description?: string,
  imageUrl?: string,
  ingredients?: [AdaptedIngredient, number][],
  macros?: [number, number, number]
  kcal?: number
}
export type StoredRecipe = {
  id: Id,
  name: string,
  type: "Week" | "Weekend" | "Both",
  description?: string,
  imageUrl?: string,
  macros?: [number, number, number]
  kcal?: number
}

export type IngredientRecipe = {
  ingredientId: Id
  recipeId: Id
  ingredientGrams: number
}
