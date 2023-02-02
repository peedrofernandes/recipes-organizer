import { Values } from "@domain/value-objects/Values";
import CreateRecipe from "../domain/application/CreateRecipe";
import DeleteRecipe from "../domain/application/DeleteRecipe";
import GenerateJson from "../domain/application/GenerateJson";
import LoadRecipesFromJson from "../domain/application/LoadRecipesFromJson";
import RandomizeRecipes from "../domain/application/RandomizeRecipes";
import UpdateRecipe from "../domain/application/UpdateRecipe"
import Ingredient from "../domain/entities/Ingredient";
import Recipe, { isRecipeOptions } from "../domain/entities/Recipe";
import { IRepository } from "../domain/repositories/IRepository";
import { Id } from "../domain/value-objects/Id";
import { AdaptedRecipe } from "./AdaptedTypes";
import { adaptRecipe, getRecipeEntityValues } from "./RecipeAdapter";

export default class RecipeController {
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
    ) { }
    
  // ------------------------------------

  // --------- PRIVATE METHODS ----------

  // ------------------------------------

  // ------------ PUBLIC API ------------

  public async createRecipe(
    adaptedValues: Values<AdaptedRecipe>
  ): Promise<void> {
    const updateUI = async (recipe: Recipe) => {
      const adaptedRecipe = await adaptRecipe(recipe, this.services.retrieveImage);
      this.uiCallbacks.updateUIOnCreate(adaptedRecipe);
    }
    const createRecipeUseCase = new CreateRecipe(
      this.recipeRepository,
      updateUI
    );

    const attributes = getRecipeEntityValues(adaptedValues);
    await createRecipeUseCase.execute(attributes);
  }

  public async getAllRecipes(): Promise<AdaptedRecipe[]> {
    const recipes = await this.recipeRepository.findAll();
    const adaptedRecipes = Promise.all(recipes.map(
      async (recipe) => await adaptRecipe(recipe, this.services.retrieveImage)
    ));
    return adaptedRecipes;
  }

  public async updateRecipe(id: Id, newValues: Values<AdaptedRecipe>) {
    const updateUI = async (recipe: Recipe) => {
      const adaptedRecipe = await adaptRecipe(recipe, this.services.retrieveImage);
      this.uiCallbacks.updateUIOnUpdate(adaptedRecipe)
    }
    const updateRecipeUseCase = new UpdateRecipe(
      this.recipeRepository,
      updateUI
    );

    const modifiedRecipe = await adaptRecipe(
      await this.recipeRepository.find(id),
      this.services.retrieveImage
    );

    const adaptedMergedValues: Values<AdaptedRecipe> = {
      name: newValues.name ?? modifiedRecipe.name,
      type: newValues.type ?? modifiedRecipe.type,
      description: newValues.description ?? modifiedRecipe.description,
      imageUrl: newValues.imageUrl ?? modifiedRecipe.imageUrl,
      imageFile: newValues.imageFile ?? modifiedRecipe.imageFile,
      ingredients: newValues.ingredients ?? modifiedRecipe.ingredients,
      macros: newValues.macros ?? modifiedRecipe.macros
    }

    const newRecipeValues = getRecipeEntityValues(adaptedMergedValues);

    await updateRecipeUseCase.execute(id, newRecipeValues);
  }

  public async deleteRecipe(id: Id) {
    const deleteRecipeUseCase = new DeleteRecipe(
      this.recipeRepository,
      this.uiCallbacks.updateUIOnDelete
    );
    await deleteRecipeUseCase.execute(id);
  }

  public async turnRecipesIntoJson(adaptedRecipes: AdaptedRecipe[]) {
    const turnIntoJsonMethod = async (recipes: Recipe[]) => {
      const transformedRecipes = await Promise.all(recipes.map(async r => await adaptRecipe(r, this.services.retrieveImage)));
      return this.turnIntoJsonMethod(transformedRecipes);
    }
    const generateJsonUseCase = new GenerateJson(turnIntoJsonMethod);

    const recipes: Recipe[] = adaptedRecipes.map(
      item => new Recipe({
        id: item.id,
        ...getRecipeEntityValues(item as Values<AdaptedRecipe>)
      })
    )

    await generateJsonUseCase.execute(recipes);
  }

  public async loadRecipesFromJson(jsonFile: any) {
    const loadRecipesFromJsonUseCase = new LoadRecipesFromJson(
      this.ingredientRepository,
      this.recipeRepository
    );

    const { newIngredients, newRecipes } = await loadRecipesFromJsonUseCase.execute(jsonFile);

    return { newIngredients, newRecipes };
  }

  public async randomizeAndGeneratePDF(recipes: Recipe[], date: Date) {
    const generatePDF = (recipesWithDates: [Recipe, Date][]) => {
      const adaptedParams = recipesWithDates.map(
        ([recipe, date]) => [recipe.id, date] as [Id, Date]
      )
      return this.generatePDFMethod(adaptedParams);
    }

    const randomizeRecipesUseCase = new RandomizeRecipes(generatePDF);

    randomizeRecipesUseCase.execute(recipes, date)
  }

  // ------------------------------------
}