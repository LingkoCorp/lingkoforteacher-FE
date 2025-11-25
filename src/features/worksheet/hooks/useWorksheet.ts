// hooks/useWorksheet.ts

import { useState } from "react";
import {
  createWorksheet,
  CreateWorksheetRequest,
  getWorksheetStatus,
} from "@/shared/api/worksheetApi";
import type { WorksheetData } from "@/types/worksheet";

const POLL_INTERVAL = 3000;        // 3초마다 폴링
const MAX_WAIT_MS = 3 * 60 * 1000; // 최대 3분까지 기다림

export function useWorksheet() {
  const initialRequest: CreateWorksheetRequest = {
    level: "beginner",
    nationality: "ko",
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
      // 1) 생성 요청
      const created = await createWorksheet(request);
      const worksheetId = created.id;

      const startedAt = Date.now();

      // 2) 상태 폴링
      while (Date.now() - startedAt < MAX_WAIT_MS) {
        const res = await getWorksheetStatus(worksheetId);

        if (res.status === "COMPLETED") {
          // WorksheetData 타입이 content 구조라면 이게 맞음
          setResult(res.content);
          return;
        }

        if (res.status === "FAILED") {
          setError(res.error_message || "Worksheet generation failed.");
          return;
        }

        // 아직 PENDING / GENERATING_CONTENT 인 경우
        await new Promise((r) => setTimeout(r, POLL_INTERVAL));
      }

      // 3분 안에 COMPLETED를 못 받으면
      setError(
        "학습지 생성이 예상보다 오래 걸리고 있어요. 잠시 후 다시 시도하거나 이메일을 확인해 주세요."
      );
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
