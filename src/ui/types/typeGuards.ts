import { ModalOptions } from "./ModalOptions";

export function modalHasId(modal: ModalOptions): modal is {
  variant:
  | "UpdateRecipe"
  | "ConfirmRecipeDelete"
  | "UpdateIngredient"
  | "ConfirmIngredientDelete",
  id: number | string
} {
  const allowedVariants = ["UpdateRecipe", "ConfirmRecipeDelete", "UpdateIngredient", "ConfirmIngredientDelete"];

  return allowedVariants.some((val) => val === modal.variant)
}