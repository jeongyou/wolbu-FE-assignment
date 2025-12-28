import type { GetCoursesServerResponse } from './types.server';
import type { CoursePage } from './types';

export const mapGetCoursesResponse = (
  res: GetCoursesServerResponse
): CoursePage => ({
  courses: res.content.map(
    ({
      id,
      title,
      instructorName,
      currentStudents,
      maxStudents,
      availableSeats,
      isFull,
      price,
    }) => ({
      id,
      title,
      instructorName,
      currentStudents,
      maxStudents,
      availableSeats,
      isFull,
      price,
    })
  ),
  totalPages: res.totalPages,
  currentPage: res.number,
});
