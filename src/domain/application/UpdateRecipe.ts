import Recipe from "../entities/Recipe"
import IUseCase from "./_IUseCase"
import { IRepository } from "../repositories/IRepository"

export default class UpdateRecipe implements IUseCase<[Recipe],void> {
  constructor(
    private recipeRepository: IRepository<Recipe>,
    private updateUI: (newRecipe: Recipe) => void
  ) { }

  async execute(recipe: Recipe) {
    await this.recipeRepository.update(recipe)
    const newRecipe = await this.recipeRepository.find(recipe.id)
    this.updateUI(newRecipe)
  }
}