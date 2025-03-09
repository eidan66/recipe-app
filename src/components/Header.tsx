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
  justify-content: flex-start;
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
    left: 0; /* שינוי מ-right: 0 */
    background-color: #222;
    width: 200px;
    padding: 1rem;
    transition: transform 0.3s ease-in-out;
    transform: ${({ open }) =>
      open ? 'translateX(0)' : 'translateX(-100%)'}; /* שינוי translateX */
    z-index: 1000;
    box-shadow: 2px 0px 10px rgba(0, 0, 0, 0.2); /* שינוי הצללה כדי שתהיה בצד שמאל */
  }
`;

const Burger = styled.div`
  display: none;
  flex-direction: column;
  cursor: pointer;
  z-index: 1100; // Ensure it stays above the navbar

  span {
    background: white;
    height: 3px;
    width: 25px;
    margin: 3px;
    transition: all 0.3s ease-in-out;
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
          <Link href="/" onClick={() => setOpen(false)}>
            בית
          </Link>
          <Link href="/recipes" onClick={() => setOpen(false)}>
            כל המתכונים
          </Link>
          <Link href="/upload" onClick={() => setOpen(false)}>
            העלאת מתכון
          </Link>
        </NavLinks>
      </NavContainer>
      <Burger onClick={() => setOpen(!open)}>
        <span
          style={{ transform: open ? 'rotate(45deg) translate(5px, 5px)' : 'none' }}
        ></span>
        <span style={{ opacity: open ? 0 : 1 }}></span>
        <span
          style={{ transform: open ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }}
        ></span>
      </Burger>
      <Placeholder />
    </Navbar>
  );
};

export default Header;
