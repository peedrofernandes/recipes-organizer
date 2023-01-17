class Ingredient {
  name: string
  description: string
  macros?: {
    proteins: number,
    carbs: number,
    fats: number,
    gramsPerServing: number
  }

  // Simpe constructor
  constructor(name: string, description: string)
  // Complete constructor
  constructor (
    name: string,
    description: string,
    proteins?: number,
    carbs?: number,
    fats?: number,
    gramsPerServing?: number
  ) {
    this.name = name
    this.description = description

    if (proteins && carbs && fats && gramsPerServing) {
      this.macros = { proteins, carbs, fats, gramsPerServing }
    }
  }
}

export default Ingredient