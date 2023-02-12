import Ingredient, { isIngredientOptions } from "@domain/entities/Ingredient"
import { Id } from "@domain/utilities/types/Id"
import { AdaptedIngredient, IngredientInput } from "./AdaptedTypes"

export class IngredientAdapter {
  constructor(
    private postImage: (file: File) => Promise<string>
  ) { } 

  // EntityInput => Entity
  async createIngredientEntity(input: IngredientInput, id?: Id): Promise<Ingredient> {
    const { name, description, imageFile, macros } = input

    const options = {
      description,
      imageUrl: imageFile ? await this.postImage(imageFile) : null
    }
  
    return new Ingredient({
      id,
      name,
      macros: (macros ? {
        proteins: macros[0],
        carbs: macros[1],
        fats: macros[2],
        gramsPerServing: macros[3]
      } : undefined),
      options: (isIngredientOptions(options) ? options : undefined)
    })
  }

  // Entity => AdaptedEntity
  adaptIngredient(ingredient: Ingredient): AdaptedIngredient {
    const { id, name, macros, options } = ingredient

    return {
      id, name,
      description: options?.description,
      imageUrl: options?.imageUrl,
      macros: (macros ? [
        macros.proteins,
        macros.carbs,
        macros.fats,
        macros.gramsPerServing
      ] : undefined)
    }
  }

  // AdaptedEntity => Entity
  retrieveIngredient(adaptedIngredient: AdaptedIngredient): Ingredient {
    const { id, name, description, imageUrl, macros } = adaptedIngredient
 
    const options = { description, imageUrl }

    return new Ingredient({
      id, name,
      options: (isIngredientOptions(options) ? options : undefined),
      macros: (macros ? {
        proteins: macros[0],
        carbs: macros[1],
        fats: macros[2],
        gramsPerServing: macros[3]
      } : undefined)
    })
  }
}