import Ingredient from "@domain/entities/Ingredient"
import Recipe from "@domain/entities/Recipe"
import { exists, insertSorted } from "../algorithms/binarySearch"

export default function ExtractIngredients(recipes: Recipe[]) {
  const uniqueIngredients: Ingredient[] = []

  recipes.forEach((recipe) => {
    if (!recipe.ingredientList)
      return
    
    recipe.ingredientList.forEach((item) => {
      if (!exists<Ingredient>(uniqueIngredients, item.ingredient, (i) => i.id))
        insertSorted(
          uniqueIngredients,
          item.ingredient,
          (a, b) => Number(a.id) - Number(b.id)
        )
    })
  })

  return uniqueIngredients
}