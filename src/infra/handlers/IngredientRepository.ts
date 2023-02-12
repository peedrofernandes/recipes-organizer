import { AdaptedIngredient } from "@controllers/AdaptedTypes"
import { IngredientAdapter } from "@controllers/IngredientAdapter"
import Ingredient from "@domain/entities/Ingredient"
import { IRepository } from "@domain/repositories/IRepository"
import { Id } from "@domain/utilities/types/Id"
import services from "./services"

const ingredients = "ingredients"

export default class IngredientRepository implements IRepository<Ingredient> {

  private getData(): AdaptedIngredient[] {
    const data = localStorage.getItem(ingredients)
    return data ? JSON.parse(data) : []
  }
  private setData(adaptedIngredients: AdaptedIngredient[]): void {
    localStorage.setItem(ingredients, JSON.stringify(adaptedIngredients))
  }
  private ingredientAdapter = new IngredientAdapter(services.postImage)

  find(id: Id): Promise<Ingredient> {
    const adaptedIngredients = this.getData()
    const adaptedIngredientFound = adaptedIngredients.find((item) => item.id === id)
    if (!adaptedIngredientFound) throw new Error("Ingredient not found!")

    return Promise.resolve(
      this.ingredientAdapter.retrieveIngredient(adaptedIngredientFound)
    )
  }
  findAll(): Promise<Ingredient[]> {
    const adaptedIngredients = this.getData()
    return Promise.resolve(adaptedIngredients.map(
      i => this.ingredientAdapter.retrieveIngredient(i)
    ))
  }
  async create(ingredient: Ingredient): Promise<void> {
    const adaptedIngredients = this.getData()
    adaptedIngredients.push(this.ingredientAdapter.adaptIngredient(ingredient))
    this.setData(adaptedIngredients)
    return Promise.resolve()
  }
  async createList(ingredients: Ingredient[]): Promise<void> {
    const adaptedIngredients = this.getData()
    const adaptedNewIngredients = ingredients.map(
      i => this.ingredientAdapter.adaptIngredient(i)
    )
    adaptedIngredients.concat(adaptedNewIngredients)
    this.setData(adaptedIngredients)
    return Promise.resolve()
  }
  async update(updatedIngredient: Ingredient): Promise<void> {
    const { id } = updatedIngredient
    const adaptedIngredients = this.getData()
    const indexFound = adaptedIngredients.findIndex(i => i.id === id)
    if (!indexFound) throw new Error(`There's no such ingredient with id ${id}.`)
    const adaptedUpdatedIngredient =
      this.ingredientAdapter.adaptIngredient(updatedIngredient)
    adaptedIngredients.splice(indexFound, 1, adaptedUpdatedIngredient)
    this.setData(adaptedIngredients)
    return Promise.resolve()
  }
  delete(id: Id): Promise<void> {
    const adaptedIngredients = this.getData()
    const indexFound = adaptedIngredients.findIndex(i => i.id === id)
    if (indexFound === -1) throw new Error(`There's no ingredient with id ${id}.`)
    adaptedIngredients.splice(indexFound, 1)
    this.setData(adaptedIngredients)
    return Promise.resolve()
  }
  load(source: File): Promise<Ingredient[]> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsText(source)

      reader.onload = () => {
        const ingredients = JSON.parse(reader.result as string)
        resolve(ingredients)
      }

      reader.onerror = (error) => {
        reject(error)
      }
    })
  }

}