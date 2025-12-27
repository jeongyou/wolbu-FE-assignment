import { UseFormRegister } from 'react-hook-form';

import { SignUpFormValues } from '../types';
import { trimName } from '../utils/normalizeName';

type UseNameFieldParams = {
  register: UseFormRegister<SignUpFormValues>;
};

export const useNameField = ({ register }: UseNameFieldParams) => {
  const registration = register('name', {
    required: '이름은 필수 입력입니다',
    setValueAs: trimName,
  });

  return {
    registration,
  };
};
