import { UseFormRegister } from 'react-hook-form';

import { SignUpFormValues } from '../types';
import { validateEmail } from '../utils/validateEmail';

type UseEmailFieldParams = {
  register: UseFormRegister<SignUpFormValues>;
};

export const useEmailField = ({ register }: UseEmailFieldParams) => {
  const registration = register('email', {
    required: '이메일은 필수 입력입니다',
    validate: validateEmail,
  });

  return {
    registration,
  };
};
