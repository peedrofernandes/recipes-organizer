import IRecipeRepository from "@domain/repositories/IRecipeRepository"
import Recipe from "../entities/Recipe"

import IUseCase from "./_IUseCase"

export default class CreateRecipe implements IUseCase<[Recipe], void> {
  constructor(
    private recipeRepository: IRecipeRepository,
    private updateUI: (newRecipe: Recipe) => void
  ) { }

  async execute(recipe: Recipe) {
    await this.recipeRepository.create(recipe)
    this.updateUI(recipe)
  }
}