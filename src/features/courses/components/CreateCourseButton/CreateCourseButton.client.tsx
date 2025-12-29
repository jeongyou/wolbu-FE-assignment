'use client';

import { useRouter } from 'next/navigation';
import * as S from './CreateCourseButton.styles';
import { getAuthUser } from '@/shared/auth/authStorage';

type Props = { href?: string };

const CreateCourseButtonClient = ({ href = '/courses/new' }: Props) => {
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

export default CreateCourseButtonClient;
