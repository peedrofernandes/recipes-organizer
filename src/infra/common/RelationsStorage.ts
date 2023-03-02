import { IngredientRecipe } from "@controllers/AdaptedTypes"
import Recipe from "@domain/entities/Recipe"
import { Id } from "@domain/utilities/types/Id"

export default class RelationsStorage {
  private static getData(): IngredientRecipe[] {
    const data = localStorage.getItem("relations")
    const relations: IngredientRecipe[] = data ? JSON.parse(data) : []
    return relations
  }
  private static setData(relations: IngredientRecipe[]): void {
    localStorage.setItem("relations", JSON.stringify(relations))
  }

  static async getRelationsByRecipeId(id: Id): Promise<IngredientRecipe[]> {
    return Promise.resolve(RelationsStorage.getData().filter(
      item => item.recipeId === id
    ))
  }
  static async getRelationsByIngredientId(id: Id): Promise<IngredientRecipe[]> {
    return Promise.resolve(RelationsStorage.getData().filter(
      item => item.ingredientId === id
    ))
  }

  static addRelation(relation: IngredientRecipe): void {
    RelationsStorage.setData([...RelationsStorage.getData(), relation])
  }
  static addRelationsByRecipe(recipe: Recipe): void {
    recipe.ingredientList?.forEach(item => {
      RelationsStorage.addRelation({
        recipeId: recipe.id,
        ingredientId: item.ingredient.id,
        ingredientGrams: item.totalGrams
      })
    })
  }
  static removeRelationsByIngredientId(id: Id): void {
    RelationsStorage.setData(RelationsStorage.getData().filter(item => item.ingredientId !== id))
  }
  static removeRelationsByRecipeId(id: Id): void {
    RelationsStorage.setData(RelationsStorage.getData().filter(item => item.recipeId !== id))
  }
}