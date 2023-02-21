import Recipe, { IngredientList } from "./Recipe"
import Ingredient from "./Ingredient"

describe("Recipe entity tests", () => {
  const egg = new Ingredient({
    name: "Egg",
    options: {description: "Ovo simples" },
    macros: { proteins: 6, carbs: 1, fats: 2, gramsPerServing: 50 }
  })
  const rice = new Ingredient({
    name: "Arroz",
    options: { description: "Arroz Urbano Parboilizado" },
    macros: { proteins: 3,  carbs: 40,  fats: 3, gramsPerServing: 100 }
  })
  const ham = new Ingredient({
    name: "Presunto",
    options: {description: "Presunto Cozido Seara" },
    macros: { proteins: 10,  carbs: 20, fats: 30, gramsPerServing: 100 }
  })
  const oil = new Ingredient({
    name: "Óleo de coco",
    options: { description: "Óleo de coco SALADA" },
    macros: { proteins: 0.4, carbs: 10, fats: 80, gramsPerServing: 100 }
  })

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

  const RiceWithEgg = new Recipe({
    name: "Arroz com ovo",
    type: "Week",
    options: { description: "Uma receita simples de arroz com ovo" },
    ingredientList: ingredientsList
  })

  it("Should have accordingly macronutrients after creation", () => {
    expect(RiceWithEgg.macros).toBeDefined()
    expect(RiceWithEgg.macros!.proteins).toBeCloseTo(18.52)
    expect(RiceWithEgg.macros!.carbs).toBeCloseTo(66.5)
    expect(RiceWithEgg.macros!.fats).toBeCloseTo(18.5)
  })

  it("Should have accordingly macros after adding a new ingredient", () => {
    const butter = new Ingredient({
      name: "Manteiga",
      options: { description: "Manteiga TIROL com sal" },
      macros: { proteins: 2, carbs: 5, fats: 40, gramsPerServing: 100 }
    })
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