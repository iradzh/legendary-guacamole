"use client";

import { useState } from 'react';
import styled from 'styled-components';
import { VocabularyCard } from '@/types/vocabulary';

export interface FlashCardProps {
  card: VocabularyCard;
  onLearned: (cardId: string) => void;
  onRepeat: (cardId: string) => void;
  totalRemaining: number;
}

const GrayRgb = styled.div`
  --gray-rgb: 0, 0, 0;

  @media (prefers-color-scheme: dark) {
    --gray-rgb: 255, 255, 255;
  }
`;

const CardContainer = styled.div`
  perspective: 1000px;
  width: 100%;
  max-width: 380px;
  height: 260px;
  margin: 0 auto;

  @media (max-width: 600px) {
    height: 240px;
  }
`;

const CardInner = styled.div<{ $isFlipped: boolean }>`
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  cursor: pointer;
  transform: ${props => props.$isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'};
`;

const CardFace = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  background: var(--background);
  border: 1px solid rgba(var(--gray-rgb), 0.1);

  @media (prefers-color-scheme: dark) {
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 600px) {
    padding: 24px;
  }
`;

const CardFront = styled(CardFace)`
  background: var(--foreground);
  color: var(--background);
  border: none;
`;

const CardBack = styled(CardFace)`
  transform: rotateY(180deg);
`;

const GermanWord = styled.h2`
  font-size: 32px;
  font-weight: 700;
  margin: 0 0 12px 0;
  letter-spacing: -0.02em;

  @media (max-width: 600px) {
    font-size: 28px;
  }
`;

const ClickHint = styled.p`
  font-size: 12px;
  opacity: 0.9;
  margin-top: 12px;
  font-style: italic;
`;

const EnglishTranslation = styled.h3`
  font-size: 22px;
  font-weight: 600;
  margin: 0 0 16px 0;
  color: var(--foreground);

  @media (max-width: 600px) {
    font-size: 18px;
    margin-bottom: 12px;
  }
`;

const ExampleSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  text-align: center;
`;

const ExampleText = styled.p`
  font-size: 14px;
  line-height: 1.5;
  margin: 0;
  color: var(--foreground);
  opacity: 0.9;

  @media (max-width: 600px) {
    font-size: 13px;
  }
`;

const ExampleTranslationText = styled.p`
  font-size: 12px;
  line-height: 1.5;
  margin: 0;
  color: var(--foreground);
  opacity: 0.6;
  font-style: italic;

  @media (max-width: 600px) {
    font-size: 11px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 20px;
  justify-content: center;

  @media (max-width: 600px) {
    flex-direction: column;
    width: 100%;
    max-width: 280px;
  }
`;

const Button = styled.button<{ $variant: 'learned' | 'repeat' }>`
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 500;
  border-radius: 128px;
  border: 1px solid transparent;
  cursor: pointer;
  transition: background 0.2s, color 0.2s, border-color 0.2s;
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-geist-sans);
  
  ${props => props.$variant === 'learned' && `
    background: var(--foreground);
    color: var(--background);
    
    &:hover {
      opacity: 0.8;
    }
  `}
  
  ${props => props.$variant === 'repeat' && `
    background: transparent;
    color: var(--foreground);
    border-color: rgba(var(--gray-rgb), 0.2);
    
    &:hover {
      background: rgba(var(--gray-rgb), 0.05);
    }
  `}
  
  &:active {
    transform: scale(0.98);
  }

  @media (max-width: 600px) {
    width: 100%;
    justify-content: center;
  }
`;

const ProgressIndicator = styled.div`
  margin-bottom: 16px;
  font-size: 13px;
  color: rgba(var(--gray-rgb), 0.5);
  font-weight: 400;
  letter-spacing: -0.01em;
`;

export const FlashCard = ({ card, onLearned, onRepeat, totalRemaining }: FlashCardProps): React.ReactElement => {
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  const handleCardClick = (): void => {
    setIsFlipped(!isFlipped);
  };

  const handleLearned = (e: React.MouseEvent): void => {
    e.stopPropagation();
    setIsFlipped(false);
    setTimeout(() => onLearned(card.id), 300);
  };

  const handleRepeat = (e: React.MouseEvent): void => {
    e.stopPropagation();
    setIsFlipped(false);
    setTimeout(() => onRepeat(card.id), 300);
  };

  return (
    <GrayRgb>
      <ProgressIndicator>
        {totalRemaining} {totalRemaining === 1 ? 'card' : 'cards'} remaining
      </ProgressIndicator>
      
      <CardContainer>
        <CardInner $isFlipped={isFlipped} onClick={handleCardClick}>
          <CardFront>
            <GermanWord>{card.german}</GermanWord>
            <ClickHint>Click to reveal</ClickHint>
          </CardFront>
          
          <CardBack>
            <EnglishTranslation>{card.english}</EnglishTranslation>
            <ExampleSection>
              <ExampleText>{card.example}</ExampleText>
              <ExampleTranslationText>{card.exampleTranslation}</ExampleTranslationText>
            </ExampleSection>
          </CardBack>
        </CardInner>
      </CardContainer>

      <ButtonContainer>
        <Button $variant="repeat" onClick={handleRepeat}>
          Repeat
        </Button>
        <Button $variant="learned" onClick={handleLearned}>
          Learned
        </Button>
      </ButtonContainer>
    </GrayRgb>
  );
};

