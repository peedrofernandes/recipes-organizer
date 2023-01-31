import Recipe from "../entities/Recipe";
import IUseCase from "./IUseCase";

export default class GenerateJson implements IUseCase {
  constructor(
    private turnRecipesIntoJson: (recipes: Recipe[]) => any
  ) { }

  execute(recipes: Recipe[]) {
    return this.turnRecipesIntoJson(recipes)
  }
}