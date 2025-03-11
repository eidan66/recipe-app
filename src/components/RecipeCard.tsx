'use client';

import styled from 'styled-components';
import Link from 'next/link';
import { useContext } from 'react';
import { ThemeContext } from 'styled-components';

import Icon404 from '@/assets/svg/404.svg';

// 🎨 עיצוב הכרטיסייה
const Card = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: ${({ theme }) => theme.spacing.medium};
  text-align: center;
  width: 400px;
  height: 670px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: 0.3s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const RecipeImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.borderRadius};
`;

const Title = styled.h3`
  font-size: 1.7rem;
  margin-top: ${({ theme }) => theme.spacing.medium};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-top: ${({ theme }) => theme.spacing.medium};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

const Info = styled.div`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-top: ${({ theme }) => theme.spacing.medium};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
  line-height: 1.6rem;
`;

const TagsContainer = styled.div`
  margin-top: ${({ theme }) => theme.spacing.medium};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.small};
  justify-content: center;
`;

const Tag = styled.span`
  background: ${({ theme }) => theme.colors.textSecondary};
  color: ${({ theme }) => theme.colors.onPrimary};
  font-size: 0.9rem;
  padding: 4px 10px;
  border-radius: ${({ theme }) => theme.borderRadius};
`;

const Button = styled(Link)`
  display: inline-block;
  margin-top: ${({ theme }) => theme.spacing.medium};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
  padding: ${({ theme }) => theme.spacing.small} ${({ theme }) => theme.spacing.medium};
  background: ${({ theme }) => theme.colors.primary + 'd4'};
  color: ${({ theme }) => theme.colors.onSecondary};
  text-decoration: none;
  font-size: 1.1rem;
  border-radius: ${({ theme }) => theme.borderRadius};
  transition: 0.3s;

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.onPrimary};
  }
`;

// 🎯 נתונים שמתקבלים
interface RecipeCardProps {
  uuid: string;
  title: string;
  description: string;
  image: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  tags: string[];
}

export default function RecipeCard({
  uuid,
  title,
  description,
  image,
  prepTime,
  cookTime,
  servings,
  tags,
}: RecipeCardProps) {
  const theme = useContext(ThemeContext);

  return (
    <Card theme={theme}>
      {image && image.trim() !== '' ? (
        <RecipeImage src={image} alt={title} />
      ) : (
        <Icon404 style={{ width: '100%', height: '250px' }} />
      )}
      <Title theme={theme}>{title}</Title>
      <Description theme={theme}>{description}</Description>
      <Info theme={theme}>
        <strong>⏳ זמן הכנה:</strong> {prepTime} דק&apos; |<strong> 🍳 זמן בישול:</strong>{' '}
        {cookTime} דק&apos; <br /> <strong>🍽️ מנות:</strong> {servings}
      </Info>
      <TagsContainer>
        {tags.map((tag, index) => (
          <Tag key={index} theme={theme}>
            {tag}
          </Tag>
        ))}
      </TagsContainer>
      <Button href={`/recipe/${uuid}`} theme={theme}>
        📖 למתכון המלא
      </Button>
    </Card>
  );
}
