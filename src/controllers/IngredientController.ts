import UpdateIngredient from "../domain/application/UpdateIngredient"
import CreateIngredient from "../domain/application/CreateIngredient"
import DeleteIngredient from "../domain/application/DeleteIngredient"
import Ingredient from "../domain/entities/Ingredient"
import { IRepository } from "../domain/repositories/IRepository"
import { Id } from "../domain/utilities/types/Id"
import { AdaptedIngredient, IngredientInput } from "./AdaptedTypes"
import { IngredientAdapter } from "./IngredientAdapter"

export default class IngredientController {
  private ingredientAdapter: IngredientAdapter

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
  ) { 
    this.ingredientAdapter = new IngredientAdapter(this.services.postImage)
  }


  // ------------------------------------

  // --------- PRIVATE METHODS ----------
  // ------------------------------------

  // ------------ PUBLIC API ------------

  public async createIngredient(input: IngredientInput): Promise<void> {
    const updateUI = async (ingredient: Ingredient) => {
      const adaptedIngredient = this.ingredientAdapter.adaptIngredient(ingredient)
      this.uiCallbacks.updateUIOnCreate(adaptedIngredient)
    }
    const createIngredientUseCase =
      new CreateIngredient(this.ingredientRepository, updateUI)
    const ingredient = await this.ingredientAdapter.createIngredientEntity(input)
    await createIngredientUseCase.execute(ingredient)
  }

  public async getAllIngredients(): Promise<AdaptedIngredient[]> {
    const ingredients = await this.ingredientRepository.findAll()
    const adaptedIngredients = ingredients.map(
      item => this.ingredientAdapter.adaptIngredient(item)
    )
    return adaptedIngredients
  }

  public async updateIngredient(adaptedIngredient: AdaptedIngredient) {
    const updateUI = (ingredient: Ingredient) => {
      const adaptedIngredient = this.ingredientAdapter.adaptIngredient(ingredient)
      this.uiCallbacks.updateUIOnUpdate(adaptedIngredient)
    }
    const updateIngredientUseCase = new UpdateIngredient(
      this.ingredientRepository, updateUI
    )
    const ingredient = this.ingredientAdapter.retrieveIngredient(adaptedIngredient)
    await updateIngredientUseCase.execute(ingredient)
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