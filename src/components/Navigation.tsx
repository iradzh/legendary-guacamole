"use client";

import Link from "next/link";
import styled from "styled-components";

const Nav = styled.nav`
  --gray-rgb: 0, 0, 0;
  --gray-alpha-200: rgba(var(--gray-rgb), 0.08);
  
  border-bottom: 1px solid var(--gray-alpha-200);
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--background);
  font-family: var(--font-geist-sans);

  @media (prefers-color-scheme: dark) {
    --gray-rgb: 255, 255, 255;
    --gray-alpha-200: rgba(var(--gray-rgb), 0.145);
  }
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 600px) {
    padding: 16px 32px;
  }
`;

const Logo = styled(Link)`
  font-size: 16px;
  font-weight: 600;
  color: var(--foreground);
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.7;
  }
`;

const NavList = styled.ul`
  display: flex;
  gap: 24px;
  list-style: none;
`;

const NavLink = styled(Link)`
  font-size: 14px;
  font-weight: 500;
  color: var(--foreground);
  transition: opacity 0.2s;
  padding: 8px 16px;
  border-radius: 128px;
  border: 1px solid transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      opacity: 0.7;
    }
  }
`;

export default function Navigation(): React.ReactElement {
  return (
    <Nav>
      <Container>
        <Logo href="/">900</Logo>
        <NavList>
          <li>
            <NavLink href="/">Home</NavLink>
          </li>
          <li>
            <NavLink href="/cards">Cards</NavLink>
          </li>
        </NavList>
      </Container>
    </Nav>
  );
}

