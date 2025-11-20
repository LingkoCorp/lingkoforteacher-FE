import { httpClient } from "./httpClient";
import type { QuizRequest, QuizResponse } from "@/types/quiz";

export const quizApi = {
  createQuiz: async (payload: QuizRequest): Promise<QuizResponse> => {
    const res = await httpClient.post<QuizResponse>("/quiz", payload);
    return res.data;
  },
};