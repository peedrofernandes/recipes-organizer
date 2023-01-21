import Recipe, { RecipeType } from "../domain/Recipe";
import IUseCase from "./IUseCase";

export default class RandomizeRecipesUseCase implements IUseCase {
  execute(recipes: Recipe[], date: Date): [Recipe, Date][] {
    const weekRecipes = recipes.filter(
      r => r.type === RecipeType.Week || r.type === RecipeType.Both
    )
    const weekendRecipes = recipes.filter(
      r => r.type === RecipeType.Weekend || r.type === RecipeType.Both
    )

    const recipesWithDates: [Recipe, Date][] = []
    const currentDate = date;

    while (weekRecipes.length !== 0 || weekendRecipes.length !== 0) {
      const currentDay = currentDate.getDay()

      if (currentDay === 0 || currentDay === 6) { // Weekends
        if (weekendRecipes.length !== 0) {
          let randomIndex = Math.floor(Math.random() * weekendRecipes.length)
          const [chosenRecipe] = weekendRecipes.splice(randomIndex, 1)
          const originalIndex = recipes.findIndex(r => r.id === chosenRecipe.id)
          recipesWithDates.push([recipes[originalIndex], new Date(currentDate)])

        }
      } else { // Weekdays
        if (weekRecipes.length !== 0) {
          let randomIndex = Math.floor(Math.random() * weekRecipes.length)
          const [chosenRecipe] = weekRecipes.splice(randomIndex, 1)
          const originalIndex = recipes.findIndex(r => r.id === chosenRecipe.id)
          recipesWithDates.push([recipes[originalIndex], new Date(currentDate)])
        }
      }

      currentDate.setDate(currentDate.getDate() + 1)
    }

    return recipesWithDates
  }
}