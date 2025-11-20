"use client";

import { useCallback, useState } from "react";
import QuizIntroStep from "@/features/quiz/components/quiz-intro-step";
import QuizGenerateStep from "@/features/quiz/components/quiz-generate-step";
import QuizResultStep from "@/features/quiz/components/quiz-result-step";
import { QuizFormValues } from "@/features/quiz/components/quiz-form";
import { useQuiz } from "@/features/quiz/hooks/useQuiz";

export default function QuizPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const { request, setRequest, result, loading, submit, reset } = useQuiz();

  const handleIntroSubmit = (data: QuizFormValues) => {
    setRequest({
      languageCode: data.languageCode,
      level: data.difficulty,              
      learningSituation: data.situation,
    });
    setCurrentStep(2);
  };

  const handleGenerateStart = useCallback(async () => {
    await submit();        
    setCurrentStep(3);     
  }, [submit]);

  const handleResultReset = () => {
    reset();
    setCurrentStep(1);
  };

  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-4">
      {currentStep === 1 && (
        <QuizIntroStep onSubmit={handleIntroSubmit} />
      )}
      {currentStep === 2 && (
        <QuizGenerateStep onStart={handleGenerateStart} loading={loading} />
      )}
      {currentStep === 3 && result && (
        <QuizResultStep quiz={result} onReset={handleResultReset} />
      )}
    </main>
  );
}