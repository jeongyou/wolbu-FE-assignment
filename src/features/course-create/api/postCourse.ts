import { http } from '@/api/client';

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
  const path = '/api/courses';
  return http.post<PostCourseResponse>(path, payload);
};
