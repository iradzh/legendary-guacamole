"use client";

import styled from "styled-components";

const Container = styled.div`
  --gray-rgb: 0, 0, 0;
  --gray-alpha-200: rgba(var(--gray-rgb), 0.08);
  --gray-alpha-100: rgba(var(--gray-rgb), 0.05);

  display: grid;
  grid-template-rows: 20px 1fr 20px;
  align-items: center;
  justify-items: center;
  min-height: 100vh;
  padding: 80px;
  gap: 64px;
  font-family: var(--font-geist-sans);

  @media (prefers-color-scheme: dark) {
    --gray-rgb: 255, 255, 255;
    --gray-alpha-200: rgba(var(--gray-rgb), 0.145);
    --gray-alpha-100: rgba(var(--gray-rgb), 0.06);
  }

  @media (max-width: 600px) {
    padding: 32px;
    padding-bottom: 80px;
  }
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  gap: 32px;
  grid-row-start: 2;
  align-items: center;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 48px;
  font-weight: 600;
  color: var(--foreground);
  margin: 0;
  letter-spacing: -0.02em;

  @media (max-width: 600px) {
    font-size: 32px;
  }
`;

const Subtitle = styled.p`
  font-family: var(--font-geist-mono);
  font-size: 14px;
  line-height: 24px;
  letter-spacing: -0.01em;
  color: var(--foreground);
  opacity: 0.7;
  max-width: 600px;
  margin: 0;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
  width: 100%;
  max-width: 1200px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

export default function CardsPage(): React.ReactElement {
  return (
    <Container>
      <Main>
        <Title>Card Gallery</Title>
        <Subtitle>
          Explore our collection of resources and tools
        </Subtitle>
        
        <Grid>
          {/* Cards will be added here */}
        </Grid>
      </Main>
    </Container>
  );
}

