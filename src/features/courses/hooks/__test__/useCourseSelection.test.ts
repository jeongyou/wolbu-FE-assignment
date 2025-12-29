import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { useCourseSelection } from '../useCourseSelection';

describe('useCourseSelection', () => {
  it('toggle로 선택/해제를 토글하고 카운트를 관리한다', () => {
    const { result } = renderHook(() => useCourseSelection());

    act(() => result.current.toggle(1));
    expect(result.current.isSelected(1)).toBe(true);
    expect(result.current.selectedCount).toBe(1);
    expect(result.current.selectedIdList).toEqual([1]);

    act(() => result.current.toggle(2));
    expect(result.current.selectedCount).toBe(2);
    expect(result.current.selectedIdList).toEqual(expect.arrayContaining([1, 2]));

    act(() => result.current.toggle(1));
    expect(result.current.isSelected(1)).toBe(false);
    expect(result.current.selectedCount).toBe(1);
    expect(result.current.selectedIdList).toEqual([2]);
  });

  it('같은 항목을 연속 토글해도 selectedIdList 순서는 유지된다', () => {
    const { result } = renderHook(() => useCourseSelection());

    act(() => {
      result.current.toggle(3);
      result.current.toggle(1);
      result.current.toggle(2);
    });

    expect(result.current.selectedIdList).toEqual([3, 1, 2]);

    act(() => result.current.toggle(1)); // 해제
    expect(result.current.selectedIdList).toEqual([3, 2]);
  });
});
