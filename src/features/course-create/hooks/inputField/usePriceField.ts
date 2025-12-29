import { UseFormRegister } from 'react-hook-form';
import { CreateCourseFormValues } from '../../components/CreateCourseForm';
import { validatePrice } from '../../utils/validatePrice';

type UsePriceFieldParams = {
  register: UseFormRegister<CreateCourseFormValues>;
};

export const usePriceField = ({ register }: UsePriceFieldParams) => {
  const registration = register('price', {
    required: '가격은 필수 입력입니다',
    valueAsNumber: true,
    validate: validatePrice,
  });

  return { registration };
};
