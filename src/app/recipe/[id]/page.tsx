'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import styled from 'styled-components';
import { useQuery, gql } from '@apollo/client';

const BackButton = styled.button`
  position: fixed;
  bottom: 100px;
  right: 20px;
  width: 50px;
  height: 50px;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.onPrimary};
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: 0.3s;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
  }
`;

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

const GET_RECIPE = gql`
  query GetRecipe($id: String!) {
    getRecipe(uuid: $id) {
      uuid
      title
      description
      image
      prepTime
      cookTime
      servings
      tags
      category
      allergens
      ingredients {
        section
        items
      }
      instructions {
        section
        steps
      }
      tips
      nutrition {
        calories
        protein
        fat
        netCarbs
        fiber
        iron
        sodium
        zinc
        selenium
        vitaminB12
      }
    }
  }
`;

export default function RecipePage() {
  const { id } = useParams();
  const router = useRouter();
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const { data, loading, error } = useQuery(GET_RECIPE, {
    variables: { id },
    skip: !id,
  });

  useEffect(() => {
    if (data && data.getRecipe) {
      const initialChecked = data.getRecipe.ingredients
        .flatMap((cat: { items: string[] }) => cat.items)
        .reduce(
          (acc: Record<string, boolean>, item: string) => ({ ...acc, [item]: false }),
          {},
        );
      setCheckedItems(initialChecked);
    }
  }, [data]);

  if (loading) return <Container>⏳ טוען מתכון...</Container>;
  if (error) return <Container>❌ שגיאה בטעינת המתכון</Container>;
  if (!data || !data.getRecipe) return <Container>❌ המתכון לא נמצא</Container>;

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
      <BackButton onClick={() => router.back()}>חזור</BackButton>
      {data.getRecipe.image && (
        <RecipeImage src={data.getRecipe.image} alt={data.getRecipe.title} />
      )}
      <Title>{data.getRecipe.title}</Title>
      <Description>{data.getRecipe.description}</Description>

      <Details>
        <DetailItem>
          ⏳ זמן הכנה: <strong>{data.getRecipe.prepTime} דקות</strong>
        </DetailItem>
        <DetailItem>
          🔥 זמן בישול: <strong>{data.getRecipe.cookTime} דקות</strong>
        </DetailItem>
        <DetailItem>🍽️ {data.getRecipe.servings} מנות</DetailItem>
        {data.getRecipe.category && (
          <DetailItem>
            📂 קטגוריה: <strong>{data.getRecipe.category}</strong>
          </DetailItem>
        )}
        {data.getRecipe.allergens && data.getRecipe.allergens.length > 0 && (
          <DetailItem>
            ⚠️ אלרגנים: <strong>{data.getRecipe.allergens.join(', ')}</strong>
          </DetailItem>
        )}
      </Details>

      {data.getRecipe.nutrition && (
        <Section>
          <SectionTitle>🍽️ ערכים תזונתיים:</SectionTitle>
          <List>
            {data.getRecipe.nutrition.calories && (
              <ListItem>
                <Bullet>🔥</Bullet> קלוריות: {data.getRecipe.nutrition.calories} קק&quot;ל
              </ListItem>
            )}
            {data.getRecipe.nutrition.protein && (
              <ListItem>
                <Bullet>💪</Bullet> חלבון: {data.getRecipe.nutrition.protein} גרם
              </ListItem>
            )}
            {data.getRecipe.nutrition.fat && (
              <ListItem>
                <Bullet>🥑</Bullet> שומן: {data.getRecipe.nutrition.fat} גרם
              </ListItem>
            )}
            {data.getRecipe.nutrition.netCarbs && (
              <ListItem>
                <Bullet>🥦</Bullet> פחמימות נטו: {data.getRecipe.nutrition.netCarbs} גרם
              </ListItem>
            )}
            {data.getRecipe.nutrition.fiber && (
              <ListItem>
                <Bullet>🌾</Bullet> סיבים תזונתיים: {data.getRecipe.nutrition.fiber} גרם
              </ListItem>
            )}
            {data.getRecipe.nutrition.iron && (
              <ListItem>
                <Bullet>🔩</Bullet> ברזל: {data.getRecipe.nutrition.iron} מ&quot;ג
              </ListItem>
            )}
            {data.getRecipe.nutrition.zinc && (
              <ListItem>
                <Bullet>🧪</Bullet> אבץ: {data.getRecipe.nutrition.zinc} מ&quot;ג
              </ListItem>
            )}
            {data.getRecipe.nutrition.selenium && (
              <ListItem>
                <Bullet>🧂</Bullet> סלניום: {data.getRecipe.nutrition.selenium} מק&quot;ג
              </ListItem>
            )}
            {data.getRecipe.nutrition.sodium && (
              <ListItem>
                <Bullet>🧂</Bullet> סודיום: {data.getRecipe.nutrition.sodium} מק&quot;ג
              </ListItem>
            )}
            {data.getRecipe.nutrition.vitaminB12 && (
              <ListItem>
                <Bullet>💊</Bullet> ויטמין B12: {data.getRecipe.nutrition.vitaminB12}
                מק&quot;ג
              </ListItem>
            )}
          </List>
        </Section>
      )}

      <Section>
        <SectionTitle>🛒 מרכיבים:</SectionTitle>
        <ToggleButton onClick={toggleAll}>
          {Object.values(checkedItems).every((val) => val) ? 'בטל סימון הכל' : 'סמן הכל'}
        </ToggleButton>
        <List>
          {data.getRecipe.ingredients.map(
            (category: { section: string; items: string[] }, index: number) => (
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
            ),
          )}
        </List>
      </Section>

      <Section>
        <SectionTitle>👨‍🍳 הוראות הכנה:</SectionTitle>
        <List>
          {data.getRecipe.instructions.map(
            (instruction: { section: string; steps: string[] }, index: number) => (
              <div key={index}>
                <CategoryItem>{instruction.section}</CategoryItem>
                {instruction.steps.map((step: string, i: number) => (
                  <ListItem key={i}>
                    <Bullet>•</Bullet> {step}
                  </ListItem>
                ))}
              </div>
            ),
          )}
        </List>
      </Section>

      {data.getRecipe.tips && (
        <Section>
          <SectionTitle>💡 טיפים:</SectionTitle>
          <List>
            {data.getRecipe.tips.map((tip: string, index: number) => (
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
