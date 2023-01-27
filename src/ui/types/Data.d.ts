import { AtLeastOne } from "../../types/AtLeastOne";

export type Ingredient = {
  id: number | string;
  name: string;
  macros?: {
    proteins: number;
    carbs: number;
    fats: number;
    gramsPerServing: number;
  };
  options?: AtLeastOne<{ description: string; imageUrl: string }>
}

export type Recipe = {
  id: number | string;
  name: string;
  type: "Week" | "Weekend" | "Both";
  macros?: {
    proteins: number;
    carbs: number;
    fats: number;
    totalGrams: number;
  };
  options?: AtLeastOne<{ description: string; imageUrl: string }>;
  ingredients?: { id: number | string, totalGrams: number }[];
}