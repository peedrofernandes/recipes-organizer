import { Id } from "../value-objects/Id";
import Recipe, { isRecipeOptions } from "../entities/Recipe";
import IUseCase from "./IUseCase";
import { IRepository } from "../repositories/IRepository";
import { Attributes } from "../value-objects/Attributes";

export default class UpdateRecipe implements IUseCase {
  constructor(
    private recipeRepository: IRepository <Recipe>
  ) { }

  async execute(recipeId: Id, newAttributes: Attributes<Recipe>) {
    if (!newAttributes.name && !newAttributes.type)
      throw new Error("Recipe must have a name and a type!");
    if (!newAttributes.name)
      throw new Error("Recipe must have a name!");
    if (!newAttributes.type)
      throw new Error("Recipe must have a type!");
    

    await this.recipeRepository.update(recipeId, newAttributes);
  }
}