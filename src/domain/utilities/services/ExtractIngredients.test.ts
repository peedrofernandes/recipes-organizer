import Ingredient from "../../entities/Ingredient"
import Recipe from "../../entities/Recipe"
import ExtractIngredients from "./ExtractIngredients"

describe("Extraction of unique ingredients from recipes test", () => {
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

  const r1 = new Recipe({
    name: "Recipe 1",
    type: "Week",
    ingredientList: [
      { ingredient: oil, totalGrams: 20 },
      { ingredient: ham, totalGrams: 20 },
      { ingredient: rice, totalGrams: 200 }
    ]
  })
  const r2 = new Recipe({
    name: "Recipe 2",
    type: "Week",
    ingredientList: [
      { ingredient: egg, totalGrams: 28 },
      { ingredient: oil, totalGrams: 20 },
      { ingredient: rice, totalGrams: 100 }
    ]
  })

  it("Should extract unique ingredients correctly", () => {
    const uniqueIngredients = ExtractIngredients([r1, r2])
    uniqueIngredients.forEach(ingredient => {
      expect([egg, rice, ham, oil]).toContain(ingredient)
    })
  })
})