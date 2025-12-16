import type {
  NutritionPer100g,
  NutritionTotal,
  SelectedIngredient,
} from "@/types";

export function calculateNutrition(
  selectedIngredients: SelectedIngredient[]
): NutritionTotal {
  const initial: NutritionTotal = {
    totalWeight: 0,
    energyKj: 0,
    energyKcal: 0,
    fat: 0,
    saturatedFat: 0,
    carbohydrates: 0,
    sugars: 0,
    protein: 0,
    salt: 0,
    fiber: 0,
  };

  return selectedIngredients.reduce((acc, { ingredient, quantity }) => {
    const multiplier = quantity / 100;
    const nutrition = ingredient.nutritionPer100g;

    return {
      totalWeight: acc.totalWeight + quantity,
      energyKj: acc.energyKj + nutrition.energyKj * multiplier,
      energyKcal: acc.energyKcal + nutrition.energyKcal * multiplier,
      fat: acc.fat + nutrition.fat * multiplier,
      saturatedFat: acc.saturatedFat + nutrition.saturatedFat * multiplier,
      carbohydrates: acc.carbohydrates + nutrition.carbohydrates * multiplier,
      sugars: acc.sugars + nutrition.sugars * multiplier,
      protein: acc.protein + nutrition.protein * multiplier,
      salt: acc.salt + nutrition.salt * multiplier,
      fiber: acc.fiber + (nutrition.fiber || 0) * multiplier,
    };
  }, initial);
}

export function getNutritionPer100g(total: NutritionTotal): NutritionPer100g {
  if (total.totalWeight === 0) {
    return {
      energyKj: 0,
      energyKcal: 0,
      fat: 0,
      saturatedFat: 0,
      carbohydrates: 0,
      sugars: 0,
      protein: 0,
      salt: 0,
    };
  }

  const multiplier = 100 / total.totalWeight;

  return {
    energyKj: total.energyKj * multiplier,
    energyKcal: total.energyKcal * multiplier,
    fat: total.fat * multiplier,
    saturatedFat: total.saturatedFat * multiplier,
    carbohydrates: total.carbohydrates * multiplier,
    sugars: total.sugars * multiplier,
    protein: total.protein * multiplier,
    salt: total.salt * multiplier,
    fiber: total.fiber * multiplier,
  };
}

export function formatNumber(value: number, decimals: number = 1): string {
  return value.toFixed(decimals);
}

// Daily recommended values (based on 2000 kcal diet)
export const DAILY_VALUES = {
  energyKcal: 2000,
  fat: 70, // g
  saturatedFat: 20, // g
  carbohydrates: 260, // g
  sugars: 90, // g
  protein: 50, // g
  salt: 6, // g
  fiber: 30, // g
};

export function getPercentOfDaily(
  value: number,
  nutrient: keyof typeof DAILY_VALUES
): number {
  return (value / DAILY_VALUES[nutrient]) * 100;
}
