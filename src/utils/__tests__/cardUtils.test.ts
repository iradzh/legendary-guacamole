import { VocabularyCard } from '@/types/vocabulary';
import {
  shuffleArray,
  moveCardToEnd,
  removeCardById,
  calculateProgress,
  getSessionCards,
} from '../cardUtils';

const mockCards: VocabularyCard[] = [
  {
    id: '1',
    german: 'das Haus',
    english: 'the house',
    example: 'Das Haus ist groß.',
    exampleTranslation: 'The house is big.',
  },
  {
    id: '2',
    german: 'der Apfel',
    english: 'the apple',
    example: 'Der Apfel ist rot.',
    exampleTranslation: 'The apple is red.',
  },
  {
    id: '3',
    german: 'die Katze',
    english: 'the cat',
    example: 'Die Katze schläft.',
    exampleTranslation: 'The cat is sleeping.',
  },
];

describe('cardUtils', () => {
  describe('shuffleArray', () => {
    it('should return an array with the same length', () => {
      const result = shuffleArray(mockCards);
      expect(result).toHaveLength(mockCards.length);
    });

    it('should contain all the same elements', () => {
      const result = shuffleArray(mockCards);
      mockCards.forEach((card) => {
        expect(result).toContainEqual(card);
      });
    });

    it('should not modify the original array', () => {
      const original = [...mockCards];
      shuffleArray(mockCards);
      expect(mockCards).toEqual(original);
    });

    it('should handle empty arrays', () => {
      const result = shuffleArray([]);
      expect(result).toEqual([]);
    });

    it('should handle single-element arrays', () => {
      const singleCard = [mockCards[0]];
      const result = shuffleArray(singleCard);
      expect(result).toEqual(singleCard);
    });
  });

  describe('moveCardToEnd', () => {
    it('should move the card at the given index to the end', () => {
      const result = moveCardToEnd(mockCards, 0);
      expect(result[result.length - 1]).toEqual(mockCards[0]);
      expect(result[0]).toEqual(mockCards[1]);
    });

    it('should not modify the original array', () => {
      const original = [...mockCards];
      moveCardToEnd(mockCards, 1);
      expect(mockCards).toEqual(original);
    });

    it('should return the same array if index is out of bounds', () => {
      const result = moveCardToEnd(mockCards, 10);
      expect(result).toEqual(mockCards);
    });

    it('should return the same array if index is negative', () => {
      const result = moveCardToEnd(mockCards, -1);
      expect(result).toEqual(mockCards);
    });

    it('should handle moving the last card', () => {
      const lastIndex = mockCards.length - 1;
      const result = moveCardToEnd(mockCards, lastIndex);
      expect(result[result.length - 1]).toEqual(mockCards[lastIndex]);
    });
  });

  describe('removeCardById', () => {
    it('should remove the card with the given ID', () => {
      const result = removeCardById(mockCards, '2');
      expect(result).toHaveLength(2);
      expect(result.find(card => card.id === '2')).toBeUndefined();
    });

    it('should not modify the original array', () => {
      const original = [...mockCards];
      removeCardById(mockCards, '1');
      expect(mockCards).toEqual(original);
    });

    it('should return the same array if ID is not found', () => {
      const result = removeCardById(mockCards, 'non-existent');
      expect(result).toHaveLength(mockCards.length);
    });

    it('should handle empty arrays', () => {
      const result = removeCardById([], '1');
      expect(result).toEqual([]);
    });
  });

  describe('calculateProgress', () => {
    it('should calculate progress correctly', () => {
      expect(calculateProgress(10, 5)).toBe(50);
      expect(calculateProgress(10, 0)).toBe(100);
      expect(calculateProgress(10, 10)).toBe(0);
    });

    it('should return 100 when total is 0', () => {
      expect(calculateProgress(0, 0)).toBe(100);
    });

    it('should round to nearest integer', () => {
      expect(calculateProgress(3, 1)).toBe(67);
    });
  });

  describe('getSessionCards', () => {
    it('should return the specified number of cards', () => {
      const result = getSessionCards(mockCards, 2);
      expect(result).toHaveLength(2);
    });

    it('should return cards from the beginning of the deck', () => {
      const result = getSessionCards(mockCards, 2);
      expect(result[0]).toEqual(mockCards[0]);
      expect(result[1]).toEqual(mockCards[1]);
    });

    it('should return the full deck if count exceeds deck length', () => {
      const result = getSessionCards(mockCards, 10);
      expect(result).toHaveLength(mockCards.length);
    });

    it('should not modify the original array', () => {
      const original = [...mockCards];
      getSessionCards(mockCards, 2);
      expect(mockCards).toEqual(original);
    });

    it('should handle zero count', () => {
      const result = getSessionCards(mockCards, 0);
      expect(result).toEqual([]);
    });
  });
});

