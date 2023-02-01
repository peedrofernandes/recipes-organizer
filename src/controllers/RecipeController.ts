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
    private generatePDFMethod: (recipesWithDates: [Id, Date][]) => any
    ) { }
    
  // ------------------------------------

  // --------- PRIVATE METHODS ----------

  private adaptAttributes(attributes: Attributes<Recipe>): Attributes<AdaptedRecipe> {
    return {
      name: attributes.name,
      type: attributes.type,
      description: attributes.options?.description,
      imageUrl: attributes.options?.imageUrl,
      ingredients: (attributes.ingredientList ? attributes.ingredientList.map(
        item => [item.ingredient, item.totalGrams]
      ) : undefined),
      macros: (attributes.macros ? [
        attributes.macros?.proteins,
        attributes.macros?.carbs,
        attributes.macros?.fats
      ] : undefined)
    }
  }
  private adaptRecipe(recipe: Recipe): AdaptedRecipe {
    return {
      id: recipe.id,
      ...this.adaptAttributes(recipe)
    }
  }
  private getOriginalAttributes(adaptedAttributes: Attributes<AdaptedRecipe>): Attributes<Recipe> {
    const options = {
      description: adaptedAttributes.description,
      imageUrl: adaptedAttributes.imageUrl
    }

    return {
      name: adaptedAttributes.name,
      type: adaptedAttributes.type,
      options: (isRecipeOptions(options) ? options : undefined),
      ingredientList: (adaptedAttributes.ingredients ? adaptedAttributes.ingredients.map(
        item => ({ ingredient: item[0], totalGrams: item[1] })
      ) : undefined),
      macros: (adaptedAttributes.macros ? ({
        proteins: adaptedAttributes.macros[0],
        carbs: adaptedAttributes.macros[1],
        fats: adaptedAttributes.macros[2]
      }) : undefined)
    }
  }
  private getOriginalScheme(adaptedRecipe: AdaptedRecipe): Recipe {
    return new Recipe({
      id: adaptedRecipe.id,
      ...this.getOriginalAttributes(adaptedRecipe as Attributes<AdaptedRecipe>)
    })
  }

  // ------------------------------------

  // ------------ PUBLIC API ------------

  public async createRecipe(adaptedAttributes: Attributes<AdaptedRecipe>): Promise<void> {
    const createRecipeUseCase = new CreateRecipe(this.recipeRepository);

    const attributes = this.getOriginalAttributes(adaptedAttributes);

    await createRecipeUseCase.execute(new Recipe({...attributes}));
  }

  public async getAllRecipes(): Promise<AdaptedRecipe[]> {
    const recipes = await this.recipeRepository.findAll();
    const adaptedRecipes = recipes.map(recipe => this.adaptRecipe(recipe));
    return adaptedRecipes;
  }

  public async updateRecipe(id: Id, attributes: Attributes<AdaptedRecipe>) {
    const updateRecipeUseCase = new UpdateRecipe(this.recipeRepository);
    const existingRecipe = await this.recipeRepository.find(id);

    const originalAttributes = this.getOriginalAttributes(attributes);

    const mergedOptions = {
      description: originalAttributes.options?.description,
      imageUrl: existingRecipe.options?.imageUrl
    }

    const mergedRecipe: Attributes<Recipe> = {
      name: originalAttributes.name ?? existingRecipe.name,
      type: originalAttributes.type ?? existingRecipe.type,
      options: (isRecipeOptions(mergedOptions) ? mergedOptions : undefined),
      ingredientList: originalAttributes.ingredientList ?? originalAttributes.ingredientList,
      macros: originalAttributes.macros ?? existingRecipe.macros
    }

    await updateRecipeUseCase.execute(id, mergedRecipe);
  }

  public async deleteRecipe(id: Id) {
    const deleteRecipeUseCase = new DeleteRecipe(this.recipeRepository);
    await deleteRecipeUseCase.execute(id);
  }

  public async turnRecipesIntoJson(adaptedRecipes: AdaptedRecipe[]) {
    const turnIntoJsonMethod = (recipes: Recipe[]) => {
      const transformedRecipes = recipes.map(r => this.adaptRecipe(r));
      return this.turnIntoJsonMethod(transformedRecipes);
    }

    const generateJsonUseCase = new GenerateJson(turnIntoJsonMethod);

    const recipes = adaptedRecipes.map(
      item => this.getOriginalScheme(item)
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