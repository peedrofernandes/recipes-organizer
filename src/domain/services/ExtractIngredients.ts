import Ingredient from "../entities/Ingredient";
import Recipe from "../entities/Recipe";
import { exists, insertSorted } from "../utilities/binarySearch";

export default function ExtractIngredients(recipes: Recipe[]) {
  const uniqueIngredients: Ingredient[] = [];

  recipes.forEach((recipe) => {
    if (!recipe.ingredientList)
      return;
    
    recipe.ingredientList.forEach((item) => {
      if (exists<Ingredient>(uniqueIngredients, item.ingredient, (i) => i.id)) return;
      insertSorted(
        uniqueIngredients,
        item.ingredient,
        (a, b) => Number(a.id) - Number(b.id)
      )
    })
  })

  return uniqueIngredients;
}