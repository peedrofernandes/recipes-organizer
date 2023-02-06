import Recipe from "../entities/Recipe"
import IUseCase from "./IUseCase"

export default class GenerateJson implements IUseCase<[Recipe[]], unknown> {
  constructor(
    private turnRecipesIntoJson: (recipes: Recipe[]) => unknown
  ) { }

  execute(recipes: Recipe[]) {
    return this.turnRecipesIntoJson(recipes)
  }
}