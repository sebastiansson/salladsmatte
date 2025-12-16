import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useSalad } from "@/context/SaladContext";
import { SPOON_TO_GRAMS } from "@/types";
import { Minus, Plus, X, Scale, Utensils } from "lucide-react";

export function SelectedIngredientsList() {
  const {
    state,
    removeIngredient,
    updateQuantity,
    updateSpoons,
    toggleInputMode,
    clearAll,
  } = useSalad();

  if (state.selectedIngredients.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <div className="text-4xl mb-2">🥗</div>
        <p className="text-sm">
          Klicka på ingredienser för att lägga till dem i din sallad
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-sm text-gray-700">
          {state.selectedIngredients.length} ingredienser valda
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearAll}
          className="text-red-500 hover:text-red-700 hover:bg-red-50 text-xs"
        >
          Rensa allt
        </Button>
      </div>

      <ScrollArea className="h-[300px] pr-3">
        <div className="space-y-2">
          {state.selectedIngredients.map((selected) => {
            const { ingredient, quantity, inputMode, spoonCount } = selected;

            return (
              <div
                key={ingredient.id}
                className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg"
              >
                {/* Thumbnail */}
                <img
                  src={ingredient.imageUrl}
                  alt={ingredient.name}
                  className="w-10 h-10 rounded object-cover flex-shrink-0"
                />

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {ingredient.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {Math.round(
                      (ingredient.nutritionPer100g.energyKcal * quantity) / 100
                    )}{" "}
                    kcal
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-1">
                  {inputMode === "spoons" ? (
                    <>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() =>
                          updateSpoons(ingredient.id, (spoonCount || 1) - 1)
                        }
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <div className="w-12 text-center">
                        <span className="text-sm font-medium">
                          {spoonCount || 0}
                        </span>
                        <span className="text-xs text-gray-500 ml-0.5">sk</span>
                      </div>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() =>
                          updateSpoons(ingredient.id, (spoonCount || 0) + 1)
                        }
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() =>
                          updateQuantity(ingredient.id, quantity - 10)
                        }
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <Input
                        type="number"
                        value={quantity}
                        onChange={(e) =>
                          updateQuantity(
                            ingredient.id,
                            parseInt(e.target.value) || 0
                          )
                        }
                        className="w-14 h-7 text-center text-sm p-1"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() =>
                          updateQuantity(ingredient.id, quantity + 10)
                        }
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </>
                  )}

                  {/* Toggle Mode */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-gray-400 hover:text-gray-600"
                    onClick={() => toggleInputMode(ingredient.id)}
                    title={
                      inputMode === "spoons"
                        ? "Byt till gram"
                        : "Byt till skedar"
                    }
                  >
                    {inputMode === "spoons" ? (
                      <Scale className="w-3 h-3" />
                    ) : (
                      <Utensils className="w-3 h-3" />
                    )}
                  </Button>

                  {/* Remove */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-gray-400 hover:text-red-500"
                    onClick={() => removeIngredient(ingredient.id)}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>

      <div className="text-xs text-gray-400 text-center">
        💡 sk = matsked (~{SPOON_TO_GRAMS.proteins}g för protein, ~
        {SPOON_TO_GRAMS.dressings}g för dressing)
      </div>
    </div>
  );
}
