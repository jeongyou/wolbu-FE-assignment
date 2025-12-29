import dynamic from 'next/dynamic';

const CreateCourseButton = dynamic(
  () => import('./CreateCourseButton.client'),
  {
    ssr: false,
  }
);

export default CreateCourseButton;
