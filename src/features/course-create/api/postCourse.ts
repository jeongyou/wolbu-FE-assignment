import { http } from '@/api/client';
import { getAccessToken } from '@/shared/auth/authStorage';

export type PostCourseRequest = {
  title: string;
  description?: string;
  instructorName: string;
  maxStudents: number;
  price: number;
};

export type PostCourseResponse = {
  id: number;
  title: string;
  description?: string;
  instructorName: string;
  maxStudents: number;
  currentStudents: number;
  availableSeats: number;
  isFull: boolean;
  price: number;
  createdAt: string;
};

export const postCourse = async (payload: PostCourseRequest) => {
  const token = getAccessToken();
  const path = '/api/courses';
  const options = token ? { token } : undefined;
  return http.post<PostCourseResponse>(path, payload, undefined, options);
};
