import Ingredient from "@domain/entities/Ingredient"
import Recipe from "../entities/Recipe"
import IUseCase from "./_IUseCase"

export default class GenerateJson implements IUseCase<[Recipe[], Ingredient[]], unknown> {
  constructor(
    private createJson: (recipes: Recipe[], ingredients: Ingredient[]) => unknown
  ) { }

  execute(recipes: Recipe[], ingredients: Ingredient[]) {
    return this.createJson(recipes, ingredients)
  }
}