export type ModalVariants = {
  name: "none";
} | {
  name: "CreateRecipe";
} | {
  name: "UpdateRecipe";
  id: number | string;
} | {
  name: "ConfirmRecipeDelete";
  id: number | string;
} | {
  name: "CreateIngredient";
} | {
  name: "UpdateIngredient";
  id: number | string;
} | {
  name: "ConfirmIngredientDelete";
  id: number | string;
}

export type ComponentModalVariants = {
  None: () => null,
  CreateIngredient: () => JSX.Element,
  UpdateIngredient: (props: { id: number | string }) => JSX.Element,
  ConfirmIngredientDelete: (props: { id: number | string }) => JSX.Element,
  CreateRecipe: () => JSX.Element,
  UpdateRecipe: (props: { id: number | string }) => JSX.Element,
  ConfirmRecipeDelete: (props: { id: number | string }) => JSX.Element
}