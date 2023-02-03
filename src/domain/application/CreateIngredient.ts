import Ingredient from "../entities/Ingredient";
import IUseCase from "./IUseCase";
import { IRepository } from "../repositories/IRepository";
import { Values } from "@domain/value-objects/Values";

export default class CreateIngredient implements IUseCase {
  constructor(
    private ingredientRepository: IRepository<Ingredient>,
    private updateUI: (newIngredient: Ingredient) => void
  ) { }

  async execute(ingredientValues: Values<Ingredient>) {
    const newIngredient = new Ingredient({ ...ingredientValues });
    await this.ingredientRepository.create(newIngredient);
    this.updateUI(newIngredient);
  }
}