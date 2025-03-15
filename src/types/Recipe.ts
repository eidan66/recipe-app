// Removed Ingredient and Instruction interfaces in favor of dynamic key objects

export interface Recipe {
  uuid: string;
  title: string;
  description: string;
  image: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  ingredients: { [section: string]: string[] }; // מפתחות דינמיים עם רשימת מרכיבים
  instructions: { [section: string]: string[] }; // מפתחות דינמיים עם שלבי הכנה
  tips?: string[]; // טיפים לשדרוג
  tags: string[]; // תגיות מתכון
  category?: string; // קטגוריית מתכון כללית (למשל 'איטלקי', 'קיטוגני')
  allergens?: string[]; // רשימת אלרגנים פוטנציאליים
  nutrition?: {
    calories?: number;
    protein?: number;
    fat?: number;
    netCarbs?: number;
    fiber?: number;
    iron?: number;
    zinc?: number;
    selenium?: number;
    sodium?: number;
    vitaminB12?: number;
  }; // ערכים תזונתיים אופציונליים
}
