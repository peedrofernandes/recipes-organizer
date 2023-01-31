import Recipe from "../entities/Recipe";
import IUseCase from "./IUseCase";

export default class RandomizeRecipes implements IUseCase {

  constructor(
    private generatePDF: (recipesWithDates: [Recipe, Date][]) => any
  ) { }

  execute(recipes: Recipe[], date: Date): [Recipe, Date][] {
    const weekRecipes = recipes.filter(
      r => r.type === "Week" || r.type === "Both"
    )
    const weekendRecipes = recipes.filter(
      r => r.type === "Weekend" || r.type === "Both"
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

    return this.generatePDF(recipesWithDates);
  }
}