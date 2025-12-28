import { http } from '@/api/client';
import type { GetCoursesParams, CoursePage } from './types';
import type { GetCoursesServerResponse } from './types.server';
import { mapGetCoursesResponse } from './mappers';

export const getCourses = async (
  params?: GetCoursesParams
): Promise<CoursePage> => {
  const res = await http.get<GetCoursesServerResponse>('/api/courses', params);
  return mapGetCoursesResponse(res);
};
