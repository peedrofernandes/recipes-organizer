import CreateRecipe from "../domain/application/CreateRecipe";
import DeleteRecipe from "../domain/application/DeleteRecipe";
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
  macros?: [number, number, number, number]
}

export default class RecipeController {
  private createRecipeUseCase: CreateRecipe;
  private updateRecipeUseCase: UpdateRecipe;
  private deleteRecipeUseCase: DeleteRecipe;

  constructor(
    private recipeRepository: IRepository<Recipe>,
    private generateIDMethod: () => Id
  ) { 
    this.createRecipeUseCase = new CreateRecipe(this.recipeRepository);
    this.updateRecipeUseCase = new UpdateRecipe(this.recipeRepository);
    this.deleteRecipeUseCase = new DeleteRecipe(this.recipeRepository);
  }

  public async createRecipe(attributes: RecipeAttributes) {
    const options = {
      description: attributes.description,
      imageUrl: attributes.imageUrl
    }

    const ingredients = attributes.ingredients?.map((item) => ({
      ingredient: item[0],
      totalGrams: item[1]
    }))

    const macros = attributes.macros ? {
      proteins: attributes.macros[0],
      carbs: attributes.macros[1],
      fats: attributes.macros[2],
      totalGrams: attributes.macros[3]
    } : undefined

    const recipe = new Recipe({
      id: this.generateIDMethod(),
      name: attributes.name,
      type: attributes.type,

      ...(isRecipeOptions(options) ? {
        options: { ...options }
      } : undefined),

      ...(ingredients && ingredients.length > 0 ? {
        ingredients: { ...ingredients }
      } : undefined),
      
      ...(macros ? {
        macros: { ...macros }
      } : undefined)
    })

    await this.createRecipeUseCase.execute(recipe);
  }

  public async getAllRecipes() {
    return await this.recipeRepository.findAll();
  }

  public async updateRecipe(id: Id, attributes: Partial<RecipeAttributes>) {
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
      fats: attributes.macros[2],
      totalGrams: attributes.macros[3]
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

    await this.updateRecipeUseCase.execute(id, newRecipeAttributes);
  }

  public async deleteRecipe(id: Id) {
    await this.deleteRecipeUseCase.execute(id);
  }
}