'use client';

import styled from 'styled-components';

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  max-width: 400px;
  padding: 10px;
  border-radius: ${({ theme }) => theme.borderRadius};
  border: 1px solid ${({ theme }) => theme.colors.textSecondary};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

interface SearchBarProps {
  query: string;
  onSearch: (query: string) => void;
}

export default function SearchBar({ query, onSearch }: SearchBarProps) {
  return (
    <SearchContainer>
      <Input
        type="text"
        placeholder="חפש מתכון..."
        value={query}
        onChange={(e) => onSearch(e.target.value)}
      />
    </SearchContainer>
  );
}
