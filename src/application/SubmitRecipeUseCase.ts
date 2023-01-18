import Recipe, { IngredientList, RecipeType } from "../domain/Recipe";
import IUseCase from "./IUseCase";

export default class SubmitRecipe implements IUseCase {
  constructor(
    private submitMethod: (recipe: Recipe) => Promise<void>,
  ) { }

  async execute(
    id: number | string,
    name: string,
    description: string,
    type: RecipeType,
    ingredientsList: IngredientList
  ) {
    const recipe = new Recipe(id, name, description, type, ingredientsList)
    await this.submitMethod(recipe)
  }
}