'use client';

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { recipes as allRecipes } from '../data/recipes';
import RecipeList from '@/components/RecipeList';
import { RecipeTags } from '@/types/Tags';
import { Recipe } from '@/types/Recipe';
import SearchBar from '@/components/SearchBar';
import FilterBar from '@/components/FilterBar';

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

export default function RecipesPage() {
  const [query, setQuery] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<RecipeTags[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>(allRecipes);

  useEffect(() => {
    let filtered = allRecipes;

    if (query) {
      filtered = filtered.filter((r) =>
        r.title.toLowerCase().includes(query.toLowerCase()),
      );
    }

    if (selectedTags.length > 0) {
      filtered = filtered.filter((r) =>
        selectedTags.every((tag) => r.tags.includes(tag)),
      );
    }

    setFilteredRecipes(filtered);
  }, [query, selectedTags]);

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
