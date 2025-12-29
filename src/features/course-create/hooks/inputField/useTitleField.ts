import { UseFormRegister } from 'react-hook-form';
import { CreateCourseFormValues } from '../../components/CreateCourseForm';
import { validateTitle } from '../../utils/validateTitle';

type useTitleFieldParams = {
  register: UseFormRegister<CreateCourseFormValues>;
};

export const useTitleField = ({ register }: useTitleFieldParams) => {
  const registration = register('title', {
    required: '강의명은 필수 입력입니다',
    validate: validateTitle,
  });

  return {
    registration,
  };
};
