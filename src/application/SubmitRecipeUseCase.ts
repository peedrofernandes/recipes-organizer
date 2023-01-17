import Recipe from "../domain/Recipe";

class SubmitRecipeUseCase {
  constructor(
    private persistMethod: (recipe: Recipe) => Promise<void>,
    private recipe: Recipe
  ) { }

  async execute() {
    await this.persistMethod(this.recipe)
  }
}

export default SubmitRecipeUseCase