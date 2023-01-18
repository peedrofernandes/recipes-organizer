import Recipe from "../domain/Recipe";
import IUseCase from "./IUseCase";

export default class GeneratePDFUseCase implements IUseCase {
  constructor(
    private generatePDFMethod: (recipes: Recipe[]) => any
  ) { }

  execute(recipes: Recipe[]) {
    return this.generatePDFMethod(recipes)
  }
}