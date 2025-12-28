'use client';

import type { CoursePage, GetCoursesParams } from '../../api/types';
import CourseList from '../CourseList/CourseList';
import * as S from './CourseListContainer.styles';
import { useCourseInfinite } from '../../hooks/useCourseInfinite';

type CourseListContainerProps = {
  initialPage: CoursePage;
  initialParams: GetCoursesParams;
};

const CourseListContainer = ({
  initialPage,
  initialParams,
}: CourseListContainerProps) => {
  const { courses, error, loading, hasMore, sentinelRef } = useCourseInfinite(
    initialPage,
    initialParams
  );

  return (
    <>
      <CourseList courses={courses} />
      {error && <S.StatusError>{error}</S.StatusError>}
      {loading && <S.Status>불러오는 중...</S.Status>}
      {!hasMore && <S.Status>더 불러올 강의가 없습니다</S.Status>}
      <S.Sentinel ref={sentinelRef} />
    </>
  );
};

export default CourseListContainer;
