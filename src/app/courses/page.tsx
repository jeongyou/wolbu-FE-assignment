import Header from '@/shared/components/Header';
import { getCourses } from '@/features/courses/api/getCourses';
import CourseListContainer from '@/features/courses/components/CourseListContainer/CourseListContainer';
import { GetCoursesParams } from '@/features/courses/api/types';

const LecturesPage = async () => {
  const initialParams: GetCoursesParams = { page: 0, size: 10, sort: 'recent' };
  const coursePage = await getCourses(initialParams);

  return (
    <>
      <Header title='강의 목록' />
      <CourseListContainer
        initialPage={coursePage}
        initialParams={initialParams}
      />
    </>
  );
};

export default LecturesPage;
