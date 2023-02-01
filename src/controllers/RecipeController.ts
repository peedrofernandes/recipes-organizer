import CreateRecipe from "../domain/application/CreateRecipe";
import DeleteRecipe from "../domain/application/DeleteRecipe";
import GenerateJson from "../domain/application/GenerateJson";
import LoadRecipesFromJson from "../domain/application/LoadRecipesFromJson";
import RandomizeRecipes from "../domain/application/RandomizeRecipes";
import UpdateRecipe from "../domain/application/UpdateRecipe"
import Ingredient from "../domain/entities/Ingredient";
import Recipe, { isRecipeOptions } from "../domain/entities/Recipe";
import { IRepository } from "../domain/repositories/IRepository";
import { Attributes } from "../domain/value-objects/Attributes";
import { Id } from "../domain/value-objects/Id";

type AdaptedRecipe = {
  id: Id,
  name: string,
  type: "Week" | "Weekend" | "Both",
  description?: string,
  imageUrl?: string,
  ingredients?: [Ingredient, number][],
  macros?: [number, number, number]
}

export default class RecipeController {
  // ----------- CONSTRUCTOR ------------
  
  constructor(
    private recipeRepository: IRepository<Recipe>,
    private ingredientRepository: IRepository<Ingredient>,
    private turnIntoJsonMethod: (recipes: AdaptedRecipe[]) => any,
    private generatePDFMethod: (recipesWithDates: [Id, Date][]) => any,
    private callbacks: {
      updateUIOnCreate: (recipe: AdaptedRecipe) => void,
      updateUIOnUpdate: (recipe: AdaptedRecipe) => void,
      updateUIOnDelete: (id: Id) => void
    }
    ) { }
    
  // ------------------------------------

  // --------- PRIVATE METHODS ----------

  private adaptRecipe(recipe: Recipe): AdaptedRecipe {
    return {
      id: recipe.id,
      name: recipe.name,
      type: recipe.type,
      description: recipe.options?.description,
      imageUrl: recipe.options?.imageUrl,
      ingredients: (recipe.ingredientList ? recipe.ingredientList.map(
        item => [item.ingredient, item.totalGrams]
      ) : undefined),
      macros: (recipe.macros ? [
        recipe.macros.proteins, recipe.macros.carbs, recipe.macros.fats
      ] : undefined)
    }
  }

  private getSchemeAttributes(
    adaptedAttr: Attributes<AdaptedRecipe>
  ): Attributes<Recipe> {
    const options = {
      description: adaptedAttr.description,
      imageUrl: adaptedAttr.imageUrl
    }

    return {
      name: adaptedAttr.name,
      type: adaptedAttr.type,
      options: (isRecipeOptions(options) ? options : undefined),
      ingredientList: (adaptedAttr.ingredients ? adaptedAttr.ingredients.map(
        item => ({ ingredient: item[0], totalGrams: item[1] })
      ) : undefined),
      macros: (adaptedAttr.macros ? ({
        proteins: adaptedAttr.macros[0],
        carbs: adaptedAttr.macros[1],
        fats: adaptedAttr.macros[2]
      }) : undefined)
    }
  }

  // ------------------------------------

  // ------------ PUBLIC API ------------

  public async createRecipe(
    adaptedAttributes: Attributes<AdaptedRecipe>
  ): Promise<void> {
    const updateUI = (recipe: Recipe) => {
      const adaptedRecipe = this.adaptRecipe(recipe);
      this.callbacks.updateUIOnCreate(adaptedRecipe);
    }
    const createRecipeUseCase = new CreateRecipe(
      this.recipeRepository,
      updateUI
    );

    const attributes = this.getSchemeAttributes(adaptedAttributes);
    await createRecipeUseCase.execute(attributes);
  }

  public async getAllRecipes(): Promise<AdaptedRecipe[]> {
    const recipes = await this.recipeRepository.findAll();
    const adaptedRecipes = recipes.map(recipe => this.adaptRecipe(recipe));
    return adaptedRecipes;
  }

  public async updateRecipe(id: Id, newAttributes: Attributes<AdaptedRecipe>) {
    const updateUI = (recipe: Recipe) => {
      const adaptedRecipe = this.adaptRecipe(recipe);
      this.callbacks.updateUIOnUpdate(adaptedRecipe)
    }
    const updateRecipeUseCase = new UpdateRecipe(
      this.recipeRepository,
      updateUI
    );

    const modifiedRecipe = this.adaptRecipe(
      await this.recipeRepository.find(id)
    );

    const adaptedMergedAttributes: Attributes<AdaptedRecipe> = {
      name: newAttributes.name ?? modifiedRecipe.name,
      type: newAttributes.type ?? modifiedRecipe.type,
      description: newAttributes.description ?? modifiedRecipe.description,
      imageUrl: newAttributes.imageUrl ?? modifiedRecipe.imageUrl,
      ingredients: newAttributes.ingredients ?? modifiedRecipe.ingredients,
      macros: newAttributes.macros ?? modifiedRecipe.macros
    }

    const newRecipeAttributes = this.getSchemeAttributes(adaptedMergedAttributes);

    await updateRecipeUseCase.execute(id, newRecipeAttributes);
  }

  public async deleteRecipe(id: Id) {
    const deleteRecipeUseCase = new DeleteRecipe(
      this.recipeRepository,
      this.callbacks.updateUIOnDelete
    );
    await deleteRecipeUseCase.execute(id);
  }

  public async turnRecipesIntoJson(adaptedRecipes: AdaptedRecipe[]) {
    const turnIntoJsonMethod = (recipes: Recipe[]) => {
      const transformedRecipes = recipes.map(r => this.adaptRecipe(r));
      return this.turnIntoJsonMethod(transformedRecipes);
    }
    const generateJsonUseCase = new GenerateJson(turnIntoJsonMethod);

    const recipes: Recipe[] = adaptedRecipes.map(
      item => new Recipe({
        id: item.id,
        ...this.getSchemeAttributes(item as Attributes<AdaptedRecipe>)
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