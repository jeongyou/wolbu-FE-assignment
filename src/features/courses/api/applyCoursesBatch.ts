import { http } from '@/api/client';
import { getAccessToken } from '@/shared/auth/authStorage';

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
  const token = getAccessToken();
  const path = '/api/enrollments/batch';
  const body: ApplyCoursesBatchRequest = { courseIds };

  if (token) {
    return http.post<ApplyCoursesBatchResponse>(path, body, undefined, {
      token,
    });
  }

  return http.post<ApplyCoursesBatchResponse>(path, body);
};
