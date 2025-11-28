import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

export const httpClient = axios.create();

// 외부 백엔드 사용시
// export const httpClient = axios.create({
//   baseURL: BASE_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });
