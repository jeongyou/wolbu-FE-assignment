'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { getCourses } from '../api/getCourses';
import type { CoursePage, GetCoursesParams } from '../api/types';

/**
 * 강의 목록 무한 스크롤을 위한 상태, 로직 훅
 * - 초기 페이지를 받아 클라이언트에서 추가 페이지를 붙인다.
 * - IntersectionObserver로 하단 센티널이 보이면 다음 페이지를 로드한다.
 * - 서버가 같은 ID를 여러 번 내려줘도 중복 없이 보여주려면 getCourses 응답에서 보장되어야 함(현재는 그대로 이어붙임).
 */
export const useCourseInfinite = (
  initialPage: CoursePage,
  initialParams: GetCoursesParams
) => {
  const [courses, setCourses] = useState(initialPage.courses);
  const [page, setPage] = useState(initialPage.currentPage);
  const [totalPages, setTotalPages] = useState(initialPage.totalPages);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const hasMore = page < totalPages - 1;

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    setError(null);
    try {
      const nextPage = page + 1;
      const next = await getCourses({ ...initialParams, page: nextPage });
      setCourses((prev) => [...prev, ...next.courses]);
      setPage(next.currentPage);
      setTotalPages(next.totalPages);
    } catch (err) {
      setError('강의를 불러오는 중 오류가 발생했습니다');
    } finally {
      setLoading(false);
    }
  }, [hasMore, loading, page, initialParams]);

  useEffect(() => {
    if (!hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const isIntersecting = entries.some((entry) => entry.isIntersecting);
        if (isIntersecting) loadMore();
      },
      { rootMargin: '200px 0px' }
    );

    const target = sentinelRef.current;
    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
      observer.disconnect();
    };
  }, [hasMore, loadMore]);

  return {
    courses,
    loading,
    error,
    hasMore,
    sentinelRef,
  };
};
