import { Id } from "@domain/utilities/types/Id"

// export type IngredientInputValues = {
//   name: string;
//   description?: string;
//   imageFile?: File;
//   macros?: [number, number, number, number];
// }

// export type RecipeInputValues = {
//   name: string;
//   type: "Week" | "Weekend" | "Both";
//   description?: string;
//   imageFile?: File;
//   ingredients?: [Ingredient, number][];
//   macros?: [number, number, number]
// }

export type AdaptedIngredient = {
  id: Id,
  name: string,
  description?: string,
  imageFile?: File,
  imageUrl?: string,
  macros?: [number, number, number, number]
}

export type AdaptedRecipe = {
  id: Id,
  name: string,
  type: "Week" | "Weekend" | "Both",
  description?: string,
  imageFile?: File,
  imageUrl?: string,
  ingredients?: [AdaptedIngredient, number][],
  macros?: [number, number, number]
}
