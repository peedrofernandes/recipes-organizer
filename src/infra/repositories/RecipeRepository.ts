import { IngredientRecipe, StoredIngredient, StoredRecipe } from "@controllers/AdaptedTypes"
import { IngredientAdapter } from "@controllers/IngredientAdapter"
import { RecipeAdapter } from "@controllers/RecipeAdapter"
import Ingredient from "@domain/entities/Ingredient"
import Recipe from "@domain/entities/Recipe"
import IRecipeRepository from "@domain/repositories/IRecipeRepository"
import IngredientRepository from "./IngredientRepository"
import services from "../common/services"
import RelationsStorage from "../common/RelationsStorage"

const recipes = "recipes"

export default class RecipeRepository implements IRecipeRepository {
  private getData(): StoredRecipe[] {
    const data = localStorage.getItem(recipes)
    const storedRecipes: StoredRecipe[] = data ? JSON.parse(data) : []
    return storedRecipes
  }

  private setData(storedRecipes: StoredRecipe[]): void {
    localStorage.setItem(recipes, JSON.stringify(storedRecipes))
  }

  private ingredientAdapter = new IngredientAdapter(services.postImage)
  private ingredientRepository = new IngredientRepository()

  private recipeAdapter = new RecipeAdapter(
    services.postImage,
    this.ingredientAdapter.retrieveIngredient,
    this.ingredientAdapter.adaptIngredient,
    this.ingredientRepository,
    RelationsStorage.getRelationsByRecipeId
  )

  async find(id: string): Promise<Recipe> {
    const storedRecipes = this.getData()
    const storedRecipeFound = storedRecipes.find(r => r.id === id)
    if (!storedRecipeFound) throw new Error("Recipe not found!")
    const recipe = await this.recipeAdapter.storedToEntity(storedRecipeFound)
    return Promise.resolve(recipe)
  }
  async findAll(): Promise<Recipe[]> {
    const storedRecipes = this.getData()
    const recipes = await Promise.all(storedRecipes.map(
      async r => await this.recipeAdapter.storedToEntity(r))
    )
    return recipes
  }
  load(source: File): Promise<{ recipes: Recipe[], ingredients: Ingredient[] }> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsText(source)

      reader.onload = async () => {

        const data: [StoredRecipe[], StoredIngredient[], IngredientRecipe[]] =
          JSON.parse(reader.result as string)

        const recipes = await Promise.all(data[0].map(
          async r => await this.recipeAdapter.storedToEntity(r)))
        const ingredients = data[1].map(
          item => this.ingredientAdapter.storedToEntity(item)
        )
        
        // Add each ingredient to each recipe
        recipes.forEach(recipe => {
          const relationsFound = data[2].filter(item => item.recipeId === recipe.id)
          relationsFound.forEach(async (item) => {
            const ingredient = ingredients.find(ing => ing.id === item.ingredientId)
            if (ingredient)
              recipe.addIngredient(ingredient, item.ingredientGrams)
          })
        })

        
        resolve({ recipes, ingredients })
      }

      reader.onerror = (error) => {
        reject(error)
      }
    })
  }

  async create(recipe: Recipe): Promise<void> {
    const storedRecipes = this.getData()
    storedRecipes.push(this.recipeAdapter.entityToStored(recipe))
    this.setData(storedRecipes)

    RelationsStorage.addRelationsByRecipe(recipe)

    return Promise.resolve()
  }
  async createList(recipes: Recipe[]): Promise<void> {
    const storedRecipes = this.getData()
    const newStoredRecipes = recipes.map(
      r => this.recipeAdapter.entityToStored(r)
    )
    const totalStoredRecipes = storedRecipes.concat(newStoredRecipes)
    this.setData(totalStoredRecipes)

    recipes.forEach(recipe => {
      RelationsStorage.addRelationsByRecipe(recipe)
    })
    
    return Promise.resolve()
  }
  async update(updatedRecipe: Recipe): Promise<void> {
    const { id } = updatedRecipe
    const storedRecipes = this.getData()
    const indexFound = storedRecipes.findIndex(recipe => recipe.id === id)
    if (indexFound === -1) throw new Error(`There's no such recipe with id ${id}.`)

    const updatedStoredRecipes = this.recipeAdapter.entityToStored(updatedRecipe)
    storedRecipes.splice(indexFound, 1, updatedStoredRecipes)
    this.setData(storedRecipes)

    RelationsStorage.removeRelationsByRecipeId(id)
    RelationsStorage.addRelationsByRecipe(updatedRecipe)

    return Promise.resolve()
  }
  delete(id: string): Promise<void> {
    const storedRecipes = this.getData()
    const indexFound = storedRecipes.findIndex(recipe => recipe.id === id)
    if (indexFound === -1) throw new Error(`There's no recipe with id ${id}.`)

    storedRecipes.splice(indexFound, 1)
    this.setData(storedRecipes)

    RelationsStorage.removeRelationsByRecipeId(id)

    return Promise.resolve()
  }

}