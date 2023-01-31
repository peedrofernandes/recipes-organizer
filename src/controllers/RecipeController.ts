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

type RecipeAttributes = {
  name: string,
  type: "Week" | "Weekend" | "Both",
  description?: string,
  imageUrl?: string,
  ingredients?: [Ingredient, number][],
  macros?: [number, number, number]
}

export default class RecipeController {
  constructor(
    private recipeRepository: IRepository<Recipe>,
    private ingredientRepository: IRepository<Ingredient>,
    private generateIDMethod: () => Id,
    private turnIntoJsonMethod: (recipes: RecipeAttributes[]) => any,
    private generatePDFMethod: (recipesWithDates: [Id, Date][]) => any
  ) { }

  private adaptRecipe(id: Id, attributes: RecipeAttributes): Recipe {
    const options = {
      description: attributes.description,
      imageUrl: attributes.imageUrl
    }

    const ingredients = attributes.ingredients?.map(i => ({
      ingredient: i[0],
      totalGrams: i[1]
    }));

    return new Recipe({
      id,
      name: attributes.name,
      type: attributes.type,
      ingredientList: (ingredients ?? undefined),
      options: (isRecipeOptions(options) ? { ...options } : undefined)
    })
  }

  private getAttributes(recipe: Recipe): RecipeAttributes {
    return {
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

  public async createRecipe(attributes: RecipeAttributes) {
    const createRecipeUseCase = new CreateRecipe(this.recipeRepository);

    const recipe = this.adaptRecipe(this.generateIDMethod(), attributes);

    await createRecipeUseCase.execute(recipe);
  }

  public async getAllRecipes() {
    return await this.recipeRepository.findAll();
  }

  public async updateRecipe(id: Id, attributes: Partial<RecipeAttributes>) {
    const updateRecipeUseCase = new UpdateRecipe(this.recipeRepository);

    const modifiedRecipe = await this.recipeRepository.find(id);
    
    const options = {
      description: attributes.description,
      imageUrl: attributes.imageUrl
    }

    const ingredients = attributes.ingredients?.map(item => ({
      ingredient: item[0],
      totalGrams: item[1]
    }))

    const macros = attributes.macros ? {
      proteins: attributes.macros[0],
      carbs: attributes.macros[1],
      fats: attributes.macros[2]
    } : undefined;

    const newRecipeAttributes = {
      name: attributes.name ?? modifiedRecipe.name,
      type: attributes.type ?? modifiedRecipe.type,

      options: (isRecipeOptions(options) ? {
        ...options
      } : modifiedRecipe.options),

      ingredientList: (ingredients && ingredients.length > 0 ? {
        ...ingredients
      } : modifiedRecipe.ingredientList),

      macros: (macros ? {
        ...macros
      } : modifiedRecipe.macros)
    }

    await updateRecipeUseCase.execute(id, newRecipeAttributes);
  }

  public async deleteRecipe(id: Id) {
    const deleteRecipeUseCase = new DeleteRecipe(this.recipeRepository);
    await deleteRecipeUseCase.execute(id);
  }

  public async turnRecipesIntoJson(attributes: RecipeAttributes[]) {
    const turnIntoJsonMethod = (recipes: Recipe[]) => {
      const transformedRecipes = recipes.map(r => this.getAttributes(r));
      return this.turnIntoJsonMethod(transformedRecipes);
    }

    const generateJsonUseCase = new GenerateJson(turnIntoJsonMethod);

    const recipes = attributes.map(
      attr => this.adaptRecipe(this.generateIDMethod(), attr)
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
}