import Recipe from "../domain/Recipe";

class RandomizeRecipesAndGeneratePDF {
  constructor(
    private recipes: Recipe[],
    private generatePDFMethod: (recipes: Recipe[]) => any,
  ) { }

  execute() {
    const randomRecipies: Recipe[] = this.recipes.sort(() => Math.random() - 0.5)
    return this.generatePDFMethod(randomRecipies)
  }
}

export default RandomizeRecipesAndGeneratePDF