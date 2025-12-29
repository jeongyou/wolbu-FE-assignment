'use client';

import CreateCourseForm from '@/features/course-create/components/CreateCourseForm';

import Header from '@/shared/components/Header';
import RequireAuth from '@/shared/guards/RequireAuth';
import RequireInstructor from '@/shared/guards/RequireInstructor';

const CreateCoursePage = () => {
  return (
    <RequireAuth>
      <RequireInstructor>
        <Header title='강의 등록' />
        <CreateCourseForm />
      </RequireInstructor>
    </RequireAuth>
  );
};

export default CreateCoursePage;
