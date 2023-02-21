import Ingredient, { ingredientHasMacros } from "./Ingredient"

describe("Ingredient entity tests", () => {
  // const milk = new Ingredient(1, "Leite", "Leite Tirol Semidesnatado")
  // const milk = new Ingredient(1, "Leite", { description: "Leite Tirol semidesnatado" })


  it("Can create an ingredient entity with options but without macros", () => {
    const ingredient = new Ingredient({
      name: "Leite",
      options: { description: "Leite Tirol Semidesnatado" }
    })

    expect(ingredient.id).toBeDefined()
    expect(ingredient.name).toBeDefined()
    expect(ingredient.options).toBeDefined()
    expect(ingredient.options).toHaveProperty("description")
    expect(ingredient.macros).toBeUndefined()
  })

  it("Can create ingredient entity with macros but without options", () => {
    const ingredient = new Ingredient({
      name: "Leite",
      macros: { proteins: 10, carbs: 4, fats: 3, gramsPerServing: 100 }
    })
    expect(ingredient.macros).not.toBeUndefined()
    expect(ingredient.options).toBeUndefined()
  })

  it("Can build a complete ingredient", () => {
    // const milk = new Ingredient(2, "Leite", "Leite Tirol Semidesnatado", 10, 4, 3, 100)
    const ingredient = new Ingredient({
      name: "Leite",
      options: {
        description: "Leite Tirol Semidesnatado",
        imageUrl: "https://imageurl.com/url"
      },
      macros: {
        proteins: 10,
        carbs: 4,
        fats: 3,
        gramsPerServing: 100
      }
    })

    const keys = ["id", "name", "options", "macros"]
    keys.forEach((key) => expect(ingredient[key]).toBeDefined())

    expect(ingredientHasMacros(ingredient)).toBeTruthy()
  
    if (ingredientHasMacros(ingredient)) {
      const { proteins, carbs, fats, gramsPerServing } = ingredient.macros
      expect(proteins + carbs + fats + gramsPerServing).toBeCloseTo(117)
    }
  })
})