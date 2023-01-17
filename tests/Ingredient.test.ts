import Ingredient from "../src/domain/Ingredient"

describe("Ingredient entity tests", () => {
  const milk = new Ingredient(1, "Leite", "Leite Tirol Semidesnatado")

  it("Should build a simple ingredient correctly with the first constructor", () => {
    expect(milk).toHaveProperty("name")
    expect(milk).toHaveProperty("description")
    expect(milk).not.toHaveProperty("_macros")
  })

  it("Should build a complete ingredient correctly with the second constructor", () => {
    const milk = new Ingredient(2, "Leite", "Leite Tirol Semidesnatado", 10, 4, 3, 100)
    expect(milk).toHaveProperty("name")
    expect(milk).toHaveProperty("description")
    expect(milk).toHaveProperty("macros")
    expect(milk.macros).not.toBeUndefined()
    
    const { proteins, carbs, fats, gramsPerServing } = milk.macros!

    expect(proteins + carbs + fats + gramsPerServing).toBeCloseTo(117)
  })
})