'use client';

import {
  clearEnrollResult,
  EnrollResultStorage,
  readEnrollResult,
} from '@/features/courses/utils/enrollResultStorage';
import BottomActionBar from '@/shared/components/BottomActionBar';
import Header from '@/shared/components/Header';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import * as S from './styles';

const ConfirmPage = () => {
  const [result] = useState<EnrollResultStorage | null>(() =>
    readEnrollResult()
  );
  const router = useRouter();

  const handleBack = () => {
    clearEnrollResult();
    router.push('/courses');
  };

  if (!result) {
    return (
      <>
        <Header title='수강 신청 결과' />
        <S.Container>
          <S.Message>표시할 신청 결과가 없습니다.</S.Message>
        </S.Container>
        <BottomActionBar label='목록으로 돌아가기' onClick={handleBack} />
      </>
    );
  }

  return (
    <>
      <Header title='수강 신청 결과' />
      <S.Container>
        <section>
          <S.SectionTitle>신청 성공</S.SectionTitle>
          {result.success.length === 0 ? (
            <S.Message>성공한 강의가 없습니다.</S.Message>
          ) : (
            <S.List>
              {result.success.map((item) => (
                <li key={item.courseId}>
                  <S.Success>
                    {item.courseTitle ?? `강의 ${item.courseId}`}
                  </S.Success>
                </li>
              ))}
            </S.List>
          )}
        </section>

        <section>
          <S.SectionTitle>신청 실패</S.SectionTitle>
          {result.failed.length === 0 ? (
            <S.Message>실패한 강의가 없습니다.</S.Message>
          ) : (
            <S.List>
              {result.failed.map((item) => (
                <li key={item.courseId}>
                  <S.Failed>
                    <span>{item.courseTitle ?? `강의 ${item.courseId}`}</span>
                    <S.FailedReason>{item.reason}</S.FailedReason>
                  </S.Failed>
                </li>
              ))}
            </S.List>
          )}
        </section>
      </S.Container>
      <BottomActionBar label='목록으로 돌아가기' onClick={handleBack} />
    </>
  );
};

export default ConfirmPage;
