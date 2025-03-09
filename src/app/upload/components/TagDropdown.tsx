import { useState } from 'react';
import Select from 'react-select';
import styled, { useTheme } from 'styled-components';
import { RecipeTags } from '@/types/Tags';
import { StylesConfig, MultiValue } from 'react-select';

interface TagDropdownProps {
  selectedTags: string[];
  onChange: (tags: string[]) => void;
}

const CustomTagInput = styled.input`
  width: 100%;
  margin-top: 10px;
  padding: 8px;
  border-radius: ${({ theme }) => theme.borderRadius};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 1rem;
`;

export default function TagDropdown({ selectedTags, onChange }: TagDropdownProps) {
  const theme = useTheme();
  const [customTags, setCustomTags] = useState<string[]>([]);
  const [customTagInput, setCustomTagInput] = useState('');

  const customStyles: StylesConfig<{ value: string; label: string }, true> = {
    control: (base, state) => ({
      ...base,
      background: theme.colors.surface,
      borderColor: state.isFocused ? theme.colors.primary + 'd4' : theme.colors.primary,
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
      fontWeight: state.isSelected ? 'bold' : 'normal',
      padding: '10px',
      '&:hover': {
        background: theme.colors.secondary,
        color: theme.colors.onSecondary,
      },
    }),
    multiValue: (base) => ({
      ...base,
      background: theme.colors.primary,
      borderRadius: theme.borderRadius,
      padding: '5px',
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: theme.colors.onPrimary,
      fontWeight: 'bold',
    }),
    multiValueRemove: (base) => ({
      ...base,
      color: theme.colors.onPrimary,
      '&:hover': {
        background: theme.colors.textPrimary + '3c',
        color: theme.colors.onSecondary,
      },
    }),
  };

  const tagOptions: { value: string; label: string }[] = [
    ...Object.values(RecipeTags)
      .map((tag) => ({ value: tag, label: tag }))
      .sort((a, b) => a.label.localeCompare(b.label, 'he')),
    { value: 'other', label: 'אחר...' },
  ];

  const handleTagChange = (
    selectedOptions: MultiValue<{ value: string; label: string }>,
  ) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    onChange([...selectedValues, ...customTags]);
  };

  const handleCustomTagAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomTagInput(e.target.value);
  };

  const addCustomTags = () => {
    const newTags = customTagInput
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    setCustomTags((prev) => [...prev, ...newTags]);
    onChange([...selectedTags, ...newTags]);
    setCustomTagInput('');
  };

  return (
    <div>
      <Select
        styles={customStyles}
        options={tagOptions}
        isMulti
        placeholder="בחר תגיות..."
        value={tagOptions.filter((tag) => selectedTags.includes(tag.value))}
        onChange={(newValue) =>
          handleTagChange(newValue as MultiValue<{ value: string; label: string }>)
        }
      />

      {selectedTags.includes('other') && (
        <div>
          <CustomTagInput
            type="text"
            placeholder="הוסף תגיות מותאמות אישית, מופרדות בפסיקים"
            value={customTagInput}
            onChange={handleCustomTagAdd}
            onBlur={addCustomTags}
          />
        </div>
      )}
    </div>
  );
}
