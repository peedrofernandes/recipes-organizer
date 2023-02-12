// DeleteIngredientUseCase.ts

import Ingredient from "../entities/Ingredient"
import { IRepository } from "../repositories/IRepository"
import { Id } from "../utilities/types/Id"
import IUseCase from "./_IUseCase"

export default class DeleteIngredient implements IUseCase<[Id], void> {
  constructor(
    private ingredientRepository: IRepository<Ingredient>,
    private updateUI: (id: Id) => void
  ) { }

  async execute(ingredientId: Id) {
    await this.ingredientRepository.delete(ingredientId)
    this.updateUI(ingredientId)
  }
}