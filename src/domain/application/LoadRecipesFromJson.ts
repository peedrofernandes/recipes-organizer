import Ingredient from "../entities/Ingredient"
import Recipe from "../entities/Recipe"
import { IRepository } from "../repositories/IRepository"
import IUseCase from "./_IUseCase"

import { exists } from "../utilities/algorithms/binarySearch"
import ExtractIngredients from "@domain/utilities/services/ExtractIngredients"
import compareStrings from "@domain/utilities/algorithms/compareStrings"

export default class LoadRecipesFromJson implements IUseCase<[unknown], void> {
  constructor(
    private ingredientRepository: IRepository<Ingredient>,
    private recipeRepository: IRepository<Recipe>,
    private updateUI: (newData: { newIngredients: Ingredient[], newRecipes: Recipe[] }) => void
  ) { }
  
  async execute(jsonFile: unknown) {
    console.log("Execute method called at LoadRecipesFromJson usecase!")

    const recipes = await this.recipeRepository.load(jsonFile)
    console.log("Loaded recipes from the file: ", recipes)

    const ingredients = ExtractIngredients(recipes)
    console.log("Ingredients extracted from the recipes: ", ingredients)

    const existingRecipes = await this.recipeRepository.findAll()
    console.log("Existing recipes in the repository: ", existingRecipes)

    const existingIngredients = await this.ingredientRepository.findAll()
    console.log("Existing ingredients in the repository: ", existingIngredients)

    const newRecipes = recipes.filter(
      r => !(exists<Recipe>(existingRecipes, r, r => r.id))
    )
    console.log("newRecipes: ", newRecipes)

    const newIngredients = ingredients.filter(
      i => !(exists<Ingredient>(existingIngredients, i, i => i.id))
    )
    console.log("newIngredients: ", newIngredients)

    this.recipeRepository.createList(newRecipes)
    this.ingredientRepository.createList(newIngredients)

    this.updateUI({ newIngredients, newRecipes })
  }
}