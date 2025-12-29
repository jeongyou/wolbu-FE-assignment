import { http } from '@/api/client';

type ApplyCoursesBatchRequest = {
  courseIds: number[];
};

export type ApplyCoursesBatchResponse = {
  success: {
    enrollmentId: number;
    courseId: number;
    courseTitle: string;
  }[];
  failed: {
    courseId: number;
    reason: string;
  }[];
};

export const applyCoursesBatch = async (
  courseIds: number[]
): Promise<ApplyCoursesBatchResponse> => {
  const path = '/api/enrollments/batch';
  const body: ApplyCoursesBatchRequest = { courseIds };
  return http.post<ApplyCoursesBatchResponse>(path, body);
};
