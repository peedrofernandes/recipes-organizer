import Ingredient from "../entities/Ingredient"
import { IRepository } from "../repositories/IRepository"
import { Id } from "../utilities/types/Id"
import IUseCase from "./_IUseCase"

export default class UpdateIngredient implements IUseCase<[Ingredient],void> {
  constructor(
    private ingredientRepository: IRepository<Ingredient>,
    private updateUI: (newIngredient: Ingredient) => void
  ) { }

  async execute(ingredient: Ingredient) {
    await this.ingredientRepository.update(ingredient)
    const newIngredient = await this.ingredientRepository.find(ingredient.id)
    this.updateUI(newIngredient)
  }
}