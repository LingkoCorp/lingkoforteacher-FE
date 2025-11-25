// 학습 레벨
export const LEVELS = ["beginner", "intermediate", "advanced"] as const;
export type Level = typeof LEVELS[number];

// 상태
export type WorksheetStatus = "PENDING" | "GENERATING_CONTENT" | "COMPLETED" | "FAILED";