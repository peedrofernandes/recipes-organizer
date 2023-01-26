export type ModalOptions = {
  variant: "none";
} | {
  variant: "CreateRecipe";
} | {
  variant: "UpdateRecipe";
  id: number | string;
} | {
  variant: "ConfirmRecipeDelete";
  id: number | string;
} | {
  variant: "CreateIngredient";
} | {
  variant: "UpdateIngredient";
  id: number | string;
} | {
  variant: "ConfirmIngredientDelete";
  id: number | string;
}