import { createContext, useContext, useReducer, type ReactNode } from "react";
import type { Ingredient, SelectedIngredient } from "@/types";
import { SPOON_TO_GRAMS } from "@/types";

interface SaladState {
  selectedIngredients: SelectedIngredient[];
}

type SaladAction =
  | { type: "ADD_INGREDIENT"; ingredient: Ingredient; quantity?: number }
  | { type: "REMOVE_INGREDIENT"; ingredientId: string }
  | { type: "UPDATE_QUANTITY"; ingredientId: string; quantity: number }
  | { type: "UPDATE_SPOONS"; ingredientId: string; spoons: number }
  | { type: "TOGGLE_INPUT_MODE"; ingredientId: string }
  | { type: "CLEAR_ALL" };

const initialState: SaladState = {
  selectedIngredients: [],
};

function saladReducer(state: SaladState, action: SaladAction): SaladState {
  switch (action.type) {
    case "ADD_INGREDIENT": {
      const exists = state.selectedIngredients.find(
        (s) => s.ingredient.id === action.ingredient.id
      );
      if (exists) return state;

      const defaultSpoons = 2;
      const gramsPerSpoon = SPOON_TO_GRAMS[action.ingredient.category];
      const defaultQuantity = action.quantity ?? defaultSpoons * gramsPerSpoon;

      return {
        ...state,
        selectedIngredients: [
          ...state.selectedIngredients,
          {
            ingredient: action.ingredient,
            quantity: defaultQuantity,
            inputMode: "spoons",
            spoonCount: defaultSpoons,
          },
        ],
      };
    }

    case "REMOVE_INGREDIENT":
      return {
        ...state,
        selectedIngredients: state.selectedIngredients.filter(
          (s) => s.ingredient.id !== action.ingredientId
        ),
      };

    case "UPDATE_QUANTITY":
      return {
        ...state,
        selectedIngredients: state.selectedIngredients.map((s) =>
          s.ingredient.id === action.ingredientId
            ? {
                ...s,
                quantity: Math.max(0, action.quantity),
                inputMode: "grams" as const,
              }
            : s
        ),
      };

    case "UPDATE_SPOONS":
      return {
        ...state,
        selectedIngredients: state.selectedIngredients.map((s) => {
          if (s.ingredient.id !== action.ingredientId) return s;
          const gramsPerSpoon = SPOON_TO_GRAMS[s.ingredient.category];
          return {
            ...s,
            spoonCount: Math.max(0, action.spoons),
            quantity: Math.max(0, action.spoons) * gramsPerSpoon,
            inputMode: "spoons" as const,
          };
        }),
      };

    case "TOGGLE_INPUT_MODE":
      return {
        ...state,
        selectedIngredients: state.selectedIngredients.map((s) => {
          if (s.ingredient.id !== action.ingredientId) return s;
          const newMode = s.inputMode === "grams" ? "spoons" : "grams";
          if (newMode === "spoons") {
            const gramsPerSpoon = SPOON_TO_GRAMS[s.ingredient.category];
            const spoons = Math.round(s.quantity / gramsPerSpoon);
            return {
              ...s,
              inputMode: newMode,
              spoonCount: spoons,
              quantity: spoons * gramsPerSpoon,
            };
          }
          return { ...s, inputMode: newMode };
        }),
      };

    case "CLEAR_ALL":
      return initialState;

    default:
      return state;
  }
}

interface SaladContextType {
  state: SaladState;
  addIngredient: (ingredient: Ingredient, quantity?: number) => void;
  removeIngredient: (ingredientId: string) => void;
  updateQuantity: (ingredientId: string, quantity: number) => void;
  updateSpoons: (ingredientId: string, spoons: number) => void;
  toggleInputMode: (ingredientId: string) => void;
  clearAll: () => void;
  isSelected: (ingredientId: string) => boolean;
}

const SaladContext = createContext<SaladContextType | null>(null);

export function SaladProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(saladReducer, initialState);

  const addIngredient = (ingredient: Ingredient, quantity?: number) =>
    dispatch({ type: "ADD_INGREDIENT", ingredient, quantity });

  const removeIngredient = (ingredientId: string) =>
    dispatch({ type: "REMOVE_INGREDIENT", ingredientId });

  const updateQuantity = (ingredientId: string, quantity: number) =>
    dispatch({ type: "UPDATE_QUANTITY", ingredientId, quantity });

  const updateSpoons = (ingredientId: string, spoons: number) =>
    dispatch({ type: "UPDATE_SPOONS", ingredientId, spoons });

  const toggleInputMode = (ingredientId: string) =>
    dispatch({ type: "TOGGLE_INPUT_MODE", ingredientId });

  const clearAll = () => dispatch({ type: "CLEAR_ALL" });

  const isSelected = (ingredientId: string) =>
    state.selectedIngredients.some((s) => s.ingredient.id === ingredientId);

  return (
    <SaladContext.Provider
      value={{
        state,
        addIngredient,
        removeIngredient,
        updateQuantity,
        updateSpoons,
        toggleInputMode,
        clearAll,
        isSelected,
      }}
    >
      {children}
    </SaladContext.Provider>
  );
}

export function useSalad() {
  const context = useContext(SaladContext);
  if (!context) {
    throw new Error("useSalad must be used within a SaladProvider");
  }
  return context;
}
