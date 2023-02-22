import GeneratePDF from "@domain/application/GeneratePDF"
import IRecipeRepository from "@domain/repositories/IRecipeRepository"
import CreateRecipe from "../domain/application/CreateRecipe"
import DeleteRecipe from "../domain/application/DeleteRecipe"
import GenerateJson from "../domain/application/GenerateJson"
import LoadRecipesFromJson from "../domain/application/LoadDataFromJson"
import RandomizeRecipes from "../domain/application/RandomizeRecipes"
import UpdateRecipe from "../domain/application/UpdateRecipe"
import Ingredient from "../domain/entities/Ingredient"
import Recipe from "../domain/entities/Recipe"

import { IRepository } from "../domain/repositories/IRepository"
import { Id } from "../domain/utilities/types/Id"
import { AdaptedIngredient, AdaptedRecipe, RecipeInput } from "./AdaptedTypes"
import { IngredientAdapter } from "./IngredientAdapter"
import { RecipeAdapter } from "./RecipeAdapter"

export default class RecipeController {
  private ingredientAdapter: IngredientAdapter
  private recipeAdapter: RecipeAdapter

  // ----------- CONSTRUCTOR ------------

  constructor(
    private recipeRepository: IRecipeRepository,
    private ingredientRepository: IRepository<Ingredient>,
    private turnDataIntoJsonMethod: (data: [AdaptedRecipe[], AdaptedIngredient[]]) => void,
    private generatePDFMethod: (
      adaptedRecipesWithDates: [AdaptedRecipe, Date][]
    ) => Promise<void>,
    private uiCallbacks: {
      updateUIOnCreate: (recipe: AdaptedRecipe) => void,
      updateUIOnUpdate: (recipe: AdaptedRecipe) => void,
      updateUIOnDelete: (id: Id) => void,
      updateUIOnLoad: (newData: [AdaptedIngredient[], AdaptedRecipe[]]) => void
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
    const recipe = await this.recipeAdapter.createRecipeEntity(input)
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

  public randomizeRecipes(adaptedRecipes: AdaptedRecipe[], initialDate: Date) {
    const randomizeRecipesUseCase = new RandomizeRecipes()
    
    const recipes = adaptedRecipes.map(r => this.recipeAdapter.retrieveRecipe(r))
    const randomizedRecipes = randomizeRecipesUseCase.execute(recipes, initialDate)
    const adaptedRandomizedRecipes: [AdaptedRecipe, Date][] = randomizedRecipes.map(
      ([r, date]) => [this.recipeAdapter.adaptRecipe(r), date]
    )
    return adaptedRandomizedRecipes
  }

  public generatePDF(adaptedRecipesWithDates: [AdaptedRecipe, Date][]) {
    const generatePDFMethod = async (recipesWithDates: [Recipe, Date][]) => {
      const adapted: [AdaptedRecipe, Date][] = recipesWithDates.map(
        ([r, date]) => [this.recipeAdapter.adaptRecipe(r), date])
      await this.generatePDFMethod(adapted)
    }
    const generatePDFUseCase = new GeneratePDF(generatePDFMethod)

    const recipesWithDates: [Recipe, Date][] = adaptedRecipesWithDates.map(
      ([recipe, date]) => [this.recipeAdapter.retrieveRecipe(recipe), date])
    return generatePDFUseCase.execute(recipesWithDates)
  }

  public async turnDataIntoJson(data: [AdaptedRecipe[], AdaptedIngredient[]]) {
    const turnIntoJsonMethod = async (recipes: Recipe[], ingredients: Ingredient[]) => {
      const adaptedRecipes = recipes.map(
        r => this.recipeAdapter.adaptRecipe(r)
      )
      const adaptedIngredients = ingredients.map(
        i => this.ingredientAdapter.adaptIngredient(i)
      )
      return this.turnDataIntoJsonMethod([adaptedRecipes, adaptedIngredients])
    }
    const generateJsonUseCase = new GenerateJson(turnIntoJsonMethod)
    const recipes = data[0].map(
      r => this.recipeAdapter.retrieveRecipe(r)
    )
    const ingredients = data[1].map(
      i => this.ingredientAdapter.retrieveIngredient(i)
    )
    await generateJsonUseCase.execute(recipes, ingredients)
  }

  public async loadRecipesFromJson(jsonFile: File): Promise<void> {
    const updateUI = (newData: { newIngredients: Ingredient[], newRecipes: Recipe[] }) => {
      const adaptedNewData: [AdaptedIngredient[], AdaptedRecipe[]] = [
        newData.newIngredients.map(i => this.ingredientAdapter.adaptIngredient(i)),
        newData.newRecipes.map(r => this.recipeAdapter.adaptRecipe(r))
      ]
      return this.uiCallbacks.updateUIOnLoad(adaptedNewData)
    }

    const loadRecipesFromJsonUseCase = new LoadRecipesFromJson(
      this.ingredientRepository, this.recipeRepository, updateUI
    )

    await loadRecipesFromJsonUseCase.execute(jsonFile)
  }

  // ------------------------------------
}