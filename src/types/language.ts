export type LanguageCode =
  | "ar" // Arabic
  | "bg" // Bulgarian
  | "cs" // Czech
  | "da" // Danish
  | "de" // German
  | "el" // Greek
  | "en" // English
  | "es" // Spanish
  | "fi" // Finnish
  | "tl" // Filipino (Tagalog)
  | "fr" // French
  | "hi" // Hindi
  | "hr" // Croatian
  | "hu" // Hungarian
  | "id" // Indonesian
  | "it" // Italian
  | "ja" // Japanese
  | "ko" // Korean
  | "ms" // Malay
  | "nl" // Dutch
  | "no" // Norwegian
  | "pl" // Polish
  | "pt" // Portuguese
  | "ro" // Romanian
  | "ru" // Russian
  | "sk" // Slovak
  | "sv" // Swedish
  | "tr" // Turkish
  | "uk" // Ukrainian
  | "vi" // Vietnamese
  | "zh"; // Chinese


export interface LanguageInfo {
  countryCode: string;           // KR
  language: string;       // Korean
  languageOrigin: string; // 대한민국
  languageCode: LanguageCode; // "ko"
}