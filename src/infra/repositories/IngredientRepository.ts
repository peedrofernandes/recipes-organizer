import { AdaptedIngredient, StoredIngredient } from "@controllers/AdaptedTypes"
import { IngredientAdapter } from "@controllers/IngredientAdapter"
import Ingredient from "@domain/entities/Ingredient"
import { IRepository } from "@domain/repositories/IRepository"
import { Id } from "@domain/utilities/types/Id"
import RelationsStorage from "../common/RelationsStorage"
import services from "../common/services"

const ingredients = "ingredients"

export default class IngredientRepository implements IRepository<Ingredient> {

  private getData(): StoredIngredient[] {
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
      this.ingredientAdapter.storedToEntity(adaptedIngredientFound)
    )
  }
  findAll(): Promise<Ingredient[]> {
    const storedIngredients = this.getData()
    return Promise.resolve(storedIngredients.map(
      i => this.ingredientAdapter.storedToEntity(i)
    ))
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

  async create(ingredient: Ingredient): Promise<void> {
    const storedIngredients = this.getData()
    storedIngredients.push(this.ingredientAdapter.adaptIngredient(ingredient))
    this.setData(storedIngredients)
    return Promise.resolve()
  }
  async createList(ingredients: Ingredient[]): Promise<void> {
    const storedIngredients = this.getData()
    const adaptedNewIngredients = ingredients.map(
      i => this.ingredientAdapter.adaptIngredient(i)
    )
    const totalIngredients = storedIngredients.concat(adaptedNewIngredients)
    this.setData(totalIngredients)
    return Promise.resolve()
  }
  async update(updatedIngredient: Ingredient): Promise<void> {
    const { id } = updatedIngredient
    const storedIngredients = this.getData()
    const indexFound = storedIngredients.findIndex(i => i.id === id)
    if (indexFound === -1) throw new Error(`There's no such ingredient with id ${id}.`)
    const adaptedUpdatedIngredient =
      this.ingredientAdapter.adaptIngredient(updatedIngredient)
    storedIngredients.splice(indexFound, 1, adaptedUpdatedIngredient)
    this.setData(storedIngredients)
    return Promise.resolve()
  }
  delete(id: Id): Promise<void> {
    const storedIngredients = this.getData()
    const indexFound = storedIngredients.findIndex(i => i.id === id)
    if (indexFound === -1) throw new Error(`There's no ingredient with id ${id}.`)
      
    storedIngredients.splice(indexFound, 1)
    this.setData(storedIngredients)

    RelationsStorage.removeRelationsByIngredientId(id)

    return Promise.resolve()
  }

}