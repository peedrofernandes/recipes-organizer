import Recipe from "@domain/entities/Recipe";
import { IRepository } from "@domain/repositories/IRepository";
import { Attributes } from "@domain/value-objects/Attributes";

const item = "recipes";

export default class RecipeRepository implements IRepository<Recipe> {

  private getData() {
    const data = localStorage.getItem(item);
    const recipes: Recipe[] = data ? JSON.parse(data) : [];
    return recipes;
  }

  find(id: string): Promise<Recipe> {
    const recipes = this.getData();
    const recipe = recipes.find(r => r.id === id);
    if (!recipe) throw new Error("Recipe not found!");
    return Promise.resolve(recipe);
  }
  findAll(): Promise<Recipe[]> {
    const recipes = this.getData();
    return Promise.resolve(recipes);
  }
  create(t: Recipe): Promise<void> {
    const recipes = this.getData();
    recipes.push(t);
    localStorage.setItem(item, JSON.stringify(recipes));
    return Promise.resolve()
  }
  createList(t: Recipe[]): Promise<void> {
    const recipes = this.getData();
    recipes.concat(t);
    localStorage.setItem(item, JSON.stringify(recipes));
    return Promise.resolve()
  }
  update(id: string, attributes: Attributes<Recipe>): Promise<void> {
    const recipes = this.getData();
    const foundIndex = recipes.findIndex(recipe => recipe.id === id);
    if (!foundIndex) throw new Error(`There's no such recipe with id ${id}.`);
    const newRecipe = new Recipe({ id, ...attributes });
    recipes.splice(foundIndex, 1, newRecipe);
    localStorage.setItem(item, JSON.stringify(recipes));
    return Promise.resolve();
  }
  delete(id: string): Promise<void> {
    const recipes = this.getData();
    const foundIndex = recipes.findIndex(recipe => recipe.id === id);
    if (!foundIndex) throw new Error(`There's no recipe with id ${id}.`);
    recipes.splice(foundIndex, 1);
    localStorage.setItem(item, JSON.stringify(recipes));
    return Promise.resolve()
  }
  load(source: File): Promise<Recipe[]> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsText(source);

      reader.onload = () => {
        const recipes = JSON.parse(reader.result as string);
        resolve(recipes);
      }

      reader.onerror = (error) => {
        reject(error)
      }
    })
  }
  
}