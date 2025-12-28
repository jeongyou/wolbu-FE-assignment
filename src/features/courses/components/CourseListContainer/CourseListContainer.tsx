'use client';

import { useState } from 'react';

import type { CoursePage, GetCoursesParams } from '../../api/types';
import CourseList from '../CourseList/CourseList';
import SortSelect from '../SortSelect/SortSelect';
import * as S from './CourseListContainer.styles';
import { useCourseInfinite } from '../../hooks/useCourseInfinite';
import { Flex } from '@/shared/components/Flex';

type CourseListContainerProps = {
  initialPage: CoursePage;
  initialParams: GetCoursesParams;
};

const CourseListContainer = ({
  initialPage,
  initialParams,
}: CourseListContainerProps) => {
  const [sort, setSort] = useState<GetCoursesParams['sort']>(
    initialParams.sort ?? 'recent'
  );

  const { courses, error, loading, hasMore, sentinelRef, setParams } =
    useCourseInfinite(initialPage, initialParams);

  return (
    <>
      <Flex direction='row' justify='flex-end'>
        <SortSelect
          value={sort ?? 'recent'}
          onChange={(next) => {
            setSort(next);
            setParams({ ...initialParams, sort: next });
          }}
        />
      </Flex>
      <CourseList courses={courses} />
      {error && <S.StatusError>{error}</S.StatusError>}
      {loading && <S.Status>불러오는 중...</S.Status>}
      {!hasMore && <S.Status>더 불러올 강의가 없습니다</S.Status>}
      <S.Sentinel ref={sentinelRef} />
    </>
  );
};

export default CourseListContainer;
