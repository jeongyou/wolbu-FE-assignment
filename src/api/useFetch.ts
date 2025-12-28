import { useCallback, useEffect, useState } from 'react';

/**
 * GET 요청 전용 비동기 훅
 * - 데이터 조회용(fetch)
 * - 최초 로드 및 refetch를 통해 재요청을 담당한다.
 */
export const useFetch = <T, Params extends unknown[]>(
  fetchFn: (...args: Params) => Promise<T>,
  params?: Params
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const refetch = useCallback(
    async (...args: Params) => {
      setLoading(true);
      setError(null);
      try {
        const result = await fetchFn(...args);
        setData(result);
        return result;
      } catch (err) {
        setError(err);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [fetchFn]
  );

  // 최초 1회 자동 실행
  useEffect(() => {
    if (params) refetch(...params);
  }, [refetch]);

  return { data, loading, error, refetch };
};
