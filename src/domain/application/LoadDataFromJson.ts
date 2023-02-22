import Ingredient from "../entities/Ingredient"
import Recipe from "../entities/Recipe"
import { IRepository } from "../repositories/IRepository"
import IUseCase from "./_IUseCase"

import { exists } from "../utilities/algorithms/binarySearch"
import ExtractIngredients from "@domain/utilities/services/ExtractIngredients"
import IRecipeRepository from "@domain/repositories/IRecipeRepository"

export default class LoadDataFromJson implements IUseCase<[unknown], void> {
  constructor(
    private ingredientRepository: IRepository<Ingredient>,
    private recipeRepository: IRecipeRepository,
    private updateUI: (newData: { newIngredients: Ingredient[], newRecipes: Recipe[] }) => void
  ) { }
  
  async execute(jsonFile: unknown) {
    const data = await this.recipeRepository.load(jsonFile)

    // Get unique ingredients from inside the recipes
    const ingredientsFromRecipes = ExtractIngredients(data.recipes)

    // Find every existing recipes and ingredients
    const existingRecipes = await this.recipeRepository.findAll()
    const existingIngredients = await this.ingredientRepository.findAll()

    const newRecipes = data.recipes.filter(
      r => !(exists<Recipe>(existingRecipes, r, r => r.id))
    )

    // Get unique ingredients from recipes, concat with the ingredients that 
    // were not extracted from recipes, and filter this final list 
    // with the existing ingredients
    const newIngredients = ingredientsFromRecipes.concat(data.ingredients.filter(
      i => ingredientsFromRecipes.findIndex(item => item.id === i.id) < 0
    )).filter(i => !(exists<Ingredient>(existingIngredients, i, i => i.id)))

    this.recipeRepository.createList(newRecipes)
    this.ingredientRepository.createList(newIngredients)

    this.updateUI({ newIngredients, newRecipes })
  }
}