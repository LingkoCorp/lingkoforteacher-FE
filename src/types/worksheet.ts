export interface FillInBlank {
  question: string;
  answer: string;
}

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
  example_romanization: string;
  example_translation: string;
  exercise: FillInBlank;
}

export interface WorksheetData {
  situationTitle: string;
  situation: string;
  expressions: Expression[];
  vocabulary: VocabularyItem[];
  grammar_points: GrammarPoint[];
  worksheet_structure: Record<string, any>
}



