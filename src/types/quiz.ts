import { LanguageCode } from "./language";

export interface Expression {
  korean: string;
  romanization: string;
  translation: string;
}

export interface VocabularyItem {
  korean: string;
  romanization: string;
  translation: string;
}

export interface GrammarPoint {
  korean: string;
  romanization: string;
  translation: string;
  example: string;
}

export interface QuizData {
  situation: string;
  expressions: Expression[];
  vocabulary: VocabularyItem[];
  grammar_points: GrammarPoint[];
}

// api Request
export interface QuizRequest{
  languageCode: LanguageCode;
  level: string; // 난이도
  learningSituation: string // 학습 상황
}

// api Response
export interface QuizResponse extends QuizData {}


