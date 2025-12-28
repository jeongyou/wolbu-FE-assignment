import { http } from '@/api/client';
import { getAccessToken } from '@/shared/auth/authStorage';

type ApplyCoursesRequest = {
  courseIds: number[];
};

export type ApplyCoursesResponse = {
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
): Promise<ApplyCoursesResponse> => {
  const token = getAccessToken();
  const path = '/api/enrollments/batch';
  const body: ApplyCoursesRequest = { courseIds };

  if (token) {
    return http.post<ApplyCoursesResponse>(path, body, undefined, { token });
  }

  return http.post<ApplyCoursesResponse>(path, body);
};
