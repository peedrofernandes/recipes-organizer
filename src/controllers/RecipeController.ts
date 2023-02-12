import CreateRecipe from "../domain/application/CreateRecipe"
import DeleteRecipe from "../domain/application/DeleteRecipe"
import GenerateJson from "../domain/application/GenerateJson"
import LoadRecipesFromJson from "../domain/application/LoadRecipesFromJson"
import RandomizeRecipes from "../domain/application/RandomizeRecipes"
import UpdateRecipe from "../domain/application/UpdateRecipe"
import Ingredient from "../domain/entities/Ingredient"
import Recipe from "../domain/entities/Recipe"

import { IRepository } from "../domain/repositories/IRepository"
import { Id } from "../domain/utilities/types/Id"
import { AdaptedRecipe, RecipeInput } from "./AdaptedTypes"
import { IngredientAdapter } from "./IngredientAdapter"
import { RecipeAdapter } from "./RecipeAdapter"

export default class RecipeController {
  private ingredientAdapter: IngredientAdapter
  private recipeAdapter: RecipeAdapter

  // ----------- CONSTRUCTOR ------------

  constructor(
    private recipeRepository: IRepository<Recipe>,
    private ingredientRepository: IRepository<Ingredient>,
    private turnIntoJsonMethod: (recipes: AdaptedRecipe[]) => any,
    private generatePDFMethod: (recipesWithDates: [Id, Date][]) => any,
    private uiCallbacks: {
      updateUIOnCreate: (recipe: AdaptedRecipe) => void,
      updateUIOnUpdate: (recipe: AdaptedRecipe) => void,
      updateUIOnDelete: (id: Id) => void
    },
    private services: {
      postImage: (image: File) => Promise<string>,
      retrieveImage: (imageUrl: string) => Promise<File>
    }
  ) { 
    this.ingredientAdapter = new IngredientAdapter(
      this.services.postImage)
    this.recipeAdapter = new RecipeAdapter(
      this.services.postImage,
      this.ingredientAdapter.retrieveIngredient,
      this.ingredientAdapter.adaptIngredient
    )
  }


  // ------------------------------------

  // --------- PRIVATE METHODS ----------

  // ------------------------------------

  // ------------ PUBLIC API ------------

  public async createRecipe(input: RecipeInput): Promise<void> {
    const updateUI = async (recipe: Recipe) => {
      const adaptedRecipe = this.recipeAdapter.adaptRecipe(recipe)
      this.uiCallbacks.updateUIOnCreate(adaptedRecipe)
    }
    const createRecipeUseCase = new CreateRecipe(this.recipeRepository, updateUI)
    console.trace(input)
    const recipe = await this.recipeAdapter.createRecipeEntity(input)
    console.trace(recipe)
    await createRecipeUseCase.execute(recipe)
  }

  public async getAllRecipes(): Promise<AdaptedRecipe[]> {
    const recipes = await this.recipeRepository.findAll()
    const adaptedRecipes = recipes.map(
      recipe => this.recipeAdapter.adaptRecipe(recipe)
    )
    return adaptedRecipes
  }

  public async updateRecipe(input: RecipeInput, id: Id) {
    const updateUI = (recipe: Recipe) => {
      const adaptedRecipe = this.recipeAdapter.adaptRecipe(recipe)
      this.uiCallbacks.updateUIOnUpdate(adaptedRecipe)
    }
    const updateRecipeUseCase = new UpdateRecipe(this.recipeRepository, updateUI)

    const recipe = await this.recipeAdapter.createRecipeEntity(input, id)
    await updateRecipeUseCase.execute(recipe)
  }

  public async deleteRecipe(id: Id) {
    const deleteRecipeUseCase = new DeleteRecipe(
      this.recipeRepository, this.uiCallbacks.updateUIOnDelete
    )
    await deleteRecipeUseCase.execute(id)
  }

  public async turnRecipesIntoJson(adaptedRecipes: AdaptedRecipe[]) {
    const turnIntoJsonMethod = async (recipes: Recipe[]) => {
      const adaptedRecipes = recipes.map(
        r => this.recipeAdapter.adaptRecipe(r)
      )
      return this.turnIntoJsonMethod(adaptedRecipes)
    }
    const generateJsonUseCase = new GenerateJson(turnIntoJsonMethod)
    const recipes = adaptedRecipes.map(
      r => this.recipeAdapter.retrieveRecipe(r)
    )
    await generateJsonUseCase.execute(recipes)
  }

  public async loadRecipesFromJson(jsonFile: any) {
    const loadRecipesFromJsonUseCase = new LoadRecipesFromJson(
      this.ingredientRepository, this.recipeRepository
    )
    const { newIngredients, newRecipes } = await loadRecipesFromJsonUseCase.execute(jsonFile)
    return { newIngredients, newRecipes }
  }

  public async randomizeAndGeneratePDF(recipes: Recipe[], date: Date) {
    const generatePDF = (recipesWithDates: [Recipe, Date][]) => {
      const adaptedParams = recipesWithDates.map(
        ([recipe, date]) => [recipe.id, date] as [Id, Date]
      )
      return this.generatePDFMethod(adaptedParams)
    }
    const randomizeRecipesUseCase = new RandomizeRecipes(generatePDF)
    randomizeRecipesUseCase.execute(recipes, date)
  }

  // ------------------------------------
}