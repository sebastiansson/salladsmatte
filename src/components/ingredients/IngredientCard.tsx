import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Ingredient } from "@/types";
import { useSalad } from "@/context/SaladContext";
import { Check, Flame, Leaf, Salad } from "lucide-react";
import { useState } from "react";

interface IngredientCardProps {
  ingredient: Ingredient;
}

const nutriScoreColors: Record<string, string> = {
  A: "bg-green-600",
  B: "bg-lime-500",
  C: "bg-yellow-400",
  D: "bg-orange-500",
  E: "bg-red-600",
};

export function IngredientCard({ ingredient }: IngredientCardProps) {
  const { addIngredient, removeIngredient, isSelected } = useSalad();
  const selected = isSelected(ingredient.id);
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleClick = () => {
    if (selected) {
      removeIngredient(ingredient.id);
    } else {
      addIngredient(ingredient);
    }
  };

  return (
    <Card
      className={`cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1 overflow-hidden ${
        selected
          ? "ring-2 ring-picadeli-green shadow-lg"
          : "hover:ring-1 hover:ring-picadeli-green/50"
      }`}
      onClick={handleClick}
    >
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-picadeli-green/10 to-picadeli-lime/10">
        {!imageError ? (
          <>
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Salad className="w-12 h-12 text-picadeli-green/30 animate-pulse" />
              </div>
            )}
            <img
              src={ingredient.imageUrl}
              alt={ingredient.name}
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              loading="lazy"
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
            <Salad className="w-16 h-16 text-picadeli-green/40" />
            <span className="text-xs text-gray-400 mt-2 text-center">
              {ingredient.name}
            </span>
          </div>
        )}
        {selected && (
          <div className="absolute inset-0 bg-picadeli-green/20 flex items-center justify-center">
            <div className="bg-picadeli-green text-white rounded-full p-2">
              <Check className="w-6 h-6" />
            </div>
          </div>
        )}
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {ingredient.nutriScore && (
            <Badge
              className={`${
                nutriScoreColors[ingredient.nutriScore]
              } text-white text-xs font-bold px-2`}
            >
              {ingredient.nutriScore}
            </Badge>
          )}
        </div>
        <div className="absolute top-2 right-2 flex flex-col gap-1">
          {ingredient.isVegan && (
            <Badge
              variant="secondary"
              className="bg-green-100 text-green-800 text-xs"
            >
              <Leaf className="w-3 h-3 mr-1" />
              Vegan
            </Badge>
          )}
          {ingredient.isWarmish && (
            <Badge
              variant="secondary"
              className="bg-orange-100 text-orange-800 text-xs"
            >
              <Flame className="w-3 h-3 mr-1" />
              Warmish
            </Badge>
          )}
        </div>
      </div>
      <CardContent className="p-3">
        <p className="text-[10px] text-picadeli-green font-semibold uppercase tracking-wide">
          {ingredient.slogan}
        </p>
        <h3 className="font-bold text-sm text-gray-900 mt-0.5 line-clamp-1">
          {ingredient.name}
        </h3>
        <p className="text-xs text-gray-500 mt-1">
          {ingredient.nutritionPer100g.energyKcal} kcal / 100g
        </p>
      </CardContent>
    </Card>
  );
}
