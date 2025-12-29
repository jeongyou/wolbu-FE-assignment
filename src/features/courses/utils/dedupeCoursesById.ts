import type { Course } from '../api/types';

export const dedupeCoursesById = (courses: Course[]): Course[] => {
  const byId = new Map<number, Course>();

  courses.forEach((course) => {
    if (!byId.has(course.id)) {
      byId.set(course.id, course);
    }
  });

  return Array.from(byId.values());
};
