import Header from '@/shared/components/Header';
import { getCourses } from '@/features/courses/api/getCourses';
import CourseListContainer from '@/features/courses/components/CourseListContainer';
import { GetCoursesParams } from '@/features/courses/api/types';
import RequireAuth from '@/shared/guards/RequireAuth';

const LecturesPage = async () => {
  const initialParams: GetCoursesParams = { page: 0, size: 10, sort: 'recent' };
  const coursePage = await getCourses(initialParams);

  return (
    <RequireAuth>
      <Header title='강의 목록' />
      <CourseListContainer
        initialPage={coursePage}
        initialParams={initialParams}
      />
    </RequireAuth>
  );
};

export default LecturesPage;
