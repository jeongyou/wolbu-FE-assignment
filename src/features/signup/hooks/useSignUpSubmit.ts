'use client';

import { useRouter } from 'next/navigation';
import { UseFormSetError } from 'react-hook-form';

import { useMutation } from '@/api/useMutation';
import { HttpError } from '@/api/client';
import { postSignUp, SignUpResponse } from '../api/postSignUp';
import { formatPhone } from '../utils/validatePhone';
import { SignUpFormValues } from '../types';
import { postLogin } from '@/features/auth/api/postLogin';
import { saveAccessToken, saveAuthUser } from '@/shared/auth/authStorage';

type UseSignUpSubmitParams = {
  setError: UseFormSetError<SignUpFormValues>;
  onSuccess?: (message: string) => void;
};

/**
 * 회원가입 폼 제출 로직 훅
 *
 * 역할
 * - 회원가입 API 호출
 * - 회원가입 성공 시 로그인 API 호출 후 accessToken 저장
 * - 성공 시 courses 페이지로 이동
 * - 실패 시 서버 에러 코드를 해석해 react-hook-form 에러로 매핑
 *
 * 의존
 * - react-hook-form의 setError로 필드/폼 에러를 표시
 * - Next router로 라우팅
 */
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
      const loginResponse = await postLogin({
        email: values.email,
        password: values.password,
      });
      saveAccessToken(loginResponse.accessToken);
      saveAuthUser({
        name: loginResponse.user.name,
        role: loginResponse.user.role,
      });

      if (response?.message) {
        onSuccess?.(response.message);
      }
      router.push('/courses');
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
