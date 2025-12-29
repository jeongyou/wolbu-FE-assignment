'use client';

import { useRouter } from 'next/navigation';
import { UseFormSetError } from 'react-hook-form';

import { useMutation } from '@/api/useMutation';
import { HttpError } from '@/api/client';
import { postCourse, PostCourseRequest } from '../api/postCourse';
import { CreateCourseFormValues } from '../components/CreateCourseForm';
import { useToastContext } from '@/shared/components/Toast/ToastProvider';
import { getAuthUser } from '@/shared/auth/authStorage';

interface UseCreateCourseSubmitParams {
  setError: UseFormSetError<CreateCourseFormValues>;
  onSuccess?: () => void;
}

export const useCreateCourseSubmit = ({
  setError,
  onSuccess,
}: UseCreateCourseSubmitParams) => {
  const router = useRouter();
  const { showToast } = useToastContext();
  const { mutate: createCourse, loading } = useMutation(postCourse);

  const instructorName = getAuthUser()?.name ?? '';

  const handleSubmit = async (values: CreateCourseFormValues) => {
    const payload: PostCourseRequest = {
      title: values.title.trim(),
      // description 필드가 추가되면 입력값으로 교체
      description: '',
      instructorName: instructorName,
      maxStudents: values.maxStudents ?? 0,
      price: values.price ?? 0,
    };

    try {
      await createCourse(payload);
      onSuccess?.();
      showToast('강의가 등록되었습니다');
      router.push('/courses');
    } catch (error) {
      if (error instanceof HttpError && error.payload?.message) {
        if (error.payload.code === 'A003') {
          showToast('로그인이 필요합니다');
          return;
        }
        if (error.payload.code === 'C003') {
          showToast('강사만 강의를 등록할 수 있습니다');
          return;
        }
        setError('title', { type: 'server', message: error.payload.message });
        return;
      }
      showToast('강의 등록 중 오류가 발생했습니다');
    }
  };

  return {
    handleSubmit,
    loading,
  };
};
