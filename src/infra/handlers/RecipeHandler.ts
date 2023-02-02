import { AdaptedRecipe } from "@controllers/AdaptedTypes";
import RecipeController from "@controllers/RecipeController";
import { Id } from "@domain/value-objects/Id";
import { IngredientRepository } from "./IngredientRepository";
import RecipeRepository from "./RecipeRepository";
import { services } from "./services";

export default function recipeHandler(
  updateUIOnCreate: (recipe: AdaptedRecipe) => void,
  updateUIOnUpdate: (recipe: AdaptedRecipe) => void,
  updateUIOnDelete: (id: Id) => void
) {
  const recipeRepository = new RecipeRepository();
  const ingredientRepository = new IngredientRepository();
  const uiCallbacks = { updateUIOnCreate, updateUIOnUpdate, updateUIOnDelete };
  const turnIntoJsonMethod = () => { };
  const generatePDFMethod = () => { };

  const recipeController = new RecipeController(
    recipeRepository,
    ingredientRepository,
    turnIntoJsonMethod,
    generatePDFMethod,
    uiCallbacks,
    services
  );

  return recipeController;
}