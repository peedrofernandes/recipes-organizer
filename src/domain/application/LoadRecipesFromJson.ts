import IUseCase from "./IUseCase";

export default class LoadRecipesFromJsonUseCase implements IUseCase {
  constructor(
    private loadMethod: (jsonFile: any) => void
  ) { }
  
  execute(jsonFile: any) {
    this.loadMethod(jsonFile)
  }
}