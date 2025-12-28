'use client';

import { useApplyCourse } from './useApplyCourse';
import { useApplyCoursesBatch } from './useApplyCoursesBatch';

export const useApplyCourses = () => {
  const { applyCourse, loading: loadingSingle } = useApplyCourse();
  const { applyCoursesBatch, loading: loadingBatch } = useApplyCoursesBatch();

  const applyCourses = async (courseIds: number[]) => {
    if (courseIds.length === 0) return;
    if (courseIds.length === 1) {
      await applyCourse(courseIds[0]);
      return;
    }
    await applyCoursesBatch(courseIds);
  };

  return {
    applyCourses,
    loading: loadingSingle || loadingBatch,
  };
};
