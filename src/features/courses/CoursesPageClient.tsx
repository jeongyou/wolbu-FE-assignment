'use client';

import dynamic from 'next/dynamic';

import Header from '@/shared/components/Header';
import CourseListContainer from '@/features/courses/components/CourseListContainer';
import type {
  CoursePage,
  GetCoursesParams,
} from '@/features/courses/api/types';

const RequireAuth = dynamic(() => import('@/shared/guards/RequireAuth'), {
  ssr: false,
});

type Props = {
  initialPage: CoursePage;
  initialParams: GetCoursesParams;
};

const CoursesPageClient = ({ initialPage, initialParams }: Props) => {
  return (
    <RequireAuth>
      <Header title='강의 목록' />
      <CourseListContainer
        initialPage={initialPage}
        initialParams={initialParams}
      />
    </RequireAuth>
  );
};

export default CoursesPageClient;
