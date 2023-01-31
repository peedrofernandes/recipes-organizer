import Ingredient from "../entities/Ingredient";
import { IRepository } from "../repositories/IRepository";
import { Attributes } from "../value-objects/Attributes";
import { Id } from "../value-objects/Id";
import IUseCase from "./IUseCase";

export default class UpdateIngredient implements IUseCase {
  constructor(
    private ingredientRepository: IRepository<Ingredient>
  ) { }

  async execute(ingredientId: Id, newAttributes: Attributes<Ingredient>) {
    if (!newAttributes.name)
      throw new Error("Ingredient must have a name!");

    await this.ingredientRepository.update(ingredientId, newAttributes);
  }
}