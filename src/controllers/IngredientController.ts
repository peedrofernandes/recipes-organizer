import UpdateIngredient from "../domain/application/UpdateIngredient";
import CreateIngredient from "../domain/application/CreateIngredient";
import DeleteIngredient from "../domain/application/DeleteIngredient";
import Ingredient, { isIngredientOptions } from "../domain/entities/Ingredient";
import { IRepository } from "../domain/repositories/IRepository";
import { Id } from "../domain/value-objects/Id";

type IngredientAttributes = {
  name: string;
  description?: string;
  imageUrl?: string;
  macros?: [number, number, number, number];
}

export default class IngredientController {
  private createIngredientUseCase: CreateIngredient
  private updateIngredientUseCase: UpdateIngredient
  private deleteIngredientUseCase: DeleteIngredient

  constructor(
    private ingredientRepository: IRepository<Ingredient>,
    private generateIDMethod: () => Id
  ) { 
    this.createIngredientUseCase = new CreateIngredient(this.ingredientRepository);
    this.updateIngredientUseCase = new UpdateIngredient(this.ingredientRepository);
    this.deleteIngredientUseCase = new DeleteIngredient(this.ingredientRepository);
  }

  public async createIngredient(attributes: IngredientAttributes) {
    const options = {
      description: attributes.description,
      imageUrl: attributes.imageUrl
    }

    const ingredient = new Ingredient({
      id: this.generateIDMethod(),
      name: attributes.name,

      ...(isIngredientOptions(options) ? {
        options: { ...options }
      } : {}),

      ...(attributes.macros ? {
        macros: {
          proteins: attributes.macros[0],
          carbs: attributes.macros[1],
          fats: attributes.macros[2],
          gramsPerServing: attributes.macros[3]
        }
      } : {})
    })

    await this.createIngredientUseCase.execute(ingredient);
  } 

  public async getAllIngredients() {
    return await this.ingredientRepository.findAll();
  }

  public async updateIngredient(id: Id, attributes: Partial<IngredientAttributes>) {
    const modifiedIngredient = await this.ingredientRepository.find(id);

    const options = {
      description: attributes.description,
      imageUrl: attributes.imageUrl
    }

    const newIngredientAttributes = {
      name: attributes.name ?? modifiedIngredient.name,

      options: (isIngredientOptions(options)) ? {
        ...options
      } : modifiedIngredient.options,

      macros: attributes.macros ? ({
        proteins: attributes.macros[0],
        carbs: attributes.macros[1],
        fats: attributes.macros[2],
        gramsPerServing: attributes.macros[3]
      }) : modifiedIngredient.macros
    }

    await this.updateIngredientUseCase.execute(id, newIngredientAttributes);
  }

  public async deleteIngredient(id: Id) {
    await this.deleteIngredientUseCase.execute(id);
  }


}