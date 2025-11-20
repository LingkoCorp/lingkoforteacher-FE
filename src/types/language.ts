export type LanguageCode = "ko" | "en" | "ja";

export interface LanguageInfo {
  countryCode: string;           // KR
  language: string;       // Korean
  languageOrigin: string; // 대한민국
  languageCode: LanguageCode; // "ko"
}