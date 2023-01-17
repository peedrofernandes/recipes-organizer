type IngredientMacros = {
  proteins: number,
  carbs: number,
  fats: number,
  gramsPerServing: number
}

class Ingredient {
  private _id: number | string
  private _name: string
  private _description: string
  private _macros?: IngredientMacros

  // Constructor signatures
  constructor(id: number | string, name: string, description: string)
  constructor(id: number | string, name: string, description: string, proteins: number, carbs: number, fats: number, gramsPerServing: number)

  // Complete constructor
  constructor(
    id: number | string,
    name: string,
    description: string,
    proteins?: number,
    carbs?: number,
    fats?: number,
    gramsPerServing?: number
  ) {
    this._id = id
    this._name = name
    this._description = description

    if (proteins && carbs && fats && gramsPerServing) {
      this._macros = { proteins, carbs, fats, gramsPerServing }
    }
  }

  get id() {
    return this._id
  }
  get name() {
    return this._name
  }
  get description() {
    return this._description
  }
  get macros() {
    return this._macros
  }
}

export default Ingredient