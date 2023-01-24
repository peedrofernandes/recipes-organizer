import Recipe from "../domain/Recipe";
import IUseCase from "./IUseCase";

export default class SubmitRecipe implements IUseCase {
  constructor(
    private submitMethod: (recipe: Recipe) => Promise<void>,
  ) { }

  async execute(recipe: Recipe) {
    await this.submitMethod(recipe)
  }
}