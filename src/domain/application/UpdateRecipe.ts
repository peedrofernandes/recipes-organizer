import Recipe from "../entities/Recipe"
import IUseCase from "./_IUseCase"
import IRecipeRepository from "@domain/repositories/IRecipeRepository"

export default class UpdateRecipe implements IUseCase<[Recipe],void> {
  constructor(
    private recipeRepository: IRecipeRepository,
    private updateUI: (newRecipe: Recipe) => void
  ) { }

  async execute(recipe: Recipe) {
    await this.recipeRepository.update(recipe)
    const newRecipe = await this.recipeRepository.find(recipe.id)
    this.updateUI(newRecipe)
  }
}