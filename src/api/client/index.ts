import { request } from './request';
import type { QueryParams, RequestOptions } from './types';

export { HttpError } from './error';
export type { ServerErrorResponse, RequestOptions } from './types';

/**
 * 외부에서 사용하는 HTTP 클라이언트 진입점
 *
 * - request()를 직접 노출하지 않고
 * - get / post / put / patch / delete 형태의 얇은 래퍼만 제공
 */
export const http = {
  get: <T>(
    path: string,
    params?: QueryParams,
    options?: Omit<RequestOptions, 'method' | 'params'>
  ) => request<T>(path, { ...options, method: 'GET', params }),

  post: <T>(
    path: string,
    body?: unknown,
    params?: QueryParams,
    options?: Omit<RequestOptions, 'method' | 'params' | 'body'>
  ) => request<T>(path, { ...options, method: 'POST', body, params }),

  put: <T>(
    path: string,
    body?: unknown,
    params?: QueryParams,
    options?: Omit<RequestOptions, 'method' | 'params' | 'body'>
  ) => request<T>(path, { ...options, method: 'PUT', body, params }),

  patch: <T>(
    path: string,
    body?: unknown,
    params?: QueryParams,
    options?: Omit<RequestOptions, 'method' | 'params' | 'body'>
  ) => request<T>(path, { ...options, method: 'PATCH', body, params }),

  delete: <T>(
    path: string,
    params?: QueryParams,
    options?: Omit<RequestOptions, 'method' | 'params'>
  ) => request<T>(path, { ...options, method: 'DELETE', params }),
};
