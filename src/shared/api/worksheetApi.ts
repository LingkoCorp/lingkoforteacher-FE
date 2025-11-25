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
  id: string;
  status: WorksheetStatus;
  message: string;
}

export interface GetWorksheetResponse {
  id: string;
  status: WorksheetStatus;
  level: string;
  nationality: string;
  goal: string;
  created_at: string;
  updated_at: string;
  pdf_url: string;
  error_message?: string;
  content: WorksheetData;
}

// 학습지 생성 api
export const createWorksheet = async (
  data: CreateWorksheetRequest
): Promise<CreateWorksheetResponse> => {
  const response = await httpClient.post("/api/worksheets", data);
  return response.data;
};

// 학습지 상태 확인 api
export const getWorksheetStatus = async (
  id: string
): Promise<GetWorksheetResponse> => {
  const response = await httpClient.get(`/api/worksheets/${id}`);
  return response.data;
};