import { getCourses } from '@/features/courses/api/getCourses';
import { GetCoursesParams } from '@/features/courses/api/types';
import CoursesPageClient from '@/features/courses/CoursesPageClient';

const LecturesPage = async () => {
  const initialParams: GetCoursesParams = { page: 0, size: 10, sort: 'recent' };
  const coursePage = await getCourses(initialParams);

  return (
    <CoursesPageClient initialPage={coursePage} initialParams={initialParams} />
  );
};

export default LecturesPage;
