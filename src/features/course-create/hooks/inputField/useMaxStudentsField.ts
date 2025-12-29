import {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { CreateCourseFormValues } from '../../components/CreateCourseForm';
import { validateMaxStudents } from '../../utils/validateMaxStudents';

type UseMaxStudentsFieldParams = {
  register: UseFormRegister<CreateCourseFormValues>;
};

export const useMaxStudentsField = ({
  register,
}: UseMaxStudentsFieldParams) => {
  const registration = register('maxStudents', {
    required: '최대 수강 인원을 입력해주세요',
    valueAsNumber: true,
    validate: validateMaxStudents,
  });

  return { registration };
};
