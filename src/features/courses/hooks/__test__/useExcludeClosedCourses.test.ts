import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import type { CoursePage } from '../../api/types';
import { useExcludeClosedCourses } from '../useExcludeClosedCourses';

const makeCourse = (overrides: Partial<CoursePage['courses'][number]> = {}) => ({
  id: overrides.id ?? 1,
  title: overrides.title ?? 'Course',
  instructorName: overrides.instructorName ?? 'Instructor',
  currentStudents: overrides.currentStudents ?? 0,
  maxStudents: overrides.maxStudents ?? 10,
  availableSeats: overrides.availableSeats ?? 10,
  isFull: overrides.isFull ?? false,
  price: overrides.price ?? 10000,
});

describe('useExcludeClosedCourses', () => {
  it('hideClosed가 false일 때는 모든 강의를 반환한다', () => {
    const courses = [
      makeCourse({ id: 1 }),
      makeCourse({ id: 2, isFull: true }),
      makeCourse({ id: 3 }),
      makeCourse({ id: 4, isFull: true }),
    ];
    const { result } = renderHook(() => useExcludeClosedCourses(courses));

    expect(result.current.hideClosed).toBe(false);
    expect(result.current.visibleCourses).toHaveLength(4);
  });

  it('toggle 후에는 마감된 강의를 제외한다', () => {
    const courses = [
      makeCourse({ id: 1 }),
      makeCourse({ id: 2, isFull: true }),
      makeCourse({ id: 3 }),
      makeCourse({ id: 4, isFull: true }),
    ];
    const { result } = renderHook(() => useExcludeClosedCourses(courses));

    act(() => result.current.toggleHideClosed());

    expect(result.current.hideClosed).toBe(true);
    expect(result.current.visibleCourses).toHaveLength(2);
    expect(result.current.visibleCourses.map((c) => c.id)).toEqual([1, 3]);
  });

  it('다시 토글하면 모든 강의를 보여준다', () => {
    const courses = [
      makeCourse({ id: 1 }),
      makeCourse({ id: 2, isFull: true }),
    ];
    const { result } = renderHook(() => useExcludeClosedCourses(courses));

    act(() => result.current.toggleHideClosed());
    act(() => result.current.toggleHideClosed());

    expect(result.current.hideClosed).toBe(false);
    expect(result.current.visibleCourses).toHaveLength(2);
  });
});
