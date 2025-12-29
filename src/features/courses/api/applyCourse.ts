import { http } from '@/api/client';

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

export const applyCourse = async (courseId: number) =>
  http.post<ApplyCourseResponse>(`/api/courses/${courseId}/enroll`);
