export interface Ingredient {
  section: string;
  items: string[];
}

export interface Instruction {
  section: string;
  steps: string[];
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  ingredients: Ingredient[]; // רשימת קטגוריות עם רשימות מרכיבים
  instructions: Instruction[]; // רשימת קטגוריות עם שלבי הכנה
  tips?: string[];
  tags: string[];
}
