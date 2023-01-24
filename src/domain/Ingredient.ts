import { AtLeastOne } from "../types/AtLeastOne";

export type IngredientMacros = {
  proteins: number,
  carbs: number,
  fats: number,
  gramsPerServing: number
}

type IngredientOptions = AtLeastOne<{
  description: string;
  imageUrl: string;
}>

export function isIngredientOptions(options: any): options is IngredientOptions {
  return (options.description !== undefined || options.imageUrl !== undefined)
}

export default class Ingredient {
  private readonly _id: number | string
  private readonly _name: string
  private readonly _options?: IngredientOptions
  private readonly _macros?: IngredientMacros

  // Complete constructor
  constructor(props: {
    id: number | string
    name: string
    options?: IngredientOptions
    macros?: IngredientMacros
  }) {
    const { id, name, options, macros } = props

    this._id = id
    this._name = name

    if (options)
      this._options = options

    if (macros)
      this._macros = macros
  }

  calculateMacros(grams: number): Omit<IngredientMacros, "gramsPerServing"> {
    if (this._macros) {
      return {
        proteins: this._macros.proteins * grams / this._macros.gramsPerServing,
        carbs: this._macros.carbs * grams / this._macros.gramsPerServing,
        fats: this._macros.fats * grams / this._macros.gramsPerServing
      }  
    }

    throw new Error(
      "Ingredient must have macronutrients before be capable to calculate macros."
    )
  }

  get id() {
    return this._id
  }
  get name() {
    return this._name
  }
  get options() {
    return this._options
  }
  get macros() {
    return this._macros
  }
}