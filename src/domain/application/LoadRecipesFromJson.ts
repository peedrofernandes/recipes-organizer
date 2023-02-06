import Ingredient from "../entities/Ingredient"
import Recipe from "../entities/Recipe"
import { IRepository } from "../repositories/IRepository"
import IUseCase from "./IUseCase"

import { exists } from "../utilities/algorithms/binarySearch"
import ExtractIngredients from "@domain/utilities/services/ExtractIngredients"

export default class LoadRecipesFromJson implements IUseCase<[unknown], void> {
  constructor(
    private ingredientRepository: IRepository<Ingredient>,
    private recipeRepository: IRepository<Recipe>
  ) { }
  
  async execute(jsonFile: unknown) {
    const recipes = await this.recipeRepository.load(jsonFile)
    const ingredients = ExtractIngredients(recipes)

    const existingRecipes = await this.recipeRepository.findAll()
    const existingIngredients = await this.ingredientRepository.findAll()

    const newRecipes = recipes.filter(
      r => !exists<Recipe>(existingRecipes, r, (r) => r.id)
    )
    const newIngredients = ingredients.filter(
      i => !exists<Ingredient>(existingIngredients, i, (i) => i.id)
    )

    await this.recipeRepository.createList(newRecipes)
    await this.ingredientRepository.createList(newIngredients)

    return { newRecipes, newIngredients }
  }
}