import Recipe from "../entities/Recipe";
import { IRepository } from "../repositories/IRepository";
import { Id } from "../value-objects/Id";
import IUseCase from "./IUseCase";

export default class DeleteRecipe implements IUseCase {
  constructor(
    private recipeRepository: IRepository<Recipe>
  ) { }

  async execute(recipeId: Id) {
    await this.recipeRepository.delete(recipeId);
  }
}