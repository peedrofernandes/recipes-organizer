import Ingredient, { isIngredientOptions } from "@domain/entities/Ingredient"
import { Values } from "@domain/value-objects/Values"
import { AdaptedIngredient } from "./AdaptedTypes"

export function getIngredientEntity(ingredient: AdaptedIngredient): Ingredient {
  const options = {
    description: ingredient.description,
    imageUrl: ingredient.imageUrl
  }

  return new Ingredient({
    id: ingredient.id,
    name: ingredient.name,
    macros: (ingredient.macros ? {
      proteins: ingredient.macros[0],
      carbs: ingredient.macros[1],
      fats: ingredient.macros[2],
      gramsPerServing: ingredient.macros[3]
    } : undefined),
    options: (isIngredientOptions(options) ? options : undefined)
  });
}

export async function adaptIngredient(
  ingredient: Ingredient,
  getImageFile: (imageUrl: string) => Promise<File>
): Promise<AdaptedIngredient> {
  return {
    id: ingredient.id,
    name: ingredient.name,
    description: ingredient.options?.description,
    imageFile: (ingredient.options?.imageUrl ? (
      await getImageFile(ingredient.options.imageUrl)
    ) : undefined),
    imageUrl: ingredient.options?.imageUrl,
    macros: (ingredient.macros ? [
      ingredient.macros.proteins,
      ingredient.macros.carbs,
      ingredient.macros.fats,
      ingredient.macros.gramsPerServing
    ] : undefined)
  }
}

export function getIngredientEntityValues(
  adaptedValues: Values<AdaptedIngredient>
): Values<Ingredient> {
  const options = {
    description: adaptedValues.description,
    imageUrl: adaptedValues.imageUrl
  }

  return {
    name: adaptedValues.name,
    macros: (adaptedValues.macros ? {
      proteins: adaptedValues.macros[0],
      carbs: adaptedValues.macros[1],
      fats: adaptedValues.macros[2],
      gramsPerServing: adaptedValues.macros[3],
    } : undefined),
    options: (isIngredientOptions(options) ? options : undefined),
  }
}