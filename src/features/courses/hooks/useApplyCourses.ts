'use client';

import { useMutation } from '@/api/useMutation';
import { HttpError } from '@/api/client';
import { applyCourse } from '../api/applyCourse';
import { getAccessToken } from '@/shared/auth/authStorage';
import { useToastContext } from '@/shared/components/Toast/ToastProvider';

type useApplyCoursesParams = {
  onSuccess?: () => void;
  onError?: (message: string) => void;
};

export const useApplyCourses = ({
  onSuccess,
  onError,
}: useApplyCoursesParams = {}) => {
  const { mutate: apply, loading } = useMutation(applyCourse);
  const { showToast } = useToastContext();

  const handleApply = async (courseIds: number[]) => {
    const token = getAccessToken();
    if (!token) {
      const message = '로그인이 필요합니다';
      onError?.(message);
      showToast(message);
      return;
    }

    try {
      await Promise.all(courseIds.map((id) => apply(id)));
      onSuccess?.();
      showToast('수강 신청이 완료되었습니다');
    } catch (error) {
      if (error instanceof HttpError && error.payload?.message) {
        onError?.(error.payload.message);
        showToast(error.payload.message);
        return;
      }
      const message = '수강 신청 중 오류가 발생했습니다';
      onError?.(message);
      showToast(message);
    }
  };

  return {
    applyCourses: handleApply,
    loading,
  };
};
