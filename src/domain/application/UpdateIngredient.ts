import { Values } from "@domain/utilities/types/Values"
import Ingredient from "../entities/Ingredient"
import { IRepository } from "../repositories/IRepository"
import { Id } from "../utilities/types/Id"
import IUseCase from "./IUseCase"

export default class UpdateIngredient implements IUseCase<[Id, Values<Ingredient>],void> {
  constructor(
    private ingredientRepository: IRepository<Ingredient>,
    private updateUI: (newIngredient: Ingredient) => void
  ) { }

  async execute(ingredientId: Id, newValues: Values<Ingredient>) {
    await this.ingredientRepository.update(ingredientId, newValues)
    const newIngredient = await this.ingredientRepository.find(ingredientId)
    this.updateUI(newIngredient)
  }
}