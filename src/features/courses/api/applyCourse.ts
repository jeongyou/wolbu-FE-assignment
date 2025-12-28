import { http } from '@/api/client';
import { getAccessToken } from '@/shared/auth/authStorage';
import type { CourseServerResponse } from './types.server';

export const applyCourse = async (courseId: number) => {
  const token = getAccessToken() ?? undefined;
  return http.post<CourseServerResponse>(
    `/api/courses/${courseId}/enroll`,
    undefined,
    undefined,
    { token }
  );
};
