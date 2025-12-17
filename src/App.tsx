import { SaladProvider } from "@/context/SaladContext";
import { Header } from "@/components/layout/Header";
import { IngredientGrid } from "@/components/ingredients/IngredientGrid";
import { SelectedIngredientsList } from "@/components/salad/SelectedIngredientsList";
import { NutritionDisplay } from "@/components/nutrition/NutritionDisplay";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useImagePreloadBatched } from "@/hooks/useImagePreload";
import { ingredients } from "@/data/ingredients";
import { useMemo } from "react";

function AppContent() {
  // Preload all ingredient images in batches
  const imageUrls = useMemo(() => ingredients.map((i) => i.imageUrl), []);
  const { progress, isComplete, loaded } = useImagePreloadBatched(
    imageUrls,
    12
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Loading indicator for images */}
      {!isComplete && (
        <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-gray-200">
          <div
            className="h-full bg-picadeli-green transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {/* Mobile Sticky Salad Card */}
      <div className="lg:hidden fixed top-[52px] left-0 right-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <details className="group">
            <summary className="flex items-center justify-between cursor-pointer list-none">
              <div className="flex items-center gap-2">
                <span className="text-xl">🥗</span>
                <span className="font-semibold text-gray-900">Din sallad</span>
              </div>
              <span className="text-sm text-gray-500 group-open:hidden">
                Tryck för att visa ▼
              </span>
              <span className="text-sm text-gray-500 hidden group-open:inline">
                Dölj ▲
              </span>
            </summary>
            <div className="pt-2 pb-1 max-h-[200px] overflow-y-auto">
              <SelectedIngredientsList />
            </div>
          </details>
        </div>
      </div>
      {/* Spacer for fixed mobile header */}
      <div className="lg:hidden h-14" />

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-[1fr_380px] gap-6">
          {/* Left Column - Ingredient Browser */}
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">
                Välj dina ingredienser
              </h2>
              <p className="text-gray-500">
                Klicka för att lägga till i din sallad
                {!isComplete && (
                  <span className="ml-2 text-xs text-picadeli-green">
                    (laddar bilder... {loaded}/{imageUrls.length})
                  </span>
                )}
              </p>
            </div>
            <IngredientGrid />
          </div>

          {/* Right Column - Salad Builder & Nutrition (Desktop) */}
          <div className="hidden lg:block space-y-4 lg:sticky lg:top-20 lg:self-start">
            {/* Selected Ingredients */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <span className="text-2xl">🥗</span>
                  Din sallad
                </CardTitle>
              </CardHeader>
              <CardContent>
                <SelectedIngredientsList />
              </CardContent>
            </Card>

            {/* Nutrition Display */}
            <NutritionDisplay />
          </div>

          {/* Mobile Nutrition Display */}
          <div className="lg:hidden">
            <NutritionDisplay />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 mt-12 py-6 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-500">
          <p>
            Näringsvärden hämtade från{" "}
            <a
              href="https://www.picadeli.se"
              target="_blank"
              rel="noopener noreferrer"
              className="text-picadeli-green hover:underline"
            >
              picadeli.se
            </a>
          </p>
          <p className="mt-1 text-xs text-gray-400">
            Detta är ett inofficiellt verktyg och är inte affilierat med
            Picadeli.
          </p>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <SaladProvider>
      <AppContent />
    </SaladProvider>
  );
}

export default App;
