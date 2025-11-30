import { WorksheetContent } from "./gemini";

interface MatchingExercise {
  korean: string[];
  translations: string[];
  answers: number[];
}

interface FillInBlank {
  question: string;
  answer: string;
}

interface GrammarPracticeItem {
  pattern: string;
  romanization: string;
  explanation: string;
  example: string;
  example_romanization: string;
  example_translation: string;
  exercise: FillInBlank;
}

interface Section {
  type: string;
  title: string;
  content?: string;
  items?: unknown[];
  instruction?: string;
  exercise?: MatchingExercise;
}

interface PageSection {
  page: number;
  sections: Section[];
}

export interface WorksheetStructure {
  title: string;
  situation: string;
  sections: PageSection[];
}

function generateTitle(situation: string): string {
  const words = situation.split(" ");
  if (words.length > 5) {
    return words.slice(0, 5).join(" ") + "...";
  }
  return situation.length > 30 ? situation.slice(0, 30) + "..." : situation;
}

function createMatchingExercise(
  items: Array<{ korean: string; translation: string }>,
  count: number = 6
): MatchingExercise {
  const selected = items.slice(0, Math.min(count, items.length));

  const koreanList = selected.map((item) => item.korean);
  const translationList = selected.map((item) => item.translation);

  // Shuffle translations
  const shuffledTranslations = [...translationList].sort(() => Math.random() - 0.5);

  return {
    korean: koreanList,
    translations: shuffledTranslations,
    answers: translationList.map((t) => shuffledTranslations.indexOf(t) + 1),
  };
}

function createFillInBlank(exampleSentence: string): FillInBlank {
  const words = exampleSentence.split(" ");
  if (words.length > 2) {
    const blankWord = words[words.length - 1];
    const question = words.slice(0, -1).join(" ") + " _____?";
    return {
      question,
      answer: blankWord,
    };
  }
  return {
    question: exampleSentence + " _____?",
    answer: "(답안)",
  };
}

export function transformToWorksheetStructure(
  content: WorksheetContent
): WorksheetStructure {
  const { situationTitle, situation, expressions, vocabulary, grammar_points } = content;

  const title = generateTitle(situation);

  // Page 1: Situation + Key Expressions
  const keyExpressionsSection: Section = {
    type: "key_expressions",
    title: "주요 표현 (Key Expressions)",
    items: expressions.slice(0, 8),
  };

  // Page 2: Vocabulary + Matching Practice
  const vocabularySection: Section = {
    type: "vocabulary_reference",
    title: "어휘 (Vocabulary)",
    items: vocabulary.slice(0, 15),
  };

  const vocabularyPractice: Section = {
    type: "matching_exercise",
    title: "어휘 연습 (Vocabulary Practice)",
    instruction: "한국어와 의미를 연결하세요 (Match Korean with meanings)",
    exercise: createMatchingExercise(vocabulary, 8),
  };

  // Page 3: Expression Practice
  const expressionPractice: Section = {
    type: "matching_exercise",
    title: "표현 연습 (Expression Practice)",
    instruction: "표현과 의미를 연결하세요 (Match expressions with meanings)",
    exercise: createMatchingExercise(expressions, 6),
  };

  // Page 4: Grammar Practice
  const grammarPracticeItems: GrammarPracticeItem[] = grammar_points.map((gp) => ({
    pattern: gp.korean,
    romanization: gp.romanization,
    explanation: gp.translation,
    example: gp.example,
    example_romanization: gp.example_romanization,
    example_translation: gp.example_translation,
    exercise: createFillInBlank(gp.example),
  }));

  const grammarPractice: Section = {
    type: "grammar_practice",
    title: "문법 연습 (Grammar Practice)",
    items: grammarPracticeItems,
  };

  return {
    title,
    situation,
    sections: [
      {
        page: 1,
        sections: [
          { type: "situation", title: "상황 (Situation)", content: situation },
          keyExpressionsSection,
        ],
      },
      {
        page: 2,
        sections: [vocabularySection, vocabularyPractice],
      },
      {
        page: 3,
        sections: [expressionPractice],
      },
      {
        page: 4,
        sections: [grammarPractice],
      },
    ],
  };
}
