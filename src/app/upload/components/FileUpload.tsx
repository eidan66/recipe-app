'use client';

import styled from 'styled-components';

const UploadBox = styled.label`
  display: block;
  width: 100%;
  max-width: 500px;
  margin: auto;
  padding: 2rem;
  border: 2px dashed ${({ theme }) => theme.colors.primary};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.textPrimary};
  cursor: pointer;
  border-radius: ${({ theme }) => theme.borderRadius};
  transition: 0.3s;

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceHover};
  }
`;

const HiddenInput = styled.input`
  display: none;
`;

import { Recipe } from '@/types/Recipe';

interface FileUploadProps {
  onUpload: (recipes: Recipe[]) => void;
}

export default function FileUpload({ onUpload }: FileUploadProps) {
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target?.result as string);
        const recipesArray: Recipe[] = Array.isArray(json)
          ? (json as Recipe[])
          : [json as Recipe];
        onUpload(recipesArray);
      } catch {
        alert('❌ הקובץ אינו בפורמט JSON תקין.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <UploadBox>
      📁 גרור ושחרר קובץ JSON כאן או לחץ לבחירת קובץ
      <HiddenInput type="file" accept=".json" onChange={handleFileUpload} />
    </UploadBox>
  );
}
