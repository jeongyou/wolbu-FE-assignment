'use client';

import { useRouter } from 'next/navigation';
import * as S from './CreateCourseButton.styles';
import { getAuthUser } from '@/shared/auth/authStorage';

type CreateCourseButtonProps = {
  href?: string;
};

const CreateCourseButton = ({ href = '/courses/new' }: CreateCourseButtonProps) => {
  const router = useRouter();
  const user = getAuthUser();
  const isInstructor = user?.role === 'INSTRUCTOR';

  if (!isInstructor) return null;

  return (
    <S.Button type='button' onClick={() => router.push(href)}>
      강의 개설
    </S.Button>
  );
};

export default CreateCourseButton;
