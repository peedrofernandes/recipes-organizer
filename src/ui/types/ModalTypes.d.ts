import { Ingredient, Recipe } from "./Data";


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


type CreateIngredientProps = {
  events: {
    handleSubmit: (i: Omit<Ingredient, "id">) => void;
  }
}
type UpdateIngredientProps = {
  id: number | string;
  events: {
    handleSubmit: (id: number | string, i: Omit<Ingredient, "id">) => void;
  }
}
type ConfirmIngredientDeleteProps = {
  id: number | string;
  events: {
    handleConfirm: (id: number | string) => void;
  }
}
type CreateRecipeProps = {
  events: {
    handleSubmit: (i: Omit<Recipe, "id">) => void;
  }
}
type UpdateRecipeProps = {
  id: number | string;
  events: {
    handleSubmit: (id: number | string, r: Omit<Recipe, "id">) => void;
  }
}
type ConfirmRecipeDeleteProps = {
  id: number | string;
  events: {
    handleConfirm: (id: number | string) => void;
  }
}
export type ComponentModalVariants = {
  None: () => null,
  CreateIngredient: (props: CreateIngredientProps) => JSX.Element,
  UpdateIngredient: (props: UpdateIngredientProps) => JSX.Element,
  ConfirmIngredientDelete: (props: ConfirmIngredientDeleteProps) => JSX.Element,
  CreateRecipe: (props: CreateRecipeProps) => JSX.Element,
  UpdateRecipe: (props: UpdateRecipeProps) => JSX.Element,
  ConfirmRecipeDelete: (props: ConfirmRecipeDeleteProps) => JSX.Element
}