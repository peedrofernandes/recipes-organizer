import { Id } from "@domain/value-objects/Id";
import { ModalVariants, ComponentModalVariants } from "./ModalTypes";

type ShouldHaveIdVariants =
  | "UpdateRecipe"
  | "ConfirmRecipeDelete"
  | "UpdateIngredient"
  | "ConfirmIngredientDelete";

export function modalHasId(modal: ModalVariants): modal is {
  name: ShouldHaveIdVariants;
  id: Id;
} {
  const allowedVariants = ["UpdateRecipe", "ConfirmRecipeDelete", "UpdateIngredient", "ConfirmIngredientDelete"];

  return allowedVariants.some((val) => val === modal.name)
}