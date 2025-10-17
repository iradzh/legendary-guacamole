"use client";

import styled from "styled-components";
import { Topic, LanguageLevel } from "@/types/topics";

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const LevelToggle = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-bottom: 48px;
  flex-wrap: wrap;
`;

const LevelButton = styled.button<{ $isActive: boolean }>`
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 12px;
  border: 2px solid ${props => props.$isActive ? 'var(--foreground)' : 'rgba(128, 128, 128, 0.3)'};
  background: ${props => props.$isActive ? 'var(--foreground)' : 'transparent'};
  color: ${props => props.$isActive ? 'var(--background)' : 'var(--foreground)'};
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;

  &:hover {
    opacity: 0.8;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const TopicCard = styled.article`
  background: var(--background);
  border: 1px solid rgba(128, 128, 128, 0.2);
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  @media (prefers-color-scheme: dark) {
    border-color: rgba(255, 255, 255, 0.1);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 600px) {
    padding: 24px;
  }
`;

const TopicHeader = styled.div`
  margin-bottom: 24px;
`;

const TopicTitle = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: var(--foreground);
  margin-bottom: 8px;

  @media (max-width: 600px) {
    font-size: 24px;
  }
`;

const TopicLevel = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: rgba(128, 128, 128, 0.7);
`;

const TopicText = styled.p`
  font-size: 18px;
  line-height: 1.8;
  color: var(--foreground);
  margin-bottom: 32px;
  text-align: justify;

  @media (max-width: 600px) {
    font-size: 16px;
    line-height: 1.7;
  }
`;

const VocabularySection = styled.div`
  margin-top: 32px;
  padding-top: 32px;
  border-top: 1px solid rgba(128, 128, 128, 0.2);
`;

const VocabularyTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: var(--foreground);
  margin-bottom: 16px;
`;

const VocabularyList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const VocabularyTag = styled.span`
  padding: 8px 16px;
  background: rgba(128, 128, 128, 0.1);
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  color: var(--foreground);

  @media (prefers-color-scheme: dark) {
    background: rgba(255, 255, 255, 0.1);
  }
`;

export interface TopicViewerProps {
  topics: Topic[];
  selectedLevel: LanguageLevel;
  onLevelChange: (level: LanguageLevel) => void;
}

const levels: LanguageLevel[] = ['A1', 'A2', 'B1', 'B2', 'C1'];

export default function TopicViewer({ 
  topics, 
  selectedLevel, 
  onLevelChange 
}: TopicViewerProps): React.ReactElement {
  const currentTopic = topics.find(topic => topic.level === selectedLevel);

  return (
    <Container>
      <LevelToggle>
        {levels.map(level => {
          const topic = topics.find(t => t.level === level);
          return (
            <LevelButton
              key={level}
              $isActive={selectedLevel === level}
              onClick={() => onLevelChange(level)}
            >
              {topic?.levelEmoji} {level}
            </LevelButton>
          );
        })}
      </LevelToggle>

      {currentTopic && (
        <TopicCard>
          <TopicHeader>
            <TopicTitle>
              {currentTopic.levelEmoji} {currentTopic.title}
            </TopicTitle>
            <TopicLevel>{currentTopic.level}</TopicLevel>
          </TopicHeader>

          <TopicText>{currentTopic.text}</TopicText>

          <VocabularySection>
            <VocabularyTitle>🧩 Vokabeln</VocabularyTitle>
            <VocabularyList>
              {currentTopic.vocabulary.map((word, index) => (
                <VocabularyTag key={index}>{word}</VocabularyTag>
              ))}
            </VocabularyList>
          </VocabularySection>
        </TopicCard>
      )}
    </Container>
  );
}

