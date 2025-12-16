# Picadeli Salad Nutrition Calculator - Project Plan

## 📋 Overview

A TypeScript React application that helps users calculate the nutritional content of their custom Picadeli salads. Users can select ingredients from the salad bar, specify quantities (in grams or spoons), and get real-time nutritional calculations.

---

## 🎨 Brand & Design

### Picadeli Brand Elements

- **Primary Colors**:
  - Green (`#00A651` - Picadeli green)
  - White (`#FFFFFF`)
  - Black/Dark (`#1A1A1A`)
- **Accent Colors**:
  - Coral/Salmon (`#E8907A`)
  - Light Green (`#8DC63F`)
- **Logo**: `https://www.picadeli.se/sites/default/files/2023-02/logo-picadeli.svg`
- **Typography**: Modern, clean sans-serif (system fonts or similar to their web)
- **Style**: Fresh, playful, modern, colorful food imagery

### UI Components (shadcn/ui)

- Card - for ingredient cards
- Button - actions
- Input - quantity inputs
- Badge - nutritional labels, categories
- Dialog/Sheet - ingredient details
- Tabs - category navigation
- Progress - nutritional goals visualization
- Separator - visual separation
- ScrollArea - ingredient lists
- Command - search functionality

---

## 📊 Data Structure

### Ingredient Data Model

```typescript
interface Ingredient {
  id: string; // e.g., "10791"
  name: string; // e.g., "AVOKADO"
  slogan: string; // e.g., "CREAMY GREEN DREAM"
  category: IngredientCategory;
  imageUrl: string;
  nutritionPer100g: {
    energyKj: number;
    energyKcal: number;
    fat: number;
    saturatedFat: number;
    carbohydrates: number;
    sugars: number;
    protein: number;
    salt: number;
  };
  nutriScore: "A" | "B" | "C" | "D" | "E";
  climateFoodprint: number; // kg CO2e/kg
  isVegan: boolean;
  isVegetarian: boolean;
  isWarmish: boolean; // Can be warmed
  allergens: string[];
}

type IngredientCategory =
  | "bases" // Leafy greens and base salads
  | "grains" // Rice, quinoa, pasta, couscous
  | "proteins" // Chicken, fish, eggs, falafel
  | "vegetables" // Tomatoes, cucumber, broccoli
  | "cheese" // Gouda, mozzarella, feta-style
  | "fruits" // Mango, watermelon
  | "toppings" // Chips, nuts, croutons
  | "dressings"; // All sauces and dressings
```

### Selected Ingredient Model

```typescript
interface SelectedIngredient {
  ingredient: Ingredient;
  quantity: number; // In grams
  inputMode: "grams" | "spoons";
  spoonCount?: number; // If using spoon mode
}
```

### Conversion Constants

```typescript
const SPOON_TO_GRAMS = {
  default: 30, // Default: 1 spoon ≈ 30g
  dressings: 15, // Dressings: 1 spoon ≈ 15g
  toppings: 10, // Toppings: 1 spoon ≈ 10g
  leafy: 15, // Leafy greens: 1 spoon ≈ 15g
  dense: 40, // Dense items (pasta, rice): 1 spoon ≈ 40g
};
```

---

## 🗂️ Ingredient Categories & Sample Data

Based on scraping the Picadeli website, here are the main categories:

### 1. Bases (Bladbaser)

- Isbergssallad, Familjesallad, Napolisallad, Grönkålssallad, Krispig svartkålssallad

### 2. Grains & Carbs (Kolhydrater)

- Rismix, Svart quinoa & linssallad, Pastasallad krämig chili, Pastasallad pesto
- Pasta bruschetta, Couscous Marocko style, Pad Thai nudlar, Nudelsallad wok
- Blomkålsris med citronsmak, Örtkryddad trivilini

### 3. Proteins (Proteiner)

- Salladskyckling tärnad, Skivad kyckling, Kycklingspett sweet chili
- Tacokyckling strimlad, Kycklingnuggets
- Räkor, Varmrökt lax, Tonfiskbitar i solrosolja, Krämig tonfiskröra
- Falafel, Teriyaki veg. strips, Veg. chili ginger strips, Vegetariska taco strips
- Kokta skalade ägg, Kalkonskinka

### 4. Vegetables (Grönsaker)

- Tärnad gurka, Skivad gurka, Cocktailtomat, Broccoli, Blomkål
- Morot julienne, Morot & röd spetskål, Paprikamix
- Majs, Saltrostad majs, Marinerade sojabönor, Bönmix Asian style
- Pico de gallo, Soltorkade tomater

### 5. Cheese (Ost)

- Tärnad gouda, Mozzarellaost, Krämig salladsost, Cottage cheese

