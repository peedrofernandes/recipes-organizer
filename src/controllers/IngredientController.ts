import UpdateIngredient from "../domain/application/UpdateIngredient";
import CreateIngredient from "../domain/application/CreateIngredient";
import DeleteIngredient from "../domain/application/DeleteIngredient";
import Ingredient, { isIngredientOptions } from "../domain/entities/Ingredient";
import { IRepository } from "../domain/repositories/IRepository";
import { Id } from "../domain/value-objects/Id";
import { Attributes } from "../domain/value-objects/Attributes";
import { AdaptedIngredient } from "./AdaptedTypes";

export default class IngredientController {

  // ----------- CONSTRUCTOR ------------
  
  constructor(
    private ingredientRepository: IRepository<Ingredient>,
    private uiCallbacks: {
      updateUIOnCreate: (ingredient: AdaptedIngredient) => void,
      updateUIOnUpdate: (ingredient: AdaptedIngredient) => void,
      updateUIOnDelete: (id: Id) => void
    },
    private services: {
      postImage: (image: File) => string | undefined,
      retrieveImage: (imageUrl: string) => File | undefined
    }
  ) { }
  
  // ------------------------------------

  // --------- PRIVATE METHODS ----------

  private adaptIngredient(ingredient: Ingredient): AdaptedIngredient {
    return {
      id: ingredient.id,
      name: ingredient.name,
      description: ingredient.options?.description,
      imageFile: (ingredient.options?.imageUrl ? (
        this.services.retrieveImage(ingredient.options.imageUrl)
      ) : undefined),
      imageUrl: ingredient.options?.imageUrl,
      macros: (ingredient.macros ? [
        ingredient.macros.proteins,
        ingredient.macros.carbs,
        ingredient.macros.fats,
        ingredient.macros.gramsPerServing
      ] : undefined)
    }
  }

  private getSchemeAttributes(
    adaptedAttributes: Attributes<AdaptedIngredient>
  ): Attributes<Ingredient> {
    const options = {
      description: adaptedAttributes.description,
      imageUrl: adaptedAttributes.imageUrl
    }

    return {
      name: adaptedAttributes.name,
      macros: (adaptedAttributes.macros ? {
        proteins: adaptedAttributes.macros[0],
        carbs: adaptedAttributes.macros[1],
        fats: adaptedAttributes.macros[2],
        gramsPerServing: adaptedAttributes.macros[3],
      } : undefined),
      options: (isIngredientOptions(options) ? options : undefined)
    }
  }
  // ------------------------------------
    
  // ------------ PUBLIC API ------------

  public async createIngredient(
    attributes: Attributes<AdaptedIngredient>
  ): Promise<void> {
    const updateUI = (ingredient: Ingredient) => {
      const adaptedIngredient = this.adaptIngredient(ingredient);
      this.uiCallbacks.updateUIOnCreate(adaptedIngredient);
    }
    const createIngredientUseCase = new CreateIngredient(
      this.ingredientRepository,
      updateUI
    );

    if (attributes.imageFile) {
      attributes.imageUrl = this.services.postImage(attributes.imageFile)
    }

    const schemeAttributes = this.getSchemeAttributes(attributes);

    await createIngredientUseCase.execute(schemeAttributes);
  } 

  public async getAllIngredients(): Promise<AdaptedIngredient[]> {
    const ingredients = await this.ingredientRepository.findAll();
    const adaptedIngredients = ingredients.map(
      item => this.adaptIngredient(item)
    );
    return adaptedIngredients;
  }

  public async updateIngredient(id: Id, attributes: Attributes<AdaptedIngredient>) {
    const updateUI = (ingredient: Ingredient) => {
      const adaptedIngredient = this.adaptIngredient(ingredient);
      this.uiCallbacks.updateUIOnUpdate(adaptedIngredient);
    }
    const updateIngredientUseCase = new UpdateIngredient(
      this.ingredientRepository,
      updateUI
    );

    const modifiedIngredient: AdaptedIngredient = this.adaptIngredient(
      await this.ingredientRepository.find(id)
    );

    const mergedAttributes: Attributes<AdaptedIngredient> = {
      name: attributes.name ?? modifiedIngredient.name,
      description: attributes.description ?? modifiedIngredient.description,
      imageUrl: attributes.imageUrl ?? modifiedIngredient.imageUrl,
      imageFile: attributes.imageFile ?? modifiedIngredient.imageFile,
      macros: attributes.macros ?? modifiedIngredient.macros
    }

    const newIngredientAttributes = this.getSchemeAttributes(mergedAttributes);

    await updateIngredientUseCase.execute(id, newIngredientAttributes);
  }

  public async deleteIngredient(id: Id) {
    const deleteIngredientUseCase = new DeleteIngredient(
      this.ingredientRepository,
      this.uiCallbacks.updateUIOnDelete
    );
    await deleteIngredientUseCase.execute(id);
  }

  // ------------------------------------
}