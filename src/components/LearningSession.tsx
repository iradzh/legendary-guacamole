"use client";

import { useState, useCallback } from 'react';
import styled from 'styled-components';
import { VocabularyCard } from '@/types/vocabulary';
import { FlashCard } from './FlashCard';

export interface LearningSessionProps {
  initialDeck: VocabularyCard[];
}

const SessionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
`;

const CompletionMessage = styled.div`
  text-align: center;
  padding: 48px 32px;
  border-radius: 16px;
  background: var(--foreground);
  color: var(--background);
  max-width: 420px;
  margin: 0 auto;
`;

const CompletionTitle = styled.h2`
  font-size: 40px;
  margin: 0 0 16px 0;
  font-weight: 700;
  letter-spacing: -0.03em;

  @media (max-width: 600px) {
    font-size: 32px;
  }
`;

const CompletionText = styled.p`
  font-size: 16px;
  line-height: 1.6;
  margin: 0 0 32px 0;
  opacity: 0.9;
  letter-spacing: -0.01em;

  @media (max-width: 600px) {
    font-size: 14px;
  }
`;

const RestartButton = styled.button`
  padding: 12px 28px;
  font-size: 14px;
  font-weight: 500;
  border-radius: 128px;
  border: 1px solid currentColor;
  background: transparent;
  color: var(--background);
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  font-family: var(--font-geist-sans);

  &:hover {
    background: var(--background);
    color: var(--foreground);
  }

  &:active {
    transform: scale(0.98);
  }
`;

const StatsContainer = styled.div`
  --gray-rgb: 0, 0, 0;

  display: flex;
  gap: 32px;
  margin-top: 12px;
  padding: 20px 32px;
  background: var(--background);
  border-radius: 12px;
  border: 1px solid rgba(var(--gray-rgb), 0.1);

  @media (prefers-color-scheme: dark) {
    --gray-rgb: 255, 255, 255;
  }

  @media (max-width: 600px) {
    flex-direction: row;
    gap: 24px;
    padding: 16px 24px;
  }
`;

const StatItem = styled.div`
  text-align: center;
  flex: 1;
`;

const StatValue = styled.div`
  font-size: 28px;
  font-weight: 600;
  color: var(--foreground);
  margin-bottom: 4px;
  letter-spacing: -0.02em;
`;

const StatLabel = styled.div`
  font-size: 13px;
  color: rgba(var(--gray-rgb), 0.5);
  font-weight: 400;
  letter-spacing: -0.01em;
`;

export const LearningSession = ({ initialDeck }: LearningSessionProps): React.ReactElement => {
  const [deck, setDeck] = useState<VocabularyCard[]>(initialDeck);
  const [learnedCards, setLearnedCards] = useState<VocabularyCard[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const handleLearned = useCallback((cardId: string): void => {
    const currentCard = deck[currentIndex];
    if (currentCard.id === cardId) {
      // Add to learned cards
      setLearnedCards(prev => [...prev, currentCard]);
      
      // Remove from deck
      const newDeck = deck.filter(card => card.id !== cardId);
      setDeck(newDeck);
      
      // Keep the same index (which will now show the next card)
      // But if we're at the end, go back to 0
      if (currentIndex >= newDeck.length && newDeck.length > 0) {
        setCurrentIndex(0);
      }
    }
  }, [deck, currentIndex]);

  const handleRepeat = useCallback((cardId: string): void => {
    const currentCard = deck[currentIndex];
    if (currentCard.id === cardId) {
      // Move card to end of deck
      const newDeck = [...deck];
      newDeck.splice(currentIndex, 1);
      newDeck.push(currentCard);
      setDeck(newDeck);
      
      // Keep the same index (which will now show the next card)
      // But if we're at the end, go back to 0
      if (currentIndex >= newDeck.length && newDeck.length > 0) {
        setCurrentIndex(0);
      }
    }
  }, [deck, currentIndex]);

  const handleRestart = (): void => {
    setDeck([...initialDeck, ...learnedCards]);
    setLearnedCards([]);
    setCurrentIndex(0);
  };

  if (deck.length === 0) {
    return (
      <CompletionMessage>
        <CompletionTitle>🎉 Congratulations!</CompletionTitle>
        <CompletionText>
          You&apos;ve completed this learning session!
          <br />
          You mastered {learnedCards.length} {learnedCards.length === 1 ? 'word' : 'words'}.
        </CompletionText>
        <RestartButton onClick={handleRestart}>
          Start New Session
        </RestartButton>
      </CompletionMessage>
    );
  }

  const currentCard = deck[currentIndex];

  return (
    <SessionContainer>
      <FlashCard
        card={currentCard}
        onLearned={handleLearned}
        onRepeat={handleRepeat}
        totalRemaining={deck.length}
      />
      
      <StatsContainer>
        <StatItem>
          <StatValue>{deck.length}</StatValue>
          <StatLabel>To Learn</StatLabel>
        </StatItem>
        <StatItem>
          <StatValue>{learnedCards.length}</StatValue>
          <StatLabel>Mastered</StatLabel>
        </StatItem>
      </StatsContainer>
    </SessionContainer>
  );
};

