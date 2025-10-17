import { VocabularyCard } from '@/types/vocabulary';

/**
 * Shuffles an array using the Fisher-Yates algorithm
 * @param array - The array to shuffle
 * @returns A new shuffled array
 */
export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Moves a card from the current position to the end of the deck
 * @param deck - The current deck of cards
 * @param index - The index of the card to move
 * @returns A new deck with the card moved to the end
 */
export const moveCardToEnd = (deck: VocabularyCard[], index: number): VocabularyCard[] => {
  if (index < 0 || index >= deck.length) {
    return deck;
  }
  
  const newDeck = [...deck];
  const [card] = newDeck.splice(index, 1);
  newDeck.push(card);
  return newDeck;
};

/**
 * Removes a card from the deck by ID
 * @param deck - The current deck of cards
 * @param cardId - The ID of the card to remove
 * @returns A new deck without the specified card
 */
export const removeCardById = (deck: VocabularyCard[], cardId: string): VocabularyCard[] => {
  return deck.filter(card => card.id !== cardId);
};

/**
 * Calculates the learning progress as a percentage
 * @param totalCards - The total number of cards in the session
 * @param remainingCards - The number of cards remaining to learn
 * @returns The progress percentage (0-100)
 */
export const calculateProgress = (totalCards: number, remainingCards: number): number => {
  if (totalCards === 0) return 100;
  return Math.round(((totalCards - remainingCards) / totalCards) * 100);
};

/**
 * Gets a subset of cards from the deck for a study session
 * @param deck - The full deck of cards
 * @param count - The number of cards to select
 * @returns A new array with the specified number of cards
 */
export const getSessionCards = (deck: VocabularyCard[], count: number): VocabularyCard[] => {
  if (count >= deck.length) {
    return [...deck];
  }
  return deck.slice(0, count);
};

