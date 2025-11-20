import { useState } from "react";
import { quizApi } from "@/shared/api/quizApi";
import type { QuizData, QuizRequest, QuizResponse } from "@/types/quiz";
import { sampleQuiz } from "@/shared/data/sampleQuiz";

export function useQuiz() {
  const initialRequest: QuizRequest = {
    languageCode: "ko",
    level: "beginner",
    learningSituation: "cafe",
  };

  const [request, setRequest] = useState<QuizRequest>(initialRequest);
  const [result, setResult] = useState<QuizData | null>(null);
  const [loading, setLoading] = useState(false);

  // api 연동 시 사용
  // const submit = async () => {
  //   setLoading(true);
  //   try {
  //     const data = await quizApi.createQuiz(request);
  //     setResult(data);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // 샘플 데이터 넘기기
  const submit = async () => {
    setLoading(true);
    try {
      // (선택) 로딩 연출용 딜레이
      await new Promise((r) => setTimeout(r, 1200));

      setResult(sampleQuiz);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setRequest(initialRequest);
    setResult(null);
    setLoading(false);
  };

  return { request, setRequest, result, loading, submit, reset };
}