'use client';
import { Recipe } from '@/types/Recipe';

import { useState } from 'react';
import styled from 'styled-components';

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

  const handlePasteJson = () => {
    try {
      const json = JSON.parse(jsonInput);
      const recipesArray = Array.isArray(json) ? json : [json];
      onPaste(recipesArray);
    } catch {
      alert('❌ הטקסט אינו בפורמט JSON תקין.');
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
      <Button onClick={handlePasteJson}>📥 הוסף מהטקסט</Button>
    </div>
  );
}