### 6. Fruits (Frukt)

- Mangobitar, Vattenmelon

### 7. Toppings & Extras

- Salladschips, Krutong naturell, Krutong vitlök
- Topping gojibär, Topping rostad sojaböna
- Örtmarinerade oliver, Cornichons, Skivad rödlök, Picklad rödlök
- Jalapeños, Avokado

### 8. Dressings (Dressing)

- Rhone Island dressing, Vitlöksdressing, Sriracha mayo
- Mangocurrydressing, Tzatziki, Kebabdressing
- Jalapeño ranch dressing

---

## 🏗️ Application Architecture

### Tech Stack

- **Framework**: React 18+ with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui
- **State Management**: React Context + useReducer (or Zustand)
- **Icons**: Lucide React

### Project Structure

```
src/
├── components/
│   ├── ui/                    # shadcn components
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Layout.tsx
│   ├── ingredients/
│   │   ├── IngredientCard.tsx
│   │   ├── IngredientGrid.tsx
│   │   ├── IngredientSearch.tsx
│   │   ├── CategoryTabs.tsx
│   │   └── QuantityInput.tsx
│   ├── salad/
│   │   ├── SaladBuilder.tsx
│   │   ├── SelectedIngredientsList.tsx
│   │   └── SaladSummary.tsx
│   └── nutrition/
│       ├── NutritionDisplay.tsx
│       ├── NutritionBreakdown.tsx
│       ├── MacroChart.tsx
│       └── NutriScoreDisplay.tsx
├── data/
│   └── ingredients.ts         # All ingredient data
├── hooks/
│   ├── useSaladBuilder.ts
│   └── useNutritionCalc.ts
├── lib/
│   ├── utils.ts
│   └── nutrition.ts           # Calculation utilities
├── types/
│   └── index.ts
├── context/
│   └── SaladContext.tsx
├── App.tsx
└── main.tsx
```

---

## 📱 Features & User Flow

### Core Features

#### 1. Ingredient Browser

- Grid view of all ingredients with images
- Category tabs for filtering (Bases, Proteins, Veggies, etc.)
- Search functionality
- Visual indicators (vegan badge, warmish badge, nutri-score)

#### 2. Salad Builder

- Click ingredient to add to salad
- Quantity input per ingredient:
  - Toggle between grams and spoons mode
  - Number input with +/- buttons
  - Suggested portion sizes
- Visual list of selected ingredients with thumbnails
- Remove/edit ingredients easily

#### 3. Nutrition Calculator

- **Live calculation** as ingredients are added/modified
- Display per salad and per 100g
- Nutritional information:
  - Energy (kcal & kJ)
  - Protein (g)
  - Carbohydrates (g) - of which sugars
  - Fat (g) - of which saturated fat
  - Salt (g)
  - Fiber (g) - if available

#### 4. Nutrition Summary Dashboard

- Total calories prominently displayed
- Macro breakdown (pie chart or bar)
- Comparison to daily recommended values
- Climate footprint sum

### Nice-to-Have Features (Phase 2)

- Save salad recipes locally (localStorage)
- Share salad via URL/QR code
- Recipe suggestions from Picadeli menu
- Nutritional goals/targets
- Dark mode
- PWA support for mobile

---

## 🖼️ UI Mockup Description

### Main Screen Layout

```
┌─────────────────────────────────────────────────────────────┐
│  🥗 PICADELI LOGO      Salladskalkylator               🔍  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  [Alla] [Baser] [Proteiner] [Grönt] [Ost] [Dressing] ...  │
│                                                             │
├───────────────────────────────────┬─────────────────────────┤
│                                   │                         │
│   ┌─────┐ ┌─────┐ ┌─────┐        │   🥗 DIN SALLAD         │
│   │ img │ │ img │ │ img │        │                         │
│   │ 🅰️  │ │ 🅱️  │ │ 🅰️  │        │   Avokado     50g  ✕   │
│   │name │ │name │ │name │        │   Kyckling    80g  ✕   │
│   │kcal │ │kcal │ │kcal │        │   Quinoa      60g  ✕   │
│   └─────┘ └─────┘ └─────┘        │   Tomat       40g  ✕   │
│                                   │                         │
│   ┌─────┐ ┌─────┐ ┌─────┐        ├─────────────────────────┤
│   │ img │ │ img │ │ img │        │                         │
│   │ 🅱️  │ │ 🅲️  │ │ 🅰️  │        │   NÄRINGSVÄRDE          │
│   │name │ │name │ │name │        │   ═══════════════════   │
│   │kcal │ │kcal │ │kcal │        │   Energi:   428 kcal   │
│   └─────┘ └─────┘ └─────┘        │   Protein:   24g       │
│                                   │   Kolhydrat: 32g       │
│   ... more ingredients ...        │   Fett:      18g       │
│                                   │   Salt:      1.2g      │
│                                   │                         │
│                                   │   [Visa detaljer]       │
│                                   │                         │
└───────────────────────────────────┴─────────────────────────┘
```

