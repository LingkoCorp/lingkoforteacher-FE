"use client";

import { LANGUAGES } from "@/shared/constants/languages";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";
import { Level, LEVELS } from "@/types/enums";
import { LanguageCode } from "@/types/language";
import { useState } from "react";
import ReactCountryFlag from "react-country-flag";

export interface WorksheetFormValues {
  level: Level;
  languageCode: string;
  goal: string;
  extraNote?: string;
}

interface WorksheetFormProps {
  onSubmit: (data: WorksheetFormValues) => void;
}

export function WorksheetForm({ onSubmit }: WorksheetFormProps) {
  // UI에서 Select가 쓰는 유니크 value
  const [languageUiValue, setLanguageUiValue] = useState<string>("");

  // 실제로 앱이 쓰는 canonical languageCode (ko/en/pt...)
  const [languageCode, setLanguageCode] = useState<LanguageCode | "">("");

  const [level, setLevel] = useState<Level>("intermediate");
  const [goal, setGoal] = useState("");
  const [extraNote, setExtraNote] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!languageCode || !goal) return;

    onSubmit({ level: level, languageCode, goal, extraNote: extraNote });
  };

  const UNIQUE_LANGUAGES = Array.from(
    new Map(
      LANGUAGES.map((l) => [`${l.countryCode}-${l.languageCode}`, l])
    ).values()
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Country Section */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-3">
          국적
        </label>

        <Select
          value={languageUiValue}
          onValueChange={(uiValue) => {
            setLanguageUiValue(uiValue);
            const code = uiValue.split("-")[1] as LanguageCode; // "BR-pt" -> "pt"
            setLanguageCode(code);
          }}
        >
          <SelectTrigger className="input-field w-full">
            <SelectValue placeholder="학습자의 국적을 선택하세요" />
          </SelectTrigger>

          <SelectContent>
            {UNIQUE_LANGUAGES.map((lang) => {
              const uiValue = `${lang.countryCode}-${lang.languageCode}`; 
              return (
                <SelectItem key={uiValue} value={uiValue}>
                  <div className="flex items-center gap-2">
                    <ReactCountryFlag
                      countryCode={lang.countryCode}
                      svg
                      style={{ width: "1.2em", height: "1.2em" }}
                    />
                    <span>
                      {lang.languageOrigin} ({lang.language})
                    </span>
                  </div>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>

      {/* Difficulty Section */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-3">
          난이도
        </label>
        <div className="flex gap-3">
          {LEVELS.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setLevel(item)}
              className={`flex-1 py-3 rounded-lg font-medium transition-all ${
                level === item
                  ? "bg-primary text-primary-foreground border-2 border-primary"
                  : "bg-background text-foreground border-2 border-border hover:border-primary"
              }`}
            >
              {item === "beginner"
                ? "쉬움"
                : item === "intermediate"
                ? "보통"
                : "어려움"}
            </button>
          ))}
        </div>
      </div>

      {/* Situation Section */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-3">
          학습할 상황
        </label>
        <textarea
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder="만들고 싶은 학습지의 상황을 자세히 입력해주세요."
          className="input-field min-h-24 resize-none"
          required
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-primary text-primary-foreground py-4 rounded-lg font-semibold text-lg hover:bg-primary/90 transition-colors"
      >
        학습지 생성하기
      </button>
    </form>
  );
}