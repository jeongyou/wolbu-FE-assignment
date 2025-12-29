'use client';

import { useMemo, useState } from 'react';

import type { CoursePage, GetCoursesParams } from '../../api/types';
import CourseList from '../CourseList';
import SortSelect from '../SortSelect';
import * as S from './CourseListContainer.styles';
import { useCourseInfinite } from '../../hooks/useCourseInfinite';
import { Flex } from '@/shared/components/Flex';
import BottomActionBar from '@/shared/components/BottomActionBar';
import { useCourseSelection } from '../../hooks/useCourseSelection';
import { useApplyCourses } from '../../hooks/useApplyCoursesAction';
import CreateCourseButton from '../CreateCourseButton';
import ExcludeClosedCheckbox from '../ExcludeClosedCheckbox';
import { useExcludeClosedCourses } from '../../hooks/useExcludeClosedCourses';

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
  const { isSelected, toggle, selectedCount, selectedIdList } =
    useCourseSelection();
  const { applyCourses, loading: applyLoading } = useApplyCourses();
  const courseTitleMap = useMemo(
    () =>
      Object.fromEntries(courses.map((course) => [course.id, course.title])),
    [courses]
  );

  const { hideClosed, toggleHideClosed, visibleCourses } =
    useExcludeClosedCourses(courses);

  return (
    <>
      <Flex direction='row' justify='space-between' align='center'>
        <Flex gap={8} align='center'>
          <SortSelect
            value={sort ?? 'recent'}
            onChange={(next) => {
              setSort(next);
              setParams({ ...initialParams, sort: next });
            }}
          />
          <ExcludeClosedCheckbox
            checked={hideClosed}
            onChange={toggleHideClosed}
          />
        </Flex>
        <CreateCourseButton />
      </Flex>
      <CourseList
        courses={visibleCourses}
        isSelected={isSelected}
        onToggle={toggle}
      />
      {error && <S.StatusError>{error}</S.StatusError>}
      {loading && <S.Status>불러오는 중...</S.Status>}
      {!hasMore && <S.Status>더 불러올 강의가 없습니다</S.Status>}
      <S.Sentinel ref={sentinelRef} />
      <BottomActionBar
        label={
          selectedCount > 0
            ? `수강 신청 하기  (${selectedCount})`
            : '수강 신청 하기 '
        }
        disabled={selectedCount === 0 || applyLoading}
        onClick={() => {
          applyCourses(selectedIdList, courseTitleMap);
        }}
      />
    </>
  );
};

export default CourseListContainer;
