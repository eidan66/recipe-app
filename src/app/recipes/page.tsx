'use client';

import { useState, useEffect } from 'react';
import styled, { useTheme } from 'styled-components';
import Select, { StylesConfig } from 'react-select';
import { recipes as allRecipes } from '../data/recipes';
import RecipeList from '@/components/RecipeList';
import { RecipeTags } from '@/types/Tags';
import { Recipe } from '@/types/Recipe';

const RecipesContainer = styled.div`
  text-align: center;
  padding: 8rem 2rem;
  max-width: 900px;
  margin: auto;
`;

const RecipesGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
  margin-top: 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
`;

const Input = styled.input`
  width: 100%;
  max-width: 400px;
  padding: 10px;
  border-radius: ${({ theme }) => theme.borderRadius};
  border: 1px solid ${({ theme }) => theme.colors.textSecondary};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

const FiltersContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.medium};
  align-items: center;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing.large};
`;

const PaginationContainer = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
  align-items: center;
  margin-top: ${({ theme }) => theme.spacing.large};
`;

const PaginationButton = styled.button<{ active?: boolean }>`
  padding: 6px 12px;
  border-radius: ${({ theme }) => theme.borderRadius};
  border: none;
  cursor: pointer;
  background: ${({ active, theme }) =>
    active ? theme.colors.primary : theme.colors.surface};
  color: ${({ active, theme }) =>
    active ? theme.colors.onPrimary : theme.colors.textPrimary};
  transition: 0.3s;
  font-weight: ${({ active }) => (active ? 'bold' : 'normal')};
  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.onPrimary};
  }
`;

export default function RecipesPage() {
  const theme = useTheme();
  const [query, setQuery] = useState<string>('');
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>(
    allRecipes.map((recipe) => ({
      ...recipe,
      ingredients: Object.entries(recipe.ingredients).map(([section, items]) => ({
        section,
        items,
      })),
      instructions: Object.entries(recipe.instructions).map(([section, steps]) => ({
        section,
        steps,
      })),
    })),
  );
  const [selectedTags, setSelectedTags] = useState<RecipeTags[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const recipesPerPage = 6;

  const getCustomStyles: StylesConfig<{ value: RecipeTags; label: RecipeTags }, true> = {
    control: (base, state) => ({
      ...base,
      background: theme.colors.surface,
      borderColor: state.isFocused ? theme.colors.primary : theme.colors.textSecondary,
      color: theme.colors.textPrimary,
      borderRadius: theme.borderRadius,
      padding: '5px',
      boxShadow: state.isFocused ? `0 0 0 2px ${theme.colors.primary}` : 'none',
      '&:hover': {
        borderColor: theme.colors.primary,
      },
    }),
    menu: (base) => ({
      ...base,
      background: theme.colors.surface,
      borderRadius: theme.borderRadius,
      boxShadow: `0px 4px 10px rgba(0, 0, 0, 0.2)`,
    }),
    option: (base, state) => ({
      ...base,
      background: state.isSelected ? theme.colors.primary : 'transparent',
      color: state.isSelected ? theme.colors.onPrimary : theme.colors.textPrimary,
      '&:hover': {
        background: theme.colors.secondary,
        color: theme.colors.onSecondary,
      },
    }),
    multiValue: (base) => ({
      ...base,
      background: theme.colors.primary,
      borderRadius: theme.borderRadius,
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: theme.colors.onPrimary,
    }),
    multiValueRemove: (base) => ({
      ...base,
      color: theme.colors.onPrimary,
      '&:hover': {
        background: theme.colors.secondary,
        color: theme.colors.onSecondary,
      },
    }),
  };

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

    setFilteredRecipes(
      filtered.map((recipe) => ({
        ...recipe,
        ingredients: Object.entries(recipe.ingredients).map(([section, items]) => ({
          section,
          items,
        })),
        instructions: Object.entries(recipe.instructions).map(([section, steps]) => ({
          section,
          steps,
        })),
      })),
    );
    setCurrentPage(1);
  }, [query, selectedTags]);

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = filteredRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);
  const totalPages = Math.ceil(filteredRecipes.length / recipesPerPage);

  return (
    <RecipesContainer>
      <Title>📖 כל המתכונים</Title>

      <Input
        type="text"
        placeholder="חפש מתכון..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <FiltersContainer>
        <Select
          styles={getCustomStyles}
          options={Object.values(RecipeTags).map((tag) => ({ value: tag, label: tag }))}
          isMulti
          placeholder="בחר תגיות..."
          value={selectedTags.map((tag) => ({ value: tag, label: tag }))}
          onChange={(selectedOptions) =>
            setSelectedTags(selectedOptions.map((option) => option.value as RecipeTags))
          }
        />
      </FiltersContainer>

      {currentRecipes.length === 0 ? (
        <p>❌ לא נמצאו תוצאות</p>
      ) : (
        <RecipesGrid>
          <RecipeList recipes={currentRecipes} />
        </RecipesGrid>
      )}

      {totalPages > 1 && (
        <PaginationContainer>
          {[...Array(totalPages)].map((_, index) => (
            <PaginationButton
              key={index}
              active={currentPage === index + 1}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </PaginationButton>
          ))}
        </PaginationContainer>
      )}
    </RecipesContainer>
  );
}
