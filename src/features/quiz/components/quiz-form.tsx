"use client";

import { LANGUAGES } from "@/shared/constants/languages";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";
import { LanguageCode } from "@/types/language";
import { useState } from "react";
import ReactCountryFlag from "react-country-flag";

export interface QuizFormValues {
  languageCode: LanguageCode;
  difficulty: string;
  situation: string;
}

interface QuizFormProps {
  onSubmit: (data: QuizFormValues) => void;
}

export function QuizForm({ onSubmit }: QuizFormProps) {
  const [languageCode, setLanguageCode] = useState<LanguageCode | "">("");
  const [difficulty, setDifficulty] = useState("normal");
  const [situation, setSituation] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!languageCode || !situation) return;

    onSubmit({ languageCode, difficulty, situation });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Country Section */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-3">
          국적
        </label>

        <Select
          value={languageCode}
          onValueChange={(v) => setLanguageCode(v as LanguageCode)}
        >
          <SelectTrigger className="input-field w-full">
            <SelectValue placeholder="학습자의 국적을 선택하세요" />
          </SelectTrigger>

          <SelectContent>
            {LANGUAGES.map((lang) => (
              <SelectItem key={lang.languageCode} value={lang.languageCode}>
                <div className="flex items-center gap-2">
                  <ReactCountryFlag
                    countryCode={lang.countryCode} // "KR" | "US" | "JP"
                    svg
                    style={{ width: "1.2em", height: "1.2em" }}
                  />
                  <span>
                    {lang.languageOrigin} ({lang.language})
                  </span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Difficulty Section */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-3">
          난이도
        </label>
        <div className="flex gap-3">
          {["easy", "normal", "hard"].map((level) => (
            <button
              key={level}
              type="button"
              onClick={() => setDifficulty(level)}
              className={`flex-1 py-3 rounded-lg font-medium transition-all ${
                difficulty === level
                  ? "bg-primary text-primary-foreground border-2 border-primary"
                  : "bg-background text-foreground border-2 border-border hover:border-primary"
              }`}
            >
              {level === "easy" ? "쉬움" : level === "normal" ? "보통" : "어려움"}
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
          value={situation}
          onChange={(e) => setSituation(e.target.value)}
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