import { AtLeastOne } from "../../types/AtLeastOne"
import generateId from "../utilities/algorithms/generateId"
import { Id } from "../utilities/types/Id"

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

export function isIngredientOptions(options: object): options is IngredientOptions {
  return (
    ("description" in options && typeof options.description === "string")
    || ("imageUrl" in options && typeof options.imageUrl === "string")
  )
}

export function ingredientHasMacros(ingredient: Ingredient): ingredient is Ingredient & {
  macros: IngredientMacros
} {
  return "macros" in ingredient
}

export default class Ingredient {
  private readonly _id: Id
  private readonly _name: string
  private readonly _options?: IngredientOptions
  private readonly _macros?: IngredientMacros

  // Complete constructor
  constructor(props: {
    id?: Id;
    name: string;
    options?: IngredientOptions;
    macros?: IngredientMacros;
  }) {
    const { id, name, options, macros } = props

    this._name = name

    if (id) this._id = id
    else this._id = generateId()

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