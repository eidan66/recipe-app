'use client';

import Link from 'next/link';
import styled from 'styled-components';
import { useState } from 'react';

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #222;
  color: white;
  width: 100%;
  margin: 0 auto;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  height: 60px;
`;

const Placeholder = styled.div`
  height: 60px;
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  cursor: pointer;
  flex: 1;
  text-align: right;
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: center;
  flex: 2;
`;

const NavLinks = styled.div<{ open: boolean }>`
  display: flex;
  gap: 1.5rem;

  a {
    color: white;
    text-decoration: none;
    font-size: 1.1rem;
    &:hover {
      text-decoration: underline;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    position: absolute;
    top: 60px;
    right: ${({ open }) => (open ? '0' : '-100%')};
    background-color: #222;
    width: 200px;
    padding: 1rem;
    transition: right 0.3s ease-in-out;
  }
`;

const LeftNav = styled.div`
  flex: 1;
  text-align: left;
`;

const Burger = styled.div`
  display: none;
  flex-direction: column;
  cursor: pointer;

  span {
    background: white;
    height: 3px;
    width: 25px;
    margin: 3px;
  }

  @media (max-width: 768px) {
    display: flex;
  }
`;

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <Navbar>
      <Logo>
        <Link href="/">🍽️ אספן המתכונים</Link>
      </Logo>
      <NavContainer>
        <NavLinks open={open}>
          <Link href="/">בית</Link>
          <Link href="/recipes">כל המתכונים</Link>
          <Link href="/upload">העלאת מתכון</Link>
        </NavLinks>
      </NavContainer>
      <LeftNav>
        <Link href="/about">אודות</Link>
      </LeftNav>
      <Burger onClick={() => setOpen(!open)}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </Burger>
      <Placeholder />
    </Navbar>
  );
};

export default Header;
