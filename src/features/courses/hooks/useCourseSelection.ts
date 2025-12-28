'use client';

import { useCallback, useMemo, useState } from 'react';

/**
 * 강의 선택 상태를 Set 기반으로 관리하는 훅
 */
export const useCourseSelection = () => {
  const [selectedIds, setSelectedIds] = useState<Set<number>>(() => new Set());

  const toggle = useCallback((id: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const isSelected = useCallback(
    (id: number) => selectedIds.has(id),
    [selectedIds]
  );

  const selectedCount = selectedIds.size;

  const selectedIdList = useMemo(() => Array.from(selectedIds), [selectedIds]);

  return {
    selectedIds,
    selectedCount,
    selectedIdList,
    isSelected,
    toggle,
  };
};
