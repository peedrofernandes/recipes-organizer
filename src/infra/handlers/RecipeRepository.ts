import { AdaptedIngredient, AdaptedRecipe } from "@controllers/AdaptedTypes"
import { IngredientAdapter } from "@controllers/IngredientAdapter"
import { RecipeAdapter } from "@controllers/RecipeAdapter"
import Ingredient from "@domain/entities/Ingredient"
import Recipe from "@domain/entities/Recipe"
import IRecipeRepository from "@domain/repositories/IRecipeRepository"
import services from "./services"

const recipes = "recipes"

export default class RecipeRepository implements IRecipeRepository {

  private getData(): AdaptedRecipe[] {
    const data = localStorage.getItem(recipes)
    const adaptedRecipes: AdaptedRecipe[] = data ? JSON.parse(data) : []
    return adaptedRecipes
  }

  private setData(adaptedRecipes: AdaptedRecipe[]): void {
    localStorage.setItem(recipes, JSON.stringify(adaptedRecipes))
  }

  private ingredientAdapter = new IngredientAdapter(services.postImage)

  private recipeAdapter = new RecipeAdapter(
    services.postImage,
    this.ingredientAdapter.retrieveIngredient,
    this.ingredientAdapter.adaptIngredient
  )

  find(id: string): Promise<Recipe> {
    const adaptedRecipes = this.getData()
    const adaptedRecipeFound = adaptedRecipes.find(r => r.id === id)
    if (!adaptedRecipeFound) throw new Error("Recipe not found!")
    return Promise.resolve(this.recipeAdapter.retrieveRecipe(adaptedRecipeFound))
  }
  findAll(): Promise<Recipe[]> {
    const adaptedRecipes = this.getData()
    return Promise.resolve(adaptedRecipes.map(
      r => this.recipeAdapter.retrieveRecipe(r))
    )
  }
  async create(recipe: Recipe): Promise<void> {
    const adaptedRecipes = this.getData()
    const adaptedRecipe = this.recipeAdapter.adaptRecipe(recipe)
    adaptedRecipes.push(adaptedRecipe)
    this.setData(adaptedRecipes)
    return Promise.resolve()
  }
  async createList(recipes: Recipe[]): Promise<void> {
    console.log("createList() method at RecipeRepository called!")

    const adaptedRecipes = this.getData()
    console.log("adaptedReipces: ", adaptedRecipes)

    const adaptedNewRecipes = recipes.map(
      r => this.recipeAdapter.adaptRecipe(r)
    )
    console.log("adaptedNewRecipes: ", adaptedNewRecipes)

    const totalRecipes = adaptedRecipes.concat(adaptedNewRecipes)
    console.log("totalRecipes: ", totalRecipes)

    this.setData(totalRecipes)
    return Promise.resolve()
  }
  async update(updatedRecipe: Recipe): Promise<void> {
    const { id } = updatedRecipe
    const adaptedRecipes = this.getData()
    const indexFound = adaptedRecipes.findIndex(recipe => recipe.id === id)
    if (indexFound === -1) throw new Error(`There's no such recipe with id ${id}.`)
    const updatedAdaptedRecipe = this.recipeAdapter.adaptRecipe(updatedRecipe)
    adaptedRecipes.splice(indexFound, 1, updatedAdaptedRecipe)
    this.setData(adaptedRecipes)
    return Promise.resolve()
  }
  delete(id: string): Promise<void> {
    const recipes = this.getData()
    const indexFound = recipes.findIndex(recipe => recipe.id === id)
    if (indexFound === -1) throw new Error(`There's no recipe with id ${id}.`)
    recipes.splice(indexFound, 1)
    this.setData(recipes)
    return Promise.resolve()
  }
  load(source: File): Promise<{ recipes: Recipe[], ingredients: Ingredient[] }> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsText(source)

      reader.onload = () => {
        const data: [AdaptedRecipe[], AdaptedIngredient[]] =
          JSON.parse(reader.result as string)

        const recipes = data[0].map(
          r => this.recipeAdapter.retrieveRecipe(r))
        const ingredients = data[1].map(
          i => this.ingredientAdapter.retrieveIngredient(i)
        )
        
        resolve({ recipes, ingredients })
      }

      reader.onerror = (error) => {
        reject(error)
      }
    })
  }
}