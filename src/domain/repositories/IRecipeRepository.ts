import Ingredient from "@domain/entities/Ingredient"
import Recipe from "@domain/entities/Recipe"
import { IRepository } from "./IRepository"

export default interface IRecipeRepository extends IRepository<Recipe> {
  load(source: unknown): Promise<{ recipes: Recipe[], ingredients: Ingredient[] }>
}