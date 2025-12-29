import { act, renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it, beforeEach, vi } from 'vitest';

import type { CoursePage, GetCoursesParams } from '../../api/types';
import { useCourseInfinite } from '../useCourseInfinite';
import { getCourses } from '../../api/getCourses';

vi.mock('../../api/getCourses');

let intersectCallback: (() => void) | null = null;

vi.mock('@/shared/hooks/useIntersectionObserver', () => ({
  useIntersectionObserver: (_ref: unknown, onIntersect: () => void) => {
    intersectCallback = onIntersect;
  },
}));

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

const initialParams: GetCoursesParams = { page: 0, size: 10, sort: 'recent' };

describe('useCourseInfinite', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    intersectCallback = null;
  });

  it('스크롤 인터섹션 시 다음 페이지를 불러와 이어 붙인다', async () => {
    const initial = makePage({ currentPage: 0 });
    const nextPage: CoursePage = {
      ...makePage({ currentPage: 1 }),
      courses: [
        {
          ...initial.courses[0],
          id: 2,
          title: 'Course 2',
        },
      ],
    };

    vi.mocked(getCourses).mockResolvedValueOnce(nextPage);

    const { result } = renderHook(() => useCourseInfinite(initial, initialParams));

    // 초기 데이터가 그대로 노출되는지 확인
    expect(result.current.courses).toHaveLength(1);

    // 인터섹션 트리거 -> 다음 페이지 로드
    await act(async () => {
      await intersectCallback?.();
    });

    await waitFor(() => {
      expect(result.current.courses).toHaveLength(2);
      expect(result.current.courses[1].id).toBe(2);
      expect(result.current.loading).toBe(false);
    });

    expect(getCourses).toHaveBeenCalledWith({ ...initialParams, page: 1 });
  });

  it('setParams로 정렬이 바뀌면 첫 페이지를 다시 불러온다', async () => {
    const initial = makePage();
    const updatedFirst: CoursePage = {
      ...initial,
      courses: [{ ...initial.courses[0], id: 99, title: 'Updated' }],
      currentPage: 0,
      totalPages: 1,
    };

    vi.mocked(getCourses).mockResolvedValueOnce(updatedFirst);

    const { result } = renderHook(() => useCourseInfinite(initial, initialParams));

    act(() => {
      result.current.setParams({ ...initialParams, sort: 'popular' });
    });

    await waitFor(() => {
      expect(result.current.courses[0].id).toBe(99);
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeNull();
    });

    expect(getCourses).toHaveBeenCalledWith({ ...initialParams, sort: 'popular', page: 0 });
  });

  it('요청 실패 시 에러 메시지를 설정한다', async () => {
    const initial = makePage();
    vi.mocked(getCourses).mockRejectedValueOnce(new Error('network'));

    const { result } = renderHook(() => useCourseInfinite(initial, initialParams));

    act(() => {
      result.current.setParams({ ...initialParams, sort: 'rate' });
    });

    await waitFor(() => {
      expect(result.current.error).toBe('강의를 불러오는 중 오류가 발생했습니다');
      expect(result.current.loading).toBe(false);
    });
  });
});
