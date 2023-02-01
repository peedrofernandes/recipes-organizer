import { AtLeastOne } from "../../types/AtLeastOne"
import generateId from "../utilities/generateId"
import { Id } from "../value-objects/Id"
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

type RecipeOptions = AtLeastOne<{
  description: string;
  imageUrl: string;
}>

export function isRecipeOptions(options: any): options is RecipeOptions {
  return (options.description !== undefined || options.imageUrl !== undefined)
}

export type RecipeType = "Week" | "Weekend" | "Both";

export default class Recipe {
  private _id: Id;
  private _name: string;
  private _type: RecipeType;
  private _options?: RecipeOptions;
  private _ingredientList?: IngredientList;
  private _macros?: RecipeMacros;

  private calculateMacro(qtdMacro: number, gramsPerServing: number, totalGrams: number) {
    return qtdMacro * (totalGrams) / (gramsPerServing)
  }

  private setMacros() {
    // Calculate proteins based on ingredients
    this._macros!.proteins = this._ingredientList!.reduce( 
      (acc, listItem) => acc + this.calculateMacro(
        listItem.ingredient.macros!.proteins,
        listItem.ingredient.macros!.gramsPerServing,
        listItem.totalGrams
      ), 0)
    
    // Calculate carbs based on ingredients
    this._macros!.carbs = this._ingredientList!.reduce(
      (acc, listItem) => acc + this.calculateMacro(
        listItem.ingredient.macros!.carbs,
        listItem.ingredient.macros!.gramsPerServing,
        listItem.totalGrams
      ), 0)
    
    // Calculate fats based on ingredients
    this._macros!.fats = this._ingredientList!.reduce(
      (acc, listItem) => acc + this.calculateMacro(
        listItem.ingredient.macros!.fats,
        listItem.ingredient.macros!.gramsPerServing,
        listItem.totalGrams
      ), 0)
  }

  public addIngredient(ingredient: Ingredient, totalGrams: number): void {
    if (this.ingredientList) {
      this.ingredientList.push({
        ingredient,
        totalGrams
      })
    } else
      this._ingredientList = [{ ingredient, totalGrams }]

    this.setMacros()
  }

  public removeIngredient(id: number | string): void {
    if (this.ingredientList) {
      this._ingredientList = this.ingredientList.filter(item => item.ingredient.id !== id)
      this.setMacros()
    } else {
      throw new Error("Recipe already does not have ingredients.")
    }
  }

  constructor(props: {
    id?: Id;
    name: string;
    type: RecipeType;
    ingredientList?: IngredientList;
    options?: RecipeOptions;
  }) {
    const { id, name, type, options, ingredientList } = props;
    
    if (id) this._id = id;
    else this._id = generateId();

    this._name = name;
    this._type = type;

    // Options
    if (options)
      this._options = options;

    // Ingredient List
    if (ingredientList) {
      this._ingredientList = ingredientList;

      const everyIngredientHasMacros = ingredientList.every(
        (list) => list.ingredient.macros !== undefined
      )
        
      if (everyIngredientHasMacros) {
        // Initialize macros property, otherwise it'll be undefined
        this._macros = { proteins: 0, carbs: 0, fats: 0 };
        this.setMacros();
      }
    }
  }

  get id() {
    return this._id;
  }
  get name() {
    return this._name;
  }
  get type() {
    return this._type;
  }
  get options() {
    return this._options;
  }
  get ingredientList() {
    return this._ingredientList;
  }
  get macros() {
    return this._macros;
  }
}