'use client';

import { useCallback, useMemo, useState } from 'react';
import type { CoursePage } from '../api/types';

export const useCoursePagesState = (initialPage: CoursePage) => {
  const [courses, setCourses] = useState(initialPage.courses);
  const [page, setPage] = useState(initialPage.currentPage);
  const [totalPages, setTotalPages] = useState(initialPage.totalPages);

  const hasMore = useMemo(() => page < totalPages - 1, [page, totalPages]);

  const reset = useCallback(() => {
    setCourses([]);
    setPage(0);
  }, []);

  const replaceWithFirstPage = useCallback((first: CoursePage) => {
    setCourses(first.courses);
    setPage(first.currentPage);
    setTotalPages(first.totalPages);
  }, []);

  const appendNextPage = useCallback((next: CoursePage) => {
    setCourses((prev) => [...prev, ...next.courses]);
    setPage(next.currentPage);
    setTotalPages(next.totalPages);
  }, []);

  return {
    courses,
    page,
    totalPages,
    hasMore,
    reset,
    replaceWithFirstPage,
    appendNextPage,
  };
};
