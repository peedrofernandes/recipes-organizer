import Recipe from "../entities/Recipe";
import { IRepository } from "../repositories/IRepository";
import IUseCase from "./IUseCase";

export default class CreateRecipe implements IUseCase {
  constructor(
    private recipeRepository: IRepository<Recipe>
  ) { }

  async execute(recipe: Recipe) {
    await this.recipeRepository.create(recipe);
  }
}