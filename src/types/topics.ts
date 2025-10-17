export type LanguageLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1';

export interface Topic {
  id: string;
  level: LanguageLevel;
  levelEmoji: string;
  title: string;
  text: string;
  vocabulary: string[];
}

