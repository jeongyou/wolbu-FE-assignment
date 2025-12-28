import type { QueryParams } from './types';

/**
 * path + query params를 결합해 최종 요청 URL을 생성하는 유틸
 *
 * - undefined 값은 query string에서 제외
 * - URLSearchParams를 사용해 안전하게 인코딩
 *
 */
export const buildUrl = (path: string, params?: QueryParams) => {
  if (!params) return path;

  const usp = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) usp.set(key, String(value));
  });

  const qs = usp.toString();
  return qs ? `${path}?${qs}` : path;
};
