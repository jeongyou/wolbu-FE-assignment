import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import type { CoursePage } from '../../api/types';
import { useCoursePagesState } from '../useCoursePagesState';

const makePage = (overrides: Partial<CoursePage> = {}): CoursePage => ({
  courses: [
    {
      id: 1,
      title: 'Course 1',
      instructorName: 'Instructor',
      currentStudents: 0,
      maxStudents: 10,
      availableSeats: 10,
      isFull: false,
      price: 10000,
    },
  ],
  totalPages: 2,
  currentPage: 0,
  ...overrides,
});

describe('useCoursePagesState', () => {
  it('초기 페이지로 상태를 설정하고 hasMore를 계산한다', () => {
    const initial = makePage({ totalPages: 3, currentPage: 0 });
    const { result } = renderHook(() => useCoursePagesState(initial));

    expect(result.current.courses).toHaveLength(1);
    expect(result.current.page).toBe(0);
    expect(result.current.totalPages).toBe(3);
    expect(result.current.hasMore).toBe(true);
  });

  it('마지막 페이지라면 hasMore가 false이다', () => {
    const initial = makePage({ totalPages: 1, currentPage: 0 });
    const { result } = renderHook(() => useCoursePagesState(initial));

    expect(result.current.hasMore).toBe(false);
  });

  it('replaceWithFirstPage로 첫 페이지를 교체한다', () => {
    const initial = makePage({ totalPages: 3 });
    const nextFirst = makePage({
      courses: [{ ...initial.courses[0], id: 2, title: 'New' }],
      currentPage: 0,
      totalPages: 1,
    });
    const { result } = renderHook(() => useCoursePagesState(initial));

    act(() => result.current.replaceWithFirstPage(nextFirst));

    expect(result.current.courses[0].id).toBe(2);
    expect(result.current.page).toBe(0);
    expect(result.current.totalPages).toBe(1);
    expect(result.current.hasMore).toBe(false);
  });

  it('appendNextPage는 새 페이지만 추가하고 중복 페이지는 무시한다', () => {
    const initial = makePage({ totalPages: 2 });
    const page1: CoursePage = {
      courses: [
        {
          id: 3,
          title: 'Course 3',
          instructorName: 'Instructor',
          currentStudents: 0,
          maxStudents: 10,
          availableSeats: 10,
          isFull: false,
          price: 20000,
        },
      ],
      totalPages: 2,
      currentPage: 1,
    };

    const { result } = renderHook(() => useCoursePagesState(initial));

    act(() => result.current.appendNextPage(page1));

    expect(result.current.courses.map((c) => c.id)).toEqual([1, 3]);
    expect(result.current.page).toBe(1);
    expect(result.current.hasMore).toBe(false);

    act(() => result.current.appendNextPage(page1));

    expect(result.current.courses.map((c) => c.id)).toEqual([1, 3]);
  });

  it('중복이 아닌 다른 페이지를 순서대로 누적한다', () => {
    const initial = makePage({ totalPages: 3 });
    const page1 = makePage({
      currentPage: 1,
      courses: [{ ...initial.courses[0], id: 2, title: 'Course 2' }],
    });
    const page2 = makePage({
      currentPage: 2,
      totalPages: 3,
      courses: [{ ...initial.courses[0], id: 3, title: 'Course 3' }],
    });

    const { result } = renderHook(() => useCoursePagesState(initial));

    act(() => result.current.appendNextPage(page1));
    act(() => result.current.appendNextPage(page2));

    expect(result.current.courses.map((c) => c.id)).toEqual([1, 2, 3]);
    expect(result.current.page).toBe(2);
    expect(result.current.hasMore).toBe(false);
  });
});
