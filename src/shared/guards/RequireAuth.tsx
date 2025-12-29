'use client';

import { useEffect, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { getAccessToken } from '@/shared/auth/authStorage';

type Props = {
  children: ReactNode;
};

/**
 * 로그인 필수 접근 가드
 *
 * - accessToken이 없으면 메인 페이지(/)로 이동한다.
 * - 로그인 상태라면 자식 컴포넌트를 렌더링한다.
 */
const RequireAuth = ({ children }: Props) => {
  const router = useRouter();
  const token = getAccessToken();

  useEffect(() => {
    if (token) return;
    router.replace('/');
  }, [token, router]);

  if (!token) return null;

  return <>{children}</>;
};

export default RequireAuth;
