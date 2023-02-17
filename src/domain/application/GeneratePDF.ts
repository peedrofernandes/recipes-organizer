import Recipe from "@domain/entities/Recipe"
import IUseCase from "./_IUseCase"

export default class GeneratePDF implements IUseCase<[[Recipe, Date][]], void> {
  constructor(
    private generatePDFMethod: (recipesWithDates: [Recipe, Date][]) => Promise<void>
  ) { }

  async execute(recipesWithDates: [Recipe, Date][]) {
    await this.generatePDFMethod(recipesWithDates)
  }
}