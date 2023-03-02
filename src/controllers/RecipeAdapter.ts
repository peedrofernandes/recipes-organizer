import Ingredient from "@domain/entities/Ingredient"
import Recipe, { isRecipeOptions } from "@domain/entities/Recipe"
import { IRepository } from "@domain/repositories/IRepository"
import { Id } from "@domain/utilities/types/Id"
import { AdaptedIngredient, AdaptedRecipe, IngredientRecipe, RecipeInput, StoredRecipe } from "./AdaptedTypes"

export class RecipeAdapter {
  constructor(
    private postImage: (file: File) => Promise<string>,
    private retrieveIngredient: (adaptedIngredient: AdaptedIngredient) => Ingredient,
    private adaptIngredient: (ingredient: Ingredient) => AdaptedIngredient,
    private ingredientRepository: IRepository<Ingredient>,
    private getRelationsByRecipeId: (id: Id) => Promise<IngredientRecipe[]>
  ) { }

  // EntityInput => Entity
  async createRecipeEntity(recipeInput: RecipeInput, id?: Id): Promise<Recipe> {
    const { name, description, type, imageFile, initialImageUrl, ingredients } = recipeInput

    const options = {
      description,
      imageUrl: imageFile ? await this.postImage(imageFile) : initialImageUrl || null
    }
  
    return new Recipe({
      id,
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
    const { id, name, type, options, ingredientList, macros, kcal } = recipe

    return {
      id, name, type,
      description: options?.description,
      imageUrl: options?.imageUrl,
      ingredients: (ingredientList ? ingredientList.map(
        item => [this.adaptIngredient(item.ingredient), item.totalGrams]
      ) : undefined),
      macros: (macros ? [
        macros.proteins, macros.carbs, macros.fats
      ] : undefined),
      kcal
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

  // // StoredEntity => AdaptedEntity
  // async storedToAdapted(storedRecipe: StoredRecipe): Promise<AdaptedRecipe> {
  //   if (!storedRecipe.ingredients)
  //     return { ...storedRecipe, ingredients: undefined }

  //   const ingredients: [AdaptedIngredient, number][] = await Promise.all(
  //     storedRecipe.ingredients.map(async ([id, qty]) =>
  //       [this.adaptIngredient(await this.getIngredientById(id)), qty]
  //     ))

  //   return {
  //     ...storedRecipe,
  //     ingredients
  //   }
  // }

  // StoredEntity => Entity
  async storedToEntity(storedRecipe: StoredRecipe): Promise<Recipe> {
    const { id, name, type, description, imageUrl } = storedRecipe

    const options = { description, imageUrl }

    const relations = await this.getRelationsByRecipeId(storedRecipe.id)

    return new Recipe({
      id: id,
      name: name,
      type: type,
      options: (isRecipeOptions(options) ? options : undefined),
      ingredientList: (relations.length > 0 ? await Promise.all(relations.map(
        async r => ({
          ingredient: await this.ingredientRepository.find(r.ingredientId),
          totalGrams: r.ingredientGrams
        })
      )) : undefined)
    })
  }

  entityToStored(recipe: Recipe): StoredRecipe {
    const { id, type, name, options, macros, kcal } = recipe

    return {
      id, name, type,
      description: options?.description,
      imageUrl: options?.imageUrl,
      macros: (macros ?
        [macros.proteins, macros.carbs, macros.fats]
        : undefined),
      kcal
    }
  }

  recipesToRelations(recipes: Recipe[]): IngredientRecipe[] {
    const relations: IngredientRecipe[] = recipes.reduce((relations, recipe) => {
      const recipeRelations: IngredientRecipe[] = recipe.ingredientList?.map(
        item => ({
          recipeId: recipe.id,
          ingredientId: item.ingredient.id,
          ingredientGrams: item.totalGrams
        })
      ) || []
      return [...relations, ...recipeRelations]
    }, [] as IngredientRecipe[])

    return relations
  }
}