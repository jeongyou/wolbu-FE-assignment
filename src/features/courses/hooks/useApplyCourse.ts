'use client';

import { useMutation } from '@/api/useMutation';
import { HttpError } from '@/api/client';
import { applyCourse, type ApplyCourseResponse } from '../api/applyCourse';
import { getAccessToken } from '@/shared/auth/authStorage';
import { useToastContext } from '@/shared/components/Toast/ToastProvider';

export const useApplyCourse = () => {
  const { mutate: apply, loading } = useMutation(applyCourse);
  const { showToast } = useToastContext();

  const handleApply = async (
    courseId: number
  ): Promise<ApplyCourseResponse | undefined> => {
    const token = getAccessToken();
    if (!token) {
      showToast('로그인이 필요합니다');
      return;
    }

    try {
      const result = await apply(courseId);
      showToast(`"${result.courseTitle}" 신청 완료`);
      return result;
    } catch (error) {
      if (error instanceof HttpError && error.payload?.message) {
        showToast(error.payload.message);
        return;
      }
      showToast('수강 신청 중 오류가 발생했습니다');
    }
  };

  return {
    applyCourse: handleApply,
    loading,
  };
};
