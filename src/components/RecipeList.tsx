'use client';

import styled from 'styled-components';
import RecipeCard from './RecipeCard';

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  margin-top: 20px;
`;

interface Recipe {
  uuid: string;
  title: string;
  description: string;
  image: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  tags: string[];
}

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
