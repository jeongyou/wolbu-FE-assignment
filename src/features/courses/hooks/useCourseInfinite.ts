'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { getCourses } from '../api/getCourses';
import type { CoursePage, GetCoursesParams } from '../api/types';
import { useIntersectionObserver } from '@/shared/hooks/useIntersectionObserver';
import { useCoursePagesState } from './useCoursePagesState';

/**
 * 강의 목록 무한 스크롤 훅
 *
 * - 서버에서 정렬/페이지네이션된 강의 목록을 받아 클라이언트에서 이어 붙인다.
 * - 하단 센티널이 화면에 들어오면 다음 페이지를 요청한다.
 * - 정렬/필터 params가 변경되면 목록을 초기화하고 첫 페이지부터 다시 로드한다.
 */
export const useCourseInfinite = (
  initialPage: CoursePage,
  initialParams: GetCoursesParams
) => {
  const {
    courses,
    page,
    hasMore,
    replaceWithFirstPage,
    appendNextPage,
  } = useCoursePagesState(initialPage);

  const [params, setParams] = useState(initialParams);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    setError(null);

    try {
      const next = await getCourses({ ...params, page: page + 1 });
      appendNextPage(next);
    } catch {
      setError('강의를 불러오는 중 오류가 발생했습니다');
    } finally {
      setLoading(false);
    }
  }, [appendNextPage, hasMore, loading, page, params]);

  useIntersectionObserver(sentinelRef, loadMore, {
    enabled: hasMore,
    rootMargin: '200px 0px',
  });

  const didMountRef = useRef(false);

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }

    const fetchFirst = async () => {
      setLoading(true);
      setError(null);

      try {
        const first = await getCourses({ ...params, page: 0 });
        replaceWithFirstPage(first);
      } catch {
        setError('강의를 불러오는 중 오류가 발생했습니다');
      } finally {
        setLoading(false);
      }
    };

    fetchFirst();
  }, [params, replaceWithFirstPage]);

  return { courses, loading, error, hasMore, sentinelRef, setParams };
};
