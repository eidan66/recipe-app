'use client';

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { gql, useQuery } from '@apollo/client';
import RecipeList from '@/components/RecipeList';
import { RecipeTags } from '@/types/Tags';
import { Recipe } from '@/types/Recipe';
import SearchBar from '@/components/SearchBar';
import FilterBar from '@/components/FilterBar';

const GET_RECIPES = gql`
  query GetRecipes {
    getRecipes {
      uuid
      title
      description
      image
      prepTime
      cookTime
      servings
      tags
    }
  }
`;

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
  width: 100%;
  height: 100dvh;
`;

const RecipesContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 8rem 2rem;
  width: 100%;
  margin: auto;
`;

const RecipesGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
  margin-top: 2rem;
  min-height: 200px;
`;

const SkeletonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
  margin-top: 2rem;
  width: 100%;
`;

const Skeleton = styled.div`
  width: 300px;
  height: 400px;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
  animation: pulse 1.5s infinite ease-in-out;

  @keyframes pulse {
    0% {
      opacity: 0.6;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0.6;
    }
  }
`;

export default function RecipesPage() {
  const { data, loading, error } = useQuery(GET_RECIPES);
  const [query, setQuery] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<RecipeTags[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    if (data && data.getRecipes) {
      setFilteredRecipes(data.getRecipes);
    }
  }, [data]);

  useEffect(() => {
    if (!data || !data.getRecipes) return;

    let filtered = data.getRecipes;

    if (query) {
      filtered = filtered.filter((r: Recipe) =>
        r.title.toLowerCase().includes(query.toLowerCase()),
      );
    }

    if (selectedTags.length > 0) {
      filtered = filtered.filter((r: Recipe) =>
        selectedTags.every((tag) => r.tags.includes(tag)),
      );
    }

    const sortedFilteredRecipes = [...filtered].sort((a: Recipe, b: Recipe) =>
      a.title.localeCompare(b.title),
    );
    setFilteredRecipes(sortedFilteredRecipes);
  }, [query, selectedTags, data]);

  if (loading) {
    return (
      <RecipesContainer>
        <SearchBar query={query} onSearch={setQuery} />
        <FilterBar selectedTags={selectedTags} onFilterChange={setSelectedTags} />
        <SkeletonContainer>
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </SkeletonContainer>
      </RecipesContainer>
    );
  }

  if (error) return <RecipesContainer>❌ שגיאה בטעינת המתכונים</RecipesContainer>;

  return (
    <RecipesContainer>
      <SearchBar query={query} onSearch={setQuery} />
      <FilterBar selectedTags={selectedTags} onFilterChange={setSelectedTags} />

      <RecipesGrid>
        {filteredRecipes.length === 0 ? (
          <Grid>
            <p>❌ לא נמצאו תוצאות</p>
          </Grid>
        ) : (
          <RecipeList recipes={filteredRecipes} />
        )}
      </RecipesGrid>
    </RecipesContainer>
  );
}
