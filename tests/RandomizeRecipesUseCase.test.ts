import RandomizeRecipesUseCase from "../src/application/RandomizeRecipesUseCase"
import Ingredient from "../src/domain/Ingredient";
import Recipe, { IngredientList, RecipeType } from "../src/domain/Recipe"

describe("Randomization of recipes logic test", () => {
  const randomizeRecipes = new RandomizeRecipesUseCase()
  const firstHalfIngredientsList: Ingredient[] = Array.from({ length: 6 },
    (_, i) => new Ingredient(i, `i${i}`, `i${i}`, 0, 0, 0, 100)
  )
  const secondHalfIngredientsList: Ingredient[] = Array.from({ length: 6 },
    (_, i) => new Ingredient(i+6, `i${i+6}`, `i${i+6}`)
  )
  const ingredients = firstHalfIngredientsList.concat(secondHalfIngredientsList)

  const ingredientsList: IngredientList = ingredients.map(
    (ingredient) => ({ ingredient, totalGrams: 150 })
  )

  // Recipes
  // 1: i0, i1, i2
  // 2: i3, i4, i5
  // 3: i6, i7, i8
  // 4: i9, i10, i11
  // 5: i0, i2, i4
  // 6: i1, i3, i5
  // 7: i2, i4, i6
  // 8: i3, i5, i7
  // 9: i4, i6, i8
  const ingredientsOfEachRecipe = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [9, 10, 11], [0, 2, 4], [1, 3, 5],
    [2, 4, 6], [3, 5, 7], [4, 6, 8]
  ]

  const recipes = Array.from({ length: 9 },
    (_, i) => {
      const list: IngredientList = [
        ingredientsList[ingredientsOfEachRecipe[i][0]],
        ingredientsList[ingredientsOfEachRecipe[i][1]],
        ingredientsList[ingredientsOfEachRecipe[i][2]]
      ]

      const type: RecipeType = (Math.random() - 0.5) >= 0
        ? RecipeType.Week : RecipeType.Weekend

        
      const recipe = new Recipe(i, `r${i}`, `r${i}`, type, list)

      return recipe
    }
  )

  randomizeRecipes.execute(recipes, new Date("2022-10-30"))

  it("Every recipe should, after randomization, have a date", () => {
    recipes.forEach((recipe) => expect(recipe.date).not.toBeUndefined())
  })
  
  
  it("Beginning date should be the right one", () => {
    const sortedRecipes: Recipe[] = recipes.sort((r1, r2) => {
      const d1 = new Date(r1.date!).getTime()
      const d2 = new Date(r2.date!).getTime()

      return d1 - d2
    })
    console.log(sortedRecipes)
    expect(sortedRecipes[0].date!.getFullYear()).toBe(2022)
    expect(sortedRecipes[0].date!.getMonth()).toBe(10 - 1)
    expect(sortedRecipes[0].date!.getUTCDate()).toBe(30)
  })

  it("Every week and weekend recipe should be correctly classified", () => {
    recipes.forEach((recipe) => {
      const day = recipe.date!.getDay()

      if (recipe.type == RecipeType.Weekend)
        expect(day == 0 || day == 6).toBeTruthy()
      else
        expect(day >= 1 && day <= 5).toBeTruthy()
    })
  })
})