import mongoose, { Schema, Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface IIngredient {
  section: string;
  items: string[];
}

export interface IInstruction {
  section: string;
  steps: string[];
}

export interface INutrition {
  calories?: number;
  protein?: number;
  fat?: number;
  netCarbs?: number;
  fiber?: number;
  iron?: number;
  zinc?: number;
  selenium?: number;
  vitaminB12?: number;
}

export interface IRecipe extends Document {
  uuid: string;
  title: string;
  description: string;
  image?: string;
  tags: string[];
  servings: number;
  prepTime: number;
  cookTime: number;
  ingredients: IIngredient[];
  instructions: IInstruction[];
  tips?: string[];
  category?: string;
  allergens?: string[];
  nutrition?: INutrition;
}

const RecipeSchema = new Schema<IRecipe>({
  uuid: { type: String, default: uuidv4, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
  tags: { type: [String], required: true },
  servings: { type: Number, required: true },
  prepTime: { type: Number, required: true },
  cookTime: { type: Number, required: true },
  ingredients: [{ section: String, items: [String] }],
  instructions: [{ section: String, steps: [String] }],
  tips: { type: [String] },
  category: { type: String },
  allergens: { type: [String] },
  nutrition: {
    calories: { type: Number },
    protein: { type: Number },
    fat: { type: Number },
    netCarbs: { type: Number },
    fiber: { type: Number },
    iron: { type: Number },
    zinc: { type: Number },
    selenium: { type: Number },
    vitaminB12: { type: Number },
  },
});

const Recipe = mongoose.models.Recipe || mongoose.model<IRecipe>('Recipe', RecipeSchema);
export default Recipe;
