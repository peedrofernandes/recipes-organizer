import RandomizeRecipes from "../src/domain/application/RandomizeRecipes"
import Ingredient from "../src/domain/entities/Ingredient";
import Recipe, { IngredientList, RecipeType } from "../src/domain/entities/Recipe"

describe("Randomization of recipes logic test", () => {
  // ------------ PREPARING ENVIRONMENT FOR TESTS ------------

  // First half, ingredients with macros
  const firstHalfIngredientsList: Ingredient[] = Array.from({ length: 6 },
    (_, i) => new Ingredient({
      id: i,
      name: `i${i}`,
      options: { description: `i${i}` },
      macros: { carbs: 0, proteins: 0, fats: 0, gramsPerServing: 100}
    })
  )
  // Second half, ingredients without macros
  const secondHalfIngredientsList: Ingredient[] = Array.from({ length: 6 },
    (_, i) => new Ingredient({
      id: i + 6,
      name: `i${i + 6}`,
      options: { description: `i${i+6}`}
    })
  )
  // Full list of ingredients
  const ingredients: Ingredient[] = firstHalfIngredientsList
    .concat(secondHalfIngredientsList)
  // List of ingredients, each one attached to 150g of total grams
  const ingredientsList: IngredientList = ingredients.map(
    (ingredient) => ({ ingredient, totalGrams: 150 })
  )

  // List of recipes, using arbitrary combination of three ingredients
  // from the list of ingredients (total: 9 recipes)
  // Recipe 1: i0, i1, i2
  // Recipe 2: i3, i4, i5
  // Recipe 3: i6, i7, i8
  // Recipe 4: i9, i10, i11
  // Recipe 5: i0, i2, i4
  // Recipe 6: i1, i3, i5
  // Recipe 7: i2, i4, i6
  // Recipe 8: i3, i5, i7
  // Recipe 9: i4, i6, i8
  const ingredientsOfEachRecipe: number[][] = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [9, 10, 11], [0, 2, 4], [1, 3, 5],
    [2, 4, 6], [3, 5, 7], [4, 6, 8]
  ]

  const recipes: Recipe[] = Array.from({ length: 9 },
    (_, i) => {
      const list: IngredientList = [
        ingredientsList[ingredientsOfEachRecipe[i][0]],
        ingredientsList[ingredientsOfEachRecipe[i][1]],
        ingredientsList[ingredientsOfEachRecipe[i][2]]
      ]

      const random = Math.floor(Math.random() * 1000) % 3
      const optionsArray: RecipeType[] = ["Week", "Weekend", "Both"]
      const type = optionsArray[random]

      return new Recipe({
        id: i,
        name: `r${i}`,
        options: { description: `r${i}` },
        type,
        ingredientList: list
      })
    }
  )

  const randomizeRecipes = new RandomizeRecipes((recipes) => recipes)

  const recipesWithDates: [Recipe, Date][] = randomizeRecipes.execute(
    recipes, new Date("2022-10-30")
  )

  it("Every recipe should, after randomization, have a date", () => {
    recipesWithDates.forEach((item) => expect(item[1]).toBeDefined())
  })
  
  it("Beginning date should be the right one", () => {
    recipesWithDates.sort(
      (item1, item2) => {
        const d1 = new Date(item1[1]).getTime()
        const d2 = new Date(item2[1]).getTime()
        return d1 - d2
      }
    )
    // console.log(sortedRecipes)
    expect(recipesWithDates[0][1].getFullYear()).toBe(2022)
    expect(recipesWithDates[0][1].getMonth()).toBe(10 - 1 /* Month 10 */)
    expect(recipesWithDates[0][1].getUTCDate()).toBe(30)
  })

  it("Every week and weekend recipe should be correctly classified", () => {
    recipesWithDates.forEach((item) => {
      const day = item[1].getDay()

      if (item[0].type === "Weekend")
        expect(day == 0 || day == 6).toBeTruthy()
      else if (item[0].type === "Week")
        expect(day >= 1 && day <= 5).toBeTruthy()
    })
  })
})