import { AdaptedIngredient } from "@controllers/AdaptedTypes";
import { adaptIngredient, getIngredientEntity, getIngredientEntityValues } from "@controllers/IngredientAdapter";
import Ingredient from "@domain/entities/Ingredient";
import { IRepository } from "@domain/repositories/IRepository";
import { Values } from "@domain/value-objects/Values";
import { services } from "./services";

const ingredients = "ingredients";

export default class IngredientRepository implements IRepository<Ingredient> {

  private getData(): AdaptedIngredient[] {
    const data = localStorage.getItem(ingredients);
    return data ? JSON.parse(data) : [];
  }

  private setData(adaptedIngredients: AdaptedIngredient[]): void {
    localStorage.setItem(ingredients, JSON.stringify(adaptedIngredients));
  }

  find(id: string): Promise<Ingredient> {
    const ingredients = this.getData();
    const ingredient = ingredients.find((item) => item.id === id);
    if (!ingredient) throw new Error("Ingredient not found!");

    return Promise.resolve(getIngredientEntity(ingredient));
  }
  findAll(): Promise<Ingredient[]> {
    const ingredients = this.getData();
    return Promise.resolve(ingredients.map(i => getIngredientEntity(i)));
  }
  async create(t: Ingredient): Promise<void> {
    const ingredients = this.getData();
    ingredients.push(await adaptIngredient(t, services.retrieveImage));
    this.setData(ingredients);
    return Promise.resolve();
  }
  async createList(t: Ingredient[]): Promise<void> {
    const ingredients = this.getData();
    const adaptedNewIngredients = await Promise.all(t.map(
      async (i) => await adaptIngredient(i, services.retrieveImage) 
    ))
    ingredients.concat(adaptedNewIngredients);
    this.setData(ingredients);
    return Promise.resolve();
  }
  async update(id: string, values: Values<Ingredient>): Promise<void> {
    const ingredients = this.getData();
    const foundIndex = ingredients.findIndex(i => i.id === id);
    if (!foundIndex) throw new Error(`There's no such ingredient with id ${id}.`);
    const newIngredient = new Ingredient({ id, ...values });
    const adaptedIngredient = await adaptIngredient(newIngredient, services.retrieveImage);
    ingredients.splice(foundIndex, 1, adaptedIngredient);
    this.setData(ingredients);
    return Promise.resolve()
  }
  delete(id: string): Promise<void> {
    const ingredients = this.getData();
    const foundIndex = ingredients.findIndex(i => i.id === id);
    if (!foundIndex) throw new Error(`There's no ingredient with id ${id}.`);
    ingredients.splice(foundIndex, 1);
    this.setData(ingredients);
    return Promise.resolve();
  }
  load(source: File): Promise<Ingredient[]> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsText(source);

      reader.onload = () => {
        const ingredients = JSON.parse(reader.result as string);
        resolve(ingredients)
      };

      reader.onerror = (error) => {
        reject(error);
      }
    })
  }
  
}