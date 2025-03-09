'use client';

import styled from 'styled-components';
import Link from 'next/link';

import theme from '../styles/theme';

const HomeContainer = styled.div`
  text-align: center;
  padding: 6rem 2rem;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${theme.colors.background};
`;

const Title = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 1rem;
  color: ${theme.colors.textPrimary};
  text-shadow: 2px 2px 15px rgba(0, 0, 0, 0.5);
  font-weight: bold;
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
  max-width: 700px;
  color: ${theme.colors.textSecondary};
  text-shadow: 1px 1px 10px rgba(0, 0, 0, 0.4);
  font-weight: 300;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  margin-top: 2.5rem;
`;

const Button = styled(Link)`
  background: ${theme.colors.primary};
  color: white;
  padding: 1rem 2rem;
  border-radius: 10px;
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: bold;
  transition: all 0.3s ease-in-out;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);

  &:hover {
    background: ${theme.colors.primaryVariant};
    transform: translateY(-3px);
    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.3);
  }
`;

// const FeaturesSection = styled.div`
//   margin-top: 4rem;
//   padding: 2rem;
//   background: ${theme.colors.surface};
//   border-radius: 15px;
//   backdrop-filter: blur(12px);
//   text-align: center;
//   max-width: 850px;
//   box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
// `;

// const FeaturesTitle = styled.h2`
//   font-size: 2.2rem;
//   margin-bottom: 1.5rem;
//   color: ${theme.colors.textPrimary};
//   font-weight: bold;
// `;

// const FeaturesList = styled.ul`
//   list-style: none;
//   padding: 0;
//   color: ${theme.colors.textSecondary};
//   font-size: 1.3rem;
//   display: flex;
//   flex-direction: column;
//   gap: 1rem;
// `;

export default function Home() {
  return (
    <HomeContainer>
      <Title>🍽️ אספן המתכונים</Title>
      <Subtitle>
        חפש, שתף ונהל מתכונים אהובים בקלות! האתר שיעזור לך לשמור על המתכונים שלך ולגלות
        חדשים.
      </Subtitle>
      <ButtonContainer>
        <Button href="/recipes">📖 כל המתכונים</Button>
        <Button href="/upload">⬆️ העלאת מתכון</Button>
        <Button href="/about">ℹ️ מידע נוסף</Button>
      </ButtonContainer>

      {/* <FeaturesSection>
        <FeaturesTitle>✨ למה להשתמש באספן המתכונים?</FeaturesTitle>
        <FeaturesList>
          <li>✅ ממשק מודרני ופשוט לשימוש</li>
          <li>✅ העלאת ושיתוף מתכונים בקלות</li>
          <li>✅ שמירה על כל המתכונים שלך במקום אחד</li>
          <li>✅ גישה נוחה מכל מכשיר (מותאם לניידים!)</li>
        </FeaturesList>
      </FeaturesSection> */}
    </HomeContainer>
  );
}
