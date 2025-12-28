import { useCallback, useState } from 'react';

/**
 * 데이터 변경(mutation) 전용 비동기 훅
 * - 생성/수정/삭제 요청에 사용
 * - 사용자 액션에 의해 명시적으로 실행
 */
export const useMutation = <T, Params extends unknown[]>(
  mutateFn: (...args: Params) => Promise<T>
) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const mutate = useCallback(
    async (...args: Params) => {
      setLoading(true);
      setError(null);
      try {
        return await mutateFn(...args);
      } catch (err) {
        setError(err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [mutateFn]
  );

  return { loading, error, mutate };
};
