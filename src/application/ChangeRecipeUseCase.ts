import Recipe, { IngredientList, RecipeType } from "../domain/Recipe";
import IUseCase from "./IUseCase";

export default class ChangeRecipeUseCase implements IUseCase {
  constructor(
    private persistMethod: (recipe: Recipe) => Promise<void>,
  ) { }
  
  async execute(
    id: number | string,
    name: string,
    description: string,
    type: RecipeType,
    ingredientList: IngredientList
  ) {
    const newRecipe = new Recipe(id, name, description, type, ingredientList)
    await this.persistMethod(newRecipe)
  }
}