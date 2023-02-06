import { Id } from "../utilities/types/Id"
import Recipe from "../entities/Recipe"
import IUseCase from "./IUseCase"
import { IRepository } from "../repositories/IRepository"
import { Values } from "@domain/utilities/types/Values"

export default class UpdateRecipe implements IUseCase<[Id, Values<Recipe>],void> {
  constructor(
    private recipeRepository: IRepository<Recipe>,
    private updateUI: (newRecipe: Recipe) => void
  ) { }

  async execute(recipeId: Id, newValues: Values<Recipe>) {
    await this.recipeRepository.update(recipeId, newValues)
    const newRecipe = await this.recipeRepository.find(recipeId)
    this.updateUI(newRecipe)
  }
}