### Mobile Layout

- Bottom sheet for selected salad
- Full-screen ingredient grid
- Floating action button for nutrition summary

---

## 📝 Implementation Steps

### Phase 1: Project Setup (Day 1)

1. ✅ Create Vite + React + TypeScript project
2. ✅ Install and configure Tailwind CSS
3. ✅ Install and set up shadcn/ui
4. ✅ Set up project structure
5. ✅ Configure path aliases

### Phase 2: Data Layer (Day 1-2)

1. Create ingredient data file with all Picadeli products
2. Scrape/collect nutritional data from website
3. Create TypeScript types and interfaces
4. Implement calculation utilities

### Phase 3: Core Components (Day 2-3)

1. Build IngredientCard component
2. Build CategoryTabs component
3. Build QuantityInput component
4. Build SelectedIngredientsList component
5. Build NutritionDisplay component

### Phase 4: Integration (Day 3-4)

1. Implement SaladContext for state management
2. Connect components with state
3. Implement search functionality
4. Add animations and transitions

### Phase 5: Polish (Day 4-5)

1. Responsive design adjustments
2. Loading states and error handling
3. Accessibility improvements
4. Performance optimization
5. Testing

---

## 🎯 MVP Scope

### Must Have

- [ ] Display all Picadeli ingredients with images
- [ ] Category filtering
- [ ] Add/remove ingredients from salad
- [ ] Quantity input (grams and spoons)
- [ ] Real-time nutrition calculation
- [ ] Display calories, protein, carbs, fat, salt
- [ ] Responsive mobile design
- [ ] Picadeli branding/styling

### Should Have

- [ ] Search functionality
- [ ] Nutri-score display
- [ ] Vegan/vegetarian badges
- [ ] Macro percentage breakdown

### Could Have

- [ ] Save salads locally
- [ ] Climate footprint display
- [ ] Daily value percentages
- [ ] Share functionality

---

## ⚠️ Technical Considerations

### Data Collection Strategy

The nutrition data needs to be collected from individual product pages. Options:

1. **Manual entry**: Collect data for ~80-100 ingredients (time-consuming but accurate)
2. **Web scraping script**: Create a Node.js script to fetch and parse product pages
3. **Start with sample data**: Begin with 20-30 popular ingredients, expand later

**Recommendation**: Start with manual entry for ~30 core ingredients to build the MVP, then expand.

### Image Handling

- Use Picadeli CDN images directly: `https://www.picadeli.se/sites/default/files/styles/scale_1440/public/product_img/[ID]-[timestamp].webp`
- Consider proxying or caching for performance
- Fallback images for missing products

### Spoon to Gram Conversion

- Research typical serving spoon sizes
- Different densities for different ingredients
- Allow user adjustment of base assumption
- Display estimate disclaimer

### Accessibility

- ARIA labels for interactive elements
- Keyboard navigation
- Color contrast (Picadeli green on white)
- Screen reader support

---

## 🔗 Resources

### Picadeli Website URLs

- Main site: https://www.picadeli.se
- Salad bar products: https://www.picadeli.se/sv/sortiment/salladsbaren
- Individual product: https://www.picadeli.se/sv/sortiment/[ID]-[slug]
- Salad menu (recipes): https://www.picadeli.se/sv/salladsmeny
- Logo: https://www.picadeli.se/sites/default/files/2023-02/logo-picadeli.svg

### Image Pattern

```
https://www.picadeli.se/sites/default/files/styles/scale_1440/public/product_img/[PRODUCT_ID]-[TIMESTAMP].webp
```

---

## 📅 Timeline Estimate

| Phase       | Duration      | Description                  |
| ----------- | ------------- | ---------------------------- |
| Setup       | 2 hours       | Project scaffolding, tooling |
| Data        | 4 hours       | Ingredient data collection   |
| Components  | 6 hours       | UI components development    |
| Integration | 4 hours       | State management, logic      |
| Polish      | 4 hours       | Styling, responsive, testing |
| **Total**   | **~20 hours** | MVP completion               |

---

## ✅ Next Steps

1. **Approve this plan** - Review and confirm the approach
2. **Set up the project** - Initialize Vite + React + TypeScript
3. **Install dependencies** - Tailwind, shadcn/ui, Lucide icons
4. **Collect ingredient data** - Start with 30 core ingredients
5. **Build MVP** - Implement core features
6. **Iterate** - Add features based on usage

---

_Ready to start building! 🥗_
