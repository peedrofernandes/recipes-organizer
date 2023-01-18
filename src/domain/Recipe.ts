import { WebpackError } from "webpack"
import Ingredient from "./Ingredient"

export type IngredientList = {
  ingredient: Ingredient,
  totalGrams: number
}[]

export type RecipeMacros = {
  carbs: number,
  proteins: number,
  fats: number
}

export enum RecipeType { Week, Weekend }

export default class Recipe {
  private _id: number | string
  private _name: string
  private _description: string
  private _type: RecipeType
  private _date?: Date
  private _ingredientList: IngredientList
  private _macros?: RecipeMacros

  private calculateMacro(qtdMacro: number, gramsPerServing: number, totalGrams: number) {
    return qtdMacro * (totalGrams) / (gramsPerServing)
  }

  private setMacros() {
    // Calculate proteins based on ingredients
    this._macros!.proteins = this._ingredientList.reduce( 
      (acc, listItem) => acc + this.calculateMacro(
        listItem.ingredient.macros!.proteins,
        listItem.ingredient.macros!.gramsPerServing,
        listItem.totalGrams
      ), 0)
    
    // Calculate carbs based on ingredients
    this._macros!.carbs = this._ingredientList.reduce(
      (acc, listItem) => acc + this.calculateMacro(
        listItem.ingredient.macros!.carbs,
        listItem.ingredient.macros!.gramsPerServing,
        listItem.totalGrams
      ), 0)
    
    // Calculate fats based on ingredients
    this._macros!.fats = this._ingredientList.reduce(
      (acc, listItem) => acc + this.calculateMacro(
        listItem.ingredient.macros!.fats,
        listItem.ingredient.macros!.gramsPerServing,
        listItem.totalGrams
      ), 0)
  }
  
  constructor(
    id: number | string,
    name: string,
    description: string,
    type: RecipeType,
    ingredientList: IngredientList
  )
  constructor(
    id: number | string,
    name: string,
    description: string,
    type: RecipeType,
    ingredientList: IngredientList,
    date?: Date
  ) {
    this._id = id
    this._name = name
    this._description = description
    this._type = type
    this._ingredientList = ingredientList
    this._date = undefined

    const everyIngredientHasMacros = ingredientList.every(
      (list) => list.ingredient.macros !== undefined
    )

    if (everyIngredientHasMacros) {
      // Initialize macros property, otherwise it'll be undefined
      this._macros = { proteins: 0, carbs: 0, fats: 0 }
      this.setMacros()
    } else {
      this._macros = undefined
    }

    if (date)
      this._date = date
  }

  public addIngredient(ingredient: Ingredient, totalGrams: number) {
    this._ingredientList.push({
      ingredient,
      totalGrams
    })
    this.setMacros()
  }

  public removeIngredient(id: number | string) {
    this._ingredientList = this._ingredientList.filter(item => item.ingredient.id !== id)
    this.setMacros()
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
  get type() {
    return this._type
  }
  get ingredientList() {
    return this._ingredientList
  }
  get macros() {
    return this._macros
  }
  get date() {
    return this._date
  }

  set date(date: Date | undefined) {
    this._date = date
  }
}