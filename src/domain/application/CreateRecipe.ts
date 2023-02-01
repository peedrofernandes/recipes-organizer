import Recipe from "../entities/Recipe";
import { IRepository } from "../repositories/IRepository";
import { Attributes } from "../value-objects/Attributes";
import IUseCase from "./IUseCase";

export default class CreateRecipe implements IUseCase {
  constructor(
    private recipeRepository: IRepository<Recipe>,
    private updateUI: (newRecipe: Recipe) => void
  ) { }

  async execute(recipeAttributes: Attributes<Recipe>) {
    const newRecipe = new Recipe({ ...recipeAttributes });
    await this.recipeRepository.create(newRecipe);
    this.updateUI(newRecipe);
  }
}