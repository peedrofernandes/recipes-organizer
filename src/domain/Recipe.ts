import Ingredient from "./Ingredient"

type IngredientList = {
  ingredient: Ingredient,
  totalGrams: number
}[]

type RecipeMacros = {
  carbs: number,
  proteins: number,
  fats: number
}

class Recipe {
  private id: number | string
  private name: string
  private description: string
  private ingredientList: IngredientList
  private macros?: RecipeMacros

  private calculateMacro(qtdMacro: number, gramsPerServing: number, totalGrams: number) {
    return qtdMacro * (totalGrams) / (gramsPerServing)
  }

  constructor(
    id: number | string,
    name: string,
    description: string,
    ingredientList: IngredientList
  ) {
    this.id = id
    this.name = name
    this.description = description
    this.ingredientList = ingredientList

    const everyIngredientHasMacros = ingredientList.every(
      (list) => list.ingredient.macros !== undefined
    )

    if (everyIngredientHasMacros) {
      // Initialize macros property, otherwise it'll be undefined
      this.macros = { proteins: 0, carbs: 0, fats: 0 }

      // Calculate proteins based on ingredients
      this.macros.proteins = this.ingredientList.reduce(
        (acc, listItem) => acc + this.calculateMacro(
          listItem.ingredient.macros!.proteins,
          listItem.ingredient.macros!.gramsPerServing,
          listItem.totalGrams
        ), this.macros.proteins)
      
      // Calculate carbs based on ingredients
      this.macros.carbs = this.ingredientList.reduce(
        (acc, listItem) => acc + this.calculateMacro(
          listItem.ingredient.macros!.carbs,
          listItem.ingredient.macros!.gramsPerServing,
          listItem.totalGrams
        ), this.macros.carbs)
      
      // Calculate fats based on ingredients
      this.macros.fats = this.ingredientList.reduce(
        (acc, listItem) => acc + this.calculateMacro(
          listItem.ingredient.macros!.fats,
          listItem.ingredient.macros!.gramsPerServing,
          listItem.totalGrams
        ), this.macros.fats)
    }
  }


}

export default Recipe