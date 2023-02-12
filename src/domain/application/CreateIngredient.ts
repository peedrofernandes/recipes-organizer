import Ingredient from "../entities/Ingredient"
import IUseCase from "./_IUseCase"
import { IRepository } from "../repositories/IRepository"

export default class CreateIngredient implements IUseCase<[Ingredient], void> {
  constructor(
    private ingredientRepository: IRepository<Ingredient>,
    private updateUI: (newIngredient: Ingredient) => void
  ) { }

  async execute(ingredient: Ingredient): Promise<void> {
    await this.ingredientRepository.create(ingredient)
    this.updateUI(ingredient)
  }
}