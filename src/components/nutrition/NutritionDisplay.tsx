import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useSalad } from "@/context/SaladContext";
import {
  calculateNutrition,
  formatNumber,
  DAILY_VALUES,
  getPercentOfDaily,
} from "@/lib/nutrition";
import { Flame, Droplets, Wheat, Beef } from "lucide-react";

export function NutritionDisplay() {
  const { state } = useSalad();
  const nutrition = calculateNutrition(state.selectedIngredients);

  const macros = [
    {
      label: "Protein",
      value: nutrition.protein,
      unit: "g",
      color: "bg-red-500",
      icon: Beef,
      daily: DAILY_VALUES.protein,
    },
    {
      label: "Kolhydrater",
      value: nutrition.carbohydrates,
      unit: "g",
      color: "bg-amber-500",
      icon: Wheat,
      daily: DAILY_VALUES.carbohydrates,
    },
    {
      label: "Fett",
      value: nutrition.fat,
      unit: "g",
      color: "bg-yellow-500",
      icon: Droplets,
      daily: DAILY_VALUES.fat,
    },
  ];

  return (
    <Card className="bg-white shadow-lg border-picadeli-green/20">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <span className="text-2xl">📊</span>
          Näringsvärde
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Total Calories - Big Display */}
        <div className="text-center py-4 bg-gradient-to-br from-picadeli-green/10 to-picadeli-green-light/10 rounded-xl">
          <div className="flex items-center justify-center gap-2 text-picadeli-green">
            <Flame className="w-6 h-6" />
            <span className="text-4xl font-bold">
              {Math.round(nutrition.energyKcal)}
            </span>
            <span className="text-lg">kcal</span>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            {formatNumber(nutrition.totalWeight, 0)}g total vikt
          </p>
          <p className="text-xs text-gray-400 mt-0.5">
            {formatNumber(
              getPercentOfDaily(nutrition.energyKcal, "energyKcal"),
              0
            )}
            % av dagligt intag
          </p>
        </div>

        {/* Macro Breakdown */}
        <div className="grid grid-cols-3 gap-2">
          {macros.map((macro) => {
            const Icon = macro.icon;
            const percent = getPercentOfDaily(
              macro.value,
              macro.label.toLowerCase() as keyof typeof DAILY_VALUES
            );
            return (
              <div
                key={macro.label}
                className="text-center p-3 bg-gray-50 rounded-lg"
              >
                <Icon className="w-4 h-4 mx-auto text-gray-400 mb-1" />
                <p className="text-lg font-bold text-gray-900">
                  {formatNumber(macro.value)}
                  <span className="text-xs font-normal text-gray-500">
                    {macro.unit}
                  </span>
                </p>
                <p className="text-xs text-gray-500">{macro.label}</p>
                <div className="mt-1 h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${macro.color} transition-all duration-300`}
                    style={{ width: `${Math.min(percent, 100)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <Separator />

        {/* Detailed Nutrition */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Energi</span>
            <span className="font-medium">
              {Math.round(nutrition.energyKj)} kJ
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">varav mättat fett</span>
            <span className="font-medium">
              {formatNumber(nutrition.saturatedFat)} g
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">varav sockerarter</span>
            <span className="font-medium">
              {formatNumber(nutrition.sugars)} g
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Salt</span>
            <span className="font-medium">
              {formatNumber(nutrition.salt)} g
            </span>
          </div>
        </div>

        {state.selectedIngredients.length > 0 && (
          <>
            <Separator />
            <p className="text-xs text-gray-400 text-center">
              Baserat på näringsvärden per 100g från Picadeli
            </p>
          </>
        )}
      </CardContent>
    </Card>
  );
}
