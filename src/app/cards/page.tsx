"use client";

import styled from "styled-components";

const Container = styled.div`
  min-height: 100vh;
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem 0;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: #666;
  max-width: 600px;
  margin: 0 auto;

  @media (prefers-color-scheme: dark) {
    color: #aaa;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
  padding: 1rem 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

export default function CardsPage(): React.ReactElement {
  return (
    <Container>
      <Header>
        <Title>Card Gallery</Title>
        <Subtitle>
          Explore our collection of resources and tools
        </Subtitle>
      </Header>
      
      <Grid>
        {/* Cards will be added here */}
      </Grid>
    </Container>
  );
}

