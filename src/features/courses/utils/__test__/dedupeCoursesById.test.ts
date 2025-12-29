import { describe, expect, it } from 'vitest';

import type { Course } from '../../api/types';
import { dedupeCoursesById } from '../dedupeCoursesById';

const makeCourse = (overrides: Partial<Course> = {}): Course => ({
  id: 1,
  title: 'Course A',
  instructorName: 'Instructor',
  currentStudents: 0,
  maxStudents: 10,
  availableSeats: 10,
  isFull: false,
  price: 10000,
  ...overrides,
});

describe('dedupeCoursesById', () => {
  it('중복 ID를 제거하고 첫 번째 값을 유지한다', () => {
    const courses = [
      makeCourse({ id: 1, title: 'Original' }),
      makeCourse({ id: 2, title: 'Second' }),
      makeCourse({ id: 1, title: 'Latest' }),
    ];

    const deduped = dedupeCoursesById(courses);

    expect(deduped).toHaveLength(2);
    expect(deduped.find((c) => c.id === 1)?.title).toBe('Original');
    expect(deduped.find((c) => c.id === 2)?.title).toBe('Second');
  });

  it('중복이 없으면 원소가 그대로 유지된다', () => {
    const courses = [
      makeCourse({ id: 1, title: 'A' }),
      makeCourse({ id: 2, title: 'B' }),
    ];

    const deduped = dedupeCoursesById(courses);

    expect(deduped).toHaveLength(2);
    expect(deduped[0].id).toBe(1);
    expect(deduped[1].id).toBe(2);
  });
});
