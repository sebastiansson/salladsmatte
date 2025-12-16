export type IngredientCategory =
  | "bases"
  | "grains"
  | "proteins"
  | "vegetables"
  | "cheese"
  | "fruits"
  | "toppings"
  | "dressings";

export type NutriScore = "A" | "B" | "C" | "D" | "E";

export interface NutritionPer100g {
  energyKj: number;
  energyKcal: number;
  fat: number;
  saturatedFat: number;
  carbohydrates: number;
  sugars: number;
  protein: number;
  salt: number;
  fiber?: number;
}

export interface Ingredient {
  id: string;
  name: string;
  slogan: string;
  category: IngredientCategory;
  imageUrl: string;
  nutritionPer100g: NutritionPer100g;
  nutriScore?: NutriScore;
  climateFoodprint?: number;
  isVegan: boolean;
  isVegetarian: boolean;
  isWarmish: boolean;
}

export interface SelectedIngredient {
  ingredient: Ingredient;
  quantity: number; // Always stored in grams
  inputMode: "grams" | "spoons";
  spoonCount?: number;
}

export interface NutritionTotal {
  totalWeight: number;
  energyKj: number;
  energyKcal: number;
  fat: number;
  saturatedFat: number;
  carbohydrates: number;
  sugars: number;
  protein: number;
  salt: number;
  fiber: number;
}

export const CATEGORY_LABELS: Record<IngredientCategory, string> = {
  bases: "Baser",
  grains: "Kolhydrater",
  proteins: "Protein",
  vegetables: "Grönsaker",
  cheese: "Ost",
  fruits: "Frukt",
  toppings: "Toppings",
  dressings: "Dressing",
};

export const CATEGORY_ICONS: Record<IngredientCategory, string> = {
  bases: "🥬",
  grains: "🍚",
  proteins: "🍗",
  vegetables: "🥒",
  cheese: "🧀",
  fruits: "🥭",
  toppings: "🥜",
  dressings: "🥄",
};

// Spoon to gram conversion based on ingredient density
export const SPOON_TO_GRAMS: Record<IngredientCategory, number> = {
  bases: 15, // Leafy greens are light
  grains: 40, // Dense carbs
  proteins: 30, // Medium density
  vegetables: 25, // Medium-light
  cheese: 20, // Dense but small portions
  fruits: 30, // Medium
  toppings: 10, // Small portions
  dressings: 15, // Liquid/semi-liquid
};
