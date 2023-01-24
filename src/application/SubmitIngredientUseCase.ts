import Ingredient from "../domain/Ingredient";
import IUseCase from "./IUseCase";

export default class SubmitIngredient implements IUseCase {
  constructor(
    private submitMethod: (ingredient: Ingredient) => Promise<void>
  ) { }

  async execute(ingredient: Ingredient) {
    await this.submitMethod(ingredient)
  }
}