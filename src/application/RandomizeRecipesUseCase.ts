import Recipe, { RecipeType } from "../domain/Recipe";
import IUseCase from "./IUseCase";

export default class RandomizeRecipesUseCase implements IUseCase {
  execute(recipes: Recipe[], date: Date): Recipe[] {
    const weekRecipes = recipes.filter((r) => r.type == RecipeType.Week)
    const weekendRecipes = recipes.filter((r) => r.type == RecipeType.Weekend)

    const randomizedRecipesList: Recipe[] = new Array()

    const currentDate = date;
    while (weekRecipes.length !== 0 && weekendRecipes.length !== 0) {
      const currentDay = currentDate.getDay()
      let randomIndex

      if (currentDay === 0 || currentDay === 6) { // Weekends
        if (weekendRecipes.length !== 0) {
          randomIndex = Math.floor(Math.random() * weekendRecipes.length)
          const recipe: Recipe[] = weekendRecipes.splice(randomIndex, 1)
          randomizedRecipesList.concat(recipe)
        }
      } else { // Weekdays
        if (weekRecipes.length !== 0) {
          randomIndex = Math.floor(Math.random() * weekRecipes.length)
          const recipe: Recipe[] = weekRecipes.splice(randomIndex, 1)
          randomizedRecipesList.concat(recipe)
        }
      }

      currentDate.setDate(currentDate.getDate() + 1)
    }

    return randomizedRecipesList
  } 
}