import Recipe, { RecipeType } from "../domain/Recipe";
import IUseCase from "./IUseCase";

export default class RandomizeRecipesUseCase implements IUseCase {
  execute(recipes: Recipe[], date: Date): void {
    const weekRecipes = recipes.filter((r) => r.type == RecipeType.Week)
    const weekendRecipes = recipes.filter((r) => r.type == RecipeType.Weekend)

    const currentDate = date;

    while (weekRecipes.length !== 0 || weekendRecipes.length !== 0) {
      const currentDay = currentDate.getDay()

      if (currentDay === 0 || currentDay === 6) { // Weekends
        if (weekendRecipes.length !== 0) {
          let randomIndex = Math.floor(Math.random() * weekendRecipes.length)
          const [chosenRecipe] = weekendRecipes.splice(randomIndex, 1)
          // recipes[recipes.indexOf(chosenRecipe)].date = currentDate
          const originalIndex = recipes.findIndex(r => r.id === chosenRecipe.id)
          recipes[originalIndex].date = new Date(currentDate)
        }
      } else { // Weekdays
        if (weekRecipes.length !== 0) {
          let randomIndex = Math.floor(Math.random() * weekRecipes.length)
          const [chosenRecipe] = weekRecipes.splice(randomIndex, 1)
          const originalIndex = recipes.findIndex(r => r.id === chosenRecipe.id)
          recipes[originalIndex].date = new Date(currentDate)
        }
      }

      currentDate.setDate(currentDate.getDate() + 1)
    }

    console.log(recipes)
  }
}