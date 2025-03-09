'use client';

import styled from 'styled-components';
import Link from 'next/link';
import { FaGithub, FaLinkedin, FaFacebook, FaGlobe } from 'react-icons/fa';

const FooterContainer = styled.footer`
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.textPrimary};
  text-align: center;
  padding: 2rem 1rem;
  margin-top: auto;
  box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.1);
  position: relative;
  left: 0;
  right: 0;
  width: 100%;
`;

const FooterLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 1rem;
`;

const FooterLink = styled(Link)`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 1.5rem;
  transition: 0.3s;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const FooterText = styled.p`
  margin-top: 1rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export default function Footer() {
  return (
    <FooterContainer>
      <FooterLinks>
        <FooterLink href="https://idanlevian.com" target="_blank">
          <FaGlobe />
        </FooterLink>
        <FooterLink href="https://github.com/eidan66" target="_blank">
          <FaGithub />
        </FooterLink>
        <FooterLink href="https://www.linkedin.com/in/idanlevian" target="_blank">
          <FaLinkedin />
        </FooterLink>
        <FooterLink href="https://www.facebook.com/idan.levian" target="_blank">
          <FaFacebook />
        </FooterLink>
      </FooterLinks>
      <FooterText>
        © {new Date().getFullYear()} כל הזכויות שמורות | עיצוב ופיתוח:{' '}
        <Link href="https://idanlevian.com" target="_blank">
          Idan Levian
        </Link>
      </FooterText>
    </FooterContainer>
  );
}
