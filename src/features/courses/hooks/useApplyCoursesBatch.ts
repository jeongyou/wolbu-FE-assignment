'use client';

import { useMutation } from '@/api/useMutation';
import { HttpError } from '@/api/client';
import { applyCoursesBatch } from '../api/applyCoursesBatch';
import { getAccessToken } from '@/shared/auth/authStorage';
import { useToastContext } from '@/shared/components/Toast/ToastProvider';

export const useApplyCoursesBatch = () => {
  const { mutate: applyBatch, loading } = useMutation(applyCoursesBatch);
  const { showToast } = useToastContext();

  const handleApply = async (courseIds: number[]) => {
    const token = getAccessToken();
    if (!token) {
      showToast('로그인이 필요합니다');
      return;
    }

    try {
      const result = await applyBatch(courseIds);
      const successCount = result.success.length;
      const failedCount = result.failed.length;

      if (failedCount > 0) {
        const failedReasons = result.failed
          .map((item) => item.reason)
          .filter(Boolean)
          .join(', ');
        showToast(
          `신청 완료: ${successCount}건, 실패: ${failedCount}건${failedReasons ? ` (${failedReasons})` : ''}`,
        );
      } else {
        showToast('수강 신청이 완료되었습니다');
      }
    } catch (error) {
      if (error instanceof HttpError && error.payload?.message) {
        showToast(error.payload.message);
        return;
      }
      showToast('수강 신청 중 오류가 발생했습니다');
    }
  };

  return {
    applyCoursesBatch: handleApply,
    loading,
  };
};
