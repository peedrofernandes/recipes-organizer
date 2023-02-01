import Ingredient from "../entities/Ingredient";
import IUseCase from "./IUseCase";
import { IRepository } from "../repositories/IRepository";
import { Attributes } from "../value-objects/Attributes";

export default class CreateIngredient implements IUseCase {
  constructor(
    private ingredientRepository: IRepository<Ingredient>,
    private updateUI: (newIngredient: Ingredient) => void
  ) { }

  async execute(ingredientAttributes: Attributes<Ingredient>) {
    const newIngredient = new Ingredient({ ...ingredientAttributes });
    await this.ingredientRepository.create(newIngredient);
    this.updateUI(newIngredient);
  }
}