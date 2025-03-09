'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import styled from 'styled-components';

import { recipes } from '../../data/recipes';
import { Recipe } from '@/types/Recipe';

const Container = styled.div`
  max-width: 900px;
  margin: auto;
  padding: 2rem;
  color: ${({ theme }) => theme.colors.textPrimary};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RecipeImage = styled.img`
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.3);
`;

const Title = styled.h1`
  font-size: 2.6rem;
  margin-top: ${({ theme }) => theme.spacing.large};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
  text-align: center;
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
  max-width: 700px;
`;

const Details = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.medium};
  width: 100%;
  max-width: 600px;
  margin: ${({ theme }) => theme.spacing.large} auto;
  background: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing.medium};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
`;

const DetailItem = styled.div`
  text-align: center;
  font-size: 1rem;
`;

const Section = styled.section`
  margin-top: ${({ theme }) => theme.spacing.large};
  width: 100%;
  max-width: 600px;
  background: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing.medium};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: ${({ theme }) => theme.spacing.large};
`;

const List = styled.ul`
  padding: 0;
  list-style: none;
`;

const ListItem = styled.li`
  font-size: 1.1rem;
  margin-bottom: ${({ theme }) => theme.spacing.small};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.small};
`;

const Checkbox = styled.input`
  transform: scale(1.3);
  margin-left: 10px;
  accent-color: ${({ theme }) => theme.colors.primary};
`;

const Bullet = styled.span`
  font-size: 1.2rem;
  margin-right: 8px;
`;

const ToggleButton = styled.button`
  margin-bottom: ${({ theme }) => theme.spacing.medium};
  padding: 8px 16px;
  background: ${({ theme }) => theme.colors.primary + 'cc'};
  color: ${({ theme }) => theme.colors.onPrimary};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius};
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
  }
`;

const CategoryItem = styled.h3`
  margin-bottom: ${({ theme }) => theme.spacing.large};
  margin-top: ${({ theme }) => theme.spacing.large};
  text-decoration: underline;
`;

export default function RecipePage() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!id) return;

    const foundRecipe = recipes.find((r) => r.id === id);

    if (foundRecipe) {
      setRecipe({
        ...foundRecipe,
        ingredients: Object.entries(foundRecipe.ingredients).map(([section, items]) => ({
          section,
          items,
        })),
        instructions: Object.entries(foundRecipe.instructions).map(
          ([section, steps]) => ({
            section,
            steps,
          }),
        ),
      });

      // אתחול של סימון המרכיבים ברשימה
      const initialChecked = Object.values(foundRecipe.ingredients)
        .flat()
        .reduce((acc, item) => ({ ...acc, [item]: false }), {});

      setCheckedItems(initialChecked);
    } else {
      setRecipe(null);
    }

    setLoading(false);
  }, [id]);

  if (loading) return <Container>⏳ טוען מתכון...</Container>;
  if (!recipe) return <Container>❌ המתכון לא נמצא</Container>;

  const toggleAll = () => {
    const allChecked = Object.values(checkedItems).every((val) => val);
    const newCheckedState = Object.keys(checkedItems).reduce(
      (acc, item) => ({ ...acc, [item]: !allChecked }),
      {},
    );
    setCheckedItems(newCheckedState);
  };

  return (
    <Container>
      <RecipeImage src={recipe.image} alt={recipe.title} />
      <Title>{recipe.title}</Title>
      <Description>{recipe.description}</Description>

      <Details>
        <DetailItem>
          ⏳ זמן הכנה: <strong>{recipe.prepTime} דקות</strong>
        </DetailItem>
        <DetailItem>
          🔥 זמן בישול: <strong>{recipe.cookTime} דקות</strong>
        </DetailItem>
        <DetailItem>🍽️ {recipe.servings} מנות</DetailItem>
      </Details>

      <Section>
        <SectionTitle>🛒 מרכיבים:</SectionTitle>
        <ToggleButton onClick={toggleAll}>
          {Object.values(checkedItems).every((val) => val) ? 'בטל סימון הכל' : 'סמן הכל'}
        </ToggleButton>
        <List>
          {recipe.ingredients.map((category, index) => (
            <div key={index}>
              <CategoryItem>{category.section}</CategoryItem>
              {category.items.map((ingredient: string, i: number) => (
                <ListItem key={i}>
                  <Checkbox
                    type="checkbox"
                    checked={checkedItems[ingredient] || false}
                    onChange={() =>
                      setCheckedItems((prev) => ({
                        ...prev,
                        [ingredient]: !prev[ingredient],
                      }))
                    }
                  />
                  {ingredient}
                </ListItem>
              ))}
            </div>
          ))}
        </List>
      </Section>

      <Section>
        <SectionTitle>👨‍🍳 הוראות הכנה:</SectionTitle>
        <List>
          {recipe.instructions.map((instruction, index) => (
            <div key={index}>
              <CategoryItem>{instruction.section}</CategoryItem>
              {instruction.steps.map((step: string, i: number) => (
                <ListItem key={i}>
                  <Bullet>•</Bullet> {step}
                </ListItem>
              ))}
            </div>
          ))}
        </List>
      </Section>

      {recipe.tips && (
        <Section>
          <SectionTitle>💡 טיפים:</SectionTitle>
          <List>
            {recipe.tips.map((tip: string, index: number) => (
              <ListItem key={index}>
                <Bullet>🔹</Bullet> {tip}
              </ListItem>
            ))}
          </List>
        </Section>
      )}
    </Container>
  );
}
