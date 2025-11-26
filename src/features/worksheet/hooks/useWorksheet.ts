// hooks/useWorksheet.ts

import { useState } from "react";
import {
  createWorksheet,
  CreateWorksheetRequest,
} from "@/shared/api/worksheetApi";
import type { WorksheetData } from "@/types/worksheet";

export function useWorksheet() {
  const initialRequest: CreateWorksheetRequest = {
    level: "beginner",
    nationality: "usa",
    goal: "travel",
    extra_note: "Focus on casual conversation.",
  };

  const [request, setRequest] = useState<CreateWorksheetRequest>(initialRequest);
  const [result, setResult] = useState<WorksheetData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // 바로 응답 받기 (폴링 없음)
      const response = await createWorksheet(request);

      if (response.status === "COMPLETED") {
        setResult(response.content);
      } else if (response.status === "FAILED") {
        setError(response.error || "Worksheet generation failed.");
      }
    } catch (err) {
      console.error("Worksheet submission error:", err);
      setError("학습지 생성 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setRequest(initialRequest);
    setResult(null);
    setLoading(false);
    setError(null);
  };

  return { request, setRequest, result, loading, error, submit, reset };
}
