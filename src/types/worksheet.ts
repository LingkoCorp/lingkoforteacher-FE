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

export interface WorksheetData {
  situationTitle: string;
  situation: string;
  expressions: Expression[];
  vocabulary: VocabularyItem[];
  grammar_points: GrammarPoint[];
  worksheet_structure: Record<string, any>
}



