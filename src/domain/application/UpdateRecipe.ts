import { Id } from "../value-objects/Id";
import Recipe from "../entities/Recipe";
import IUseCase from "./IUseCase";
import { IRepository } from "../repositories/IRepository";
import { Attributes } from "../value-objects/Attributes";

export default class UpdateRecipe implements IUseCase {
  constructor(
    private recipeRepository: IRepository<Recipe>,
    private updateUI: (newRecipe: Recipe) => void
  ) { }

  async execute(recipeId: Id, newAttributes: Attributes<Recipe>) {
    await this.recipeRepository.update(recipeId, newAttributes);
    const newRecipe = await this.recipeRepository.find(recipeId);
    this.updateUI(newRecipe);
  }
}