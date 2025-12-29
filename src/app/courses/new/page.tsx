import CreateCourseForm from '@/features/course-create/components/CreateCourseForm';
import Header from '@/shared/components/Header';

const CreateCoursePage = () => {
  return (
    <>
      <Header title='강의 등록' />
      <CreateCourseForm />
    </>
  );
};

export default CreateCoursePage;
