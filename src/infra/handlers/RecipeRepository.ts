import { AdaptedRecipe } from "@controllers/AdaptedTypes"
import { adaptRecipe, getRecipeEntity } from "@controllers/RecipeAdapter"
import Recipe from "@domain/entities/Recipe"
import { IRepository } from "@domain/repositories/IRepository"
import { Values } from "@domain/utilities/types/Values"
import { services } from "./services"

const recipes = "recipes"

export default class RecipeRepository implements IRepository<Recipe> {

  private getData(): AdaptedRecipe[] {
    const data = localStorage.getItem(recipes)
    const adaptedRecipes: AdaptedRecipe[] = data ? JSON.parse(data) : []
    return adaptedRecipes
  }

  private setData(adaptedRecipes: AdaptedRecipe[]): void {
    localStorage.setItem(recipes, JSON.stringify(adaptedRecipes))
  }

  find(id: string): Promise<Recipe> {
    const recipes = this.getData()
    const recipe = recipes.find(r => r.id === id)
    if (!recipe) throw new Error("Recipe not found!")
    return Promise.resolve(getRecipeEntity(recipe))
  }
  findAll(): Promise<Recipe[]> {
    const recipes = this.getData()
    return Promise.resolve(recipes.map(r => getRecipeEntity(r)))
  }
  async create(t: Recipe): Promise<void> {
    const recipes = this.getData()
    const adaptedRecipe = await adaptRecipe(t, services.retrieveImage)
    recipes.push(adaptedRecipe)
    this.setData(recipes)
    return Promise.resolve()
  }
  async createList(t: Recipe[]): Promise<void> {
    const recipes = this.getData()
    const adaptedRecipes = await Promise.all(t.map(
      async r => await adaptRecipe(r, services.retrieveImage)
    ))
    recipes.concat(adaptedRecipes)
    this.setData(recipes)
    return Promise.resolve()
  }
  async update(id: string, attributes: Values<Recipe>): Promise<void> {
    const recipes = this.getData()
    const foundIndex = recipes.findIndex(recipe => recipe.id === id)
    if (!foundIndex) throw new Error(`There's no such recipe with id ${id}.`)
    const newRecipe = new Recipe({ id, ...attributes })
    const adaptedNewRecipe = await adaptRecipe(newRecipe, services.retrieveImage)
    recipes.splice(foundIndex, 1, adaptedNewRecipe)
    this.setData(recipes)
    return Promise.resolve()
  }
  delete(id: string): Promise<void> {
    const recipes = this.getData()
    const foundIndex = recipes.findIndex(recipe => recipe.id === id)
    if (!foundIndex) throw new Error(`There's no recipe with id ${id}.`)
    recipes.splice(foundIndex, 1)
    this.setData(recipes)
    return Promise.resolve()
  }
  load(source: File): Promise<Recipe[]> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsText(source)

      reader.onload = () => {
        const recipes = JSON.parse(reader.result as string)
        resolve(recipes)
      }

      reader.onerror = (error) => {
        reject(error)
      }
    })
  }

}