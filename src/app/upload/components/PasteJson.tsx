'use client';
import { Recipe } from '@/types/Recipe';
import { useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { gql, useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// הגדרת ה-Mutation להוספת מתכון
const ADD_RECIPE_MUTATION = gql`
  mutation AddRecipe($recipe: RecipeInput!) {
    addRecipe(recipe: $recipe) {
      uuid
      title
    }
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  max-width: 500px;
  height: 120px;
  padding: 1rem;
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
  border-radius: ${({ theme }) => theme.borderRadius};
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
  }
`;

const Title = styled.h2`
  margin-bottom: ${({ theme }) => theme.spacing.large};
`;

interface PasteJsonProps {
  onPaste: (recipes: Recipe[]) => void;
}

export default function PasteJson({ onPaste }: PasteJsonProps) {
  const [jsonInput, setJsonInput] = useState('');
  const [addRecipe, { loading, error }] = useMutation(ADD_RECIPE_MUTATION);

  const theme = useTheme();

  const showToastSuccess = () => {
    toast.success('המתכון הועלה בהצלחה!', {
      position: 'top-right',
      autoClose: 3000,
      style: {
        background: theme.colors.success,
        color: theme.colors.onPrimary,
        borderRadius: theme.borderRadius,
      },
    });
  };

  const showToastError = () => {
    toast.error('הטקסט אינו בפורמט JSON תקין או שהעלאה נכשלה.', {
      position: 'top-right',
      autoClose: 4000,
      style: {
        background: theme.colors.error,
        color: theme.colors.onError,
        borderRadius: theme.borderRadius,
      },
    });
  };

  const handlePasteJson = async () => {
    try {
      const json = JSON.parse(jsonInput);
      const recipesArray = Array.isArray(json) ? json : [json];

      console.log('idan - handlePasteJson recipesArray:', recipesArray);

      for (const recipe of recipesArray) {
        // Ensure consistency: if recipe has 'id', convert it to 'uuid'
        if (recipe.id) {
          recipe.uuid = recipe.id;
          delete recipe.id;
        }

        await addRecipe({
          variables: {
            recipe: {
              title: recipe.title,
              description: recipe.description,
              image: recipe.image,
              tags: recipe.tags,
              tips: recipe.tips,
              servings: Number(recipe.servings),
              prepTime: Number(recipe.prepTime),
              cookTime: Number(recipe.cookTime),
              ingredients: recipe.ingredients,
              instructions: recipe.instructions,
              category: recipe.category,
              allergens: recipe.allergens,
              nutrition: recipe.nutrition || {},
            },
          },
        });
      }

      onPaste(recipesArray);
      setJsonInput('');
      showToastSuccess();
    } catch (err) {
      console.log('idan - handlePasteJson err:', err);
      showToastError();
    }
  };

  return (
    <div>
      <Title>או הדבק קובץ JSON ידנית:</Title>
      <TextArea
        placeholder="הדבק כאן את תוכן ה-JSON..."
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
      />
      <br />
      <Button onClick={handlePasteJson} disabled={loading}>
        📥 {loading ? 'מעלה מתכונים...' : 'הוסף מהטקסט'}
      </Button>
      {error && <p style={{ color: 'red' }}>⚠ שגיאה בהעלאת הנתונים.</p>}
    </div>
  );
}
