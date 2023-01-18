import Recipe from "../domain/Recipe";
import IUseCase from "./IUseCase";

export default class DeleteRecipeUseCase implements IUseCase {
  constructor(
    private deleteMethod: (id: number | string) => Promise<void>
  ) { }

  async execute (id: number | string) {
    await this.deleteMethod(id)
  }
}