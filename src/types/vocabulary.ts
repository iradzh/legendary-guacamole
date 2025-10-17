export interface VocabularyCard {
  id: string;
  german: string;
  english: string;
  example: string;
  exampleTranslation: string;
}

export interface LearningSessionState {
  deck: VocabularyCard[];
  currentIndex: number;
  learnedCards: VocabularyCard[];
}

export type CardAction = 'learned' | 'repeat';

