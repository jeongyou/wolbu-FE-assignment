'use client';

import { useRouter } from 'next/navigation';
import { UseFormSetError } from 'react-hook-form';

import { useMutation } from '@/api/useMutation';
import { HttpError } from '@/api/client';
import { postSignUp } from '../api/postSignUp';
import { formatPhone } from '../utils/validatePhone';
import { SignUpFormValues } from '../types';

export const useSignUpSubmit = ({
  setError,
}: {
  setError: UseFormSetError<SignUpFormValues>;
}) => {
  const router = useRouter();
  const { mutate: signUp, loading: signUpLoading } = useMutation(postSignUp);

  const handleSubmit = async (values: SignUpFormValues) => {
    const payload = { ...values, phone: formatPhone(values.phone) };

    try {
      await signUp(payload);
      router.push('/lectures');
    } catch (error) {
      if (error instanceof HttpError && error.payload?.message) {
        setError('email', { type: 'server', message: error.payload.message });
        return;
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
