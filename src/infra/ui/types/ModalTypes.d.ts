import { AdaptedIngredient, AdaptedRecipe } from "@controllers/AdaptedTypes";
import { Attributes } from "@domain/value-objects/Attributes";
import { Id } from "@domain/value-objects/Id";


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
    handleSubmit: (attr: Attributes<AdaptedIngredient>) => void;
  }
}
type UpdateIngredientProps = {
  id: number | string;
  events: {
    handleSubmit: (id: Id, attr: Attributes<AdaptedIngredient>) => void;
  }
}
type ConfirmIngredientDeleteProps = {
  id: number | string;
  events: {
    handleConfirm: (id: Id) => void;
  }
}
type CreateRecipeProps = {
  events: {
    handleSubmit: (attr: Attributes<AdaptedRecipe>) => void;
  }
}
type UpdateRecipeProps = {
  id: number | string;
  events: {
    handleSubmit: (id: Id, attr: Attributes<AdaptedRecipe>) => void;
  }
}
type ConfirmRecipeDeleteProps = {
  id: number | string;
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