import Ingredient from "@domain/entities/Ingredient"
import Recipe, { isRecipeOptions } from "@domain/entities/Recipe"
import { AdaptedIngredient, AdaptedRecipe, RecipeInput } from "./AdaptedTypes"

export class RecipeAdapter {
  constructor(
    private postImage: (file: File) => Promise<string>,
    private retrieveIngredient: (adaptedIngredient: AdaptedIngredient) => Ingredient,
    private adaptIngredient: (ingredient: Ingredient) => AdaptedIngredient
  ) { }

  // EntityInput => Entity
  async createRecipeEntity(recipeInput: RecipeInput): Promise<Recipe> {
    const { name, description, type, imageFile, ingredients } = recipeInput

    const options = {
      description,
      imageUrl: imageFile ? await this.postImage(imageFile) : null
    }
  
    return new Recipe({
      name,
      type,
      options: (isRecipeOptions(options) ? options : undefined),
      ingredientList: (ingredients ? ingredients.map(
        i => ({ ingredient: this.retrieveIngredient(i[0]), totalGrams: i[1] })
      ) : undefined)
    })
  }

  // Entity => AdaptedEntity
  adaptRecipe(recipe: Recipe): AdaptedRecipe {
    const { id, name, type, options, ingredientList, macros } = recipe

    return {
      id, name, type,
      description: options?.description,
      imageUrl: options?.imageUrl,
      ingredients: (ingredientList ? ingredientList.map(
        item => [this.adaptIngredient(item.ingredient), item.totalGrams]
      ) : undefined),
      macros: (macros ? [
        macros.proteins, macros.carbs, macros.fats
      ] : undefined)
    }
  }

  // AdaptedEntity => Entity
  retrieveRecipe(adaptedRecipe: AdaptedRecipe): Recipe {
    const { id, name, type, description, imageUrl, ingredients } = adaptedRecipe

    const options = { description, imageUrl }

    return new Recipe({
      id, name, type,
      options: (isRecipeOptions(options) ? options : undefined),
      ingredientList: (ingredients ? ingredients.map(
        item => ({ ingredient: this.retrieveIngredient(item[0]), totalGrams: item[1] })
      ) : undefined)
    })
  }
}