import { AdaptedIngredient, AdaptedRecipe } from "@controllers/AdaptedTypes";
import { Id } from "@domain/value-objects/Id";
import { Values } from "@domain/value-objects/Values";


export type ModalVariants = {
  name: "none";
} | {
  name: "CreateRecipe";
} | {
  name: "UpdateRecipe";
  id: Id;
} | {
  name: "ConfirmRecipeDelete";
  id: Id;
} | {
  name: "CreateIngredient";
} | {
  name: "UpdateIngredient";
  id: Id;
} | {
  name: "ConfirmIngredientDelete";
  id: Id;
}


type CreateIngredientProps = {
  events: {
    handleSubmit: (attr: Values<AdaptedIngredient>) => void;
  }
}
type UpdateIngredientProps = {
  id: number | string;
  events: {
    handleSubmit: (id: Id, attr: Values<AdaptedIngredient>) => void;
  }
}
type ConfirmIngredientDeleteProps = {
  id: Id;
  events: {
    handleConfirm: (id: Id) => void;
  }
}
type CreateRecipeProps = {
  events: {
    handleSubmit: (attr: Values<AdaptedRecipe>) => void;
  }
}
type UpdateRecipeProps = {
  id: Id;
  events: {
    handleSubmit: (id: Id, attr: Values<AdaptedRecipe>) => void;
  }
}
type ConfirmRecipeDeleteProps = {
  id: Id;
  events: {
    handleConfirm: (id: Id) => void;
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