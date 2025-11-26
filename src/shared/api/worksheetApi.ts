import { httpClient } from "@/shared/lib/httpClient";
import { Level, WorksheetStatus } from "@/types/enums";
import { WorksheetData } from "@/types/worksheet";

export interface CreateWorksheetRequest {
  level: Level;
  nationality: string;
  goal: string;
  extra_note?: string;
}

export interface CreateWorksheetResponse {
  status: WorksheetStatus;
  content: WorksheetData;
  error?: string;
}

// 학습지 생성 api (폴링 없이 바로 응답)
export const createWorksheet = async (
  data: CreateWorksheetRequest
): Promise<CreateWorksheetResponse> => {
  const response = await httpClient.post("/api/worksheets", data);
  return response.data;
};
