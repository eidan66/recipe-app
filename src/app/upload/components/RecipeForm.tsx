'use client';

import { useState } from 'react';
import styled from 'styled-components';
import TagDropdown from './TagDropdown';

interface IngredientSection {
  section: string;
  items: string[];
}

interface Recipe {
  title: string;
  description: string;
  servings: number;
  prepTime: number;
  cookTime: number;
  ingredients: IngredientSection[];
  instructions: string[];
  tags: string[];
  tips: string[];
  image?: string;
}

const FormContainer = styled.div`
  margin-top: 3rem;
  text-align: right;
  max-width: 600px;
  margin: auto;
  background: ${({ theme }) => theme.colors.surface};
  padding: 2rem;
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  margin: 0.5rem 0;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.textPrimary};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius};
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 80px;
  padding: 0.8rem;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.textPrimary};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius};
  resize: none;
`;

const Button = styled.button`
  margin-top: 1rem;
  padding: 0.8rem 1.5rem;
  border: none;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.onPrimary};
  font-size: 1rem;
  border-radius: ${({ theme }) => theme.borderRadius};
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
  }
`;

const SectionTitle = styled.h4`
  font-size: 1.2rem;
  margin-top: 1.5rem;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export default function RecipeForm({ onAdd }: { onAdd: (recipes: Recipe[]) => void }) {
  const [recipe, setRecipe] = useState<Recipe>({
    title: '',
    description: '',
    servings: 1,
    prepTime: 0,
    cookTime: 0,
    ingredients: [],
    instructions: [],
    tags: [],
    tips: [],
    image: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  const handleTagsChange = (tags: string[]) => {
    setRecipe({ ...recipe, tags });
  };

  const handleAddIngredientSection = () => {
    setRecipe({
      ...recipe,
      ingredients: [...recipe.ingredients, { section: '', items: [] }],
    });
  };

  const handleAddInstruction = () => {
    setRecipe({ ...recipe, instructions: [...recipe.instructions, ''] });
  };

  const handleSubmit = () => {
    if (!recipe.title || !recipe.description) {
      alert('❌ נא למלא את כל השדות!');
      return;
    }
    onAdd([recipe]);
  };

  return (
    <FormContainer>
      <h3>🍽️ הוספת מתכון ידנית</h3>
      <Input type="text" name="title" placeholder="שם המתכון" onChange={handleChange} />
      <TextArea name="description" placeholder="תיאור קצר" onChange={handleChange} />
      <Input
        type="number"
        name="servings"
        placeholder="כמות מנות"
        onChange={handleChange}
      />
      <Input
        type="number"
        name="prepTime"
        placeholder="זמן הכנה (דקות)"
        onChange={handleChange}
      />
      <Input
        type="number"
        name="cookTime"
        placeholder="זמן בישול (דקות)"
        onChange={handleChange}
      />
      <TagDropdown selectedTags={recipe.tags} onChange={handleTagsChange} />
      <Input
        type="text"
        name="image"
        placeholder="כתובת תמונה (אופציונלי)"
        onChange={handleChange}
      />

      <SectionTitle>📝 הוראות הכנה</SectionTitle>
      {recipe.instructions.map((_, i) => (
        <Input
          key={i}
          type="text"
          placeholder={`שלב ${i + 1}`}
          onChange={(e) => {
            const newInstructions = [...recipe.instructions];
            newInstructions[i] = e.target.value;
            setRecipe({ ...recipe, instructions: newInstructions });
          }}
        />
      ))}
      <Button onClick={handleAddInstruction}>➕ הוסף שלב</Button>

      <SectionTitle>🍽️ מרכיבים</SectionTitle>
      {recipe.ingredients.map((_, i) => (
        <Input
          key={i}
          type="text"
          placeholder="קטגוריית מרכיבים (לדוגמה: ירקות, תבלינים)"
          onChange={(e) => {
            const newIngredients = [...recipe.ingredients];
            newIngredients[i].section = e.target.value;
            setRecipe({ ...recipe, ingredients: newIngredients });
          }}
        />
      ))}
      <Button onClick={handleAddIngredientSection}>➕ הוסף קטגוריה</Button>

      <SectionTitle>💡 טיפים</SectionTitle>
      {recipe.tips.map((_, i) => (
        <Input
          key={i}
          type="text"
          placeholder={`טיפ ${i + 1}`}
          onChange={(e) => {
            const newTips = [...recipe.tips];
            newTips[i] = e.target.value;
            setRecipe({ ...recipe, tips: newTips });
          }}
        />
      ))}
      <Button onClick={() => setRecipe({ ...recipe, tips: [...recipe.tips, ''] })}>
        ➕ הוסף טיפ
      </Button>
      <br />
      <br />
      <Button onClick={handleSubmit}>📥 הוסף מתכון</Button>
    </FormContainer>
  );
}
