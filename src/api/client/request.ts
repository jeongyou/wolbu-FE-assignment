import { buildUrl } from './url';
import { HttpError } from './error';
import { BASE_URL } from './config';
import type { RequestOptions, ServerErrorResponse } from './types';

const fallbackError = (status?: number): ServerErrorResponse => ({
  code: 'UNKNOWN',
  message: status ? `Request failed (${status})` : 'Network error',
  timestamp: new Date().toISOString(),
});

/**
 * fetch를 감싼 HTTP 요청 핵심 로직
 *
 * 역할:
 * - query params를 포함한 URL 생성
 * - Authorization 헤더 병합
 * - JSON 응답 파싱
 * - 실패 시 HttpError로 변환해 throw
 *
 * CSR / SSR 환경 모두에서 동일하게 사용 가능하도록
 * token, cache 등을 옵션으로 주입받는다.
 */
export const request = async <T>(
  path: string,
  { method = 'GET', params, body, token, headers, cache }: RequestOptions = {},
): Promise<T> => {
  const url = new URL(buildUrl(path, params), BASE_URL).toString();

  const mergedHeaders: HeadersInit = {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...headers,
  };

  const hasBody = body !== undefined && body !== null;

  let res: Response;
  try {
    res = await fetch(url, {
      method,
      cache,
      headers: hasBody
        ? { 'Content-Type': 'application/json', ...mergedHeaders }
        : mergedHeaders,
      body: hasBody ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new HttpError(0, fallbackError());
  }

  const contentType = res.headers.get('content-type') ?? '';
  const isJson = contentType.includes('application/json');
  const data = isJson ? await res.json().catch(() => undefined) : undefined;

  if (!res.ok) {
    throw new HttpError(res.status, data ?? fallbackError(res.status));
  }

  return data as T;
};
