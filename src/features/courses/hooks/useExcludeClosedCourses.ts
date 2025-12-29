import { useMemo, useState, useCallback } from 'react';
import type { CoursePage } from '../api/types';

/**
 * 마감된 강의를 목록에서 제외할지 여부를 관리하는 UI 필터 훅
 *
 * - hideClosed 상태를 소유한다.
 * - 토글 핸들러(toggleHideClosed)를 제공한다.
 * - 상태에 따라 노출할 강의 목록(visibleCourses)을 파생 계산한다.
 */
export const useExcludeClosedCourses = (courses: CoursePage['courses']) => {
  const [hideClosed, setHideClosed] = useState(false);

  const toggleHideClosed = useCallback(() => {
    setHideClosed((prev) => !prev);
  }, []);

  const visibleCourses = useMemo(() => {
    if (!hideClosed) return courses;
    return courses.filter((course) => !course.isFull);
  }, [courses, hideClosed]);

  return {
    hideClosed,
    toggleHideClosed,
    visibleCourses,
  };
};
