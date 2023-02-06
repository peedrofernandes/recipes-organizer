import { Values } from "@domain/utilities/types/Values"
import Recipe from "../entities/Recipe"
import { IRepository } from "../repositories/IRepository"

import IUseCase from "./IUseCase"

export default class CreateRecipe implements IUseCase<[Values<Recipe>], void> {
  constructor(
    private recipeRepository: IRepository<Recipe>,
    private updateUI: (newRecipe: Recipe) => void
  ) { }

  async execute(recipeAttributes: Values<Recipe>) {
    const newRecipe = new Recipe({ ...recipeAttributes })
    await this.recipeRepository.create(newRecipe)
    this.updateUI(newRecipe)
  }
}