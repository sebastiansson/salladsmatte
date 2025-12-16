import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CATEGORY_LABELS,
  CATEGORY_ICONS,
  type IngredientCategory,
} from "@/types";

interface CategoryTabsProps {
  activeCategory: IngredientCategory | "all";
  onCategoryChange: (category: IngredientCategory | "all") => void;
}

const categories: (IngredientCategory | "all")[] = [
  "all",
  "bases",
  "grains",
  "proteins",
  "vegetables",
  "cheese",
  "fruits",
  "toppings",
  "dressings",
];

export function CategoryTabs({
  activeCategory,
  onCategoryChange,
}: CategoryTabsProps) {
  return (
    <Tabs
      value={activeCategory}
      onValueChange={(v) => onCategoryChange(v as IngredientCategory | "all")}
    >
      <TabsList className="flex-wrap h-auto gap-1 bg-transparent p-0">
        {categories.map((category) => (
          <TabsTrigger
            key={category}
            value={category}
            className="data-[state=active]:bg-picadeli-green data-[state=active]:text-white rounded-full px-4 py-2 text-sm border border-gray-200 data-[state=inactive]:bg-white data-[state=inactive]:hover:bg-gray-50"
          >
            <span className="mr-1.5">
              {category === "all" ? "🥗" : CATEGORY_ICONS[category]}
            </span>
            {category === "all" ? "Alla" : CATEGORY_LABELS[category]}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
