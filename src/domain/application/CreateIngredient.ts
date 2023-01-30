import Ingredient from "../entities/Ingredient";
import IUseCase from "./IUseCase";
import { IRepository } from "../repositories/IRepository";

export default class CreateIngredient implements IUseCase {
  constructor(
    private ingredientRepository: IRepository<Ingredient>
  ) { }

  async execute(ingredient: Ingredient) {
    await this.ingredientRepository.create(ingredient);
  }
}