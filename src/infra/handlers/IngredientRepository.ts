import Ingredient from "@domain/entities/Ingredient";
import { IRepository } from "@domain/repositories/IRepository";
import { Attributes } from "@domain/value-objects/Attributes";

const item = "ingredients";

export class IngredientRepository implements IRepository<Ingredient> {

  private getData(): Ingredient[] {
    const data = localStorage.getItem(item);
    return data ? JSON.parse(data) : [];
  }

  find(id: string): Promise<Ingredient> {
    const ingredients = this.getData();
    const ingredient = ingredients.find((item) => item.id === id);
    if (!ingredient) throw new Error("Ingredient not found!");
    return Promise.resolve(ingredient);
  }
  findAll(): Promise<Ingredient[]> {
    const ingredients = this.getData();
    return Promise.resolve(ingredients);
  }
  create(t: Ingredient): Promise<void> {
    const ingredients = this.getData();
    ingredients.push(t);
    localStorage.setItem(item, JSON.stringify(ingredients));
    return Promise.resolve();
  }
  createList(t: Ingredient[]): Promise<void> {
    const ingredients = this.getData();
    ingredients.concat(t);
    localStorage.setItem(item, JSON.stringify(ingredients));
    return Promise.resolve();
  }
  update(id: string, attributes: Attributes<Ingredient>): Promise<void> {
    const ingredients = this.getData();
    const foundIndex = ingredients.findIndex(ing => ing.id === id);
    if (!foundIndex) throw new Error(`There's no such ingredient with id ${id}.`);
    const newIngredient = new Ingredient({ id, ...attributes });
    ingredients.splice(foundIndex, 1, newIngredient);
    localStorage.setItem(item, JSON.stringify(ingredients));
    return Promise.resolve()
  }
  delete(id: string): Promise<void> {
    const ingredients = this.getData();
    const foundIndex = ingredients.findIndex(item => item.id === id);
    if (!foundIndex) throw new Error(`There's no ingredient with id ${id}.`);
    ingredients.splice(foundIndex, 1);
    localStorage.setItem(item, JSON.stringify(ingredients));
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