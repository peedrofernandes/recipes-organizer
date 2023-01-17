import Recipe, { IngredientList } from "../src/domain/Recipe"
import Ingredient from "../src/domain/Ingredient"

describe("Recipe entity tests", () => {
  const egg = new Ingredient(1, "Egg", "Ovo simples", 6, 1, 2, 50)
  const rice = new Ingredient(2, "Arroz", "Arroz Urbano Parboilizado", 3, 40, 3, 100)
  const ham = new Ingredient(3, "Presunto", "Presunto Cozido Seara", 10, 20, 30, 100)
  const oil = new Ingredient(4, "Óleo de coco", "Óleo de coco SALADA", 0.4, 10, 80, 100)

  const ingredientsList: IngredientList = [
    {
      ingredient: egg,
      totalGrams: 100
    },
    {
      ingredient: rice,
      totalGrams: 150
    },
    {
      ingredient: ham,
      totalGrams: 20
    },
    {
      ingredient: oil,
      totalGrams: 5
    }
  ]

  const RiceWithEgg = new Recipe(
    1,
    "Arroz com Ovo",
    "Uma receita simples de arroz com ovo",
    ingredientsList
  )

  it("Should have accordingly macronutrients after creation", () => {
    expect(RiceWithEgg).toHaveProperty("_macros")
    expect(RiceWithEgg.macros!.proteins).toBeCloseTo(18.52)
    expect(RiceWithEgg.macros!.carbs).toBeCloseTo(66.5)
    expect(RiceWithEgg.macros!.fats).toBeCloseTo(18.5)
  })

  it("Should have accordingly macros after adding a new ingredient", () => {
    const butter = new Ingredient(5, "Manteiga", "Manteiga TIROL com sal", 2, 5, 40, 100)
    RiceWithEgg.addIngredient(butter, 5)
    expect(RiceWithEgg.macros!.proteins).toBeCloseTo(18.62)
    expect(RiceWithEgg.macros!.carbs).toBeCloseTo(66.75)
    expect(RiceWithEgg.macros!.fats).toBeCloseTo(20.5)
  })

  it("Should have accordingly macros after removing an ingredient", () => {
    RiceWithEgg.removeIngredient(5)
    RiceWithEgg.removeIngredient(4)
    RiceWithEgg.removeIngredient(3)
    expect(RiceWithEgg.macros!.proteins).toBeCloseTo(16.5)
    expect(RiceWithEgg.macros!.carbs).toBeCloseTo(62)
    expect(RiceWithEgg.macros!.fats).toBeCloseTo(8.5)
  })
})