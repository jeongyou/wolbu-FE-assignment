'use client';

import { useRouter } from 'next/navigation';

import { useApplyCourse } from './useApplyCourse';
import { useApplyCoursesBatch } from './useApplyCoursesBatch';
import { saveEnrollResult } from '../utils/enrollResultStorage';

export const useApplyCourses = () => {
  const router = useRouter();
  const { applyCourse, loading: loadingSingle } = useApplyCourse();
  const { applyCoursesBatch, loading: loadingBatch } = useApplyCoursesBatch();

  const applyCourses = async (
    courseIds: number[],
    courseTitleMap?: Record<number, string>,
  ) => {
    if (courseIds.length === 0) return;
    if (courseIds.length === 1) {
      const courseId = courseIds[0];
      const result = await applyCourse(courseId);
      if (result) {
        saveEnrollResult({
          success: [
            {
              courseId: result.courseId,
              courseTitle: result.courseTitle ?? courseTitleMap?.[courseId],
            },
          ],
          failed: [],
        });
        router.push('/courses/confirm');
      }
      return;
    }

    const result = await applyCoursesBatch(courseIds);
    if (result) {
      saveEnrollResult({
        success: result.success.map(({ courseId, courseTitle }) => ({
          courseId,
          courseTitle: courseTitle ?? courseTitleMap?.[courseId],
        })),
        failed: result.failed.map(({ courseId, reason }) => ({
          courseId,
          courseTitle: courseTitleMap?.[courseId],
          reason,
        })),
      });
      router.push('/courses/confirm');
    }
  };

  return {
    applyCourses,
    loading: loadingSingle || loadingBatch,
  };
};
