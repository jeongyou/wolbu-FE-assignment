import { UseFormRegister } from 'react-hook-form';

import { SignUpFormValues } from '../types';
import { trimName } from '../utils/normalizeName';

type UseNameFieldParams = {
  register: UseFormRegister<SignUpFormValues>;
};

export const useNameField = ({ register }: UseNameFieldParams) => {
  const registration = register('name', {
    required: '이름을 입력해주세요',
    setValueAs: trimName,
  });

  return {
    registration,
  };
};
