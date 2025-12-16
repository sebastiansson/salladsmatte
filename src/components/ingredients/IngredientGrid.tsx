import { useState } from "react";
import { ingredients } from "@/data/ingredients";
import type { IngredientCategory } from "@/types";
import { IngredientCard } from "./IngredientCard";
import { CategoryTabs } from "./CategoryTabs";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export function IngredientGrid() {
  const [activeCategory, setActiveCategory] = useState<
    IngredientCategory | "all"
  >("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredIngredients = ingredients.filter((ingredient) => {
    const matchesCategory =
      activeCategory === "all" || ingredient.category === activeCategory;
    const matchesSearch =
      searchQuery === "" ||
      ingredient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ingredient.slogan.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          type="text"
          placeholder="Sök ingredienser..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Category Tabs */}
      <CategoryTabs
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {filteredIngredients.map((ingredient) => (
          <IngredientCard key={ingredient.id} ingredient={ingredient} />
        ))}
      </div>

      {filteredIngredients.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <p>Inga ingredienser hittades.</p>
        </div>
      )}
    </div>
  );
}
