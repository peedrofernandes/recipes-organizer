import Recipe from "../domain/Recipe";
import IUseCase from "./IUseCase";

export default class ChangeRecipeUseCase implements IUseCase {
  constructor(
    private persistMethod: (recipe: Recipe) => Promise<void>,
  ) { }
  
  async execute(recipe: Recipe) {
    await this.persistMethod(recipe)
  }
}