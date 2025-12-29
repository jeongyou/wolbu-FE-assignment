'use client';

import { useCallback, useMemo, useRef, useState } from 'react';
import type { CoursePage } from '../api/types';

export const useCoursePagesState = (initialPage: CoursePage) => {
  const [courses, setCourses] = useState(initialPage.courses);
  const [page, setPage] = useState(initialPage.currentPage);
  const [totalPages, setTotalPages] = useState(initialPage.totalPages);
  const loadedPagesRef = useRef(new Set<number>([initialPage.currentPage]));

  const hasMore = useMemo(() => page < totalPages - 1, [page, totalPages]);

  const replaceWithFirstPage = useCallback((first: CoursePage) => {
    loadedPagesRef.current = new Set([first.currentPage]);
    setCourses(first.courses);
    setPage(first.currentPage);
    setTotalPages(first.totalPages);
  }, []);

  const appendNextPage = useCallback((next: CoursePage) => {
    if (loadedPagesRef.current.has(next.currentPage)) return;

    loadedPagesRef.current.add(next.currentPage);
    setCourses((prev) => [...prev, ...next.courses]);
    setPage(next.currentPage);
    setTotalPages(next.totalPages);
  }, []);

  return {
    courses,
    page,
    totalPages,
    hasMore,
    replaceWithFirstPage,
    appendNextPage,
  };
};
