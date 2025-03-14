'use client';

import styled from 'styled-components';
import RecipeCard from './RecipeCard';
import { Recipe } from '@/types/Recipe';

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  margin-top: 20px;
`;

interface RecipeListProps {
  recipes: Recipe[];
}

export default function RecipeList({ recipes }: RecipeListProps) {
  return (
    <Grid>
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.uuid} {...recipe} />
      ))}
    </Grid>
  );
}
