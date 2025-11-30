import { GoogleGenerativeAI } from "@google/generative-ai";

// Nationality to language mapping for translations
export const NATIONALITY_LANGUAGE_MAP: Record<string, string> = {
  ar: "Arabic",
  bg: "Bulgarian",
  cs: "Czech",
  da: "Danish",
  de: "German",
  el: "Greek",
  en: "English",
  es: "Spanish",
  fi: "Finnish",
  tl: "Filipino (Tagalog)",
  fr: "French",
  hi: "Hindi",
  hr: "Croatian",
  hu: "Hungarian",
  id: "Indonesian",
  it: "Italian",
  ja: "Japanese",
  ko: "Korean",
  ms: "Malay",
  nl: "Dutch",
  no: "Norwegian",
  pl: "Polish",
  pt: "Portuguese",
  ro: "Romanian",
  ru: "Russian",
  sk: "Slovak",
  sv: "Swedish",
  tr: "Turkish",
  uk: "Ukrainian",
  vi: "Vietnamese",
  zh: "Chinese",
};

// Difficulty level descriptions
const LEVEL_DESCRIPTIONS: Record<string, string> = {
  beginner: "basic vocabulary and simple sentence structures (TOPIK 1-2 level)",
  intermediate: "intermediate vocabulary and varied grammar patterns (TOPIK 3-4 level)",
  advanced: "advanced vocabulary and complex expressions (TOPIK 5-6 level)",
};

function getTranslationLanguage(nationality: string): string {
  return NATIONALITY_LANGUAGE_MAP[nationality.toLowerCase()] || "English";
}

function buildGeminiPrompt(
  level: string,
  nationality: string,
  goal: string,
  extraNote?: string
): string {
  const translationLang = getTranslationLanguage(nationality);
  const levelDesc = LEVEL_DESCRIPTIONS[level] || LEVEL_DESCRIPTIONS["beginner"];

  return `You are a professional Korean language tutor creating educational content.

**Task**: Generate Korean language learning content for ${level} learners from ${nationality}.

**Learning Goal**: ${goal}

**Learner Level**: ${level} (${levelDesc})

**Translation Language**: ${translationLang}

${extraNote ? `**Additional Requirements**: ${extraNote}` : ""}

**IMPORTANT**: Generate EXACTLY in this JSON format (minified, no extra whitespace):

{
  "situationTitle": "A short Korean title (max 20 characters) summarizing the situation",
  "situation": "A detailed situation description in Korean (2-3 sentences) that sets the context for the learning goal",
  "expressions": [
    {"korean": "Korean expression", "romanization": "romanized pronunciation", "translation": "${translationLang} translation"},
    // Generate at least 10 expressions (common phrases used in this situation)
  ],
  "vocabulary": [
    {"korean": "Korean word", "romanization": "romanized pronunciation", "translation": "${translationLang} translation"},
    // Generate at least 20 vocabulary words (nouns, verbs, adjectives relevant to the situation)
  ],
  "grammar_points": [
    {
      "korean": "Grammar pattern (e.g., -(으)ㄹ 수 있다)",
      "romanization": "romanized form",
      "translation": "${translationLang} explanation of grammar usage",
      "example": "Korean example sentence using this grammar",
      "example_romanization": "romanized pronunciation of the example sentence",
      "example_translation": "${translationLang} translation of the example sentence"
    },
    // Generate at least 5 grammar points (appropriate for ${level} level)
  ]
}

**Content Requirements**:
0. Situation Title: One short Korean phrase (max 20 characters) summarizing the situation
1. Situation: Contextual description relevant to "${goal}"
2. Expressions: At least 10 practical phrases for the situation
3. Vocabulary: At least 20 words (mix of nouns, verbs, adjectives)
4. Grammar: At least 5 grammar patterns with examples
   - Each grammar point must include:
     - Korean pattern
     - Romanization of pattern
     - ${translationLang} explanation of usage
     - Korean example sentence
     - Romanization of example sentence
     - ${translationLang} translation of example sentence
5. All Korean text must be natural and authentic
6. Romanization must use standard Korean romanization
7. Difficulty must match ${level} level
8. Focus on practical, real-world usage

**Output**: Return ONLY the JSON object, no additional text.`;
}

export interface WorksheetContent {
  situationTitle: string;
  situation: string;
  expressions: Array<{
    korean: string;
    romanization: string;
    translation: string;
  }>;
  vocabulary: Array<{
    korean: string;
    romanization: string;
    translation: string;
  }>;
  grammar_points: Array<{
    korean: string;
    romanization: string;
    translation: string;
    example: string;
    example_romanization: string;  
    example_translation: string; 
  }>;
}

export async function generateWorksheetContent(
  level: string,
  nationality: string,
  goal: string,
  extraNote?: string
): Promise<WorksheetContent> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured");
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
    generationConfig: {
      responseMimeType: "application/json",
      temperature: 0.7,
      topP: 0.9,
      maxOutputTokens: 4096,
    },
  });

  const prompt = buildGeminiPrompt(level, nationality, goal, extraNote);

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  const content: WorksheetContent = JSON.parse(text);

  // Validate minimum content requirements
  if (content.expressions.length < 10) {
    throw new Error(`Insufficient expressions: ${content.expressions.length} < 10`);
  }
  if (content.vocabulary.length < 20) {
    throw new Error(`Insufficient vocabulary: ${content.vocabulary.length} < 20`);
  }
  if (content.grammar_points.length < 5) {
    throw new Error(`Insufficient grammar points: ${content.grammar_points.length} < 5`);
  }

  return content;
}
