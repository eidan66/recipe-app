'use client';

import { useState } from 'react';
import styled from 'styled-components';
import FileUpload from './components/FileUpload';
import PasteJson from './components/PasteJson';
import RecipeForm from './components/RecipeForm';
import { Recipe } from '@/types/Recipe';
//TODO: Fix this later
// import FreeTextToRecipe from '@/components/FreeTextToRecipe';

const UploadContainer = styled.div`
  text-align: center;
  padding: 5rem 2rem;
  max-width: 800px;
  margin: auto;
`;

const Section = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  padding: 2rem;
  margin-bottom: 2rem;
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h1`
  font-size: 2.2rem;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export default function UploadPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const handleNewRecipes = (newRecipes: unknown) => {
    if (!Array.isArray(newRecipes)) {
      console.error('Invalid recipes format:', newRecipes);
      return;
    }
    setRecipes((prev) => [...prev, ...(newRecipes as Recipe[])]);
  };

  return (
    <UploadContainer>
      <Title>⬆️ העלאת מתכון</Title>

      <Section>
        <FileUpload onUpload={handleNewRecipes} />
      </Section>

      <Section>
        <PasteJson onPaste={handleNewRecipes} />
      </Section>
      {/* //TODO: Fix this later
      <Section>
        <FreeTextToRecipe />
      </Section> */}

      <Section>
        <RecipeForm onAdd={handleNewRecipes} />
      </Section>

      {recipes.length > 0 && (
        <Section>
          <h2>🍽️ מתכונים שהועלו:</h2>
          <ul>
            {recipes.map((recipe, index) => (
              <li key={index}>{recipe.title}</li>
            ))}
          </ul>
        </Section>
      )}
    </UploadContainer>
  );
}
