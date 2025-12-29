import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import type { CoursePage, GetCoursesParams } from '../../api/types';
import CourseListContainer from '../CourseListContainer';
import { useCourseInfinite } from '../../hooks/useCourseInfinite';
import { useCourseSelection } from '../../hooks/useCourseSelection';
import { useApplyCourses } from '../../hooks/useApplyCoursesAction';
import { useExcludeClosedCourses } from '../../hooks/useExcludeClosedCourses';

vi.mock('../../hooks/useCourseInfinite');
vi.mock('../../hooks/useCourseSelection');
vi.mock('../../hooks/useApplyCoursesAction');
vi.mock('../../hooks/useExcludeClosedCourses');

const makePage = (overrides: Partial<CoursePage> = {}): CoursePage => ({
  courses: [],
  totalPages: 1,
  currentPage: 0,
  ...overrides,
});

const renderContainer = () => {
  const initialPage = makePage();
  const initialParams: GetCoursesParams = { page: 0, size: 10, sort: 'recent' };
  return render(
    <CourseListContainer
      initialPage={initialPage}
      initialParams={initialParams}
    />
  );
};

describe('CourseListContainer', () => {
  it('선택이 없으면 수강 신청 버튼이 비활성화되고, 선택 시 활성화된다', () => {
    const toggle = vi.fn();
    const applyCourses = vi.fn();

    vi.mocked(useCourseInfinite).mockReturnValue({
      courses: [],
      error: null,
      loading: false,
      hasMore: false,
      sentinelRef: { current: null },
      setParams: vi.fn(),
    } as unknown as ReturnType<typeof useCourseInfinite>);

    vi.mocked(useCourseSelection).mockReturnValue({
      isSelected: () => false,
      toggle,
      selectedCount: 0,
      selectedIdList: [],
    } as unknown as ReturnType<typeof useCourseSelection>);

    vi.mocked(useApplyCourses).mockReturnValue({
      applyCourses,
      loading: false,
    } as unknown as ReturnType<typeof useApplyCourses>);

    vi.mocked(useExcludeClosedCourses).mockReturnValue({
      hideClosed: false,
      toggleHideClosed: vi.fn(),
      visibleCourses: [],
    });

    const firstRender = renderContainer();

    const buttons = screen.getAllByRole('button', { name: /수강 신청 하기/i });
    expect(buttons[0]).toBeDisabled();

    // 선택 개수 변경 시
    vi.mocked(useCourseSelection).mockReturnValue({
      isSelected: () => true,
      toggle,
      selectedCount: 1,
      selectedIdList: [1],
    } as unknown as ReturnType<typeof useCourseSelection>);

    firstRender.unmount();
    const secondRender = renderContainer();

    const enabledButtons = screen.getAllByRole('button', {
      name: /수강 신청 하기/i,
    });
    const enabledButton = enabledButtons.find(
      (btn) => !btn.hasAttribute('disabled')
    );
    if (!enabledButton) throw new Error('활성화된 신청 버튼을 찾지 못했습니다');
    expect(enabledButton).toBeTruthy();
    expect(enabledButton).not.toBeDisabled();
    expect(enabledButton).toHaveTextContent('(1)'); // 선택 강의 개수 표시

    fireEvent.click(enabledButton);
    expect(applyCourses).toHaveBeenCalledWith([1], {});
    secondRender.unmount();
  });

  it('선택 개수가 2개일 때 수강 신청 버튼 라벨에 (2)가 표시된다', () => {
    const toggle = vi.fn();

    vi.mocked(useCourseInfinite).mockReturnValue({
      courses: [],
      error: null,
      loading: false,
      hasMore: false,
      sentinelRef: { current: null },
      setParams: vi.fn(),
    } as unknown as ReturnType<typeof useCourseInfinite>);

    vi.mocked(useCourseSelection).mockReturnValue({
      isSelected: () => true,
      toggle,
      selectedCount: 2,
      selectedIdList: [1, 2],
    } as unknown as ReturnType<typeof useCourseSelection>);

    vi.mocked(useApplyCourses).mockReturnValue({
      applyCourses: vi.fn(),
      loading: false,
    } as unknown as ReturnType<typeof useApplyCourses>);

    vi.mocked(useExcludeClosedCourses).mockReturnValue({
      hideClosed: false,
      toggleHideClosed: vi.fn(),
      visibleCourses: [],
    });

    const { unmount } = renderContainer();
    const buttons = screen.getAllByRole('button', { name: /수강 신청 하기/i });
    const enabled = buttons.find((btn) => !btn.hasAttribute('disabled'));
    if (!enabled) throw new Error('활성화된 신청 버튼을 찾지 못했습니다');
    expect(enabled.textContent ?? '').toContain('(2)');
    unmount();
  });

  it('정렬 기준 변경 시 UI 상태를 업데이트하고 서버 파라미터를 갱신한다', () => {
    const toggle = vi.fn();
    const setParams = vi.fn();
    const initialParams: GetCoursesParams = {
      page: 0,
      size: 10,
      sort: 'recent',
    };

    vi.mocked(useCourseInfinite).mockReturnValue({
      courses: [],
      error: null,
      loading: false,
      hasMore: false,
      sentinelRef: { current: null },
      setParams,
    } as unknown as ReturnType<typeof useCourseInfinite>);

    vi.mocked(useCourseSelection).mockReturnValue({
      isSelected: () => false,
      toggle,
      selectedCount: 0,
      selectedIdList: [],
    } as unknown as ReturnType<typeof useCourseSelection>);

    vi.mocked(useApplyCourses).mockReturnValue({
      applyCourses: vi.fn(),
      loading: false,
    } as unknown as ReturnType<typeof useApplyCourses>);

    vi.mocked(useExcludeClosedCourses).mockReturnValue({
      hideClosed: false,
      toggleHideClosed: vi.fn(),
      visibleCourses: [],
    });

    renderContainer();

    const select = screen.getByLabelText('정렬') as HTMLSelectElement;
    expect(select.value).toBe('recent');

    fireEvent.change(select, { target: { value: 'popular' } });

    expect(select.value).toBe('popular');
    expect(setParams).toHaveBeenCalledWith({
      ...initialParams,
      sort: 'popular',
    });
  });
});
