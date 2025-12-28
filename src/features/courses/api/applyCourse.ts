import { http } from '@/api/client';
import { getAccessToken } from '@/shared/auth/authStorage';

export type ApplyCourseResponse = {
  enrollmentId: number;
  courseId: number;
  courseTitle: string;
  instructorName: string;
  userId: number;
  userName: string;
  enrolledAt: string; // ISO 8601 datetime
  message: string;
};

export const applyCourse = async (courseId: number) => {
  const token = getAccessToken() ?? undefined;
  return http.post<ApplyCourseResponse>(
    `/api/courses/${courseId}/enroll`,
    undefined,
    undefined,
    { token }
  );
};
