'use client';

import { useEffect, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { getAuthUser } from '@/shared/auth/authStorage';

type Props = {
  children: ReactNode;
};

/**
 * 강사 전용 접근 가드 컴포넌트
 *
 * - 렌더 단계에서 현재 사용자 권한을 동기적으로 판별한다.
 * - 강사(INSTRUCTOR)가 아닌 경우, 이전 페이지가 존재하면 뒤로 이동하고, 그렇지 않으면 강의 목록으로 이동한다.
 * localStorage 기반 권한 판별이므로 Client Component로만 동작한다.
 */
const RequireInstructor = ({ children }: Props) => {
  const router = useRouter();

  const user = getAuthUser();
  const allowed = user?.role === 'INSTRUCTOR';

  useEffect(() => {
    if (allowed) return;

    if (window.history.length > 1) {
      router.back();
      return;
    }

    router.replace('/courses');
  }, [allowed, router]);

  if (!allowed) return null;

  return <>{children}</>;
};

export default RequireInstructor;
