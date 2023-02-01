import Ingredient from "../entities/Ingredient";
import { IRepository } from "../repositories/IRepository";
import { Attributes } from "../value-objects/Attributes";
import { Id } from "../value-objects/Id";
import IUseCase from "./IUseCase";

export default class UpdateIngredient implements IUseCase {
  constructor(
    private ingredientRepository: IRepository<Ingredient>,
    private updateUI: (newIngredient: Ingredient) => void
  ) { }

  async execute(ingredientId: Id, newAttributes: Attributes<Ingredient>) {
    await this.ingredientRepository.update(ingredientId, newAttributes);
    const newIngredient = await this.ingredientRepository.find(ingredientId);
    this.updateUI(newIngredient);
  }
}