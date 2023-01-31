import Ingredient from "../entities/Ingredient";
import Recipe from "../entities/Recipe";
import { IRepository } from "../repositories/IRepository";
import ExtractIngredients from "../services/ExtractIngredients";
import IUseCase from "./IUseCase";

export default class LoadRecipesFromJsonUseCase implements IUseCase {
  constructor(
    private ingredientRepository: IRepository<Ingredient>,
    private recipeRepository: IRepository<Recipe>
  ) { }
  
  async execute(jsonFile: any) {
    const recipes = await this.recipeRepository.load(jsonFile);
    const ingredients = ExtractIngredients(recipes);

    await this.recipeRepository.create(recipes);
    await this.ingredientRepository.create(ingredients);
  }
}