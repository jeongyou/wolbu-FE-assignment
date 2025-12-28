'use client';

import { useRouter } from 'next/navigation';
import { UseFormSetError } from 'react-hook-form';

import { useMutation } from '@/api/useMutation';
import { HttpError } from '@/api/client';
import { postSignUp, SignUpResponse } from '../api/postSignUp';
import { formatPhone } from '../utils/validatePhone';
import { SignUpFormValues } from '../types';

type UseSignUpSubmitParams = {
  setError: UseFormSetError<SignUpFormValues>;
  onSuccess?: (message: string) => void;
};

export const useSignUpSubmit = ({
  setError,
  onSuccess,
}: UseSignUpSubmitParams) => {
  const router = useRouter();
  const { mutate: signUp, loading: signUpLoading } = useMutation<
    SignUpResponse,
    [SignUpFormValues]
  >(postSignUp);

  const handleSubmit = async (values: SignUpFormValues) => {
    const payload = { ...values, phone: formatPhone(values.phone) };

    try {
      const response = await signUp(payload);
      if (response?.message) {
        onSuccess?.(response.message);
      }
      router.push('/lectures');
    } catch (error) {
      if (error instanceof HttpError) {
        if (error.payload?.code === 'U001' && error.payload?.message) {
          setError('email', {
            type: 'server',
            message: error.payload.message,
          });
          return;
        }

        if (error.payload?.message) {
          setError('root', {
            type: 'server',
            message: error.payload.message,
          });
          return;
        }
      }

      setError('root', {
        type: 'server',
        message: '가입 중 오류가 발생했습니다',
      });
    }
  };

  return {
    handleSubmit,
    signUpLoading,
  };
};
