"use client";

import styled from "styled-components";
import { LearningSession } from "@/components/LearningSession";
import { germanVocabulary } from "@/data/germanVocabulary";

const Container = styled.div`
  --gray-rgb: 0, 0, 0;

  display: flex;
  align-items: flex-start;
  justify-content: center;
  min-height: calc(100vh - 81px);
  padding: 60px 20px 40px;
  font-family: var(--font-geist-sans);

  @media (prefers-color-scheme: dark) {
    --gray-rgb: 255, 255, 255;
  }

  @media (max-width: 600px) {
    padding: 40px 16px 24px;
  }
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  text-align: center;
  width: 100%;
  max-width: 500px;
`;

export default function CardsPage(): React.ReactElement {
  return (
    <Container>
      <Main>
        <LearningSession initialDeck={germanVocabulary} />
      </Main>
    </Container>
  );
}

