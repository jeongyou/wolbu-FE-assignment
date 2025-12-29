import { describe, expect, it } from 'vitest';

import type { Course } from '../../api/types';
import { buildCourseTitleMap } from '../buildCourseTitleMap';

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

describe('buildCourseTitleMap', () => {
  it('코스 ID를 키로 제목 맵을 만든다', () => {
    const courses = [makeCourse({ id: 1, title: 'A' }), makeCourse({ id: 2, title: 'B' })];

    const map = buildCourseTitleMap(courses);

    expect(map[1]).toBe('A');
    expect(map[2]).toBe('B');
  });
});
