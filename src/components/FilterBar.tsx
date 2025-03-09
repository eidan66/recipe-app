'use client';

import { useState } from 'react';
import Select, { StylesConfig } from 'react-select';
import styled, { useTheme } from 'styled-components';
import { RecipeTags } from '@/types/Tags';

const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 1rem;
`;

const SelectWrapper = styled.div`
  width: 100%;
  max-width: 400px;
`;

const FilterButton = styled.button`
  margin-top: 10px;
  padding: 10px 15px;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.onPrimary};
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryVariant};
  }
`;

const ClearButton = styled.button`
  margin-top: 10px;
  padding: 10px 15px;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius};
  background: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.onSecondary};
  cursor: pointer;
  transition: background 0.3s ease;
  margin-left: 10px;

  &:hover {
    background: ${({ theme }) => theme.colors.secondaryVariant};
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

interface FilterBarProps {
  selectedTags: RecipeTags[];
  onFilterChange: (tags: RecipeTags[]) => void;
}

export default function FilterBar({ selectedTags, onFilterChange }: FilterBarProps) {
  const theme = useTheme();
  const [tempSelectedTags, setTempSelectedTags] = useState<RecipeTags[]>(selectedTags);

  const getCustomStyles: StylesConfig<{ value: RecipeTags; label: RecipeTags }, true> = {
    control: (base) => ({
      ...base,
      background: theme.colors.surface,
      borderColor: theme.colors.textSecondary,
      color: theme.colors.textPrimary,
      borderRadius: theme.borderRadius,
      padding: '5px',
      width: '100%',
      maxWidth: '400px',
      '*': {
        color: theme.colors.textPrimary,
      },
    }),
    container: (base) => ({
      ...base,
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
    }),
    menu: (base) => ({
      ...base,
      background: theme.colors.surface,
      borderRadius: theme.borderRadius,
      width: '100%',
      minWidth: '300px',
      zIndex: 9999,
    }),
    option: (base, state) => ({
      ...base,
      background: state.isSelected ? theme.colors.primary : 'transparent',
      color: state.isSelected ? theme.colors.onPrimary : theme.colors.textPrimary,
      '&:hover': {
        background: theme.colors.primary,
        color: theme.colors.onPrimary,
      },
    }),
  };

  return (
    <FilterContainer>
      <SelectWrapper>
        <Select
          styles={getCustomStyles}
          options={Object.values(RecipeTags).map((tag) => ({ value: tag, label: tag }))}
          isMulti
          placeholder="בחר תגיות..."
          value={tempSelectedTags.map((tag) => ({ value: tag, label: tag }))}
          onChange={(selectedOptions) =>
            setTempSelectedTags(
              selectedOptions.map((option) => option.value as RecipeTags),
            )
          }
        />
      </SelectWrapper>
      <ButtonWrapper>
        <FilterButton onClick={() => onFilterChange(tempSelectedTags)}>סנן</FilterButton>
        <ClearButton
          onClick={() => {
            setTempSelectedTags([]);
            onFilterChange([]);
          }}
        >
          נקה
        </ClearButton>
      </ButtonWrapper>
    </FilterContainer>
  );
}
