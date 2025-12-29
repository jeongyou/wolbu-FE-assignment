import type { Course } from '../api/types';

export const buildCourseTitleMap = (
  courses: Course[]
): Record<number, string> => {
  return Object.fromEntries(courses.map(({ id, title }) => [id, title]));
};
