/*
 * HTTP 클라이언트 전반에서 사용하는 공통 타입 정의 파일
 *
 * - QueryParams: GET 요청 시 query string 표현용
 * - RequestOptions: fetch 요청 시 공통 옵션(token, cache 등)
 * - ServerErrorResponse: 백엔드 에러 응답 스펙에 맞춘 타입
 */

export type QueryParams = Record<string, string | number | boolean | undefined>;
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type ServerErrorResponse = {
  code: string;        // 예: U001
  message: string;     // 예: 이미 사용 중인 이메일입니다
  timestamp: string;   // ISO date-time
};

export type RequestOptions = {
  method?: HttpMethod;
  params?: QueryParams;
  body?: unknown;
  token?: string;
  headers?: HeadersInit;
  cache?: RequestCache;
};