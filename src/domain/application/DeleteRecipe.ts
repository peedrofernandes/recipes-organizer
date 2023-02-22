import IRecipeRepository from "@domain/repositories/IRecipeRepository"
import { Id } from "../utilities/types/Id"
import IUseCase from "./_IUseCase"

export default class DeleteRecipe implements IUseCase<[Id], void> {
  constructor(
    private recipeRepository: IRecipeRepository,
    private updateUI: (id: Id) => void
  ) { }

  async execute(recipeId: Id) {
    await this.recipeRepository.delete(recipeId)
    this.updateUI(recipeId)
  }
}