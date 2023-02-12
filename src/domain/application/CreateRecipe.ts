import Recipe from "../entities/Recipe"
import { IRepository } from "../repositories/IRepository"

import IUseCase from "./_IUseCase"

export default class CreateRecipe implements IUseCase<[Recipe], void> {
  constructor(
    private recipeRepository: IRepository<Recipe>,
    private updateUI: (newRecipe: Recipe) => void
  ) { }

  async execute(recipe: Recipe) {
    await this.recipeRepository.create(recipe)
    this.updateUI(recipe)
  }
}