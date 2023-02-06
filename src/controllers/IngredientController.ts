import UpdateIngredient from "../domain/application/UpdateIngredient"
import CreateIngredient from "../domain/application/CreateIngredient"
import DeleteIngredient from "../domain/application/DeleteIngredient"
import Ingredient from "../domain/entities/Ingredient"
import { IRepository } from "../domain/repositories/IRepository"
import { Id } from "../domain/utilities/types/Id"
import { AdaptedIngredient } from "./AdaptedTypes"
import { Values } from "@domain/utilities/types/Values"
import { adaptIngredient, getIngredientEntityValues } from "./IngredientAdapter"

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
      postImage: (image: File) => Promise<string>,
      retrieveImage: (imageUrl: string) => Promise<File>
    }
  ) { }

  // ------------------------------------

  // --------- PRIVATE METHODS ----------
  // ------------------------------------

  // ------------ PUBLIC API ------------

  public async createIngredient(
    values: Values<AdaptedIngredient>
  ): Promise<void> {
    const updateUI = async (ingredient: Ingredient) => {
      const adaptedIngredient = await adaptIngredient(
        ingredient,
        this.services.retrieveImage
      )
      this.uiCallbacks.updateUIOnCreate(adaptedIngredient)
    }
    const createIngredientUseCase = new CreateIngredient(
      this.ingredientRepository,
      updateUI
    )

    if (values.imageFile) {
      values.imageUrl = await this.services.postImage(values.imageFile)
    }

    const entityValues = getIngredientEntityValues(values)

    await createIngredientUseCase.execute(entityValues)
  }

  public async getAllIngredients(): Promise<AdaptedIngredient[]> {
    const ingredients = await this.ingredientRepository.findAll()
    const adaptedIngredients = Promise.all(ingredients.map(
      async item => await adaptIngredient(item, this.services.retrieveImage)
    ))
    return adaptedIngredients
  }

  public async updateIngredient(id: Id, values: Values<AdaptedIngredient>) {
    const updateUI = async (ingredient: Ingredient) => {
      const adaptedIngredient = await adaptIngredient(ingredient, this.services.retrieveImage)
      this.uiCallbacks.updateUIOnUpdate(adaptedIngredient)
    }
    const updateIngredientUseCase = new UpdateIngredient(
      this.ingredientRepository,
      updateUI
    )

    const modifiedIngredient: AdaptedIngredient = await adaptIngredient(
      await this.ingredientRepository.find(id),
      this.services.retrieveImage
    )

    const mergedValues: Values<AdaptedIngredient> = {
      name: values.name ?? modifiedIngredient.name,
      description: values.description ?? modifiedIngredient.description,
      imageUrl: values.imageUrl ?? modifiedIngredient.imageUrl,
      imageFile: values.imageFile ?? modifiedIngredient.imageFile,
      macros: values.macros ?? modifiedIngredient.macros
    }

    const newIngredientValues = getIngredientEntityValues(mergedValues)

    await updateIngredientUseCase.execute(id, newIngredientValues)
  }

  public async deleteIngredient(id: Id) {
    const deleteIngredientUseCase = new DeleteIngredient(
      this.ingredientRepository,
      this.uiCallbacks.updateUIOnDelete
    )
    await deleteIngredientUseCase.execute(id)
  }

  // ------------------------------------
}