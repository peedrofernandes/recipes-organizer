// DeleteIngredientUseCase.ts

import Ingredient from "../entities/Ingredient";
import { IRepository } from "../repositories/IRepository";
import { Id } from "../value-objects/Id";
import IUseCase from "./IUseCase";

export default class DeleteIngredient implements IUseCase {
  constructor(
    private ingredientRepository: IRepository<Ingredient>,
    private updateUI: (id: Id) => void
  ) { }

  async execute(ingredientId: Id) {
    await this.ingredientRepository.delete(ingredientId);
    this.updateUI(ingredientId);
  }
}