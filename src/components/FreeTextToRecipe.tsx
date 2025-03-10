'use client';

import { useState } from 'react';
import styled from 'styled-components';
import { Recipe } from '@/types/Recipe';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 600px;
  margin: auto;
  text-align: center;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 150px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.colors.textSecondary};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const Button = styled.button`
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  font-weight: bold;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryVariant};
  }
`;

const Output = styled.pre`
  background: ${({ theme }) => theme.colors.surface};
  padding: 10px;
  border-radius: 5px;
  text-align: left;
  max-height: 300px;
  overflow-y: auto;
`;

export default function FreeTextToRecipe() {
  const [text, setText] = useState('');
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generateRecipe = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/generate-recipe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate recipe');
      }

      const data: Recipe = await response.json();

      console.log('idan - generateRecipe data:', data);

      setRecipe(data);
    } catch (error) {
      console.error('Error generating recipe:', error);
      setError('שגיאה ביצירת המתכון, נסה שוב.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <h2>💡 הזן מתכון חופשי</h2>
      <Textarea
        placeholder="הדבק כאן את המתכון החופשי שלך..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button onClick={generateRecipe} disabled={loading}>
        {loading ? 'טוען...' : 'המר למתכון'}
      </Button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {recipe && (
        <>
          <h3>📜 מתכון שנוצר</h3>
          <Output>{JSON.stringify(recipe, null, 2)}</Output>
        </>
      )}
    </Container>
  );
}
