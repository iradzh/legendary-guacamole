"use client";

import styled from "styled-components";

const Page = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 20px;
  font-family: var(--font-geist-sans);
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding-top: 101px;

  --gray-rgb: 0, 0, 0;

  @media (prefers-color-scheme: dark) {
    --gray-rgb: 255, 255, 255;
  }

  @media (max-width: 600px) {
    padding-top: 93px;
  }

  @media (max-width: 768px) {
    padding-left: 16px;
    padding-right: 16px;
  }
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 1200px;
`;

const Hero = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  text-align: center;

  @media (max-width: 768px) {
    gap: 16px;
  }
`;

const BigNumber = styled.h2`
  font-size: clamp(96px, 15vw, 192px);
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.04em;
  margin: 0;
  background: linear-gradient(
    to bottom,
    var(--foreground),
    var(--foreground) 50%,
    rgba(var(--gray-rgb), 0.6) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Caption = styled.p`
  font-size: clamp(16px, 2.5vw, 20px);
  line-height: 1.6;
  letter-spacing: -0.01em;
  max-width: 600px;
  color: rgba(var(--gray-rgb), 0.7);
  margin: 0;
  font-weight: 400;
`;

export default function Home() {
  return (
    <Page>
      <Main>
        <Hero>
          <BigNumber>≈ 900 h</BigNumber>
          <Caption>
            That&apos;s how long it takes to speak, dream, and argue in German. Ready to begin?
          </Caption>
        </Hero>
      </Main>
    </Page>
  );
}
