import Recipe, { isRecipeOptions } from "@domain/entities/Recipe"
import { Values } from "@domain/utilities/types/Values"
import { AdaptedRecipe } from "./AdaptedTypes"

export function getRecipeEntity(adaptedRecipe: AdaptedRecipe) {
  const options = {
    description: adaptedRecipe.description,
    imageUrl: adaptedRecipe.imageUrl
  }

  return new Recipe({
    id: adaptedRecipe.id,
    name: adaptedRecipe.name,
    type: adaptedRecipe.type,
    options: (isRecipeOptions(options) ? options : undefined),
    ingredientList: (adaptedRecipe.ingredients ? adaptedRecipe.ingredients.map(
      i => ({ ingredient: i[0], totalGrams: i[1] })
    ) : undefined)
  })
}

export async function adaptRecipe(
  recipe: Recipe,
  getImageFile: (imageUrl: string) => Promise<File>
): Promise<AdaptedRecipe> {
  return {
    id: recipe.id,
    name: recipe.name,
    type: recipe.type,
    description: recipe.options?.description,
    imageUrl: recipe.options?.imageUrl,
    imageFile: (recipe.options?.imageUrl ? (
      await getImageFile(recipe.options.imageUrl)
    ) : undefined),
    ingredients: (recipe.ingredientList ? recipe.ingredientList.map(
      item => [item.ingredient, item.totalGrams]
    ) : undefined),
    macros: (recipe.macros ? [
      recipe.macros.proteins, recipe.macros.carbs, recipe.macros.fats
    ] : undefined)
  }
}

export function getRecipeEntityValues(
  adaptedAttr: Values<AdaptedRecipe>
): Values<Recipe> {
  const options = {
    description: adaptedAttr.description,
    imageUrl: adaptedAttr.imageUrl
  }

  return {
    name: adaptedAttr.name,
    type: adaptedAttr.type,
    options: (isRecipeOptions(options) ? options : undefined),
    ingredientList: (adaptedAttr.ingredients ? adaptedAttr.ingredients.map(
      item => ({ ingredient: item[0], totalGrams: item[1] })
    ) : undefined),
    macros: (adaptedAttr.macros ? ({
      proteins: adaptedAttr.macros[0],
      carbs: adaptedAttr.macros[1],
      fats: adaptedAttr.macros[2]
    }) : undefined)
  }
}